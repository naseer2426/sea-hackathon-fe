import type { User } from "@/api/types";

export function parseUserAISummary(user: User): User {
    if (!user.ai_summary) {
        return user;
    }
    return {
        ...user,
        aiSummaryParsed: JSON.parse(user.ai_summary)
    }
}

export function parseUserAISummaries(users: User[]): User[] {
    return users.map(parseUserAISummary);
}
