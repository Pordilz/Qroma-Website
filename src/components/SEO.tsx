import { useEffect } from 'react';

interface SEOProps {
    title: string;
    description: string;
    name?: string;
    type?: string;
    canonical?: string;
}

export default function SEO({ title, description, name = "Qroma", type = "website", canonical }: SEOProps) {
    useEffect(() => {
        // Standard Metadata
        document.title = title;

        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description);
        } else {
            const newMeta = document.createElement('meta');
            newMeta.name = 'description';
            newMeta.content = description;
            document.head.appendChild(newMeta);
        }

        // Canonical Link
        const linkCanonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            if (linkCanonical) {
                linkCanonical.setAttribute('href', canonical);
            } else {
                const newCanonical = document.createElement('link');
                newCanonical.rel = 'canonical';
                newCanonical.href = canonical;
                document.head.appendChild(newCanonical);
            }
        } else {
            if (linkCanonical) {
                linkCanonical.remove();
            }
        }

        // Open Graph Metadata
        const updateOGTag = (property: string, content: string) => {
            const tag = document.querySelector(`meta[property="og:${property}"]`);
            if (tag) {
                tag.setAttribute('content', content);
            } else {
                const newOg = document.createElement('meta');
                newOg.setAttribute('property', `og:${property}`);
                newOg.content = content;
                document.head.appendChild(newOg);
            }
        };

        updateOGTag('title', title);
        updateOGTag('description', description);
        updateOGTag('type', type);
        if (canonical) updateOGTag('url', canonical);

    }, [title, description, name, type, canonical]);

    return null;
}
