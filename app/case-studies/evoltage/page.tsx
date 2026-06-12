import type { Metadata } from 'next';
import CaseStudyClient from './CaseStudyClient';

export const metadata: Metadata = {
  title: 'Evoltage UK — Case Study | Kicksnare',
  description:
    "How we rebuilt a 24-hour electrician's website in 3 days. SEO 10→80+. Phone number in 0 seconds.",
  alternates: { canonical: '/case-studies/evoltage' },
  openGraph: {
    title: 'Evoltage UK — A website rebuild that actually mattered',
    description: 'Nobody in the dark wants to read more. We fixed that.',
    url: 'https://www.kicksnare.digital/case-studies/evoltage',
    type: 'article',
  },
};

export default function EvoltageCase() {
  return <CaseStudyClient />;
}
