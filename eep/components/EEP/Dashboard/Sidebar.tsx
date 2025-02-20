import { ServiceCategory, ServiceCategoryInfo, SidebarProps } from '@/types/eep-dashboard';
import React from 'react';
import { motion } from 'framer-motion';
import {
  Database,
  Layout,
  Server,
} from 'lucide-react';

export const Sidebar: React.FC<SidebarProps> = ({
  selectedCloud,
  selectedService,
  onServiceSelect
}) => {
  const services: Record<ServiceCategory, ServiceCategoryInfo> = {
    databases: {
      icon: Database,
      label: 'Databases',
      description: 'Manage your cloud databases'
    },
    backend: {
      icon: Server,
      label: 'Backend Environment',
      description: 'Serverless and AI services'
    },
    frontend: {
      icon: Layout,
      label: 'Frontend Environment',
      description: 'Web and API solutions'
    }
  };

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 bg-gradient-to-b from-indigo-900 via-blue-900 to-blue-800 sticky top-16 h-[100vh] text-white"
    >
      <div className="h-full flex flex-col">
        <div className="p-6">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-lg font-semibold mb-2">{selectedCloud}</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-green-400 via-blue-500 to-violet-600"></div>
          </motion.div>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="space-y-2">
            {Object.entries(services).map(([key, { icon: Icon, label, description }]) => (
              <motion.button
                key={key}
                onClick={() => onServiceSelect(key as ServiceCategory)}
                className={`w-full p-4 rounded-lg transition-all duration-200 ${selectedService === key
                  ? 'bg-gradient-to-r from-blue-500/20 to-violet-500/20 border-l-4 border-green-400'
                  : 'hover:bg-white/10'
                  }`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <div className="text-left">
                    <p className="font-medium">{label}</p>
                    <p className="text-xs text-gray-300">{description}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </nav>
      </div>
    </motion.div>
  );
};