import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const CTASection: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState<'learners' | 'businesses'>('learners');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <section ref={sectionRef} className="py-16 relative overflow-hidden bg-slate-900">
            {/* Sophisticated background elements */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Rich gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-slate-900 to-slate-900"></div>

                {/* Abstract fluid shapes */}
                <div className="absolute top-0 right-0 w-full h-full">
                    <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-10">
                        <defs>
                            <linearGradient id="cta-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.3" />
                                <stop offset="50%" stopColor="#7E22CE" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.3" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M0,500 C150,400 350,300 500,500 C650,700 850,600 1000,500 L1000,1000 L0,1000 Z"
                            fill="url(#cta-gradient-1)"
                            className="animate-morph-slow"
                        />
                    </svg>
                </div>

                {/* Floating elements with blur */}
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute -bottom-40 -right-20 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>

                {/* Soft flowing lines */}
                <div className="absolute inset-0">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
                        <path
                            d="M0,100 C200,50 350,150 500,100 C650,50 800,150 1000,100 L1000,250 C800,300 650,200 500,250 C350,300 200,200 0,250 Z"
                            fill="none"
                            stroke="url(#cta-gradient-1)"
                            strokeWidth="0.5"
                            className="animate-flow-slow"
                        />
                        <path
                            d="M0,350 C200,300 350,400 500,350 C650,300 800,400 1000,350"
                            fill="none"
                            stroke="url(#cta-gradient-1)"
                            strokeWidth="0.5"
                            className="animate-flow-slow animation-delay-1000"
                        />
                    </svg>
                </div>

                {/* Accent highlights */}
                <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-indigo-400/30 rounded-full blur-sm animate-pulse-fast"></div>
                <div className="absolute top-2/3 left-1/4 w-3 h-3 bg-cyan-400/30 rounded-full blur-sm animate-pulse-fast animation-delay-750"></div>
                <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-purple-400/30 rounded-full blur-sm animate-pulse-fast animation-delay-500"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="max-w-4xl mx-auto"
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    variants={staggerContainer}
                >
                    <motion.div variants={fadeInUp} className="text-center mb-8">
                        <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-indigo-400 uppercase bg-indigo-900/30 rounded-full mb-3">Join Our Platform</span>

                        <h2 className="text-3xl font-bold sm:text-4xl mb-3 text-white">
                            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Transform</span> Your Development Journey?
                        </h2>

                        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                            Apply now to access our cutting-edge workspace designed for developers.
                            With AI assistance and expert mentorship, you'll accelerate your growth
                            and build remarkable projects.
                        </p>

                        {/* Two-week notice badge */}
                        <div className="inline-block mt-4 px-4 py-2 bg-gradient-to-r from-amber-600/20 to-amber-500/20 border border-amber-500/40 rounded-lg">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-amber-400 mr-2">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                <span className="text-amber-300 font-medium">Applications are reviewed within 2 weeks</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Tabs for user types */}
                    <motion.div variants={fadeInUp} className="flex justify-center mb-6">
                        <div className="inline-flex p-1 bg-slate-800 rounded-lg">
                            <button
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${activeTab === 'learners'
                                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                                    : 'text-slate-300 hover:text-white'
                                    }`}
                                onClick={() => setActiveTab('learners')}
                            >
                                For Learners
                            </button>

                            <button
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${activeTab === 'businesses'
                                    ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-white shadow-lg shadow-cyan-600/20'
                                    : 'text-slate-300 hover:text-white'
                                    }`}
                                onClick={() => setActiveTab('businesses')}
                            >
                                For Businesses
                            </button>
                        </div>
                    </motion.div>

                    {/* Application cards */}
                    <motion.div variants={fadeInUp}>
                        {activeTab === 'learners' ? (
                            <div className="bg-gradient-to-r from-indigo-900/50 to-slate-800/50 border border-indigo-700/30 rounded-xl p-6 backdrop-blur-sm">
                                <div className="flex flex-col md:flex-row gap-6 items-center">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-white mb-2">Developer Application</h3>
                                        <p className="text-slate-300 mb-4">
                                            Submit your application to join our platform as a learner. You'll get access to:
                                        </p>
                                        <ul className="space-y-2">
                                            <li className="flex items-center text-sm text-slate-300">
                                                <span className="mr-2 text-green-400">✓</span>
                                                <span>Interactive project milestones with step-by-step guidance</span>
                                            </li>
                                            <li className="flex items-center text-sm text-slate-300">
                                                <span className="mr-2 text-green-400">✓</span>
                                                <span>AI-powered assistant to accelerate your development</span>
                                            </li>
                                            <li className="flex items-center text-sm text-slate-300">
                                                <span className="mr-2 text-green-400">✓</span>
                                                <span>Real-time interaction with industry mentors</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="md:ml-auto text-center md:text-right">
                                        <div className="border border-indigo-700/30 bg-indigo-900/30 rounded-lg p-4 mb-4">
                                            <div className="text-xs uppercase font-semibold text-indigo-300 mb-1">Application Process</div>
                                            <div className="text-sm text-white">After review, selected candidates receive workspace access</div>
                                        </div>

                                        <a href="/apply" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white rounded-lg shadow-lg shadow-indigo-800/30 transition-all duration-200">
                                            <span className="text-sm font-semibold mr-2">Apply Now</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-gradient-to-r from-cyan-900/50 to-slate-800/50 border border-cyan-700/30 rounded-xl p-6 backdrop-blur-sm">
                                <div className="flex flex-col md:flex-row gap-6 items-center">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-white mb-2">Business Application</h3>
                                        <p className="text-slate-300 mb-4">
                                            Connect with our platform to find the perfect developers for your projects. You'll get:
                                        </p>
                                        <ul className="space-y-2">
                                            <li className="flex items-center text-sm text-slate-300">
                                                <span className="mr-2 text-green-400">✓</span>
                                                <span>Custom talent matching based on your project requirements</span>
                                            </li>
                                            <li className="flex items-center text-sm text-slate-300">
                                                <span className="mr-2 text-green-400">✓</span>
                                                <span>Clear development roadmap with interactive milestones</span>
                                            </li>
                                            <li className="flex items-center text-sm text-slate-300">
                                                <span className="mr-2 text-green-400">✓</span>
                                                <span>Transparent workflow with progress tracking</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="md:ml-auto text-center md:text-right">
                                        <div className="border border-cyan-700/30 bg-cyan-900/30 rounded-lg p-4 mb-4">
                                            <div className="text-xs uppercase font-semibold text-cyan-300 mb-1">Enterprise Users</div>
                                            <div className="text-sm text-white">Business workspace access coming soon</div>
                                        </div>

                                        <a href="/business-apply" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 text-white rounded-lg shadow-lg shadow-cyan-800/30 transition-all duration-200">
                                            <span className="text-sm font-semibold mr-2">Partner With Us</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            </div>

            {/* Keyframe animation styles */}
            <style jsx>{`
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.7; }
                }
                
                @keyframes pulse-fast {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 1; }
                }
                
                @keyframes flow-slow {
                    0% { transform: translateY(0); }
                    50% { transform: translateY(10px); }
                    100% { transform: translateY(0); }
                }
                
                @keyframes morph-slow {
                    0% { d: path("M0,500 C150,400 350,300 500,500 C650,700 850,600 1000,500 L1000,1000 L0,1000 Z"); }
                    50% { d: path("M0,500 C150,450 350,350 500,450 C650,550 850,650 1000,500 L1000,1000 L0,1000 Z"); }
                    100% { d: path("M0,500 C150,400 350,300 500,500 C650,700 850,600 1000,500 L1000,1000 L0,1000 Z"); }
                }
                
                .animate-pulse-slow {
                    animation: pulse-slow 8s ease-in-out infinite;
                }
                
                .animate-pulse-fast {
                    animation: pulse-fast 3s ease-in-out infinite;
                }
                
                .animate-flow-slow {
                    animation: flow-slow 15s ease-in-out infinite;
                }
                
                .animate-morph-slow {
                    animation: morph-slow 20s ease-in-out infinite;
                }
                
                .animation-delay-500 {
                    animation-delay: 0.5s;
                }
                
                .animation-delay-750 {
                    animation-delay: 0.75s;
                }
                
                .animation-delay-1000 {
                    animation-delay: 1s;
                }
                
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
            `}</style>
        </section>
    );
};