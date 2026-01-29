import { Link } from '@inertiajs/react';
import * as LucideIcons from 'lucide-react';
import { Mail } from 'lucide-react';

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
];

export default function Footer({ socialLinks = [] }) {
    const getIcon = (iconName) => {
        if (!iconName) return null;
        const Icon = LucideIcons[iconName];
        return Icon ? <Icon className="w-5 h-5" /> : null;
    };

    return (
        <footer className="border-t border-border/50 bg-card/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-12 md:py-16">
                    {/* Top Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-8">
                        {/* Brand */}
                        <div className="sm:col-span-2">
                            <Link href="/" className="inline-block group mb-4">
                                <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-foreground to-electric bg-clip-text text-transparent group-hover:from-electric group-hover:to-foreground transition-all duration-300">
                                    Jaya van de Pol
                                </span>
                            </Link>
                            <p className="text-muted-foreground text-sm leading-relaxed max-w-md mb-4">
                                Software development student crafting exceptional digital experiences.
                            </p>
                            <a
                                href="mailto:info@jayavandepol.nl"
                                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-electric transition-colors"
                            >
                                <Mail className="w-4 h-4" />
                                <span>info@jayavandepol.nl</span>
                            </a>
                        </div>

                        {/* Quick Links & Support */}
                        <div>
                            <h3 className="font-semibold text-foreground mb-4 text-sm">Quick Links</h3>
                            <ul className="space-y-2.5 mb-6">
                                {navigation.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className="text-sm text-muted-foreground hover:text-electric transition-colors inline-block"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <h3 className="font-semibold text-foreground mb-4 text-sm">Support</h3>
                            <a
                                href="https://buymeacoffee.com/jayavandepol"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-yellow-400 transition-colors"
                            >
                                <span className="text-xl">☕</span>
                                <span>Buy Me a Coffee</span>
                            </a>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h3 className="font-semibold text-foreground mb-4 text-sm">Connect</h3>
                            {socialLinks.length > 0 ? (
                                <ul className="space-y-2.5">
                                    {socialLinks.slice(0, 5).map((social) => (
                                        <li key={social.id}>
                                            <a
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-electric transition-colors"
                                            >
                                                {getIcon(social.icon)}
                                                <span>{social.platform}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    Social links coming soon
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="pt-8 border-t border-border/50">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
                            <p className="text-muted-foreground text-sm">
                                © {new Date().getFullYear()} Jaya van de Pol. All rights reserved.
                            </p>
                            <div className="flex items-center gap-4 sm:gap-6">
                                <Link
                                    href="/projects"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    View Work
                                </Link>
                                <Link
                                    href="/contact"
                                    className="text-sm text-electric hover:text-electric/80 transition-colors font-medium"
                                >
                                    Let's Talk →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
