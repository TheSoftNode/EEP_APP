"use client"

import { useState } from 'react';
import Head from 'next/head';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectProgress } from '@/components/EEP_V2/Dashboard/ProjectProgress';
import { TerminalPanel } from '@/components/EEP_V2/Dashboard/TerminalPanel';
import { ApiEndpointManager } from '@/components/EEP_V2/Dashboard/ApiEndpointManager';
import { DeploymentPanel } from '@/components/EEP_V2/Dashboard/DeploymentPanel';
import { useRouter } from 'next/navigation';


// Icons
const CodeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
);

const ServerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
        <line x1="6" y1="6" x2="6.01" y2="6"></line>
        <line x1="6" y1="18" x2="6.01" y2="18"></line>
    </svg>
);

const BellIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const ChartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"></line>
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
);

const ApiIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
);

const TerminalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
);

const Dashboard = () => {
    const router = useRouter();
    const [activeSidebar, setActiveSidebar] = useState('overview');

    const handleLogout = () => {
        // Handle logout logic here
        router.push('/login');
    };

    return (
        <>
            <Head>
                <title>EEP Dashboard</title>
                <meta name="description" content="Enterprise Empowerment Platform Dashboard" />
            </Head>

            <div className="min-h-screen bg-gray-50">
                {/* Navigation Bar */}
                <header className="bg-white border-b border-gray-200">
                    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <CodeIcon />
                            <span className="font-bold text-xl">EEP</span>
                        </div>

                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="icon">
                                <BellIcon />
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                                            <UserIcon />
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Settings</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>

                <div className="container mx-auto px-4 py-6 flex">
                    {/* Sidebar */}
                    <aside className="w-64 mr-8">
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="p-4 border-b border-gray-200">
                                <h2 className="text-xl font-bold">Web App Project</h2>
                                <p className="text-sm text-gray-500">Enterprise Client</p>
                            </div>

                            <nav className="p-2">
                                <ul className="space-y-1">
                                    <li>
                                        <Button
                                            variant={activeSidebar === 'overview' ? 'default' : 'ghost'}
                                            className="w-full justify-start"
                                            onClick={() => setActiveSidebar('overview')}
                                        >
                                            <ChartIcon />
                                            Overview
                                        </Button>
                                    </li>
                                    <li>
                                        <Button
                                            variant={activeSidebar === 'terminal' ? 'default' : 'ghost'}
                                            className="w-full justify-start"
                                            onClick={() => setActiveSidebar('terminal')}
                                        >
                                            <TerminalIcon />
                                            Terminal
                                        </Button>
                                    </li>
                                    <li>
                                        <Button
                                            variant={activeSidebar === 'api' ? 'default' : 'ghost'}
                                            className="w-full justify-start"
                                            onClick={() => setActiveSidebar('api')}
                                        >
                                            <ApiIcon />
                                            API Endpoints
                                        </Button>
                                    </li>
                                    <li>
                                        <Button
                                            variant={activeSidebar === 'deployment' ? 'default' : 'ghost'}
                                            className="w-full justify-start"
                                            onClick={() => setActiveSidebar('deployment')}
                                        >
                                            <ServerIcon />
                                            Deployment
                                        </Button>
                                    </li>
                                </ul>
                            </nav>

                            <div className="p-4 bg-indigo-50 border-t border-indigo-100">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center">
                                        <UserIcon />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Mentor: John Doe</p>
                                        <Button variant="link" className="h-auto p-0 text-xs text-indigo-600">
                                            Request Help
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        {activeSidebar === 'overview' && (
                            <div className="space-y-6">
                                <div className="bg-white p-6 rounded-lg shadow">
                                    <h1 className="text-2xl font-bold mb-4">Project Overview</h1>
                                    <p className="text-gray-500">
                                        Welcome to your project dashboard. Track your progress, manage API endpoints,
                                        and use the integrated terminal to develop your application.
                                    </p>
                                </div>

                                <ProjectProgress />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white p-6 rounded-lg shadow">
                                        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                                        <ul className="space-y-3">
                                            <li className="border-b pb-2">
                                                <p className="text-sm font-medium">Terminal command executed</p>
                                                <p className="text-xs text-gray-500">10 minutes ago</p>
                                            </li>
                                            <li className="border-b pb-2">
                                                <p className="text-sm font-medium">API endpoint added</p>
                                                <p className="text-xs text-gray-500">2 hours ago</p>
                                            </li>
                                            <li>
                                                <p className="text-sm font-medium">Milestone completed</p>
                                                <p className="text-xs text-gray-500">Yesterday</p>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="bg-white p-6 rounded-lg shadow">
                                        <h2 className="text-xl font-bold mb-4">AI Assistant</h2>
                                        <div className="bg-gray-50 p-4 rounded border">
                                            <p className="text-sm">
                                                Based on your project progress, consider implementing user authentication next.
                                                I can help you set up JWT authentication with refresh tokens.
                                            </p>
                                        </div>
                                        <div className="mt-4">
                                            <Button>Get Guidance</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSidebar === 'terminal' && (
                            <div className="space-y-6">
                                <div className="bg-white p-6 rounded-lg shadow">
                                    <h1 className="text-2xl font-bold mb-4">Development Terminal</h1>
                                    <p className="text-gray-500">
                                        Execute commands in your local environment and receive AI-powered assistance.
                                    </p>
                                </div>

                                <TerminalPanel />
                            </div>
                        )}

                        {activeSidebar === 'api' && (
                            <div className="space-y-6">
                                <div className="bg-white p-6 rounded-lg shadow">
                                    <h1 className="text-2xl font-bold mb-4">API Endpoints</h1>
                                    <p className="text-gray-500">
                                        Manage your API endpoints and track their status throughout the development lifecycle.
                                    </p>
                                </div>

                                <ApiEndpointManager />
                            </div>
                        )}

                        {activeSidebar === 'deployment' && (
                            <div className="space-y-6">
                                <div className="bg-white p-6 rounded-lg shadow">
                                    <h1 className="text-2xl font-bold mb-4">Deployment</h1>
                                    <p className="text-gray-500">
                                        Upload your code package and deploy your application to our AWS infrastructure.
                                    </p>
                                </div>

                                <DeploymentPanel />
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </>
    );
};

export default Dashboard;