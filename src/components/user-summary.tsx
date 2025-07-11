import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export function UserSummary() {
    const summaryData = {
        summary: "John has demonstrated exceptional performance as a Senior Software Engineer, leading multiple high-impact projects over the past year. His expertise in full-stack development has been instrumental in delivering the company's new customer portal, which improved user engagement by 40%. He consistently mentors junior developers and has contributed to establishing best practices across the engineering team.",
    };

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
                            {summaryData.summary}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </>

    )
}
