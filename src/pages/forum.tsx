// import { fetchHelloMessage } from "../api"
// import { useEffect } from "react"

import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"

export function Forum() {
    const { user } = useUser();
    return (
        <div>
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>
                        <Link to="/forum">Forum</Link>
                    </MenubarTrigger>
                </MenubarMenu>
            </Menubar>
            <h1>Forum</h1>
            <SignOutButton redirectUrl="/login" />
            <p>{user?.emailAddresses[0].emailAddress}</p>
        </div>
    );
}
