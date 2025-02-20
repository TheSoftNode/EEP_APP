import { useState } from "react";
import AuthHeader from "./AuthHeader";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Add your login logic here
        setTimeout(() => setIsLoading(false), 1500);
    };

    return (
        <div className="min-h-screen relative bg-gradient-to-b from-blue-50 via-blue-100/50 to-white">
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
                    title="Welcome back to EEP"
                    description="Log in to access your cloud services dashboard"
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Card className="backdrop-blur-sm bg-white/80">
                        <form onSubmit={handleSubmit}>
                            <CardHeader>
                                <CardTitle>Login</CardTitle>
                                <CardDescription>
                                    Enter your credentials to access your account
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
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
                                        placeholder="Enter your password"
                                        className="bg-white"
                                        required
                                    />
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
                                            Logging in...
                                        </>
                                    ) : (
                                        'Log in'
                                    )}
                                </Button>
                                <p className="text-sm text-gray-600 text-center">
                                    Don&apos;t have an account?{' '}
                                    <a
                                        href="/EEP/signup"
                                        className="text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        Sign up
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
