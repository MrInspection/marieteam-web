import { prisma } from "@/lib/db";
import InvalidConfiguration from "@/app/(customer)/bookings/configure/error";
import { ConfigureTripForm } from "@/app/(customer)/bookings/configure/configure-form";

type ConfigurePageProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const ConfigurePage = async ({ searchParams }: ConfigurePageProps) => {
  const { trip } = searchParams;

  if (!trip || typeof trip !== "string") {
    return InvalidConfiguration();
  }

  const configureTrip = await prisma.crossing.findUnique({
    where: {
      id: trip,
    },
    include: {
      boat: true,
      route: true,
      seatAvailability: {
        include: {
          seatType: {
            include: {
              seatCategory: true,
            },
          },
        },
      },
      captainLogs: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
  });

  if (!configureTrip) {
    return InvalidConfiguration();
  }

  return (
    <>
      <div className={"h-20 border-b"}>

      </div>
      <div className={"container max-w-7xl py-8 h-screen"}>
        <p>
          Configure Page logic params :{" "}
          <span
            className={
              "border-2 rounded-2xl px-2 py-0.5 bg-blue-500/10 text-sm font-medium"
            }
          >
            {configureTrip.id}
          </span>{" "}
        </p>
        <ConfigureTripForm />
      </div>
    </>
  );
};

export default ConfigurePage;
