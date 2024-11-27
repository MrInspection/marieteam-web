"use client";

import {useState} from "react";
import {CalendarSearch, ChevronRight, EyeOff, Frown, Loader} from "lucide-react";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {SearchForm} from "./_components/search-form";
import {searchCrossings} from "./crossing.action";
import {Crossing, CrossingSearch} from "./crossing.schema";
import {CrossingList} from "@/app/(customer)/bookings/_components/crossing-list";
import {CrossingDetails} from "@/app/(customer)/bookings/_components/crossing-details";
import {toast} from "sonner";
import {Badge} from "@/components/ui/badge";
import {useRouter} from "next/navigation";
import BroadcastBanner from "@/components/broadcast-banner";

export default function BookingPage() {
  const [crossings, setCrossings] = useState<Crossing[] | null>(null);
  const [selectedCrossing, setSelectedCrossing] = useState<Crossing | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const router = useRouter();

  const handleSearch = async (search: CrossingSearch) => {
    try {
      const results = await searchCrossings(search);
      setCrossings(results);
      setSearched(true);
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const handleRedirect = (crossingId: string) => {
    setLoading(true);
    router.push(`/bookings/configure?trip=${crossingId}`);
  };

  return (
    <main className="flex flex-col flex-grow">
      <BroadcastBanner message="To test the booking system, please select Belle Ile En Mer, November 27th, 2024 for the date and Le Palais - Vannes for the route." />
      <section className="container max-w-7xl py-8">
        <SearchForm onSubmit={handleSearch}/>
      </section>
      <div className="border-t-2 dark:bg-black bg-muted/40 flex flex-col flex-grow">
        <div className="container max-w-7xl py-14">
          {!searched && (
            <Card className="rounded-2xl h-96 flex flex-col items-center justify-center border-dashed">
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <CalendarSearch className="size-10 text-muted-foreground"/>
                <h1 className="text-lg font-bold mt-4">MarieTeam Bookings</h1>
                <p className="text-center text-muted-foreground text-sm mt-1 max-w-lg text-balance leading-6">
                  Select a geographical zone, a travel date, and a trip route,
                  then click{" "}
                  <span
                    className="border-2 rounded-xl px-2 py-0.5 font-medium bg-muted/40">
                    Search Trips
                  </span>{" "}
                  to see available crossings.
                </p>
              </CardContent>
            </Card>
          )}

          {searched && crossings && crossings.length > 0 && (
            <section className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 rounded-2xl">
                <div className="flex justify-between mb-4">
                  <h1 className="text-xl font-bold">Available Trips</h1>
                  <Badge
                    variant="outline"
                    className="px-4 py-2 bg-background rounded-2xl w-fit"
                  >
                    {crossings.length} offers available
                  </Badge>
                </div>
                <div>
                  <CrossingList
                    crossings={crossings}
                    selectedCrossing={selectedCrossing}
                    onSelectCrossing={setSelectedCrossing}
                  />
                </div>
              </div>

              <div className="max-lg:hidden">
                <h1 className="text-xl font-bold mb-5">Trip Information</h1>
                <Card className="rounded-2xl border-2 shadow-none">
                  <CardContent className="pt-6">
                    {selectedCrossing ? (
                      <CrossingDetails crossing={selectedCrossing}/>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-96 text-center">
                        <EyeOff className="size-10 text-muted-foreground mb-4"/>
                        <p className="font-bold">No Trip Selected</p>
                        <p className="text-sm text-muted-foreground mt-1 text-balance">
                          Select a trip to view information about it and buy
                          your ticket.
                        </p>
                      </div>
                    )}
                  </CardContent>
                  {selectedCrossing && (
                    <CardFooter className="border-t px-6 py-4">
                      <Button
                        className="w-full"
                        onClick={() => handleRedirect(selectedCrossing.id)}
                        disabled={loading}
                      >
                        {loading && <Loader className="size-4 animate-spin"/>}
                        Buy your ticket
                        <ChevronRight className="size-4"/>
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </div>
            </section>
          )}

          {searched && (!crossings || crossings.length === 0) && (
            <Card className="rounded-2xl h-96 flex flex-col items-center justify-center">
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <Frown className="size-10 text-destructive"/>
                <h1 className="text-lg font-bold mt-4">No Trips Found</h1>
                <p className="text-center text-muted-foreground text-sm mt-1 max-w-md text-balance">
                  We couldn&apos;t find any trips for the selected date and route.
                  Please try different dates or routes.
                </p>
              </CardContent>
            </Card>
          )}

          {selectedCrossing && (
            <Sheet>
              <SheetTrigger asChild>
                <div className="fixed bottom-0 left-0 right-0 p-6 bg-background/80 backdrop-blur-sm lg:hidden">
                  <Button className="w-full" size="lg">
                    View Trip Details
                  </Button>
                </div>
              </SheetTrigger>
              <SheetContent className="w-screen overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="text-left">Trip Information</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <CrossingDetails crossing={selectedCrossing}/>
                </div>
                <Button
                  className="w-full mt-4"
                  onClick={() => handleRedirect(selectedCrossing.id)}
                  disabled={loading}
                >
                  {loading && <Loader className="size-4 animate-spin"/>}
                  Buy your ticket
                  <ChevronRight className="size-4"/>
                </Button>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </main>
  );
}
