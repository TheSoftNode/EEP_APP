"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Save,
    Play,
    Code2,
    Terminal,
    FolderTree,
    Settings,
    RefreshCw,
    ChevronRight,
    File,
    Folder,
    Upload,
    Plus,
    Layers,
    Server,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

interface FileNode {
    name: string;
    type: 'file' | 'folder';
    children?: FileNode[];
}

interface ApiEndpoint {
    id: string;
    name: string;
    url: string;
    method: string;
    status: 'active' | 'testing' | 'deprecated';
    lastTested: string;
}

interface ProjectProgress {
    phase: string;
    progress: number;
    status: 'completed' | 'in-progress' | 'pending';
}

const EnhancedDevDashboard: React.FC = () => {
    const [selectedCloud, setSelectedCloud] = useState('aws');
    const [activeTab, setActiveTab] = useState('editor');
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [terminalConnected, setTerminalConnected] = useState(false);
    const [showApiDialog, setShowApiDialog] = useState(false);
    const [deploymentProgress, setDeploymentProgress] = useState(0);
    const [isDeploying, setIsDeploying] = useState(false);
    const [terminalOutput, setTerminalOutput] = useState<string[]>([
        "$ echo \"Welcome to EEP Cloud Terminal\"",
        "Welcome to EEP Cloud Terminal",
        "$ _"
    ]);

    // Sample file structure
    const fileStructure: FileNode[] = [
        {
            name: 'src',
            type: 'folder',
            children: [
                { name: 'index.js', type: 'file' },
                { name: 'styles.css', type: 'file' },
                {
                    name: 'components',
                    type: 'folder',
                    children: [
                        { name: 'App.js', type: 'file' },
                        { name: 'Header.js', type: 'file' }
                    ]
                }
            ]
        },
        {
            name: 'public',
            type: 'folder',
            children: [
                { name: 'index.html', type: 'file' },
                { name: 'favicon.ico', type: 'file' }
            ]
        }
    ];

    // Sample project progress data
    const projectProgress: ProjectProgress[] = [
        { phase: 'Planning', progress: 100, status: 'completed' },
        { phase: 'Design', progress: 100, status: 'completed' },
        { phase: 'Development', progress: 65, status: 'in-progress' },
        { phase: 'Testing', progress: 10, status: 'in-progress' },
        { phase: 'Deployment', progress: 0, status: 'pending' }
    ];

    // Sample API endpoints
    const apiEndpoints: ApiEndpoint[] = [
        {
            id: 'api-1',
            name: 'User Authentication',
            url: '/api/v1/auth',
            method: 'POST',
            status: 'active',
            lastTested: '2025-03-05'
        },
        {
            id: 'api-2',
            name: 'Get User Profile',
            url: '/api/v1/users/profile',
            method: 'GET',
            status: 'active',
            lastTested: '2025-03-05'
        },
        {
            id: 'api-3',
            name: 'Update User Settings',
            url: '/api/v1/users/settings',
            method: 'PUT',
            status: 'testing',
            lastTested: '2025-03-04'
        }
    ];

    // Render file tree
    const renderFileTree = (nodes: FileNode[], level = 0) => {
        return nodes.map((node, index) => (
            <div key={node.name} style={{ paddingLeft: `${level * 16}px` }}>
                <button
                    className={`flex items-center space-x-2 w-full p-2 hover:bg-gray-100 rounded text-left ${selectedFile === node.name ? 'bg-blue-50' : ''
                        }`}
                    onClick={() => setSelectedFile(node.name)}
                >
                    {node.type === 'folder' ? (
                        <>
                            <Folder className="w-4 h-4 text-blue-500" />
                            <ChevronRight className="w-4 h-4" />
                        </>
                    ) : (
                        <File className="w-4 h-4 text-gray-500" />
                    )}
                    <span className="text-sm">{node.name}</span>
                </button>
                {node.children && renderFileTree(node.children, level + 1)}
            </div>
        ));
    };

    // Connect to local terminal
    const connectToLocalTerminal = () => {
        setTerminalOutput(prev => [...prev, "$ Connecting to local terminal..."]);
        // Simulate connection
        setTimeout(() => {
            setTerminalConnected(true);
            setTerminalOutput(prev => [...prev, "Connected to local terminal successfully", "$ _"]);
        }, 1500);
    };

    // Handle deployment to AWS
    const deployToCloud = () => {
        if (!terminalConnected) {
            alert("Please connect to local terminal first");
            return;
        }

        setIsDeploying(true);
        setDeploymentProgress(0);
        setTerminalOutput(prev => [...prev, "$ Starting deployment to AWS..."]);

        // Simulate deployment steps
        const interval = setInterval(() => {
            setDeploymentProgress(prev => {
                const newProgress = prev + 10;

                if (newProgress === 10) {
                    setTerminalOutput(prev => [...prev, "Building project..."]);
                } else if (newProgress === 30) {
                    setTerminalOutput(prev => [...prev, "Packaging artifacts..."]);
                } else if (newProgress === 50) {
                    setTerminalOutput(prev => [...prev, "Uploading to S3..."]);
                } else if (newProgress === 70) {
                    setTerminalOutput(prev => [...prev, "Configuring CloudFront..."]);
                } else if (newProgress === 90) {
                    setTerminalOutput(prev => [...prev, "Running final checks..."]);
                } else if (newProgress >= 100) {
                    clearInterval(interval);
                    setTerminalOutput(prev => [
                        ...prev,
                        "Deployment completed successfully!",
                        "Application URL: https://app-xyz.eep-cloud.com",
                        "$ _"
                    ]);
                    setIsDeploying(false);
                }

                return newProgress > 100 ? 100 : newProgress;
            });
        }, 800);
    };

    // Add API endpoint
    const addApiEndpoint = (event: React.FormEvent) => {
        event.preventDefault();
        // In a real application, you would add the API endpoint to your database
        setShowApiDialog(false);
        // Show confirmation message in terminal
        setTerminalOutput(prev => [...prev, "$ New API endpoint registered successfully", "$ _"]);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Toolbar */}
            <div className="border-b bg-white sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Select value={selectedCloud} onValueChange={setSelectedCloud}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Select Cloud" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="aws">AWS Cloud</SelectItem>
                                    <SelectItem value="azure">Azure Cloud</SelectItem>
                                    <SelectItem value="gcp">Google Cloud</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center space-x-2"
                            >
                                <Save className="w-4 h-4" />
                                <span>Save</span>
                            </Button>
                            <Button
                                size="sm"
                                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
                                onClick={deployToCloud}
                                disabled={isDeploying || !terminalConnected}
                            >
                                <Play className="w-4 h-4" />
                                <span>{isDeploying ? "Deploying..." : "Deploy"}</span>
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center space-x-2"
                                onClick={() => setShowApiDialog(true)}
                            >
                                <Server className="w-4 h-4" />
                                <span>API</span>
                            </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className={`inline-block w-3 h-3 rounded-full mr-2 ${terminalConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            <span className="text-sm mr-2">{terminalConnected ? 'Terminal Connected' : 'Terminal Disconnected'}</span>
                            <Button variant="ghost" size="sm">
                                <Settings className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-12 gap-6">
                    {/* Left Sidebar */}
                    <div className="col-span-3">
                        <Tabs defaultValue="files" className="w-full">
                            <TabsList className="w-full grid grid-cols-3">
                                <TabsTrigger value="files">
                                    <FolderTree className="w-4 h-4 mr-2" />
                                    Files
                                </TabsTrigger>
                                <TabsTrigger value="apis">
                                    <Server className="w-4 h-4 mr-2" />
                                    APIs
                                </TabsTrigger>
                                <TabsTrigger value="progress">
                                    <Layers className="w-4 h-4 mr-2" />
                                    Progress
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="files">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center justify-between">
                                            <span>Project Files</span>
                                            <div>
                                                <Button variant="ghost" size="sm" className="mr-1">
                                                    <Upload className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm">
                                                    <RefreshCw className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-1">
                                            {renderFileTree(fileStructure)}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="apis">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center justify-between">
                                            <span>API Endpoints</span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setShowApiDialog(true)}
                                            >
                                                <Plus className="w-4 h-4" />
                                            </Button>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            {apiEndpoints.map(api => (
                                                <div key={api.id} className="p-2 border rounded-md">
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-medium">{api.name}</span>
                                                        <span className={`text-xs px-2 py-1 rounded-full ${api.status === 'active' ? 'bg-green-100 text-green-800' :
                                                            api.status === 'testing' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-gray-100 text-gray-800'
                                                            }`}>
                                                            {api.status}
                                                        </span>
                                                    </div>
                                                    <div className="flex mt-1 text-sm">
                                                        <span className="mr-2 px-1.5 bg-gray-100 rounded text-gray-700">{api.method}</span>
                                                        <span className="text-blue-600 font-mono">{api.url}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="progress">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Project Progress</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {projectProgress.map((phase, index) => (
                                                <div key={index}>
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-sm font-medium">{phase.phase}</span>
                                                        <span className="text-xs">{phase.progress}%</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Progress value={phase.progress} className="h-2 flex-grow" />
                                                        <span className="ml-2">
                                                            {phase.status === 'completed' ? (
                                                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                            ) : phase.status === 'in-progress' ? (
                                                                <RefreshCw className="h-4 w-4 text-blue-500" />
                                                            ) : (
                                                                <AlertCircle className="h-4 w-4 text-gray-300" />
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Main Editor/Terminal Area */}
                    <div className="col-span-9">
                        <Card className="h-full">
                            <CardHeader className="border-b p-4">
                                <Tabs defaultValue="editor" className="w-full">
                                    <TabsList>
                                        <TabsTrigger value="editor" onClick={() => setActiveTab('editor')}>
                                            <Code2 className="w-4 h-4 mr-2" />
                                            Editor
                                        </TabsTrigger>
                                        <TabsTrigger value="terminal" onClick={() => setActiveTab('terminal')}>
                                            <Terminal className="w-4 h-4 mr-2" />
                                            Terminal
                                        </TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </CardHeader>
                            <CardContent className="p-0 h-[600px]">
                                {activeTab === 'editor' ? (
                                    <div className="w-full h-full bg-[#1e1e1e] text-white p-4">
                                        <pre className="font-mono">
                                            {`// Your code will appear here
function helloWorld() {
  console.log("Hello from EEP Cloud!");
}
`}
                                        </pre>
                                    </div>
                                ) : (
                                    <div className="w-full h-full bg-black text-green-400 p-4 font-mono overflow-auto">
                                        {terminalConnected ? (
                                            <>
                                                {terminalOutput.map((line, index) => (
                                                    <div key={index}>{line}</div>
                                                ))}

                                                {isDeploying && (
                                                    <div className="mt-2">
                                                        <div className="text-xs mb-1">Deployment Progress:</div>
                                                        <div className="w-full bg-gray-800 rounded-full h-2.5">
                                                            <div
                                                                className="bg-green-600 h-2.5 rounded-full"
                                                                style={{ width: `${deploymentProgress}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <div>$ echo "Welcome to EEP Cloud Terminal"</div>
                                                <div>Welcome to EEP Cloud Terminal</div>
                                                <div className="mt-4 mb-2">
                                                    Terminal is not connected to your local environment.
                                                </div>
                                                <Button
                                                    className="bg-green-600 hover:bg-green-700"
                                                    onClick={connectToLocalTerminal}
                                                >
                                                    Connect to Local Terminal
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* API Endpoint Dialog */}
            <Dialog open={showApiDialog} onOpenChange={setShowApiDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add API Endpoint</DialogTitle>
                        <DialogDescription>
                            Register a new API endpoint for your project
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={addApiEndpoint}>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="api-name">Endpoint Name</Label>
                                <Input id="api-name" placeholder="e.g., User Authentication" required />
                            </div>

                            <div className="grid grid-cols-4 gap-4">
                                <div className="space-y-2 col-span-1">
                                    <Label htmlFor="api-method">Method</Label>
                                    <Select defaultValue="GET">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="GET">GET</SelectItem>
                                            <SelectItem value="POST">POST</SelectItem>
                                            <SelectItem value="PUT">PUT</SelectItem>
                                            <SelectItem value="DELETE">DELETE</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2 col-span-3">
                                    <Label htmlFor="api-url">Endpoint URL</Label>
                                    <Input id="api-url" placeholder="/api/v1/resource" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="api-description">Description</Label>
                                <Textarea
                                    id="api-description"
                                    placeholder="Describe what this API endpoint does..."
                                    className="h-20"
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setShowApiDialog(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">Add Endpoint</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EnhancedDevDashboard;