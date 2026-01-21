import { Head } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

export default function About({ skills = [], experiences = [] }) {
    const getIcon = (iconName) => {
        if (!iconName) return null;
        const Icon = LucideIcons[iconName];
        return Icon ? <Icon className="w-6 h-6" /> : null;
    };

    const formatDate = (date) => {
        if (!date) return 'Present';
        return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };
    return (
        <AppLayout>
            <Head title="About" />
            
            <div className="min-h-screen bg-background text-foreground">
                {/* Hero Section */}
                <section className="pt-32 pb-20">
                    <div className="container-custom">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-4xl mx-auto"
                        >
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-electric via-purple-400 to-electric bg-clip-text text-transparent">
                                About Me
                            </h1>
                            <div className="prose prose-invert prose-lg max-w-none">
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Hi, I'm Jaya van de Pol — a passionate full-stack developer with a love for creating elegant, 
                                    performant web applications. I specialize in modern technologies like Laravel, React, and Vue.js, 
                                    with a keen eye for design and user experience.
                                </p>
                                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                    With years of experience in web development, I've worked on diverse projects ranging from 
                                    e-commerce platforms to enterprise applications. My approach combines technical excellence 
                                    with creative problem-solving, ensuring that every project not only works flawlessly but 
                                    also delivers an exceptional user experience.
                                </p>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
                                    projects, or sharing knowledge with the developer community. I believe in continuous learning 
                                    and staying at the forefront of web development trends.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Skills Section */}
                <section className="py-20 bg-card/30">
                    <div className="container-custom">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                                Skills & Technologies
                            </h2>
                            
                            {skills.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                                    {skills.map((skill, index) => (
                                        <motion.div
                                            key={skill.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.05 }}
                                            className="group relative bg-card border border-border/50 rounded-xl p-6 hover:border-electric/50 transition-all duration-300"
                                        >
                                            {/* Icon and Name */}
                                            <div className="flex flex-col items-center text-center space-y-3">
                                                <div 
                                                    className="w-12 h-12 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                                                    style={{ backgroundColor: `${skill.color}20`, color: skill.color }}
                                                >
                                                    {getIcon(skill.icon)}
                                                </div>
                                                <h3 className="font-semibold text-foreground group-hover:text-electric transition-colors">
                                                    {skill.name}
                                                </h3>
                                            </div>
                                            
                                            {/* Proficiency Bar */}
                                            <div className="mt-4">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-xs text-muted-foreground">Proficiency</span>
                                                    <span className="text-xs font-medium text-foreground">{skill.proficiency}%</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-border/30 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${skill.proficiency}%` }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 1, delay: index * 0.05 + 0.3 }}
                                                        className="h-full rounded-full"
                                                        style={{ backgroundColor: skill.color }}
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center text-muted-foreground">
                                    No skills added yet
                                </div>
                            )}
                        </motion.div>
                    </div>
                </section>

                {/* Experience Section */}
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
            </div>
        </AppLayout>
    );
}
