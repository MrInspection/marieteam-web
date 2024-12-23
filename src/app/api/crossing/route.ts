import {headers} from "next/headers";
import {NextRequest, NextResponse} from "next/server";
import {z} from "zod";
import {GeographicalZone} from "@prisma/client";
import {prisma} from "@/lib/db";
import {endOfDay, startOfDay} from "date-fns";

const PARAMS_SCHEMA = z.object({
  geographicalZone: z.nativeEnum(GeographicalZone),
  date: z.string(),
}).strict()

export async function GET(req: NextRequest) {
  try {
    const authorization = (await headers()).get("authorization");

    if (!authorization) {
      return NextResponse.json("Invalid authorization header", {status: 400})
    }

    if (!authorization.startsWith("Bearer ")) {
      return NextResponse.json("Invalid authorization header. Expected 'Bearer API_KEY'", {status: 400})
    }

    const API_KEY = authorization.split(" ")[1]

    if (!API_KEY || API_KEY.trim() === "" || API_KEY !== process.env.MARIETEAM_API_KEY) {
      return NextResponse.json({message: "Invalid API key"}, {status: 401})
    }

    // Search params data validation
    const geographicalZone = req.nextUrl.searchParams.get("geographicalZone");
    const date = req.nextUrl.searchParams.get("date");

    if (!geographicalZone || !date) {
      return NextResponse.json({error: "Missing parameters"}, {status: 400});
    }

    const validatedParams = PARAMS_SCHEMA.safeParse({
      geographicalZone,
      date,
    })
    const validatedGeographicalZone = validatedParams.data?.geographicalZone;
    const validatedDate = validatedParams.data?.date;

    if (!validatedGeographicalZone || !validatedDate) {
      return NextResponse.json({error: "Invalid parameters"}, {status: 400});
    }

    const crossings = await prisma.crossing.findMany({
      where: {
        route: {
          geographicalZone: validatedGeographicalZone,
        },
        departureTime: {
          gte: startOfDay(validatedDate),
          lte: endOfDay(validatedDate),
        },
      },
      include: {
        boat: true,
        route: true,
      }
    })

    if (!crossings || crossings.length === 0) {
      return NextResponse.json({error: "No crossings found for the given parameters"}, {status: 404});
    }

    return NextResponse.json(crossings, {status: 200});
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(err.issues, {status: 400});
    }
    return NextResponse.json("Internal server error", {status: 500});
  }
}