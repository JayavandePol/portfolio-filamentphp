import { motion } from 'framer-motion';
import { getLucideIcon } from '../../lib/icons';

export default function SocialConnect({ socialLinks = [] }) {
    if (socialLinks.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16"
        >
            <h2 className="text-2xl font-bold text-center mb-8">
                Connect on Social Media
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
                {socialLinks.map((social, index) => (
                    <motion.a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="group flex items-center gap-3 bg-card border border-border/50 rounded-xl px-5 py-3 hover:border-electric/50 hover:bg-card/80 transition-all duration-300"
                    >
                        <div className="text-muted-foreground group-hover:text-electric transition-colors">
                            {getLucideIcon(social.icon, "w-5 h-5")}
                        </div>
                        <span className="font-medium text-foreground group-hover:text-electric transition-colors">
                            {social.platform}
                        </span>
                    </motion.a>
                ))}
            </div>
        </motion.div>
    );
}
