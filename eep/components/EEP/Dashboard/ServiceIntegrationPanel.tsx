import { Button } from "@/components/ui/button";
import { ServiceIntegrationPanelProps } from "@/types/eep-dashboard";
import { useState } from "react";
import { motion } from "framer-motion";

export const ServiceIntegrationPanel: React.FC<ServiceIntegrationPanelProps> = ({
    selectedService,
    selectedCloud
  }) => {
    const [integrationSteps, setIntegrationSteps] = useState<number>(1);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Service Integration: {selectedService.name}
          </h3>
          <span className="px-3 py-1 text-sm bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-full">
            {selectedCloud}
          </span>
        </div>
  
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  integrationSteps >= step
                    ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 ${
                    integrationSteps > step
                      ? 'bg-gradient-to-r from-green-400 to-blue-500'
                      : 'bg-gray-100'
                  }`} />
                )}
              </div>
            ))}
          </div>
  
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Configure</h4>
              <p className="text-sm text-gray-600">Set up your service parameters</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Connect</h4>
              <p className="text-sm text-gray-600">Link with other services</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Deploy</h4>
              <p className="text-sm text-gray-600">Launch your service</p>
            </div>
          </div>
  
          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => setIntegrationSteps(Math.max(1, integrationSteps - 1))}
              disabled={integrationSteps === 1}
            >
              Previous
            </Button>
            <Button
              className="bg-gradient-to-r from-blue-500 to-violet-500"
              onClick={() => setIntegrationSteps(Math.min(3, integrationSteps + 1))}
              disabled={integrationSteps === 3}
            >
              {integrationSteps === 3 ? 'Complete' : 'Next'}
            </Button>
          </div>
        </div>
      </motion.div>
    );
  };