"use client"

import { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

type ApiEndpoint = {
    id: string;
    name: string;
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    description?: string;
    status: 'development' | 'testing' | 'production' | 'deprecated';
};

export const ApiEndpointManager = () => {
    const [endpoints, setEndpoints] = useState<ApiEndpoint[]>([
        {
            id: '1',
            name: 'Get Users',
            url: '/api/users',
            method: 'GET',
            description: 'Retrieves all users',
            status: 'production',
        },
        {
            id: '2',
            name: 'Create User',
            url: '/api/users',
            method: 'POST',
            description: 'Creates a new user',
            status: 'testing',
        },
        {
            id: '3',
            name: 'Update User',
            url: '/api/users/:id',
            method: 'PUT',
            description: 'Updates an existing user',
            status: 'development',
        },
    ]);

    const [newEndpoint, setNewEndpoint] = useState<Omit<ApiEndpoint, 'id'>>({
        name: '',
        url: '',
        method: 'GET',
        description: '',
        status: 'development',
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleAddEndpoint = () => {
        setEndpoints([
            ...endpoints,
            {
                id: Date.now().toString(),
                ...newEndpoint,
            },
        ]);

        setNewEndpoint({
            name: '',
            url: '',
            method: 'GET',
            description: '',
            status: 'development',
        });

        setIsDialogOpen(false);
    };

    const getStatusBadge = (status: ApiEndpoint['status']) => {
        switch (status) {
            case 'development':
                return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Development</Badge>;
            case 'testing':
                return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Testing</Badge>;
            case 'production':
                return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Production</Badge>;
            case 'deprecated':
                return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Deprecated</Badge>;
            default:
                return <Badge variant="outline">Unknown</Badge>;
        }
    };

    const getMethodBadge = (method: ApiEndpoint['method']) => {
        switch (method) {
            case 'GET':
                return <Badge className="bg-blue-500">GET</Badge>;
            case 'POST':
                return <Badge className="bg-green-500">POST</Badge>;
            case 'PUT':
                return <Badge className="bg-amber-500">PUT</Badge>;
            case 'DELETE':
                return <Badge className="bg-red-500">DELETE</Badge>;
            case 'PATCH':
                return <Badge className="bg-purple-500">PATCH</Badge>;
            default:
                return <Badge>Unknown</Badge>;
        }
    };

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>API Endpoints</CardTitle>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>Add Endpoint</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New API Endpoint</DialogTitle>
                            <DialogDescription>
                                Define a new API endpoint for your project.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="endpoint-name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="endpoint-name"
                                    value={newEndpoint.name}
                                    onChange={(e) => setNewEndpoint({ ...newEndpoint, name: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="endpoint-url" className="text-right">
                                    URL
                                </Label>
                                <Input
                                    id="endpoint-url"
                                    value={newEndpoint.url}
                                    onChange={(e) => setNewEndpoint({ ...newEndpoint, url: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="endpoint-method" className="text-right">
                                    Method
                                </Label>
                                <Select
                                    value={newEndpoint.method}
                                    onValueChange={(value: ApiEndpoint['method']) =>
                                        setNewEndpoint({ ...newEndpoint, method: value })
                                    }
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="GET">GET</SelectItem>
                                        <SelectItem value="POST">POST</SelectItem>
                                        <SelectItem value="PUT">PUT</SelectItem>
                                        <SelectItem value="DELETE">DELETE</SelectItem>
                                        <SelectItem value="PATCH">PATCH</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="endpoint-status" className="text-right">
                                    Status
                                </Label>
                                <Select
                                    value={newEndpoint.status}
                                    onValueChange={(value: ApiEndpoint['status']) =>
                                        setNewEndpoint({ ...newEndpoint, status: value })
                                    }
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="development">Development</SelectItem>
                                        <SelectItem value="testing">Testing</SelectItem>
                                        <SelectItem value="production">Production</SelectItem>
                                        <SelectItem value="deprecated">Deprecated</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="endpoint-description" className="text-right">
                                    Description
                                </Label>
                                <Textarea
                                    id="endpoint-description"
                                    value={newEndpoint.description}
                                    onChange={(e) => setNewEndpoint({ ...newEndpoint, description: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleAddEndpoint}>
                                Add Endpoint
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>A list of your project's API endpoints</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead>URL</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {endpoints.map((endpoint) => (
                            <TableRow key={endpoint.id}>
                                <TableCell className="font-medium">{endpoint.name}</TableCell>
                                <TableCell>{getMethodBadge(endpoint.method)}</TableCell>
                                <TableCell className="font-mono text-sm">{endpoint.url}</TableCell>
                                <TableCell>{getStatusBadge(endpoint.status)}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm">Edit</Button>
                                    <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

