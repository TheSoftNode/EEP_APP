import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion, Variants, useAnimation, AnimatePresence } from 'framer-motion';

// Define types for terminal lines
interface TerminalLine {
    text: string;
    delay: number;
}

export const HeroSection: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [typedText, setTypedText] = useState<string>('');
    const [hasTypingCompleted, setHasTypingCompleted] = useState<boolean>(false);
    const terminalRef = useRef<HTMLDivElement>(null);
    const controls = useAnimation();
    const textToType: string = 'connect to EEP';

    const terminalLines: TerminalLine[] = [
        { text: 'Connecting to Enterprise Empowerment Platform...', delay: 300 },
        { text: 'Creating development environment...', delay: 500 },
        { text: 'Setting up AI assistance...', delay: 700 },
        { text: 'Configuring mentorship channels...', delay: 900 },
        { text: '✓ Connection established successfully!', delay: 1100 },
        { text: '✓ Development environment ready', delay: 1300 },
        { text: '✓ AI assistant online', delay: 1500 },
        { text: '✓ Mentor channel active', delay: 1700 }
    ];
    const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);

    // Initialize animations when component mounts
    useEffect(() => {
        const sequence = async () => {
            await controls.start('visible');
            setIsLoaded(true);
        };

        sequence();
    }, [controls]);

    // Typing effect with original sequential behavior
    useEffect(() => {
        if (!isLoaded) return;

        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex <= textToType.length) {
                setTypedText(textToType.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
                setHasTypingCompleted(true);
            }
        }, 100);

        return () => {
            clearInterval(typingInterval);
        };
    }, [isLoaded, textToType]);

    // Terminal lines animation with proper sequencing
    useEffect(() => {
        if (!hasTypingCompleted) return;

        let lineTimeouts: NodeJS.Timeout[] = [];

        terminalLines.forEach((line, index) => {
            const timeout = setTimeout(() => {
                setVisibleLines(prev => [...prev, line]);
            }, line.delay);

            lineTimeouts.push(timeout);
        });

        return () => {
            lineTimeouts.forEach(timeout => clearTimeout(timeout));
        };
    }, [hasTypingCompleted]);

    // Animation variants
    const containerVariants: Variants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: {
            y: 20,
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    // Terminal glow animation
    const glowVariants: Variants = {
        initial: {
            opacity: 0.2,
        },
        animate: {
            opacity: [0.2, 0.3, 0.2],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    // Floating animation for subtle movement
    const floatingVariants: Variants = {
        initial: { y: 0 },
        animate: {
            y: [0, -8, 0],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30"></div>

            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 z-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-800/[0.1] [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]"></div>
                </div>
                <motion.svg
                    className="absolute -top-24 -right-20 text-indigo-600/10 w-[500px] h-[500px]"
                    fill="currentColor"
                    viewBox="0 0 200 200"
                    animate={{
                        opacity: [0.1, 0.15, 0.1],
                        rotate: [0, 5, 0],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <path d="M37.5,-65.1C46.9,-56.5,51.1,-42.6,56.8,-29.8C62.5,-16.9,69.7,-5.1,69.6,6.7C69.5,18.5,62.1,30.2,52.6,39.2C43.2,48.2,31.7,54.5,19.5,58.7C7.2,62.9,-5.8,65,-18.8,63C-31.8,61,-44.8,55,-54.1,45.1C-63.4,35.2,-69,21.4,-70.3,7.4C-71.6,-6.6,-68.7,-20.9,-61.9,-33.1C-55.2,-45.3,-44.6,-55.3,-32.6,-62.5C-20.5,-69.7,-6.9,-73.9,5.3,-82.3C17.6,-90.7,35.2,-103.2,43.1,-97.8C51,-92.3,49.4,-69,45.7,-51.8C42.1,-34.6,36.5,-23.5,37.5,-23.6C38.5,-23.8,46,-35.1,48.8,-41.6C51.5,-48,49.6,-49.5,46.1,-50C42.6,-50.6,37.5,-50.2,37.5,-65.1Z" />
                </motion.svg>
                <motion.svg
                    className="absolute -bottom-24 -left-20 text-indigo-600/10 w-[500px] h-[500px]"
                    fill="currentColor"
                    viewBox="0 0 200 200"
                    animate={{
                        opacity: [0.1, 0.15, 0.1],
                        rotate: [0, -5, 0],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                >
                    <path d="M47.7,-58.2C59.9,-47.3,66.6,-30.9,69.4,-14.1C72.2,2.7,71,19.8,63.1,32.8C55.3,45.7,40.8,54.5,25.4,60.2C10.1,65.9,-6.2,68.5,-22.9,65.5C-39.6,62.5,-56.8,54,-67.1,40.1C-77.4,26.2,-80.9,7,-76.2,-9.9C-71.6,-26.8,-58.8,-41.3,-44.5,-52.1C-30.2,-62.9,-15.1,-69.9,1.3,-71.5C17.8,-73.1,35.5,-69.2,47.7,-58.2Z" transform="translate(100 100)" />
                </motion.svg>
            </div>

            {/* Animated glass morphism effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-b from-indigo-500/20 to-purple-600/0 blur-3xl"></div>

            {/* Content */}
            <div className="container relative z-20 px-4 mx-auto">
                <motion.div
                    className="grid items-center grid-cols-1 gap-8 md:gap-12 lg:gap-16 lg:grid-cols-2"
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                >
                    <div className="max-w-xl mx-auto lg:mx-0 space-y-8">
                        <motion.div variants={itemVariants}>
                            <div className="relative mb-6">
                                <motion.div
                                    className="absolute -inset-1 rounded-lg bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur opacity-30"
                                    animate={{ opacity: [0.2, 0.3, 0.2] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />
                                <div className="relative">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
                                        className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mb-4"
                                    />
                                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">Enterprise</span>
                                        <span className="block">Empowerment Platform</span>
                                    </h1>
                                </div>
                            </div>
                        </motion.div>

                        <motion.p
                            variants={itemVariants}
                            className="text-xl text-gray-300"
                        >
                            Accelerate your development journey with AI-assisted guidance and expert mentorship.
                            Build, learn, and grow with structured project management and real-time support.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
                        >
                            <Button
                                size="lg"
                                className="group w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 border-0 shadow-md shadow-indigo-500/20 transition-all hover:shadow-lg hover:shadow-indigo-500/30"
                            >
                                <Link href="/signup?role=learner" className="flex items-center justify-center w-full">
                                    <span>Join as Developer</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="group w-full sm:w-auto border-indigo-400 text-indigo-200 hover:bg-indigo-800/30 transition-all"
                            >
                                <Link href="/signup?role=business" className="flex items-center justify-center w-full">
                                    <span>Join as Business</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </Button>
                        </motion.div>
                    </div>

                    <motion.div
                        variants={itemVariants}
                        className="relative h-80 sm:h-96 lg:h-[28rem] mx-auto lg:mx-0 w-full max-w-xl"
                        ref={terminalRef}
                    >
                        <motion.div
                            className="absolute inset-0"
                            initial="initial"
                            animate="animate"
                            variants={floatingVariants}
                        >
                            {/* Terminal glow effect */}
                            <AnimatePresence>
                                {isLoaded && (
                                    <motion.div
                                        className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-20"
                                        initial="initial"
                                        animate="animate"
                                        variants={glowVariants}
                                    ></motion.div>
                                )}
                            </AnimatePresence>

                            <div className="absolute inset-0 bg-gradient-to-b from-slate-800/90 to-indigo-900/90 backdrop-blur rounded-xl overflow-hidden shadow-2xl border border-indigo-500/30">
                                {/* Terminal header */}
                                <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-r from-slate-900 to-slate-800 flex items-center px-4">
                                    <div className="flex space-x-2">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    </div>
                                    <div className="mx-auto text-xs text-slate-400 font-medium">EEP Terminal</div>
                                </div>

                                {/* Terminal content */}
                                <div className="absolute inset-0 pt-6 p-4 font-mono text-sm">
                                    <div className="h-full overflow-hidden space-y-1">
                                        <p className="text-indigo-300">~ $ <span className="text-green-400">{typedText}</span><span className={`${typedText.length === textToType.length ? "hidden" : "inline-block"} animate-pulse`}>_</span></p>

                                        {visibleLines.map((line, index) => (
                                            <motion.p
                                                key={index}
                                                className={`${line.text.includes('✓') ? 'text-green-400' : 'text-slate-300'} mt-1`}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {line.text}
                                            </motion.p>
                                        ))}

                                        {visibleLines.length === terminalLines.length && (
                                            <p className="text-indigo-300 mt-3">~ $ <span className="animate-pulse">_</span></p>
                                        )}
                                    </div>
                                </div>

                                {/* Terminal reflections */}
                                <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 via-transparent to-transparent pointer-events-none"></div>
                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

                                {/* Scan line effect */}
                                <motion.div
                                    className="absolute left-0 right-0 h-px bg-indigo-400/30 pointer-events-none"
                                    animate={{
                                        top: ["10%", "90%", "10%"],
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                ></motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

