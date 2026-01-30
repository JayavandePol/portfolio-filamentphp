import { motion } from 'framer-motion';
import { Mail, ArrowRight, LayoutDashboard } from 'lucide-react';

export default function ContactOptions() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Ticketing System Explanation */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border/50 rounded-xl p-8 transition-all hover:border-electric/30"
            >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-electric/10 border border-electric/20 rounded-lg mb-6 text-electric">
                    <LayoutDashboard className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-4">Support Dashboard</h2>
                <ul className="space-y-4 text-muted-foreground">
                    <li className="flex items-start gap-3">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-electric shrink-0" />
                        <span><strong>Register or Login</strong> to access your personal support portal.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-electric shrink-0" />
                        <span><strong>Open a Ticket</strong> for project inquiries, technical support, or collaborations.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-electric shrink-0" />
                        <span><strong>Stay Updated</strong> with email notifications whenever I reply to your inquiry.</span>
                    </li>
                </ul>
                <div className="mt-8">
                    <a
                        href="/dashboard/login"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-electric text-white rounded-lg font-medium hover:bg-electric/90 transition-all group"
                    >
                        Go to Support Dashboard
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                </div>
            </motion.div>

            {/* Direct Email Option */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card border border-border/50 rounded-xl p-8 flex flex-col items-center text-center justify-center"
            >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/50 border border-border/50 rounded-lg mb-6 text-foreground">
                    <Mail className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">Direct Email</h2>
                <p className="text-muted-foreground mb-6">
                    Not a fan of tickets? You can always reach me directly at:
                </p>
                <a
                    href="mailto:info@jayavandepol.nl"
                    className="text-xl font-bold text-electric hover:underline transition-all"
                >
                    info@jayavandepol.nl
                </a>
                <div className="mt-8 pt-6 border-t border-border/50 w-full">
                    <p className="text-sm text-muted-foreground italic">
                        Average response via email: 24-48 hours
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
