// "use client"

// import React, { useEffect, useRef, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { MessageSquare, X, Send, Minimize2, Maximize2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai"
// import ReactMarkdown from 'react-markdown';



// interface Message {
//     role: 'user' | 'assistant' | 'system';
//     content: string;
// }



// type ViewMode = 'closed' | 'minimized' | 'normal' | 'maximized' | 'fullscreen';

// const ChatPanel: React.FC = () => {
//     const [viewMode, setViewMode] = useState<ViewMode>('closed');
//     const [messages, setMessages] = useState<Message[]>([]);
//     const [input, setInput] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     const messagesEndRef = useRef<HTMLDivElement>(null);
//     const chatContainerRef = useRef<HTMLDivElement>(null);

//     // Scroll to bottom function
//     const scrollToBottom = (delay = 0) => {
//         setTimeout(() => {
//             if (chatContainerRef.current) {
//                 chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//             }
//         }, delay);
//     };

//     // Separate effects for different scroll triggers
//     useEffect(() => {
//         // Scroll when messages change
//         scrollToBottom();
//     }, [messages]);

//     useEffect(() => {
//         // Scroll when chat opens with a delay to ensure content is rendered
//         if (viewMode !== 'closed' && viewMode !== 'minimized') {
//             scrollToBottom(100); // 100ms delay when opening
//         }
//     }, [viewMode]);

//     // const scrollToBottom = () =>
//     // {
//     //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     // };

//     useEffect(() => {
//         scrollToBottom();
//     }, [messages]);

//     const systemMessage: Message = {
//         role: 'system',
//         content: `You are a helpful AI assistant for the Enterprise Engagement Program (EEP). You help users understand the program, application process, and answer questions about AI and technology training.
//         Format your responses using markdown with proper headings (##), lists (-), and emphasis (**bold**, *italic*) where appropriate.
//         Keep responses well-structured and easy to read.
//         Use headings for different sections, lists for multiple points, and emphasis for important information.
//         Keep your responses focused on EEP, AI education, and enterprise technology training.`
//     };

//     const formatAIResponse = (content: string) => {
//         // Add line breaks before headings if they don't exist
//         content = content.replace(/([^\n])(#{1,6}\s)/g, '$1\n\n$2');
//         // Add line breaks before lists if they don't exist
//         content = content.replace(/([^\n])([-*]\s)/g, '$1\n\n$2');
//         return content;
//     };

//     const handleSendMessage = async () => {
//         if (!input.trim()) return;
//         setError(null);

//         const newMessage: Message = { role: 'user', content: input };
//         setMessages(prev => [...prev, newMessage]);
//         setInput('');
//         setIsLoading(true);

//         try {
//             const messagesForAPI = [
//                 systemMessage,
//                 ...messages.map(msg => ({
//                     role: msg.role,
//                     content: msg.content
//                 })),
//                 {
//                     role: 'user',
//                     content: input
//                 }
//             ];

//             const response = await fetch('https://api.openai.com/v1/chat/completions', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': "Bearer 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"
//                 },
//                 body: JSON.stringify({
//                     model: 'gpt-4o-mini',
//                     messages: messagesForAPI,
//                     temperature: 0.7,
//                     max_tokens: 1000
//                 })
//             });

//             if (!response.ok) {
//                 throw new Error(`API call failed: ${response.statusText}`);
//             }

//             const data = await response.json();
//             const assistantResponse = data.choices[0].message.content;

//             setMessages(prev => [...prev, {
//                 role: 'assistant',
//                 content: assistantResponse
//             }]);
//         } catch (error) {
//             console.error('Error:', error);
//             setError('Sorry, I encountered an error. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };



//     const getPanelStyles = () => {
//         // Get viewport width
//         const vw = typeof window !== 'undefined' ? window.innerWidth : 0;

//         // Calculate responsive widths
//         const normalWidth = vw < 640 ? '100%' : // Mobile
//             vw < 1024 ? '450px' : // Tablet
//                 '500px';              // Desktop

