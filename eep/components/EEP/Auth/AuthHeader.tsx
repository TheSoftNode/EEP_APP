import { motion } from 'framer-motion';

const AuthHeader = ({ title, description }: { title: string; description: string }) => (
    <div className="text-center mb-8 mt-5">
        {/* <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-4"
        >
            <span className="px-4 py-2 rounded-full bg-white/80 text-blue-600 text-sm font-medium shadow-sm border border-blue-100 backdrop-blur-sm">
                EEP Platform
            </span>
        </motion.div> */}
        <motion.h1
            className="text-3xl font-bold text-gray-800 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
        >
            {title}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500">
                {" "}Platform
            </span>
        </motion.h1>
        <motion.p
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
        >
            {description}
        </motion.p>
    </div>
);

export default AuthHeader;