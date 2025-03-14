import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Sparkles, Shield, Clock, Users, Zap, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export const PricingSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    // Animation effect for pricing cards
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

        const cardElements = document.querySelectorAll('.pricing-card');
        cardElements.forEach(el => observer.observe(el));

        return () => {
            cardElements.forEach(el => observer.unobserve(el));
        };
    }, []);

    const plans = [
        {
            name: "Starter",
            price: "$29",
            period: "per month",
            description: "Perfect for solo developers looking to improve their skills",
            features: [
                { text: "AI-assisted terminal", icon: <Sparkles className="h-4 w-4" /> },
                { text: "Basic project tracking", icon: <Clock className="h-4 w-4" /> },
                { text: "Community mentorship", icon: <Users className="h-4 w-4" /> },
                { text: "1 active project", icon: <Zap className="h-4 w-4" /> },
                { text: "Single developer access", icon: <Shield className="h-4 w-4" /> }
            ],
            cta: "Get Started",
            highlighted: false,
            gradientFrom: "from-blue-600",
            gradientTo: "to-indigo-600",
            iconGradient: "from-blue-200 to-indigo-200"
        },
        {
            name: "Professional",
            price: "$99",
            period: "per month",
            description: "For teams and serious developers working on multiple projects",
            features: [
                { text: "Everything in Starter", icon: <Check className="h-4 w-4" /> },
                { text: "Dedicated mentor", icon: <Award className="h-4 w-4" /> },
                { text: "Advanced project management", icon: <Zap className="h-4 w-4" /> },
                { text: "3 active projects", icon: <Sparkles className="h-4 w-4" /> },
                { text: "Team collaboration (up to 3)", icon: <Users className="h-4 w-4" /> },
                { text: "Priority support", icon: <Shield className="h-4 w-4" /> }
            ],
            cta: "Sign Up Now",
            highlighted: true,
            gradientFrom: "from-indigo-600",
            gradientTo: "to-violet-600",
            iconGradient: "from-indigo-200 to-violet-200"
        },
        {
            name: "Enterprise",
            price: "Custom",
            period: "pricing",
            description: "For businesses with complex development needs",
            features: [
                { text: "Everything in Professional", icon: <Check className="h-4 w-4" /> },
                { text: "Multiple dedicated mentors", icon: <Award className="h-4 w-4" /> },
                { text: "Unlimited active projects", icon: <Zap className="h-4 w-4" /> },
                { text: "Unlimited team members", icon: <Users className="h-4 w-4" /> },
                { text: "Custom integrations", icon: <Sparkles className="h-4 w-4" /> },
                { text: "Dedicated account manager", icon: <Shield className="h-4 w-4" /> }
            ],
            cta: "Contact Us",
            highlighted: false,
            gradientFrom: "from-purple-600",
            gradientTo: "to-pink-600",
            iconGradient: "from-purple-200 to-pink-200"
        }
    ];

    return (
        <section id="pricing" ref={sectionRef} className="py-16 relative overflow-hidden bg-slate-100/80">
            {/* Advanced sophisticated background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100/20 via-slate-200/30 to-slate-100/20"></div>

                {/* Glass morphism effect */}
                <div className="absolute inset-0 backdrop-blur-[100px]"></div>

                {/* Complex grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                ></div>

                {/* Sophisticated wave patterns */}
                <svg className="absolute w-full" style={{ top: '10%' }} preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="rgba(79, 70, 229, 0.03)" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,154.7C384,128,480,96,576,106.7C672,117,768,171,864,186.7C960,203,1056,181,1152,165.3C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>

                <svg className="absolute w-full" style={{ bottom: '10%', transform: 'rotate(180deg)' }} preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="rgba(139, 92, 246, 0.03)" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,154.7C384,128,480,96,576,106.7C672,117,768,171,864,186.7C960,203,1056,181,1152,165.3C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>

                {/* Advanced geometric elements */}
                <div className="absolute inset-0">
                    {/* Triangular prism effect */}
                    <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 transform rotate-45 rounded-lg blur-xl"></div>
                    <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-gradient-to-tr from-blue-500/5 to-cyan-500/5 transform -rotate-12 rounded-full blur-xl"></div>

                    {/* Realistic glass spheres */}
                    <div className="absolute top-1/3 left-1/3 w-16 h-16 bg-white/20 rounded-full shadow-[inset_10px_-10px_30px_rgba(255,255,255,0.2)] backdrop-blur-sm border border-white/10"></div>
                    <div className="absolute bottom-1/4 right-1/5 w-12 h-12 bg-white/10 rounded-full shadow-[inset_10px_-10px_20px_rgba(255,255,255,0.15)] backdrop-blur-sm border border-white/10"></div>

                    {/* Linear accents */}
                    <div className="absolute top-40 left-1/3 w-64 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent rotate-[30deg]"></div>
                    <div className="absolute bottom-40 right-1/3 w-72 h-[1px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent -rotate-[20deg]"></div>
                </div>

                {/* Animation keyframes */}
                <style>{`
                    @keyframes shimmer {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                    }
                    
                    .pricing-card {
                        opacity: 0;
                        transform: translateY(10px);
                        transition: opacity 0.5s ease-out, transform 0.5s ease-out;
                    }
                    
                    .animate-in {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    
                    .hover-lift {
                        transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
                    }
                    
                    .hover-lift:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
                    }
                    
                    .feature-icon {
                        position: relative;
                        overflow: hidden;
                    }
                    
                    .feature-icon::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent);
                        transform: translateX(-100%);
                    }
                    
                    .pricing-card:hover .feature-icon::before {
                        animation: shimmer 2s infinite;
                    }
                `}</style>
            </div>

            <div className="container px-4 mx-auto relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-10">
                    <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-white rounded-full mb-3 border border-indigo-100 shadow-sm">Pricing</span>

                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-3">
                        Flexible <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Pricing Plans</span>
                    </h2>

                    <p className="text-lg text-gray-600">
                        Choose the plan that works best for your development needs
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`pricing-card hover-lift rounded-xl overflow-hidden ${plan.highlighted
                                    ? 'relative z-10 ring-2 ring-indigo-600 shadow-lg'
                                    : 'border border-gray-200 shadow-sm'
                                }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            {plan.highlighted && (
                                <div className="absolute top-0 right-0 -mt-2 -mr-2 w-22 h-22 overflow-hidden">
                                    <div className="absolute transform rotate-45 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium py-1 right-[-35px] top-[15px] w-[150px] text-center text-xs shadow-md">
                                        Popular
                                    </div>
                                </div>
                            )}

                            <div className={`p-6 ${plan.highlighted ? 'bg-gradient-to-br from-indigo-50 to-violet-50 border-b border-indigo-100/50' : 'bg-white border-b border-gray-100'}`}>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>

                                <div className="mt-2 flex items-baseline">
                                    <span className={`text-3xl font-extrabold ${plan.highlighted ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600' : 'text-gray-900'}`}>
                                        {plan.price}
                                    </span>
                                    <span className="ml-1 text-lg font-medium text-gray-500">{plan.period}</span>
                                </div>

                                <p className="mt-3 text-sm text-gray-500">{plan.description}</p>
                            </div>

                            <div className="px-6 py-6 bg-white">
                                <ul className="space-y-3">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start group">
                                            <div className={`flex-shrink-0 feature-icon p-0.5 rounded-full bg-gradient-to-br ${plan.iconGradient} bg-opacity-50`}>
                                                <div className={`flex items-center justify-center h-3.5 w-3.5 rounded-full text-white bg-gradient-to-br ${plan.gradientFrom} ${plan.gradientTo}`}>
                                                    {feature.icon}
                                                </div>
                                            </div>
                                            <p className="ml-2.5 text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">{feature.text}</p>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-6">
                                    <Button
                                        className={`w-full shadow-sm text-sm ${plan.highlighted
                                                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-indigo-500/10'
                                                : 'bg-slate-800 hover:bg-slate-900'
                                            }`}
                                        variant="default"
                                    >
                                        {plan.cta}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="max-w-2xl mx-auto mt-12 text-center">
                    <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-center sm:text-left">
                            <h3 className="text-base font-semibold text-gray-900">
                                Need something specific?
                            </h3>
                            <p className="text-sm text-gray-600">
                                Contact our sales team for a tailored solution
                            </p>
                        </div>
                        <Button
                            className="whitespace-nowrap text-sm bg-slate-800 hover:bg-slate-900"
                            variant="default"
                        >
                            Contact Sales
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};