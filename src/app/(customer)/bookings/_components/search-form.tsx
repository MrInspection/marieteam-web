"use client";

import {useState, useEffect} from "react";
import {CalendarIcon, Loader, MapPin, TriangleAlert} from "lucide-react";
import {format} from "date-fns";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {CrossingSearch} from "../crossing.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {GeographicalZone} from "@prisma/client";
import {getRoutes} from "@/app/(customer)/bookings/crossing.action";
import {formatName} from "@/utils/text-formatter";
import {toast} from "sonner";

type Route = {
  id: string;
  departurePort: string;
  arrivalPort: string;
};

type SearchFormProps = {
  onSubmit: (search: CrossingSearch) => Promise<void>;
};

const formSchema = z.object({
  zone: z.nativeEnum(GeographicalZone, {
    message: "Please select a geographical zone",
  }),
  date: z.date({
    message: "Please select the travel date",
  }),
  routeId: z.string({
    message: "Please select the travel route",
  }),
});

export function SearchForm({onSubmit}: SearchFormProps) {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [zones] = useState<GeographicalZone[]>(Object.values(GeographicalZone));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      zone: undefined,
      date: undefined,
      routeId: undefined,
    },
  });

  const selectedZone = form.watch("zone");
  const selectedRouteId = form.watch("routeId");

  useEffect(() => {
    if (selectedZone) {
      setIsLoading(true);
      getRoutes(selectedZone)
        .then((fetchedRoutes) => {
          setRoutes(fetchedRoutes);
        })
        .catch((error) => {
          toast.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setRoutes([]);
    }
  }, [selectedZone]);

  async function onSubmitForm(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      await onSubmit(values as CrossingSearch);
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  const isSubmitDisabled = !selectedRouteId || routes.length === 0 || isLoading || isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="zone"
            render={({field}) => (
              <FormItem>
                <FormLabel>Geographical Zone</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.setValue("routeId", "");
                  }}
                  value={field.value}
                  disabled={isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a geographical zone"/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {zones.map((z) => (
                      <SelectItem key={z} value={z}>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2"/>
                          {formatName(z)}
                        </div>
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
            name="date"
            render={({field}) => (
              <FormItem>
                <FormLabel>Travel Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                        disabled={isSubmitting}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4"/>
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick the travel date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="center">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      disabled={isSubmitting}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="routeId"
            render={({field}) => (
              <FormItem>
                <FormLabel>Trip Route</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={!selectedZone || isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a route"/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isLoading ? (
                      <SelectItem value="loading" disabled>
                        <div className="flex items-center">
                          <Loader className="size-4 mr-2 animate-spin"/>
                          Loading routes...
                        </div>
                      </SelectItem>
                    ) : routes.length > 0 ? (
                      routes.map((r) => (
                        <SelectItem key={r.id} value={r.id}>
                          {r.departurePort} - {r.arrivalPort}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-routes" disabled>
                        <div className="flex items-center">
                          <TriangleAlert className="size-4 mr-2 text-red-500"/>
                          <p>No routes found</p>
                        </div>
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="self-end mt-1 w-full"
          disabled={isSubmitDisabled}
        >
          {isSubmitting ? (
            <>
              <Loader className="size-4 animate-spin"/>
              Searching...
            </>
          ) : (
            "Search Trips"
          )}
        </Button>
      </form>
    </Form>
  );
}
