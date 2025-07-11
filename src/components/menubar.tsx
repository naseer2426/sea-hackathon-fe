import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { SignOutButton } from "@clerk/clerk-react";

type TopBarProps = {
    header: string
}

export function TopBar({ header }: TopBarProps) {

    return (
        <div className="flex flex-row w-full justify-between items-center">
            <div className="flex flex-row gap-4 items-center">
                <Input type="text" className="w-[50vw]" placeholder="Search" />
            </div>
            <div className="flex flex-row gap-4">
                <Link className={`hover:bg-blue-100 p-2 rounded-md ${header === "Profile" ? "bg-blue-100" : ""}`} to="/profile">Profile</Link>
                <Link className={`hover:bg-blue-100 p-2 rounded-md ${header === "Forum" ? "bg-blue-100" : ""}`} to="/forum">Forum</Link>
                <Link className={`hover:bg-blue-100 p-2 rounded-md ${header === "Community" ? "bg-blue-100" : ""}`} to="/community">Community</Link>
                <SignOutButton />
            </div>
        </div>
    )
}
