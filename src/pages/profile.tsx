import { TopBar } from "@/components/menubar";
import { UserCard } from "@/components/user-details";
import { UserSummary } from "@/components/user-summary";
import { UserProjects } from "@/components/user-projects";
import { UserPosts } from "@/components/user-posts";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";

export function Profile() {
    const { user } = useUser();
    const [search, setSearch] = useState<string>("");

    return (
        <div className="flex flex-col gap-4">
            <TopBar header="Profile" setSearch={setSearch} />
            <UserCard />
            <UserSummary />
            <UserProjects />
            <UserPosts userId={user?.id || ""} search={search} />
        </div>
    )
}
