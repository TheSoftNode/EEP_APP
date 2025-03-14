// export const TestimonialsSection = () => {
//     const testimonials = [
//         {
//             content: "The AI-powered terminal assistance has dramatically improved my coding efficiency. It's like having a senior developer looking over my shoulder 24/7.",
//             author: "Sarah Johnson",
//             role: "Full Stack Developer",
//             avatar: "https://randomuser.me/api/portraits/women/75.jpg"
//         },
//         {
//             content: "As a business owner, finding the right development talent was always a challenge. EEP matched us with perfect developers and provided the structure we needed.",
//             author: "Michael Chen",
//             role: "Startup Founder",
//             avatar: "https://randomuser.me/api/portraits/men/32.jpg"
//         },
//         {
//             content: "The mentorship I received through EEP has been invaluable. My mentor identified gaps in my knowledge and helped me become a much more confident developer.",
//             author: "Aisha Patel",
//             role: "Junior Developer",
//             avatar: "https://randomuser.me/api/portraits/women/63.jpg"
//         }
//     ];

//     return (
//         <section id="testimonials" className="py-20 bg-white">
//             <div className="container px-4 mx-auto">
//                 <div className="max-w-3xl mx-auto text-center mb-16">
//                     <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
//                         What Our Users Say
//                     </h2>
//                     <p className="mt-4 text-xl text-gray-500">
//                         Don't just take our word for it — hear from developers and businesses who have transformed their work with EEP.
//                     </p>
//                 </div>

//                 <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//                     {testimonials.map((testimonial, index) => (
//                         <div key={index} className="p-6 bg-gray-50 rounded-lg border border-gray-100">
//                             <div className="flex items-center mb-4">
//                                 <div className="mr-4">
//                                     <img
//                                         src={testimonial.avatar}
//                                         alt={testimonial.author}
//                                         className="w-12 h-12 rounded-full"
//                                     />
//                                 </div>
//                                 <div>
//                                     <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
//                                     <p className="text-gray-500 text-sm">{testimonial.role}</p>
//                                 </div>
//                             </div>
//                             <p className="text-gray-600 italic">"{testimonial.content}"</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    // Animation effect for testimonial cards
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

        const testimonialElements = document.querySelectorAll('.testimonial-card');
        testimonialElements.forEach(el => observer.observe(el));

        return () => {
            testimonialElements.forEach(el => observer.unobserve(el));
        };
    }, []);

    const testimonials = [
        {
            content: "The AI-powered terminal assistance has dramatically improved my coding efficiency. It's like having a senior developer looking over my shoulder 24/7.",
            author: "Sarah Johnson",
            role: "Full Stack Developer",
            avatar: "https://randomuser.me/api/portraits/women/75.jpg",
            gradient: "from-blue-50 to-indigo-50",
            border: "border-blue-100",
            iconColor: "text-blue-400"
        },
        {
            content: "As a business owner, finding the right development talent was always a challenge. EEP matched us with perfect developers and provided the structure we needed.",
            author: "Michael Chen",
            role: "Startup Founder",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            gradient: "from-indigo-50 to-violet-50",
            border: "border-indigo-100",
            iconColor: "text-indigo-400"
        },
        {
            content: "The mentorship I received through EEP has been invaluable. My mentor identified gaps in my knowledge and helped me become a much more confident developer.",
            author: "Aisha Patel",
            role: "Junior Developer",
            avatar: "https://randomuser.me/api/portraits/women/63.jpg",
            gradient: "from-violet-50 to-purple-50",
            border: "border-violet-100",
            iconColor: "text-violet-400"
        }
    ];

    return (
        <section id="testimonials" ref={sectionRef} className="py-16 relative bg-gradient-to-b from-slate-50 to-white overflow-hidden">
            {/* Sophisticated background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Subtle patterns */}
                <div className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23667eea' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                    }}
                ></div>

                {/* Soft gradient blobs */}
                <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-gradient-to-br from-indigo-100/10 to-indigo-200/5 rounded-[40%] blur-3xl"></div>
                <div className="absolute left-0 bottom-0 w-1/3 h-1/3 bg-gradient-to-tr from-violet-100/10 to-violet-200/5 rounded-[40%] blur-3xl"></div>

                {/* Subtle waves */}
                <svg className="absolute top-0 left-0 right-0 w-full h-48 text-indigo-50" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="currentColor" fillOpacity="1" d="M0,192L60,176C120,160,240,128,360,133.3C480,139,600,181,720,186.7C840,192,960,160,1080,154.7C1200,149,1320,171,1380,181.3L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
                </svg>

                {/* Floating quote marks */}
                <div className="absolute top-20 left-10 opacity-5">
                    <Quote size={80} />
                </div>
                <div className="absolute bottom-20 right-10 opacity-5 transform rotate-180">
                    <Quote size={80} />
                </div>

                {/* Animation keyframes */}
                <style>{`
                    @keyframes float-slow {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-10px); }
                    }
                    
                    @keyframes pulse-slow {
                        0%, 100% { opacity: 0.8; }
                        50% { opacity: 1; }
                    }
                    
                    @keyframes shimmer {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                    }
                    
                    .testimonial-card {
                        opacity: 0;
                        transform: translateY(15px);
                        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
                    }
                    
                    .animate-in {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    
                    .quote-icon {
                        position: relative;
                        overflow: hidden;
                    }
                    
                    .quote-icon::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.5), transparent);
                        transform: translateX(-100%);
                    }
                    
                    .testimonial-card:hover .quote-icon::before {
                        animation: shimmer 2s infinite;
                    }
                `}</style>
            </div>

            <div className="container px-4 mx-auto relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 rounded-full mb-3 border border-indigo-100 shadow-sm">Testimonials</span>

                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-3">
                        What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Users Say</span>
                    </h2>

                    <p className="text-lg text-gray-500">
                        Don't just take our word for it — hear from developers and businesses who have transformed their work with EEP.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className={`testimonial-card rounded-xl border ${testimonial.border} overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className={`p-1 bg-gradient-to-r ${testimonial.gradient}`}>
                                <div className="flex justify-between items-center px-4 py-2 bg-white">
                                    <div className="flex items-center">
                                        <div className="relative mr-3">
                                            <img
                                                src={testimonial.avatar}
                                                alt={testimonial.author}
                                                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                                            />
                                            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                                                <div className={`quote-icon rounded-full p-1 ${testimonial.iconColor}`}>
                                                    <Quote size={10} />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 text-sm">{testimonial.author}</h4>
                                            <p className="text-gray-500 text-xs">{testimonial.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <p className="text-gray-600 text-sm leading-relaxed">"{testimonial.content}"</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="max-w-3xl mx-auto mt-10 text-center">
                    <a href="#" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium">
                        <span className="mr-2">View all testimonials</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};