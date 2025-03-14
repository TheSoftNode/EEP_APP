"use client"

import React, { useEffect, useRef } from 'react';

export const Footer = () => {
    const footerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll('.footer-animate');
        elements.forEach(el => observer.observe(el));

        return () => {
            elements.forEach(el => observer.unobserve(el));
        };
    }, []);

    const getCurrentYear = () => new Date().getFullYear();

    return (
        <footer ref={footerRef} className="relative bg-slate-900 text-white overflow-hidden">
            {/* Sophisticated background */}
            <div className="absolute inset-0 z-0">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950"></div>

                {/* Abstract wave background */}
                <div className="absolute bottom-0 left-0 right-0 h-40 opacity-10">
                    <svg className="absolute bottom-0 left-0 right-0" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path
                            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                            className="fill-indigo-600/10"
                        ></path>
                    </svg>
                    <svg className="absolute bottom-0 left-0 right-0" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path
                            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                            className="fill-cyan-600/10"
                            opacity="0.25"
                        ></path>
                    </svg>
                    <svg className="absolute bottom-0 left-0 right-0" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path
                            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                            className="fill-indigo-900/20"
                            opacity="0.25"
                        ></path>
                    </svg>
                </div>

                {/* Dot grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
                        backgroundSize: '30px 30px',
                    }}
                ></div>

                {/* Glowing accent */}
                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-indigo-600/20 rounded-full blur-3xl"></div>
                <div className="absolute top-10 -left-12 w-24 h-24 bg-cyan-600/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container px-4 mx-auto relative z-10">
                {/* Main footer content */}
                <div className="pt-16 pb-10">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-12">
                        {/* Brand section */}
                        <div className="md:col-span-5 footer-animate" style={{ '--delay': '0s' } as React.CSSProperties}>
                            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-xl p-6 h-full">
                                <div className="flex items-center mb-4">
                                    <div className="relative">
                                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-lg flex items-center justify-center">
                                            <span className="text-white font-bold text-xl">E</span>
                                            <div className="absolute -right-1 -top-1 w-4 h-4 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <div className="flex items-center">
                                            <span className="text-2xl font-bold text-white">EEP</span>
                                            <span className="ml-2 text-xs font-medium px-1.5 py-0.5 bg-indigo-900/50 border border-indigo-700/50 rounded-md text-indigo-300">BETA</span>
                                        </div>
                                        <span className="text-xs text-slate-400">Enterprise Empowerment Platform</span>
                                    </div>
                                </div>

                                <p className="text-slate-300 text-sm mb-6">
                                    The Enterprise Empowerment Platform elevates developer potential through
                                    AI-assisted guidance, structured project workflows, and real-time expert mentorship.
                                </p>

                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 flex items-center justify-center rounded-md bg-slate-700/30 border border-slate-600/30">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-indigo-400">
                                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                            </svg>
                                        </div>
                                        <a href="tel:+11234567890" className="text-slate-300 text-sm ml-2 hover:text-white transition-colors">+1 (123) 456-7890</a>
                                    </div>

                                    <div className="flex items-center">
                                        <div className="w-8 h-8 flex items-center justify-center rounded-md bg-slate-700/30 border border-slate-600/30">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-indigo-400">
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                                <polyline points="22,6 12,13 2,6" />
                                            </svg>
                                        </div>
                                        <a href="mailto:contact@eep.dev" className="text-slate-300 text-sm ml-2 hover:text-white transition-colors">contact@eep.dev</a>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-slate-700/30">
                                    <div className="flex space-x-4">
                                        <a href="#" className="text-slate-400 hover:text-white transition-colors group">
                                            <span className="sr-only">Twitter</span>
                                            <div className="w-8 h-8 flex items-center justify-center rounded-md bg-slate-800 border border-slate-700/50 group-hover:border-indigo-500/50 group-hover:bg-indigo-900/20 transition-all">
                                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                                                </svg>
                                            </div>
                                        </a>

                                        <a href="#" className="text-slate-400 hover:text-white transition-colors group">
                                            <span className="sr-only">LinkedIn</span>
                                            <div className="w-8 h-8 flex items-center justify-center rounded-md bg-slate-800 border border-slate-700/50 group-hover:border-indigo-500/50 group-hover:bg-indigo-900/20 transition-all">
                                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </a>

                                        <a href="#" className="text-slate-400 hover:text-white transition-colors group">
                                            <span className="sr-only">GitHub</span>
                                            <div className="w-8 h-8 flex items-center justify-center rounded-md bg-slate-800 border border-slate-700/50 group-hover:border-indigo-500/50 group-hover:bg-indigo-900/20 transition-all">
                                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </a>

                                        <a href="#" className="text-slate-400 hover:text-white transition-colors group">
                                            <span className="sr-only">Discord</span>
                                            <div className="w-8 h-8 flex items-center justify-center rounded-md bg-slate-800 border border-slate-700/50 group-hover:border-indigo-500/50 group-hover:bg-indigo-900/20 transition-all">
                                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"></path>
                                                </svg>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Links sections */}
                        <div className="md:col-span-7">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 h-full">
                                {/* Platform links */}
                                <div className="footer-animate" style={{ '--delay': '0.1s' } as React.CSSProperties}>
                                    <div className="h-full bg-slate-800/20 backdrop-blur-sm border border-slate-700/20 rounded-xl p-5">
                                        <h3 className="text-lg font-semibold text-white mb-3 pb-2 border-b border-slate-700/30 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2 text-indigo-400">
                                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                                <line x1="8" y1="21" x2="16" y2="21"></line>
                                                <line x1="12" y1="17" x2="12" y2="21"></line>
                                            </svg>
                                            Platform
                                        </h3>
                                        <ul className="space-y-2">
                                            <li>
                                                <a href="#features" className="text-slate-300 hover:text-white transition-colors flex items-center text-sm group">
                                                    <span className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full mr-2 group-hover:bg-indigo-400 transition-colors"></span>
                                                    Features
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#how-it-works" className="text-slate-300 hover:text-white transition-colors flex items-center text-sm group">
                                                    <span className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full mr-2 group-hover:bg-indigo-400 transition-colors"></span>
                                                    How It Works
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#pricing" className="text-slate-300 hover:text-white transition-colors flex items-center text-sm group">
                                                    <span className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full mr-2 group-hover:bg-indigo-400 transition-colors"></span>
                                                    Pricing
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="text-slate-300 hover:text-white transition-colors flex items-center text-sm group">
                                                    <span className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full mr-2 group-hover:bg-indigo-400 transition-colors"></span>
                                                    Documentation
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="text-slate-300 hover:text-white transition-colors flex items-center text-sm group">
                                                    <span className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full mr-2 group-hover:bg-indigo-400 transition-colors"></span>
                                                    API
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="text-white bg-gradient-to-r from-indigo-500 to-indigo-600 px-2.5 py-1 text-xs rounded-full inline-flex items-center mt-1">
                                                    <span className="mr-1">New</span>
                                                    AI Workspace
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Company links */}
                                <div className="footer-animate" style={{ '--delay': '0.2s' } as React.CSSProperties}>
                                    <div className="h-full bg-slate-800/20 backdrop-blur-sm border border-slate-700/20 rounded-xl p-5">
                                        <h3 className="text-lg font-semibold text-white mb-3 pb-2 border-b border-slate-700/30 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2 text-indigo-400">
                                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                            </svg>
                                            Company
                                        </h3>
                                        <ul className="space-y-2">
                                            <li>
                                                <a href="#" className="text-slate-300 hover:text-white transition-colors flex items-center text-sm group">
                                                    <span className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full mr-2 group-hover:bg-indigo-400 transition-colors"></span>
                                                    About Us
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="text-slate-300 hover:text-white transition-colors flex items-center text-sm group">
                                                    <span className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full mr-2 group-hover:bg-indigo-400 transition-colors"></span>
                                                    Careers
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="text-slate-300 hover:text-white transition-colors flex items-center text-sm group">
                                                    <span className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full mr-2 group-hover:bg-indigo-400 transition-colors"></span>
                                                    Blog
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="text-slate-300 hover:text-white transition-colors flex items-center text-sm group">
                                                    <span className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full mr-2 group-hover:bg-indigo-400 transition-colors"></span>
                                                    Contact
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="text-slate-300 hover:text-white transition-colors flex items-center text-sm group">
                                                    <span className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full mr-2 group-hover:bg-indigo-400 transition-colors"></span>
                                                    Partners
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Legal & Sign up */}
                                <div className="footer-animate" style={{ '--delay': '0.3s' } as React.CSSProperties}>
                                    <div className="h-full bg-slate-800/20 backdrop-blur-sm border border-slate-700/20 rounded-xl p-5">
                                        <h3 className="text-lg font-semibold text-white mb-3 pb-2 border-b border-slate-700/30 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2 text-indigo-400">
                                                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                                                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                                                <line x1="6" y1="1" x2="6" y2="4"></line>
                                                <line x1="10" y1="1" x2="10" y2="4"></line>
                                                <line x1="14" y1="1" x2="14" y2="4"></line>
                                            </svg>
                                            Legal
                                        </h3>
                                        <ul className="space-y-2">
                                            <li>
                                                <a href="#" className="text-slate-300 hover:text-white transition-colors flex items-center text-sm group">
                                                    <span className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full mr-2 group-hover:bg-indigo-400 transition-colors"></span>
                                                    Privacy Policy
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="text-slate-300 hover:text-white transition-colors flex items-center text-sm group">
                                                    <span className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full mr-2 group-hover:bg-indigo-400 transition-colors"></span>
                                                    Terms of Service
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="text-slate-300 hover:text-white transition-colors flex items-center text-sm group">
                                                    <span className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full mr-2 group-hover:bg-indigo-400 transition-colors"></span>
                                                    Cookie Policy
                                                </a>
                                            </li>
                                        </ul>

                                        <div className="mt-5 pt-3 border-t border-slate-700/30">
                                            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Stay Updated</h4>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    placeholder="Your email"
                                                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg py-2 pl-3 pr-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50"
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute top-0 right-0 h-full px-3 text-indigo-400 hover:text-indigo-300 transition-colors"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                                        <polyline points="12 5 19 12 12 19"></polyline>
                                                    </svg>
                                                </button>
                                            </div>
                                            <p className="text-xs text-slate-400 mt-2">
                                                Get notified about new features and updates.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom copyright bar */}
                <div className="border-t border-slate-800 mt-10 pt-6 pb-8 footer-animate" style={{ '--delay': '0.4s' } as React.CSSProperties}>
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <div className="flex items-center mb-4 sm:mb-0">
                            <div className="text-sm text-slate-400">
                                &copy; {getCurrentYear()} Enterprise Empowerment Platform. All rights reserved.
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <select className="bg-slate-800 border border-slate-700 rounded-md text-xs text-slate-300 py-1 pl-2 pr-6 appearance-none focus:outline-none focus:ring-1 focus:ring-indigo-500">
                                <option value="en">English</option>
                                <option value="fr">Français</option>
                                <option value="es">Español</option>
                                <option value="de">Deutsch</option>
                            </select>

                            <div className="flex items-center text-xs text-slate-400">
                                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
                                All systems operational
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animation styles */}
            <style jsx>{`
                .footer-animate {
                    opacity: 0;
                    transform: translateY(20px);
                    transition: opacity 0.6s ease, transform 0.6s ease;
                    transition-delay: var(--delay, 0s);
                }
                
                .animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }
            `}</style>
        </footer>
    );
};