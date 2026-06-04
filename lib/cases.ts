export interface CaseStudy {
  id: string;
  name: string;
  tagline: string;
  sector: string;
  year: string;
  duration: string;
  role: string;
  stack: string;
  services: string[];
  tone: string;
  // Work card fields
  tag: string;
  blurb: string;
  meta: string;
  figure: string;
  problem: {
    lede: string;
    detail: string;
    pains: string[];
  };
  approach: {
    lede: string;
    steps: { n: string; t: string; d: string }[];
    insight: { label: string; body: string };
  };
  solution: {
    shipped: string[];
    figures: { label: string; aspect: string }[];
  };
  result: {
    lede: string;
    stats: { v: string; l: string; sub: string }[];
    quote: { body: string; who: string; role: string };
  };
}

export interface HeroProject {
  id: string | null;
  name: string;
  meta: string;
}

export const cases: CaseStudy[] = [
  {
    id: 'halocrate',
    name: 'Halocrate',
    tagline: 'Cut bounce by 41% and demo bookings by 2.6\u00d7 on a 1.2M-visit SaaS site.',
    sector: 'B2B SaaS \u00b7 Devtools', year: '2025', duration: '6 weeks',
    role: 'Design + dev lead', stack: 'Next.js \u00b7 Vercel \u00b7 Framer',
    services: ['Web design', 'Web development', 'CRO'],
    tone: '#FBE9B8',
    tag: 'Web design \u00b7 Dev',
    blurb: 'B2B SaaS marketing site rebuild. Cut bounce on /pricing by 41% and pushed demo bookings up 2.6\u00d7.',
    meta: '2025 \u00b7 6 wks',
    figure: 'product \u00b7 4:3',
    problem: {
      lede: 'Halocrate brought in 1.2M annual visitors, but their legacy site couldn\u2019t keep up with the scale.',
      detail: "The marketing site was a patchwork of four years of different freelancers. Bounce on /pricing was 73% because the page led with technical features instead of outcomes. Traffic was climbing, but demo bookings remained flat for three consecutive quarters.",
      pains: [
        '/pricing answered technical questions, not buyer objections',
        'Competing CTAs above the fold diluted primary funnel intent',
        'Mobile conversion was 68% lower than desktop with no tracking in place',
      ],
    },
    approach: {
      lede: 'Marketing sites are products. They require the same artifacts and rigor.',
      steps: [
        { n: '01', t: 'Funnel teardown', d: 'Analyzed 90 days of GA4 + Heap data. Sized every leak in dollars of CAC.' },
        { n: '02', t: 'Customer calls', d: 'Interviewed 12 customers to identify the exact friction point in the buying journey.' },
        { n: '03', t: 'Hypothesis matrix', d: 'Scored every proposed change by expected lift vs effort. Prioritized sprint one for maximum ROI.' },
        { n: '04', t: '1-week sprints', d: 'New /pricing live in week 2. Full homepage rebuild in week 4. Sales handoff in week 6.' },
      ],
      insight: { label: 'The bet', body: "Halocrate's buyer reads the docs before the pricing page. We rebuilt /pricing to lead with the integration matrix, not the tier ladder." },
    },
    solution: {
      shipped: ['New homepage (5 sections, replaces 11)', 'New /pricing \u2014 integration-first, ROI calculator inline', 'New /docs landing with task-based nav', 'Mobile redesign \u2014 60% reduction in page weight', 'GA4 + Segment event spec + revenue dashboard', 'Sales handoff: Notion + Loom playbook'],
      figures: [{ label: '/pricing \u00b7 before \u00b7 after', aspect: '16/9' }, { label: '/homepage \u00b7 5 sections', aspect: '4/5' }, { label: 'ROI calculator \u00b7 inline', aspect: '4/5' }, { label: 'mobile \u00b7 key flows', aspect: '9/19' }],
    },
    result: {
      lede: "Inside 60 days, Halocrate's funnel was rebuilt for revenue.",
      stats: [{ v: '-41%', l: 'Bounce on /pricing', sub: '90-day rolling' }, { v: '2.6\u00d7', l: 'Demo bookings', sub: 'vs. prior quarter' }, { v: '-23%', l: 'Blended CAC', sub: 'paid + organic' }, { v: '3.4\u00d7', l: 'Mobile conversion', sub: 'previously flat' }],
      quote: { body: "Kicksnare treated our site like a product. We got back something we could iterate on \u2014 not a redesign we'd have to redo in 18 months.", who: 'Maya O.', role: 'VP Growth, Halocrate' },
    },
  },
  {
    id: 'northbeam',
    name: 'Northbeam DTC',
    tagline: '3.1\u00d7 ROAS on a $1.2M/yr paid account in one quarter.',
    sector: 'DTC \u00b7 Apparel', year: '2025 \u00b7 ongoing', duration: 'Ongoing retainer',
    role: 'Paid + UX lead', stack: 'Meta \u00b7 Google \u00b7 Shopify \u00b7 Klaviyo',
    services: ['Paid growth', 'UX', 'CRO'],
    tone: '#D9E8E2',
    tag: 'Paid growth \u00b7 UX',
    blurb: 'Funnel teardown and Meta + Google rebuild on a $1.2M/yr DTC account. 3.1\u00d7 ROAS in Q1.',
    meta: '2025 \u00b7 ongoing',
    figure: 'dashboard \u00b7 16:10',
    problem: {
      lede: 'Northbeam spent $100k monthly on ads without knowing which channels were driving profit.',
      detail: 'Spend was climbing but ROAS was a black box. Ad fatigue was high, and the landing page experience for cold traffic was generic. No one could identify which channels were profitable within the return window.',
      pains: ['Severe ad fatigue on top creative concepts', 'Single landing page used for all campaign types', 'Klaviyo flows had not been updated since 2023'],
    },
    approach: {
      lede: 'Diagnose first. Spend second.',
      steps: [
        { n: '01', t: 'Attribution audit', d: "Implemented multi-touch attribution. Discovered 38% of 'Meta sales' were misattributed organic traffic." },
        { n: '02', t: 'Creative teardown', d: 'Identified 4 winning concepts and killed 11 underperformers. established 6-variant weekly cadence.' },
        { n: '03', t: 'Intent-matched LPs', d: 'Built 6 dedicated landing pages tailored to specific audience \u00d7 intent quadrants.' },
        { n: '04', t: 'Lifecycle rebuild', d: 'Complete rewrite of welcome, abandoned cart, and winback sequences.' },
      ],
      insight: { label: 'The bet', body: "Cold traffic does not want a homepage. We build pages that answer the ad the user just clicked, and nothing else." },
    },
    solution: {
      shipped: ['Multi-touch attribution dashboard', '6 audience-matched landing pages', 'Weekly creative pipeline (12/wk)', 'Klaviyo welcome / abandoned / winback', 'Daily channel pacing report', 'Quarterly creative review cadence'],
      figures: [{ label: 'attribution dashboard', aspect: '16/9' }, { label: 'cold LP \u00b7 variant A', aspect: '4/5' }, { label: 'creative pipeline', aspect: '4/5' }, { label: 'lifecycle flows', aspect: '16/9' }],
    },
    result: {
      lede: 'One quarter in, ROAS tripled and CAC fell by 34%.',
      stats: [{ v: '3.1\u00d7', l: 'Blended ROAS', sub: 'Q1 vs Q4' }, { v: '-34%', l: 'Blended CAC', sub: 'Q1 vs Q4' }, { v: '+58%', l: 'Email revenue', sub: 'lifecycle flows' }, { v: '12', l: 'Creative / week', sub: 'from 2/wk' }],
      quote: { body: 'For the first time we can tell which ads generated revenue. That changed how the entire team plans.', who: 'Tom\u00e1s L.', role: 'CMO, Northbeam' },
    },
  },
  {
    id: 'mara',
    name: 'Studio Mara',
    tagline: 'Cut no-shows by 26% across a 14-location wellness chain.',
    sector: 'Wellness \u00b7 Multi-location', year: '2024', duration: '9 weeks',
    role: 'Product design + SEO', stack: 'React Native \u00b7 Supabase \u00b7 Webflow',
    services: ['App design', 'SEO', 'Brand'],
    tone: '#FCE0CC',
    tag: 'App design \u00b7 SEO',
    blurb: 'Booking app for a 14-location wellness chain. Cut no-shows 26% and added a programmatic SEO layer.',
    meta: '2024 \u00b7 9 wks',
    figure: 'screens \u00b7 9:19',
    problem: {
      lede: 'Studio Mara lost 22% of its revenue every month to double-bookings and clients who didn\u2019t show up.',
      detail: 'The existing platform could not scale with the business. Bookings were leaking through unconfirmed slots, and location pages were identical, killing any chance of local SEO rankings.',
      pains: ['No-show rate increasing as locations scaled', 'Operational drift between app and staff schedules', '14 near-duplicate pages with zero local SEO presence'],
    },
    approach: {
      lede: 'One app for clients. One ops view for managers. One programmatic SEO layer.',
      steps: [
        { n: '01', t: 'Booking flow rewrite', d: 'Reduced steps from 7 to 3. Added one-tap reschedule from the home screen.' },
        { n: '02', t: 'Ops dashboard', d: 'Built a single-screen manager view with real-time schedule drift alerts.' },
        { n: '03', t: 'Programmatic SEO', d: 'Generated 14 unique location pages with neighborhood content and local reviews.' },
        { n: '04', t: 'Phased rollout', d: 'Deployed to 2 locations per week with zero downtime during cutover.' },
      ],
      insight: { label: 'The bet', body: 'Most no-shows are forgotten bookings. A 24h SMS with a one-tap reschedule option fixes the majority of them.' },
    },
    solution: {
      shipped: ['New booking flow (3 steps)', 'Manager operations dashboard', '14 programmatic location pages', '24h SMS reminder + reschedule system', 'Local schema + automated reviews', 'Phased rollout playbook'],
      figures: [{ label: 'booking flow \u00b7 3 steps', aspect: '9/19' }, { label: 'ops dashboard', aspect: '16/9' }, { label: 'location page \u00b7 template', aspect: '4/5' }, { label: 'SMS \u00b7 reschedule flow', aspect: '9/19' }],
    },
    result: {
      lede: 'Inside 90 days, the chain achieved its highest utilization month on record.',
      stats: [{ v: '-26%', l: 'No-show rate', sub: 'chain-wide' }, { v: '+38%', l: 'Local organic traffic', sub: '90-day rolling' }, { v: '+19%', l: 'Slot utilization', sub: 'average' }, { v: '3', l: 'Booking steps', sub: 'down from 7' }],
      quote: { body: 'The app finally fits the business. We grew two more locations this year without the usual chaos.', who: 'Inez W.', role: 'Founder, Studio Mara' },
    },
  },
];

export const heroProjects: HeroProject[] = [
  { id: 'halocrate', name: 'Halocrate', meta: 'B2B SaaS \u00b7 2025' },
  { id: 'northbeam', name: 'Northbeam DTC', meta: 'Paid growth \u00b7 2025' },
  { id: 'mara', name: 'Studio Mara', meta: 'Booking app \u00b7 2024' },
  { id: null, name: 'Lattice OS', meta: 'Web design \u00b7 2024' },
  { id: null, name: 'Vela Mobility', meta: 'Brand + site \u00b7 2024' },
];
