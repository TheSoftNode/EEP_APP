import React, { useState, FormEvent, ChangeEvent, JSX } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Cloud,
    Server,
    Shield,
    Globe,
    Database,
    HardDrive,
    Check,
    AlertCircle
} from 'lucide-react';

interface CloudConfigProps {
    selectedCloud: 'AWS' | 'Azure' | 'GCP';
    selectedService: 'databases' | 'backend' | 'frontend';
}

interface FormState {
    serviceName: string;
    region: string;
    instanceType: string;
    autoScaling: boolean;
    backups: boolean;
    monitoring: boolean;
    encryption: boolean;
    accessControl: string;
    databaseType?: string;
    runtime?: string;
    memory?: string;
    cachingEnabled?: boolean;
    [key: string]: string | boolean | undefined;
}

const CloudConfig: React.FC<CloudConfigProps> = ({ selectedCloud, selectedService }) => {
    const [formState, setFormState] = useState<FormState>({
        serviceName: '',
        region: 'us-east-1',
        instanceType: 'small',
        autoScaling: false,
        backups: true,
        monitoring: true,
        encryption: true,
        accessControl: 'private'
    });

    const [validationError, setValidationError] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isConfigured, setIsConfigured] = useState<boolean>(false);

    // Handle input changes
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormState(prev => ({
            ...prev,
            [name]: value
        }));
        setValidationError('');
    };

    // Handle checkbox changes
    const handleCheckboxChange = (name: string): void => {
        setFormState(prev => ({
            ...prev,
            [name]: !prev[name]
        }));
    };

    // Handle select changes
    const handleSelectChange = (name: string, value: string): void => {
        setFormState(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Get service-specific fields based on selected service
    const getServiceSpecificFields = (): JSX.Element => {
        if (selectedService === 'databases') {
            return (
                <>
                    <div className="space-y-2">
                        <Label htmlFor="databaseType">Database Type</Label>
                        <Select
                            value={formState.databaseType}
                            onValueChange={(value) => handleSelectChange('databaseType', value)}
                        >
                            <SelectTrigger id="databaseType">
                                <SelectValue placeholder="Select database type" />
                            </SelectTrigger>
                            <SelectContent>
                                {selectedCloud === 'AWS' ? (
                                    <>
                                        <SelectItem value="dynamodb">DynamoDB (NoSQL)</SelectItem>
                                        <SelectItem value="rds-mysql">RDS MySQL</SelectItem>
                                        <SelectItem value="rds-postgres">RDS PostgreSQL</SelectItem>
                                        <SelectItem value="aurora">Aurora</SelectItem>
                                    </>
                                ) : selectedCloud === 'Azure' ? (
                                    <>
                                        <SelectItem value="cosmos-db">Cosmos DB</SelectItem>
                                        <SelectItem value="sql-database">SQL Database</SelectItem>
                                        <SelectItem value="mysql">Azure Database for MySQL</SelectItem>
                                        <SelectItem value="postgres">Azure Database for PostgreSQL</SelectItem>
                                    </>
                                ) : (
                                    <>
                                        <SelectItem value="firestore">Firestore</SelectItem>
                                        <SelectItem value="cloud-sql-mysql">Cloud SQL MySQL</SelectItem>
                                        <SelectItem value="cloud-sql-postgres">Cloud SQL PostgreSQL</SelectItem>
                                        <SelectItem value="bigtable">Bigtable</SelectItem>
                                    </>
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="storageSize">Storage Size (GB)</Label>
                        <Input
                            id="storageSize"
                            name="storageSize"
                            type="number"
                            placeholder="10"
                            min="5"
                            max="1000"
                            onChange={handleInputChange}
                        />
                    </div>
                </>
            );
        } else if (selectedService === 'backend') {
            return (
                <>
                    <div className="space-y-2">
                        <Label htmlFor="runtime">Runtime Environment</Label>
                        <Select
                            value={formState.runtime}
                            onValueChange={(value) => handleSelectChange('runtime', value)}
                        >
                            <SelectTrigger id="runtime">
                                <SelectValue placeholder="Select runtime" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="nodejs16">Node.js 16.x</SelectItem>
                                <SelectItem value="nodejs18">Node.js 18.x</SelectItem>
                                <SelectItem value="python39">Python 3.9</SelectItem>
                                <SelectItem value="python310">Python 3.10</SelectItem>
                                <SelectItem value="java11">Java 11</SelectItem>
                                <SelectItem value="dotnet6">.NET 6</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="memory">Memory (MB)</Label>
                        <Select
                            value={formState.memory}
                            onValueChange={(value) => handleSelectChange('memory', value)}
                        >
                            <SelectTrigger id="memory">
                                <SelectValue placeholder="Select memory allocation" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="128">128 MB</SelectItem>
                                <SelectItem value="256">256 MB</SelectItem>
                                <SelectItem value="512">512 MB</SelectItem>
                                <SelectItem value="1024">1024 MB</SelectItem>
                                <SelectItem value="2048">2048 MB</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="timeout">Timeout (seconds)</Label>
                        <Input
                            id="timeout"
                            name="timeout"
                            type="number"
                            placeholder="30"
                            min="1"
                            max="900"
                            onChange={handleInputChange}
                        />
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className="space-y-2">
                        <Label htmlFor="domainName">Domain Name (optional)</Label>
                        <Input
                            id="domainName"
                            name="domainName"
                            placeholder="myapp.example.com"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cachingEnabled">Enable Caching</Label>
                        <div className="flex items-center space-x-2 pt-2">
                            <Checkbox
                                id="cachingEnabled"
                                checked={formState.cachingEnabled || false}
                                onCheckedChange={() => handleCheckboxChange('cachingEnabled')}
                            />
                            <label
                                htmlFor="cachingEnabled"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Enable content caching for better performance
                            </label>
                        </div>
                    </div>
                </>
            );
        }
    };

    // Handle form submission
    const handleSubmit = (e: FormEvent<HTMLFormElement> | React.MouseEvent): void => {
        if (e.type === 'submit') {
            e.preventDefault();
        }

        // Basic validation
        if (!formState.serviceName.trim()) {
            setValidationError('Service name is required');
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsConfigured(true);
        }, 2000);
    };

    return (
        <Card className="shadow-md mb-8">
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Cloud className="w-5 h-5 mr-2 text-indigo-500" />
                    {selectedCloud} Configuration
                </CardTitle>
                <CardDescription>
                    Configure your {selectedService} service on {selectedCloud}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isConfigured ? (
                    <div className="py-6 text-center space-y-4">
                        <div className="flex justify-center">
                            <div className="rounded-full bg-green-100 p-3">
                                <Check className="h-8 w-8 text-green-600" />
                            </div>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">Configuration Complete</h3>
                        <p className="text-gray-600">
                            Your {formState.serviceName} service has been configured on {selectedCloud}.
                            You can now deploy your application using the deployment package.
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg text-left mt-4">
                            <p className="font-medium mb-2">Service Details:</p>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li><span className="font-medium">Name:</span> {formState.serviceName}</li>
                                <li><span className="font-medium">Region:</span> {formState.region}</li>
                                <li><span className="font-medium">Instance Type:</span> {formState.instanceType}</li>
                                <li><span className="font-medium">Auto Scaling:</span> {formState.autoScaling ? 'Enabled' : 'Disabled'}</li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {validationError && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-start">
                                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                                <span>{validationError}</span>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="serviceName">Service Name</Label>
                                <Input
                                    id="serviceName"
                                    name="serviceName"
                                    placeholder="my-awesome-service"
                                    value={formState.serviceName}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="region">Region</Label>
                                <Select
                                    value={formState.region}
                                    onValueChange={(value) => handleSelectChange('region', value)}
                                >
                                    <SelectTrigger id="region">
                                        <SelectValue placeholder="Select region" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {selectedCloud === 'AWS' ? (
                                            <>
                                                <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                                                <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                                                <SelectItem value="eu-west-1">EU West (Ireland)</SelectItem>
                                                <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                                            </>
                                        ) : selectedCloud === 'Azure' ? (
                                            <>
                                                <SelectItem value="eastus">East US</SelectItem>
                                                <SelectItem value="westus2">West US 2</SelectItem>
                                                <SelectItem value="northeurope">North Europe</SelectItem>
                                                <SelectItem value="southeastasia">Southeast Asia</SelectItem>
                                            </>
                                        ) : (
                                            <>
                                                <SelectItem value="us-central1">US Central (Iowa)</SelectItem>
                                                <SelectItem value="us-east4">US East (Virginia)</SelectItem>
                                                <SelectItem value="europe-west1">Europe West (Belgium)</SelectItem>
                                                <SelectItem value="asia-east1">Asia East (Taiwan)</SelectItem>
                                            </>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="instanceType">Instance Type</Label>
                                <Select
                                    value={formState.instanceType}
                                    onValueChange={(value) => handleSelectChange('instanceType', value)}
                                >
                                    <SelectTrigger id="instanceType">
                                        <SelectValue placeholder="Select instance type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="small">Small (1 vCPU, 2GB RAM)</SelectItem>
                                        <SelectItem value="medium">Medium (2 vCPU, 4GB RAM)</SelectItem>
                                        <SelectItem value="large">Large (4 vCPU, 8GB RAM)</SelectItem>
                                        <SelectItem value="xlarge">XLarge (8 vCPU, 16GB RAM)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {getServiceSpecificFields()}

                            <div className="space-y-3 pt-2">
                                <Label>Additional Options</Label>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="autoScaling"
                                            checked={formState.autoScaling}
                                            onCheckedChange={() => handleCheckboxChange('autoScaling')}
                                        />
                                        <label
                                            htmlFor="autoScaling"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Enable auto-scaling
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="backups"
                                            checked={formState.backups}
                                            onCheckedChange={() => handleCheckboxChange('backups')}
                                        />
                                        <label
                                            htmlFor="backups"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Enable automated backups
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="monitoring"
                                            checked={formState.monitoring}
                                            onCheckedChange={() => handleCheckboxChange('monitoring')}
                                        />
                                        <label
                                            htmlFor="monitoring"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Enable monitoring and alerts
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="encryption"
                                            checked={formState.encryption}
                                            onCheckedChange={() => handleCheckboxChange('encryption')}
                                        />
                                        <label
                                            htmlFor="encryption"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Enable data encryption
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="accessControl">Access Control</Label>
                                <Select
                                    value={formState.accessControl}
                                    onValueChange={(value) => handleSelectChange('accessControl', value)}
                                >
                                    <SelectTrigger id="accessControl">
                                        <SelectValue placeholder="Select access level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="private">Private (Internal access only)</SelectItem>
                                        <SelectItem value="restricted">Restricted (VPC/VNET access)</SelectItem>
                                        <SelectItem value="public">Public (Internet accessible)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </form>
                )}
            </CardContent>
            {!isConfigured && (
                <CardFooter className="flex justify-end">
                    <Button
                        type="submit"
                        className="bg-gradient-to-r from-blue-500 to-violet-500"
                        disabled={isSubmitting}
                        onClick={(e) => handleSubmit(e)}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                                Configuring...
                            </>
                        ) : (
                            'Apply Configuration'
                        )}
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
};

export default CloudConfig;