import { TopBar } from "@/components/menubar";
import { Posts } from "@/components/posts";
import { type PostsProps } from "@/components/posts";
import { CreatePost } from "@/components/create-post";
import { useState } from "react";

export function Forum() {
    const initialPosts: PostsProps = {
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
                type: "Question",
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
                type: "Post",
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
                type: "Appreciation",
            },
            {
                id: "4",
                title: "Mastering TypeScript for Scalable Applications",
                content: "Explore advanced TypeScript features and best practices for building scalable, maintainable codebases.",
                authorName: "Priya Patel",
                authorId: "4",
                timestamp: 1715434800,
                tags: ["TypeScript", "Best Practices", "Scalability"],
                comments: [
                    {
                        id: "5",
                        authorName: "Alex Smith",
                        authorId: "3",
                        content: "TypeScript has really improved our code quality!",
                        timestamp: 1715435800,
                        likes: 3,
                        authorImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
                    }
                ],
                views: 150,
                likes: 18,
                type: "Question",
            },
            {
                id: "5",
                title: "UI/UX Trends to Watch in 2024",
                content: "A look at the latest UI/UX trends, including micro-interactions, dark mode, and accessibility improvements.",
                authorName: "Sara Lee",
                authorId: "5",
                timestamp: 1715444800,
                tags: ["UI/UX", "Design", "Trends"],
                comments: [
                    {
                        id: "6",
                        authorName: "Jane Doe",
                        authorId: "2",
                        content: "Great summary! Accessibility is so important.",
                        timestamp: 1715445800,
                        likes: 4,
                        authorImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
                    }
                ],
                views: 120,
                likes: 15,
                type: "Post",
            },
            {
                id: "6",
                title: "Deploying with Vercel: Tips and Tricks",
                content: "Learn how to optimize your deployment workflow and troubleshoot common issues when using Vercel for frontend projects.",
                authorName: "John Doe",
                authorId: "1",
                timestamp: 1715454800,
                tags: ["Vercel", "Deployment", "Frontend"],
                comments: [],
                views: 90,
                likes: 10,
                type: "Appreciation",
            },
        ]
    };
    const [posts, setPosts] = useState(initialPosts.posts);

    function handleCreatePost(newPost: any) {
        setPosts([newPost, ...posts]);
    }

    return (
        <div>
            <TopBar header="Forum" />
            <div className="flex flex-col gap-2 mt-4">
                <CreatePost onPost={handleCreatePost} />
                <Posts posts={posts} />
            </div>
        </div>
    );
}
