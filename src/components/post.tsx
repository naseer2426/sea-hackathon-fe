import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Eye, MessageCircle, ThumbsUp, User, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import type { CreatePostRequest } from "@/api/types";
import { tryCatch } from "@/utils/try-catch";
import { updatePost } from "@/api";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";

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
    comments: CommentProps[];
    views: number;
    likes: number;
    loading?: boolean;
}

export interface CommentProps {
    id: string;
    authorName: string;
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
    authorId,
    type,
    likes,
    loading
}: PostProps) {
    const [expanded, setExpanded] = useState(false);
    const [replyContent, setReplyContent] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [commentsState, setCommentsState] = useState(comments);
    const [replyUploading, setReplyUploading] = useState(false);

    const { user } = useUser();

    const onReply = async () => {
        setReplyUploading(true);
        const newComments = [...commentsState, {
            id: "",
            authorName: user?.fullName || "",
            content: replyContent,
            timestamp: Math.floor(Date.now() / 1000),
            likes: 0,
            authorImg: user?.imageUrl || "",
        }];
        const updatedPost: CreatePostRequest = {
            title,
            type,
            content,
            authorName,
            authorImg: "",
            authorId: authorId,
            tags: tags,
            comments: newComments,
            likes: likes,
            callAgent: true,
        }
        const { data: agentErr, error } = await tryCatch(updatePost(updatedPost, id));
        if (error || agentErr) {
            setError(error?.message || agentErr);
            return;
        }
        setReplyContent("");
        setCommentsState(newComments);
        setReplyUploading(false);
        toast.success("Reply added successfully");
    }

    if (error) {
        toast.error(error);
    }

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
                                        {loading ? (
                                            <Skeleton className="h-6 w-40 rounded" />
                                        ) : (
                                            <h3 className="text-xl font-semibold">{title}</h3>
                                        )}
                                        {loading ? (
                                            <Skeleton className="h-6 w-20 rounded" />
                                        ) : (
                                            type && <Badge
                                                variant="outline"
                                                className={
                                                    type.toLowerCase() === "question"
                                                        ? "text-blue-500 border-blue-200 bg-blue-50"
                                                        : type.toLowerCase() === "post"
                                                            ? "text-orange-500 border-orange-200 bg-orange-50"
                                                            : type.toLowerCase() === "appreciation"
                                                                ? "text-green-500 border-green-200 bg-green-50"
                                                                : ""
                                                }
                                            >{type.charAt(0).toUpperCase() + type.slice(1)}</Badge>
                                        )}
                                    </div>

                                    {loading ? (
                                        <Skeleton className="h-5 w-full max-w-lg mb-3" />
                                    ) : (
                                        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{content}</p>
                                    )}

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {loading ? (
                                            Array.from({ length: 3 }).map((_, i) => (
                                                <Skeleton key={i} className="h-5 w-14 rounded" />
                                            ))
                                        ) : (
                                            tags.map((tag, index) => (
                                                <Badge key={index} variant="outline" className="text-xs border-blue-200 text-blue-700">{tag}</Badge>
                                            ))
                                        )}
                                    </div>

                                    {/* Author Info */}
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        {loading ? (
                                            <Skeleton className="h-4 w-20 rounded" />
                                        ) : (
                                            <>
                                                <User className="w-4 h-4 text-blue-700" />
                                                <button
                                                    className="font-semibold hover:text-blue-700 transition-colors cursor-pointer"
                                                >
                                                    {authorName}
                                                </button>
                                            </>
                                        )}
                                        {loading ? (
                                            <Skeleton className="h-4 w-16 rounded" />
                                        ) : (
                                            <>
                                                <Calendar className="w-4 h-4 ml-2 text-blue-700" />
                                                <span>{timeAgo(timestamp)}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Post Actions & Stats */}
                            <div className="flex items-center justify-between pt-4 border-t">
                                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                    {loading ? (
                                        <>
                                            <Skeleton className="h-4 w-16 rounded" />
                                            <Skeleton className="h-4 w-20 rounded" />
                                            <Skeleton className="h-4 w-20 rounded" />
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex items-center gap-1">
                                                <Eye className="w-4 h-4 text-blue-400" />
                                                <span>{views} seas</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MessageCircle className="w-4 h-4 text-orange-500" />
                                                <span>{commentsState.length} replies</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <ThumbsUp className="w-4 h-4 text-green-500" />
                                                <span>{likes} {"We Serve"}</span>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="flex items-center gap-2">
                                    {loading ? (
                                        <Skeleton className="h-8 w-24 rounded" />
                                    ) : (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setExpanded(!expanded)}
                                            className="flex items-center gap-1 hover:bg-blue-100 hover:text-blue-500"
                                        >
                                            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                            {expanded ? "Hide" : "View"} Replies
                                        </Button>
                                    )}
                                    {loading ? (
                                        <Skeleton className="h-8 w-24 rounded" />
                                    ) : (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className={`flex items-center gap-1`}
                                        >
                                            <ThumbsUp className="w-4 h-4" />
                                            {"We Serve"}
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {/* Replies Section */}
                            {expanded && (
                                <div className="mt-6 pt-4 border-t space-y-4">
                                    <h4 className="flex items-center gap-2">
                                        <MessageCircle className="w-4 h-4 text-orange-500" />
                                        Replies ({loading ? <Skeleton className="h-4 w-8 rounded inline-block" /> : commentsState.length})
                                    </h4>

                                    {/* Existing Replies */}
                                    <div className="space-y-3 max-h-96 overflow-y-auto">
                                        {loading ? (
                                            Array.from({ length: 2 }).map((_, i) => (
                                                <div key={i} className="p-3 rounded-lg border bg-blue-50">
                                                    <div className="flex items-start gap-3">
                                                        <Skeleton className="w-8 h-8 rounded-full" />
                                                        <div className="flex-1">
                                                            <Skeleton className="h-4 w-24 mb-1 rounded" />
                                                            <Skeleton className="h-4 w-40 mb-2 rounded" />
                                                            <Skeleton className="h-6 w-12 rounded" />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            commentsState.map((comment) => (
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
                                            ))
                                        )}
                                    </div>

                                    {/* Reply Input */}
                                    <div className="space-y-3">
                                        {loading ? (
                                            <Skeleton className="h-20 w-full rounded" />
                                        ) : (
                                            <>
                                                <Textarea
                                                    placeholder="Write your reply..."
                                                    value={replyContent}
                                                    onChange={(e) => {
                                                        setReplyContent(e.target.value);
                                                    }}
                                                    rows={3}
                                                    className="border-blue-200 focus:border-blue-700"
                                                />
                                                <Button
                                                    variant="outline"
                                                    size="lg"
                                                    className="h-6 px-2 text-sm hover:bg-blue-100 hover:text-blue-500"
                                                    onClick={onReply}
                                                    disabled={replyUploading}
                                                >Reply</Button>
                                            </>

                                        )}
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
