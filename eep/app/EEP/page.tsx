"use client"

import React from 'react';
import { RocketIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import MasterySection from '@/components/EEP/Landing/MasterySection';
import BenefitsSection from '@/components/EEP/Landing/BenefitsSection';
import ApplicationForm from '@/components/EEP/Landing/ApplicationForm';
import ChatPanel from '@/components/EEP/Landing/ChatPanel';

const EEPPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with sophisticated light background */}
      <div className="relative bg-gradient-to-b from-blue-50 via-blue-100/50 to-white overflow-hidden">
        <div className="absolute top-0 right-0 p-6 z-20">
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="ghost"
              className="text-gray-700 hover:text-gray-900 hover:bg-white/50 backdrop-blur-sm"
              onClick={() => window.location.href = '/EEP/login'}
            >
              Log In
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white shadow-sm backdrop-blur-sm"
              onClick={() => window.location.href = '/EEP/signup'}
            >
              Sign Up
            </Button>
          </div>
        </div>

        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 to-purple-200/20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-48">
          {/* Decorative elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] opacity-40">
              <div className="absolute inset-0 rotate-45 animate-pulse">
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
              </div>
            </div>
          </div>

          <motion.div className="text-center relative">
            <motion.div
              className="inline-block mb-4"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="px-4 py-2 rounded-full bg-white/80 text-blue-600 text-sm font-medium shadow-sm border border-blue-100 backdrop-blur-sm">
                Welcome to EEP
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl font-bold text-gray-800 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Enterprise Engagement Program
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                {" "}(EEP)
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Fast-track your career with cutting-edge AI advancements across enterprise cloud platforms.
              Join a globally recognized, industry-driven initiative and lead the future of AI!
            </motion.p>

            <motion.div
              className="flex justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Apply Now
                <RocketIcon className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('mastery-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Skills
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/80 border-blue-200 hover:bg-blue-50"
                onClick={() => window.location.href = '/EEP/dashboard'}
              >
                Access Dashboard
                <RocketIcon className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Content Container with contrasting background */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 pb-16">
          {/* Card container for content */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-16">
            {/* Mastery Section */}
            <motion.div
              id="mastery-section"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <MasterySection />
            </motion.div>

            {/* Benefits Section */}
            <motion.div
              id="benefits-section"
              className="mb-20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <BenefitsSection />
            </motion.div>

            {/* Application Form */}
            <motion.div
              id="application-form"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <ApplicationForm />
            </motion.div>
          </div>
        </div>
      </div>

      <ChatPanel />

    </div>
  );
};

export default EEPPage;