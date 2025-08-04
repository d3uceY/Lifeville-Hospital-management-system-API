export const authorize = (allowed = []) => (req, res, next) => {
    if (allowed.includes(req.userRole)) {
      return next();
    }
    res.status(403).json({ error: "Forbidden" });
  };
  