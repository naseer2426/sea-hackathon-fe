export interface Comment {
    id: string;
    authorName: string;
    authorEmail: string;
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
    author_id: string;
    post_type: string;
    title: string;
    content: string;
    authorName: string;
    authorEmail: string;
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
    authorEmail: string;
    tags?: string[];
    comments?: Comment[];
    likes: number;
    callAgent?: boolean;
}

export interface CreateUserRequest {
    user_email: string;
    user_name: string;
    profile_img: string
}

export interface User {
    id: number;
    user_email: string;
    ai_summary: string;
    user_name: string;
    profile_img: string;
    last_updated: string;
    created_at: string;
    deleted_at: string | null;
    // parsed in FE
    aiSummaryParsed: AISummary;
}

export interface AISummary {
    role: string;
    team: string;
    tags: string[];
    summary: string;
    recentContributions: {
        title: string;
        description: string;
        tags: string[];
        documents: string[];
    }[];
}

export interface ListUsersResponse {
    data: User[];
    count: number;
    message: string;
    timestamp: string;
    status: string;
}

export interface GetUserResponse {
    data: User;
    message: string;
    timestamp: string;
    status: string;
}
