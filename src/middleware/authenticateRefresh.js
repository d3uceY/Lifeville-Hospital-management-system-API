import jwt from "jsonwebtoken";

export function authenticateRefresh(req, res, next) {
    const token = req.cookies.refresh_token;
    if (!token) return res.sendStatus(401);
    try {
        const payload = jwt.verify(token, process.env.JWT_REFRESH_KEY);
        req.userId = payload.sub;
        return next();
    } catch {
        return res.sendStatus(401);
    }
}
