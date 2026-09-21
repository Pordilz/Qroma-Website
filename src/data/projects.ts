import {
    Heart, ShieldCheck, BookOpen, BarChart3, Wind, Plane, Lock, Sunrise,
    Gamepad2, Bot, Grid2x2, ListChecks, Link2, Swords, Rocket, Target,
} from 'lucide-react';
import React from 'react';

export type ProjectKind = 'client' | 'product' | 'mobile' | 'data' | 'infrastructure' | 'internal';

export interface ProjectImage {
    src: string;
    alt: string;
    label: string;
}

export interface Project {
    id: string;
    slug: string;
    title: string;
    /** Short display label shown above the title on cards. */
    category: string;
    kind: ProjectKind;
    year: string;
    status: string;
    /** One line. Used on compact cards and in the folder widget. */
    tagline: string;
    /** Two or three sentences. Used on the main work cards. */
    description: string;
    /** The thing that needed solving. */
    problem: string;
    /** How it was built — one bullet per decision that mattered. */
    approach: string[];
    /** Stat strip on the detail page. */
    highlights: { label: string; value: string }[];
    tech: string[];
    url?: string;
    repo?: string;
    images?: ProjectImage[];
    icon: React.ElementType;
    color: string;
    /** Featured projects get a folder on the home page. */
    featured: boolean;
}

