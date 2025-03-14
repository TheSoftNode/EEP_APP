"use client";

import React, { useState } from 'react';
import {
    BarChart,
    FileText,
    Users,
    Clock,
    MessageSquare,
    AlertCircle,
    CheckCircle,
    Calendar,
    ArrowUpRight,
    GitCommit,
    GitPullRequest,
    MoreHorizontal,
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Project {
    id: string;
    name: string;
    status: string;
    progress: number;
    startDate: string;
    targetDate: string;
    developers: number;
    activeTasks: number;
    completedTasks: number;
    lastUpdate: string;
}

interface Developer {
    id: string;
    name: string;
    role: string;
    avatar: string;
    initials: string;
    activeTasks: number;
    completedTasks: number;
    onTrack: boolean;
}

interface Activity {
    id: string;
    type: string;
    user: string;
    message: string;
    timestamp: string;
}

interface Phase {
    name: string;
    progress: number;
    status: string;
}

interface Metric {
    name: string;
    value: string | number;
    change: number;
    color: string;
}

// Sample project data
const projects: Project[] = [
    {
        id: "proj-001",
        name: "E-Commerce Platform",
        status: "in-progress",
        progress: 65,
        startDate: "Feb 15, 2025",
        targetDate: "Apr 30, 2025",
        developers: 3,
        activeTasks: 8,
        completedTasks: 24,
        lastUpdate: "2 hours ago"
    }
];

// Sample developer data
const developers: Developer[] = [
    {
        id: "dev-001",
        name: "Alex Johnson",
        role: "Frontend Developer",
        avatar: "/avatars/alex.jpg",
        initials: "AJ",
        activeTasks: 3,
        completedTasks: 12,
        onTrack: true
    },
    {
        id: "dev-002",
        name: "Maya Patel",
        role: "Backend Developer",
        avatar: "/avatars/maya.jpg",
        initials: "MP",
        activeTasks: 4,
        completedTasks: 10,
        onTrack: true
    },
    {
        id: "dev-003",
        name: "Carlos Rodriguez",
        role: "Cloud Engineer",
        avatar: "/avatars/carlos.jpg",
        initials: "CR",
        activeTasks: 1,
        completedTasks: 2,
        onTrack: false
    }
];

// Sample recent activities
const activities: Activity[] = [
    {
        id: "act-001",
        type: "commit",
        user: "Maya Patel",
        message: "Added user authentication API endpoints",
        timestamp: "Today, 2:45 PM"
    },
    {
        id: "act-002",
        type: "pr",
        user: "Alex Johnson",
        message: "Merged PR: Implement shopping cart UI",
        timestamp: "Today, 11:20 AM"
    },
    {
        id: "act-003",
        type: "task",
        user: "Carlos Rodriguez",
        message: "Completed task: Set up AWS S3 bucket for image storage",
        timestamp: "Yesterday, 4:30 PM"
    },
    {
        id: "act-004",
        type: "comment",
        user: "Maya Patel",
        message: "Commented on Task #42: Need clarification on payment gateway",
        timestamp: "Yesterday, 2:15 PM"
    }
];

// Development phases
const phases: Phase[] = [
    { name: "Planning", progress: 100, status: "completed" },
    { name: "Design", progress: 100, status: "completed" },
    { name: "Development", progress: 65, status: "in-progress" },
    { name: "Testing", progress: 15, status: "in-progress" },
    { name: "Deployment", progress: 0, status: "pending" }
];

// Sample metrics
const metrics: Metric[] = [
    { name: "Bugs Reported", value: 12, change: -2, color: "bg-red-500" },
    { name: "Code Coverage", value: "78%", change: 5, color: "bg-green-500" },
    { name: "API Endpoints", value: 32, change: 3, color: "bg-blue-500" },
    { name: "Build Time", value: "4.2m", change: -0.8, color: "bg-yellow-500" }
];

const ProjectOwnerDashboard: React.FC = () => {
    const [activeProject] = useState<Project>(projects[0]);

    const getStatusColor = (status: string): string => {
        switch (status) {
            case "completed": return "text-green-500";
            case "in-progress": return "text-blue-500";
            case "pending": return "text-gray-500";
            case "delayed": return "text-red-500";
            default: return "text-gray-500";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed": return <CheckCircle className="h-5 w-5 text-green-500" />;
            case "in-progress": return <Clock className="h-5 w-5 text-blue-500" />;
            case "pending": return <Clock className="h-5 w-5 text-gray-500" />;
            case "delayed": return <AlertCircle className="h-5 w-5 text-red-500" />;
            default: return <Clock className="h-5 w-5 text-gray-500" />;
        }
    };

    const getActivityIcon = (type: string) => {
        switch (type) {
            case "commit": return <GitCommit className="h-4 w-4 text-purple-500" />;
            case "pr": return <GitPullRequest className="h-4 w-4 text-blue-500" />;
            case "task": return <CheckCircle className="h-4 w-4 text-green-500" />;
            case "comment": return <MessageSquare className="h-4 w-4 text-yellow-500" />;
            default: return <FileText className="h-4 w-4 text-gray-500" />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="border-b bg-white sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-semibold">{activeProject.name} - Project Dashboard</h1>

                        <div className="flex items-center space-x-3">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${activeProject.status === 'completed' ? 'bg-green-100 text-green-800' :
                                    activeProject.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                        activeProject.status === 'delayed' ? 'bg-red-100 text-red-800' :
                                            'bg-gray-100 text-gray-800'
                                }`}>
                                {activeProject.status === 'in-progress' ? 'In Progress' :
                                    activeProject.status === 'completed' ? 'Completed' :
                                        activeProject.status === 'delayed' ? 'Delayed' : 'Pending'}
                            </span>

                            <Button variant="outline" size="sm">
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Messages
                            </Button>

                            <Button>
                                <FileText className="w-4 h-4 mr-2" />
                                Generate Report
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Project Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Overall Progress</p>
                                    <p className="text-2xl font-bold mt-1">{activeProject.progress}%</p>
                                </div>
                                <div className="p-2 bg-blue-50 rounded-md">
                                    <BarChart className="h-6 w-6 text-blue-500" />
                                </div>
                            </div>
                            <Progress value={activeProject.progress} className="h-2 mt-4" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Team Members</p>
                                    <p className="text-2xl font-bold mt-1">{activeProject.developers}</p>
                                </div>
                                <div className="p-2 bg-purple-50 rounded-md">
                                    <Users className="h-6 w-6 text-purple-500" />
                                </div>
                            </div>
                            <div className="flex mt-4 items-center">
                                <div className="flex -space-x-2">
                                    {developers.map((dev) => (
                                        <Avatar key={dev.id} className="border-2 border-white h-8 w-8">
                                            <AvatarFallback>{dev.initials}</AvatarFallback>
                                        </Avatar>
                                    ))}
                                </div>
                                <Button variant="ghost" size="sm" className="ml-2 text-xs">
                                    View All
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Tasks</p>
                                    <p className="text-2xl font-bold mt-1">{activeProject.activeTasks}</p>
                                </div>
                                <div className="p-2 bg-green-50 rounded-md">
                                    <CheckCircle className="h-6 w-6 text-green-500" />
                                </div>
                            </div>
                            <div className="mt-4 text-sm text-gray-500 flex items-center justify-between">
                                <span>Completed: {activeProject.completedTasks}</span>
                                <span>Active: {activeProject.activeTasks}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Timeline</p>
                                    <p className="text-sm font-bold mt-1">{activeProject.startDate} - {activeProject.targetDate}</p>
                                </div>
                                <div className="p-2 bg-amber-50 rounded-md">
                                    <Calendar className="h-6 w-6 text-amber-500" />
                                </div>
                            </div>
                            <div className="mt-4 text-xs">
                                <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-1 bg-amber-500 rounded-full" style={{ width: '40%' }}></div>
                                </div>
                                <div className="flex justify-between mt-1 text-gray-500">
                                    <span>Start</span>
                                    <span>Today</span>
                                    <span>End</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Project Progress and Status */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Development Phases */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Development Progress</CardTitle>
                                <CardDescription>
                                    Current progress across all development phases
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {phases.map((phase, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between items-center mb-2">
                                                <div className="flex items-center">
                                                    {getStatusIcon(phase.status)}
                                                    <span className="ml-2 font-medium">{phase.name}</span>
                                                </div>
                                                <span className="text-sm font-medium">{phase.progress}%</span>
                                            </div>
                                            <Progress value={phase.progress} className="h-2" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Key Metrics */}
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle>Key Metrics</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    {metrics.map((metric, index) => (
                                        <div key={index} className="flex items-center p-3 border rounded-lg">
                                            <div className={`w-2 h-10 ${metric.color} rounded-full mr-3`}></div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">{metric.name}</p>
                                                <p className="text-xl font-bold">{metric.value}</p>
                                            </div>
                                            <div className="ml-auto">
                                                <span className={`flex items-center text-sm ${metric.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                    {metric.change >= 0 ? '+' : ''}{metric.change}%
                                                    <ArrowUpRight className={`h-3 w-3 ml-0.5 ${metric.change < 0 ? 'transform rotate-180' : ''}`} />
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Activity and Team */}
                    <div className="space-y-6">
                        {/* Recent Activity */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                                <CardDescription>
                                    Latest updates from the development team
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {activities.map((activity) => (
                                        <div key={activity.id} className="flex">
                                            <div className="mr-4 flex items-center">
                                                <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center">
                                                    {getActivityIcon(activity.type)}
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{activity.message}</p>
                                                <div className="flex items-center mt-1">
                                                    <p className="text-xs text-gray-500">By {activity.user}</p>
                                                    <span className="mx-1 text-gray-300">•</span>
                                                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="pt-0">
                                <Button variant="outline" className="w-full">
                                    View All Activity
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Team Members */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Team Members</CardTitle>
                                <CardDescription>
                                    Developers assigned to this project
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {developers.map((dev) => (
                                        <div key={dev.id} className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <Avatar className="h-10 w-10 mr-3">
                                                    <AvatarFallback>{dev.initials}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">{dev.name}</p>
                                                    <p className="text-xs text-gray-500">{dev.role}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${dev.onTrack ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                                                        <DropdownMenuItem>Assign Task</DropdownMenuItem>
                                                        <DropdownMenuItem>Send Message</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="pt-0">
                                <Button variant="outline" className="w-full">
                                    <Users className="w-4 h-4 mr-2" />
                                    Manage Team
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectOwnerDashboard;