"use client"

import { useState, useEffect } from "react"
import { CalendarIcon, MapPin } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
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
import { CrossingSearch } from "./crossing.schema"
import { getRoutes } from "./search-form.action"
import { Skeleton } from "@/components/ui/skeleton"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Sector } from "@prisma/client"

type Route = {
    id: string
    departure: string
    arrival: string
}

type SearchFormProps = {
    onSubmit: (search: CrossingSearch) => void
}

const formSchema = z.object({
    zone: z.nativeEnum(Sector, {
        message: "Please select a geographical zone",
    }),
    date: z.date({
        message: "Please select the travel date",
    }),
    routeId: z.string({
        message: "Please select the travel route",
    }),
})

export function SearchForm({ onSubmit }: SearchFormProps) {
    const [routes, setRoutes] = useState<Route[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            zone: undefined,
            date: undefined,
            routeId: undefined,
        },
    })

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const fetchedRoutes = await getRoutes()
                setRoutes(fetchedRoutes)
            } catch (error) {
                console.error("Error fetching routes:", error)
                // Handle error (e.g., show error message to user)
            } finally {
                setIsLoading(false)
            }
        }

        fetchRoutes().then(r => console.log(r))
    }, [])

    function onSubmitForm(values: z.infer<typeof formSchema>) {
        onSubmit(values as CrossingSearch)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                    <FormField
                        control={form.control}
                        name="zone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Geographical Zone</FormLabel>
                                {isLoading ? (
                                    <Skeleton className="h-10 w-full" />
                                ) : (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a geographical zone" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(Sector).map((z) => (
                                                <SelectItem key={z} value={z}>
                                                    <div className="flex items-center">
                                                        <MapPin className="w-4 h-4 mr-2" />
                                                        {z.replace(/_/g, ' ')}
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Travel Date</FormLabel>
                                {isLoading ? (
                                    <Skeleton className="h-10 w-full" />
                                ) : (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {field.value ? format(field.value, "PPP") : <span>Pick the travel date</span>}
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="center">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                )}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="routeId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Trip Route</FormLabel>
                                {isLoading ? (
                                    <Skeleton className="h-10 w-full" />
                                ) : (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a route" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {routes.map((r) => (
                                                <SelectItem key={r.id} value={r.id}>
                                                    {r.departure} - {r.arrival}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" className="self-end mt-1 w-full" disabled={isLoading}>
                    Search Trips
                </Button>
            </form>
        </Form>
    )
}
