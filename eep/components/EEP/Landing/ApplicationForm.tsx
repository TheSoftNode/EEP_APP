import React, { useState } from 'react';
import {
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  FileIcon,
  X,
  User,
  Mail,
  Phone,
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from '@/hooks/use-toast';
import TermsAndConditions from './TermsAndConditions';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  interests: string;
  cv: File | null;
  acceptedTerms: boolean;
}


export const ApplicationForm: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    interests: '',
    cv: null,
    acceptedTerms: false
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    if (!formData.cv) {
      newErrors.cv = 'CV is required';
    }

    if (!formData.acceptedTerms) {
      newErrors.acceptedTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please check all required fields",
        variant: "destructive"
      });
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("interests", formData.interests);
    if (formData.cv) {
      formDataToSend.append("cv", formData.cv); // Append the file
    }
    formDataToSend.append("acceptedTerms", formData.acceptedTerms.toString());

    console.log(formData);

    setIsSubmitting(true);
    try {
      // Simulated API call
      const response = await fetch('https://hitoai-backend.onrender.com/api/v1/eep/apply', {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result);
      toast({
        title: "Application Submitted",
        description: "We'll review your application and get back to you soon.",
      });
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        interests: '',
        cv: null,
        acceptedTerms: false
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later",
        variant: "destructive"
      });
      console.log(error)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          cv: 'File size should not exceed 5MB'
        }));
        return;
      }

      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          cv: 'Please upload a PDF or Word document'
        }));
        return;
      }

      setFormData(prev => ({ ...prev, cv: file }));
      setErrors(prev => ({ ...prev, cv: undefined }));
    }
  };

  const removeFile = () => {
    setFormData(prev => ({ ...prev, cv: null }));
  };

  return (
    <Card className="border-2 border-blue-100 bg-gradient-to-b from-white to-blue-50/30">
      <CardHeader className="pb-8 text-center space-y-4">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Apply Now
        </CardTitle>
        <CardDescription className="text-lg text-gray-600">
          Start your journey towards becoming an AI and cloud technology expert
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
          {/* Input fields with icons */}
          <div className="space-y-6">
            <div className="relative">
              <Label htmlFor="fullName" className="text-sm font-medium mb-2 block">
                Full Name
              </Label>
              <div className="relative">
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, fullName: e.target.value }));
                    setErrors(prev => ({ ...prev, fullName: undefined }));
                  }}
                  className={`pl-12 py-6 ${errors.fullName ? "border-red-500" : "border-blue-200"} focus:border-blue-500`}
                  placeholder="Enter your full name"
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
              {errors.fullName && (
                <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>
              )}
            </div>

            <div className="relative">
              <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                Email Address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, email: e.target.value }));
                    setErrors(prev => ({ ...prev, email: undefined }));
                  }}
                  className={`pl-12 py-6 ${errors.email ? "border-red-500" : "border-blue-200"} focus:border-blue-500`}
                  placeholder="Enter your email address"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <Label htmlFor="phone" className="text-sm font-medium mb-2 block">
                Phone Number
              </Label>
              <div className="relative">
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, phone: e.target.value }));
                    setErrors(prev => ({ ...prev, phone: undefined }));
                  }}
                  className={`pl-12 py-6 ${errors.phone ? "border-red-500" : "border-blue-200"} focus:border-blue-500`}
                  placeholder="Enter your phone number"
                />
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
              {errors.phone && (
                <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Interests Textarea */}
            <div className="relative">
              <Label htmlFor="interests" className="text-sm font-medium mb-2 block">
                Your Interests
              </Label>
              <div className="relative">
                <textarea
                  id="interests"
                  value={formData.interests}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, interests: e.target.value }));
                    setErrors(prev => ({ ...prev, interests: undefined }));
                  }}
                  className={`w-full min-h-[120px] p-4 rounded-md border ${errors.interests ? "border-red-500" : "border-blue-200"
                    } focus:border-blue-500 resize-none`}
                  placeholder="Tell us about your interests and what you hope to achieve..."
                />
              </div>
              {errors.interests && (
                <p className="text-sm text-red-500 mt-1">{errors.interests}</p>
              )}
            </div>

            {/* CV Upload Section */}
            <div className="space-y-2">
              <Label htmlFor="cv">Upload CV</Label>
              {!formData.cv ? (
                <div className="flex items-center justify-center w-full">
                  <Label
                    htmlFor="cv"
                    className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-50 transition-colors"
                  >
                    <UploadCloud className="w-8 h-8 text-blue-500" />
                    <span className="mt-2 text-[0.8rem] sm:text-base leading-normal">Select a file</span>
                    <span className="text-[0.7rem] sm:text-sm text-gray-500 mt-1">PDF or Word document, max 5MB</span>
                    <Input
                      id="cv"
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                    />
                  </Label>
                </div>
              ) : (
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <FileIcon className="h-4 w-4 sm:w-6 sm:h-6 text-blue-500" />
                    <span className="text-[0.7rem] sm:text-sm font-medium">{formData.cv.name}</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
              {errors.cv && (
                <p className="text-sm text-red-500 mt-1">{errors.cv}</p>
              )}
            </div>
          </div>

          {/* Terms and Alert Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.acceptedTerms}
                onCheckedChange={(checked: boolean) => {
                  setFormData(prev => ({ ...prev, acceptedTerms: checked }));
                  setErrors(prev => ({ ...prev, acceptedTerms: undefined }));
                }}
              />
              <div className="flex items-center space-x-2">
                <Label htmlFor="terms" className='text-[0.7rem] sm:text-sm'>I accept that</Label>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" className="p-0 h-auto font-normal text-blue-500 text-[0.7rem] sm:text-base">
                      terms and conditions
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Terms and Conditions</DialogTitle>
                      <DialogDescription>
                        Please read these terms carefully before applying
                      </DialogDescription>
                    </DialogHeader>
                    <TermsAndConditions />
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Alert className="bg-amber-50 text-amber-900 border-amber-200">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-800">Administration Fee</AlertTitle>
              <AlertDescription className="text-amber-700">
                €500 - Please do not make any payment until your application has been approved.
              </AlertDescription>
            </Alert>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 rounded-lg shadow-lg transition-all duration-300"
                disabled={isSubmitting || !formData.acceptedTerms}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <CheckCircle2 className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ApplicationForm;