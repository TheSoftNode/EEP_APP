import { useState } from "react";
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import AuthHeader from "./AuthHeader";


export const SignupForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Add your signup logic here
        setTimeout(() => setIsLoading(false), 1500);
    };

    return (
        <div className="min-h-screen mb-12 relative bg-gradient-to-b from-blue-50 via-blue-100/50 to-white">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] opacity-30">
                    <div className="absolute inset-0 rotate-45 animate-pulse">
                        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
                    </div>
                </div>
            </div>

            {/* <div className="absolute top-6 left-6 z-20">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.location.href = '/EEP'}
                    className="text-gray-600 hover:text-gray-900 gap-2 group"
                >
                    <span className="inline-block transition-transform group-hover:-translate-x-1">←</span>
                    Back to EEP
                </Button>
            </div> */}

            <div className="relative z-10 container max-w-lg mx-auto pt-20 px-4">
                <AuthHeader
                    title="Join EEP"
                    description="Create your account to start your cloud journey"
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Card className="backdrop-blur-sm bg-white/80">
                        <form onSubmit={handleSubmit}>
                            <CardHeader>
                                <CardTitle>Create Account</CardTitle>
                                <CardDescription>
                                    Fill in your details to create your account
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input
                                            id="firstName"
                                            placeholder="Enter first name"
                                            className="bg-white"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input
                                            id="lastName"
                                            placeholder="Enter last name"
                                            className="bg-white"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className="bg-white"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Create a password"
                                        className="bg-white"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Select>
                                        <SelectTrigger className="bg-white">
                                            <SelectValue placeholder="Select your role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="developer">Developer</SelectItem>
                                            <SelectItem value="architect">Solution Architect</SelectItem>
                                            <SelectItem value="manager">Project Manager</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col space-y-4">
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating account...
                                        </>
                                    ) : (
                                        'Create Account'
                                    )}
                                </Button>
                                <p className="text-sm text-gray-600 text-center">
                                    Already have an account?{' '}
                                    <a
                                        href="/EEP/login"
                                        className="text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        Log in
                                    </a>
                                </p>
                            </CardFooter>
                        </form>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};