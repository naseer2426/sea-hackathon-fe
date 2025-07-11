import { Posts } from "./posts";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import type { PostProps } from "./post";
import { tryCatch } from "@/utils/try-catch";
import { fetchUserPosts } from "@/api";
import { convertApiPostsToUiPosts } from "@/utils/convert";
import { toast } from "sonner";

interface UserPostsProps {
    userId: string;
    search?: string;
}

export function UserPosts({ userId, search }: UserPostsProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState<PostProps[]>([]);

    async function getPosts(search: string, userId: string) {
        setIsLoading(true);
        const { data, error } = await tryCatch(fetchUserPosts(search, userId));
        if (error) {
            toast.error(error.message);
            setIsLoading(false);
            return;
        }
        setIsLoading(false);
        setPosts(convertApiPostsToUiPosts(data?.posts || []));
    }

    useEffect(() => {
        getPosts(search || "", userId);
    }, [search, userId]);
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-blue-500" />
                    Recent Posts
                </CardTitle>
            </CardHeader>
            {!isLoading && posts.length == 0 && <p className="text-center text-sm text-gray-500">We'll be here soon!</p>}
            {posts.length > 0 && !isLoading && <Posts posts={posts} loading={isLoading} />}
        </Card>
    )
}
