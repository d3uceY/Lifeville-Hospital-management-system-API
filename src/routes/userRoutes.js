import express from "express";
import * as userControllers from "../controllers/userController.js";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/authorize.js";

const router = express.Router();

router.post("/login", userControllers.loginController);
router.post("/refresh", userControllers.refreshController);
router.post("/logout", authenticate, userControllers.logoutController);

// Super Admin only routes
router.post("/users", authenticate, authorize(["superadmin"]), userControllers.createStaffController);
router.get("/users", authenticate, authorize(["superadmin"]), userControllers.listUsersController);

export default router;
