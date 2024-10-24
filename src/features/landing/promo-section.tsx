"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export function PromoSection() {
    return (
        <section className="py-20 bg-blue-600 text-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center">
                    <motion.div
                        className="md:w-1/2 mb-8 md:mb-0"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1544785349-c4a5301826fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                            alt="Coastal Adventure"
                            className="rounded-lg shadow-2xl object-cover h-[400px] w-full"
                        />
                    </motion.div>
                    <motion.div
                        className="md:w-1/2 md:pl-12"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="px-4 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">UNLEASH YOUR WANDERLUST WITH
                                MARIETEAM</h2>
                            <p className="text-xl mb-8">Embark on a journey to discover the world&apos;s most breathtaking
                                coastlines and islands. Our expertly curated maritime adventures await you.</p>
                            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-100 mt-8">
                                Book Your Adventure Now
                                <ChevronRight className="ml-2 h-5 w-5"/>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
