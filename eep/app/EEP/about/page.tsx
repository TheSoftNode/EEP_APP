// components/EEP/AboutPage.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    RocketIcon,
    Users,
    Target,
    Lightbulb,
    GraduationCap,
    LineChart,
    Shield
} from 'lucide-react';


const AboutPage = () => {
    const milestones = [
        { year: '2020', title: 'EEP Launch', description: 'Started with 100 enterprise partners' },
        { year: '2021', title: 'Global Expansion', description: 'Reached 1000+ organizations worldwide' },
        { year: '2022', title: 'AI Integration', description: 'Introduced advanced AI capabilities' },
        { year: '2023', title: 'Cloud Innovation', description: 'Launched multi-cloud enterprise solutions' }
    ];

    const values = [
        {
            icon: Shield,
            title: 'Enterprise Excellence',
            description: 'Setting the highest standards in enterprise solutions'
        },
        {
            icon: Users,
            title: 'Collaborative Growth',
            description: 'Fostering partnerships that drive innovation'
        },
        {
            icon: Target,
            title: 'Future-Ready Solutions',
            description: 'Preparing enterprises for tomorrow\'s challenges'
        },
        {
            icon: Lightbulb,
            title: 'Continuous Innovation',
            description: 'Pushing boundaries in cloud technology'
        }
    ];

    return (
        <div className="min-h-screen">

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-gradient-to-b from-blue-50 via-blue-100/50 to-white overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="inline-flex items-center justify-center space-x-2 bg-white/80 rounded-full px-4 py-2 mb-8">
                            <RocketIcon className="w-5 h-5 text-blue-600" />
                            <span className="text-blue-600 font-medium">Our Journey</span>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">
                            Transforming Enterprises Through
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
                                Innovation & Excellence
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600">
                            Leading the future of enterprise cloud solutions with cutting-edge technology and expert guidance.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                            <p className="text-gray-600 mb-8">
                                At EEP, we're dedicated to empowering enterprises with state-of-the-art cloud solutions
                                and AI technologies. Our mission is to bridge the gap between traditional infrastructure
                                and cutting-edge cloud innovations.
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                                    <div className="text-sm text-gray-600">Enterprise Clients</div>
                                </div>
                                <div className="bg-violet-50 rounded-lg p-4">
                                    <div className="text-3xl font-bold text-violet-600 mb-2">50+</div>
                                    <div className="text-sm text-gray-600">Countries Served</div>
                                </div>
                                <div className="bg-indigo-50 rounded-lg p-4">
                                    <div className="text-3xl font-bold text-indigo-600 mb-2">98%</div>
                                    <div className="text-sm text-gray-600">Client Satisfaction</div>
                                </div>
                                <div className="bg-purple-50 rounded-lg p-4">
                                    <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                                    <div className="text-sm text-gray-600">Expert Support</div>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl transform rotate-3"></div>
                            <img
                                src="/about-image.jpg"
                                alt="Team collaboration"
                                className="relative rounded-2xl shadow-lg"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
                        <p className="text-gray-600">The milestones that shaped our growth</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={milestone.year}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-lg p-6 shadow-md"
                            >
                                <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                                <div className="font-semibold mb-2">{milestone.title}</div>
                                <div className="text-sm text-gray-600">{milestone.description}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-4">Our Values</h2>
                        <p className="text-gray-600">The principles that guide our mission</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 text-white mb-4">
                                    <value.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutPage;