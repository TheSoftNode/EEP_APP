"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    RocketIcon,
} from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    const footerSections = {
        platform: {
            title: "Platform",
            links: [
                { name: "Cloud Services", href: "/services" },
                { name: "AI Integration", href: "/ai" },
                { name: "Security", href: "/security" },
                { name: "Documentation", href: "/docs" }
            ]
        },
        resources: {
            title: "Resources",
            links: [
                { name: "Learning Path", href: "/learn" },
                { name: "Case Studies", href: "/cases" },
                { name: "Blog", href: "/blog" },
                { name: "Community", href: "/community" }
            ]
        },
        company: {
            title: "Company",
            links: [
                { name: "About Us", href: "/EEP/about" },
                { name: "Careers", href: "/careers" },
                { name: "Contact", href: "/EEP/contact" },
                { name: "Partners", href: "/partners" }
            ]
        }
    };

    return (
        <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center space-x-2">
                            <RocketIcon className="h-6 w-6 text-blue-600" />
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                                EEP
                            </span>
                        </div>
                        <p className="text-gray-600 max-w-md">
                            Enterprise Engagement Program - Empowering professionals with cutting-edge
                            cloud technologies and AI solutions for enterprise excellence.
                        </p>
                        <div className="flex space-x-4">
                            <motion.a
                                href="#"
                                className="text-gray-400 hover:text-gray-600"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaLinkedin className="h-5 w-5" />
                            </motion.a>
                            <motion.a
                                href="#"
                                className="text-gray-400 hover:text-gray-600"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaTwitter className="h-5 w-5" />
                            </motion.a>
                            <motion.a
                                href="#"
                                className="text-gray-400 hover:text-gray-600"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaGithub className="h-5 w-5" />
                            </motion.a>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    {Object.entries(footerSections).map(([key, section]) => (
                        <div key={key} className="space-y-4">
                            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                                {section.title}
                            </h4>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-gray-600 hover:text-gray-900 transition-colors"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="py-6 border-t border-gray-100">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-sm text-gray-600">
                            © {new Date().getFullYear()} EEP. All rights reserved.
                        </div>
                        <div className="flex space-x-6 text-sm text-gray-600">
                            <a href="/privacy" className="hover:text-gray-900">Privacy Policy</a>
                            <a href="/terms" className="hover:text-gray-900">Terms of Service</a>
                            <a href="/cookies" className="hover:text-gray-900">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;