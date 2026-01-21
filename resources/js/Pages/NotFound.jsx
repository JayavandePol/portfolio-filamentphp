import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import AppLayout from '../Layouts/AppLayout';

export default function NotFound() {
    return (
        <AppLayout>
            <Head title="404 - Page Not Found" />
            
            <div className="min-h-[80vh] flex items-center justify-center px-4">
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* 404 Number */}
                        <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-electric via-purple-400 to-electric bg-clip-text text-transparent mb-6">
                            404
                        </h1>
                        
                        {/* Message */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                        >
                            Page Not Found
                        </motion.h2>
                        
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-lg text-muted-foreground mb-12 max-w-md mx-auto"
                        >
                            The page you're looking for doesn't exist or has been moved.
                        </motion.p>
                        
                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        >
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-electric text-background rounded-lg font-medium hover:bg-electric/90 transition-all duration-200 shadow-lg shadow-electric/25"
                            >
                                <Home className="w-5 h-5" />
                                Back to Home
                            </Link>
                            
                            <button
                                onClick={() => window.history.back()}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border/50 text-foreground rounded-lg font-medium hover:border-electric/50 transition-all duration-200"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Go Back
                            </button>
                        </motion.div>
                    </motion.div>
                    
                    {/* Decorative Background */}
                    <div className="absolute inset-0 -z-10 overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-electric/5 rounded-full blur-3xl" />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
