import React, { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { Terminal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Define types for props and state
interface PowerShellTerminalProps {
    selectedCloud: string;
    selectedService: string;
}

interface HistoryEntry {
    type: 'system' | 'command' | 'response';
    content: string;
}

export const PowerShellTerminal: React.FC<PowerShellTerminalProps> = ({
    selectedCloud,
    selectedService
}) => {
    const [command, setCommand] = useState<string>('');
    const [history, setHistory] = useState<HistoryEntry[]>([
        {
            type: 'system',
            content: `EEP PowerShell Terminal - ${selectedCloud} Environment\nType 'help' for available commands.`
        }
    ]);

    // Refs with proper typing
    const terminalRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Mock commands execution
    const executeCommand = (cmd: string): void => {
        // Add command to history
        setHistory(prev => [...prev, { type: 'command', content: cmd }]);

        // Process command
        let response: string;
        const cmdLower = cmd.toLowerCase().trim();

        if (cmdLower === 'help') {
            response = `
Available commands:
  - help: Display this help message
  - clear: Clear terminal history
  - list-services: List available services in ${selectedCloud}
  - create-service [name]: Create a new service
  - deploy: Deploy the current configuration
  - connect-db: Connect to database service
  - status: Show current service status
      `;
        } else if (cmdLower === 'clear') {
            setHistory([{
                type: 'system',
                content: `EEP PowerShell Terminal - ${selectedCloud} Environment\nType 'help' for available commands.`
            }]);
            return;
        } else if (cmdLower === 'list-services') {
            response = `
Available ${selectedCloud} services:
${selectedCloud === 'AWS' ? `
  - Lambda
  - S3
  - DynamoDB
  - RDS
  - API Gateway
  - Cognito` : selectedCloud === 'Azure' ? `
  - Functions
  - Blob Storage
  - Cosmos DB
  - SQL Database
  - API Management
  - Active Directory B2C` : `
  - Cloud Functions
  - Cloud Storage
  - Firestore
  - Cloud SQL
  - API Gateway
  - Identity Platform`}
      `;
        } else if (cmdLower.startsWith('create-service')) {
            const serviceName = cmd.split(' ')[1];
            if (serviceName) {
                response = `Creating new service: ${serviceName}...\nService created successfully. You can now configure it using the dashboard.`;
            } else {
                response = "Error: Please provide a service name (e.g., create-service myService)";
            }
        } else if (cmdLower === 'deploy') {
            response = "Deploying current configuration...\nDeployment successful! Your service is now available at: https://eep-service.example.com";
        } else if (cmdLower === 'connect-db') {
            response = "Connecting to database service...\nConnection established. You can now query your database.";
        } else if (cmdLower === 'status') {
            response = `
Current status:
  - Cloud provider: ${selectedCloud}
  - Service category: ${selectedService}
  - Resources: 2 instances running
  - Health: Healthy
  - Last deployment: Today, 10:15 AM
      `;
        } else {
            response = `Command not recognized: ${cmd}\nType 'help' for available commands.`;
        }

        // Add response to history
        setHistory(prev => [...prev, { type: 'response', content: response }]);

        // Clear command
        setCommand('');
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (command.trim()) {
                executeCommand(command);
            }
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setCommand(e.target.value);
    };

    // Auto-scroll to bottom when history changes
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    // Focus input when terminal is clicked
    const focusInput = (): void => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <Card className="bg-gray-900 text-gray-100 shadow-xl mb-8">
            <CardHeader className="border-b border-gray-800 bg-gray-800 flex flex-row items-center justify-between p-4">
                <CardTitle className="text-md font-mono flex items-center">
                    <Terminal className="w-5 h-5 mr-2 text-green-400" />
                    PowerShell Terminal
                </CardTitle>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white hover:bg-gray-700"
                    onClick={() => setHistory([{
                        type: 'system',
                        content: `EEP PowerShell Terminal - ${selectedCloud} Environment\nType 'help' for available commands.`
                    }])}
                >
                    Clear
                </Button>
            </CardHeader>
            <CardContent className="p-0">
                <div
                    className="h-64 overflow-auto p-4 font-mono text-sm"
                    ref={terminalRef}
                    onClick={focusInput}
                >
                    {history.map((entry, index) => (
                        <div key={index} className="mb-2">
                            {entry.type === 'command' ? (
                                <div>
                                    <span className="text-green-400">{`PS ${selectedCloud}> `}</span>
                                    <span>{entry.content}</span>
                                </div>
                            ) : (
                                <pre className={`whitespace-pre-wrap ${entry.type === 'system' ? 'text-blue-400' : 'text-gray-300'}`}>
                                    {entry.content}
                                </pre>
                            )}
                        </div>
                    ))}
                    <div className="flex items-center">
                        <span className="text-green-400">{`PS ${selectedCloud}> `}</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={command}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            className="flex-1 bg-transparent outline-none border-none text-gray-100 font-mono"
                            aria-label="Command input"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PowerShellTerminal;