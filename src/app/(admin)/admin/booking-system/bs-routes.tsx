'use client'

import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
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
import { Plus, AlertCircle, Pencil } from 'lucide-react'
import { Route, RouteInputSchema, RouteInput } from "@/app/(admin)/admin/booking-system/booking-system.schema"
import { RegisterRoute, UpdateRoute } from "@/app/(admin)/admin/booking-system/booking-system.action"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GeographicalZone } from "@prisma/client"
import {formatName} from "@/utils/text-formatter";

type RouteFormsProps = {
    routes: Route[]
}

export function RoutesManagement({ routes }: RouteFormsProps) {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [selectedRoute, setSelectedRoute] = useState<Route | null>(null)
    const [zones] = useState<GeographicalZone[]>(Object.values(GeographicalZone))
    const [localRoutes, setLocalRoutes] = useState<Route[]>(routes)

    const form = useForm<RouteInput>({
        resolver: zodResolver(RouteInputSchema),
        defaultValues: {
            distance: 10,
            departurePort: '',
            arrivalPort: '',
            geographicalZone: GeographicalZone.AIX,
        },
    })

    const editForm = useForm<RouteInput>({
        resolver: zodResolver(RouteInputSchema),
        defaultValues: {
            distance: 10,
            departurePort: '',
            arrivalPort: '',
            geographicalZone: GeographicalZone.AIX,
        },
    })

    const renderEmptyState = () => (
        <div className="flex flex-col items-center justify-center p-8 text-center">
            <AlertCircle className="size-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No routes found</h3>
            <p className="text-muted-foreground mb-4">There are no routes in the system yet.</p>
            <Button onClick={() => setDialogOpen(true)}>
                <Plus className="size-4 mr-2" /> Add Your First Route
            </Button>
        </div>
    )

    async function onSubmit(values: RouteInput) {
        try {
            const newRoute = await RegisterRoute(values);
            setLocalRoutes((prevRoutes) => [...prevRoutes, newRoute]);
            setDialogOpen(false);
            toast.success("Your route has been registered.");
            form.reset();
        } catch (error) {
            toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred.'}`);
        }
    }

    async function onEditSubmit(values: RouteInput) {
        if (!selectedRoute) return;

        try {
            // @ts-expect-error Not taking into account some properties
            const updatedRoute = await UpdateRoute(selectedRoute.id, values);
            setLocalRoutes((prevRoutes) =>
                prevRoutes.map((route) => (route.id === updatedRoute.id ? updatedRoute : route))
            );
            setEditDialogOpen(false);
            toast.success("Route has been updated.");
            editForm.reset();
        } catch (error) {
            toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred.'}`);
        }
    }

    return (
        <>
            <div className="flex items-center gap-3 mb-4 justify-between mt-16">
                <h2 className="text-2xl font-semibold">Manage Routes</h2>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="size-4" /> New
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create route</DialogTitle>
                            <DialogDescription>Fill in the details of the route to register.</DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4 mb-2">
                                    <FormField
                                        control={form.control}
                                        name="departurePort"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Departure Port</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter the departure port" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="arrivalPort"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Arrival Port</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter the arrival port" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="geographicalZone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Geographical Zone</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a zone" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {zones.map((zone) => (
                                                            <SelectItem key={zone} value={zone}>
                                                                {formatName(zone)}
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
                                        name="distance"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Distance</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Distance in meters"
                                                        {...field}
                                                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button type="submit" className="w-full">Create Route</Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>
            <section className="border rounded-2xl p-4">
                {localRoutes.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="max-lg:hidden">Route Id</TableHead>
                                <TableHead>Distance</TableHead>
                                <TableHead>Departure</TableHead>
                                <TableHead>Arrival</TableHead>
                                <TableHead className="max-md:hidden">Zone</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {localRoutes.map((route, index) => (
                                <TableRow key={route?.id ?? index}> {/* Use index as fallback for key */}
                                    <TableCell className="max-lg:hidden">{route?.id ?? 'N/A'}</TableCell>
                                    <TableCell>{route?.distance ? `${route.distance}` : 'N/A'}</TableCell>
                                    <TableCell>{route?.departurePort || 'N/A'}</TableCell>
                                    <TableCell>{route?.arrivalPort || 'N/A'}</TableCell>
                                    <TableCell className="max-md:hidden">{formatName(route?.geographicalZone ?? 'N/A')}</TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="sm" onClick={() => {
                                            setSelectedRoute(route)
                                            editForm.reset(route)
                                            setEditDialogOpen(true)
                                        }}>
                                            <Pencil className="size-5"/> <span className="max-llg:hidden">Edit</span>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    renderEmptyState()
                )}
            </section>
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Route</DialogTitle>
                        <DialogDescription>Fill in the details of the route to update.</DialogDescription>
                    </DialogHeader>
                    {selectedRoute && (
                        <Form {...editForm}>
                            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4 mb-2">
                                    <FormField
                                        control={editForm.control}
                                        name="departurePort"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Departure Port</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={editForm.control}
                                        name="arrivalPort"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Arrival Port</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={editForm.control}
                                        name="geographicalZone"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Geographical Zone</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {zones.map((zone) => (
                                                            <SelectItem key={zone} value={zone}>
                                                                {formatName(zone)}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={editForm.control}
                                        name="distance"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Distance</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        {...field}
                                                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                    <Button type="submit" className="w-full">Update Route</Button>
                            </form>
                        </Form>
                        )}
                </DialogContent>
            </Dialog>
        </>
    )
}
