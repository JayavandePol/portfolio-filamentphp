# Frontend Structure Documentation

## Overview
This project uses **Inertia.js** with **React** and **Framer Motion** for animations, styled exclusively with **Tailwind CSS v4**.

## Tech Stack
- **Laravel 12** - Backend framework
- **Inertia.js** - Modern monolith approach (no API needed)
- **React 18** - Frontend framework
- **Framer Motion** - Animation library
- **Tailwind CSS v4** - Utility-first CSS framework
- **Vite** - Build tool

## Directory Structure

```
resources/js/
├── Components/          # Reusable UI components
│   ├── Badge.jsx       # Status badges with variants
│   ├── Button.jsx      # Button component with variants
│   ├── Card.jsx        # Card container with animations
│   ├── Container.jsx   # Max-width container wrapper
│   ├── Grid.jsx        # Responsive grid layout
│   ├── PageTitle.jsx   # Animated page titles
│   ├── Section.jsx     # Section wrapper with spacing
│   └── index.js        # Component exports
│
├── Layouts/            # Page layouts
│   └── AppLayout.jsx   # Main application layout with nav & footer
│
├── Pages/              # Inertia pages (routes)
│   ├── Home.jsx        # Homepage with hero & featured content
│   ├── Projects.jsx    # Projects listing page
│   └── Testimonials.jsx # Testimonials listing page
│
└── app.jsx             # Inertia app entry point
```

## Component Guidelines

### Base Components
All components use Tailwind CSS classes exclusively - no custom CSS.

#### Container
```jsx
import { Container } from '@/Components';

<Container className="py-8">
  {/* Your content */}
</Container>
```

#### Card
```jsx
import { Card } from '@/Components';

<Card animate={true} delay={0.2}>
  {/* Card content */}
</Card>
```

#### Button
```jsx
import { Button } from '@/Components';

<Button variant="primary" href="/projects">
  Click me
</Button>
// Variants: primary, secondary, outline
```

#### Badge
```jsx
import { Badge } from '@/Components';

<Badge variant="success">Published</Badge>
// Variants: default, primary, success, warning, danger
```

### Layouts
`AppLayout` includes:
- Responsive navigation
- Header section (optional)
- Main content area
- Footer

### Pages
Each page component receives props from the controller:
```jsx
export default function Home({ projects, testimonials }) {
  return (
    <AppLayout>
      <Head title="Home" />
      {/* Page content */}
    </AppLayout>
  );
}
```

## Animations
Framer Motion is integrated throughout:
- **Page transitions** - Automatic via Inertia
- **Component animations** - Using `motion` components
- **Scroll animations** - Using `whileInView`
- **Hover effects** - Using `whileHover`

Example:
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

## Routing
Routes are defined in `routes/web.php` and mapped to Inertia pages:
```php
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/projects', [ProjectController::class, 'index'])->name('projects');
Route::get('/testimonials', [TestimonialController::class, 'index'])->name('testimonials');
```

## Navigation
Use Inertia's `Link` component for SPA navigation:
```jsx
import { Link } from '@inertiajs/react';

<Link href="/projects">Projects</Link>
```

## Adding New Pages

1. **Create the Page Component**
   ```jsx
   // resources/js/Pages/NewPage.jsx
   import { Head } from '@inertiajs/react';
   import AppLayout from '../Layouts/AppLayout';
   
   export default function NewPage({ data }) {
     return (
       <AppLayout>
         <Head title="New Page" />
         {/* Your content */}
       </AppLayout>
     );
   }
   ```

2. **Create the Controller**
   ```php
   // app/Http/Controllers/NewPageController.php
   use Inertia\Inertia;
   
   public function index()
   {
       return Inertia::render('NewPage', [
           'data' => YourModel::all(),
       ]);
   }
   ```

3. **Add the Route**
   ```php
   // routes/web.php
   Route::get('/new-page', [NewPageController::class, 'index']);
   ```

## Development

### Start Dev Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Run Laravel Server
```bash
php artisan serve
```

## Best Practices

1. **Component Naming** - Use PascalCase for components
2. **Props Destructuring** - Destructure props in function parameters
3. **Tailwind Classes** - Use Tailwind utilities, no custom CSS
4. **Animations** - Use Framer Motion for smooth transitions
5. **Code Organization** - Keep components small and focused
6. **Shared Data** - Access via `usePage().props` hook
7. **Forms** - Use Inertia's form helper for easy form handling

## Shared Data
Available on all pages via `usePage().props`:
```jsx
import { usePage } from '@inertiajs/react';

const { auth, flash } = usePage().props;
```

## Tailwind Configuration
Using Tailwind CSS v4 with the Vite plugin - no separate config file needed.
Customize in `resources/css/app.css` using CSS variables if needed.

## TypeScript (Optional)
To add TypeScript support:
1. Rename `.jsx` to `.tsx`
2. Install types: `npm install -D @types/react @types/react-dom`
3. Add `tsconfig.json`

## Troubleshooting

### Hot Module Reload not working
- Check Vite is running: `npm run dev`
- Clear browser cache
- Restart Vite server

### Component not found
- Check import paths
- Ensure component is exported properly
- Run `npm run build` to check for errors

### Animations not working
- Verify Framer Motion is installed
- Check console for errors
- Ensure `motion` component is used correctly
