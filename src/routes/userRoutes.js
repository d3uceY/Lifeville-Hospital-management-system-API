import express from "express";
import * as ctrl from "../controllers/userController.js";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/authorize.js";

const router = express.Router();

router.post("/login", ctrl.loginController);
router.post("/refresh", ctrl.refreshController);
router.post("/logout", authenticate, ctrl.logoutController);

// Super Admin only routes
router.post("/users", authenticate, authorize(["superadmin"]), ctrl.createStaffController);
router.get("/users", authenticate, authorize(["superadmin"]), ctrl.listUsersController);

export default router;
