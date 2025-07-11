import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Rocket, Code, TrendingUp } from "lucide-react";

type UserProjectsProps = {
    recentContributions: {
        title: string;
        description: string;
        tags: string[];
    }[];
}

export function UserProjects({ recentContributions }: UserProjectsProps) {
    return (
        <>
            <Card className="border-l-4">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        I run
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Recent Contributions */}
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {recentContributions.map((contribution: any, index: number) => {
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



