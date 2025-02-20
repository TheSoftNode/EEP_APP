// components/EEP/ContactPage.tsx
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Mail,
    Phone,
    MapPin,
    MessageSquare,
    Send,
    Clock,
    Building
} from 'lucide-react';

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const ContactPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Add your form submission logic here
        setTimeout(() => setIsSubmitting(false), 1500);
    };

    const contactInfo = [
        {
            icon: Building,
            title: 'Office',
            description: '123 Enterprise Ave, Tech City, TC 12345',
        },
        {
            icon: Clock,
            title: 'Business Hours',
            description: 'Monday - Friday, 9:00 AM - 6:00 PM EST',
        },
        {
            icon: Phone,
            title: 'Phone',
            description: '+1 (555) 123-4567',
        },
        {
            icon: Mail,
            title: 'Email',
            description: 'contact@eep-platform.com',
        }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-gradient-to-b from-blue-50 via-blue-100/50 to-white">
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
                            <MessageSquare className="w-5 h-5 text-blue-600" />
                            <span className="text-blue-600 font-medium">Get in Touch</span>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">
                            Let's Start Your
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
                                Enterprise Journey
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600">
                            Have questions about EEP? Our team is here to help you transform your enterprise.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div>
                                <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                                <p className="text-gray-600 mb-8">
                                    Get in touch with our expert team for enterprise solutions and support.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {contactInfo.map((info, index) => (
                                    <motion.div
                                        key={info.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white rounded-lg p-6 shadow-md"
                                    >
                                        <info.icon className="w-6 h-6 text-blue-600 mb-4" />
                                        <h3 className="font-semibold mb-2">{info.title}</h3>
                                        <p className="text-gray-600 text-sm">{info.description}</p>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Map or Additional Info */}
                            <div className="bg-gray-100 rounded-lg p-6">
                                <h3 className="font-semibold mb-4">Working Hours</h3>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <p>Saturday: 10:00 AM - 4:00 PM EST</p>
                                    <p>Sunday: Closed</p>
                                    <p className="mt-4 font-medium">
                                        24/7 Support available for Enterprise clients
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl shadow-xl p-8"
                        >
                            <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                            First Name
                                        </label>
                                        <Input
                                            id="firstName"
                                            placeholder="Enter your first name"
                                            className="w-full"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                            Last Name
                                        </label>
                                        <Input
                                            id="lastName"
                                            placeholder="Enter your last name"
                                            className="w-full"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                                        Company
                                    </label>
                                    <Input
                                        id="company"
                                        placeholder="Enter your company name"
                                        className="w-full"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="inquiry" className="block text-sm font-medium text-gray-700">
                                        Type of Inquiry
                                    </label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select your inquiry type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="enterprise">Enterprise Solutions</SelectItem>
                                            <SelectItem value="cloud">Cloud Services</SelectItem>
                                            <SelectItem value="ai">AI Integration</SelectItem>
                                            <SelectItem value="support">Technical Support</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                        Message
                                    </label>
                                    <Textarea
                                        id="message"
                                        placeholder="Enter your message"
                                        className="w-full h-32"
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center">
                                            <Send className="w-4 h-4 animate-pulse mr-2" />
                                            Sending...
                                        </div>
                                    ) : (
                                        "Send Message"
                                    )}
                                </Button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                        <p className="text-gray-600">Find quick answers to common questions</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {[
                            {
                                q: "What enterprise solutions does EEP offer?",
                                a: "EEP provides comprehensive cloud services, AI integration, and digital transformation solutions tailored for enterprises."
                            },
                            {
                                q: "How can I get started with EEP?",
                                a: "Simply fill out our contact form, and our team will reach out to discuss your enterprise needs and customize a solution."
                            },
                            {
                                q: "What support options are available?",
                                a: "We offer 24/7 enterprise support, dedicated account managers, and comprehensive technical assistance."
                            },
                            {
                                q: "Is EEP available worldwide?",
                                a: "Yes, EEP serves enterprises globally with local support in major regions."
                            }
                        ].map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-lg p-6 shadow-md"
                            >
                                <h3 className="font-semibold mb-2">{faq.q}</h3>
                                <p className="text-gray-600 text-sm">{faq.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default ContactPage;