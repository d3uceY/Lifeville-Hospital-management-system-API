import express from "express";
import * as notificationController from "../controllers/notificationController.js";

const router = express.Router();

router.get("/notifications", notificationController.getNotificationsByUserData);
router.get("/notifications/paginated", notificationController.getPaginatedNotificationsByUserData);
router.get("/notifications/unread", notificationController.getUnreadNotifications);
router.post("/notifications/:notificationId/mark-as-read", notificationController.markNotificationAsRead);

export default router;