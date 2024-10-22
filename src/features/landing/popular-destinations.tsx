import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function PopularDestinations() {
    const destinations = [
        {
            name: "Aix-en-Provence",
            image: "/placeholder.svg",
            description: "Experience the charm of Provence."
        },
        {
            name: "Belle-Île-en-Mer",
            image: "/placeholder.svg",
            description: "Discover the beauty of Brittany's largest island."
        },
        {
            name: "Île de Sein",
            image: "/placeholder.svg",
            description: "Explore the unique charm of this tiny Breton island."
        }
    ];

    return (
        <section className="py-20">
            <div className="container mx-auto px-10">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 lg:mb-20">Popular Destinations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {destinations.map((dest, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="overflow-hidden h-full">
                                <img src={dest.image} alt={dest.name} className="w-full h-48 object-cover" />
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{dest.name}</h3>
                                    <p className="text-gray-600 mb-4">{dest.description}</p>
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">Explore More</Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}