import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Eye, MessageCircle, ThumbsUp, User, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

function timeAgo(timestamp: number): string {
    const now = Date.now() / 1000;
    const diff = now - timestamp;
    if (diff < 60) return `${Math.floor(diff)} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 172800) return `yesterday`;
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
}

export interface PostProps {
    id: string;
    title: string;
    content: string;
    authorName: string;
    authorId: string;
    timestamp: number;
    tags: string[];
    type: string;
    comments: Comment[];
    views: number;
    likes: number;
}

export interface Comment {
    id: string;
    authorName: string;
    authorId: string;
    content: string;
    timestamp: number;
    likes: number;
    authorImg: string;
}

export function Post({
    id,
    title,
    content,
    authorName,
    timestamp,
    tags,
    comments,
    views,
    type,
    likes
}: PostProps) {
    const [expanded, setExpanded] = useState(false);
    const [replyContent, setReplyContent] = useState("");

    return (
        <div className="space-y-4">
            {/* Posts List */}
            <div className="space-y-4">
                <Card
                    key={id}
                    id={`post-${id}`}
                    className={`hover:shadow-md`}
                >
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            {/* Post Header */}
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-xl font-semibold">{title}</h3>
                                        <Badge
                                            variant="outline"
                                            className={
                                                type === "Question"
                                                    ? "text-blue-500 border-blue-200 bg-blue-50"
                                                    : type === "Post"
                                                        ? "text-orange-500 border-orange-200 bg-orange-50"
                                                        : type === "Appreciation"
                                                            ? "text-green-500 border-green-200 bg-green-50"
                                                            : ""
                                            }
                                        >{type}</Badge>
                                    </div>


                                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{content}</p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {tags.map((tag, index) => (
                                            <Badge key={index} variant="outline" className="text-xs border-blue-200 text-blue-700">{tag}</Badge>
                                        ))}
                                    </div>

                                    {/* Author Info */}
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <User className="w-4 h-4 text-blue-700" />
                                        <button
                                            className="font-semibold hover:text-blue-700 transition-colors cursor-pointer"
                                        >
                                            {authorName}
                                        </button>
                                        <Calendar className="w-4 h-4 ml-2 text-blue-700" />
                                        <span>{timeAgo(timestamp)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Post Actions & Stats */}
                            <div className="flex items-center justify-between pt-4 border-t">
                                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Eye className="w-4 h-4 text-blue-400" />
                                        <span>{views} seas</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MessageCircle className="w-4 h-4 text-orange-500" />
                                        <span>{comments.length} replies</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <ThumbsUp className="w-4 h-4 text-green-500" />
                                        <span>{likes} {"We Serve"}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setExpanded(!expanded)}
                                        className="flex items-center gap-1 hover:bg-blue-100 hover:text-blue-500"
                                    >
                                        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                        {expanded ? "Hide" : "View"} Replies
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className={`flex items-center gap-1`}
                                    >
                                        <ThumbsUp className="w-4 h-4" />
                                        {"We Serve"}
                                    </Button>
                                </div>
                            </div>

                            {/* Replies Section */}
                            {expanded && (
                                <div className="mt-6 pt-4 border-t space-y-4">
                                    <h4 className="flex items-center gap-2">
                                        <MessageCircle className="w-4 h-4 text-orange-500" />
                                        Replies ({comments.length})
                                    </h4>

                                    {/* Existing Replies */}
                                    <div className="space-y-3 max-h-96 overflow-y-auto">
                                        {comments.map((comment) => (
                                            <div key={comment.id} className="p-3 rounded-lg border bg-blue-50">
                                                <div className="flex items-start gap-3">
                                                    <Avatar className="w-8 h-8">
                                                        <AvatarImage src={comment.authorImg} />
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <button
                                                                className="text-sm font-semibold hover:text-blue-700 transition-colors cursor-pointer"
                                                            >
                                                                {comment.authorName}
                                                            </button>
                                                            <span className="text-xs text-muted-foreground">{timeAgo(comment.timestamp)}</span>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground mb-2">{comment.content}</p>
                                                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs hover:bg-green-100 hover:text-green-500">
                                                            <ThumbsUp className="w-3 h-3 mr-1" />
                                                            {comment.likes}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Reply Input */}
                                    <div className="space-y-3">
                                        <Textarea
                                            placeholder="Write your reply..."
                                            value={replyContent}
                                            onChange={(e) => {
                                                setReplyContent(e.target.value);
                                            }}
                                            rows={3}
                                            className="border-blue-200 focus:border-blue-700"
                                        />

                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
