"use client"
import { HeroSection } from "@/features/landing/hero-section"
import { PopularDestinations } from "@/features/landing/popular-destinations"
import { JourneySteps } from "@/features/landing/journey-steps"
import { FeatureSection } from "@/features/landing/feature-section"
import { PromoSection } from "@/features/landing/promo-section"
import {TestimonialSection} from "@/features/landing/testimonials-section";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 py-20">
                <HeroSection />
                <PopularDestinations />
                <JourneySteps />
                <FeatureSection />
                <PromoSection />
                <TestimonialSection />
            </main>
        </div>
    )
}