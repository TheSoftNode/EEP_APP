import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, ArrowRight, Menu, Cloud } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar } from './Sidebar';
import CloudSelector from './CloudSelector';
import { cloudServices } from '@/config/eep-cloudServices';
import { CloudProvider, CloudService, ServiceCategory } from '@/types/eep-dashboard';
import { ServiceIntegrationPanel } from './ServiceIntegrationPanel';
import PowerShellTerminal from './PowerShellTerminal';
import CodeEditor from './CodeEditor';
import FileUploader from './FileUploader';

const Dashboard: React.FC = () => {
    const [selectedCloud, setSelectedCloud] = useState<CloudProvider>('AWS');
    const [selectedService, setSelectedService] = useState<ServiceCategory>('databases');
    const [selectedServiceItem, setSelectedServiceItem] = useState<CloudService | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('services');

    const handleCloudSelect = (cloud: CloudProvider) => {
        setSelectedCloud(cloud);
        setSelectedServiceItem(null);
    };

    const handleServiceSelect = (service: ServiceCategory) => {
        setSelectedService(service);
        setSelectedServiceItem(null);
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 flex flex-col md:flex-row">
                {/* Sidebar - Hidden on mobile, shown through menu */}
                <div className={`
                    fixed inset-y-0 left-0 transform md:relative md:translate-x-0
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                    transition-transform duration-300 ease-in-out md:flex
                    ${isMobileMenuOpen ? 'z-50' : 'z-30'}
                    md:w-64 md:flex-shrink-0
                `}>
                    <Sidebar
                        selectedCloud={selectedCloud}
                        selectedService={selectedService}
                        onServiceSelect={handleServiceSelect}
                    />
                </div>

                {/* Backdrop for mobile menu */}
                {isMobileMenuOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}

                {/* Main Content Area */}
                <div className="flex-1 min-w-0 overflow-hidden">
                    <div className="p-4 sm:p-6 lg:p-8">
                        {/* Header with cloud selector */}
                        <div className="sticky top-16 z-20 bg-white/80 backdrop-blur-sm -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 py-4 mb-8">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="flex items-center">
                                    {/* Mobile menu button */}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="mr-4 md:hidden"
                                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    >
                                        <Menu className="h-8 w-8" />
                                    </Button>
                                    <div>
                                        <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2">
                                            EEP Cloud Dashboard
                                        </h1>
                                        <div className="h-1 w-32 bg-gradient-to-r from-green-400 via-blue-500 to-violet-600"></div>
                                    </div>
                                </div>
                                <div className="w-full sm:w-auto">
                                    <CloudSelector
                                        selectedCloud={selectedCloud}
                                        onCloudSelect={handleCloudSelect}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Tabs Navigation */}
                        <Tabs
                            value={activeTab}
                            onValueChange={setActiveTab}
                            className="mb-8"
                        >
                            <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto">
                                <TabsTrigger value="services" className="text-sm">Services</TabsTrigger>
                                <TabsTrigger value="terminal" className="text-sm">Terminal</TabsTrigger>
                                <TabsTrigger value="editor" className="text-sm">Code Editor</TabsTrigger>
                                <TabsTrigger value="files" className="text-sm">Files</TabsTrigger>
                            </TabsList>

                            {/* Services Tab */}
                            <TabsContent value="services">
                                {/* Service Cards Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                                    {cloudServices[selectedCloud][selectedService].map((service, index) => (
                                        <motion.div
                                            key={service.name}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <Card
                                                className={`cursor-pointer transition-all hover:shadow-lg ${selectedServiceItem?.name === service.name
                                                    ? 'ring-2 ring-blue-500 shadow-lg'
                                                    : ''
                                                    }`}
                                                onClick={() => setSelectedServiceItem(service)}
                                            >
                                                <CardHeader>
                                                    <CardTitle className="text-xl flex items-center justify-between">
                                                        <span className="truncate mr-2">{service.name}</span>
                                                        <motion.button
                                                            className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-500 flex items-center justify-center flex-shrink-0"
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                        >
                                                            <Plus className="w-5 h-5" />
                                                        </motion.button>
                                                    </CardTitle>
                                                    <CardDescription className="line-clamp-2">
                                                        {service.description}
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="space-y-4">
                                                        <div className="space-y-2">
                                                            {service.features.map((feature) => (
                                                                <div key={feature} className="flex items-center text-sm text-gray-600">
                                                                    <div className="w-1 h-1 rounded-full bg-gradient-to-r from-blue-400 to-violet-400 mr-2 flex-shrink-0"></div>
                                                                    <span className="line-clamp-1">{feature}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2 pt-4 border-t">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                                                            >
                                                                Details
                                                                <ArrowRight className="w-4 h-4 ml-2" />
                                                            </Button>
                                                            <Button
                                                                variant="default"
                                                                size="sm"
                                                                className="bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 text-white hover:from-blue-600 hover:via-indigo-600 hover:to-violet-600"
                                                                onClick={() => {
                                                                    setSelectedServiceItem(service);
                                                                    setActiveTab('terminal');
                                                                }}
                                                            >
                                                                Create
                                                                <Plus className="w-4 h-4 ml-2" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Service Integration Panel */}
                                {selectedServiceItem && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mb-8"
                                    >
                                        <ServiceIntegrationPanel
                                            selectedService={selectedServiceItem}
                                            selectedCloud={selectedCloud}
                                        />
                                    </motion.div>
                                )}
                            </TabsContent>

                            {/* Terminal Tab */}
                            <TabsContent value="terminal">
                                <PowerShellTerminal
                                    selectedCloud={selectedCloud}
                                    selectedService={selectedService}
                                />

                                {selectedServiceItem && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <Card className="bg-white shadow-md mb-8">
                                            <CardHeader className="bg-gray-50">
                                                <CardTitle className="text-lg flex items-center">
                                                    <Cloud className="w-5 h-5 mr-2 text-indigo-500" />
                                                    {selectedServiceItem.name} Commands
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-4">
                                                <div className="space-y-2">
                                                    <p className="text-sm text-gray-700">Use these commands in the terminal to manage your {selectedServiceItem.name} service:</p>
                                                    <div className="bg-gray-100 p-3 rounded-md">
                                                        <code className="text-sm font-mono text-gray-800">create-service {selectedServiceItem.name.toLowerCase().replace(/\s+/g, '-')}</code>
                                                    </div>
                                                    <div className="bg-gray-100 p-3 rounded-md">
                                                        <code className="text-sm font-mono text-gray-800">deploy</code>
                                                    </div>
                                                    <div className="bg-gray-100 p-3 rounded-md">
                                                        <code className="text-sm font-mono text-gray-800">status</code>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                )}
                            </TabsContent>

                            {/* Code Editor Tab */}
                            <TabsContent value="editor">
                                <CodeEditor
                                    selectedCloud={selectedCloud}
                                    selectedService={selectedService}
                                />

                                <Card className="shadow-md mb-8">
                                    <CardHeader>
                                        <CardTitle>Development Environment</CardTitle>
                                        <CardDescription>
                                            Create and edit your cloud function code directly in the browser
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <p className="text-sm text-gray-700">
                                                This code editor provides a simplified IDE experience for developing {selectedCloud} functions.
                                                For more advanced code editing, we recommend downloading your project and using a local editor.
                                            </p>

                                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                                <h4 className="font-medium mb-2">Tips:</h4>
                                                <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
                                                    <li>Use the terminal to deploy your code to {selectedCloud}</li>
                                                    <li>Save your changes frequently</li>
                                                    <li>You can upload existing code files using the Files tab</li>
                                                    <li>Templates for {selectedCloud} services are available</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Files Tab */}
                            <TabsContent value="files">
                                <FileUploader selectedCloud={selectedCloud} />

                                <Card className="shadow-md mb-8">
                                    <CardHeader>
                                        <CardTitle>Deployment Package</CardTitle>
                                        <CardDescription>
                                            Create a deployment package for your {selectedCloud} service
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <p className="text-sm text-gray-700">
                                                Package your application code and dependencies for deployment to {selectedCloud}.
                                            </p>

                                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                                <h4 className="font-medium mb-2 text-blue-800">Package Requirements:</h4>
                                                <ul className="text-sm text-blue-700 space-y-1 list-disc pl-5">
                                                    {selectedCloud === 'AWS' ? (
                                                        <>
                                                            <li>Include all dependencies in the package</li>
                                                            <li>Ensure the entry point is properly configured</li>
                                                            <li>Maximum size for Lambda functions: 50MB (zipped)</li>
                                                            <li>Include only necessary files to reduce cold start time</li>
                                                        </>
                                                    ) : selectedCloud === 'Azure' ? (
                                                        <>
                                                            <li>Include a function.json configuration file</li>
                                                            <li>Specify Node.js version in host.json</li>
                                                            <li>Include package.json with dependencies</li>
                                                            <li>Use Azure Functions Core Tools for local testing</li>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <li>Include requirements.txt for Python functions</li>
                                                            <li>Specify entry point in deployment manifest</li>
                                                            <li>Maximum deployment size: 500MB</li>
                                                            <li>Test locally with Google Cloud Functions emulator</li>
                                                        </>
                                                    )}
                                                </ul>
                                            </div>

                                            <div className="flex justify-end">
                                                <Button
                                                    className="bg-gradient-to-r from-blue-500 to-violet-500"
                                                >
                                                    Create Deployment Package
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;