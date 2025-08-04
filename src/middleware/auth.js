import jwt from "jsonwebtoken";

export async function authenticate(req, res, next) {
  const auth = req.headers.authorization?.split(" ");
  if (auth?.[0] === "Bearer" && auth[1]) {
    try {
      const payload = jwt.verify(auth[1], process.env.JWT_ACCESS_KEY);
      req.userId = payload.sub;
      req.userRole = payload.role;
      return next();
    } catch {
      return res.sendStatus(401);
    }
  }
  return res.sendStatus(401);
}
