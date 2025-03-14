"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Save,
    Play,
    Code2,
    Terminal,
    FolderTree,
    Cloud,
    Settings,
    RefreshCw,
    ChevronRight,
    ChevronDown,
    File,
    Folder
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
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

interface FileNode {
    name: string;
    type: 'file' | 'folder';
    children?: FileNode[];
}

const CloudDevDashboard = () => {
    const [selectedCloud, setSelectedCloud] = useState('aws');
    const [activeTab, setActiveTab] = useState('editor');
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

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
                            >
                                <Play className="w-4 h-4" />
                                <span>Run</span>
                            </Button>
                        </div>
                        <div className="flex items-center space-x-2">
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
                    {/* File Explorer */}
                    <div className="col-span-3">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center justify-between">
                                    <span>Files</span>
                                    <Button variant="ghost" size="sm">
                                        <RefreshCw className="w-4 h-4" />
                                    </Button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-1">
                                    {renderFileTree(fileStructure)}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Editor/Terminal Area */}
                    <div className="col-span-9">
                        <Card className="h-full">
                            <CardHeader className="border-b">
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
                                    <div className="w-full h-full bg-black text-green-400 p-4 font-mono">
                                        <div>$ echo "Welcome to EEP Cloud Terminal"</div>
                                        <div>Welcome to EEP Cloud Terminal</div>
                                        <div>$ _</div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CloudDevDashboard;