import type { Metadata } from 'next';
import AboutClient from '@/components/AboutClient';

export const metadata: Metadata = {
  title: 'OO — About · Kicksnare',
  description:
    'Seven years in retail product management. Now building websites that close deals. No account managers — you talk to the person who builds it.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return <AboutClient />;
}
