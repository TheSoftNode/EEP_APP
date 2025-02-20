import React from 'react';
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
import { 
  ChevronDownIcon, 
  ChevronUpIcon,
  ArrowRightIcon
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Capability {
  title: string;
  description: string;
  details?: string[];
  icon: React.ElementType;
}

interface TrackProps {
  title: string;
  description: string;
  icon: React.ElementType;
  capabilities: Capability[];
}

export const TrackCard: React.FC<TrackProps> = ({
  title,
  description,
  icon: Icon,
  capabilities
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Card className="w-full group transition-all duration-300 hover:shadow-lg">
      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold">{title}</CardTitle>
              <CardDescription className="text-base">
                {description}
              </CardDescription>
            </div>
          </div>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className="rounded-full h-10 w-10 p-0 hover:bg-blue-50"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <ChevronUpIcon className="h-6 w-6 text-blue-500" />
              ) : (
                <ChevronDownIcon className="h-6 w-6 text-blue-500" />
              )}
            </Button>
          </CollapsibleTrigger>
        </div>
        {!isOpen && (
          <div className="mt-4 flex flex-wrap gap-2">
            {capabilities.map((cap, idx) => (
              <Badge 
                key={idx} 
                variant="secondary"
                className="bg-blue-50 text-blue-700 hover:bg-blue-100"
              >
                {cap.title}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleContent>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {capabilities.map((capability, index) => (
                <Card 
                  key={index} 
                  className="border-2 hover:border-blue-500 transition-all duration-300 hover:shadow-md bg-white overflow-hidden group"
                >
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-white shadow-sm">
                        <capability.icon className="w-5 h-5 text-blue-500" />
                      </div>
                      <CardTitle className="text-lg font-semibold">
                        {capability.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {capability.description}
                    </p>
                    {capability.details && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm text-gray-700 mb-2">Key Learning Points:</h4>
                        <ul className="space-y-2">
                          {capability.details.map((detail, idx) => (
                            <li 
                              key={idx} 
                              className="flex items-start text-sm text-gray-600 group-hover:text-gray-900"
                            >
                              <ArrowRightIcon className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default TrackCard;