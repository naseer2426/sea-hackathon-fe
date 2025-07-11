import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

export function UserCard() {
    const { user } = useUser()
    console.log(user)
    const userData = {
        name: user?.fullName,
        role: "Senior Software Engineer",
        team: "Engineering Team",
        email: user?.emailAddresses[0].emailAddress,
        avatar: user?.imageUrl,
    }
    return (
        <Card>
            <CardContent>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <Avatar className="w-32 h-32 border-4 border-background shadow-lg">
                        <AvatarImage src={userData.avatar} alt="Profile" />
                    </Avatar>

                    <div className="flex-1 space-y-4">
                        <div>
                            <h1 className="text-3xl">{userData.name}</h1>
                            <p className="text-xl">{userData.role}</p>
                            <p className="text-muted-foreground">{userData.team}</p>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Mail className="w-4 h-4 text-sea-mid-blue" />
                                <span>{userData.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
