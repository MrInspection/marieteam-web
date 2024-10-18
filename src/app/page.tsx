import Link from "next/link";
import {ModeToggle} from "@/components/theme-toggle";

export default async function Home() {
  return (
      <>

          <div className={"container min-h-screen my-16"}>




              <Link href="/bookings">
                  Orders
              </Link>
              <ModeToggle/>
          </div>

      </>
  );
}
