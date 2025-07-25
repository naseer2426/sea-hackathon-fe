import axios from 'axios';
import type {
    FetchPostsResponse,
    CreatePostRequest,
    CreateUserRequest,
    ListUsersResponse,
    GetUserResponse
} from './types';

const API_URL = 'https://hackathon-2025-1-878w.onrender.com';

export function fetchHelloMessage(): Promise<string> {
    return axios.get('https://hackathon-2025-eyer.onrender.com/hello')
        .then(res => res.data.message);
}

export function fetchPosts(search: string): Promise<FetchPostsResponse> {
    return axios.get(`${API_URL}/user/post`, {
        params: {
            op_type: 'list',
            search,
        },
    }).then(res => res.data);
}

export function fetchUserPosts(search: string, userEmail: string): Promise<FetchPostsResponse> {
    return axios.get(`${API_URL}/user/post`, {
        params: {
            op_type: 'list',
            search,
            author_email: userEmail,
        },
    }).then(res => res.data);
}

export function createPost(post: CreatePostRequest): Promise<string> {
    return axios.post(`${API_URL}/user/post?op_type=create`, post)
        .then(res => res.data.error);
}

export function updatePost(post: CreatePostRequest, id: string): Promise<string> {
    return axios.put(`${API_URL}/user/post?op_type=update&post_id=${id}`, post)
        .then(res => res.data.error);
}

export function createUser(user: CreateUserRequest): Promise<GetUserResponse> {
    return axios.post(`${API_URL}/user/profile`, user)
        .then(res => res.data);
}

export function listUsers(): Promise<ListUsersResponse> {
    return axios.get(`${API_URL}/user/profile/list?limit=100&offset=0`)
        .then(res => res.data);
}

export function getUser(email: string): Promise<GetUserResponse> {
    return axios.get(`${API_URL}/user/profile/get?email=${email}`)
        .then(res => res.data);
} 
