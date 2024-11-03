'use client'

import {useState} from 'react'
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {X, Plus} from 'lucide-react'
import {BoatInput, BoatInputSchema} from "@/app/(admin)/admin/booking-system/booking-system.schema";
import {RegisterBoat} from "@/app/(admin)/admin/booking-system/booking-system.action";
import {toast} from "sonner";
import {ExclamationTriangleIcon} from "@radix-ui/react-icons";

type BoatFormsProps = {
  boats: BoatInput[]
}

export function BoatsManagement({boats}: BoatFormsProps) {

  const [dialogOpen, setDialogOpen] = useState(false)
  const [newEquipment, setNewEquipment] = useState('')
  const [localBoats, setLocalBoats] = useState(boats)

  const form = useForm<BoatInput>({
    resolver: zodResolver(BoatInputSchema),
    defaultValues: {
      name: "",
      length: 0,
      width: 0,
      speed: 0,
      imageUrl: "",
      equipment: [],
    },
  })

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center p-8 text-center h-96">
      <ExclamationTriangleIcon className="size-10 text-muted-foreground"/>
      <h3 className="mt-4 text-lg font-semibold">No boats found</h3>
      <p className="text-muted-foreground text-sm mt-2 mb-4">There are no boats in the system yet.</p>
      <Button onClick={() => setDialogOpen(true)}>
        <Plus className="size-4"/> Add Boat
      </Button>
    </div>
  )

  async function onSubmit(values: BoatInput) {
    try {
      const newBoat = await RegisterBoat(values);
      {/* @ts-expect-error not taking into consideration some props elements */}
      setLocalBoats((prevBoats) => [...prevBoats, newBoat]); // Use functional state update
      setDialogOpen(false);
      toast.success("Your boat has been registered.");
      form.reset();
    } catch (error) {
      console.error("Error registering boat:", error); // Log error for debugging
      toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred.'}`);
    }
  }

  return (
    <>
      <div className="flex items-center gap-3 mb-4 justify-between">
        <h2 className="text-2xl font-semibold">Fleet of boats</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="size-4"/> New
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create boat</DialogTitle>
              <DialogDescription>Fill in the details of the boat to register.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4 pb-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter boat name" {...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter image URL" {...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="length"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>Length</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Enter length" {...field}
                                   onChange={e => field.onChange(parseFloat(e.target.value))}/>
                          </FormControl>
                          <FormDescription>Expressed in meters</FormDescription>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="width"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>Width</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Enter width" {...field}
                                   onChange={e => field.onChange(parseFloat(e.target.value))}/>
                          </FormControl>
                          <FormDescription>Expressed in meters</FormDescription>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="speed"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>Speed</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Enter speed" {...field}
                                   onChange={e => field.onChange(parseFloat(e.target.value))}/>
                          </FormControl>
                          <FormDescription>Expressed in knots</FormDescription>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="equipment"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Equipment</FormLabel>
                        <FormControl>
                          <div>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {field.value.length === 0 && (
                                <div
                                  className="border-2 border-primary-40 border-dashed rounded-lg flex items-center justify-center p-8 w-full shadow-sm">
                                  <p className="text-muted-foreground text-center text-sm">No equipments added yet</p>
                                </div>
                              )}
                              {field.value.map((item, index) => (
                                <div key={index}
                                     className="flex items-center bg-blue-700/10 text-secondary-foreground rounded-full px-3 py-1">
                                  <span className="text-xs font-medium">{item}</span>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="ml-2 h-4 w-4 p-0"
                                    onClick={() => {
                                      const newEquipment = [...field.value];
                                      newEquipment.splice(index, 1);
                                      field.onChange(newEquipment);
                                    }}
                                  >
                                    <X className="size-2.5"/>
                                  </Button>
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <Input
                                value={newEquipment}
                                onChange={(e) => setNewEquipment(e.target.value)}
                                placeholder="Add equipment"
                              />
                              <Button type="button" variant="outline" onClick={() => {
                                if (newEquipment.trim()) {
                                  field.onChange([...field.value, newEquipment.trim()]);
                                  setNewEquipment('');
                                }
                              }}>Add</Button>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full mt-2">Create</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <section className="border rounded-2xl p-4">
        {localBoats.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Length</TableHead>
                <TableHead>Width</TableHead>
                <TableHead>Speed</TableHead>
                <TableHead className="max-lg:hidden">Equipment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {localBoats.map((boat, index) => (
                <TableRow key={boat?.name || index}> {/* Use index as fallback for key */}
                  <TableCell>{boat?.name || 'N/A'}</TableCell>
                  <TableCell>{boat?.length ? `${boat.length}m` : 'N/A'}</TableCell>
                  <TableCell>{boat?.width ? `${boat.width}m` : 'N/A'}</TableCell>
                  <TableCell>{boat?.speed ? `${boat.speed} knots` : 'N/A'}</TableCell>
                  <TableCell className="max-lg:hidden">{boat?.equipment?.join(', ') || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          renderEmptyState()
        )}
      </section>
    </>
  )
}
