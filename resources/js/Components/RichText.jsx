export default function RichText({ html, className = '', truncate = false }) {
    if (!html) return null;

    const proseClasses = `prose prose-sm prose-invert max-w-none 
        prose-headings:font-semibold prose-headings:text-foreground
        prose-p:text-muted-foreground prose-p:leading-relaxed
        prose-a:text-electric prose-a:font-medium hover:prose-a:text-electric/80
        prose-ul:list-disc prose-ol:list-decimal
        prose-li:text-muted-foreground
        prose-strong:text-foreground
        prose-code:text-electric
        prose-blockquote:text-muted-foreground prose-blockquote:border-border
        ${truncate ? 'line-clamp-3' : ''}`;

    return (
        <div 
            className={`${proseClasses} ${className}`}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
