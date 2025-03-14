import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

type Milestone = {
    id: string;
    title: string;
    description: string;
    status: 'not_started' | 'in_progress' | 'completed';
    progress: number;
    dueDate: string;
};

export const ProjectProgress = () => {
    const [milestones, setMilestones] = useState<Milestone[]>([
        {
            id: '1',
            title: 'Project Setup',
            description: 'Initial configuration and repository setup',
            status: 'completed',
            progress: 100,
            dueDate: '2025-03-15',
        },
        {
            id: '2',
            title: 'Database Schema',
            description: 'Design and implement database models',
            status: 'in_progress',
            progress: 60,
            dueDate: '2025-03-20',
        },
        {
            id: '3',
            title: 'API Development',
            description: 'Create REST API endpoints',
            status: 'in_progress',
            progress: 30,
            dueDate: '2025-03-25',
        },
        {
            id: '4',
            title: 'Frontend Integration',
            description: 'Connect frontend to backend APIs',
            status: 'not_started',
            progress: 0,
            dueDate: '2025-04-05',
        },
    ]);

    const totalProgress = milestones.reduce((acc, milestone) => acc + milestone.progress, 0) / milestones.length;

    const getStatusColor = (status: Milestone['status']) => {
        switch (status) {
            case 'completed': return 'bg-green-500';
            case 'in_progress': return 'bg-blue-500';
            case 'not_started': return 'bg-gray-300';
            default: return 'bg-gray-300';
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Project Progress</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-sm font-medium">Overall Progress</span>
                            <span className="text-sm font-medium">{Math.round(totalProgress)}%</span>
                        </div>
                        <Progress value={totalProgress} className="h-2" />
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-medium">Milestones</h4>

                        {milestones.map((milestone) => (
                            <div key={milestone.id} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-2">
                                        <div className={`w-3 h-3 rounded-full ${getStatusColor(milestone.status)}`}></div>
                                        <span className="font-medium">{milestone.title}</span>
                                    </div>
                                    <Badge variant={milestone.status === 'completed' ? 'default' : 'outline'}>
                                        {milestone.status.replace('_', ' ')}
                                    </Badge>
                                </div>
                                <div className="text-sm text-gray-500">{milestone.description}</div>
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>Progress: {milestone.progress}%</span>
                                    <span>Due: {new Date(milestone.dueDate).toLocaleDateString()}</span>
                                </div>
                                <Progress value={milestone.progress} className="h-1" />
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