//         switch (viewMode) {
//             case 'minimized':
//                 return {
//                     height: '60px',
//                     width: vw < 640 ? '100%' : '300px',
//                 };
//             case 'normal':
//                 return {
//                     height: '100vh',
//                     width: normalWidth,
//                 };
//             case 'maximized':
//                 return {
//                     height: '100vh',
//                     width: normalWidth,
//                 };
//             case 'fullscreen':
//                 return {
//                     height: '100vh',
//                     width: '100vw',
//                 };
//             default:
//                 return {
//                     height: '90vh',
//                     width: normalWidth,
//                 };
//         }
//     };

//     return (
//         <>
//             {/* Chat Toggle Button - Only show when closed */}
//             {viewMode === 'closed' && (
//                 <div className="fixed bottom-6 right-6" style={{ zIndex: 1000 }}>

//                     <motion.div
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.95 }}
//                     >
//                         <Button
//                             onClick={() => setViewMode('normal')}
//                             className="relative rounded-full w-14 h-14 p-0 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg group overflow-hidden"
//                         >
//                             {/* Ripple effect */}
//                             <motion.div
//                                 className="absolute inset-0 bg-white opacity-25"
//                                 initial={{ scale: 0, opacity: 0.5 }}
//                                 animate={{
//                                     scale: 2,
//                                     opacity: 0,
//                                 }}
//                                 transition={{
//                                     repeat: Infinity,
//                                     duration: 2,
//                                     ease: "easeOut"
//                                 }}
//                             />

//                             {/* Icon */}
//                             <motion.div
//                                 animate={{
//                                     rotate: [0, -10, 10, -10, 10, 0],
//                                 }}
//                                 transition={{
//                                     repeat: Infinity,
//                                     repeatDelay: 4,
//                                     duration: 1,
//                                     ease: "easeInOut"
//                                 }}
//                             >
//                                 <MessageSquare className="h-6 w-6 text-white" />
//                             </motion.div>
//                         </Button>
//                     </motion.div>
//                 </div>
//             )}

//             {/* Chat Panel */}
//             <AnimatePresence>
//                 {viewMode !== 'closed' && (
//                     <motion.div
//                         initial={{ x: '100%' }}
//                         animate={{
//                             x: 0,
//                             ...getPanelStyles(),
//                         }}
//                         exit={{ x: '100%' }}
//                         transition={{ type: 'spring', damping: 20, stiffness: 100 }}
//                         className="fixed right-0 bottom-0 bg-white shadow-xl flex flex-col"
//                         style={{ zIndex: 1001 }}
//                     >
//                         {/* Header */}
//                         <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white flex justify-between items-center">
//                             <h3 className="font-semibold">EEP Assistant</h3>

//                             {/* Window Controls */}
//                             <div className="flex items-center gap-2">
//                                 {viewMode !== 'minimized' && (
//                                     <Button
//                                         variant="ghost"
//                                         size="icon"
//                                         onClick={() => setViewMode('minimized')}
//                                         className="hover:bg-white/20 text-white h-8 w-8"
//                                         title="Minimize"
//                                     >
//                                         <Minimize2 className="h-4 w-4" />
//                                     </Button>
//                                 )}

//                                 {viewMode === 'minimized' && (
//                                     <Button
//                                         variant="ghost"
//                                         size="icon"
//                                         onClick={() => setViewMode('normal')}
//                                         className="hover:bg-white/20 text-white h-8 w-8"
//                                         title="Restore"
//                                     >
//                                         <Maximize2 className="h-4 w-4" />
//                                     </Button>
//                                 )}

//                                 {viewMode === 'normal' && (
//                                     <>
//                                         <Button
//                                             variant="ghost"
//                                             size="icon"
//                                             onClick={() => setViewMode('fullscreen')}
//                                             className="hover:bg-white/20 text-white h-8 w-8"
//                                             title="Fullscreen"
//                                         >
//                                             <AiOutlineFullscreen className="h-4 w-4" />
//                                         </Button>
//                                     </>
//                                 )}

//                                 {(viewMode === 'maximized' || viewMode === 'fullscreen') && (
//                                     <Button
//                                         variant="ghost"
//                                         size="icon"
//                                         onClick={() => setViewMode('normal')}
//                                         className="hover:bg-white/20 text-white h-8 w-8"
//                                         title="Exit Fullscreen"
//                                     >
//                                         <AiOutlineFullscreenExit className="h-4 w-4" />
//                                     </Button>
//                                 )}

