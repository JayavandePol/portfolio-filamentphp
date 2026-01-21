# Project Documentation

## Project Overview

This is a portfolio website for Jaya van de Pol built with Laravel and FilamentPHP for the backend/admin panel, and Inertia.js + React + Framer Motion for the frontend. The site showcases projects and testimonials with a modern, animated single-page application experience.

## Technology Stack

### Backend
- **Laravel 12** - PHP framework
- **FilamentPHP 4** - Admin panel framework
- **Inertia.js 2** - Modern monolith (bridges Laravel and React without building an API)
- **SQLite/MySQL** - Database
- **PHP 8.2+** - Programming language

### Frontend
- **React 18** - JavaScript UI library
- **Inertia.js** - SPA framework (React adapter)
- **Framer Motion** - Animation library
- **Tailwind CSS v4** - Utility-first CSS framework
- **Tailwind Typography** - Rich text styling plugin
- **Vite 7** - Build tool and dev server

### Development Tools
- **NPM** - Package manager
- **Composer** - PHP dependency manager
- **Laravel Pint** - Code formatter
- **Pest** - Testing framework

## Project Purpose

Portfolio website that allows:
1. Admin to manage projects via FilamentPHP admin panel
2. Admin to manage testimonials via FilamentPHP admin panel
3. Visitors to view projects and testimonials on a beautiful, animated frontend
4. Featured projects and testimonials to be highlighted on the homepage

## Data Models

### Project Model
```php
- id (integer, primary key)
- title (string) - Project name
- slug (string, unique) - URL-friendly identifier
- summary (text, nullable) - Short description for cards
- description (json) - Rich text HTML content for detail page
- hero_image (string, nullable) - Path to image file
- status (enum: draft, published, archived) - Publication status
- is_featured (boolean) - Show on homepage
- published_at (datetime, nullable) - Publication date
- url (string, nullable) - External project URL
- sort_order (integer) - Display order
- timestamps (created_at, updated_at)

Accessors:
- hero_image_url (string) - Full public URL to image
```

### Testimonial Model
```php
- id (integer, primary key)
- author_name (string) - Person's name
- company (string, nullable) - Company name
- content (text) - Testimonial text
- rating (integer, 1-5) - Star rating
- is_visible (boolean) - Show on website
- is_featured (boolean) - Show on homepage
- avatar_path (string, nullable) - Path to avatar image
- timestamps (created_at, updated_at)

Accessors:
- avatar_url (string) - Full public URL to avatar
```

## File Structure

### Backend Structure
```
app/
├── Enums/
│   └── ProjectStatus.php - Enum for project statuses
├── Filament/
│   └── Resources/
│       ├── Projects/
│       │   ├── ProjectResource.php
│       │   ├── Schemas/
│       │   │   └── ProjectForm.php - Form fields for projects
│       │   ├── Tables/
│       │   │   └── ProjectsTable.php
│       │   └── Pages/
│       │       ├── ListProjects.php
│       │       ├── CreateProject.php
│       │       └── EditProject.php
│       └── Testimonials/
│           ├── TestimonialResource.php
│           ├── Schemas/
│           │   └── TestimonialForm.php - Form fields for testimonials
│           └── [similar pages structure]
├── Http/
│   ├── Controllers/
│   │   ├── HomeController.php - Homepage with featured items
│   │   ├── ProjectController.php - Projects index and detail
│   │   └── TestimonialController.php - Testimonials index
│   └── Middleware/
│       └── HandleInertiaRequests.php - Shared data across pages
└── Models/
    ├── Project.php
    ├── Testimonial.php
    └── User.php

routes/
└── web.php - All public routes

database/
├── migrations/ - Database schema
└── seeders/ - Sample data

storage/
└── app/
    └── public/ - Uploaded files (images)
        ├── projects/heroes/ - Project hero images
        └── testimonials/avatars/ - Testimonial avatars
```

