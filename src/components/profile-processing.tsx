import { UserIcon, Loader2Icon, SparklesIcon } from "lucide-react";

export type ProfileProcessingProps = {
    loading?: boolean;
}

export function ProfileProcessing({ loading }: ProfileProcessingProps) {
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-16 gap-4 mt-32">
                <span className="relative inline-flex items-center justify-center w-20 h-20">
                    <Loader2Icon className="absolute w-20 h-20 text-blue-300 opacity-60 animate-spin" />
                </span>
            </div>
        )
    }
    return (
        <div className="flex flex-col items-center justify-center py-16 gap-4 mt-32">
            <span className="relative inline-flex items-center justify-center w-20 h-20">
                <UserIcon className="w-16 h-16 text-blue-500 drop-shadow" />
                <SparklesIcon className="absolute w-8 h-8 text-yellow-400 -top-2 -right-2 animate-pulse" />
                <Loader2Icon className="absolute w-20 h-20 text-blue-300 opacity-60 animate-spin" />
            </span>
            <h2 className="text-xl font-semibold text-gray-800">Processing your profile...</h2>
            <p className="text-gray-500 text-center max-w-xs">We're analyzing your information to personalize your experience. This may take a few moments. Please check back soon!</p>
        </div>
    );
} 
