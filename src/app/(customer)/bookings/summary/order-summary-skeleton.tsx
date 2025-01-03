"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

function OrderSummarySkeleton() {
  return (
    <main className="flex flex-col flex-grow bg-muted/50 dark:bg-black">
      <section className="bg-background">
        <div className="container py-9">
          <Skeleton className="h-9 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
      </section>
      <section className="border-t-2">
        <div className="container py-16">
          <div className="grid lg:grid-cols-3 max-lg:gap-6 gap-10">
            <div className="lg:col-span-2">
              <div className="border-2 rounded-2xl col-span-2 p-2">
                <Skeleton className="w-full aspect-video rounded-xl" />
              </div>
            </div>
            <div>
              <section className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Skeleton className="h-20 rounded-2xl" />
                  <Skeleton className="h-20 rounded-2xl" />
                </div>
                <Skeleton className="h-20 rounded-2xl" />
              </section>
              <section>
                <Skeleton className="h-8 w-40 mt-6 mb-4" />
                <ScrollArea className="lg:h-52">
                  <div className="grid gap-4">
                    {[...Array(3)].map((_, index) => (
                      <Skeleton key={index} className="h-24 rounded-2xl" />
                    ))}
                  </div>
                  <ScrollBar />
                </ScrollArea>
                <div className="border-t-2 pt-4 flex items-center justify-between mt-8">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <Button className="mt-4 w-full" size="lg" disabled>
                  <Skeleton className="h-5 w-40" />
                </Button>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default OrderSummarySkeleton;
