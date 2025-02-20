// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Plus, ArrowRight, Menu } from 'lucide-react';
// import {
// Card,
// CardContent,
// CardDescription,
// CardHeader,
// CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Sidebar } from './Sidebar';
// import CloudSelector from './CloudSelector';
// import { cloudServices } from '@/config/eep-cloudServices';
// import { CloudProvider, CloudService, ServiceCategory } from '@/types/eep-dashboard';
// import { ServiceIntegrationPanel } from './ServiceIntegrationPanel';


// const Dashboard: React.FC = () => {
//     const [selectedCloud, setSelectedCloud] = useState<CloudProvider>('AWS');
//     const [selectedService, setSelectedService] = useState<ServiceCategory>('databases');
//     const [selectedServiceItem, setSelectedServiceItem] = useState<CloudService | null>(null);

//     const handleCloudSelect = (cloud: CloudProvider) => {
//         setSelectedCloud(cloud);
//         setSelectedServiceItem(null);
//     };

//     const handleServiceSelect = (service: ServiceCategory) => {
//         setSelectedService(service);
//         setSelectedServiceItem(null);
//     };

//     return (
//         <div className="min-h-screen"> {/* Add top padding for navbar */}
//             <div className="flex">
//                 {/* Sidebar */}
//                 <Sidebar
//                     selectedCloud={selectedCloud}
//                     selectedService={selectedService}
//                     onServiceSelect={handleServiceSelect}
//                 />

//                 {/* Main Content */}
//                 <div className="flex-1">
//                     <div className="p-8">
//                         {/* Header with cloud selector */}
//                         <div className="sticky top-16 z-10 bg-white/80 backdrop-blur-sm mb-8 py-4">
//                             <div className="flex items-center justify-between">
//                                 <div className="flex items-center space-x-4"> {/* Added flex container */}
//                                     <div>
//                                         <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                                             Cloud Services Dashboard
//                                         </h1>
//                                         <div className="h-1 w-32 bg-gradient-to-r from-green-400 via-blue-500 to-violet-600"></div>
//                                     </div>
//                                     <Button
//                                         variant="outline"
//                                         size="sm"
//                                         className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
//                                         onClick={() => window.location.href = '/EEP'}
//                                     >
//                                         ← Back to EEP
//                                     </Button>
//                                 </div>

//                                 <CloudSelector
//                                     selectedCloud={selectedCloud}
//                                     onCloudSelect={handleCloudSelect}
//                                 />
//                             </div>
//                         </div>

//                         {/* Service Cards Grid */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                             {cloudServices[selectedCloud][selectedService].map((service, index) => (
//                                 <motion.div
//                                     key={service.name}
//                                     initial={{ opacity: 0, y: 20 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     transition={{ delay: index * 0.1 }}
//                                 >
//                                     <Card
//                                         className={`cursor-pointer transition-all hover:shadow-lg ${selectedServiceItem?.name === service.name
//                                             ? 'ring-2 ring-blue-500 shadow-lg'
//                                             : ''
//                                             }`}
//                                         onClick={() => setSelectedServiceItem(service)}
//                                     >
//                                         <CardHeader>
//                                             <CardTitle className="text-xl flex items-center justify-between">
//                                                 {service.name}
//                                                 <motion.button
//                                                     className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-500 flex items-center justify-center"
//                                                     whileHover={{ scale: 1.1 }}
//                                                     whileTap={{ scale: 0.9 }}
//                                                 >
//                                                     <Plus className="w-5 h-5" />
//                                                 </motion.button>
//                                             </CardTitle>
//                                             <CardDescription>{service.description}</CardDescription>
//                                         </CardHeader>
//                                         <CardContent>
//                                             <div className="space-y-4">
//                                                 <div className="space-y-2">
//                                                     {service.features.map((feature) => (
//                                                         <div key={feature} className="flex items-center text-sm text-gray-600">
//                                                             <div className="w-1 h-1 rounded-full bg-gradient-to-r from-blue-400 to-violet-400 mr-2"></div>
//                                                             {feature}
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                                 <div className="flex justify-between items-center pt-4 border-t">
//                                                     <Button
//                                                         variant="outline"
//                                                         size="sm"
//                                                         className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
//                                                     >
//                                                         Details
//                                                         <ArrowRight className="w-4 h-4 ml-2" />
//                                                     </Button>
//                                                     <Button
//                                                         variant="default"
//                                                         size="sm"
//                                                         className="bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 text-white hover:from-blue-600 hover:via-indigo-600 hover:to-violet-600"
//                                                     >
//                                                         Create
//                                                         <Plus className="w-4 h-4 ml-2" />
//                                                     </Button>
//                                                 </div>
//                                             </div>
//                                         </CardContent>
//                                     </Card>
//                                 </motion.div>
//                             ))}
//                         </div>

