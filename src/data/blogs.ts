import { Megaphone, Zap, Palette, Calculator, MessageCircle } from 'lucide-react';
import React from 'react';

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    date: string;
    readTime: string;
    author: string;
    icon: React.ElementType;
    color: string;
}

export const posts: BlogPost[] = [
    {
        id: 'website-cost-durban',
        slug: 'website-cost-durban-2025',
        title: 'How Much Does a Website Cost in Durban in 2026?',
        excerpt: 'A comprehensive breakdown of web design pricing, from basic business sites to advanced eCommerce platforms.',
        content: `When local business owners ask us, "How much does a website cost?", the answer depends entirely on what the website needs to do. In Durban\'s competitive market in 2026, your website isn\'t just a digital brochure—it\'s your hardest-working employee.\n\nHere is a realistic breakdown of website costs in South Africa today:\n\n**1. The Starter Business Website (R3,500 – R7,500)**\nPerfect for service-based businesses like plumbers, electricians, or consultants. This typically includes a 1-5 page site, basic SEO, contact forms, and mobile optimization. It\'s clean, fast, and acts as your foundational digital footprint.\n\n**2. The Custom Professional Site (R8,000 – R15,000)**\nFor established businesses ready to scale. These sites feature custom branding, advanced lead generation tools, copywriting assistance, integration with your CRM, and deeper localized SEO targeting specific KZN areas like Umhlanga or Hillcrest.\n\n**3. eCommerce & Automation Powerhouses (R15,000+)**\nIf you\'re selling online, you need a robust, secure platform. This includes inventory management, automated shipping calculations, PayFast integration, and abandoned cart recovery sequences.\n\n**The Hidden Cost of "Cheap" Websites**\nWe often rebuild sites for clients who initially went with the cheapest quote. A slow, unsecured site that doesn\'t rank on Google is a liability, not an asset. When you invest in a proper web design agency like Qroma Digital, you\'re investing in a marketing engine designed to generate ROI.`,
        category: 'Tech',
        date: '2026-03-01',
        readTime: '4 min',
        author: 'Qroma Team',
        icon: Calculator,
        color: '#10b981',
    },
    {
        id: 'business-automation',
        slug: 'business-automation-durban-smes',
        title: 'Why Business Automation is Crucial for Durban SMEs',
        excerpt: 'Stop doing manual data entry. Learn how local businesses are saving 20+ hours a week via smart automation.',
        content: `Many small and medium-sized enterprises (SMEs) in Durban are bleeding money through inefficiencies. If you or your staff are spending hours manually typing out quotes, responding to the same customer inquiries, or shifting data between spreadsheets, you are losing valuable time.\n\n**What exactly is Business Automation?**\nIt\'s the process of using software to execute recurring tasks without manual intervention. At Qroma Digital, we set up "invisible robots" that work for your business 24/7.\n\n**Real-World Examples for South African SMEs:**\n\n• **Instant Quoting Systems:** A potential client fills out a form on your website. Instead of waiting until Monday morning, the system instantly generates and emails them a branded PDF quote based on their inputs.\n\n• **CRM Syncing (Zapier):** A new lead comes in from a Facebook Ad. They are automatically added to your CRM (like HubSpot or Mailchimp), tagged correctly, and sent a welcome email sequence.\n\n• **Appointment Reminders:** Reduce no-shows by 70%. When a client books via your site, automation handles the confirmation email and sends an SMS reminder 24 hours before the meeting.\n\n**The ROI of Automation**\nAutomation isn\'t an expense; it\'s an investment in scale. When your systems handle the busywork, your team can focus on what actually grows the business: strategy, sales, and delivering exceptional customer service.`,
        category: 'Automation',
        date: '2026-02-22',
        readTime: '5 min',
        author: 'Qroma Team',
        icon: Zap,
        color: '#f59e0b',
    },
    {
        id: 'local-seo-durban',
        slug: 'local-seo-durban-google-maps',
        title: 'Mastering Local SEO: How to Dominate Google Maps in Durban',
        excerpt: 'The exact strategy you need to rank #1 in the "Local Pack" when customers search for your services.',
        content: `If you\'re a local service provider in KZN—whether you run a salon in Westville or a law firm in Umhlanga—Local SEO is your golden ticket. When someone searches for "best [your service] near me," you want to be the first name they see.\n\nHere\'s how Qroma Digital systematically pushes businesses to the top of Google Maps:\n\n**1. Optimize Your Google Business Profile (GBP)**\nYour GBP is your digital storefront. Fill out every single field. Add high-quality photos weekly. Make sure your business categories are hyper-specific. If you\'re a plumber, don\'t just choose "Contractor"—choose "Emergency Plumber" if applicable.\n\n**2. The Power of Consistent NAP**\nYour Name, Address, and Phone number (NAP) must be identical across the internet. If your address is listed as "Unit 2, Main Road" on your site but "U2 Main Rd" on a directory, Google gets confused. Consistency builds trust with the algorithm.\n\n**3. Generate Localized Content**\nDon\'t just write generic blog posts. Write about your specific service areas. For example, a page titled "Aircon Repair in Ballito" will convert significantly better than just "Our Repair Services."\n\n**4. Review Generation Strategy**\nReviews are a massive ranking factor. You need a systematic way to request reviews from happy clients. At Qroma, we build automated email/WhatsApp flows that kindly ask clients for a review the moment a project is successfully completed.\n\nLocal SEO isn\'t magic, but it takes consistent effort. Start dominating your local area today.`,
        category: 'Marketing',
        date: '2026-02-15',
        readTime: '6 min',
        author: 'Qroma Team',
        icon: Megaphone,
        color: '#ef4444',
    },
    {
        id: 'restaurant-web-design',
        slug: 'web-design-for-restaurants-durban',
        title: 'Essential Web Design Features for Durban Restaurants',
        excerpt: 'Is your restaurant\'s website converting visitors into diners? Here are the non-negotiables for 2026.',
        content: `The hospitality industry in Durban is fiercely competitive. From Florida Road to the rolling hills of the Midlands, diners have endless choices. Your website is often their first taste of your establishment—if it\'s slow, clunky, or hard to navigate, they will simply bounce to the next option.\n\nHere are the absolute essentials every restaurant website needs:\n\n**1. Text-Based, Mobile-First Menus**\nStop uploading PDF menus. They are terrible for SEO and incredibly frustrating for users trying to pinch-and-zoom on their smartphones. At Qroma, we build responsive, text-based menus that load instantly and look beautiful on any screen. Plus, Google can actually read them!\n\n**2. Frictionless Reservations**\nIf a customer wants to book a table at 11 PM for the following day, they should be able to. Integrating lightweight reservation widgets (like Dineplan) directly into your site ensures you never miss a booking.\n\n**3. High-Quality Imagery**\nPeople eat with their eyes first. Invest in professional food photography. We ensure these images are compressed into next-gen formats (like WebP) so your site remains lightning fast without sacrificing visual quality.\n\n**4. Click-to-Call and Clear NAP**\nHunger creates urgency. When someone finds you on mobile, they should be able to tap your phone number to call immediately, or tap your address to open Google Maps for directions.\n\nYour website should reflect the ambiance and quality of your dining room. Don\'t let a bad digital experience ruin a great meal.`,
        category: 'Design',
        date: '2026-02-05',
        readTime: '5 min',
        author: 'Qroma Team',
        icon: Palette,
        color: '#a855f7',
    },
    {
        id: 'whatsapp-automation',
        slug: 'whatsapp-automation-south-africa',
        title: 'WhatsApp Automation: Revolutionizing Customer Service in SA',
        excerpt: 'South Africa runs on WhatsApp. Here is how to turn it into an automated sales and support engine.',
        content: `If there is one universal truth about business in South Africa, it\'s this: your customers are on WhatsApp. The platform has massive penetration across all demographics. If you aren\'t utilizing WhatsApp Business effectively, you are leaving money on the table.\n\nBut managing hundreds of WhatsApp messages manually is exhausting. That\'s where WhatsApp Automation comes in.\n\n**How Qroma Digital Implements WhatsApp Automation:**\n\n**1. The 24/7 First Responder**\nWhen a customer messages you after hours, they shouldn\'t be met with silence. We build smart chatbots that instantly reply, categorize their inquiry, and provide immediate answers to FAQs (e.g., operating hours, pricing PDFs, or basic troubleshooting).\n\n**2. Automated Lead Qualification**\nWe design bot flows that ask qualifying questions. "Are you looking for residential or commercial services?" "What is your estimated budget?" By the time a human agent takes over the chat, they already have all the context they need to close the deal.\n\n**3. E-Commerce Order Updates**\nIntegrating your WooCommerce or Shopify store with WhatsApp means your customers get automated order confirmations and shipping updates right to their phone. This dramatically reduces "Where is my order?" support tickets.\n\n**4. Re-engagement Campaigns**\nWith the WhatsApp Business API, you can send targeted, templated messages to your opted-in list. It boasts open rates upward of 90%, far outperforming traditional email marketing.\n\nSouth Africans prefer chatting over calling. Meet them where they are, but do it intelligently with automation.`,
        category: 'Automation',
        date: '2026-01-20',
        readTime: '7 min',
        author: 'Qroma Team',
        icon: MessageCircle,
        color: '#3b82f6',
    }
];

export const categories = ['All', 'Tech', 'Marketing', 'Automation', 'Design'];