//                                 <Button
//                                     variant="ghost"
//                                     size="icon"
//                                     onClick={() => setViewMode('closed')}
//                                     className="hover:bg-white/20 text-white h-8 w-8"
//                                     title="Close"
//                                 >
//                                     <X className="h-4 w-4" />
//                                 </Button>
//                             </div>
//                         </div>

//                         {/* Messages Container - Only show when not minimized */}
//                         {viewMode !== 'minimized' && (
//                             <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-6">
//                                 {messages.map((message, index) => (
//                                     <div
//                                         key={index}
//                                         className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} group`}
//                                     >
//                                         <div className="flex flex-col">
//                                             {/* Message Container */}
//                                             <div
//                                                 className={`
//                                     relative max-w-[85%] rounded-2xl shadow-md 
//                                     ${message.role === 'user'
//                                                         ? 'border border-purple-400 text-purple-700 pb-2 mr-2 max-w-[100vw]'
//                                                         : 'bg-white border border-green-300 text-gray-800 ml-2 max-w-[85%] pb-2'
//                                                     }
//                                   `}
//                                             >
//                                                 {/* Message Content */}
//                                                 <div className={`
//                                     p-4 
//                                     ${message.role === 'user'
//                                                         ? 'bg-white/10  rounded-2xl'
//                                                         : 'bg-gradient-to-b from-gray-50/50 to-transparent rounded-2xl'
//                                                     }
//                                   `}>
//                                                     {message.role === 'user' ? (
//                                                         <div className="whitespace-pre-wrap font-medium">
//                                                             {message.content}
//                                                         </div>
//                                                     ) : (
//                                                         <ReactMarkdown
//                                                             className="prose prose-sm max-w-none dark:prose-invert
//                                           prose-headings:font-bold prose-headings:text-gray-800
//                                           prose-p:text-gray-600 prose-p:leading-relaxed
//                                           prose-li:text-gray-600
//                                           prose-strong:text-gray-800 prose-strong:font-semibold
//                                           prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
//                                           prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-100
//                                           prose-ul:my-2 prose-ol:my-2 prose-li:my-1
//                                           prose-h1:text-xl prose-h2:text-lg prose-h3:text-base
//                                           prose-h1:mt-3 prose-h1:mb-4
//                                           prose-h2:mt-3 prose-h2:mb-3
//                                           prose-h3:mt-2 prose-h3:mb-2"
//                                                             components={{
//                                                                 h1: ({ children }) => (
//                                                                     <h1 className="flex items-center gap-2 text-xl font-bold text-gray-800 border-b border-gray-100 pb-2">
//                                                                         {children}
//                                                                     </h1>
//                                                                 ),
//                                                                 h2: ({ children }) => (
//                                                                     <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800">
//                                                                         {children}
//                                                                     </h2>
//                                                                 ),
//                                                                 ul: ({ children }) => (
//                                                                     <ul className="space-y-1 list-disc marker:text-blue-500 pl-5">
//                                                                         {children}
//                                                                     </ul>
//                                                                 ),
//                                                                 ol: ({ children }) => (
//                                                                     <ol className="space-y-1 list-decimal marker:text-blue-500 marker:font-medium pl-5">
//                                                                         {children}
//                                                                     </ol>
//                                                                 ),
//                                                                 li: ({ children }) => (
//                                                                     <li className="pl-2">
//                                                                         {children}
//                                                                     </li>
//                                                                 ),
//                                                                 code: ({ children }) => (
//                                                                     <code className="font-mono text-sm bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">
//                                                                         {children}
//                                                                     </code>
//                                                                 ),
//                                                                 pre: ({ children }) => (
//                                                                     <pre className="bg-gray-50 border border-gray-100 p-3 rounded-lg my-3 overflow-x-auto">
//                                                                         {children}
//                                                                     </pre>
//                                                                 ),
//                                                             }}
//                                                         >
//                                                             {formatAIResponse(message.content)}
//                                                         </ReactMarkdown>
//                                                     )}
//                                                 </div>

//                                                 {/* Time indicator or status (optional) */}
//                                                 <div className={`
//                                                     text-xs text-gray-400 mt-1 px-2
//                                                     ${message.role === 'user' ? 'text-right' : 'text-left'}
//                                                     `}>
//                                                     {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                                                 </div>
//                                             </div>

