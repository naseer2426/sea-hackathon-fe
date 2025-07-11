import { Posts, type PostsProps } from "./posts";

export function UserPosts() {
    const posts: PostsProps = {
        posts: [
            {
                id: "1",
                title: "Optimizing React Performance in Large Applications",
                content: "In this post, I share strategies and tools for improving the performance of large-scale React apps, including memoization, code splitting, and virtualization.",
                authorName: "John Doe",
                authorId: "1",
                timestamp: 1715404800,
                tags: ["React", "Performance", "Frontend"],
                comments: [
                    {
                        id: "2",
                        authorName: "Jane Doe",
                        authorId: "2",
                        content: "Great tips! I found code splitting especially useful in my projects.",
                        timestamp: 1715405800,
                        likes: 12,
                        authorImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
                    },
                    {
                        id: "3",
                        authorName: "Alex Smith",
                        authorId: "3",
                        content: "How do you handle performance monitoring in production?",
                        timestamp: 1715406800,
                        likes: 7,
                        authorImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
                    }
                ],
                views: 340,
                likes: 56,
            },
            {
                id: "2",
                title: "A Guide to WebSocket Integration in Node.js",
                content: "This article covers the basics of WebSocket protocol and demonstrates how to implement real-time features in Node.js applications.",
                authorName: "Jane Doe",
                authorId: "2",
                timestamp: 1715414800,
                tags: ["Node.js", "WebSocket", "Backend"],
                comments: [
                    {
                        id: "4",
                        authorName: "John Doe",
                        authorId: "1",
                        content: "Very helpful! Can you share more about authentication strategies?",
                        timestamp: 1715415800,
                        likes: 5,
                        authorImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
                    }
                ],
                views: 210,
                likes: 34,
            },
            {
                id: "3",
                title: "Effective Caching Strategies for REST APIs",
                content: "Learn about different caching mechanisms and how to apply them to RESTful APIs for better scalability and speed.",
                authorName: "Alex Smith",
                authorId: "3",
                timestamp: 1715424800,
                tags: ["API", "Caching", "Scalability"],
                comments: [],
                views: 180,
                likes: 22,
            },
        ]
    }
    return (
        <Posts {...posts} />
    )
}
