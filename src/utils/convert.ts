import type { Post, Comment } from "@/api/types";
import type { CommentProps, PostProps } from "@/components/post";

export function convertApiPostsToUiPosts(apiPosts: Post[]): PostProps[] {
    return apiPosts.map((post) => ({
        id: post.post_id,
        title: post.title,
        content: post.content,
        authorName: post.authorName,
        timestamp: post.timestamp,
        authorEmail: post.authorEmail,
        tags: post.metaData?.tags || [],
        type: post.post_type,
        comments: convertApiCommentsToUiComments(post.metaData?.comments || []),
        views: post.likes,
        likes: post.likes,
        authorId: post.author_id,
    }));
}

export function convertApiCommentsToUiComments(apiComments: Comment[]): CommentProps[] {
    return apiComments.map((comment) => ({
        id: comment.id,
        authorName: comment.authorName,
        content: comment.content,
        timestamp: comment.timestamp,
        authorEmail: comment.authorEmail,
        likes: comment.likes,
        authorImg: comment.authorImg,
    }));
}
