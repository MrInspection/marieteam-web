"use client"

import SiteHeader from "@/components/site-header";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Anchor, Aperture, CalendarIcon, Clock, MapPin, Navigation, Route, Ship, Tag, Users} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Calendar} from "@/components/ui/calendar";
import {cn} from "@/lib/utils";
import {addDays, format} from "date-fns";
import {Separator} from "@/components/ui/separator";
import {Badge} from "@/components/ui/badge";
import {SiSeat} from "react-icons/si";

const zones = [
    "Aix",
    "Batz",
    "Belle-Ile-en-Mer",
    "Bréhat",
    "Houat",
    "Ile de Groix",
    "Molène",
    "Ouessant",
    "Sein",
    "Yeu"
]

const destinations = [
    "Quiberon - Le Palais",
    "Le Palais - Quiberon",
    "Quiberon - Sauzon",
    "Sauzon - Quiberon",
    "Quiberon - Locmaria",
    "Locmaria - Quiberon",
]

const mockTrips = [
    { id: "541197", time: "07:45", boat: "Kor' Ant", seats: { A: 238, B: 11, C: 2 }, image: "/placeholder.svg?height=100&width=200" },
    { id: "541198", time: "09:15", boat: "Ar Solen", seats: { A: 276, B: 5, C: 1 }, image: "/placeholder.svg?height=100&width=200" },
    { id: "541199", time: "10:50", boat: "Al'xi", seats: { A: 250, B: 3, C: 0 }, image: "/placeholder.svg?height=100&width=200" },
    { id: "541200", time: "12:15", boat: "Luce isle", seats: { A: 155, B: 0, C: 0 }, image: "/placeholder.svg?height=100&width=200" },
    { id: "541201", time: "14:30", boat: "Kor' Ant", seats: { A: 210, B: 9, C: 2 }, image: "/placeholder.svg?height=100&width=200" },
    { id: "541202", time: "16:45", boat: "Ar Solen", seats: { A: 180, B: 2, C: 1 }, image: "/placeholder.svg?height=100&width=200" },
    { id: "541203", time: "18:15", boat: "Al'xi", seats: { A: 206, B: 2, C: 0 }, image: "/placeholder.svg?height=100&width=200" },
    { id: "541204", time: "19:45", boat: "Maëllys", seats: { A: 132, B: 0, C: 0 }, image: "/placeholder.svg?height=100&width=200" },
]

export default function BookATripPage() {

    const [zone, setZone] = useState<string>()
    const [date, setDate] = useState<Date>()
    const [destination, setDestination] = useState<string>()
    const [trips, setTrips] = useState<typeof mockTrips | null>(null)
    const [selectedTrip, setSelectedTrip] = useState<string | null>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // In a real application, you would fetch trips based on the selected zone, date, and destination
        setTrips(mockTrips)
    }

    return (
        <>
            <div className={""}>
                <div className={"container py-20 max-w-screen-2xl"}>


                    <div className={"flex gap-6 "}>
                        <section className={"w-3/4"}>
                            <div className={"border-2 h-screen rounded-xl p-16"}>

                                <div className={"border-2 rounded-2xl p-4 flex items-center gap-4"}>
                                    <div className={"border-2 rounded-xl p-4 w-fit"}>
                                        <Aperture className={"size-8 "}/>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-lg mb-1">Spectron Leviathan Submarine</div>
                                        <div className="flex space-x-2">
                                            <Badge variant="outline"
                                                   className="text-xs">
                                                <Tag className="w-3 h-3 mr-1"/>
                                                ID: MT-465812
                                            </Badge>
                                            <Badge variant="outline"
                                                   className="text-xs ">
                                                <Clock className="w-3 h-3 mr-1"/>
                                                2:00 AM
                                            </Badge>
                                            <Badge variant="outline"
                                                   className="text-xs ">
                                                <Users className="size-3 mr-1"/>
                                                20 passengers
                                            </Badge>
                                        </div>
                                    </div>
                                </div>




                    </div>
                </section>
                <section className={"w-1/4"}>
                    <Card className="max-w-4xl">
                        <CardHeader className={"flex flex-col items-start bg-muted/50"}>
                            <div className="grid gap-0.5">
                                <CardTitle className="">
                                    MarieTeam Booking
                                </CardTitle>
                                <CardDescription>Book your next sea adventure</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4 p-6">
                                    <div className="space-y-2">
                                        <label htmlFor="zone" className="block text-sm font-medium">
                                            Geographical Zone
                                        </label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a zone"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {zones.map((zone, index) => (
                                                    <SelectItem key={index} value={zone}>
                                                        <div className="flex items-center">
                                                            <MapPin className="w-4 h-4 mr-2"/>
                                                            {zone}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Separator/>
                                    <div className="space-y-2">
                                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                                            Travel Date & Destination
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
                                                    <CalendarIcon className="mr-2 h-4 w-4"/>
                                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                align="center"
                                                className="flex w-full flex-col space-y-2 p-2"
                                            >
                                                <Select
                                                    onValueChange={(value) =>
                                                        setDate(addDays(new Date(), parseInt(value)))
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select timeframe"/>
                                                    </SelectTrigger>
                                                    <SelectContent position="popper">
                                                        <SelectItem value="0">Today</SelectItem>
                                                        <SelectItem value="1">Tomorrow</SelectItem>
                                                        <SelectItem value="3">In 3 days</SelectItem>
                                                        <SelectItem value="7">In a week</SelectItem>
                                                        <SelectItem value="31">In a month</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <div className="rounded-md border">
                                                    <Calendar mode="single" selected={date} onSelect={setDate}/>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div className="space-y-2">
                                        {/*<label htmlFor="destination" className="block text-sm font-medium text-gray-700">
                                        Route
                                    </label>*/}
                                        <Select onValueChange={setDestination}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a travel route"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {destinations.map((dest) => (
                                                    <SelectItem key={dest} value={dest}>
                                                        <div className="flex items-center">
                                                            <Route className="size-4 mr-2 text-pink-700"/>
                                                            {dest}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button type="submit" className="w-full">
                                        Search Trips
                                    </Button>
                                </CardFooter>
                            </Card>
                        </section>
                    </div>


                </div>
            </div>
        </>
    )
}

