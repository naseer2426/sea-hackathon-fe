import { TopBar } from "@/components/menubar";
import { Posts } from "@/components/posts";
import { CreatePost } from "@/components/create-post";
import { useEffect, useState } from "react";
import type { Post, Comment } from "@/api/types";
import type { CommentProps, PostProps } from "@/components/post";
import { fetchPosts } from "@/api";
import { tryCatch } from "@/utils/try-catch";
import { toast } from "sonner";

export function Forum() {

    const [posts, setPosts] = useState<PostProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchString, setSearchString] = useState<string>("");

    function handleCreatePost(newPost: any) {
        console.log(newPost);
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

function convertApiPostsToUiPosts(apiPosts: Post[]): PostProps[] {
    return apiPosts.map((post) => ({
        id: post.post_id,
        title: post.title,
        content: post.content,
        authorName: post.authorName,
        timestamp: post.timestamp,
        tags: post.metaData?.tags || [],
        type: post.post_type,
        comments: convertApiCommentsToUiComments(post.metaData?.comments || []),
        views: post.likes,
        likes: post.likes,
    }));
}

function convertApiCommentsToUiComments(apiComments: Comment[]): CommentProps[] {
    return apiComments.map((comment) => ({
        id: comment.id,
        authorName: comment.authorName,
        content: comment.content,
        timestamp: comment.timestamp,
        likes: comment.likes,
        authorImg: comment.authorImg,
    }));
}
