import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle, Clock, Server, Upload } from 'lucide-react';
import {
    Alert,
    AlertDescription,
    AlertTitle
} from '@/components/ui/alert';

type Deployment = {
    id: string;
    version: string;
    timestamp: string;
    status: 'active' | 'archived' | 'failed';
    environment: 'development' | 'staging' | 'production';
    logs: string[];
};

export const DeploymentPanel = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [deployments, setDeployments] = useState<Deployment[]>([
        {
            id: '1',
            version: 'v1.0.2',
            timestamp: '2025-03-10T15:30:00Z',
            status: 'active',
            environment: 'production',
            logs: [
                '2025-03-10 15:30:00 - Deployment started',
                '2025-03-10 15:31:20 - Package validation successful',
                '2025-03-10 15:32:45 - Environment provisioned',
                '2025-03-10 15:35:10 - Application deployed successfully',
                '2025-03-10 15:36:30 - Health checks passed',
                '2025-03-10 15:37:00 - Deployment complete'
            ]
        },
        {
            id: '2',
            version: 'v1.0.1',
            timestamp: '2025-03-05T10:15:00Z',
            status: 'archived',
            environment: 'production',
            logs: [
                '2025-03-05 10:15:00 - Deployment started',
                '2025-03-05 10:16:30 - Package validation successful',
                '2025-03-05 10:18:45 - Environment provisioned',
                '2025-03-05 10:22:10 - Application deployed successfully',
                '2025-03-05 10:23:30 - Health checks passed',
                '2025-03-05 10:24:00 - Deployment complete'
            ]
        },
        {
            id: '3',
            version: 'v1.0.0',
            timestamp: '2025-03-01T09:00:00Z',
            status: 'archived',
            environment: 'production',
            logs: [
                '2025-03-01 09:00:00 - Deployment started',
                '2025-03-01 09:01:30 - Package validation successful',
                '2025-03-01 09:03:45 - Environment provisioned',
                '2025-03-01 09:07:10 - Application deployed successfully',
                '2025-03-01 09:08:30 - Health checks passed',
                '2025-03-01 09:09:00 - Deployment complete'
            ]
        }
    ]);

    const handleFileUpload = () => {
        setIsUploading(true);
        setUploadProgress(0);

        // Simulate file upload progress
        const interval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsUploading(false);
                    return 100;
                }
                return prev + 10;
            });
        }, 500);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // In a real application, we would process the dropped files here
        handleFileUpload();
    };

    const renderStatusBadge = (status: Deployment['status']) => {
        switch (status) {
            case 'active':
                return <Badge className="bg-green-500">Active</Badge>;
            case 'archived':
                return <Badge variant="outline" className="bg-gray-100 text-gray-800">Archived</Badge>;
            case 'failed':
                return <Badge className="bg-red-500">Failed</Badge>;
            default:
                return <Badge variant="outline">Unknown</Badge>;
        }
    };

    const renderEnvironmentBadge = (environment: Deployment['environment']) => {
        switch (environment) {
            case 'development':
                return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Development</Badge>;
            case 'staging':
                return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Staging</Badge>;
            case 'production':
                return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Production</Badge>;
            default:
                return <Badge variant="outline">Unknown</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Deploy Your Application</CardTitle>
                </CardHeader>
                <CardContent>
                    {isUploading ? (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Uploading code package...</span>
                                <span className="text-sm font-medium">{uploadProgress}%</span>
                            </div>
                            <Progress value={uploadProgress} className="h-2" />
                            <p className="text-sm text-gray-500">Please wait while your code package is being uploaded and processed.</p>
                        </div>
                    ) : (
                        <div
                            className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onClick={handleFileUpload}
                        >
                            <div className="flex flex-col items-center">
                                <Upload className="h-12 w-12 text-gray-400 mb-4" />
                                <h3 className="text-lg font-medium mb-2">Upload Code Package</h3>
                                <p className="text-sm text-gray-500 mb-4">
                                    Drag and drop your code package here or click to browse
                                </p>
                                <p className="text-xs text-gray-400 mb-2">
                                    Accepted formats: .zip, .tar.gz
                                </p>
                                <Button>Browse Files</Button>
                            </div>
                        </div>
                    )}

                    <div className="mt-6">
                        <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Deployment Tips</AlertTitle>
                            <AlertDescription>
                                Make sure your package includes a valid configuration file and environment variables are properly set.
                            </AlertDescription>
                        </Alert>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Deployment History</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="history">
                        <TabsList className="mb-4">
                            <TabsTrigger value="history">History</TabsTrigger>
                            <TabsTrigger value="logs">Logs</TabsTrigger>
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                        </TabsList>

                        <TabsContent value="history">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3">Version</th>
                                            <th className="px-6 py-3">Date</th>
                                            <th className="px-6 py-3">Environment</th>
                                            <th className="px-6 py-3">Status</th>
                                            <th className="px-6 py-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {deployments.map((deployment) => (
                                            <tr key={deployment.id} className="bg-white border-b">
                                                <td className="px-6 py-4 font-medium">{deployment.version}</td>
                                                <td className="px-6 py-4">
                                                    {new Date(deployment.timestamp).toLocaleDateString()}
                                                    {' '}
                                                    {new Date(deployment.timestamp).toLocaleTimeString()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {renderEnvironmentBadge(deployment.environment)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {renderStatusBadge(deployment.status)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {deployment.status === 'active' ? (
                                                        <Button variant="ghost" size="sm">Rollback</Button>
                                                    ) : (
                                                        <Button variant="ghost" size="sm">Restore</Button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </TabsContent>

                        <TabsContent value="logs">
                            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-auto max-h-80">
                                {deployments[0].logs.map((log, index) => (
                                    <div key={index} className="py-1">
                                        {log}
                                    </div>
                                ))}
                                <div className="py-1 text-green-400 flex items-center">
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Deployment completed successfully
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <Button variant="outline" size="sm">Download Logs</Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="settings">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium mb-2">Deployment Environment</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="border rounded-lg p-4 cursor-pointer bg-blue-50 border-blue-200">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-medium">Development</span>
                                                <Clock className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <p className="text-sm text-gray-500">For testing and development</p>
                                        </div>
                                        <div className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-medium">Staging</span>
                                                <Server className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <p className="text-sm text-gray-500">Pre-production environment</p>
                                        </div>
                                        <div className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-medium">Production</span>
                                                <Server className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <p className="text-sm text-gray-500">Live environment</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium mb-2">Deployment Options</h3>
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="auto-deploy"
                                                className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                checked
                                            />
                                            <label htmlFor="auto-deploy" className="text-sm text-gray-700">
                                                Automatic deployment on package upload
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="health-checks"
                                                className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                checked
                                            />
                                            <label htmlFor="health-checks" className="text-sm text-gray-700">
                                                Run health checks after deployment
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="rollback"
                                                className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                checked
                                            />
                                            <label htmlFor="rollback" className="text-sm text-gray-700">
                                                Automatic rollback on failure
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <Button>Save Settings</Button>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
};