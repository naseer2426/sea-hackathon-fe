import { Post, type PostProps } from "./post";

export type PostsProps = {
    posts: PostProps[];
}

export function Posts({ posts }: PostsProps) {
    return (
        <div className="space-y-4">
            {posts.map((post) => (
                <Post key={post.id} {...post} />
            ))}
        </div>
    )
}
