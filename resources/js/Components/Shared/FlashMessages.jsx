import { usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FlashMessages() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (flash.message || flash.error) {
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    return (
        <AnimatePresence>
            {visible && (flash.message || flash.error) && (
                <motion.div
                    className="fixed top-4 right-4 z-50 max-w-md"
                    initial={{ opacity: 0, y: -50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                >
                    <div
                        className={`px-6 py-4 rounded-lg shadow-lg ${
                            flash.error
                                ? 'bg-red-500 text-white'
                                : 'bg-green-500 text-white'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <p className="font-medium">{flash.message || flash.error}</p>
                            <button
                                onClick={() => setVisible(false)}
                                className="ml-4 text-white hover:text-gray-200 transition-colors"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
