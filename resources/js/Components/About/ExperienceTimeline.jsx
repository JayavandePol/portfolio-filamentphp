import { motion } from 'framer-motion';

export default function ExperienceTimeline({ experiences = [] }) {
    const formatDate = (date) => {
        if (!date) return 'Present';
        return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <section className="py-20">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                        Work Experience
                    </h2>

                    {experiences.length > 0 ? (
                        <div className="max-w-4xl mx-auto">
                            <div className="relative">
                                {/* Timeline line */}
                                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border/50" />

                                <div className="space-y-12">
                                    {experiences.map((experience, index) => (
                                        <motion.div
                                            key={experience.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="relative pl-20"
                                        >
                                            {/* Timeline dot */}
                                            <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-electric border-4 border-background" />

                                            {/* Logo */}
                                            {experience.logo_url && (
                                                <div className="absolute left-0 top-0 w-16 h-16 rounded-xl bg-card border border-border/50 flex items-center justify-center overflow-hidden">
                                                    <img
                                                        src={experience.logo_url}
                                                        alt={experience.company}
                                                        className="w-12 h-12 object-contain"
                                                    />
                                                </div>
                                            )}

                                            {/* Content */}
                                            <div className="bg-card border border-border/50 rounded-xl p-6 hover:border-electric/50 transition-colors">
                                                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-foreground mb-1">
                                                            {experience.position}
                                                        </h3>
                                                        <p className="text-electric font-medium">
                                                            {experience.company}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-2 md:mt-0">
                                                        <span className="text-sm text-muted-foreground">
                                                            {formatDate(experience.start_date)} - {experience.is_current ? 'Present' : formatDate(experience.end_date)}
                                                        </span>
                                                        {experience.is_current && (
                                                            <span className="px-2 py-1 text-xs font-medium bg-electric/10 text-electric rounded-full">
                                                                Current
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {experience.description && (
                                                    <div
                                                        className="prose prose-invert prose-sm max-w-none text-muted-foreground"
                                                        dangerouslySetInnerHTML={{ __html: experience.description }}
                                                    />
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground">
                            No work experience added yet
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
