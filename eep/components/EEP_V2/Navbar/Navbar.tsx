"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    // Handle scroll events for navbar styling and active section tracking
    useEffect(() => {
        const handleScroll = () => {
            // Change navbar style on scroll
            setScrolled(window.scrollY > 20);

            // Track active section for highlighting in navbar
            const sections = ['features', 'how-it-works', 'testimonials', 'pricing'];
            let currentSection = '';

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        currentSection = section;
                        break;
                    }
                }
            }

            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when screen size changes to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 640 && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobileMenuOpen]);

    const navItems = [
        { name: 'Features', href: '#features' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'Testimonials', href: '#testimonials' },
        { name: 'Pricing', href: '#pricing' }
    ];

    const menuVariants = {
        hidden: {
            opacity: 0,
            y: -20,
            transition: { duration: 0.2 }
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, staggerChildren: 0.1, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled
                    ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-slate-200/50 dark:border-slate-800/50'
                    : 'bg-white dark:bg-slate-900 border-b border-gray-200/50 dark:border-slate-800/20'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo and Desktop Navigation */}
                    <div className="flex items-center">
                        {/* Logo with subtle animation */}
                        <Link href="/" className="flex-shrink-0 flex items-center group">
                            <div className="flex items-center space-x-1">
                                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 shadow-md">
                                    <span className="text-white font-bold text-lg">E</span>
                                    <div className="absolute -right-1 -top-1 w-3 h-3 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full"></div>
                                </div>
                                <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xl tracking-tight pl-1">
                                    EEP
                                    <span className="ml-1 text-xs font-medium px-1 py-0.5 bg-indigo-100 dark:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-700/50 text-indigo-600 dark:text-indigo-400 rounded">BETA</span>
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation Links */}
                        <div className="hidden sm:ml-10 sm:flex sm:space-x-6">
                            {navItems.map((item) => {
                                const isActive = activeSection === item.href.substring(1);
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`relative px-1 py-2 text-sm font-medium transition-colors duration-200 flex items-center ${isActive
                                                ? 'text-indigo-600 dark:text-indigo-400'
                                                : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                                            }`}
                                    >
                                        {item.name}
                                        <div className={`absolute bottom-0 left-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                                            }`} />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Desktop Action Buttons */}
                    <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-3">
                        <Link href="/login">
                            <Button
                                variant="ghost"
                                className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
                            >
                                Log in
                            </Button>
                        </Link>
                        <Link href="/auth/signup">
                            <Button
                                className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white shadow-md shadow-indigo-600/20 hover:shadow-lg hover:shadow-indigo-600/30 transition-all duration-200"
                            >
                                Sign up
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            type="button"
                            className="p-2 rounded-md text-slate-500 dark:text-slate-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            aria-expanded="false"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <span className="sr-only">Toggle navigation</span>
                            <div className="relative w-6 h-5">
                                <span
                                    className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : '-translate-y-1.5'
                                        }`}
                                />
                                <span
                                    className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                                        }`}
                                />
                                <span
                                    className={`absolute block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 translate-y-2' : 'translate-y-1.5'
                                        }`}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu with Smooth Animation */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="sm:hidden bg-white dark:bg-slate-900 shadow-lg border-b border-slate-200 dark:border-slate-800"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={menuVariants}
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navItems.map((item) => {
                                const isActive = activeSection === item.href.substring(1);
                                return (
                                    <motion.div key={item.name} variants={itemVariants}>
                                        <Link
                                            href={item.href}
                                            className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${isActive
                                                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                                                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                                }`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <motion.div
                            variants={itemVariants}
                            className="px-4 py-4 border-t border-slate-200 dark:border-slate-800"
                        >
                            <div className="grid grid-cols-2 gap-3">
                                <Link href="/login" className="block w-full">
                                    <Button
                                        variant="outline"
                                        className="w-full justify-center border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                                    >
                                        Log in
                                    </Button>
                                </Link>
                                <Link href="/auth/signup" className="block w-full">
                                    <Button
                                        className="w-full justify-center bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white shadow-md shadow-indigo-600/20"
                                    >
                                        Sign up
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};