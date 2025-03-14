"use client"

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import 'xterm/css/xterm.css';

export const TerminalPanel = () => {
    const terminalRef = useRef<HTMLDivElement>(null);
    const [commandInput, setCommandInput] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [aiSuggestions, setAiSuggestions] = useState<string[]>([
        'npm install dependencies',
        'git init && git add .',
        'docker-compose up -d',
    ]);

    useEffect(() => {
        if (terminalRef.current) {
            // In a real implementation, we would initialize xterm.js here
            // and establish the connection to the local terminal

            // Simulate connection
            const timer = setTimeout(() => {
                setIsConnected(true);
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, []);

    const handleCommandSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (commandInput.trim() === '') return;

        // In a real implementation, we would send this command
        // to the local terminal and process the response

        setCommandHistory(prev => [...prev, commandInput]);
        setCommandInput('');
    };

    const applySuggestion = (suggestion: string) => {
        setCommandInput(suggestion);
    };

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Terminal</CardTitle>
                <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm font-medium">
                        {isConnected ? 'Connected' : 'Connecting...'}
                    </span>
                </div>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="terminal">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="terminal">Terminal</TabsTrigger>
                        <TabsTrigger value="history">History</TabsTrigger>
                        <TabsTrigger value="ai">AI Assistance</TabsTrigger>
                    </TabsList>

                    <TabsContent value="terminal" className="space-y-4">
                        <div
                            ref={terminalRef}
                            className="w-full h-80 bg-black rounded text-green-400 p-4 font-mono text-sm overflow-auto"
                        >
                            <div className="terminal-content">
                                <p>$ Welcome to EEP Terminal</p>
                                <p>$ Connected to local environment</p>
                                {commandHistory.map((cmd, i) => (
                                    <div key={i}>
                                        <p>$ {cmd}</p>
                                        <p className="text-gray-500">Command executed successfully</p>
                                    </div>
                                ))}
                                <p>$ <span className="animate-pulse">_</span></p>
                            </div>
                        </div>

                        <form onSubmit={handleCommandSubmit} className="flex space-x-2">
                            <Input
                                value={commandInput}
                                onChange={(e) => setCommandInput(e.target.value)}
                                placeholder="Enter command..."
                                className="font-mono"
                            />
                            <Button type="submit">Run</Button>
                        </form>
                    </TabsContent>

                    <TabsContent value="history" className="h-80 overflow-auto">
                        <div className="space-y-2">
                            {commandHistory.length === 0 ? (
                                <p className="text-gray-500 italic">No command history yet</p>
                            ) : (
                                commandHistory.map((cmd, i) => (
                                    <div key={i} className="flex justify-between p-2 border-b">
                                        <span className="font-mono">{cmd}</span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setCommandInput(cmd)}
                                        >
                                            Reuse
                                        </Button>
                                    </div>
                                ))
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="ai" className="h-80">
                        <div className="space-y-4">
                            <div className="bg-blue-50 p-4 rounded border border-blue-200">
                                <h4 className="font-medium text-blue-800">AI Assistant</h4>
                                <p className="text-sm text-blue-600">
                                    Based on your project activity, here are some suggested commands
                                </p>
                            </div>

                            <div className="space-y-2">
                                {aiSuggestions.map((suggestion, i) => (
                                    <div key={i} className="flex justify-between p-2 bg-gray-50 rounded">
                                        <span className="font-mono">{suggestion}</span>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => applySuggestion(suggestion)}
                                        >
                                            Use
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};
