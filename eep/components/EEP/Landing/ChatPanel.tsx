"use client"

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai"
import ReactMarkdown from 'react-markdown';



interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
}



type ViewMode = 'closed' | 'minimized' | 'normal' | 'maximized' | 'fullscreen';

const ChatPanel: React.FC = () => {
    const [viewMode, setViewMode] = useState<ViewMode>('closed');
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom function
    const scrollToBottom = (delay = 0) => {
        setTimeout(() => {
            if (chatContainerRef.current) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
        }, delay);
    };

    // Separate effects for different scroll triggers
    useEffect(() => {
        // Scroll when messages change
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // Scroll when chat opens with a delay to ensure content is rendered
        if (viewMode !== 'closed' && viewMode !== 'minimized') {
            scrollToBottom(100); // 100ms delay when opening
        }
    }, [viewMode]);

    // const scrollToBottom = () =>
    // {
    //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const systemMessage: Message = {
        role: 'system',
        content: `You are a helpful AI assistant for the Enterprise Engagement Program (EEP). You help users understand the program, application process, and answer questions about AI and technology training.
        Format your responses using markdown with proper headings (##), lists (-), and emphasis (**bold**, *italic*) where appropriate.
        Keep responses well-structured and easy to read.
        Use headings for different sections, lists for multiple points, and emphasis for important information.
        Keep your responses focused on EEP, AI education, and enterprise technology training.`
    };

    const formatAIResponse = (content: string) => {
        // Add line breaks before headings if they don't exist
        content = content.replace(/([^\n])(#{1,6}\s)/g, '$1\n\n$2');
        // Add line breaks before lists if they don't exist
        content = content.replace(/([^\n])([-*]\s)/g, '$1\n\n$2');
        return content;
    };

    const handleSendMessage = async () => {
        if (!input.trim()) return;
        setError(null);

        const newMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, newMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const messagesForAPI = [
                systemMessage,
                ...messages.map(msg => ({
                    role: msg.role,
                    content: msg.content
                })),
                {
                    role: 'user',
                    content: input
                }
            ];

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer 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"
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    messages: messagesForAPI,
                    temperature: 0.7,
                    max_tokens: 1000
                })
            });

            if (!response.ok) {
                throw new Error(`API call failed: ${response.statusText}`);
            }

            const data = await response.json();
            const assistantResponse = data.choices[0].message.content;

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: assistantResponse
            }]);
        } catch (error) {
            console.error('Error:', error);
            setError('Sorry, I encountered an error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };



    const getPanelStyles = () => {
        // Get viewport width
        const vw = typeof window !== 'undefined' ? window.innerWidth : 0;

        // Calculate responsive widths
        const normalWidth = vw < 640 ? '100%' : // Mobile
            vw < 1024 ? '450px' : // Tablet
                '500px';              // Desktop

        switch (viewMode) {
            case 'minimized':
                return {
                    height: '60px',
                    width: vw < 640 ? '100%' : '300px',
                };
            case 'normal':
                return {
                    height: '100vh',
                    width: normalWidth,
                };
            case 'maximized':
                return {
                    height: '100vh',
                    width: normalWidth,
                };
            case 'fullscreen':
                return {
                    height: '100vh',
                    width: '100vw',
                };
            default:
                return {
                    height: '90vh',
                    width: normalWidth,
                };
        }
    };

    return (
        <>
            {/* Chat Toggle Button - Only show when closed */}
            {viewMode === 'closed' && (
                <div className="fixed bottom-6 right-6" style={{ zIndex: 1000 }}>

                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            onClick={() => setViewMode('normal')}
                            className="relative rounded-full w-14 h-14 p-0 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg group overflow-hidden"
                        >
                            {/* Ripple effect */}
                            <motion.div
                                className="absolute inset-0 bg-white opacity-25"
                                initial={{ scale: 0, opacity: 0.5 }}
                                animate={{
                                    scale: 2,
                                    opacity: 0,
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2,
                                    ease: "easeOut"
                                }}
                            />

                            {/* Icon */}
                            <motion.div
                                animate={{
                                    rotate: [0, -10, 10, -10, 10, 0],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    repeatDelay: 4,
                                    duration: 1,
                                    ease: "easeInOut"
                                }}
                            >
                                <MessageSquare className="h-6 w-6 text-white" />
                            </motion.div>
                        </Button>
                    </motion.div>
                </div>
                // <Button
                //     onClick={() => setViewMode('normal')}
                //     className="fixed bottom-6 right-6 rounded-full w-14 h-14 p-0 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg"
                //     style={{ zIndex: 1000 }}
                // >
                //     <MessageSquare className="h-6 w-6 text-white" />
                // </Button>
            )}

            {/* Chat Panel */}
            <AnimatePresence>
                {viewMode !== 'closed' && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{
                            x: 0,
                            ...getPanelStyles(),
                        }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                        className="fixed right-0 bottom-0 bg-white shadow-xl flex flex-col"
                        style={{ zIndex: 1001 }}
                    >
                        {/* Header */}
                        <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white flex justify-between items-center">
                            <h3 className="font-semibold">EEP Assistant</h3>

                            {/* Window Controls */}
                            <div className="flex items-center gap-2">
                                {viewMode !== 'minimized' && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setViewMode('minimized')}
                                        className="hover:bg-white/20 text-white h-8 w-8"
                                        title="Minimize"
                                    >
                                        <Minimize2 className="h-4 w-4" />
                                    </Button>
                                )}

                                {viewMode === 'minimized' && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setViewMode('normal')}
                                        className="hover:bg-white/20 text-white h-8 w-8"
                                        title="Restore"
                                    >
                                        <Maximize2 className="h-4 w-4" />
                                    </Button>
                                )}

                                {viewMode === 'normal' && (
                                    <>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setViewMode('fullscreen')}
                                            className="hover:bg-white/20 text-white h-8 w-8"
                                            title="Fullscreen"
                                        >
                                            <AiOutlineFullscreen className="h-4 w-4" />
                                        </Button>
                                    </>
                                )}

                                {(viewMode === 'maximized' || viewMode === 'fullscreen') && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setViewMode('normal')}
                                        className="hover:bg-white/20 text-white h-8 w-8"
                                        title="Exit Fullscreen"
                                    >
                                        <AiOutlineFullscreenExit className="h-4 w-4" />
                                    </Button>
                                )}

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setViewMode('closed')}
                                    className="hover:bg-white/20 text-white h-8 w-8"
                                    title="Close"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Messages Container - Only show when not minimized */}
                        {viewMode !== 'minimized' && (
                            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-6">
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} group`}
                                    >
                                        <div className="flex flex-col">
                                            {/* Message Container */}
                                            <div
                                                className={`
                                    relative max-w-[85%] rounded-2xl shadow-md 
                                    ${message.role === 'user'
                                                        ? 'border border-purple-400 text-purple-700 pb-2 mr-2 max-w-[100vw]'
                                                        : 'bg-white border border-green-300 text-gray-800 ml-2 max-w-[85%] pb-2'
                                                    }
                                  `}
                                            >
                                                {/* Message Content */}
                                                <div className={`
                                    p-4 
                                    ${message.role === 'user'
                                                        ? 'bg-white/10  rounded-2xl'
                                                        : 'bg-gradient-to-b from-gray-50/50 to-transparent rounded-2xl'
                                                    }
                                  `}>
                                                    {message.role === 'user' ? (
                                                        <div className="whitespace-pre-wrap font-medium">
                                                            {message.content}
                                                        </div>
                                                    ) : (
                                                        <ReactMarkdown
                                                            className="prose prose-sm max-w-none dark:prose-invert
                                          prose-headings:font-bold prose-headings:text-gray-800
                                          prose-p:text-gray-600 prose-p:leading-relaxed
                                          prose-li:text-gray-600
                                          prose-strong:text-gray-800 prose-strong:font-semibold
                                          prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                                          prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-100
                                          prose-ul:my-2 prose-ol:my-2 prose-li:my-1
                                          prose-h1:text-xl prose-h2:text-lg prose-h3:text-base
                                          prose-h1:mt-3 prose-h1:mb-4
                                          prose-h2:mt-3 prose-h2:mb-3
                                          prose-h3:mt-2 prose-h3:mb-2"
                                                            components={{
                                                                h1: ({ children }) => (
                                                                    <h1 className="flex items-center gap-2 text-xl font-bold text-gray-800 border-b border-gray-100 pb-2">
                                                                        {children}
                                                                    </h1>
                                                                ),
                                                                h2: ({ children }) => (
                                                                    <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800">
                                                                        {children}
                                                                    </h2>
                                                                ),
                                                                ul: ({ children }) => (
                                                                    <ul className="space-y-1 list-disc marker:text-blue-500 pl-5">
                                                                        {children}
                                                                    </ul>
                                                                ),
                                                                ol: ({ children }) => (
                                                                    <ol className="space-y-1 list-decimal marker:text-blue-500 marker:font-medium pl-5">
                                                                        {children}
                                                                    </ol>
                                                                ),
                                                                li: ({ children }) => (
                                                                    <li className="pl-2">
                                                                        {children}
                                                                    </li>
                                                                ),
                                                                code: ({ children }) => (
                                                                    <code className="font-mono text-sm bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">
                                                                        {children}
                                                                    </code>
                                                                ),
                                                                pre: ({ children }) => (
                                                                    <pre className="bg-gray-50 border border-gray-100 p-3 rounded-lg my-3 overflow-x-auto">
                                                                        {children}
                                                                    </pre>
                                                                ),
                                                            }}
                                                        >
                                                            {formatAIResponse(message.content)}
                                                        </ReactMarkdown>
                                                    )}
                                                </div>

                                                {/* Time indicator or status (optional) */}
                                                <div className={`
                                                    text-xs text-gray-400 mt-1 px-2
                                                    ${message.role === 'user' ? 'text-right' : 'text-left'}
                                                    `}>
                                                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ))}

                                {/* Loading indicator with improved styling */}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-md">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Error message with improved styling */}
                                {error && (
                                    <div className="flex justify-start">
                                        <div className="bg-red-50 border border-red-100 p-4 rounded-2xl shadow-md max-w-[85%]">
                                            <div className="flex items-start gap-3">
                                                <div className="text-red-500 mt-0.5">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="text-red-800 font-medium mb-1">Error</h3>
                                                    <p className="text-red-600 text-sm">{error}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                            // <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            //         {messages.map((message, index) => (
                            //             <div
                            //                 key={index}
                            //                 className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            //             >
                            //                 <div
                            //                     className={`max-w-[80%] p-3 rounded-lg ${message.role === 'user'
                            //                             ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                            //                             : 'bg-gray-100 text-gray-800'
                            //                         }`}
                            //                 >
                            //                     {message.role === 'user' ? (
                            //                         <p className="whitespace-pre-wrap">{message.content}</p>
                            //                     ) : (
                            //                         <ReactMarkdown
                            //                             className="prose prose-sm max-w-none dark:prose-invert prose-headings:mb-2 prose-headings:mt-2 prose-p:mb-2 prose-p:mt-0 prose-ul:mb-2 prose-ul:mt-0 prose-li:mb-0 prose-li:mt-0"
                            //                             components={{
                            //                                 h1: ({ children }) => <h1 className="text-xl font-bold mb-2">{children}</h1>,
                            //                                 h2: ({ children }) => <h2 className="text-lg font-bold mb-2">{children}</h2>,
                            //                                 h3: ({ children }) => <h3 className="text-base font-bold mb-2">{children}</h3>,
                            //                                 ul: ({ children }) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
                            //                                 ol: ({ children }) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
                            //                                 li: ({ children }) => <li className="mb-1">{children}</li>,
                            //                                 p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                            //                                 strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                            //                                 em: ({ children }) => <em className="italic">{children}</em>,
                            //                                 code: ({ children }) => (
                            //                                     <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">{children}</code>
                            //                                 ),
                            //                                 pre: ({ children }) => (
                            //                                     <pre className="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg my-2 overflow-x-auto">
                            //                                         {children}
                            //                                     </pre>
                            //                                 ),
                            //                             }}
                            //                         >
                            //                             {formatAIResponse(message.content)}
                            //                         </ReactMarkdown>
                            //                     )}
                            //                 </div>
                            //             </div>
                            //         ))}


                            //         {error && (
                            //             <div className="flex justify-start">
                            //                 <div className="text-red-500 text-sm p-3 bg-red-50 rounded-lg max-w-[80%]">
                            //                     {error}
                            //                 </div>
                            //             </div>
                            //         )}

                            //         {isLoading && (
                            //         <div className="flex justify-start">
                            //             <div className="bg-gray-100 p-4 rounded-lg flex items-center space-x-2">
                            //                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            //                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            //                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                            //             </div>
                            //         </div>
                            //     )}
                            //     </div>
                        )}

                        {viewMode !== 'minimized' && (
                            <div className="px-6 py-4 border-t">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                        placeholder="Ask about the EEP program..."
                                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <Button
                                        onClick={handleSendMessage}
                                        disabled={isLoading}
                                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                                    >
                                        <Send className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatPanel;

