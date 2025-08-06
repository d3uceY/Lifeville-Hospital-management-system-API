import express from "express";
import * as userControllers from '../controllers/userControllers.js';
import { authenticate } from "../middleware/auth.js";
import { authenticateRefresh } from "../middleware/authenticateRefresh.js";
import { authorize } from "../middleware/authorize.js";

const router = express.Router();

router.post("/auth/login", userControllers.loginController);
router.post("/auth/refresh", userControllers.refreshController);
router.post("/auth/logout", authenticate, userControllers.logoutController);

// Super Admin only routes
router.post("/users", authenticate, authorize(["superadmin"]), userControllers.createStaffController);
router.get("/users", authenticate, authorize(["superadmin"]), userControllers.listUsersController);

export default router;
