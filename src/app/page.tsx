import {auth} from "@/auth/auth";
import {prisma} from "@/lib/db";
import {DatabaseZap} from "lucide-react";
import {ModeToggle} from "@/components/theme-toggle";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  const profile = await prisma.user.findFirst({
    where: {
      id: session?.user?.id,
    },
    select: {
      role: true, orders: true,
    },
  });

  const boat = await prisma.boat.findMany({
        take: 10,
        select: {
            id: true,
            name: true,
            length: true,
            width: true,
            speed: true,
            image: true,
            equipment: true,
            crossings: true,
        },
        orderBy: {
            name: "asc",
        }
    })



  return (
      <>
          <div className="container flex flex-col items-center justify-center my-60 space-y-10">
              <section className={"rounded-xl border-2 p-6 w-fit"}>
                  <DatabaseZap className={"size-5 text-blue-500"}/>
                  <h1 className={"mt-3 font-medium"}>Database Queries (User)</h1>
                  <p className={"text-muted-foreground text-sm mt-0.5"}>This is a sample of queries to test if
                      everything is working properly.</p>
                  <div className={"border-2 border-dashed rounded-xl mt-4 p-4 bg-blue-50/40"}>
                      <p>Username : {session?.user?.name}</p>
                      <p>Email : {session?.user?.email}</p>
                      <p>Current Role : {profile?.role}</p>
                      <p>Orders : {profile?.orders?.length} verified orders</p>
                  </div>
              </section>

              <Link href={"/bookings"}>
                  Bookings (temp)
              </Link>
              <ModeToggle />
              {boat.map((boat, index) => (
                  <>
                      <section className={"rounded-xl border-2 p-6 w-fit"} key={index}>
                          <DatabaseZap className={"size-5 text-blue-500"}/>
                          <h1 className={"mt-3 font-medium"}>TEST: Boat Queries</h1>
                          <p className={"text-muted-foreground text-sm mt-0.5"}>This is a sample of queries to test if
                              everything is working properly.</p>
                          <div className={"border-2 border-dashed rounded-xl mt-4 p-4 bg-blue-50/40"}>
                              <p>Boat Name : {boat.name}</p>
                              <p>Length : {boat.length} m</p>
                              <p>Width : {boat.width} m</p>
                              <p>Speed : {boat.speed} noeuds</p>


                              <img src={`${boat.image}`} alt={boat.name} width={500} height={500}
                                   className={"border-2 rounded-2xl my-6"}/>

                              <p className={"my-4"}>Equipment : {boat.equipment.map((item, index) => (
                                  <div key={index} className={"border-l-4 border-l-yellow-500 pl-4"}>
                                      {item}
                                  </div>
                              ))}</p>




                              {/*
                              <Image src{boat.image?} alt={boat.name} width={100} height={100}/>
*/}

                          </div>
                      </section>

                  </>
              ))}
          </div>
      </>
  );
}
