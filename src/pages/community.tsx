import { TopBar } from "@/components/menubar";
import { UserCard } from "@/components/user-details";
import type { User } from "@/api/types";
import { useState, useEffect } from "react";
import { tryCatch } from "@/utils/try-catch";
import { listUsers } from "@/api";
import { toast } from "sonner";
import { parseUserAISummaries } from "@/utils/user-api";
import type { UserData } from "@/components/user-details";

const loadingUsers: UserData[] = [
    {
        name: "John Doe",
        role: "Senior Software Engineer",
        team: "Engineering",
        email: "john.doe@example.com",
        avatar: "https://via.placeholder.com/150",
        tags: [],
    },
    {
        name: "John Doe",
        role: "Senior Software Engineer",
        team: "Engineering",
        email: "john.doe@example.com",
        avatar: "https://via.placeholder.com/150",
        tags: [],
    },
    {
        name: "John Doe",
        role: "Senior Software Engineer",
        team: "Engineering",
        email: "john.doe@example.com",
        avatar: "https://via.placeholder.com/150",
        tags: [],
    },
]

export function Community() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchUsers = async () => {
        setLoading(true);
        const { data, error } = await tryCatch(listUsers());
        if (error) {
            setLoading(false);
            toast.error(error.message);
            return;
        }
        setLoading(false);
        setUsers(parseUserAISummaries(data.data));
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <TopBar header="Community" setSearch={() => { }} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {!loading && users.map((user, idx) => (
                    <UserCard key={idx} user={userDataToUserCardProps(user)} />
                ))}
                {loading && loadingUsers.map((user, idx) => (
                    <UserCard key={idx} user={user} loading={true} />
                ))}
            </div>
        </div>
    )
}

function userDataToUserCardProps(user: User): UserData {
    return {
        name: user.user_name || "",
        role: user.aiSummaryParsed?.role || "",
        team: user.aiSummaryParsed?.team || "",
        email: user.user_email || "",
        avatar: user.profile_img || "",
        tags: user.aiSummaryParsed?.tags || [],
    }
}
