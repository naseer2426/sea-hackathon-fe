import { useUser } from "@clerk/clerk-react"
import { Navigate } from "react-router-dom"

export function Protect({ children }: { children: React.ReactNode }) {
    const { isLoaded, isSignedIn } = useUser()
    if (!isLoaded) return null
    if (!isSignedIn) return <Navigate to="/login" />
    return (
        <div className="p-8">
            {children}
        </div>
    )
}
