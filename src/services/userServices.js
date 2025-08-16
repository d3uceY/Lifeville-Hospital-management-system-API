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
        "INSERT INTO users (name, email, password_hash, role) VALUES ('Super Admin', $1, $2, 'superadmin') RETURNING *",
        [email, hash]
    );
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
    const { rows } = await query(`SELECT name, id, password_hash, role FROM users WHERE email = $1`, [email.toLowerCase()]);
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
        user: { id: u.id, name: u.name, email, role: u.role },
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

    const { rows } = await query(`SELECT refresh_token, role, email, name FROM users WHERE id = $1`, [payload.sub]);

    if (!rows[0]) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
    }

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
        user: { id: payload.sub, name: rows[0].name, email: rows[0].email, role: rows[0].role },
    };
}

export async function logout(userId) {
    await query(`UPDATE users SET refresh_token = NULL WHERE id = $1`, [userId]);
}

export async function createStaff({ email, password, role, name }, creatorId) {
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const res = await query(
        `INSERT INTO users(email, password_hash, role, created_by, name)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, email, role, name`,
        [email.toLowerCase(), hashed, role || "staff", creatorId, name]
    );
    return res.rows[0];
}

// Optionally, for Admin panel
export async function listUsers() {
    const { rows } = await query(`SELECT 
  u.id,
  u.name,
  u.email,
  u.role,
  u.created_by,
  cb.name AS created_by_name,
  u.created_at
FROM users u
LEFT JOIN users cb ON u.created_by = cb.id;`);
    return rows;
}

export async function updateUser(userData, userId) {
    const { rows } = await query(
        `UPDATE users SET name = $1, email = $2, role = $3 WHERE id = $4 RETURNING *`,
        [userData.name, userData.email, userData.role, userId]
    );
    return rows[0];
}