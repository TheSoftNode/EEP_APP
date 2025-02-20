"use client";

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { RocketIcon, Menu, X } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Skills', href: '#mastery-section' },
        { name: 'Benefits', href: '#benefits-section' },
        { name: 'Apply', href: '#application-form' },
    ];

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex items-center space-x-2"
                        >
                            <RocketIcon className="h-6 w-6 text-blue-600" />
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                                EEP
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                    onClick={(e) => {
                                        if (item.href.startsWith('#')) {
                                            e.preventDefault();
                                            document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </nav>

                        {/* Auth Buttons */}
                        <div className="hidden md:flex items-center space-x-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-700 hover:text-gray-900"
                                onClick={() => window.location.href = '/EEP/login'}
                            >
                                Log In
                            </Button>
                            <Button
                                size="sm"
                                className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white"
                                onClick={() => window.location.href = '/EEP/signup'}
                            >
                                Sign Up
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0  bg-black/20 backdrop-blur-sm md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            className="fixed right-0 top-0 bottom-0 w-[280px] bg-white shadow-xl p-6 z-50 md:hidden"
                            initial={{ x: "100%" }}
                            animate={{
                                x: 0,
                                transition: {
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30
                                }
                            }}
                            exit={{
                                x: "100%",
                                transition: {
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30
                                }
                            }}
                        >
                            <div className="flex flex-col h-full">
                                <div className="flex justify-between items-center mb-8">
                                    <div className="flex items-center space-x-2">
                                        <RocketIcon className="h-5 w-5 text-blue-600" />
                                        <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                                            EEP
                                        </span>
                                    </div>
                                    <motion.button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="p-2 rounded-md text-gray-600 hover:text-gray-900"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <X className="h-5 w-5" />
                                    </motion.button>
                                </div>

                                <nav className="flex flex-col">
                                    {navItems.map((item, index) => (
                                        <motion.a
                                            key={item.name}
                                            href={item.href}
                                            className="text-gray-600 hover:text-gray-900 transition-colors py-3 border-b border-gray-100"
                                            initial={{ x: 50, opacity: 0 }}
                                            animate={{
                                                x: 0,
                                                opacity: 1,
                                                transition: {
                                                    delay: index * 0.1,
                                                    duration: 0.3
                                                }
                                            }}
                                            onClick={(e) => {
                                                if (item.href.startsWith('#')) {
                                                    e.preventDefault();
                                                    document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                                                    setIsMobileMenuOpen(false);
                                                }
                                            }}
                                        >
                                            {item.name}
                                        </motion.a>
                                    ))}
                                </nav>

                                <div className="mt-auto mb-24 space-y-4">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                delay: 0.3,
                                                duration: 0.3
                                            }
                                        }}
                                    >
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-center"
                                            onClick={() => window.location.href = '/EEP/login'}
                                        >
                                            Log In
                                        </Button>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                delay: 0.4,
                                                duration: 0.3
                                            }
                                        }}
                                    >
                                        <Button
                                            className="w-full justify-center bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white"
                                            onClick={() => window.location.href = '/EEP/signup'}
                                        >
                                            Sign Up
                                        </Button>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;