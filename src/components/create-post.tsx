import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue
} from "@/components/ui/select";

export function CreatePost({ onPost }: { onPost?: (post: any) => void }) {
    const { user } = useUser();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [type, setType] = useState("question");
    const [loading, setLoading] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        // Placeholder: call onPost or just reset
        const post = {
            id: Date.now().toString(),
            title,
            content,
            tags: [],
            type,
            authorName: user?.fullName || "Anonymous",
            authorId: user?.id || "",
            timestamp: Math.floor(Date.now() / 1000),
            comments: [],
            views: 0,
            likes: 0,
        };
        onPost?.(post);
        setTitle("");
        setContent("");
        setType("question");
        setLoading(false);
    }

    return (
        <div className="p-4">
            <Card className="">
                <CardContent className="p-4">
                    <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-2">
                        <Select value={type} onValueChange={setType}>
                            <SelectTrigger
                                className={`w-full ${type === "question"
                                    ? "text-blue-500"
                                    : type === "post"
                                        ? "text-orange-500"
                                        : type === "appreciation"
                                            ? "text-green-500"
                                            : ""
                                    }`}
                            >
                                <SelectValue>{type.charAt(0).toUpperCase() + type.slice(1)}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Question" className="text-blue-500 hover:bg-blue-200">Question</SelectItem>
                                <SelectItem value="Post" className="text-orange-500 hover:bg-orange-200">Post</SelectItem>
                                <SelectItem value="Appreciation" className="text-green-500 hover:bg-green-200">Appreciation</SelectItem>
                            </SelectContent>
                        </Select>
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
