import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Testimonials({ testimonials }) {
    if (!testimonials || testimonials.length === 0) return null;

    return (
        <section className="py-32 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-electric/5 blur-[120px] rounded-full" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Client Stories
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Don't just take my word for it
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {testimonials.slice(0, 3).map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-8 rounded-2xl hover:bg-white/[0.04] transition-colors flex flex-col h-full"
                        >
                            <div className="flex items-center mb-6">
                                {testimonial.avatar_url ? (
                                    <img
                                        src={testimonial.avatar_url}
                                        alt={testimonial.author_name}
                                        className="w-14 h-14 rounded-full mr-4 border-2 border-electric/30 p-0.5 object-cover"
                                    />
                                ) : (
                                    <div className="w-14 h-14 rounded-full mr-4 border-2 border-electric/30 bg-muted flex items-center justify-center text-xl font-bold">
                                        {testimonial.author_name.charAt(0)}
                                    </div>
                                )}
                                <div>
                                    <p className="font-bold text-white text-lg">{testimonial.author_name}</p>
                                    {testimonial.company && (
                                        <p className="text-electric text-sm">{testimonial.company}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Sparkles
                                        key={i}
                                        className={cn(
                                            'w-4 h-4 mr-1',
                                            i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-700'
                                        )}
                                    />
                                ))}
                            </div>
                            <p className="text-gray-300 leading-relaxed italic relative flex-grow">
                                "{testimonial.content}"
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
