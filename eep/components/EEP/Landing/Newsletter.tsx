"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Sparkles, Bell } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setEmail('');
            setTimeout(() => setIsSuccess(false), 3000);
        }, 1500);
    };

    return (
        <section className="relative overflow-hidden py-16">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-violet-50/50" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />

            {/* Decorative blobs */}
            <div className="absolute -left-20 top-0 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
            <div className="absolute -right-20 bottom-0 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />

            <div className="relative max-w-5xl sm:max-w-7xl mx-auto px-4 sm:px-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* Content */}
                        <div>
                            <motion.div
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 mb-4"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <Sparkles className="w-4 h-4 text-blue-600" />
                                <span className="text-sm font-medium text-blue-600">Stay Updated</span>
                            </motion.div>

                            <motion.h2
                                className="text-3xl font-bold text-gray-900 mb-4"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                            >
                                Subscribe to Our
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
                                    Innovation Newsletter
                                </span>
                            </motion.h2>

                            <motion.div
                                className="space-y-2 text-sm text-gray-600"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                {[
                                    'Latest Cloud Technologies',
                                    'AI Updates & Insights',
                                    'Industry Best Practices'
                                ].map((item, index) => (
                                    <div key={item} className="flex items-center gap-2">
                                        <Bell className="w-4 h-4 text-blue-600" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email address
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your work email"
                                        className="w-full bg-gray-50 border-gray-200 focus:ring-blue-500"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white"
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center">
                                            <Send className="w-4 h-4 animate-pulse mr-2" />
                                            Subscribing...
                                        </div>
                                    ) : isSuccess ? (
                                        <div className="flex items-center justify-center">
                                            <CheckCircle2 className="w-4 h-4 mr-2" />
                                            Subscribed!
                                        </div>
                                    ) : (
                                        "Subscribe to Newsletter"
                                    )}
                                </Button>
                                <p className="text-xs text-gray-500 text-center">
                                    Join 50,000+ professionals receiving our weekly insights
                                </p>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;