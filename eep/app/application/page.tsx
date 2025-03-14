import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

// Define schemas for different application types
const learnerSchema = z.object({
    experienceLevel: z.enum(['beginner', 'intermediate', 'advanced'], {
        required_error: 'Please select your experience level',
    }),
    skills: z.string().min(1, { message: 'Please list your skills' }),
    projectInterest: z.string().min(1, { message: 'Please describe your project interests' }),
    availability: z.enum(['part_time', 'full_time'], {
        required_error: 'Please select your availability',
    }),
    portfolio: z.string().url({ message: 'Please enter a valid URL' }).optional().or(z.literal('')),
    github: z.string().url({ message: 'Please enter a valid URL' }).optional().or(z.literal('')),
    expectations: z.string().min(10, { message: 'Please describe your expectations' }),
    termsAccepted: z.literal(true, {
        errorMap: () => ({ message: 'You must accept the terms and conditions' }),
    }),
});

const businessSchema = z.object({
    companyName: z.string().min(1, { message: 'Company name is required' }),
    industry: z.string().min(1, { message: 'Industry is required' }),
    companySize: z.enum(['1-10', '11-50', '51-200', '201-500', '500+'], {
        required_error: 'Please select your company size',
    }),
    projectDescription: z.string().min(10, { message: 'Please describe your project in detail' }),
    timeline: z.enum(['1-3_months', '3-6_months', '6-12_months', '12+_months'], {
        required_error: 'Please select a timeline',
    }),
    budget: z.enum(['under_5k', '5k-15k', '15k-50k', '50k+'], {
        required_error: 'Please select a budget range',
    }),
    teamSize: z.string().min(1, { message: 'Please specify team size' }),
    termsAccepted: z.literal(true, {
        errorMap: () => ({ message: 'You must accept the terms and conditions' }),
    }),
});

