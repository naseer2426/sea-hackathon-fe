import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export type UserData = {
    name: string;
    role: string;
    team: string;
    email: string;
    avatar: string;
    tags: string[];
};

type UserCardProps = {
    user?: UserData;
    loading?: boolean;
    iCommit?: boolean;
};

export function UserCard({ user, loading, iCommit }: UserCardProps) {
    const navigate = useNavigate();
    const { user: clerkUser } = useUser();
    const userData = user || {
        name: clerkUser?.fullName,
        role: "Senior Software Engineer",
        team: "Engineering Team",
        email: clerkUser?.emailAddresses[0].emailAddress,
        avatar: clerkUser?.imageUrl,
        tags: ["Collaboration", "Innovation", "Growth"],
    };
    return (
        <Card className="hover:shadow-lg cursor-pointer" onClick={() => {
            if (userData.email) {
                navigate(`/profile?userEmail=${userData.email}`);
            }
        }}>
            <CardContent>
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                    {/* Avatar column for lg+, row for below */}
                    <div className="flex flex-row items-center gap-4 w-full lg:flex-col lg:w-auto lg:items-center lg:justify-start">
                        <Avatar className="w-16 h-16 lg:w-32 lg:h-32 border-4 border-background shadow-lg">
                            {loading ? (
                                <AvatarFallback>
                                    <Skeleton className="w-16 h-16 lg:w-32 lg:h-32 rounded-full" />
                                </AvatarFallback>
                            ) : (
                                <AvatarImage src={userData.avatar} alt="Profile" />
                            )}
                        </Avatar>
                        <div className="flex flex-col items-start lg:hidden">
                            {loading ? (
                                <>
                                    <Skeleton className="h-6 w-32 mb-2" />
                                    <Skeleton className="h-4 w-24" />
                                </>
                            ) : (
                                <>
                                    <h1 className="text-xl font-bold break-words">{userData.name}</h1>
                                    <p className="text-muted-foreground text-sm break-words">{userData.team}</p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* All info in one column for lg+ */}
                    <div className="flex-1 space-y-4 w-full lg:flex lg:flex-col lg:justify-center lg:space-y-4">
                        {/* Name and team only shown here on lg+ */}
                        <div className="hidden lg:flex flex-col items-start">
                            {loading ? (
                                <>
                                    <Skeleton className="h-8 w-48 mb-2" />
                                    <Skeleton className="h-6 w-32" />
                                </>
                            ) : (
                                <>
                                    <h1 className="text-3xl font-bold break-words">{userData.name}</h1>
                                    <p className="text-muted-foreground text-xl break-words">{userData.team}</p>
                                </>
                            )}
                        </div>
                        {loading ? (
                            <Skeleton className="h-5 w-32" />
                        ) : (
                            <p className="text-base lg:text-xl break-words">{userData.role}</p>
                        )}
                        <div className="mt-2 flex items-center gap-2">
                            {iCommit && userData.tags && userData.tags.length > 0 && <span className="text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap">I commit</span>}
                            <div className="flex flex-wrap gap-2 mt-0">
                                {loading
                                    ? Array.from({ length: 3 }).map((_, i) => (
                                        <Skeleton key={i} className="h-6 w-16 rounded-full" />
                                    ))
                                    : userData.tags && userData.tags.slice(0, 3).map((tag) => (
                                        <span key={tag} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">{tag}</span>
                                    ))}
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Mail className="w-4 h-4" />
                                {loading ? (
                                    <Skeleton className="h-4 w-32" />
                                ) : (
                                    <span className="break-all">{userData.email}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
