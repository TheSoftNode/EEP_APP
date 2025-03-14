import React, { useEffect, useRef } from 'react';

export const FeaturesSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    // Animation effect for feature cards
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

        const featureElements = document.querySelectorAll('.feature-card');
        featureElements.forEach(el => observer.observe(el));

        return () => {
            featureElements.forEach(el => observer.unobserve(el));
        };
    }, []);

    const features = [
        {
            title: "AI-Enabled Terminal",
            description: "Connect to your local environment with an AI-powered terminal that provides real-time guidance and error resolution.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-indigo-600">
                    <polyline points="4 17 10 11 4 5"></polyline>
                    <line x1="12" y1="19" x2="20" y2="19"></line>
                </svg>
            ),
            gradient: 'from-indigo-100 to-violet-100',
            borderGradient: 'from-indigo-300 to-violet-300',
            iconColor: 'text-indigo-600'
        },
        {
            title: "Expert Mentorship",
            description: "Get personalized guidance from industry professionals who can review your work and provide targeted feedback.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-blue-600">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
            ),
            gradient: 'from-blue-100 to-cyan-100',
            borderGradient: 'from-blue-300 to-cyan-300',
            iconColor: 'text-blue-600'
        },
        {
            title: "Project Management",
            description: "Track progress, manage tasks, and visualize project milestones with our comprehensive dashboard.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-green-600">
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
            ),
            gradient: 'from-green-100 to-emerald-100',
            borderGradient: 'from-green-300 to-emerald-300',
            iconColor: 'text-green-600'
        },
        {
            title: "API Management",
            description: "Document, test, and manage your API endpoints in one centralized location for better collaboration.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-purple-600">
                    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
            ),
            gradient: 'from-purple-100 to-pink-100',
            borderGradient: 'from-purple-300 to-pink-300',
            iconColor: 'text-purple-600'
        },
        {
            title: "Simplified Deployment",
            description: "Deploy your applications with a single click to our managed AWS infrastructure.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-orange-600">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                    <line x1="6" y1="6" x2="6.01" y2="6"></line>
                    <line x1="6" y1="18" x2="6.01" y2="18"></line>
                </svg>
            ),
            gradient: 'from-orange-100 to-amber-100',
            borderGradient: 'from-orange-300 to-amber-300',
            iconColor: 'text-orange-600'
        },
        {
            title: "Team Collaboration",
            description: "Invite team members, control access permissions, and work together seamlessly on projects.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-red-600">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-4-4H13"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
            ),
            gradient: 'from-red-100 to-rose-100',
            borderGradient: 'from-red-300 to-rose-300',
            iconColor: 'text-red-600'
        }
    ];

    return (
        <section id="features" ref={sectionRef} className="py-20 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
            {/* Enhanced sophisticated background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Radial gradients */}
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-indigo-100/40 to-violet-100/40 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/4 animate-pulse-slow"></div>
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-100/40 to-cyan-100/40 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/4 animate-pulse-slow"></div>

                {/* Dynamic circular elements */}
                <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-indigo-600/5 rounded-full animate-float-slow"></div>
                <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-blue-600/5 rounded-full animate-float-medium"></div>
                <div className="absolute top-2/4 left-3/4 w-20 h-20 bg-green-600/5 rounded-full animate-float-fast"></div>

                {/* Connective lines */}
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(79, 70, 229, 0.05)" />
                            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.08)" />
                            <stop offset="100%" stopColor="rgba(79, 70, 229, 0.05)" />
                        </linearGradient>
                        <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.05)" />
                            <stop offset="50%" stopColor="rgba(147, 197, 253, 0.08)" />
                            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.05)" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M0,100 C150,200 250,0 500,100 C750,200 850,0 1000,100"
                        fill="none"
                        stroke="url(#lineGradient1)"
                        strokeWidth="2"
                        className="animate-wave-slow"
                    />
                    <path
                        d="M0,150 C150,50 250,250 500,150 C750,50 850,250 1000,150"
                        fill="none"
                        stroke="url(#lineGradient2)"
                        strokeWidth="2"
                        className="animate-wave-medium"
                    />
                </svg>

                {/* Dot matrix pattern */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #4f46e5 1px, transparent 1px)',
                        backgroundSize: '24px 24px'
                    }}>
                </div>

                {/* Animation keyframes */}
                <style>{`
                    @keyframes pulse-slow {
                        0%, 100% { opacity: 0.4; }
                        50% { opacity: 0.6; }
                    }
                    
                    @keyframes float-slow {
                        0%, 100% { transform: translateY(0) translateX(0); }
                        50% { transform: translateY(-20px) translateX(10px); }
                    }
                    
                    @keyframes float-medium {
                        0%, 100% { transform: translateY(0) translateX(0); }
                        50% { transform: translateY(15px) translateX(-10px); }
                    }
                    
                    @keyframes float-fast {
                        0%, 100% { transform: translateY(0) translateX(0); }
                        50% { transform: translateY(-10px) translateX(-15px); }
                    }
                    
                    @keyframes wave-slow {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-100px); }
                    }
                    
                    @keyframes wave-medium {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(100px); }
                    }
                    
                    @keyframes shimmer {
                        0% { background-position: -100% 0; }
                        100% { background-position: 200% 0; }
                    }
                    
                    .animate-pulse-slow {
                        animation: pulse-slow 8s ease-in-out infinite;
                    }
                    
                    .animate-float-slow {
                        animation: float-slow 15s ease-in-out infinite;
                    }
                    
                    .animate-float-medium {
                        animation: float-medium 12s ease-in-out infinite;
                    }
                    
                    .animate-float-fast {
                        animation: float-fast 10s ease-in-out infinite;
                    }
                    
                    .animate-wave-slow {
                        animation: wave-slow 25s linear infinite;
                    }
                    
                    .animate-wave-medium {
                        animation: wave-medium 20s linear infinite;
                    }
                    
                    .animate-shimmer {
                        animation: shimmer 3s infinite linear;
                        background-size: 200% 100%;
                    }
                    
                    .feature-card {
                        opacity: 0;
                        transform: translateY(20px);
                        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
                    }
                    
                    .animate-in {
                        opacity: 1;
                        transform: translateY(0);
                    }
                `}</style>
            </div>

            <div className="container px-4 mx-auto relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-indigo-50 border border-indigo-100 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-indigo-600 mr-2">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                        </svg>
                        <span className="text-indigo-700 font-medium text-sm">Enterprise Features</span>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
                        Powerful Features for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Developers and Businesses</span>
                    </h2>

                    <p className="mt-4 text-xl text-gray-500">
                        Our platform provides everything you need to accelerate development and ensure project success.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="feature-card relative group"
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                            <div className="bg-white shadow-sm hover:shadow-md shadow-gray-200/50 rounded-xl relative z-10 h-full transform transition-all duration-300 group-hover:translate-y-[-3px] overflow-hidden">
                                {/* Decorative top border with gradient */}
                                <div className={`h-1 w-full bg-gradient-to-r ${feature.borderGradient} group-hover:animate-shimmer`}></div>

                                <div className="p-6">
                                    <div className="flex items-start mb-4">
                                        <div className={`${feature.iconColor} bg-gray-50 rounded-lg p-2 mr-3`}>
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mt-1">
                                            {feature.title}
                                        </h3>
                                    </div>

                                    <p className="text-gray-500">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};