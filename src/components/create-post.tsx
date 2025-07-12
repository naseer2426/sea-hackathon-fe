import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import type { CreatePostRequest } from "@/api/types";
import { Lightbulb } from 'lucide-react';

export function CreatePost({ onPost }: { onPost?: (post: CreatePostRequest) => Promise<string> }) {
    const { user } = useUser();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        // Placeholder: call onPost or just reset
        const post: CreatePostRequest = {
            type: "",
            title,
            content,
            tags: [],
            authorName: user?.fullName || "Anonymous",
            authorId: user?.id || "",
            authorImg: user?.imageUrl || "",
            authorEmail: user?.emailAddresses[0].emailAddress || "",
            comments: [],
            likes: 0,
            callAgent: true,
        };
        const error = await onPost?.(post);
        if (error) {
            setError(error);
            setLoading(false);
            return;
        }
        setError(null);
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
                            disabled={loading}
                        />
                        <Textarea
                            placeholder="Description"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            rows={20}
                            maxLength={3000}
                            required
                            disabled={loading}
                        />
                        <div className="flex justify-end mt-2">
                            <Button type="submit" disabled={loading || !title || !content}>
                                {loading ? "Posting..." : "Post"}
                            </Button>
                        </div>
                    </form>
                    {error && <div className="flex flex-row items-center gap-2 mt-4 bg-blue-200 p-4 rounded-md overflow-auto max-w-full">
                        <Lightbulb className="w-4 h-4 flex-shrink-0" />
                        <p className="text-black text-sm">{error}</p>
                    </div>}
                </CardContent>
            </Card>
        </div>
    );
}
