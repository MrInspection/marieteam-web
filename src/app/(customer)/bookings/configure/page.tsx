import {notFound} from "next/navigation";
import {prisma} from "@/lib/db";

type ConfigurePageProps = {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

const ConfigurePage = async ({searchParams}: ConfigurePageProps) => {
    const { trip } = searchParams

    if(!trip || typeof trip !== "string") {
        return notFound()
    }

    const configureTrip = await prisma.crossing.findUnique({
        where: {
            id: trip
        },
        include: {
            boat: true,
            route: true,
            seats: true,
            captainLogs: {
                orderBy: {
                    createdAt: 'desc'
                },
                take: 1
            }
        }
    })

    if(!configureTrip) {
        return notFound()
    }

    return (
        <>
            <div className={"container max-w-7xl py-8"}>
                <p>Configure Page logic params : <span className={"border-2 rounded-2xl px-2 py-0.5 bg-blue-500/10 text-sm font-medium"}>{configureTrip.id}</span> </p>
            </div>
        </>
    )
}

export default ConfigurePage
