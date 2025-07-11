export interface Comment {
    id: string;
    authorName: string;
    authorImg: string;
    content: string;
    timestamp: number;
    likes: number;
}

export interface MetaData {
    tags: string[];
    comments: Comment[];
}

export interface Post {
    post_id: string;
    post_type: string;
    title: string;
    content: string;
    authorName: string;
    authorImg: string;
    timestamp: number;
    metaData: MetaData;
    likes: number;
    created_at: string;
    deleted_at: string | null;
}

export interface FetchPostsResponse {
    posts: Post[];
    message: string;
    timestamp: string;
    status: string;
}

export interface CreatePostRequest {
    title: string;
    type?: string;
    content: string;
    authorName: string;
    authorImg: string;
    authorId: string;
    tags?: string[];
    comments?: Comment[];
    likes: number;
}

