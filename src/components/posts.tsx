import { Post, type PostProps } from "./post";

export type PostsProps = {
    posts: PostProps[];
    loading?: boolean;
}

const loadingPosts: PostProps[] = [
    {
        id: "1",
        title: "Loading...",
        content: "Loading...",
        authorName: "Loading...",
        authorId: "1",
        timestamp: 0,
        tags: [],
        type: "Loading...",
        comments: [],
        views: 0,
        likes: 0,
        loading: true,
    },
    {
        id: "2",
        title: "Loading...",
        content: "Loading...",
        authorName: "Loading...",
        authorId: "2",
        timestamp: 0,
        tags: [],
        type: "Loading...",
        comments: [],
        views: 0,
        likes: 0,
        loading: true,
    },
    {
        id: "3",
        title: "Loading...",
        content: "Loading...",
        authorName: "Loading...",
        authorId: "3",
        timestamp: 0,
        tags: [],
        type: "Loading...",
        comments: [],
        views: 0,
        likes: 0,
        loading: true,
    }
]

export function Posts({ posts, loading }: PostsProps) {
    return (
        <div className="space-y-4 p-4">
            {loading && posts && posts.length == 0 && loadingPosts.map((post) => {
                return <Post key={post.id} {...post} loading={loading} />
            })}
            {posts && posts.map((post) => (
                <Post key={post.id} {...post} loading={loading} />
            ))}
        </div>
    )
}
