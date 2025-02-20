import React from 'react';
import {
Card,
CardHeader,
CardTitle,
} from "@/components/ui/card";
import { motion } from 'framer-motion';
import { masteryModules } from '../data/eep-data';

export const MasterySection: React.FC = () => {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-6">
          <span className="text-red-500">🔥</span> What You&apos;ll Master in the Enterprise Engagement Program (EEP) &ndash; AI Track
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive skills and technologies you&apos;ll master during the program
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {masteryModules.map((module, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-500">
              <CardHeader className="pb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <module.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      {/* <span className="text-2xl">{module.emoji}</span> */}
                      <CardTitle className="text-xl font-bold">
                        {module.title}
                      </CardTitle>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {module.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-xl font-semibold text-blue-600">
          🔗 Join Now & Power Up Your AI Journey! 💡
        </p>
      </div>
    </section>
  );
};

export default MasterySection;