### Frontend Structure
```
resources/
├── css/
│   └── app.css - Tailwind imports and custom styles
├── js/
│   ├── app.jsx - Inertia.js entry point
│   ├── Components/ - Reusable UI components
│   │   ├── Badge.jsx - Status badges (5 color variants)
│   │   ├── Button.jsx - Buttons (3 style variants)
│   │   ├── Card.jsx - Animated card containers
│   │   ├── Container.jsx - Max-width wrapper
│   │   ├── FlashMessages.jsx - Toast notifications
│   │   ├── Grid.jsx - Responsive grid layouts
│   │   ├── LoadingSpinner.jsx - Loading states
│   │   ├── PageTitle.jsx - Animated page titles
│   │   ├── RichText.jsx - HTML content renderer
│   │   ├── Section.jsx - Section spacing wrapper
│   │   └── index.js - Component exports
│   ├── Layouts/
│   │   └── AppLayout.jsx - Main layout (nav, header, footer)
│   ├── Pages/ - Inertia.js page components
│   │   ├── Home.jsx - Homepage (featured projects + testimonials)
│   │   ├── Projects.jsx - All projects listing
│   │   ├── ProjectDetail.jsx - Single project view
│   │   └── Testimonials.jsx - All testimonials listing
│   └── types/
│       └── index.d.ts - TypeScript type definitions
└── views/
    └── app.blade.php - Root HTML template for Inertia
```

## Routing Structure

### Backend Routes (routes/web.php)
```php
GET / → HomeController@index
    Returns: Home page with featured projects (max 3) and testimonials (max 2)

GET /projects → ProjectController@index
    Returns: All published projects

GET /projects/{slug} → ProjectController@show
    Returns: Single project detail page

GET /testimonials → TestimonialController@index
    Returns: All visible testimonials

GET /admin → Filament admin panel
```

### Data Flow
```
User navigates → Laravel Route → Controller
    ↓
Controller queries database → Inertia::render()
    ↓
Sends JSON data to frontend
    ↓
React component receives props → Renders UI
    ↓
Framer Motion animates elements
    ↓
User sees page (no reload!)
```

## Frontend Architecture

### Component Philosophy
- **Small, reusable components** - Single responsibility
- **Composition over inheritance** - Compose complex UIs from simple parts
- **Props-based configuration** - Flexible and maintainable
- **Zero custom CSS** - 100% Tailwind utility classes
- **Animation by default** - Framer Motion everywhere

### Layout Hierarchy
```
AppLayout (Navigation + Footer)
    └── Page Component (Home, Projects, etc.)
        └── Section (Vertical spacing)
            └── Container (Max-width centering)
                └── Grid (Responsive columns)
                    └── Card (Individual items)
                        └── Content (Text, images, buttons)
```

### Styling Approach
- **Tailwind CSS v4** - All styling via utility classes
- **No custom CSS files** - Everything in className props
- **Responsive design** - Mobile-first with breakpoints (sm, md, lg, xl)
- **Color scheme** - Gray scale with semantic colors
- **Typography** - Inter font family via Tailwind Typography

### Animation Patterns

**Entrance Animations:**
```javascript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
```

**Scroll-triggered:**
```javascript
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={{ once: true }}
```

**Hover effects:**
```javascript
whileHover={{ scale: 1.05 }}
transition={{ duration: 0.3 }}
```

**Staggered children:**
```javascript
// Parent cards render with delay
delay={index * 0.1}
```

## Key Features

### Admin Panel (FilamentPHP)
- Rich text editor for project descriptions
- Image upload with editing
- Status management (draft, published, archived)
- Featured toggles for homepage visibility
- Visibility toggles for public display
- Sort order management
- Date/time pickers

### Frontend Features
- **SPA Navigation** - No page reloads (Inertia.js)
- **Animated Transitions** - Smooth page changes
- **Responsive Images** - Proper aspect ratios
- **Rich Text Display** - HTML content rendering
- **Flash Messages** - Auto-dismissing notifications
- **Mobile Menu** - Hamburger navigation
- **External Links** - Open in new tabs
- **Breadcrumbs** - Easy navigation
- **Truncated Previews** - Summary on cards, full content on detail pages

### Homepage
- Hero section with call-to-action
- Featured projects (max 3) - Only projects marked as featured
- Featured testimonials (max 2) - Only testimonials marked as featured
- View All buttons for both sections

### Projects Page
- Grid layout of all published projects
- Status badges
- Summary or truncated description
- Read More → Detail page
- Visit → External URL

### Project Detail Page
- Full-width hero image
- Breadcrumb back to projects
- Status badge
- Summary highlight box
- Full rich text description
- External link button

### Testimonials Page
- Grid layout of all visible testimonials
- Avatar images with fallback initials
- Star ratings (animated)
- Company names
- Full testimonial content

