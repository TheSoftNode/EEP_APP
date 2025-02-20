import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import {
  GitBranchIcon,
  CloudIcon,
  UsersIcon,
  BuildingIcon,
  GlobeIcon,
  BrainCircuitIcon,
  RocketIcon,
  DatabaseIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from 'lucide-react';

interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
  details: string[];
}

export const BenefitsSection: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const benefits: Benefit[] = [
    {
      icon: GitBranchIcon,
      title: "Enterprise GitHub for Version Control",
      description: "Leverage enterprise-level GitHub for seamless collaboration",
      details: [
        "Advanced code management features",
        "Real-world AI project collaboration",
        "Professional version control workflows",
        "Team collaboration tools and features"
      ]
    },
    {
      icon: RocketIcon,
      title: "Enterprise Render for AI-Powered Development",
      description: "Deploy and scale AI-driven applications effortlessly",
      details: [
        "Enterprise Render platform access",
        "Robust cloud-based solutions",
        "Efficient deployment pipelines",
        "Scalable application infrastructure"
      ]
    },
    {
      icon: DatabaseIcon,
      title: "Enterprise-Grade PostgreSQL",
      description: "Master PostgreSQL for enterprise-level data management",
      details: [
        "Complex query optimization",
        "Advanced database management",
        "Enterprise data handling",
        "Performance tuning expertise"
      ]
    },
    {
      icon: UsersIcon,
      title: "Exclusive 1:1 AI Mentorship",
      description: "20 personalized mentorship sessions with Deep Tech experts",
      details: [
        "One-on-one guidance sessions",
        "Deep Tech startup expert mentoring",
        "Cutting-edge AI application training",
        "Industry best practices coaching"
      ]
    },
    {
      icon: BuildingIcon,
      title: "Get Hired by HitoAI Limited",
      description: "Join HitoAI Limited and work on industry-leading projects",
      details: [
        "Direct employment opportunities",
        "Work with AI industry leaders",
        "Professional project experience",
        "Career advancement paths"
      ]
    },
    {
      icon: GlobeIcon,
      title: "Expansive Network Access",
      description: "Connect with 5,000+ startups and initiatives",
      details: [
        "Extensive startup network access",
        "AI technology networking",
        "Career opportunity connections",
        "Industry partnership possibilities"
      ]
    },
    {
      icon: CloudIcon,
      title: "Enterprise-Grade Cloud Access",
      description: "Comprehensive cloud platform experience",
      details: [
        "AWS Enterprise Console access",
        "Microsoft Azure Enterprise platform",
        "Google Cloud Platform (GCP) Enterprise Support",
        "Cloud-based AI development tools"
      ]
    },
    {
      icon: BrainCircuitIcon,
      title: "AI Research & Development Support",
      description: "Push the boundaries of AI innovation",
      details: [
        "Enterprise cloud infrastructure",
        "Advanced AI development tools",
        "Research support and resources",
        "Innovation mentorship"
      ]
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader className="px-4 sm:px-6 pt-8">
        <CardTitle className="text-2xl sm:text-3xl font-bold text-center mb-2">
          Key Benefits
        </CardTitle>
        <CardDescription className="text-center text-base sm:text-lg">
          Exclusive advantages that accelerate your AI career growth
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {benefits.map((benefit, index) => (
            <Collapsible
              key={index}
              open={expandedIndex === index}
              onOpenChange={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <Card className="border hover:border-blue-500 transition-all duration-300">
                <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-3">
                    {/* Icon Section */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <benefit.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 space-y-2">
                      <div>
                        <CardTitle className="text-base sm:text-lg font-semibold">
                          {benefit.title}
                        </CardTitle>
                        <CardDescription className="text-sm mt-1">
                          {benefit.description}
                        </CardDescription>
                      </div>

                      {/* Toggle Button */}
                      <div className="flex justify-end">
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-blue-50"
                          >
                            {expandedIndex === index ? (
                              <ChevronUpIcon className="h-4 w-4" />
                            ) : (
                              <ChevronDownIcon className="h-4 w-4" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent className="pt-0 px-4 sm:px-6 pb-4">
                    <ul className="space-y-2 mt-2 pl-4">
                      {benefit.details.map((detail, idx) => (
                        <li
                          key={idx}
                          className="text-sm sm:text-base text-gray-600 list-disc marker:text-blue-500"
                        >
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BenefitsSection;