export const projects: Project[] = [
    {
        id: 'fixsir',
        slug: 'the-fixsir',
        title: 'The FixSir',
        category: 'Client Work',
        kind: 'client',
        year: '2025',
        status: 'Live',
        tagline: 'Recovery therapy booking, routed straight to WhatsApp.',
        description:
            'A mobile sports massage and Hijama therapy practice in Durban, rebuilt as a booking-first site. Every path through the page ends in a pre-filled WhatsApp message, because that is how the client\'s customers actually book.',
        problem:
            'Bookings were arriving through scattered DMs with no structure, and the practice had no single place to send people who asked what treatments cost or when the next Hijama date was.',
        approach: [
            'Built booking around WhatsApp deep links rather than a form — pre-filled messages mean a booking starts as a conversation, not an email nobody reads.',
            'Treatment pricing lives in one data file, so the practitioner can change a price without touching layout.',
            'The events section tracks Hijama dates, which follow the Islamic moon sighting and shift every month.',
            'An auto-rotating testimonial carousel built on Embla, fed with real client feedback.',
            'Full Open Graph and semantic markup so a shared link previews properly in the WhatsApp groups where it spreads.',
        ],
        highlights: [
            { label: 'Bookings', value: 'Doubled' },
            { label: 'Build', value: 'React + Tailwind' },
            { label: 'Channel', value: 'WhatsApp-first' },
        ],
        tech: ['React', 'Tailwind CSS', 'Embla Carousel', 'WhatsApp Deep Links', 'React Router'],
        url: 'https://www.thefixsir.co.za/',
        repo: 'https://github.com/Pordilz/TheFixSir-Website',
        images: [
            { src: '/fixsir-hero.webp', alt: 'The FixSir landing page', label: 'The FixSir' },
            { src: '/fixsir-services.webp', alt: 'Treatment and pricing list', label: 'Services List' },
            { src: '/fixsir-testimonials.webp', alt: 'Client testimonials', label: 'Client Reviews' },
        ],
        icon: Heart,
        color: '#DC2626',
        featured: true,
    },
    {
        id: 'halaq',
        slug: 'halaq',
        title: 'Halaq',
        category: 'Fintech Product',
        kind: 'product',
        year: '2026',
        status: 'Live',
        tagline: 'Shariah screening for any listed stock, in seconds.',
        description:
            'A Shariah-compliance screener built on AAOIFI methodology, covering JSE and US equities. It reads live financials from two independent sources and refuses to publish a verdict until both agree.',
        problem:
            'Muslim investors were relying on screening apps that disagree with each other, publish a single opaque verdict, and rarely show the ratios behind it. Getting a second opinion meant reading annual reports by hand.',
        approach: [
            'Screens against AAOIFI methodology — the same standard the major Islamic banks use — rather than a house ruleset.',
            'Pulls financials from Yahoo Finance and SEC EDGAR and cross-checks them before publishing. Where the two disagree, the verdict is withheld rather than guessed.',
            'Calculates purification maths per dividend, so a compliant-but-imperfect holding can still be held honestly.',
            'Express API keeps the data providers server-side; the React client never sees a key.',
            'Supabase for persistence, Lemon Squeezy for subscriptions — the free tier stays genuinely free.',
        ],
        highlights: [
            { label: 'Coverage', value: 'JSE + US' },
            { label: 'Standard', value: 'AAOIFI' },
            { label: 'Sources', value: 'Cross-checked' },
        ],
        tech: ['React', 'Vite', 'Express', 'Supabase', 'Yahoo Finance', 'SEC EDGAR', 'Lemon Squeezy'],
        url: 'https://halaq.vercel.app',
        repo: 'https://github.com/Pordilz/Halaq',
        images: [
            { src: '/projects/halaq-hero.webp', alt: 'Halaq landing page', label: 'Halaq' },
            { src: '/projects/halaq-full.webp', alt: 'Halaq screening features', label: 'Screening' },
        ],
        icon: ShieldCheck,
        color: '#16A34A',
        featured: true,
    },
    {
        id: 'ledger',
        slug: 'the-ledger',
        title: 'The Ledger',
        category: 'Education Product',
        kind: 'product',
        year: '2026',
        status: 'Live',
        tagline: 'Describe a transaction. Get the IFRS treatment, worked.',
        description:
            'A teaching ledger for South African accounting students. Describe a transaction in plain English and it returns balanced double entry, the effect on each financial statement, the policy note, the disclosures, and the SARS tax treatment.',
        problem:
            'Students can follow a worked example but stall on the transaction in front of them. Textbooks give the rule; nothing walks the specific numbers through journal entry, deferred tax, VAT and disclosure in one pass.',
        approach: [
            'Structured output through a Zod-validated schema — the model cannot return an unbalanced journal entry, because the shape will not parse.',
            'Every line is tagged with the statement it lands on, and carries a plain-English "why" underneath.',
            'Three tiers of control narrow the answer: single transaction or full scenario, accounting or tax or both, and whether VAT is raised at all.',
            'Choosing "without VAT" treats amounts as VAT-exclusive rather than just hiding lines — the entries genuinely change.',
            'Disclosures cite the exact IAS/IFRS paragraph, with illustrative wording using this transaction\'s figures.',
            'Teaching notes flag the trap students fall into for each transaction type.',
        ],
        highlights: [
            { label: 'Framework', value: 'IFRS + SARS' },
            { label: 'Output', value: 'Schema-validated' },
            { label: 'Stack', value: 'Next.js 16' },
        ],
        tech: ['Next.js 16', 'TypeScript', 'AI SDK', 'Gemini', 'Zod', 'Tailwind CSS'],
        url: 'https://ifrs-ledger.vercel.app',
        repo: 'https://github.com/Pordilz/ifrs-ledger',
        images: [
            { src: '/projects/ledger-hero.webp', alt: 'The Ledger landing page', label: 'The Ledger' },
            { src: '/projects/ledger-full.webp', alt: 'The Ledger transaction controls', label: 'Controls' },
        ],
        icon: BookOpen,
        color: '#9E2A2B',
        featured: true,
    },
    {
        id: 'vidmetrics',
        slug: 'vidmetrics',
        title: 'VidMetrics',
        category: 'Analytics Product',
        kind: 'product',
        year: '2026',
        status: 'Live',
        tagline: 'Paste a channel. See exactly what is winning.',
        description:
            'Competitive YouTube intelligence. Paste any channel URL, handle or ID and it turns the latest uploads into a dashboard — trending scores, engagement breakdowns, publishing cadence, and side-by-side channel comparison.',
        problem:
            'YouTube Analytics only shows you your own channel. Working out why a competitor is growing means opening thirty videos in tabs and eyeballing the numbers.',
        approach: [
            'VidScore blends relative view strength, engagement and recency, so a strong new upload surfaces instead of being buried by lifetime channel size.',
            'All API calls proxy through server route handlers — no key ever reaches the browser.',
            'Publishing-cadence heatmap with a desktop tooltip and a separate mobile tap-to-inspect pattern, because hover does not exist on a phone.',
            'Curated demo datasets stand in when the API is unavailable, so a live demo never dies on stage.',
            'Mobile drops the table for cards rather than letting columns collapse into noise.',
            'CSV export and copy-link sharing of the current dashboard state.',
        ],
        highlights: [
            { label: 'Ranking', value: 'VidScore' },
            { label: 'Mode', value: 'Multi-channel' },
            { label: 'Keys', value: 'Server-side only' },
        ],
        tech: ['Next.js', 'TypeScript', 'Chart.js', 'shadcn/ui', 'Tailwind CSS', 'YouTube Data API'],
        url: 'https://vidmetrics-omega.vercel.app',
        repo: 'https://github.com/Pordilz/VidMetrics',
        images: [
            { src: '/projects/vidmetrics-hero.webp', alt: 'VidMetrics landing page', label: 'VidMetrics' },
            { src: '/projects/vidmetrics-full.webp', alt: 'VidMetrics dashboard', label: 'Dashboard' },
        ],
        icon: BarChart3,
        color: '#E85D2A',
        featured: true,
    },
    {
        id: 'scentcast',
        slug: 'scentcast',
        title: 'ScentCast',
        category: 'Android App',
        kind: 'mobile',
        year: '2025',
        status: 'Source available',
        tagline: 'Picks tonight\'s fragrance from tonight\'s weather.',
        description:
            'A native Android app that reads your local weather and recommends a scent from your own collection. Built on MVVM with Room for the wardrobe and Retrofit for live conditions.',
        problem:
            'A fragrance collection is a wardrobe nobody indexes. The right bottle for a 30°C Durban afternoon is not the right bottle for a cold evening, and most people default to the same two.',
        approach: [
            'A dedicated RecommendationEngine scores the collection against current temperature — citrus and aquatic above 25°C, oud and leather below 10°C.',
            'MVVM throughout: a repository mediates between the Room database and the weather API, and the ViewModel exposes LiveData so the UI updates without leaking.',
            'Full CRUD over the wardrobe, plus a longevity timer that tracks the last application and prompts a reapply.',
            'Discovery mode suggests bottles outside the collection that suit the current climate.',
            'The recommendation logic is unit-tested in isolation from the UI.',
        ],
        highlights: [
            { label: 'Language', value: 'Kotlin' },
            { label: 'Pattern', value: 'MVVM' },
            { label: 'Storage', value: 'Room' },
        ],
        tech: ['Kotlin', 'MVVM', 'Room', 'Retrofit', 'Coroutines', 'Material Design'],
        repo: 'https://github.com/Pordilz/ScentCast',
        icon: Wind,
        color: '#0891B2',
        featured: true,
    },
    {
        id: 'skylogger',
        slug: 'skylogger',
        title: 'SkyLogger',
        category: 'Data Engineering',
        kind: 'data',
        year: '2026',
        status: 'Source available',
        tagline: 'Live flight telemetry, captured and kept.',
        description:
            'A containerised aviation telemetry pipeline. It ingests live position, altitude and velocity data from the OpenSky Network, persists it to PostgreSQL, and plots the traffic on an interactive dashboard.',
        problem:
            'Public flight trackers show you the sky right now and then throw it away. There is no way to keep the history and ask questions of it later.',
        approach: [
            'Split into services — ingestion, database and dashboard each run in their own container, orchestrated together.',
            'A scheduled ingestion worker polls the OpenSky API and writes normalised telemetry to PostgreSQL.',
            'Persistent storage means the interesting question — what changed over time — is actually answerable.',
            'Streamlit front end renders both a live map and historical queries over the stored data.',
        ],
        highlights: [
            { label: 'Architecture', value: 'Microservices' },
            { label: 'Store', value: 'PostgreSQL' },
            { label: 'Runtime', value: 'Docker' },
        ],
        tech: ['Python', 'Docker', 'PostgreSQL', 'Streamlit', 'OpenSky API'],
        repo: 'https://github.com/Pordilz/skylogger-project',
        icon: Plane,
        color: '#2563EB',
        featured: true,
    },
    {
        id: 'the-vault',
        slug: 'the-vault',
        title: 'The Vault',
        category: 'Cloud Infrastructure',
        kind: 'infrastructure',
        year: '2026',
        status: 'Source available',
        tagline: 'A document archive that cannot be tampered with.',
        description:
            'A compliant cloud archive for sensitive records, defined entirely in Terraform. S3 Object Lock in compliance mode enforces write-once-read-many, so nothing can be altered or deleted inside its retention window — not even by the account that owns it.',
        problem:
            'Medical and legal records carry retention obligations that a normal bucket cannot satisfy. "We promise not to delete it" is not a control an auditor accepts.',
        approach: [
            'S3 Object Lock in compliance mode with a 365-day retention period — immutability enforced by the platform, not by policy.',
            'Server-side encryption with a customer-managed KMS key, for key rotation and granular access control.',
            'Public access blocked at the bucket level, unconditionally.',
            'A lifecycle rule moves objects to Glacier Deep Archive after 30 days, cutting long-term storage cost by an order of magnitude.',
            'The whole thing is infrastructure as code — the archive is reproducible and its controls are reviewable in a diff.',
        ],
        highlights: [
            { label: 'Model', value: 'WORM' },
            { label: 'Encryption', value: 'SSE-KMS' },
            { label: 'Defined in', value: 'Terraform' },
        ],
        tech: ['Terraform', 'AWS S3', 'S3 Object Lock', 'AWS KMS', 'Glacier Deep Archive'],
        repo: 'https://github.com/Pordilz/The-vault',
        icon: Lock,
        color: '#7B42BC',
        featured: true,
    },
    {
        id: 'daybook',
        slug: 'daybook',
        title: 'Daybook',
        category: 'Internal Tooling',
        kind: 'internal',
        year: '2026',
        status: 'Internal',
        tagline: 'One morning brief, assembled from six sources.',
        description:
            'The data layer behind a personal morning dashboard. A single serverless endpoint aggregates weather, market movements and headlines from several providers, normalises them, and answers in one cached response.',
        problem:
            'A useful morning brief needs half a dozen providers, each with its own shape, its own failure mode and its own latency. Calling them one at a time from the client makes for a dashboard that loads slowly and breaks whenever any one source is down.',
        approach: [
            'One endpoint fans out to every provider in parallel and returns a single normalised payload.',
            'Partial failure is a first-class case — anything that fails is reported alongside the data that succeeded, so one dead provider never blanks the dashboard.',
            'Responses cache at the edge for 15 minutes, which keeps the dashboard instant and the providers unbothered.',
            'The payload is composable: callers ask for only the sections they need, and can drop trend series that make up roughly 40% of the response weight.',
            'Public data only — no keys, no personal data in transit. Upstream HTML is parsed server-side and discarded, so only the few lines that matter travel.',
        ],
        highlights: [
            { label: 'Surface', value: 'One endpoint' },
            { label: 'Cache', value: '15 min edge' },
            { label: 'Failure', value: 'Partial-safe' },
        ],
        tech: ['Node.js', 'Vercel Functions', 'Open-Meteo', 'RSS Aggregation', 'Edge Caching'],
        icon: Sunrise,
        color: '#D97706',
        featured: true,
    },
];

