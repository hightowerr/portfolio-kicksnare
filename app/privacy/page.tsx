import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Kicksnare",
  description: "How Kicksnare collects, uses, and protects your personal data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div
      style={{
        maxWidth: 680,
        margin: "0 auto",
        padding: "80px 24px 120px",
        fontFamily: "var(--display)",
        color: "var(--ink)",
        lineHeight: 1.7,
        fontSize: 16,
      }}
    >
      <Link
        href="/"
        style={{
          display: "inline-block",
          marginBottom: 48,
          fontSize: 14,
          color: "var(--muted)",
          textDecoration: "none",
        }}
      >
        &larr; Back to site
      </Link>

      <h1
        style={{
          fontFamily: "var(--display)",
          fontWeight: 600,
          fontSize: "clamp(2rem, 5vw, 3rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.025em",
          marginBottom: 12,
        }}
      >
        Privacy Policy
      </h1>

      <p style={{ color: "var(--muted)", marginBottom: 48 }}>
        Last updated: 5 June 2026
      </p>

      <Section title="Who we are">
        <p>
          Kicksnare is a web design and development studio based in the United
          Kingdom. When this policy refers to &ldquo;we&rdquo;,
          &ldquo;us&rdquo;, or &ldquo;our&rdquo;, it means Kicksnare.
        </p>
        <p>
          You can contact us at{" "}
          <a href="mailto:hello@kicksnare.digital">hello@kicksnare.digital</a>.
        </p>
      </Section>

      <Section title="What data we collect">
        <p>We collect personal data only when you provide it directly:</p>
        <ul>
          <li>
            <strong>Contact form:</strong> your name, email address, and message
            content, submitted via Formspree.
          </li>
          <li>
            <strong>Booking link:</strong> any information you provide when
            scheduling a call through our booking system.
          </li>
        </ul>
        <p>
          We do not use cookies, analytics trackers, or any third-party tracking
          scripts on this website.
        </p>
      </Section>

      <Section title="How we use your data">
        <p>We use the information you provide solely to:</p>
        <ul>
          <li>Respond to your enquiry or message</li>
          <li>Schedule and conduct a consultation</li>
          <li>Deliver the services you have engaged us for</li>
        </ul>
        <p>
          We do not sell, rent, or share your personal data with third parties
          for marketing purposes.
        </p>
      </Section>

      <Section title="Third-party processors">
        <p>
          Your contact form submissions are processed by{" "}
          <a
            href="https://formspree.io/legal/privacy-policy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Formspree
          </a>
          , which stores your submission data on servers in the United States.
          Formspree acts as a data processor on our behalf.
        </p>
        <p>
          This website is hosted by{" "}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel
          </a>
          , which may process server logs containing IP addresses and request
          metadata.
        </p>
      </Section>

      <Section title="Data retention">
        <p>
          We retain contact form submissions for as long as necessary to respond
          to your enquiry and for up to 12 months afterwards for our records. You
          may request deletion at any time.
        </p>
      </Section>

      <Section title="Your rights">
        <p>Under UK GDPR, you have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to or restrict processing of your data</li>
          <li>Request a copy of your data in a portable format</li>
        </ul>
        <p>
          To exercise any of these rights, email{" "}
          <a href="mailto:hello@kicksnare.digital">hello@kicksnare.digital</a>.
          We will respond within 30 days.
        </p>
      </Section>

      <Section title="Changes to this policy">
        <p>
          We may update this policy from time to time. The &ldquo;last
          updated&rdquo; date at the top of this page will reflect the most
          recent revision.
        </p>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2
        style={{
          fontFamily: "var(--display)",
          fontWeight: 600,
          fontSize: 20,
          letterSpacing: "-0.01em",
          marginBottom: 12,
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
