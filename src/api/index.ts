import axios from 'axios';
import type { FetchPostsResponse, CreatePostRequest } from './types';

export function fetchHelloMessage(): Promise<string> {
    return axios.get('https://hackathon-2025-eyer.onrender.com/hello')
        .then(res => res.data.message);
}

export function fetchPosts(search: string): Promise<FetchPostsResponse> {
    return axios.get('https://hackathon-2025-eyer.onrender.com/user/post', {
        params: {
            op_type: 'list',
            search,
        },
    }).then(res => res.data);
}

export function createPost(post: CreatePostRequest): Promise<string> {
    return axios.post('https://hackathon-2025-eyer.onrender.com/user/post?op_type=create', post)
        .then(res => res.data.error);
}

export function updatePost(post: CreatePostRequest, id: string): Promise<string> {
    return axios.put(`https://hackathon-2025-eyer.onrender.com/user/post?op_type=update&post_id=${id}`, post)
        .then(res => res.data.error);
}