// ─── The Lab ───
// Smaller builds, games and tools. Kept deliberately short: these are here to
// show range, not to be case studies.

export type LabTag = 'Game' | 'Tool' | 'Bot' | 'Web';

export interface LabItem {
    id: string;
    title: string;
    blurb: string;
    tag: LabTag;
    tech: string[];
    repo?: string;
    url?: string;
    icon: React.ElementType;
    color: string;
}

export const labItems: LabItem[] = [
    {
        id: 'pirate-platformer',
        title: 'Pirate Platformer',
        blurb: 'Tile-based level design, sprite animation and collision physics.',
        tag: 'Game',
        tech: ['Python', 'Pygame'],
        repo: 'https://github.com/Pordilz/Pirate-Platformer',
        icon: Swords,
        color: '#B45309',
    },
    {
        id: 'jumpman',
        title: 'JumpMan',
        blurb: 'Side-scrolling endless runner with gravity, jump physics and sound.',
        tag: 'Game',
        tech: ['Python', 'Pygame'],
        repo: 'https://github.com/Pordilz/JumpMan',
        icon: Rocket,
        color: '#0D9488',
    },
    {
        id: 'bubble-blaster',
        title: 'Bubble Blaster',
        blurb: 'Arcade shooter on a tkinter Canvas — game loop, hit detection, countdown.',
        tag: 'Game',
        tech: ['Python', 'tkinter'],
        repo: 'https://github.com/Pordilz/Bubble-BlasterV1',
        icon: Target,
        color: '#7C3AED',
    },
    {
        id: 'ball-nolij',
        title: 'Ball Nolij Quiz',
        blurb: 'Terminal football trivia. Three difficulty tiers, randomised from file-backed banks.',
        tag: 'Game',
        tech: ['Python'],
        repo: 'https://github.com/Pordilz/Ball-Nolij-Quiz',
        icon: Gamepad2,
        color: '#16A34A',
    },
    {
        id: 'rock-paper-scissors',
        title: 'Elemental RPS',
        blurb: 'Rock paper scissors extended through inheritance — each element declares its own strengths.',
        tag: 'Game',
        tech: ['Java', 'OOP'],
        repo: 'https://github.com/Pordilz/RockPaperScissors',
        icon: Swords,
        color: '#DC2626',
    },
    {
        id: 'wordle-bot',
        title: 'Wordle Bot',
        blurb: 'Filters candidates against green/yellow/grey feedback, then ranks by letter frequency.',
        tag: 'Bot',
        tech: ['Python', 'Streamlit', 'pandas'],
        repo: 'https://github.com/Pordilz/Wordle-Bot',
        icon: Bot,
        color: '#2563EB',
    },
    {
        id: 'numble-bot',
        title: 'Numble Bot',
        blurb: 'Searches arithmetic combinations and parentheses to hit the target number.',
        tag: 'Bot',
        tech: ['Python', 'Streamlit'],
        repo: 'https://github.com/Pordilz/Numble-bot',
        url: 'https://numblebot.streamlit.app/',
        icon: Bot,
        color: '#DB2777',
    },
    {
        id: 'x-os-2',
        title: 'X-Os-2',
        blurb: 'Tic-tac-toe with win detection across rows, columns and diagonals.',
        tag: 'Game',
        tech: ['Python', 'Streamlit', 'NumPy'],
        repo: 'https://github.com/Pordilz/X-Os-2',
        url: 'https://xandos2.streamlit.app/',
        icon: Grid2x2,
        color: '#0891B2',
    },
    {
        id: 'habit-tracker',
        title: 'Habit Tracker',
        blurb: 'CLI habit tracking with long-term streak visualisation and local analytics.',
        tag: 'Tool',
        tech: ['Python', 'CLI'],
        repo: 'https://github.com/Pordilz/habit_tracker',
        icon: ListChecks,
        color: '#65A30D',
    },
    {
        id: 'linkhub',
        title: 'LinkHub',
        blurb: 'Link-in-bio app with auth and per-user profiles, in the style of Linktree.',
        tag: 'Web',
        tech: ['SvelteKit', 'TypeScript', 'Firebase'],
        repo: 'https://github.com/Pordilz/LinkHub',
        icon: Link2,
        color: '#EA580C',
    },
    {
        id: 'myp-portfolio',
        title: 'Portfolio Site',
        blurb: 'Personal portfolio, deployed automatically through GitHub Actions.',
        tag: 'Web',
        tech: ['React', 'TypeScript', 'shadcn/ui'],
        repo: 'https://github.com/Pordilz/MYP-PortfolioWebsite',
        url: 'https://pordilz.github.io/MYP-PortfolioWebsite/',
        icon: Link2,
        color: '#4F46E5',
    },
    {
        id: 'helldivers',
        title: 'Helldivers Landing',
        blurb: 'Fan-made recruitment landing page, built as a pure HTML and CSS layout exercise.',
        tag: 'Web',
        tech: ['HTML', 'CSS'],
        repo: 'https://github.com/Pordilz/Helldivers-landing-page',
        icon: Rocket,
        color: '#CA8A04',
    },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const projectCategories = ['All', 'Client', 'Product', 'Mobile', 'Data', 'Infrastructure', 'Internal'] as const;

export const kindLabels: Record<ProjectKind, string> = {
    client: 'Client',
    product: 'Product',
    mobile: 'Mobile',
    data: 'Data',
    infrastructure: 'Infrastructure',
    internal: 'Internal',
};

/** For narrow window title bars, where the full label crowds the traffic lights. */
export const kindLabelsCompact: Record<ProjectKind, string> = {
    ...kindLabels,
    infrastructure: 'Infra',
};

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
}
