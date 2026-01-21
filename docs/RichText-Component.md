# RichText Component - HTML Content Display

## Overview
The `RichText` component safely renders HTML content from Filament's RichEditor fields with beautiful typography styling.

## Features
- ✅ Renders HTML content from rich text editors
- ✅ Uses Tailwind Typography (prose classes)
- ✅ Optional truncation for card layouts
- ✅ Customizable styling
- ✅ Responsive typography

## Installation
Already configured! Includes:
- `@tailwindcss/typography` plugin
- Prose styles in RichText component
- Safe HTML rendering with `dangerouslySetInnerHTML`

## Usage

### Basic Usage
```jsx
import { RichText } from '@/Components';

<RichText html={project.description} />
```

### Truncated (for Cards)
```jsx
<RichText html={project.description} truncate={true} />
```

### Custom Classes
```jsx
<RichText 
  html={content} 
  className="text-sm" 
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `html` | string | - | HTML content to render |
| `truncate` | boolean | false | Truncate to 3 lines with ellipsis |
| `className` | string | '' | Additional CSS classes |

## Styling

The component includes:
- Gray color scheme matching the design
- Responsive font sizes
- Proper spacing for headings, paragraphs, lists
- Link styling with hover effects
- Truncation support for previews

### Prose Classes Applied
- `prose-sm` - Small prose size
- `prose-gray` - Gray color scheme
- `prose-headings:font-semibold` - Bold headings
- `prose-p:text-gray-600` - Gray paragraphs
- `prose-a:text-gray-900` - Dark links
- `prose-ul:list-disc` - Bullet lists
- `prose-ol:list-decimal` - Numbered lists

## Examples

### In a Card (truncated)
```jsx
<Card>
  <div className="p-6">
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <RichText html={description} truncate={true} />
  </div>
</Card>
```

### Full Content Page
```jsx
<Section>
  <Container>
    <RichText html={content} />
  </Container>
</Section>
```

### With Custom Styling
```jsx
<RichText 
  html={content}
  className="prose-lg prose-blue"
/>
```

## Supported HTML Elements

From Filament RichEditor, the component handles:
- **Headings** - h2, h3
- **Text formatting** - bold, italic
- **Links** - with hover effects
- **Lists** - bullet lists, numbered lists
- **Paragraphs** - with proper spacing

## Security

The component uses `dangerouslySetInnerHTML` which is safe in this context because:
1. Content comes from your Filament admin (trusted source)
2. Only admin users can create/edit content
3. Filament sanitizes input in the RichEditor

## Migration

If you have existing plain text descriptions:

**Before:**
```jsx
<p className="text-gray-600">{project.description}</p>
```

**After:**
```jsx
<RichText html={project.description} />
```

## Updated Files

The following pages now use RichText:
- ✅ `Home.jsx` - Featured projects with truncation
- ✅ `Projects.jsx` - Project cards with truncation

## Customization

### Change Default Colors
Edit the component in `resources/js/Components/RichText.jsx`:
```jsx
const proseClasses = `prose prose-sm prose-blue...`; // Change to prose-blue, prose-green, etc.
```

### Change Truncation Lines
```jsx
${truncate ? 'line-clamp-5' : ''} // Change from 3 to 5 lines
```

### Add More Prose Modifiers
```jsx
prose-strong:text-gray-900
prose-code:text-gray-800
prose-blockquote:border-gray-300
```

## Testing

To test rich text rendering:
1. Go to Filament admin (`/admin`)
2. Create/edit a project
3. Add formatted text in the description (bold, lists, links, headings)
4. View on the frontend - formatting should display correctly

## Troubleshooting

### Styles not showing
- Ensure `@tailwindcss/typography` is installed
- Check that `@plugin '@tailwindcss/typography'` is in `app.css`
- Rebuild assets: `npm run build`

### HTML not rendering
- Verify the field contains HTML (not plain text)
- Check browser console for errors
- Ensure `dangerouslySetInnerHTML` is working

### Truncation not working
- `line-clamp-3` requires display utilities
- Parent must not have `display: flex` or `display: grid` without proper wrapping

## Future Enhancements

Potential additions:
- [ ] Syntax highlighting for code blocks
- [ ] Custom prose theme colors
- [ ] Preview length customization
- [ ] Read more/less toggle
- [ ] Image optimization for rich text images
