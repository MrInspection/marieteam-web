"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function TestimonialSection() {
    const testimonials = [
        { name: "Sophie L.", location: "Paris, France", quote: "MarieTeam made our family vacation unforgettable. The attention to detail and the stunning destinations exceeded our expectations!" },
        { name: "James M.", location: "London, UK", quote: "I've traveled with many cruise lines, but MarieTeam's combination of luxury and adventure is truly unmatched. Can't wait for my next trip!" },
        { name: "Elena R.", location: "Rome, Italy", quote: "From the moment we booked to the last day of our cruise, MarieTeam provided exceptional service. A top-notch experience!" }
    ]

    return (
        <section className="py-20 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-800">What Our Travelers Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full">
                                <CardContent className="p-6">
                                    <div className="flex mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                                    <div className="flex items-center">
                                        <div className="bg-blue-100 rounded-full p-2 mr-4">
                                            <span className="text-blue-600 font-bold text-xl">{testimonial.name[0]}</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold">{testimonial.name}</p>
                                            <p className="text-sm text-gray-500">{testimonial.location}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
