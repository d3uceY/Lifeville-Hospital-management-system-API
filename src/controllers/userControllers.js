import * as userService from "../services/userServices.js";

import bcrypt from "bcrypt";
import env from "dotenv";
env.config();


export const seedSuperAdmin = async (req, res) => {
    try {
        const superAdmin = await userService.seedSuperAdmin();
        if (!superAdmin) {
            const hash = await bcrypt.hash(process.env.SUPERADMIN_PASSWORD, 12);
            await userService.insertSeedSuperAdmin(process.env.SUPERADMIN_EMAIL, hash);
            res.status(200).json({
                message: "Superadmin seeded successfully",
            });
        }
    } catch (err) {
        console.error("error seeding superadmin:", err);
        res.status(500).json({
            message: "internal server error",
        });
    }
};



export async function loginController(req, res) {
    const { email, password } = req.body;
    try {
        const { accessToken, refreshToken, user } = await userService.login({ email, password });
        res
            .cookie("refresh_token", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Strict",
                maxAge: 30 * 24 * 60 * 60 * 1000,
            })
            .json({ access_token: accessToken, user });
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
}

export async function refreshController(req, res) {
    try {
        const token = req.cookies["refresh_token"];
        if (!token) {
            return res.status(401).json({ error: "No refresh token" });
        }
        const { accessToken, refreshToken } = await userService.refreshAccess(token);
        res
            .cookie("refresh_token", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Strict",
                maxAge: 30 * 24 * 60 * 60 * 1000,
            })
            .json({ access_token: accessToken });
    } catch (err) {
        res.clearCookie("refresh_token").status(err.status || 500).json({ error: err.message });
    }
}

export async function logoutController(req, res) {
    await userService.logout(req.userId);
    res.clearCookie("refresh_token").sendStatus(204);
}

export async function createStaffController(req, res) {
    try {
        const newU = await userService.createStaff(req.body, req.userId);
        res.status(201).json({ user: newU, message: "Staff user created" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function listUsersController(req, res) {
    try {
        const users = await userService.listUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
