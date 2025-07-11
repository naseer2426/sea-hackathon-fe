import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

type UserSummaryProps = {
    summary: string;
}

export function UserSummary({ summary }: UserSummaryProps) {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-sea-light-blue" />
                        I stay humble
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="p-6 rounded-lg border">
                        <p className="leading-relaxed">
                            {summary}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </>

    )
}
