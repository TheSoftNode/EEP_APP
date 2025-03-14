import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Check icon component
const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="m9 12 2 2 4-4"></path>
    </svg>
);

// Clock icon component
const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
);

// Steps component
const ApplicationSteps = ({ currentStep }: { currentStep: number }) => {
    return (
        <div className="space-y-8 mt-8">
            <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600">
                    <CheckIcon />
                </div>
                <div className="ml-4 flex-1">
                    <h3 className="font-medium">Application Submitted</h3>
                    <p className="text-sm text-gray-500">We've received your application</p>
                </div>
            </div>

            <div className="flex items-start">
                <div className="flex flex-col items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 2 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                        {currentStep >= 2 ? <CheckIcon /> : <ClockIcon />}
                    </div>
                    <div className="w-px h-20 bg-gray-200 mt-2"></div>
                </div>
                <div className="ml-4 flex-1">
                    <h3 className={`font-medium ${currentStep >= 2 ? 'text-gray-900' : 'text-gray-500'}`}>Application Review</h3>
                    <p className="text-sm text-gray-500">Our team is reviewing your application</p>
                    {currentStep === 2 && (
                        <p className="text-sm text-blue-600 mt-1">In progress</p>
                    )}
                </div>
            </div>

            <div className="flex items-start">
                <div className="flex flex-col items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 3 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                        {currentStep >= 3 ? <CheckIcon /> : <ClockIcon />}
                    </div>
                    <div className="w-px h-20 bg-gray-200 mt-2"></div>
                </div>
                <div className="ml-4 flex-1">
                    <h3 className={`font-medium ${currentStep >= 3 ? 'text-gray-900' : 'text-gray-500'}`}>Application Decision</h3>
                    <p className="text-sm text-gray-500">You'll receive our decision via email</p>
                    {currentStep === 3 && (
                        <p className="text-sm text-blue-600 mt-1">Pending</p>
                    )}
                </div>
            </div>

            <div className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 4 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                    {currentStep >= 4 ? <CheckIcon /> : <ClockIcon />}
                </div>
                <div className="ml-4 flex-1">
                    <h3 className={`font-medium ${currentStep >= 4 ? 'text-gray-900' : 'text-gray-500'}`}>Onboarding</h3>
                    <p className="text-sm text-gray-500">Welcome to the platform! Set up your workspace.</p>
                    {currentStep === 4 && (
                        <p className="text-sm text-green-600 mt-1">Ready to begin</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const ApplicationStatusPage = () => {
    // In a real application, we would fetch the actual status from an API
    const [applicationStatus, setApplicationStatus] = useState({
        id: '12345',
        currentStep: 2,
        submittedAt: new Date().toISOString(),
        expectedResponseBy: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
    });

    return (
        <>
            <Head>
                <title>Application Status | EEP</title>
                <meta name="description" content="Check your Enterprise Empowerment Platform application status" />
            </Head>

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto">
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl">Application Status</CardTitle>
                            <CardDescription>
                                Thank you for applying to the Enterprise Empowerment Platform
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                                <h3 className="text-blue-800 font-medium mb-1">Application #{applicationStatus.id}</h3>
                                <p className="text-blue-600 text-sm">
                                    Submitted on {new Date(applicationStatus.submittedAt).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-medium">Current Status</h3>
                                <p>
                                    Your application is currently being reviewed by our team. We'll notify you once a decision has been made.
                                </p>

                                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
                                    <p className="text-yellow-800 text-sm">
                                        <span className="font-medium">Expected response date:</span>{' '}
                                        {new Date(applicationStatus.expectedResponseBy).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <Separator className="my-6" />

                            <ApplicationSteps currentStep={applicationStatus.currentStep} />
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-4">
                            <div className="text-center w-full">
                                <p className="text-sm text-gray-500 mb-2">
                                    Have questions about your application?
                                </p>
                                <Button variant="outline">
                                    Contact Support
                                </Button>
                            </div>

                            <div className="text-center text-sm text-gray-500">
                                <p>
                                    You can check back here anytime to see your application status.
                                </p>
                                <p className="mt-1">
                                    <Link href="/" className="text-indigo-600 hover:text-indigo-500">
                                        Return to homepage
                                    </Link>
                                </p>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default ApplicationStatusPage;