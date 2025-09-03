import * as notificationServices from "../services/notificationServices.js";

export const getNotificationsByUserData = async (req, res) => {
    try {
        const userData = req.body;
        const notifications = await notificationServices.getNotificationsByUserData(userData);
        res.status(200).json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch notifications" });
    }
}

export const getPaginatedNotificationsByUserData = async (req, res) => {
    try {
        const { page, pageSize } = req.query;
        const notifications = await notificationServices.getPaginatedNotificationsByUserData(req.body, Number(page), Number(pageSize));
        res.status(200).json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch notifications" });
    }
}

export const getUnreadNotifications = async (req, res) => {
    try {
        const userData = req.body;
        const notifications = await notificationServices.getUnreadNotifications(userData);
        res.status(200).json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch notifications" });
    }
}

export const markNotificationAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const userData = req.body;
        await notificationServices.markNotificationAsRead(notificationId, userData);
        res.status(200).json({ message: "Notification marked as read" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to mark notification as read" });
    }
}
