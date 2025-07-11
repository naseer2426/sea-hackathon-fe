import { TopBar } from "@/components/menubar";
import { Posts } from "@/components/posts";
import { CreatePost } from "@/components/create-post";
import { useEffect, useState } from "react";
import type { CreatePostRequest } from "@/api/types";
import type { PostProps } from "@/components/post";
import { createPost, fetchPosts } from "@/api";
import { tryCatch } from "@/utils/try-catch";
import { toast } from "sonner";
import { convertApiPostsToUiPosts } from "@/utils/convert";

export function Forum() {

    const [posts, setPosts] = useState<PostProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchString, setSearchString] = useState<string>("");

    async function handleCreatePost(newPost: CreatePostRequest) {
        setIsLoading(true);
        const { data: agentError, error } = await tryCatch(createPost(newPost));
        if (error || agentError) {
            setError(error?.message || agentError);
            setIsLoading(false);
            return;
        }
        setIsLoading(false);
        await getPosts(searchString);
    }
    async function getPosts(search: string) {
        setIsLoading(true);
        const { data, error } = await tryCatch(fetchPosts(search));
        if (error) {
            setError(error.message);
            setIsLoading(false);
            return;
        }
        setIsLoading(false);
        setPosts(convertApiPostsToUiPosts(data?.posts || []));
    }
    function setSearch(search: string) {
        setSearchString(search);
    }
    useEffect(() => {
        getPosts(searchString);
    }, [searchString]);

    if (error) {
        toast.error(error);
    }

    return (
        <div>
            <TopBar header="Forum" setSearch={setSearch} />
            <div className="flex flex-col gap-2 mt-4">
                <CreatePost onPost={handleCreatePost} />
                <Posts posts={posts} loading={isLoading} />
            </div>
        </div>
    );
}


