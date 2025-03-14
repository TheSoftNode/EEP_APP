import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const HowItWorksSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    // Animation effect for step cards
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

        const stepElements = document.querySelectorAll('.step-card');
        stepElements.forEach(el => observer.observe(el));

        return () => {
            stepElements.forEach(el => observer.unobserve(el));
        };
    }, []);

    const steps = [
        {
            number: "01",
            title: "Apply to the platform",
            description: "Fill out a simple application form telling us about your skills or project needs.",
            color: "from-indigo-600 to-violet-600",
            lightColor: "from-indigo-100 to-violet-100",
            iconColor: "text-indigo-600"
        },
        {
            number: "02",
            title: "Get matched & onboarded",
            description: "Our team reviews your application and matches you with the right mentors or developers.",
            color: "from-blue-600 to-cyan-600",
            lightColor: "from-blue-100 to-cyan-100",
            iconColor: "text-blue-600"
        },
        {
            number: "03",
            title: "Set up your workspace",
            description: "Configure your development environment and connect to our platform.",
            color: "from-teal-600 to-emerald-600",
            lightColor: "from-teal-100 to-emerald-100",
            iconColor: "text-teal-600"
        },
        {
            number: "04",
            title: "Develop with guidance",
            description: "Work on your project with AI assistance and expert mentorship every step of the way.",
            color: "from-emerald-600 to-green-600",
            lightColor: "from-emerald-100 to-green-100",
            iconColor: "text-emerald-600"
        }
    ];

    return (
        <section id="how-it-works" ref={sectionRef} className="py-16 relative overflow-hidden bg-slate-900 text-white">
            {/* Enhanced sophisticated contrasting background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Prism-like gradients */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-slate-800/50 via-transparent to-slate-900/50"></div>

                {/* Floating geometric shapes */}
                <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-3xl rotate-12 animate-float-slow"></div>
                <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-full -rotate-12 animate-float-medium"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-teal-500/3 to-emerald-500/3 rounded-full blur-3xl"></div>

                {/* Digital circuit pattern */}
                <div className="absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                ></div>

                {/* Enhanced flowing lines */}
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="hwGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(99, 102, 241, 0.1)" />
                            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.15)" />
                            <stop offset="100%" stopColor="rgba(99, 102, 241, 0.1)" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M0,50 C150,150 350,0 500,100 C650,200 850,0 1000,50"
                        fill="none"
                        stroke="url(#hwGradient1)"
                        strokeWidth="0.5"
                        strokeDasharray="5,5"
                        className="animate-pulse-slow"
                    />
                </svg>

                {/* Animation keyframes */}
                <style>{`
                    @keyframes pulse-slow {
                        0%, 100% { opacity: 0.3; }
                        50% { opacity: 0.7; }
                    }
                    
                    @keyframes float-slow {
                        0%, 100% { transform: translate(0, 0) rotate(12deg); }
                        50% { transform: translate(10px, -10px) rotate(15deg); }
                    }
                    
                    @keyframes float-medium {
                        0%, 100% { transform: translate(0, 0) rotate(-12deg); }
                        50% { transform: translate(-10px, 10px) rotate(-15deg); }
                    }
                    
                    @keyframes shimmer {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                    }
                    
                    .animate-pulse-slow {
                        animation: pulse-slow 8s ease-in-out infinite;
                    }
                    
                    .animate-float-slow {
                        animation: float-slow 12s ease-in-out infinite;
                    }
                    
                    .animate-float-medium {
                        animation: float-medium 10s ease-in-out infinite;
                    }
                    
                    .step-card {
                        opacity: 0;
                        transform: translateY(15px);
                        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
                    }
                    
                    .animate-in {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    
                    .step-connector {
                        opacity: 0;
                        width: 0;
                        transition: width 1s ease-out, opacity 0.6s ease-out;
                    }
                    
                    .animate-in .step-connector {
                        opacity: 1;
                        width: calc(100% - 3rem);
                    }
                `}</style>
            </div>

            <div className="container px-4 mx-auto relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-10">
                    <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-indigo-400 uppercase bg-indigo-900/30 rounded-full mb-3">Simple Process</span>

                    <h2 className="text-3xl font-bold sm:text-4xl mb-3">
                        How <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">It Works</span>
                    </h2>

                    <p className="text-lg text-slate-300">
                        From application to project completion, we've made the process simple and effective.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="step-card relative"
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="relative flex justify-center">
                                {/* Animated number with gradient */}
                                <div className="relative z-10 w-16 h-16 rounded-xl bg-slate-800 flex items-center justify-center mb-4 border border-slate-700 group overflow-hidden">
                                    {/* Shimmer effect */}
                                    <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-slate-600/10 to-transparent skew-x-20 -translate-x-full group-hover:animate-shimmer"></div>

                                    {/* Number */}
                                    <span className={`relative z-10 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-br ${step.color}`}>
                                        {step.number}
                                    </span>
                                </div>

                                {/* Connector line */}
                                {index < steps.length - 1 && (
                                    <div className="absolute top-8 left-[calc(50%+1rem)] h-0.5 bg-gradient-to-r from-slate-500 to-slate-700 step-connector hidden lg:block"></div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600/50 transition-colors duration-300">
                                <h3 className={`text-lg font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${step.color}`}>
                                    {step.title}
                                </h3>
                                <p className="text-slate-300 text-sm">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-10">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <a href="#" className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white rounded-lg shadow-lg shadow-indigo-800/50 transition-all duration-200">
                            <span className="text-sm font-medium mr-2">Start Your Journey</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};