import { motion } from 'framer-motion';
import { getLucideIcon } from '../../lib/icons';

export default function SkillsGrid({ skills = [] }) {
    return (
        <section className="py-20 bg-card/30">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-['Poppins']">
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
                                            {getLucideIcon(skill.icon)}
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
                                                className="h-full rounded-full shadow-md"
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
    );
}
