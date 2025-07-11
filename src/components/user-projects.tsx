import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Rocket, Code, TrendingUp } from "lucide-react";

export function UserProjects() {
    const data = {
        recentContributions: [
            {
                title: "Customer Portal Redesign",
                description: "Led the complete overhaul of customer-facing interface",
                tags: ["UI", "Leadership", "React"]
            },
            {
                title: "Real-time Notifications System",
                description: "Implemented WebSocket-based notification system",
                tags: ["WebSocket", "Notifications", "Backend"]
            },
            {
                title: "API Performance Optimization",
                description: "Reduced API response time through caching strategies",
                tags: ["API", "Performance", "Caching"]
            }
        ],
    };
    return (
        <>
            <Card className="border-l-4">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Here's what I'm committed to.
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Recent Contributions */}
                    <div>
                        <h4 className="flex items-center gap-2 mb-4">
                            <Rocket className="w-4 h-4" />
                            Recent Contributions
                        </h4>
                        <div className="space-y-4">
                            {data.recentContributions.map((contribution: any, index: number) => {
                                const getTypeIcon = () => {
                                    const i = Math.floor(Math.random() * 4)
                                    const type = ["project", "feature", "task", "target"][i]
                                    switch (type) {
                                        case "project":
                                            return <Rocket className="w-4 h-4" />;
                                        case "feature":
                                            return <Code className="w-4 h-4" />;
                                        case "task":
                                            return <TrendingUp className="w-4 h-4" />;
                                        default:
                                            return <Target className="w-4 h-4" />;
                                    }
                                };

                                return (
                                    <div key={index} className="p-4 border rounded-lg bg-blue-50 border-blue-100">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-2 mb-2">
                                                {getTypeIcon()}
                                                <h5>{contribution.title}</h5>
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-3">{contribution.description}</p>
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {contribution.tags && contribution.tags.map((tag: string, tagIdx: number) => (
                                                <Badge key={tagIdx} variant="secondary" className="bg-blue-500 text-white">{tag}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}