//                                         </div>
//                                     </div>
//                                 ))}

//                                 {/* Loading indicator with improved styling */}
//                                 {isLoading && (
//                                     <div className="flex justify-start">
//                                         <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-md">
//                                             <div className="flex items-center gap-2">
//                                                 <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
//                                                 <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
//                                                 <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}

//                                 {/* Error message with improved styling */}
//                                 {error && (
//                                     <div className="flex justify-start">
//                                         <div className="bg-red-50 border border-red-100 p-4 rounded-2xl shadow-md max-w-[85%]">
//                                             <div className="flex items-start gap-3">
//                                                 <div className="text-red-500 mt-0.5">
//                                                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                                     </svg>
//                                                 </div>
//                                                 <div>
//                                                     <h3 className="text-red-800 font-medium mb-1">Error</h3>
//                                                     <p className="text-red-600 text-sm">{error}</p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}
//                                 <div ref={messagesEndRef} />
//                             </div>
//                         )}

//                         {viewMode !== 'minimized' && (
//                             <div className="px-6 py-4 border-t">
//                                 <div className="flex gap-2">
//                                     <input
//                                         type="text"
//                                         value={input}
//                                         onChange={(e) => setInput(e.target.value)}
//                                         onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
//                                         placeholder="Ask about the EEP program..."
//                                         className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     />
//                                     <Button
//                                         onClick={handleSendMessage}
//                                         disabled={isLoading}
//                                         className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
//                                     >
//                                         <Send className="h-5 w-5" />
//                                     </Button>
//                                 </div>
//                             </div>
//                         )}
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </>
//     );
// };

// export default ChatPanel;

"use client"

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Minimize2, Maximize2, MoreHorizontal, Copy, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import ReactMarkdown from 'react-markdown';

interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp?: string;
}

type ViewMode = 'closed' | 'minimized' | 'normal' | 'maximized' | 'fullscreen';

