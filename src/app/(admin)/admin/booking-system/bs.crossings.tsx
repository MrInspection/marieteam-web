'use client'

import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Plus, AlertCircle, Pencil, CalendarIcon, X } from 'lucide-react'
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RegisterCrossing, UpdateCrossing } from "@/app/(admin)/admin/booking-system/booking-system.action"
import {
    Boat,
    Crossing,
    CrossingInput,
    CrossingInputSchema,
    Route,
} from "@/app/(admin)/admin/booking-system/booking-system.schema"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { TimePicker } from "@/components/ui/time-picker/time-picker"

type CrossingFormsProps = {
    crossings: Crossing[]
    boats: Boat[]
    routes: Route[]
}

export function CrossingManagement({ crossings, boats, routes }: CrossingFormsProps) {
    const [localCrossings, setLocalCrossings] = useState<Crossing[]>(crossings)
    const [isCreating, setIsCreating] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)

    const createForm = useForm<CrossingInput>({
        resolver: zodResolver(CrossingInputSchema),
        defaultValues: {
            departureTime: new Date(),
            boatId: '',
            routeId: '',
        },
    })

    const editForm = useForm<CrossingInput>({
        resolver: zodResolver(CrossingInputSchema),
        defaultValues: {
            departureTime: new Date(),
            boatId: '',
            routeId: '',
        },
    })

    const renderEmptyState = () => (
        <div className="flex flex-col items-center justify-center p-8 text-center">
            <AlertCircle className="size-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No crossings found</h3>
            <p className="text-muted-foreground mb-4">There are no crossings in the system yet.</p>
            <Button onClick={() => setIsCreating(true)}>
                <Plus className="size-4 mr-2" /> Add Your First Crossing
            </Button>
        </div>
    )

    async function onCreateSubmit(values: CrossingInput) {
        try {
            const newCrossing = await RegisterCrossing(values)
            // @ts-expect-error - Not taking into consideration some props elements
            setLocalCrossings((prevCrossings) => [...prevCrossings, newCrossing])
            setIsCreating(false)
            toast.success("Your crossing has been registered.")
            createForm.reset()
        } catch (error) {
            toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred.'}`)
        }
    }

    async function onEditSubmit(values: CrossingInput) {
        if (!editingId) return

        try {
            // @ts-expect-error Not taking into account some properties
            const updatedCrossing = await UpdateCrossing(editingId, values)
            setLocalCrossings((prevCrossings) =>
                prevCrossings.map((crossing) => (crossing.id === updatedCrossing.id ? updatedCrossing : crossing))
            )
            setEditingId(null)
            toast.success("Crossing has been updated.")
            editForm.reset()
        } catch (error) {
            toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred.'}`)
        }
    }

    const renderForm = (form: typeof createForm | typeof editForm, onSubmit: (values: CrossingInput) => Promise<void>, cancelAction: () => void) => (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="border-2 border-dashed border-primary-40 space-y-4 p-6 rounded-2xl">
                <div className="grid md:grid-cols-3 gap-4">
                    <FormField
                        control={form.control}
                        name="boatId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Boat</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a boat" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {boats.map((boat) => (
                                            <SelectItem key={boat.id} value={boat.id}>
                                                {boat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="routeId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Route</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a route" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {routes.map((route) => (
                                            <SelectItem key={route.id} value={route.id}>
                                                {route.departurePort} - {route.arrivalPort}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    /><FormField
                    control={form.control}
                    name="departureTime"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Departure Time</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {field.value ? (
                                                format(field.value, "PPP HH:mm:ss")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        initialFocus
                                    />
                                    <div className="p-3 border-t border-border">
                                        <TimePicker
                                            setDate={field.onChange}
                                            date={field.value}
                                        />
                                    </div>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                </div>
                <div className="flex justify-end space-x-2 pt-2">
                    <Button type="button" variant="outline" onClick={cancelAction}>Cancel</Button>
                    <Button type="submit">
                        {form === createForm ? 'Create Crossing' : 'Update Crossing'}
                    </Button>
                </div>
            </form>
        </Form>
    )

    return (
        <div className="space-y-6 mt-16">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Manage Crossings</h2>
                {!isCreating && (
                    <Button onClick={() => setIsCreating(true)}>
                        <Plus className="size-4" /> New
                    </Button>
                )}
            </div>

            {isCreating && renderForm(createForm, onCreateSubmit, () => setIsCreating(false))}

            <section className="border rounded-2xl p-4">
                {localCrossings.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="max-lg:hidden">Crossing Id</TableHead>
                                <TableHead className="max-md:hidden">Boat</TableHead>
                                <TableHead>Departure Time</TableHead>
                                <TableHead>Route</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {localCrossings.map((crossing) => (
                                <TableRow key={crossing.id}>
                                    <TableCell className="max-lg:hidden">{crossing.id}</TableCell>
                                    <TableCell className="max-md:hidden">{boats.find(b => b.id === crossing.boatId)?.name || 'N/A'}</TableCell>
                                    <TableCell>
                                        {format(new Date(crossing.departureTime), "PPP HH:mm:ss")}
                                    </TableCell>
                                    <TableCell>
                                        {routes.find(r => r.id === crossing.routeId)?.departurePort || 'N/A'} - {" "}
                                        {routes.find(r => r.id === crossing.routeId)?.arrivalPort || 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                        {editingId === crossing.id ? (
                                            <Button variant="ghost" size="sm" onClick={() => setEditingId(null)}>
                                                <X className="size-4" /> Cancel
                                            </Button>
                                        ) : (
                                            <Button variant="ghost" size="sm" onClick={() => {
                                                setEditingId(crossing.id)
                                                editForm.reset(crossing)
                                            }}>
                                                <Pencil className="size-4" /> Edit
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {editingId && (
                                <TableRow>
                                    <TableCell colSpan={5} className={"pt-6"}>
                                        {renderForm(editForm, onEditSubmit, () => setEditingId(null))}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                ) : (
                    renderEmptyState()
                )}
            </section>
        </div>
    )
}