"use client";
import React from 'react';
import Slider from "react-slick";
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function HeroSection() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000
    };

    const slides = [
        {
            image: "/placeholder.svg",
            title: "Discover the Beauty of the French Coast",
            subtitle: "Embark on a journey along the stunning French coastline with MarieTeam."
        },
        {
            image: "/placeholder.svg",
            title: "Explore Breathtaking Destinations",
            subtitle: "Sail to exotic locations and make unforgettable memories."
        },
        {
            image: "/placeholder.svg",
            title: "Luxury at Sea",
            subtitle: "Experience the finest services while enjoying the serenity of the ocean."
        }
    ];

    return (
        <section className="container mb-10">
            <Slider {...settings} className="h-full">
                {slides.map((slide, index) => (
                    <div key={index} className="py-10 h-[80vh] min-h-[600px] bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }}>
                        <div className="absolute inset-0 bg-black bg-opacity-50" />
                        <motion.div
                            className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center px-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.h2
                                className="text-4xl md:text-5xl font-bold mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                {slide.title}
                            </motion.h2>
                            <motion.p
                                className="text-xl mb-8 max-w-2xl px-4 md:px-0"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                {slide.subtitle}
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                            >
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                                    Start Your Adventure
                                    <ChevronRight className="ml-2 h-5 w-5" />
                                </Button>
                            </motion.div>
                        </motion.div>
                    </div>
                ))}
            </Slider>
        </section>
    );
}