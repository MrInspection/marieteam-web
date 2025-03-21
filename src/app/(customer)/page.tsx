"use client"

import React from "react";
import {ArrowRight} from "lucide-react";
import Image from "next/image";
import {RainbowButton} from "@/components/ui/rainbow-button";
import {useRouter} from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="my-24 container">
      <section className="flex flex-col items-center justify-center mb-28">
        <p className="text-sm font-medium mb-4 text-blue-500">Your trip in a few clicks</p>
        <h1 className="font-semibold tracking-tight mb-8 max-w-3xl text-4xl sm:text-6xl text-center font-heading text-pretty">
          Book your dream vacation <br /> with MarieTeam
        </h1>
        <div className="text-center text-muted-foreground max-md:text-balance max-w-prose text-base">
          MarieTeam allows you to book your dream vacation with ease. Choose your destination,
          select your cruise, and enjoy your trip on board our fleet of boats.
        </div>
        <RainbowButton className="mt-10 mb-24" onClick={() => router.push("/bookings")}>
           Book your trip
          <ArrowRight className="ml-2 size-4"/>
        </RainbowButton>
        <section
          className="col-span-full border-2 -m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
          <Image
            src="/images/configure-trip.png"
            alt="Image of a person configuring a trip"
            height={866} width={1364} quality={100}
            className="rounded-md bg-white dark:bg-muted/40 p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
            draggable={false}/>
        </section>
      </section>
      <div className="relative isolate">
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
          />
        </div>
      </div>
      <div className="mt-40">
        <div className="flex flex-col items-center justify-center mb-16">
          <h1 className="text-3xl lg:text-5xl font-bold text-center tracking-tight font-heading">Schedule your trip with ease</h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-lg text-center text-balance">Going on a trip has
            never been easier than with
            MarieTeam</p>
        </div>
        <div className="grid md:grid-cols-3 gap-10 mb-24">
          <section className="border-t-2 pt-8">
            <p className="text-sm/7 text-blue-500 font-medium">Step 1</p>
            <h1 className="text-xl font-medium mt-2">Choose your destination</h1>
            <p className="text-muted-foreground mt-4">
              Select your destination within the 10 geographical zones proposed around France by
              MarieTeam.
            </p>
          </section>
          <section className="border-t-2 pt-8">
            <p className="text-sm/7 text-blue-500 font-medium">Step 2</p>
            <h1 className="text-xl font-medium mt-2">Configure your trip</h1>
            <p className="text-muted-foreground mt-4">
              Select your cruise and configure the seats you want to book for your trip within our fleet
              of boats.
            </p>
          </section>
          <section className="border-t-2 pt-8">
            <p className="text-sm/7 text-blue-500 font-mediu">Step 3</p>
            <h1 className="text-xl font-medium mt-2">Enjoy your trip</h1>
            <p className="text-muted-foreground mt-4 text-pretty">
              Enjoy your trip on board our fleet of boats and enjoy the beautiful coastal scenery with
              unmatched comfort.
            </p>
          </section>
        </div>
        <section
          className="col-span-full border-2 -m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
          <Image
            src="/images/booking-system.png"
            alt="Spectron Labs"
            height={866} width={1364} quality={100}
            className="rounded-md bg-white dark:bg-muted/40 p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
            draggable={false}/>
        </section>
      </div>
    </div>
  );
}
