# Quick Start Guide

## What's Been Set Up

✅ **Inertia.js** - Server-side rendering with SPA navigation  
✅ **React 18** - Modern React with hooks  
✅ **Framer Motion** - Smooth animations and transitions  
✅ **Tailwind CSS v4** - Utility-first styling  
✅ **Responsive Navigation** - Mobile-friendly menu  
✅ **Flash Messages** - Animated notifications  
✅ **Component Library** - Reusable UI components  

## Project Structure

```
resources/js/
├── Components/           # Reusable UI components
│   ├── Badge.jsx
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── Container.jsx
│   ├── FlashMessages.jsx
│   ├── Grid.jsx
│   ├── LoadingSpinner.jsx
│   ├── PageTitle.jsx
│   ├── Section.jsx
│   └── index.js
├── Layouts/
│   └── AppLayout.jsx    # Main layout with nav & footer
├── Pages/
│   ├── Home.jsx         # Homepage
│   ├── Projects.jsx     # Projects listing
│   └── Testimonials.jsx # Testimonials listing
└── app.jsx              # Inertia entry point
```

## Getting Started

### 1. Build Assets
```bash
npm run build
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Start Laravel (in another terminal)
```bash
php artisan serve
```

### 4. Visit Your Site
Open: http://localhost:8000

## Available Pages

- **Home** - `/` - Hero section with featured projects and testimonials
- **Projects** - `/projects` - Full projects listing with status badges
- **Testimonials** - `/testimonials` - Customer testimonials with ratings

## Key Features

### 🎨 Components
All components use Tailwind CSS exclusively:
- **Card** - Animated cards with Framer Motion
- **Button** - 3 variants (primary, secondary, outline)
- **Badge** - 5 color variants for status indicators
- **Container** - Max-width wrapper for content
- **Section** - Consistent vertical spacing
- **Grid** - Responsive grid layouts
- **FlashMessages** - Auto-dismissing notifications
- **LoadingSpinner** - Loading states

### 🎭 Animations
Powered by Framer Motion:
- Page transitions
- Scroll-triggered animations
- Hover effects
- Smooth state changes
- Staggered children animations

### 📱 Responsive Design
- Mobile-first approach
- Responsive navigation with mobile menu
- Fluid typography
- Adaptive grid layouts

### 🚀 Performance
- Code splitting by page
- Lazy loading
- Optimized animations
- Vite's lightning-fast HMR

## Component Usage Examples

### Card with Animation
```jsx
import { Card } from '@/Components';

<Card animate={true} delay={0.2}>
  <div className="p-6">
    <h3 className="text-xl font-bold">Title</h3>
    <p>Content</p>
  </div>
</Card>
```

### Button Variants
```jsx
import { Button } from '@/Components';

<Button variant="primary" href="/projects">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
```

### Layout Structure
```jsx
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';

export default function MyPage({ data }) {
  return (
    <AppLayout header={<h1>Page Title</h1>}>
      <Head title="My Page" />
      {/* Your content */}
    </AppLayout>
  );
}
```

## Adding New Features

### New Page
1. Create component in `resources/js/Pages/`
2. Create controller in `app/Http/Controllers/`
3. Add route in `routes/web.php`

### New Component
1. Create in `resources/js/Components/`
2. Export from `resources/js/Components/index.js`
3. Import where needed: `import { ComponentName } from '@/Components'`

## Database Setup

To see data on your pages, run:
```bash
php artisan migrate
```

Then seed some sample data through Filament admin panel at `/admin`

## Customization

### Colors
Tailwind CSS v4 is configured. Customize in `resources/css/app.css`

### Animations
Edit Framer Motion variants in components for custom animations

### Navigation
Update navigation items in `resources/js/Layouts/AppLayout.jsx`

## Troubleshooting

### Assets not loading
```bash
npm run build
```

### Changes not reflecting
1. Restart Vite: `npm run dev`
2. Clear browser cache
3. Hard refresh: Ctrl+Shift+R

### Port already in use
Change Vite port in `vite.config.js`:
```js
server: {
  port: 5174,
}
```

## Next Steps

1. ✅ Start dev server: `npm run dev`
2. ✅ Visit http://localhost:8000
3. 📝 Add content via Filament admin (/admin)
4. 🎨 Customize components to your needs
5. 📄 Create more pages as needed
6. 🚀 Deploy to production

## Documentation

- [Inertia.js Docs](https://inertiajs.com)
- [React Docs](https://react.dev)
- [Framer Motion Docs](https://www.framer.com/motion)
- [Tailwind CSS Docs](https://tailwindcss.com)

For detailed structure info, see `FRONTEND_STRUCTURE.md`

---

**Built with ❤️ using Laravel, Inertia.js, React, and Framer Motion**
