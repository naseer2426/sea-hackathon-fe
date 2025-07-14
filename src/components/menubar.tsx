import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { SignOutButton } from "@clerk/clerk-react";

type TopBarProps = {
    header: string,
    setSearch: (search: string) => void
}

export function TopBar({ header, setSearch }: TopBarProps) {
    const [navOpen, setNavOpen] = useState(false);

    return (
        <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:px-2 gap-2 sm:gap-0">
            <div className="flex flex-row items-center justify-between sm:justify-start w-full">
                <Input type="text" className="w-full sm:w-[50vw]" placeholder="Search" onChange={(e) => setSearch?.(e.target.value)} />
                <button
                    className="sm:hidden ml-2 p-2 rounded-md border border-gray-200"
                    onClick={() => setNavOpen((v) => !v)}
                    aria-label="Toggle navigation"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
            <div
                className={`flex-col sm:flex-row flex gap-2 sm:gap-4 mt-2 sm:mt-0 ${navOpen ? 'flex' : 'hidden'} sm:flex`}
            >
                <Link className={`hover:bg-blue-100 p-2 rounded-md ${header === "Profile" ? "bg-blue-100" : ""}`} to="/profile">Profile</Link>
                <Link className={`hover:bg-blue-100 p-2 rounded-md ${header === "Forum" ? "bg-blue-100" : ""}`} to="/forum">Forum</Link>
                <Link className={`hover:bg-blue-100 p-2 rounded-md ${header === "Community" ? "bg-blue-100" : ""}`} to="/community">Community</Link>
                <SignOutButton />
            </div>
        </div>
    )
}
