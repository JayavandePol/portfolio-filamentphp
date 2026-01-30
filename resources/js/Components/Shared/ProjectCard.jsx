import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from '../UI';

export default function ProjectCard({ project, index = 0 }) {
    const cardRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        };

        card.addEventListener('mousemove', handleMouseMove);
        return () => card.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
        >
            <div
                ref={cardRef}
                className="spotlight group relative h-full bg-card/70 backdrop-blur-md border border-border/50 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-electric/60 transition-all duration-300 hover:scale-[1.025] active:scale-[0.98]"
            >
                {/* Hero Image */}
                {project.hero_image_url && (
                    <div className="relative w-full h-48 overflow-hidden bg-muted">
                        <img
                            src={project.hero_image_url}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                    </div>
                )}

                {/* Content */}
                <div className="p-6 space-y-4">
                    {/* Status Badge */}
                    <div className="flex items-center justify-between">
                        <Badge variant={project.status === 'completed' ? 'success' : 'warning'}>
                            {project.status}
                        </Badge>

                        {project.url && (
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Visit project"
                            >
                                <ArrowUpRight className="h-4 w-4" />
                            </a>
                        )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-electric transition-colors">
                        {project.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-sm text-muted-foreground line-clamp-3">
                        {project.summary || 'No description available.'}
                    </p>

                    {/* Technologies */}
                    {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.slice(0, 3).map((tech, i) => (
                                <span
                                    key={i}
                                    className="text-xs px-2 py-1 rounded-md bg-secondary/50 text-muted-foreground"
                                >
                                    {tech}
                                </span>
                            ))}
                            {project.technologies.length > 3 && (
                                <span className="text-xs px-2 py-1 rounded-md bg-secondary/50 text-muted-foreground">
                                    +{project.technologies.length - 3} more
                                </span>
                            )}
                        </div>
                    )}

                    {/* Read More Link */}
                    <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-electric hover:underline group/link"
                    >
                        Read more
                        <ArrowUpRight className="h-3 w-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
