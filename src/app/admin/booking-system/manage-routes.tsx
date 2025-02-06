'use client'

import {useState} from 'react'
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
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
import {Plus, Pencil, Loader} from 'lucide-react'
import {Route, RouteInputSchema, RouteInput} from "@/app/admin/booking-system/booking-system.schema"
import {addRoute, getRoutes, updateRoute} from "@/app/admin/booking-system/booking-system.action"
import {toast} from "sonner"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {GeographicalZone} from "@prisma/client"
import {formatName} from "@/utils/text-formatter";
import {ExclamationTriangleIcon} from "@radix-ui/react-icons";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

export function ManageRoutes() {
  const queryClient = useQueryClient()
  const [openDialog, setOpenDialog] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null)
  const [zones] = useState<GeographicalZone[]>(Object.values(GeographicalZone))

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
    <div className="flex flex-col items-center justify-center p-8 text-center h-96">
      <ExclamationTriangleIcon className="size-10 text-muted-foreground"/>
      <h3 className="text-lg mt-4 font-semibold mb-2">No routes found</h3>
      <p className="text-muted-foreground mb-4 text-sm">There are no routes in the system yet.</p>
      <Button onClick={() => setOpenDialog(true)}>
        <Plus className="size-4 "/> Add Route
      </Button>
    </div>
  )

  const {data: routes} = useQuery({
    queryKey: ['get-routes'],
    queryFn: async () => getRoutes(),
  })

  const {mutate: registerRoute, isPending: isRegisteringRoute} = useMutation({
    mutationFn: async (values: RouteInput) => addRoute(values),
    onSuccess: () => {
      toast.success("Your route has been registered.");
      queryClient.invalidateQueries({queryKey: ['get-routes']})
      setOpenDialog(false);
      form.reset();
    },
    onError: (err) => toast.error("An error occurred while saving your route: " + err.message),
  })

  const onSubmit = async (values: RouteInput) => registerRoute(values)

  const {mutate: updateSelectedRoute, isPending: isUpdatingRoute} = useMutation({
    mutationFn: async (values: RouteInput) => {
      if (!selectedRoute) return
      await updateRoute(selectedRoute.id, values as Route)
    },
    onSuccess: () => {
      toast.success("Your route has been registered.");
      setEditDialogOpen(false);
      queryClient.invalidateQueries({queryKey: ['get-routes']})
      form.reset();
    },
    onError: (err) => toast.error("An error occurred while saving your route: " + err.message),
  })

  const onEditSubmit = async (values: RouteInput) => {
    updateSelectedRoute(values)
  }

  return (
    <>
      <div className="flex items-center gap-3 mb-4 justify-between mt-16">
        <h2 className="text-2xl font-semibold">Manage Routes</h2>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="size-4"/> New
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
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Departure Port</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter the departure port" {...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="arrivalPort"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Arrival Port</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter the arrival port" {...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="geographicalZone"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Geographical Zone</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a zone"/>
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
                    control={form.control}
                    name="distance"
                    render={({field}) => (
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
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isRegisteringRoute}>
                  {isRegisteringRoute ? (
                    <div className="inline-flex items-center">
                      <Loader className="mr-2 size-4 animate-spin"/>
                      Creating route...
                    </div>
                  ) : (
                    <p>Create Route</p>
                  )}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <section className="border rounded-2xl p-4">
        {!routes || routes.length === 0 ? renderEmptyState() : (
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
              {routes.map((route) => (
                <TableRow key={route.id}>
                  <TableCell className="max-lg:hidden">{route.id}</TableCell>
                  <TableCell>{route.distance}</TableCell>
                  <TableCell>{route.departurePort}</TableCell>
                  <TableCell>{route.arrivalPort}</TableCell>
                  <TableCell className="max-md:hidden">{formatName(route.geographicalZone)}</TableCell>
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
                <Button type="submit" className="w-full" disabled={isUpdatingRoute}>
                  {isUpdatingRoute ? (
                    <div className="inline-flex items-center">
                      <Loader className="mr-2 size-4 animate-spin"/>
                      Updating route...
                    </div>
                  ) : (
                    <p>Update Route</p>
                  )}
                </Button>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
