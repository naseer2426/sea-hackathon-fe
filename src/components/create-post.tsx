import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import type { CreatePostRequest } from "@/api/types";

export function CreatePost({ onPost }: { onPost?: (post: any) => void }) {
    const { user } = useUser();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        // Placeholder: call onPost or just reset
        const post: CreatePostRequest = {
            type: "",
            title,
            content,
            tags: [],
            authorName: user?.fullName || "Anonymous",
            authorId: user?.id || "",
            authorImg: user?.imageUrl || "",
            comments: [],
            likes: 0,
            callAgent: true,
        };
        onPost?.(post);
        setTitle("");
        setContent("");
        setLoading(false);
    }

    return (
        <div className="p-4">
            <Card className="">
                <CardContent className="p-4">
                    <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-2">
                        <Input
                            placeholder="Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="font-semibold"
                            maxLength={80}
                            required
                        />
                        <Textarea
                            placeholder="Description"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            rows={6}
                            maxLength={280}
                            required
                        />
                        <div className="flex justify-end mt-2">
                            <Button type="submit" disabled={loading || !title || !content}>
                                {loading ? "Posting..." : "Post"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>

    );
}
