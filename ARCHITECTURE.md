# Component Architecture

## 🏗️ Application Structure

```
┌─────────────────────────────────────────────────────────────┐
│                      Laravel Backend                         │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  Routes     │→ │ Controllers  │→ │ Inertia::    │       │
│  │  web.php    │  │ (3 created)  │  │ render()     │       │
│  └─────────────┘  └──────────────┘  └──────┬───────┘       │
│                                              ↓               │
│                    ┌────────────────────────────┐           │
│                    │ HandleInertiaRequests      │           │
│                    │ (Middleware)               │           │
│                    └──────────┬─────────────────┘           │
└───────────────────────────────┼─────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────┐
│                    React Frontend (Inertia)                  │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │               app.jsx (Entry Point)                 │    │
│  │  - Inertia App Setup                                │    │
│  │  - Page Resolution                                  │    │
│  │  - Progress Bar                                     │    │
│  └───────────────────┬────────────────────────────────┘    │
│                      ↓                                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Layouts/AppLayout.jsx                    │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │ Navigation (Desktop + Mobile)                 │   │  │
│  │  └──────────────────────────────────────────────┘   │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │ FlashMessages (Notifications)                 │   │  │
│  │  └──────────────────────────────────────────────┘   │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │ Header (Optional per page)                    │   │  │
│  │  └──────────────────────────────────────────────┘   │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │ Main Content (Page children)                  │   │  │
│  │  └──────────────────────────────────────────────┘   │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │ Footer                                        │   │  │
│  │  └──────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────┘  │
│                      ↓                                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   Pages/                              │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐ │  │
│  │  │ Home.jsx    │  │ Projects.jsx │  │ Testimonials│ │  │
│  │  │             │  │              │  │ .jsx        │ │  │
│  │  │ - Hero      │  │ - Grid       │  │ - Grid      │ │  │
│  │  │ - Featured  │  │ - Cards      │  │ - Cards     │ │  │
│  │  │   Projects  │  │ - Badges     │  │ - Ratings   │ │  │
│  │  │ - Testimoni-│  │              │  │             │ │  │
│  │  │   als       │  │              │  │             │ │  │
│  │  └─────────────┘  └──────────────┘  └─────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
│                      ↓                                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │               Components/ (Reusable)                  │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────────┐ │  │
│  │  │ Card     │ │ Button   │ │ Badge    │ │ Grid    │ │  │
│  │  └──────────┘ └──────────┘ └──────────┘ └─────────┘ │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────────┐ │  │
│  │  │Container │ │ Section  │ │PageTitle │ │ Loading │ │  │
│  │  │          │ │          │ │          │ │ Spinner │ │  │
│  │  └──────────┘ └──────────┘ └──────────┘ └─────────┘ │  │
│  │  ┌──────────────────────────┐                        │  │
│  │  │ FlashMessages            │                        │  │
│  │  └──────────────────────────┘                        │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow

```
User Action
    ↓
Inertia Link Click (SPA Navigation)
    ↓
HTTP Request to Laravel
    ↓
Route → Controller
    ↓
Fetch Data from Models
    ↓
Inertia::render('PageName', ['data' => $data])
    ↓
JSON Response (only data, not full HTML)
    ↓
Inertia.js receives response
    ↓
React Component renders with new props
    ↓
DOM updates (no page reload!)
    ↓
Framer Motion animations play
```

## 🎨 Component Hierarchy Example

```jsx
<AppLayout>
  <Head title="Home" />
  <Section>
    <Container>
      <Grid cols={3}>
        <Card animate delay={0.1}>
          <Badge variant="success">Published</Badge>
          <PageTitle>Project Title</PageTitle>
          <Button variant="primary" href="/link">
            View Project
          </Button>
        </Card>
        {/* More cards... */}
      </Grid>
    </Container>
  </Section>
</AppLayout>
```

## 🎭 Animation Flow

```
Component Mount
    ↓
initial state (opacity: 0, y: 20)
    ↓
Framer Motion detects component
    ↓
animate state (opacity: 1, y: 0)
    ↓
transition (duration, delay, easing)
    ↓
Smooth animation plays
    ↓
Final state rendered
```

### Scroll Animations
```
User scrolls page
    ↓
Component enters viewport
    ↓
whileInView triggered
    ↓
Animation plays (once or repeat)
    ↓
Content revealed
```

## 📦 Build Process

```
Development:
npm run dev
    ↓
Vite dev server starts
    ↓
HMR enabled (instant updates)
    ↓
Files watched for changes
    ↓
Browser auto-refreshes

Production:
npm run build
    ↓
Vite bundles code
    ↓
Code splitting by page
    ↓
Tree shaking (remove unused)
    ↓
Minification
    ↓
Output to public/build/
```

## 🎯 Styling Approach

```
Tailwind CSS v4
    ↓
Utility classes only
    ↓
No custom CSS files
    ↓
Responsive modifiers (sm:, md:, lg:)
    ↓
JIT compilation
    ↓
Optimized output
```

## 🔐 Shared Data Flow

```
Every Request
    ↓
HandleInertiaRequests middleware
    ↓
share() method
    ↓
Global props injected:
  - auth.user
  - flash.message
  - flash.error
    ↓
Available in all pages via usePage()
```

## 📱 Responsive Breakpoints

```
Mobile First Approach

xs: 0px      → Mobile
    ↓
sm: 640px    → Small tablets
    ↓
md: 768px    → Tablets
    ↓
lg: 1024px   → Desktop
    ↓
xl: 1280px   → Large desktop
    ↓
2xl: 1536px  → Extra large
```

## 🚀 Navigation Types

```
Internal Links (SPA):
<Link href="/page">
    ↓
Inertia handles
    ↓
No page reload
    ↓
History updated
    ↓
Smooth transition

External Links:
<a href="https://external.com">
    ↓
Normal browser navigation
    ↓
Full page load
```

## 💡 Best Practices Applied

✅ Component composition (small, reusable)
✅ Props destructuring for clarity
✅ Consistent naming conventions
✅ Proper TypeScript types defined
✅ Semantic HTML structure
✅ Accessibility considerations
✅ Performance optimizations
✅ Mobile-first responsive design
✅ Clean code organization
✅ Comprehensive documentation
