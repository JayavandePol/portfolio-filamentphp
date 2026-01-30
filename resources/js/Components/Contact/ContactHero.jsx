import { motion } from 'framer-motion';
import { Ticket } from 'lucide-react';

export default function ContactHero() {
    return (
        <div className="mb-16 space-y-4 text-center">
            <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric/10 border border-electric/20 mb-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <Ticket className="h-4 w-4 text-electric" />
                <span className="text-sm text-electric font-medium">Support Portal Live</span>
            </motion.div>

            <motion.h1
                className="text-4xl md:text-5xl font-bold text-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Get In Touch
            </motion.h1>
            <motion.p
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                I use a custom ticketing system to manage project requests and support efficiently.
            </motion.p>
        </div>
    );
}