const ChatPanel: React.FC = () => {
    const [viewMode, setViewMode] = useState<ViewMode>('closed');
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState<number | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

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
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    }, [viewMode]);

    // Focus input when opening chat
    useEffect(() => {
        if (viewMode === 'normal' || viewMode === 'maximized' || viewMode === 'fullscreen') {
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }, 300);
        }
    }, [viewMode]);

    const getCurrentTime = () => {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

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

        const newMessage: Message = {
            role: 'user',
            content: input,
            timestamp: getCurrentTime()
        };
        setMessages(prev => [...prev, newMessage]);
        setInput('');
        setIsLoading(true);

        // Simulated typing indicator
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 1000 + Math.random() * 2000);

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
                content: assistantResponse,
                timestamp: getCurrentTime()
            }]);
        } catch (error) {
            console.error('Error:', error);
            setError('Sorry, I encountered an error. Please try again.');
        } finally {
            setIsLoading(false);
            setIsTyping(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 2000);
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
                    width: vw < 640 ? '100%' : '320px',
                };
            case 'normal':
                return {
                    height: '600px',
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

    // Variants for animations
    const chatBubbleVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, y: 20, transition: { duration: 0.2 } }
    };

    const typingIndicatorVariants = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 10 }
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
                            className="relative rounded-full w-14 h-14 p-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 hover:shadow-lg hover:shadow-indigo-500/20 group overflow-hidden"
                        >
                            {/* Particle effects */}
                            <div className="absolute inset-0 overflow-hidden">
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                                        initial={{
                                            x: '50%',
                                            y: '50%',
                                            scale: 0
                                        }}
                                        animate={{
                                            x: `${50 + (Math.random() * 60 - 30)}%`,
                                            y: `${50 + (Math.random() * 60 - 30)}%`,
                                            scale: [0, 1, 0],
                                            opacity: [0, 0.7, 0]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            repeatType: "loop",
                                            delay: i * 0.4,
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Pulse effect */}
                            <motion.div
                                className="absolute inset-0 rounded-full bg-white opacity-20"
                                initial={{ scale: 0.8 }}
                                animate={{
                                    scale: [0.8, 1.2, 0.8],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 3,
                                    ease: "easeInOut"
                                }}
                            />

                            {/* Icon */}
                            <motion.div
                                animate={{
                                    rotate: [0, -10, 10, -5, 5, 0],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    repeatDelay: 5,
                                    duration: 1.2,
                                    ease: "easeInOut"
                                }}
                                className="relative z-10"
                            >
                                <MessageSquare className="h-6 w-6 text-white" />
                            </motion.div>
                        </Button>
                    </motion.div>
                </div>
            )}

            {/* Chat Panel */}
            <AnimatePresence>
                {viewMode !== 'closed' && (
                    <motion.div
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{
                            x: 0,
                            opacity: 1,
                            ...getPanelStyles(),
                        }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                        className="fixed right-0 bottom-0 flex flex-col overflow-hidden rounded-t-xl border border-gray-200 dark:border-gray-800 shadow-2xl"
                        style={{
                            zIndex: 1001,
                            backgroundColor: 'rgba(255, 255, 255, 0.97)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)'
                        }}
                    >
                        {/* Header */}
                        <div className="px-5 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white flex justify-between items-center relative">
                            {/* Glass overlay */}
                            <div className="absolute inset-0 bg-white opacity-10 backdrop-blur-md"></div>

                            {/* Advanced glow effects */}
                            <div className="absolute -top-40 -left-20 w-64 h-64 bg-indigo-500 opacity-20 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-30 -right-10 w-48 h-48 bg-purple-500 opacity-20 rounded-full blur-3xl"></div>

                            <h3 className="font-semibold flex items-center z-10">
                                <div className="mr-2 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                    <MessageSquare className="h-4 w-4 text-white" />
                                </div>
                                <span>EEP Assistant</span>
                                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full ml-2">Beta</span>
                            </h3>

                            {/* Window Controls */}
                            <div className="flex items-center gap-1 z-10">
                                {viewMode !== 'minimized' && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setViewMode('minimized')}
                                        className="hover:bg-white/20 text-white h-7 w-7 rounded-full"
                                        title="Minimize"
                                    >
                                        <Minimize2 className="h-3.5 w-3.5" />
                                    </Button>
                                )}

                                {viewMode === 'minimized' && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setViewMode('normal')}
                                        className="hover:bg-white/20 text-white h-7 w-7 rounded-full"
                                        title="Restore"
                                    >
                                        <Maximize2 className="h-3.5 w-3.5" />
                                    </Button>
                                )}

                                {viewMode === 'normal' && (
                                    <>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setViewMode('fullscreen')}
                                            className="hover:bg-white/20 text-white h-7 w-7 rounded-full"
                                            title="Fullscreen"
                                        >
                                            <AiOutlineFullscreen className="h-3.5 w-3.5" />
                                        </Button>
                                    </>
                                )}

                                {(viewMode === 'maximized' || viewMode === 'fullscreen') && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setViewMode('normal')}
                                        className="hover:bg-white/20 text-white h-7 w-7 rounded-full"
                                        title="Exit Fullscreen"
                                    >
                                        <AiOutlineFullscreenExit className="h-3.5 w-3.5" />
                                    </Button>
                                )}

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setViewMode('closed')}
                                    className="hover:bg-white/20 text-white h-7 w-7 rounded-full"
                                    title="Close"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </div>

                        {/* Minimized View */}
                        {viewMode === 'minimized' && (
                            <div className="flex items-center justify-between px-4 py-2">
                                <p className="text-sm text-gray-600 truncate">
                                    {messages.length > 0
                                        ? `${messages.length} messages`
                                        : "Ask about the EEP program..."}
                                </p>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setViewMode('normal')}
                                    className="text-indigo-600 text-xs"
                                >
                                    Open
                                </Button>
                            </div>
                        )}

                        {/* Messages Container - Only show when not minimized */}
                        {viewMode !== 'minimized' && (
                            <div
                                ref={chatContainerRef}
                                className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                                style={{
                                    backgroundImage: "radial-gradient(circle at 50% 0%, rgba(245, 243, 255, 0.2) 0%, transparent 75%), radial-gradient(circle at 100% 100%, rgba(228, 240, 255, 0.2) 0%, transparent 70%)"
                                }}
                            >
                                {/* Welcome message when no messages */}
                                {messages.length === 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="flex flex-col items-center justify-center h-full text-center px-6 py-10 max-w-md mx-auto"
                                    >
                                        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                                            <MessageSquare className="h-8 w-8 text-indigo-600" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-800 mb-2">Welcome to EEP Assistant</h3>
                                        <p className="text-gray-600 text-sm mb-4">
                                            I'm here to help you with the Enterprise Engagement Program.
                                            Ask me anything about applications, processes, or AI education.
                                        </p>
                                        <div className="grid grid-cols-1 gap-2 w-full">
                                            {[
                                                "How do I apply to the EEP program?",
                                                "What technology training is available?",
                                                "Tell me about the mentor matching process"
                                            ].map((suggestion, i) => (
                                                <Button
                                                    key={i}
                                                    variant="outline"
                                                    className="text-sm justify-start px-3 py-2 h-auto text-left border-gray-200 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-all"
                                                    onClick={() => {
                                                        setInput(suggestion);
                                                        if (inputRef.current) {
                                                            inputRef.current.focus();
                                                        }
                                                    }}
                                                >
                                                    {suggestion}
                                                </Button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {messages.map((message, index) => (
                                    <motion.div
                                        key={index}
                                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} group`}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        variants={chatBubbleVariants}
                                        layout
                                    >
                                        <div
                                            className="flex flex-col"
                                            onMouseEnter={() => setSelectedMessage(index)}
                                            onMouseLeave={() => setSelectedMessage(null)}
                                        >
                                            {/* Message Container */}
                                            <div
                                                className={`
                                                    relative rounded-2xl shadow-sm 
                                                    ${message.role === 'user'
                                                        ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white pb-2 mr-2 max-w-[90%]'
                                                        : 'bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-lg text-gray-800 dark:text-gray-200 ml-2 max-w-[85%] pb-2'
                                                    }
                                                `}
                                            >
                                                {/* Message Actions (appear on hover) */}
                                                {selectedMessage === index && (
                                                    <motion.div
                                                        className="absolute -top-8 right-0 bg-white dark:bg-slate-800 rounded-full shadow-md border border-gray-100 dark:border-slate-700 flex p-1 items-center space-x-1"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: 10 }}
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => copyToClipboard(message.content)}
                                                            className="h-6 w-6 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-700"
                                                        >
                                                            <Copy className="h-3 w-3" />
                                                            {showTooltip && (
                                                                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded">
                                                                    Copied!
                                                                </span>
                                                            )}
                                                        </Button>
                                                    </motion.div>
                                                )}

                                                {/* Message Content */}
                                                <div className={`
                                                    p-4 
                                                    ${message.role === 'user'
                                                        ? 'bg-white/10 rounded-2xl'
                                                        : 'bg-gradient-to-b from-gray-50/50 to-transparent dark:from-slate-800/30 dark:to-transparent rounded-2xl'
                                                    }
                                                `}>
                                                    {message.role === 'user' ? (
                                                        <div className="whitespace-pre-wrap font-medium">
                                                            {message.content}
                                                        </div>
                                                    ) : (
                                                        <ReactMarkdown
                                                            className="prose prose-sm max-w-none dark:prose-invert
                                                                prose-headings:font-bold prose-headings:text-gray-800 dark:prose-headings:text-gray-200
                                                                prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                                                                prose-li:text-gray-600 dark:prose-li:text-gray-300
                                                                prose-strong:text-gray-800 dark:prose-strong:text-gray-200 prose-strong:font-semibold
                                                                prose-code:text-indigo-600 dark:prose-code:text-indigo-400 prose-code:bg-indigo-50 dark:prose-code:bg-indigo-900/30 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                                                                prose-pre:bg-gray-50 dark:prose-pre:bg-slate-800 prose-pre:border prose-pre:border-gray-100 dark:prose-pre:border-slate-700
                                                                prose-ul:my-2 prose-ol:my-2 prose-li:my-1
                                                                prose-h1:text-xl prose-h2:text-lg prose-h3:text-base
                                                                prose-h1:mt-3 prose-h1:mb-4
                                                                prose-h2:mt-3 prose-h2:mb-3
                                                                prose-h3:mt-2 prose-h3:mb-2"
                                                            components={{
                                                                h1: ({ children }) => (
                                                                    <h1 className="flex items-center gap-2 text-xl font-bold text-gray-800 dark:text-gray-100 border-b border-gray-100 dark:border-gray-700 pb-2">
                                                                        {children}
                                                                    </h1>
                                                                ),
                                                                h2: ({ children }) => (
                                                                    <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-gray-100">
                                                                        {children}
                                                                    </h2>
                                                                ),
                                                                ul: ({ children }) => (
                                                                    <ul className="space-y-1 list-disc marker:text-indigo-500 pl-5">
                                                                        {children}
                                                                    </ul>
                                                                ),
                                                                ol: ({ children }) => (
                                                                    <ol className="space-y-1 list-decimal marker:text-indigo-500 marker:font-medium pl-5">
                                                                        {children}
                                                                    </ol>
                                                                ),
                                                                li: ({ children }) => (
                                                                    <li className="pl-2">
                                                                        {children}
                                                                    </li>
                                                                ),
                                                                code: ({ children }) => (
                                                                    <code className="font-mono text-sm bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded">
                                                                        {children}
                                                                    </code>
                                                                ),
                                                                pre: ({ children }) => (
                                                                    <pre className="bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-3 rounded-lg my-3 overflow-x-auto">
                                                                        {children}
                                                                    </pre>
                                                                ),
                                                            }}
                                                        >
                                                            {formatAIResponse(message.content)}
                                                        </ReactMarkdown>
                                                    )}
                                                </div>

                                                {/* Time indicator with visual improvements */}
                                                <div className={`
                                                    text-xs ${message.role === 'user' ? 'text-gray-200' : 'text-gray-400 dark:text-gray-500'} mt-1 px-3 flex items-center
                                                    ${message.role === 'user' ? 'justify-end' : 'justify-start'}
                                                `}>
                                                    {message.timestamp || getCurrentTime()}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Typing indicator */}
                                <AnimatePresence>
                                    {isTyping && (
                                        <motion.div
                                            className="flex justify-start"
                                            variants={typingIndicatorVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                        >
                                            <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-3 rounded-2xl shadow-md">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-0" />
                                                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-150" style={{ animationDelay: '0.15s' }} />
                                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300" style={{ animationDelay: '0.3s' }} />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Loading indicator with improved styling */}
                                <AnimatePresence>
                                    {isLoading && !isTyping && (
                                        <motion.div
                                            className="flex justify-start"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                        >
                                            <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-3 rounded-2xl shadow-md flex items-center gap-2">
                                                <RefreshCw className="h-4 w-4 text-indigo-500 animate-spin" />
                                                <span className="text-sm text-gray-600 dark:text-gray-300">Processing your request...</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Error message with improved styling */}
                                <AnimatePresence>
                                    {error && (
                                        <motion.div
                                            className="flex justify-start"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                        >
                                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 p-4 rounded-2xl shadow-md max-w-[85%]">
                                                <div className="flex items-start gap-3">
                                                    <div className="text-red-500 dark:text-red-400 mt-0.5">
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-red-800 dark:text-red-300 font-medium mb-1">Error</h3>
                                                        <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => setError(null)}
                                                            className="mt-2 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 h-auto"
                                                        >
                                                            Dismiss
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <div ref={messagesEndRef} />
                            </div>
                        )}

                        {/* Input area with enhanced styling */}
                        {viewMode !== 'minimized' && (
                            <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                                <div className="relative group">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                                        placeholder="Ask about the EEP program..."
                                        className="w-full px-4 pr-12 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                                    />
                                    <Button
                                        onClick={handleSendMessage}
                                        disabled={isLoading || !input.trim()}
                                        className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 text-white rounded-lg p-2 transition-all"
                                    >
                                        <Send className="h-5 w-5" />
                                    </Button>
                                </div>

                                {/* Input features hint */}
                                <div className="mt-2 px-1 flex justify-between">
                                    <p className="text-xs text-gray-400">Press Enter to send</p>
                                    <p className="text-xs text-gray-400">
                                        <span className="inline-flex items-center">
                                            <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 rounded px-1 py-0.5 text-[10px] mr-1">Shift+Enter</span>
                                            for new line
                                        </span>
                                    </p>
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
