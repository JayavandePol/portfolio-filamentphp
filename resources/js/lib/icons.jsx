import * as LucideIcons from 'lucide-react';

export const getLucideIcon = (iconName, sizeClasses = "w-6 h-6") => {
    if (!iconName) return null;

    // Try exact match
    let Icon = LucideIcons[iconName];

    // Try PascalCase
    if (!Icon) {
        const pascalName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
        Icon = LucideIcons[pascalName];
    }

    // Try generic fallback if still not found
    if (!Icon) {
        const commonIcons = {
            'github': LucideIcons.Github,
            'linkedin': LucideIcons.Linkedin,
            'twitter': LucideIcons.Twitter,
            'instagram': LucideIcons.Instagram,
            'facebook': LucideIcons.Facebook,
            'youtube': LucideIcons.Youtube,
            'external-link': LucideIcons.ExternalLink,
            'code': LucideIcons.Code,
            'database': LucideIcons.Database,
            'server': LucideIcons.Server,
            'ticket': LucideIcons.Ticket,
            'dashboard': LucideIcons.LayoutDashboard,
        };
        Icon = commonIcons[iconName.toLowerCase()];
    }

    return Icon ? <Icon className={sizeClasses} /> : null;
};
