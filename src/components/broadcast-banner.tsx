import Link from "next/link";
import { InfoCircledIcon } from "@radix-ui/react-icons";

type BroadcastCardProps = {
  message: string;
  link?: string;
  hasLink?: boolean;
};

export default function BroadcastBanner({
  message,
  link,
  hasLink,
}: BroadcastCardProps) {
  return (
    <>
      <div
        className={
          " bg-orange-500/10 max-md:h-fit h-12 max-md:py-3 flex items-center justify-center border-y border-orange-500/20"
        }
      >
        <div className={"container text-sm"}>
          <div
            className={
              "flex max-md:items-start items-center justify-center text-orange-700 dark:text-orange-400"
            }
          >
            <InfoCircledIcon className={"max-sm:size-7 size-5 mr-2"} />
            <p className={"font-medium"}>
              {message} {""}
              {hasLink && (
                <Link
                  href={link || ""}
                  target={"_blank"}
                  className={
                    "underline underline-offset-4 inline-flex items-center group"
                  }
                >
                  <span
                    className={
                      "text-foreground group-hover:text-orange-700 dark:group-hover:text-orange-400"
                    }
                  >
                    Learn more
                  </span>
                </Link>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
