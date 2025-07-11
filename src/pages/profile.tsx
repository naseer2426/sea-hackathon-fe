import { TopBar } from "@/components/menubar";
import { UserCard } from "@/components/user-details";
import { UserSummary } from "@/components/user-summary";
import { UserProjects } from "@/components/user-projects";
import { UserPosts } from "@/components/user-posts";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { createUser } from "@/api";
import type { CreateUserRequest, User } from "@/api/types";
import { toast } from "sonner";
import { tryCatch } from "@/utils/try-catch";
import { type UserData as UserCardProps } from "@/components/user-details";
import { Navigate } from "react-router-dom";
import { parseUserAISummary } from "@/utils/user-api";
import { ProfileProcessing } from "@/components/profile-processing";

export function Profile() {
    const { user } = useUser();
    const [search, setSearch] = useState<string>("");
    const [userData, setUserData] = useState<User | null>(null);
    const [profileLoading, setProfileLoading] = useState<boolean>(true);

    async function createUserData(user: CreateUserRequest) {
        setProfileLoading(true);
        const { data, error } = await tryCatch(createUser(user));
        if (error) {
            toast.error(error.message);
            setProfileLoading(false);
            return;
        }
        console.log(data, error);
        setProfileLoading(false);
        setUserData(parseUserAISummary(data.data));
    }
    useEffect(() => {
        if (user) {
            createUserData({
                user_email: user.emailAddresses[0].emailAddress,
                user_name: user.fullName || "",
                profile_img: user.imageUrl || ""
            })
        }
    }, []);

    if (profileLoading) {
        return <>
            <TopBar header="Profile" setSearch={setSearch} />
            <ProfileProcessing loading={true} />
        </>
    }

    if (!profileLoading && !userData) {
        return <Navigate to="/login" />;
    }
    if (!userData?.aiSummaryParsed?.summary || !userData?.aiSummaryParsed?.tags) {
        return <>
            <TopBar header="Profile" setSearch={setSearch} />
            <ProfileProcessing />
        </>
    }

    return (
        <div className="flex flex-col gap-4">
            <TopBar header="Profile" setSearch={setSearch} />
            <UserCard user={userDataToUserCardProps(userData!)} />
            <UserSummary summary={userData?.aiSummaryParsed.summary || ""} />
            <UserProjects recentContributions={userData?.aiSummaryParsed.recentContributions || []} />
            <UserPosts userId={user?.id || ""} search={search} />
        </div>
    )
}

function userDataToUserCardProps(userData: User): UserCardProps {
    return {
        name: userData.user_name,
        role: userData.aiSummaryParsed.role,
        team: userData.aiSummaryParsed.team,
        email: userData.user_email,
        avatar: userData.profile_img,
        tags: userData.aiSummaryParsed.tags,
    }
}
