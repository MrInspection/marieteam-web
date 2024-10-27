"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FeatureSection() {
    const features = [
        {
            title: "Various Destinations",
            description: "Travelling is a wonderful way to explore new places, learn about different cultures and gain unique experiences."
        },
        {
            title: "Everything Is Included",
            description: "Travelling is a wonderful way to explore new places, learn about different cultures and gain unique experiences."
        },
        {
            title: "Affordable Price",
            description: "Travelling is a wonderful way to explore new places, learn about different cultures and gain unique experiences."
        }
    ];

    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-5">Sail the World, Discover Its Secrets</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="p-4"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <Card className="bg-white shadow-md border border-gray-200 rounded-lg p-6 transition-transform duration-500 ease-in-out transform hover:scale-105">
                                <CardHeader>
                                    <CardTitle className="text-xl font-semibold text-gray-700">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">{feature.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
