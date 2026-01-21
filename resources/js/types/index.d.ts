import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Project {
    id: number;
    title: string;
    slug: string;
    summary?: string;
    description: string;
    hero_image?: string;
    hero_image_url?: string;
    status: 'draft' | 'published' | 'archived';
    published_at?: string;
    url?: string;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface Testimonial {
    id: number;
    author_name: string;
    company?: string;
    content: string;
    rating: number;
    is_visible: boolean;
    avatar_path?: string;
    avatar_url?: string;
    created_at: string;
    updated_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User | null;
    };
    flash: {
        message?: string;
        error?: string;
    };
    ziggy?: Config & { location: string };
};
