import Link from "next/link";
import {Info, TriangleAlert, Siren, Flag} from "lucide-react";
import {cva} from "class-variance-authority";

type BroadcastCardProps = {
  message: string;
  link?: string;
  hasLink?: boolean;
  variant?: "info" | "warning" | "error" | "critical";
  action?: string;
};

const broadcastBannerStyles = cva(
  "max-xl:h-fit h-12 max-xl:py-3 flex items-center justify-center border-y",
  {
    variants: {
      variant: {
        info: "bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-400",
        warning: "bg-orange-500/10 border-orange-500/20 text-orange-700 dark:text-orange-400",
        error: "bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400",
        critical: "bg-violet-500/10 border-violet-500/20 text-violet-700 dark:text-violet-400",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

// Choose icon based on the variant
const getIcon = (variant: BroadcastCardProps["variant"]) => {
  switch (variant) {
    case "info":
      return <Info className="size-5 mr-2"/>;
    case "warning":
      return <TriangleAlert className="size-5 mr-2"/>;
    case "error":
      return <Flag className="size-5 mr-2"/>;
    case "critical":
      return <Siren className="size-5 mr-2"/>;
    default:
      return <Info className="size-5 mr-2"/>;
  }
};

// Choose link color based on the variant
const getLinkColor = (variant: BroadcastCardProps["variant"]) => {
  switch (variant) {
    case "info":
      return "text-blue-700 group-hover:text-blue-900 dark:group-hover:text-blue-500";
    case "warning":
      return "text-orange-700 group-hover:text-orange-900 dark:group-hover:text-orange-400";
    case "error":
      return "text-red-700 group-hover:text-red-900 dark:group-hover:text-red-400";
    case "critical":
      return "text-violet-700 group-hover:text-violet-900 dark:group-hover:text-violet-400";
    default:
      return "text-blue-700";
  }
};

export default function BroadcastBanner({
                                          message,
                                          link,
                                          hasLink,
                                          variant = "info",
                                          action // Default variant
                                        }: BroadcastCardProps) {
  return (
    <div className={broadcastBannerStyles({variant})}>
      <div className="container text-sm">
        <div className="flex max-md:items-start items-center justify-center">
          <div>
            {getIcon(variant)} {/* Display the appropriate icon */}
          </div>
          <p className="font-medium">
            {message}{" "}
            {hasLink && (
              <Link
                href={link || ""}
                className={`underline underline-offset-4 inline-flex items-center group ${getLinkColor(variant)}`}
              >
                <span className={`group-hover:${getLinkColor(variant)}`}>
                  {action || "Learn more"}
                </span>
              </Link>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