## Image Handling

### Storage Configuration
- **Disk:** `public` (storage/app/public)
- **Symlink:** public/storage → storage/app/public
- **Project images:** projects/heroes/
- **Testimonial avatars:** testimonials/avatars/

### Image Processing
- Upload in Filament → Saved to public disk
- Model accessor generates public URL
- Frontend receives full URL in props
- Display with proper sizing and aspect ratios

## Shared Data (Available on All Pages)

Via `HandleInertiaRequests` middleware:
```javascript
{
    auth: {
        user: User | null
    },
    flash: {
        message: string | null,
        error: string | null
    }
}
```

## Component Props Patterns

### Page Components
```javascript
export default function PageName({ propName }) {
    // Props come from Controller
    return <AppLayout>...</AppLayout>
}
```

### Reusable Components
```javascript
export default function Component({ 
    children, 
    variant = 'default',
    className = '',
    ...props 
}) {
    // Flexible configuration
}
```

## Build & Development

### Development Commands
```bash
npm run dev          # Start Vite dev server (HMR)
php artisan serve    # Start Laravel server
composer run dev     # Run both simultaneously
```

### Production Build
```bash
npm run build        # Build and optimize assets
```

### File Watching
- Vite watches: resources/js/**, resources/css/**
- Laravel watches: app/**, routes/**, resources/views/**

## Design Principles

1. **Mobile-First** - Design for small screens, enhance for large
2. **Accessibility** - Semantic HTML, proper ARIA labels
3. **Performance** - Code splitting, lazy loading, optimized images
4. **User Experience** - Smooth animations, clear feedback, intuitive navigation
5. **Maintainability** - Clear structure, consistent patterns, well-documented
6. **Scalability** - Easy to add new pages, features, and components

## Color Palette

- **Primary:** Gray-900 (dark)
- **Secondary:** Gray-500-700 (medium)
- **Background:** Gray-50 (light)
- **Success:** Green-500
- **Warning:** Yellow-500
- **Danger:** Red-500
- **Links:** Gray-900 with hover effects

## Typography Scale

- **Hero:** text-4xl to text-6xl (responsive)
- **Page Title:** text-3xl
- **Section Title:** text-2xl to text-3xl
- **Card Title:** text-xl
- **Body:** text-base
- **Small:** text-sm
- **Tiny:** text-xs

## Responsive Breakpoints

- **xs:** 0-639px (mobile)
- **sm:** 640px+ (large mobile/small tablet)
- **md:** 768px+ (tablet)
- **lg:** 1024px+ (desktop)
- **xl:** 1280px+ (large desktop)
- **2xl:** 1536px+ (extra large)

## Component Variants

### Button
- `primary` - Dark background, white text
- `secondary` - White background, gray text, border
- `outline` - Transparent, gray text, border

### Badge
- `default` - Gray
- `primary` - Blue
- `success` - Green
- `warning` - Yellow
- `danger` - Red

### Card
- Standard card with optional animation
- `animate={true}` - Entrance animation
- `delay={number}` - Stagger delay

## Future Considerations

- Blog functionality
- Contact form
- Project categories/tags
- Testimonial categories
- Search functionality
- Pagination for large datasets
- Image galleries
- Video embeds
- Social media integration
- SEO meta tags
- Analytics integration

## Environment Configuration

Key `.env` variables:
```
APP_URL=http://localhost:8000  # Important for image URLs
FILESYSTEM_DISK=public          # Default disk for uploads
DB_CONNECTION=sqlite            # Database type
```

## Summary for AI Prompts

**This is a Laravel + React portfolio website with:**
- FilamentPHP admin panel for content management
- Inertia.js bridging Laravel and React (no separate API)
- React + Framer Motion for animated frontend
- Tailwind CSS for styling (no custom CSS)
- Projects and Testimonials as main content types
- Featured items system for homepage
- Rich text descriptions with HTML rendering
- Image uploads with public URL accessors
- Responsive, mobile-first design
- Component-based architecture with reusable pieces
- SPA navigation with smooth transitions
- TypeScript type definitions
- Modern build tools (Vite)

**Design Style:**
- Clean, minimal design
- Gray color palette
- Smooth animations
- Card-based layouts
- Professional, portfolio aesthetic
- Focus on content and imagery
