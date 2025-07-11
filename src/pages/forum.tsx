// import { fetchHelloMessage } from "../api"
// import { useEffect } from "react"

import { SignOutButton, useUser } from "@clerk/clerk-react";
import { TopBar } from "@/components/menubar";

export function Forum() {
    const { user } = useUser();
    return (
        <div>
            <TopBar header="Forum" />
            <SignOutButton redirectUrl="/login" />
            <p>{user?.emailAddresses[0].emailAddress}</p>
        </div>
    );
}
