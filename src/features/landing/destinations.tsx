import React from 'react';
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const destinations = [
    {
        name: "Aix-en-Provence",
        description: "Experience the charm of Provence.",
        image: "/images/splabs.png",
    },
    {
        name: "Belle-Île-en-Mer",
        image: "/images/splabs.png",
        description: "Discover the beauty of Brittany's largest island."
    },
    {
        name: "Île de Sein",
        image: "/placeholder.svg",
        description: "Explore the unique charm of this tiny Breton island."
    },
    {
        name: "Corsica",
        image: "/placeholder.svg",
        description: "Discover the beauty of the Island of Beauty."
    },
    {
        name: "Mont Saint-Michel",
        image: "/placeholder.svg",
        description: "Visit this iconic tidal island and abbey."
    },
    {
        name: "Mont Saint-Michel",
        image: "/placeholder.svg",
        description: "Visit this iconic tidal island and abbey."
    },
    {
        name: "Mont Saint-Michel",
        image: "/placeholder.svg",
        description: "Visit this iconic tidal island and abbey."
    },
];

export function Destinations() {
    return (
        <div className="container" id="destinations">
            <h2 className="text-3xl md:text-4xl font-bold">Popular Destinations</h2>
            <p className="text-muted-foreground mb-8">
                Explore our curated collection of the world&apos;s most beautiful destinations.</p>
            <ScrollArea className="w-full">
                <div className="flex gap-6 mb-8">
                    {destinations.map((destination, index) => (
                        <DestinationCard key={index} {...destination} />
                    ))}
                </div>
                <ScrollBar orientation="horizontal"/>
            </ScrollArea>
        </div>
    );
}

type Destination = {
    name: string;
    description: string;
    image: string;
};

function DestinationCard({name, description, image}: Destination) {
    return (
        <div className="w-fit">
            <div className="relative h-[26rem] w-80">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover rounded-2xl"
                />
            </div>
            <h3 className="mt-4 font-medium">{name}</h3>
            <p className="text-muted-foreground text-xs line-clamp-1">{description}</p>
        </div>
    )
}