import { db } from "../../drizzle-db.js";
import { users, notifications } from "../../drizzle/migrations/schema.js";
import { eq, ilike, desc, asc, count, or, sql } from "drizzle-orm";



export const getNotificationsByUserData = async (userData) => {
    const { role, id } = userData;

    const notifications = await db.select()
        .from(notifications).where(
            or(
                eq(notifications.recipient_id, id),
                eq(notifications.recipient_role, role)
            )
        )
        .orderBy(desc(notifications.created_at))
        .limit(8);

    return notifications;
}

export const getPaginatedNotificationsByUserData = async (userData, page = 1, pageSize = 10) => {
    const { role, id } = userData;
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const notifications = await db.select()
        .from(notifications).where(
            or(
                eq(notifications.recipient_id, id),
                eq(notifications.recipient_role, role)
            )
        )
        .orderBy(desc(notifications.created_at))
        .limit(limit)
        .offset(offset);

    const [totalItems] = await db.select({ count: sql`count(*)` })
        .from(notifications).where(
            or(
                eq(notifications.recipient_id, id),
                eq(notifications.recipient_role, role)
            )
        )
        .orderBy(desc(notifications.created_at))
        .limit(limit)
        .offset(offset);

    return {
        data: notifications,
        totalItems: Number(totalItems.count),
        totalPages: Math.ceil(Number(totalItems.count) / pageSize),
        currentPage: page,
        pageSize,
        skipped: offset,
    };
}

export const markNotificationAsRead = async (notificationId, userData) => {
    const { role, id } = userData;
    await db.update(notifications)
        .set({ is_read: true })
        .where(
            or(
                eq(notifications.id, notificationId),
                eq(notifications.recipient_id, id),
                eq(notifications.recipient_role, role)
            )
        );
}