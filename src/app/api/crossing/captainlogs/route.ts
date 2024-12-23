import {z} from "zod";
import {SeaCondition} from "@prisma/client";
import {headers} from "next/headers";
import {NextResponse} from "next/server";
import {prisma} from "@/lib/db";

const REQUEST_SCHEMA = z.object({
  crossingId: z.string().cuid(),
  seaCondition: z.nativeEnum(SeaCondition),
  delayMinutes: z.number().optional(),
  delayReason: z.string().optional(),
}).strict()

export async function POST(req: Request) {
  try {
    const authorization = (await headers()).get("Authorization")

    if (!authorization) {
      return NextResponse.json({message: "Unauthorized"}, {status: 401})
    }

    if (!authorization.startsWith("Bearer ")) {
      return NextResponse.json({message: "Invalid authorization header. Expected 'Bearer API_KEY'"}, {status: 401})
    }

    const API_KEY = authorization.split(" ")[1]

    if (!API_KEY || API_KEY.trim() === "" || API_KEY !== process.env.MARIETEAM_API_KEY) {
      return NextResponse.json({message: "Invalid API key"}, {status: 401})
    }

    let requestData: unknown

    try {
      requestData = await req.json()
    } catch {
      return NextResponse.json({message: "Invalid JSON request body"}, {status: 400})
    }

    const validatedRequestData = REQUEST_SCHEMA.parse(requestData)

    const crossing = await prisma.crossing.findUnique({
      where: {
        id: validatedRequestData.crossingId,
      },
    })

    if (!crossing) {
      return NextResponse.json({message: "Invalid crossing ID"}, {status: 404})
    }

    if (validatedRequestData.seaCondition.trim() === "") {
      return NextResponse.json({message: "Invalid sea condition"}, {status: 400})
    }

    const captainLog = await prisma.captainLog.create({
      data: {
        crossingId: crossing.id,
        seaCondition: validatedRequestData.seaCondition,
        delayMinutes: validatedRequestData.delayMinutes,
        delayReason: validatedRequestData.delayReason,
      }
    })

    return NextResponse.json({
      message: "Captain log created successfully under the following ID: " + captainLog.id,
      registeredData: {
        crossingId: captainLog.crossingId,
        seaCondition: captainLog.seaCondition,
        delayMinutes: captainLog.delayMinutes,
        delayReason: captainLog.delayReason,
        createdAt: captainLog.createdAt,
        updatedAt: captainLog.updatedAt,
      }
    })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({message: err.issues}, {status: 400})
    }
    return NextResponse.json({message: "Internal server error"}, {status: 500})
  }
}
