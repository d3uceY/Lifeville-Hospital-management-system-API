import { db } from "../../drizzle-db.js";
import { users, notifications, notificationReads } from "../../drizzle/migrations/schema.js";
import { eq, ilike, desc, asc, count, or, sql, and, isNull } from "drizzle-orm";
import { timeAgo } from "../utils/getTimeAgo.js";



export const getNotificationsByUserData = async (userData) => {
    const { role, id: userId } = userData;

    const notifications = await db.select(
        {
            ...notifications,
            is_read: sql`CASE WHEN ${notificationReads.id} IS NULL THEN false ELSE true END`,
        }
    )
        .from(notifications)
        .leftJoin(
            notificationReads,
            and(
                eq(notifications.id, notificationReads.notification_id),
                eq(notificationReads.user_id, userId)
            )
        )
        .where(
            or(
                eq(notifications.recipient_id, userId),
                eq(notifications.recipient_role, role)
            )
        )
        .orderBy(desc(notifications.created_at))
        .limit(5);

    return notifications.map(notification => ({
        ...notification,
        time: timeAgo(notification.created_at),
    }));
}


export const getUnreadNotifications = async (userData) => {
    const { role, id: userId } = userData;

    const unreadNotifications = await db.select(
        {
            ...notifications,
            is_read: sql`CASE WHEN ${notificationReads.id} IS NULL THEN false ELSE true END`,
        }
    )
        .from(notifications)
        .leftJoin(
            notificationReads,
            and(
                eq(notifications.id, notificationReads.notification_id),
                eq(notificationReads.user_id, userId)
            )
        )
        .where(
            or(
                eq(notifications.recipient_id, userId),
                eq(notifications.recipient_role, role)
            )
        )
        .orderBy(desc(notifications.created_at))
        .limit(5);


    const [totalUnread] = await db
        .select({ count: sql`count(*)` })
        .from(notifications)
        .leftJoin(
            notificationReads,
            and(
                eq(notifications.id, notificationReads.notification_id),
                eq(notificationReads.user_id, userId)
            )
        )
        .where(
            and(
                or(
                    eq(notifications.recipient_id, userId),
                    eq(notifications.recipient_role, role)
                ),
                isNull(notificationReads.id)
            )
        );


    return {
        unreadNotifications: unreadNotifications.filter(notification => !notification.is_read).map(notification => ({
            ...notification,
            time: timeAgo(notification.created_at),
        })),
        totalUnread: Number(totalUnread.count),
    };
}



export const getPaginatedNotificationsByUserData = async (
    userData,
    page = 1,
    pageSize = 10
) => {
    const { role, id: userId } = userData;
    const offset = (page - 1) * pageSize;

    const notificationsWithRead = await db
        .select({
            id: notifications.id,
            recipient_id: notifications.recipient_id,
            recipient_role: notifications.recipient_role,
            type: notifications.type,
            title: notifications.title,
            message: notifications.message,
            data: notifications.data,
            created_at: notifications.created_at,
            is_read: sql`CASE WHEN ${notificationReads.id} IS NULL THEN false ELSE true END`,
        })
        .from(notifications)
        .leftJoin(
            notificationReads,
            and(
                eq(notifications.id, notificationReads.notification_id),
                eq(notificationReads.user_id, userId)
            )
        )
        .where(
            or(
                eq(notifications.recipient_id, userId),
                eq(notifications.recipient_role, role)
            )
        )
        .orderBy(desc(notifications.created_at))
        .limit(pageSize)
        .offset(offset);

    const [totalItems] = await db
        .select({ count: sql`count(*)` })
        .from(notifications)
        .where(
            or(
                eq(notifications.recipient_id, userId),
                eq(notifications.recipient_role, role)
            )
        );

    return {
        data: notificationsWithRead.map(notification => ({
            ...notification,
            time: timeAgo(notification.created_at),
        })),
        totalItems: Number(totalItems.count),
        totalPages: Math.ceil(Number(totalItems.count) / pageSize),
        currentPage: page,
        pageSize,
        skipped: offset,
    };
};

export const markNotificationAsRead = async (notificationId, userData) => {
    const { id } = userData;
    await db.insert(notificationReads)
        .values({
            notification_id: notificationId,
            user_id: id,
            read_at: new Date(),
        })
}

export const addNotification = async (notificationData) => {
    const createdAt = new Date();
    try {
        await Promise.all(notificationData.map(async (notification) => {
            await db.insert(notifications)
                .values({
                    ...notification,
                    created_at: createdAt,
                })
        }))
    } catch (error) {
        console.error(error)
    }
}