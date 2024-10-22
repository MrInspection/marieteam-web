"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Globe, Anchor, Palmtree } from "lucide-react"

export function JourneySteps() {
    const steps = [
        { icon: Globe, title: "Choose Your Destination", description: "Select from our curated collection of coastal paradises." },
        { icon: Anchor, title: "Select Your Cruise", description: "Find the perfect voyage for your dream vacation." },
        { icon: Palmtree, title: "Enjoy Your Journey", description: "Relax and create lifelong memories at sea." }
    ]

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-800">Your Journey Begins Here</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="text-center p-6 bg-gray-50 rounded-lg shadow-md"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <step.icon className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}