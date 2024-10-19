"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, Minus, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type SeatType = {
  id: string;
  name: string;
  price: number;
  description?: string;
};

export function ConfigureSeats() {
  return (
    <>
      <div>
        <h1 className={"font-bold text-2xl"}>Book your seats</h1>
        <p className={"text-muted-foreground text-sm"}>
          Select the seats you want to book for your trip.
        </p>
        <ScrollArea className="h-[26rem] mt-8 pr-6">
          <section className={"space-y-6"}>
            <div className={"space-y-4"}>
              <h1 className={"font-bold text-lg"}>Passengers</h1>
              <div className={"grid gap-4"}>
                <section
                  className={
                    "border-2 rounded-2xl px-4 py-3 flex items-center justify-between"
                  }
                >
                  <div>
                    <h1 className={"font-medium"}>
                      Adult{" "}
                      <span
                        className={
                          "text-sm bg-blue-700/10 text-blue-500 px-1.5 py-0.5 rounded-lg font-bold ml-1"
                        }
                      >
                        25€
                      </span>
                    </h1>
                    <p className={"text-muted-foreground text-sm"}>
                      18 years and above
                    </p>
                  </div>
                  <div className={"flex items-center"}>
                    <Button size={"icon"} variant={"outline"}>
                      <Plus className="size-4" />
                    </Button>
                    <span className="mx-2 w-6 text-center font-medium">0</span>
                    <Button size={"icon"} variant={"outline"}>
                      <Minus className="size-4" />
                    </Button>
                  </div>
                </section>
                <section
                  className={
                    "border-2 rounded-2xl px-4 py-3 flex items-center justify-between"
                  }
                >
                  <div>
                    <h1 className={"font-medium"}>
                      Junior{" "}
                      <span
                        className={
                          "text-sm bg-blue-700/10 text-blue-500 px-1.5 py-0.5 rounded-lg font-bold ml-1"
                        }
                      >
                        15€
                      </span>
                    </h1>
                    <p className={"text-muted-foreground text-sm"}>
                      From 8 to 17 years
                    </p>
                  </div>
                  <div className={"flex items-center"}>
                    <Button size={"icon"} variant={"outline"}>
                      <Plus className="size-4" />
                    </Button>
                    <span className="mx-2 w-6 text-center font-medium">0</span>
                    <Button size={"icon"} variant={"outline"}>
                      <Minus className="size-4" />
                    </Button>
                  </div>
                </section>
                <section
                  className={
                    "border-2 rounded-2xl px-4 py-3 flex items-center justify-between"
                  }
                >
                  <div>
                    <h1 className={"font-medium"}>
                      Child{" "}
                      <span
                        className={
                          "text-sm bg-blue-700/10 text-blue-500 px-1.5 py-0.5 rounded-lg font-bold ml-1"
                        }
                      >
                        5€
                      </span>
                    </h1>
                    <p className={"text-muted-foreground text-sm"}>
                      From 0 to 7 years
                    </p>
                  </div>
                  <div className={"flex items-center"}>
                    <Button size={"icon"} variant={"outline"}>
                      <Plus className="size-4" />
                    </Button>
                    <span className="mx-2 w-6 text-center font-medium">0</span>
                    <Button size={"icon"} variant={"outline"}>
                      <Minus className="size-4" />
                    </Button>
                  </div>
                </section>
              </div>
            </div>
            <div className={"space-y-4"}>
              <h1 className={"font-bold text-lg"}>Vehicles</h1>
              <div className={"grid gap-4"}>
                <section
                  className={
                    "border-2 rounded-2xl px-4 py-3 flex items-center justify-between"
                  }
                >
                  <div>
                    <h1 className={"font-medium"}>
                      Car {"<"} 4m{" "}
                      <span
                        className={
                          "text-sm bg-blue-700/10 text-blue-500 px-1.5 py-0.5 rounded-lg font-bold ml-1"
                        }
                      >
                        50€
                      </span>
                    </h1>
                    <p className={"text-muted-foreground text-sm"}>
                      Length inferior to 4m
                    </p>
                  </div>
                  <div className={"flex items-center"}>
                    <Button size={"icon"} variant={"outline"}>
                      <Plus className="size-4" />
                    </Button>
                    <span className="mx-2 w-6 text-center font-medium">0</span>
                    <Button size={"icon"} variant={"outline"}>
                      <Minus className="size-4" />
                    </Button>
                  </div>
                </section>
                <section
                  className={
                    "border-2 rounded-2xl px-4 py-3 flex items-center justify-between"
                  }
                >
                  <div>
                    <h1 className={"font-medium"}>
                      Car {"<"} 5m{" "}
                      <span
                        className={
                          "text-sm bg-blue-700/10 text-blue-500 px-1.5 py-0.5 rounded-lg font-bold ml-1"
                        }
                      >
                        75€
                      </span>
                    </h1>
                    <p className={"text-muted-foreground text-sm"}>
                      Length inferior to 5m
                    </p>
                  </div>
                  <div className={"flex items-center"}>
                    <Button size={"icon"} variant={"outline"}>
                      <Plus className="size-4" />
                    </Button>
                    <span className="mx-2 w-6 text-center font-medium">0</span>
                    <Button size={"icon"} variant={"outline"}>
                      <Minus className="size-4" />
                    </Button>
                  </div>
                </section>
              </div>
            </div>
            <div className={"space-y-4"}>
              <h1 className={"font-bold text-lg"}>Large Vehicles</h1>
              <div className={"grid gap-4"}>
                <section
                  className={
                    "border-2 rounded-2xl px-4 py-3 flex items-center justify-between"
                  }
                >
                  <div>
                    <h1 className={"font-medium"}>
                      Van{" "}
                      <span
                        className={
                          "text-sm bg-blue-700/10 text-blue-500 px-1.5 py-0.5 rounded-lg font-bold ml-1"
                        }
                      >
                        90€
                      </span>
                    </h1>
                    <p className={"text-muted-foreground text-sm"}>
                      Utility Vehicle
                    </p>
                  </div>
                  <div className={"flex items-center"}>
                    <Button size={"icon"} variant={"outline"}>
                      <Plus className="size-4" />
                    </Button>
                    <span className="mx-2 w-6 text-center font-medium">0</span>
                    <Button size={"icon"} variant={"outline"}>
                      <Minus className="size-4" />
                    </Button>
                  </div>
                </section>
                <section
                  className={
                    "border-2 rounded-2xl px-4 py-3 flex items-center justify-between"
                  }
                >
                  <div>
                    <h1 className={"font-medium"}>
                      Camping Car{" "}
                      <span
                        className={
                          "text-sm bg-blue-700/10 text-blue-500 px-1.5 py-0.5 rounded-lg font-bold ml-1"
                        }
                      >
                        120€
                      </span>
                    </h1>
                    <p className={"text-muted-foreground text-sm"}>
                      Vehicle used for camping
                    </p>
                  </div>
                  <div className={"flex items-center"}>
                    <Button size={"icon"} variant={"outline"}>
                      <Plus className="size-4" />
                    </Button>
                    <span className="mx-2 w-6 text-center font-medium">0</span>
                    <Button size={"icon"} variant={"outline"}>
                      <Minus className="size-4" />
                    </Button>
                  </div>
                </section>
                <section
                  className={
                    "border-2 rounded-2xl px-4 py-3 flex items-center justify-between"
                  }
                >
                  <div>
                    <h1 className={"font-medium"}>
                      Truck
                      <span
                        className={
                          "text-sm bg-blue-700/10 text-blue-500 px-1.5 py-0.5 rounded-lg font-bold ml-1"
                        }
                      >
                        170€
                      </span>
                    </h1>
                    <p className={"text-muted-foreground text-sm"}>
                      Heavy transport vehicle
                    </p>
                  </div>
                  <div className={"flex items-center"}>
                    <Button size={"icon"} variant={"outline"}>
                      <Plus className="size-4" />
                    </Button>
                    <span className="mx-2 w-6 text-center font-medium">0</span>
                    <Button size={"icon"} variant={"outline"}>
                      <Minus className="size-4" />
                    </Button>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </ScrollArea>
        <div className={"mt-8 border-t-2 pt-6"}>
          <div className={"flex items-center justify-between mb-6"}>
            <div className={"space-y-1"}>
              <p className={"text-sm text-muted-foreground"}>Selected Amount</p>
              <p className={"font-medium text-xl"}>0 Seats</p>
            </div>
            <div className={"space-y-1"}>
              <p className={"text-sm text-muted-foreground text-right"}>Total Amount</p>
              <p className={"font-medium text-xl text-right"}>0.00 €</p>
            </div>
          </div>
          <Button className={"w-full"} size={"lg"}>
            Continue
            <ChevronRight className={"ml-2 size-4"} />
          </Button>
        </div>
      </div>
    </>
  );
}
