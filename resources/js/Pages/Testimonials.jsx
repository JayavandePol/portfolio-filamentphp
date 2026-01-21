import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import AppLayout from '../Layouts/AppLayout';

export default function Testimonials({ testimonials }) {
    return (
        <AppLayout>
            <Head title="Testimonials" />

            <div className="min-h-screen py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-16 space-y-4">
                        <motion.h1
                            className="text-4xl md:text-5xl font-bold text-foreground"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            Testimonials
                        </motion.h1>
                        <motion.p
                            className="text-lg text-muted-foreground max-w-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            What clients and collaborators say about working with me
                        </motion.p>
                    </div>

                    {/* Testimonials Grid */}
                    {testimonials && testimonials.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={testimonial.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-card border border-border/50 rounded-xl p-6 hover:border-border transition-colors"
                                >
                                    <div className="flex items-center mb-4">
                                        {testimonial.avatar_url ? (
                                            <motion.img 
                                                src={testimonial.avatar_url}
                                                alt={testimonial.author_name}
                                                className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-border/50"
                                                whileHover={{ scale: 1.1 }}
                                                transition={{ duration: 0.2 }}
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-secondary mr-4 flex items-center justify-center border-2 border-border/50">
                                                <span className="text-xl font-semibold text-foreground">
                                                    {testimonial.author_name.charAt(0)}
                                                </span>
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-semibold text-foreground">
                                                {testimonial.author_name}
                                            </p>
                                            {testimonial.company && (
                                                <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {testimonial.rating && (
                                        <div className="flex mb-3">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={cn(
                                                        'w-4 h-4',
                                                        i < testimonial.rating ? 'text-electric' : 'text-muted/30'
                                                    )}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    )}
                                    
                                    <p className="text-muted-foreground leading-relaxed">
                                        "{testimonial.content}"
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            className="text-center py-24"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <p className="text-muted-foreground text-lg">
                                No testimonials available at the moment.
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
