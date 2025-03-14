"use client"

import { CTASection } from '@/components/EEP_V2/Landing/CTASection';
import { FeaturesSection } from '@/components/EEP_V2/Landing/FeaturesSection';
import { HeroSection } from '@/components/EEP_V2/Landing/HeroSection';
import { HowItWorksSection } from '@/components/EEP_V2/Landing/HowItWorksSection';
import { PricingSection } from '@/components/EEP_V2/Landing/PricingSection';
import { TestimonialsSection } from '@/components/EEP_V2/Landing/TestimonialsSection';
import { Navbar } from '@/components/EEP_V2/Navbar/Navbar';
import Head from 'next/head';


export default function Home() {
    return (
        <>
            <Head>
                <title>Enterprise Empowerment Platform | AI-Assisted Development & Mentorship</title>
                <meta name="description" content="Accelerate your development journey with AI-assisted guidance and expert mentorship. The Enterprise Empowerment Platform helps developers and businesses succeed." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="min-h-screen">
                <HeroSection />
                <FeaturesSection />
                <HowItWorksSection />
                <TestimonialsSection />
                <PricingSection />
                <CTASection />
            </main>
        </>
    );
}