const ApplicationPage = () => {
    const router = useRouter();
    const { role } = router.query;
    const [activeRole, setActiveRole] = useState<'learner' | 'business'>(
        (role as 'learner' | 'business') || 'learner'
    );
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Learner form
    const learnerForm = useForm<z.infer<typeof learnerSchema>>({
        resolver: zodResolver(learnerSchema),
        defaultValues: {
            experienceLevel: undefined,
            skills: '',
            projectInterest: '',
            availability: undefined,
            portfolio: '',
            github: '',
            expectations: '',
            termsAccepted: true,
        },
    });

    // Business form
    const businessForm = useForm<z.infer<typeof businessSchema>>({
        resolver: zodResolver(businessSchema),
        defaultValues: {
            companyName: '',
            industry: '',
            companySize: undefined,
            projectDescription: '',
            timeline: undefined,
            budget: undefined,
            teamSize: '',
            termsAccepted: true,
        },
    });

    const handleLearnerSubmit = async (values: z.infer<typeof learnerSchema>) => {
        setIsSubmitting(true);

        try {
            // API call would go here
            console.log('Learner application submitted:', values);

            // Redirect to confirmation page
            router.push('/application-status');
        } catch (error) {
            console.error('Application submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBusinessSubmit = async (values: z.infer<typeof businessSchema>) => {
        setIsSubmitting(true);

        try {
            // API call would go here
            console.log('Business application submitted:', values);

            // Redirect to confirmation page
            router.push('/application-status');
        } catch (error) {
            console.error('Application submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Head>
                <title>EEP Application</title>
                <meta name="description" content="Apply to join the Enterprise Empowerment Platform" />
            </Head>

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold text-center mb-2">Apply to Join EEP</h1>
                    <p className="text-gray-500 text-center mb-8">
                        Tell us about yourself so we can match you with the right opportunities
                    </p>

                    <Tabs
                        defaultValue={activeRole}
                        onValueChange={(value) => setActiveRole(value as 'learner' | 'business')}
                        className="w-full"
                    >
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="learner">Apply as Developer</TabsTrigger>
                            <TabsTrigger value="business">Apply as Business</TabsTrigger>
                        </TabsList>

                        <TabsContent value="learner">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Developer Application</CardTitle>
                                    <CardDescription>
                                        Join the platform as a developer to work on exciting projects and receive mentorship
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Form {...learnerForm}>
                                        <form onSubmit={learnerForm.handleSubmit(handleLearnerSubmit)} className="space-y-6">
                                            <FormField
                                                control={learnerForm.control}
                                                name="experienceLevel"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Experience Level</FormLabel>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select your experience level" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                                                                <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                                                                <SelectItem value="advanced">Advanced (3+ years)</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={learnerForm.control}
                                                name="skills"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Skills</FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder="List your technical skills (e.g., JavaScript, React, Node.js, etc.)"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            Separate skills with commas
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={learnerForm.control}
                                                name="projectInterest"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Project Interests</FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder="What types of projects are you interested in working on?"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={learnerForm.control}
                                                name="availability"
                                                render={({ field }) => (
                                                    <FormItem className="space-y-3">
                                                        <FormLabel>Availability</FormLabel>
                                                        <FormControl>
                                                            <RadioGroup
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                                className="flex flex-col space-y-1"
                                                            >
                                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                                    <FormControl>
                                                                        <RadioGroupItem value="part_time" />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal">
                                                                        Part-time (10-20 hours/week)
                                                                    </FormLabel>
                                                                </FormItem>
                                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                                    <FormControl>
                                                                        <RadioGroupItem value="full_time" />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal">
                                                                        Full-time (30+ hours/week)
                                                                    </FormLabel>
                                                                </FormItem>
                                                            </RadioGroup>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <FormField
                                                    control={learnerForm.control}
                                                    name="portfolio"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Portfolio URL (Optional)</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="https://yourportfolio.com" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={learnerForm.control}
                                                    name="github"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>GitHub URL (Optional)</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="https://github.com/yourusername" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <FormField
                                                control={learnerForm.control}
                                                name="expectations"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Your Expectations</FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder="What do you hope to gain from this program?"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <Separator />

                                            <FormField
                                                control={learnerForm.control}
                                                name="termsAccepted"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <div className="space-y-1 leading-none">
                                                            <FormLabel>
                                                                I agree to the terms and conditions
                                                            </FormLabel>
                                                            <FormDescription>
                                                                By checking this box, you agree to our{' '}
                                                                <a href="#" className="text-indigo-600 hover:underline">
                                                                    Terms of Service
                                                                </a>{' '}
                                                                and{' '}
                                                                <a href="#" className="text-indigo-600 hover:underline">
                                                                    Privacy Policy
                                                                </a>
                                                            </FormDescription>
                                                        </div>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                                {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                                            </Button>
                                        </form>
                                    </Form>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="business">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Business Application</CardTitle>
                                    <CardDescription>
                                        Join as a business to get matched with skilled developers for your projects
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Form {...businessForm}>
                                        <form onSubmit={businessForm.handleSubmit(handleBusinessSubmit)} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <FormField
                                                    control={businessForm.control}
                                                    name="companyName"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Company Name</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Enter your company name" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={businessForm.control}
                                                    name="industry"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Industry</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="e.g., Technology, Healthcare, Finance" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <FormField
                                                control={businessForm.control}
                                                name="companySize"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Company Size</FormLabel>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select company size" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="1-10">1-10 employees</SelectItem>
                                                                <SelectItem value="11-50">11-50 employees</SelectItem>
                                                                <SelectItem value="51-200">51-200 employees</SelectItem>
                                                                <SelectItem value="201-500">201-500 employees</SelectItem>
                                                                <SelectItem value="500+">500+ employees</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={businessForm.control}
                                                name="projectDescription"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Project Description</FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder="Describe your project in detail"
                                                                {...field}
                                                                className="min-h-32"
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            Include information about your project goals, challenges, and technologies
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <FormField
                                                    control={businessForm.control}
                                                    name="timeline"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Project Timeline</FormLabel>
                                                            <Select
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select timeline" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    <SelectItem value="1-3_months">1-3 months</SelectItem>
                                                                    <SelectItem value="3-6_months">3-6 months</SelectItem>
                                                                    <SelectItem value="6-12_months">6-12 months</SelectItem>
                                                                    <SelectItem value="12+_months">12+ months</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={businessForm.control}
                                                    name="budget"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Budget Range</FormLabel>
                                                            <Select
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select budget range" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    <SelectItem value="under_5k">Under $5,000</SelectItem>
                                                                    <SelectItem value="5k-15k">$5,000 - $15,000</SelectItem>
                                                                    <SelectItem value="15k-50k">$15,000 - $50,000</SelectItem>
                                                                    <SelectItem value="50k+">$50,000+</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <FormField
                                                control={businessForm.control}
                                                name="teamSize"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Preferred Team Size</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="e.g., 2-3 developers" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <Separator />

                                            <FormField
                                                control={businessForm.control}
                                                name="termsAccepted"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <div className="space-y-1 leading-none">
                                                            <FormLabel>
                                                                I agree to the terms and conditions
                                                            </FormLabel>
                                                            <FormDescription>
                                                                By checking this box, you agree to our{' '}
                                                                <a href="#" className="text-indigo-600 hover:underline">
                                                                    Terms of Service
                                                                </a>{' '}
                                                                and{' '}
                                                                <a href="#" className="text-indigo-600 hover:underline">
                                                                    Privacy Policy
                                                                </a>
                                                            </FormDescription>
                                                        </div>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                                {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                                            </Button>
                                        </form>
                                    </Form>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
};

export default ApplicationPage;