import axios from 'axios';

export function fetchHelloMessage(): Promise<string> {
    return axios.get('https://hackathon-2025-eyer.onrender.com/hello')
        .then(res => res.data.message);
} 
