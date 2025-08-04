import { query } from "../db.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcrypt";
import env from "dotenv";
env.config();

const ACCESS_EXPIRES = process.env.ACCESS_EXPIRES;
const REFRESH_EXPIRES = process.env.REFRESH_EXPIRES
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);


export async function seedSuperAdmin() {
    const { rows } = await query("SELECT id FROM users WHERE role = 'superadmin' LIMIT 1");
    return rows.length > 0;
}


export const insertSeedSuperAdmin = async (email, hash) => {
    const result = await query(
        "INSERT INTO users (email, password_hash, role) VALUES ($1, $2, 'superadmin') RETURNING *",
        [email, hash]
    );
    console.log(`Superadmin ${email} created.`);
    return result.rows[0];
}


function signAccess(user) {
    return jwt.sign(
        { sub: user.id, role: user.role },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: ACCESS_EXPIRES }
    );
}

function signRefresh(userId, jti) {
    return jwt.sign(
        { sub: userId, jti },
        process.env.JWT_REFRESH_KEY,
        { expiresIn: REFRESH_EXPIRES }
    );
}

export async function login({ email, password }) {
    const { rows } = await query(`SELECT id, password_hash, role FROM users WHERE email = $1`, [email.toLowerCase()]);
    const u = rows[0];
    if (!u || !(await bcrypt.compare(password, u.password_hash))) {
        const err = new Error("Invalid credentials");
        err.status = 401;
        throw err;
    }

    const jti = crypto.randomUUID();
    const rtoken = signRefresh(u.id, jti);
    const hashJti = crypto.createHash("sha256").update(jti).digest("hex");
    await query(`UPDATE users SET refresh_token = $1 WHERE id = $2`, [hashJti, u.id]);

    return {
        accessToken: signAccess({ id: u.id, role: u.role }),
        refreshToken: rtoken,
        user: { id: u.id, email, role: u.role },
    };
}

export async function refreshAccess(oldRefresh) {
    let payload;
    try {
        payload = jwt.verify(oldRefresh, process.env.JWT_REFRESH_KEY);
    } catch {
        const err = new Error("Invalid or expired refresh token");
        err.status = 401;
        throw err;
    }

    const rows = await query(`SELECT refresh_token FROM users WHERE id = $1`, [payload.sub]);
    const hashJti = crypto.createHash("sha256").update(payload.jti).digest("hex");
    if (!rows[0] || rows[0].refresh_token !== hashJti) {
        const err = new Error("Refresh token replay detected");
        err.status = 403;
        throw err;
    }

    const newJti = crypto.randomUUID();
    const newRefresh = signRefresh(payload.sub, newJti);
    const newHash = crypto.createHash("sha256").update(newJti).digest("hex");
    await query(`UPDATE users SET refresh_token = $1 WHERE id = $2`, [newHash, payload.sub]);

    return {
        accessToken: signAccess({ id: payload.sub, role: rows[0].role }),
        refreshToken: newRefresh,
    };
}

export async function logout(userId) {
    await query(`UPDATE users SET refresh_token = NULL WHERE id = $1`, [userId]);
}

export async function createStaff({ email, password, role }, creatorId) {
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const res = await query(
        `INSERT INTO users(email, password_hash, role, created_by)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, role`,
        [email.toLowerCase(), hashed, role || "staff", creatorId]
    );
    return res.rows[0];
}

// Optionally, for Admin panel
export async function listUsers() {
    const { rows } = await query(`SELECT id, email, role, created_by, created_at FROM users`);
    return rows;
}