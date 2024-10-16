/*"use client"

import { useState } from "react"
import {
    CalendarIcon,
    Ship,
    Clock,
    Tag,
    MapPin,
    Ruler,
    Gauge,
    Info,
    AlertTriangle,
    Waves,
    ArrowRight,
    Anchor
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image";

// Types based on the provided schema
type SeatType = "PASSENGER" | "VEHICLE_UNDER_2M" | "VEHICLE_OVER_2M"
type Sector = "AIX" | "BATZ" | "BELLE_ILE_EN_MER" | "BREHAT" | "HOUAT" | "ILE_DE_GROIX" | "MOLENE" | "OUESSANT" | "SEIN" | "YEU"
type SeaCondition = "CALM" | "SLIGHTLY_ROUGH" | "ROUGH" | "VERY_ROUGH"

interface Boat {
    id: string
    name: string
    length: number
    width: number
    speed: number
    equipment: string[]
}

interface Route {
    id: string
    distance: number
    departure: string
    arrival: string
    sector: Sector
}

interface Crossing {
    id: string
    departureTime: Date
    boat: Boat
    route: Route
    seats: {
        type: SeatType
        available: number
        capacity: number
    }[]
    delayMinutes?: number
    seaCondition: SeaCondition
}

const zones: Sector[] = [
    "AIX",
    "BATZ",
    "BELLE_ILE_EN_MER",
    "BREHAT",
    "HOUAT",
    "ILE_DE_GROIX",
    "MOLENE",
    "OUESSANT",
    "SEIN",
    "YEU"
]

const routes = [
    { id: "route1", departure: "Quiberon", arrival: "Le Palais" },
    { id: "route2", departure: "Le Palais", arrival: "Quiberon" },
    { id: "route3", departure: "Quiberon", arrival: "Sauzon" },
    { id: "route4", departure: "Sauzon", arrival: "Quiberon" },
    { id: "route5", departure: "Quiberon", arrival: "Locmaria" },
    { id: "route6", departure: "Locmaria", arrival: "Quiberon" },
]

const mockCrossings: Crossing[] = [
    {
        id: "541197",
        departureTime: new Date("2024-09-17T07:45:00"),
        boat: {
            id: "boat1",
            name: "Columbus 40s Hybrid",
            length: 40,
            width: 10,
            speed: 20,
            equipment: ["Life jackets", "GPS", "Radar"],
        },
        route: {
            id: "route1",
            distance: 15,
            departure: "Quiberon",
            arrival: "Le Palais",
            sector: "BELLE_ILE_EN_MER"
        },
        seats: [
            { type: "PASSENGER", available: 0, capacity: 300 },
            { type: "VEHICLE_UNDER_2M", available: 0, capacity: 30 },
            { type: "VEHICLE_OVER_2M", available: 0, capacity: 10 }
        ],
        delayMinutes: 0,
        seaCondition: "CALM"
    },
    {
        id: "541198",
        departureTime: new Date("2024-09-17T09:15:00"),
        boat: {
            id: "boat2",
            name: "Ar Solen",
            length: 45,
            width: 12,
            speed: 22,
            equipment: ["Life jackets", "GPS", "Radar", "Medical kit"],
        },
        route: {
            id: "route1",
            distance: 15,
            departure: "Quiberon",
            arrival: "Le Palais",
            sector: "BELLE_ILE_EN_MER"
        },
        seats: [
            { type: "PASSENGER", available: 276, capacity: 350 },
            { type: "VEHICLE_UNDER_2M", available: 25, capacity: 35 },
            { type: "VEHICLE_OVER_2M", available: 8, capacity: 15 }
        ],
        delayMinutes: 40,
        seaCondition: "VERY_ROUGH"
    },
]

export default function Component() {
    const [zone, setZone] = useState<Sector>()
    const [date, setDate] = useState<Date>()
    const [route, setRoute] = useState<string>()
    const [crossings, setCrossings] = useState<Crossing[] | null>(null)
    const [selectedCrossing, setSelectedCrossing] = useState<Crossing | null>(null)
    const [searched, setSearched] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // In a real application, you would fetch crossings based on the selected zone, date, and route
        setCrossings(mockCrossings)
        setSearched(true)
    }

    const CrossingDetails = ({ crossing }: { crossing: Crossing }) => (
        <div className="space-y-4">

            <div className={"border-2 p-2 rounded-2xl"}>
                {/!* eslint-disable-next-line @next/next/no-img-element *!/}
                <img src={"https://www.talamare.fr/medias/501-yacht-columbus-40s.jpg"} alt={crossing.boat.name}
                     width={100} height={100}
                     className={"rounded-xl w-full aspect-video border-2 grayscale"}/>
                <div className="flex items-center space-x-2 border-2 px-4 py-2 rounded-xl mt-2">
                    <Anchor className="size-4"/>
                    <span className="font-semibold text-sm">{crossing.boat.name}</span>
                </div>

            </div>

            <section className={"grid grid-cols-2 gap-2"}>
                <div className={"border-2 py-2 px-3 rounded-xl"}>
                    <p className="text-sm text-muted-foreground">Departure</p>
                    <p className={"font-medium "}>{crossing.route.departure}</p>
                </div>
                <div className={"border-2 py-2 px-3 rounded-xl"}>
                    <p className="text-sm text-muted-foreground">Arrival</p>
                    <p className={"font-bold"}>{crossing.route.arrival}</p>
                </div>
                <div className={"border-2 py-2 px-3 rounded-xl"}>
                    <p className="text-sm text-muted-foreground">Departure Time</p>
                    <p className={"font-medium"}>{format(crossing.departureTime, "HH:mm")}</p>
                </div>
                <div className={"border-2 py-2 px-3 rounded-xl"}>
                    <p className="text-sm text-muted-foreground">Sea Condition</p>
                    <p className={"font-medium"}>{getSeaConditionInfo(crossing.seaCondition).label}</p>
                </div>

            </section>





            <div>
                <h4 className="font-semibold mb-2">Available Seats:</h4>
                <div className="grid grid-cols-2 gap-2">
                    {crossing.seats.map((seat) => (
                        <div key={seat.type} className={"border-2 py-2 px-3 rounded-xl"}>
                            <p className="text-sm text-muted-foreground">{seat.type}: {seat.available}/{seat.capacity}</p>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

    const getSeaConditionInfo = (condition: SeaCondition) => {
        switch (condition) {
            case "CALM":
                return {color: "text-green-500", bgColor: "bg-green-100", label: "Calm"}
            case "SLIGHTLY_ROUGH":
                return {color: "text-yellow-500", bgColor: "bg-yellow-100", label: "Slightly Rough"}
            case "ROUGH":
                return {color: "text-orange-500", bgColor: "bg-orange-100", label: "Rough"}
            case "VERY_ROUGH":
                return {color: "text-purple-700", bgColor: "bg-purple-100", label: "Very Rough" }
            default:
                return { color: "text-gray-500", bgColor: "bg-gray-100", label: "Unknown" }
        }
    }

    const getDelayInfo = (delayMinutes: number | undefined) => {
        if (delayMinutes === undefined || delayMinutes === 0) {
            return { color: "text-green-500", bgColor: "bg-green-100", label: "On Time", icon: Clock }
        } else {
            return { color: "text-yellow-500", bgColor: "bg-yellow-100", label: `${delayMinutes} min delay`, icon: AlertTriangle }
        }
    }

    return (
        <div className="min-h-screen p-4">
            <div className="max-w-7xl mx-auto space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center gap-2">
                            <Ship className="h-6 w-6" />
                            Compagnie MarieTeam
                        </CardTitle>
                        <CardDescription>Book your next sea adventure</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="zone" className="block text-sm font-medium text-gray-700">
                                        Select Zone
                                    </label>
                                    <Select onValueChange={(value) => setZone(value as Sector)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a zone" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {zones.map((z) => (
                                                <SelectItem key={z} value={z}>
                                                    <div className="flex items-center">
                                                        <MapPin className="w-4 h-4 mr-2" />
                                                        {z.replace(/_/g, ' ')}
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                                        Travel Date
                                    </label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !date && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="route" className="block text-sm font-medium text-gray-700">
                                        Trip Route
                                    </label>
                                    <Select onValueChange={setRoute}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a route" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {routes.map((r) => (
                                                <SelectItem key={r.id} value={r.id}>
                                                    {r.departure} - {r.arrival}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button type="submit" className="self-end">
                                    Search Trips
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {!searched && (
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-center text-gray-500">
                                {/!* eslint-disable-next-line react/no-unescaped-entities *!/}
                                Select a zone, date, and route, then click "Search Trips" to see available crossings.
                            </p>
                        </CardContent>
                    </Card>
                )}

                {searched && crossings && crossings.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle>Available Trips</CardTitle>
                                    <Badge variant="outline" className="px-4 py-2 bg-purple-100 text-purple-800 rounded-2xl">
                                        {crossings.length} offers available
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <RadioGroup onValueChange={(value) => setSelectedCrossing(crossings.find(c => c.id === value) || null)} className="space-y-4">
                                    {crossings.map((crossing) => (
                                        <div key={crossing.id}>
                                            <RadioGroupItem value={crossing.id} id={crossing.id} className="sr-only" />
                                            <Label
                                                htmlFor={crossing.id}
                                                className={cn(
                                                    "flex flex-col rounded-2xl border-2 p-4 cursor-pointer transition-all overflow-hidden group",
                                                    selectedCrossing?.id === crossing.id
                                                        ? "bg-blue-50 border-blue-500 dark:bg-blue-900/20 dark:border-blue-700 shadow-md"
                                                        : "hover:bg-muted/40"
                                                )}
                                            >
                                                <div className="flex flex-col space-y-4 w-full rounded-2xl p-4">
                                                    <div className="flex items-center justify-between w-full pb-2.5">
                                                        <div className="text-center">
                                                            <div className="text-xs text-gray-600">Departure</div>
                                                            <div
                                                                className="font-semibold text-lg">{crossing.route.departure}</div>
                                                        </div>
                                                        <div className="flex flex-col items-center flex-grow px-4">
                                                            <div
                                                                className="w-full h-0.5 bg-muted-foreground/60 relative">
                                                                <ArrowRight
                                                                    className="absolute top-1/2 -right-1 transform -translate-y-1/2 text-muted-foreground/60"/>
                                                                <div
                                                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background p-1.5 rounded-full">
                                                                    <Anchor className="size-8 text-muted-foreground"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="text-xs text-gray-600">Arrival</div>
                                                            <div
                                                                className="font-semibold text-lg">{crossing.route.arrival}</div>
                                                        </div>
                                                    </div>

                                                    <div className="flex justify-between items-center pt-4 border-t-2">
                                                        <div className="flex items-center space-x-4">
                                                            <div className="flex items-center space-x-2">
                                                                <Ship className="w-5 h-5 text-blue-500"/>
                                                                <span
                                                                    className="font-medium">{crossing.boat.name}</span>
                                                            </div>
                                                            <div
                                                                className={cn((crossing.delayMinutes > 0 ? "line-through text-muted-foreground" : ""), "text-sm font-medium")}>{format(crossing.departureTime, "HH:mm")}</div>
                                                            {crossing.delayMinutes > 0 && (
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger>
                                                                            <div
                                                                                className="flex items-center space-x-1 text-red-700">
                                                                                <Clock className="w-4 h-4"/>
                                                                                <span
                                                                                    className="text-sm">{crossing.delayMinutes} min late</span>
                                                                            </div>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent>
                                                                            <p>Expected
                                                                                delay: {crossing.delayMinutes} minutes</p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            )}
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger>
                                                                        <div
                                                                            className={`flex items-center space-x-1 ${getSeaConditionInfo(crossing.seaCondition).color}`}>
                                                                            <Waves className="w-4 h-4"/>
                                                                            <span
                                                                                className="text-sm">{getSeaConditionInfo(crossing.seaCondition).label}</span>
                                                                        </div>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p>Sea
                                                                            condition: {getSeaConditionInfo(crossing.seaCondition).label}</p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>

                                                        </div>
                                                    </div>
                                                </div>
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </CardContent>
                        </Card>

                        {/!* TODO *!/}
                        <Card className="hidden lg:block">
                            <CardHeader className={"bg-muted/50 py-4"}>
                                <CardTitle className={"text-lg"}>Détails de l&apos;itinéraire</CardTitle>
                            </CardHeader>
                            <CardContent className={"border-t-2 py-6"}>
                                {selectedCrossing ? (
                                    <CrossingDetails crossing={selectedCrossing}/>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-64 text-center">
                                        <Info className="w-12 h-12 text-blue-500 mb-4" />
                                        <p className="text-lg font-medium text-gray-600">Select a trip to view details</p>
                                        <p className="text-sm text-gray-500 mt-2">Click on a trip card to see more information</p>
                                    </div>
                                )}
                            </CardContent>
                            {selectedCrossing && (
                                <CardFooter className={"border-t px-6 py-4"}>
                                    <Button className="w-full">Buy your ticket</Button>
                                </CardFooter>
                            )}
                        </Card>
                    </div>
                )}

                {searched && (!crossings || crossings.length === 0) && (
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-center text-gray-500">
                                No trips found for the selected criteria. Please try different dates or routes.
                            </p>
                        </CardContent>
                    </Card>
                )}

                {selectedCrossing && (
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button className="fixed bottom-4 right-4 lg:hidden">View Trip Details</Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Trip Details</SheetTitle>
                                <SheetDescription>
                                    Information about the selected trip
                                </SheetDescription>
                            </SheetHeader>
                            <div className="mt-4">
                                <CrossingDetails crossing={selectedCrossing} />
                            </div>
                            <Button className="w-full mt-4">Reserve this trip</Button>
                        </SheetContent>
                    </Sheet>
                )}
            </div>
        </div>
    )
}*/
