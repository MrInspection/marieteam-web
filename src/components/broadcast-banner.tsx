import Link from "next/link";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { cva } from "class-variance-authority";

type BroadcastCardProps = {
    message: string;
    link?: string;
    hasLink?: boolean;
    variant?: "info" | "warning" | "error" | "critical"; // Variants
};

const broadcastBannerStyles = cva(
    "max-md:h-fit h-12 max-md:py-3 flex items-center justify-center border-y",
    {
        variants: {
            variant: {
                info: "bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-400",
                warning: "bg-orange-500/10 border-orange-500/20 text-orange-700 dark:text-orange-400",
                error: "bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400",
                critical: "bg-purple-500/10 border-purple-500/20 text-purple-700 dark:text-purple-400",
            },
        },
        defaultVariants: {
            variant: "info",
        },
    }
);

export default function BroadcastBanner({
                                            message,
                                            link,
                                            hasLink,
                                            variant = "info", // Default variant
                                        }: BroadcastCardProps) {
    return (
        <div className={broadcastBannerStyles({ variant })}>
            <div className="container text-sm">
                <div className="flex max-md:items-start items-center justify-center">
                    <div>
                        <InfoCircledIcon className="size-5 mr-2" />
                    </div>
                    <p className="font-medium">
                        {message} {hasLink && (
                        <Link
                            href={link || ""}
                            target="_blank"
                            className="underline underline-offset-4 inline-flex items-center group"
                        >
                <span className="text-foreground group-hover:text-blue-700 dark:group-hover:text-blue-400">
                  Learn more
                </span>
                        </Link>
                    )}
                    </p>
                </div>
            </div>
        </div>
    );
}
