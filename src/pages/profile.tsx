import { TopBar } from "@/components/menubar";
import { UserCard } from "@/components/user-details";
import { UserSummary } from "@/components/user-summary";
import { UserProjects } from "@/components/user-projects";
export function Profile() {

    return (
        <div className="flex flex-col gap-4">
            <TopBar header="Profile" />
            <UserCard />
            <UserSummary />
            <UserProjects />
        </div>
    )
}
