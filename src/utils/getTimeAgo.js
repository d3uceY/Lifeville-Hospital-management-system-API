import { formatDistanceToNow } from "date-fns";

export function timeAgo(dateString) {
    return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
    });
}