//                         {/* Service Integration Panel */}
//                         {selectedServiceItem && (
//                             <motion.div
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 className="mb-8"
//                             >
//                                 <ServiceIntegrationPanel
//                                     selectedService={selectedServiceItem}
//                                     selectedCloud={selectedCloud}
//                                 />
//                             </motion.div>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="lg:hidden fixed bottom-4 right-4 z-30">
//                 <Button
//                     size="lg"
//                     className="rounded-full w-12 h-12 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 shadow-lg"
//                 >
//                     <Menu className="w-6 h-6" />
//                 </Button>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;

// components/EEP/Dashboard/Dashboard.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, ArrowRight, Menu } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sidebar } from './Sidebar';
import CloudSelector from './CloudSelector';
import { cloudServices } from '@/config/eep-cloudServices';
import { CloudProvider, CloudService, ServiceCategory } from '@/types/eep-dashboard';
import { ServiceIntegrationPanel } from './ServiceIntegrationPanel';


const Dashboard: React.FC = () => {
    const [selectedCloud, setSelectedCloud] = useState<CloudProvider>('AWS');
    const [selectedService, setSelectedService] = useState<ServiceCategory>('databases');
    const [selectedServiceItem, setSelectedServiceItem] = useState<CloudService | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleCloudSelect = (cloud: CloudProvider) => {
        setSelectedCloud(cloud);
        setSelectedServiceItem(null);
    };

    const handleServiceSelect = (service: ServiceCategory) => {
        setSelectedService(service);
        setSelectedServiceItem(null);
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="min-h-screen flex flex-col">

            <main className="flex-1 flex flex-col md:flex-row">
                {/* Sidebar - Hidden on mobile, shown through menu */}
                <div className={`
          fixed inset-y-0 left-0 transform md:relative md:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          transition-transform duration-300 ease-in-out md:flex
          ${isMobileMenuOpen ? 'z-50' : 'z-30'}
          md:w-64 md:flex-shrink-0
        `}>
                    <Sidebar
                        selectedCloud={selectedCloud}
                        selectedService={selectedService}
                        onServiceSelect={handleServiceSelect}
                    />
                </div>

                {/* Backdrop for mobile menu */}
                {isMobileMenuOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}

                {/* Main Content Area */}
                <div className="flex-1 min-w-0 overflow-hidden">
                    <div className="p-4 sm:p-6 lg:p-8">
                        {/* Header with cloud selector */}
                        <div className="sticky top-16 z-20 bg-white/80 backdrop-blur-sm -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 py-4 mb-8">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="flex items-center">
                                    {/* Mobile menu button */}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="mr-4 md:hidden"
                                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    >
                                        <Menu className="h-8 w-8" />
                                    </Button>
                                    <div>
                                        <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2">
                                            Cloud Services Dashboard
                                        </h1>
                                        <div className="h-1 w-32 bg-gradient-to-r from-green-400 via-blue-500 to-violet-600"></div>
                                    </div>
                                </div>
                                <div className="w-full sm:w-auto">
                                    <CloudSelector
                                        selectedCloud={selectedCloud}
                                        onCloudSelect={handleCloudSelect}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Service Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                            {cloudServices[selectedCloud][selectedService].map((service, index) => (
                                <motion.div
                                    key={service.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card
                                        className={`cursor-pointer transition-all hover:shadow-lg ${selectedServiceItem?.name === service.name
                                            ? 'ring-2 ring-blue-500 shadow-lg'
                                            : ''
                                            }`}
                                        onClick={() => setSelectedServiceItem(service)}
                                    >
                                        <CardHeader>
                                            <CardTitle className="text-xl flex items-center justify-between">
                                                <span className="truncate mr-2">{service.name}</span>
                                                <motion.button
                                                    className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-500 flex items-center justify-center flex-shrink-0"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <Plus className="w-5 h-5" />
                                                </motion.button>
                                            </CardTitle>
                                            <CardDescription className="line-clamp-2">
                                                {service.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    {service.features.map((feature) => (
                                                        <div key={feature} className="flex items-center text-sm text-gray-600">
                                                            <div className="w-1 h-1 rounded-full bg-gradient-to-r from-blue-400 to-violet-400 mr-2 flex-shrink-0"></div>
                                                            <span className="line-clamp-1">{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2 pt-4 border-t">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                                                    >
                                                        Details
                                                        <ArrowRight className="w-4 h-4 ml-2" />
                                                    </Button>
                                                    <Button
                                                        variant="default"
                                                        size="sm"
                                                        className="bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 text-white hover:from-blue-600 hover:via-indigo-600 hover:to-violet-600"
                                                    >
                                                        Create
                                                        <Plus className="w-4 h-4 ml-2" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>

                        {/* Service Integration Panel */}
                        {selectedServiceItem && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-8"
                            >
                                <ServiceIntegrationPanel
                                    selectedService={selectedServiceItem}
                                    selectedCloud={selectedCloud}
                                />
                            </motion.div>
                        )}
                    </div>
                </div>
            </main>

        </div>
    );
};

export default Dashboard;