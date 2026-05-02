import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HelpCircle, ChevronDown, ShieldCheck, CreditCard } from 'lucide-react';
import { useState } from 'react';
import { Pricing, type PricingPlan } from './Pricing';
import { STRIPE_PRICE_FOUNDER, STRIPE_PRICE_STANDARD } from '../../constants/checkout';
import { StripeLogo, VisaLogo, MastercardLogo, ApplePayLogo, GooglePayLogo, AmexLogo, AmazonLogo } from '../PaymentLogos';

const plans: PricingPlan[] = [
  {
    price: "Free",
    type: "Personal Use",
    features: [
      "Full Dual-Pane File Manager",
      "TC-Style Keybindings (Configurable)",
      "Archive Support (ZIP, 7z, JAR)",
      "Multi-Rename (Shift+F6)",
      "Native Context Menu",
      "LAN Browsing",
      "Quick Viewer (F3)"
    ],
    badge: "Free Forever",
    highlight: false,
    isFree: true
  },
  {
    price: "€15",
    type: "Founder's Edition",
    features: [
      "Everything in Free",
      "FTP / SFTP Remote Connections",
      "Space Analyzer (Treemap)",
      "Profiles & Workspaces",
      "Plugin System (Jellyfin & more)",
      "Lifetime Updates",
      "Priority Feature Requests"
    ],
    badge: "Limited Time",
    highlight: true,
    priceId: STRIPE_PRICE_FOUNDER
  },
  {
    price: "€25",
    type: "Standard License",
    features: [
      "Everything in Free",
      "FTP / SFTP Remote Connections",
      "Space Analyzer (Treemap)",
      "Profiles & Workspaces",
      "Plugin System (Jellyfin & more)",
      "Lifetime Updates",
      "Standard Support"
    ],
    badge: "Available Later",
    highlight: false,
    priceId: STRIPE_PRICE_STANDARD,
    comingSoon: true
  }
];

const faqs = [
  {
    q: "Is this a subscription?",
    a: "No. Paid licenses will be one-time purchases when checkout opens. There will be no recurring fees, annual renewals, or surprise charges."
  },
  {
    q: "Do I need a license for commercial use even if I only use Free features?",
    a: "Yes. If you use Max Commander for work, freelancing, business, or any commercial activity, you need a Pro license regardless of which features you use."
  },
  {
    q: "Can I install it on multiple computers?",
    a: "Yes — on up to 3 personal computers you own and use. The license is tied to you as a named individual, not to a specific machine."
  },
  {
    q: "What platforms are supported?",
    a: "Max Commander runs on Windows 10 and Windows 11 only. This license does not apply to macOS, Linux, or any other platform or product."
  },
  {
    q: "Where can I buy a license?",
    a: "Licenses are available directly from Sterling Lab. Purchases from unauthorized resellers are not valid and will be voided."
  },
  {
    q: "Who handles payments and taxes?",
    a: "Payments are processed securely through Stripe. Prices shown exclude tax. VAT and applicable sales tax will be calculated at checkout based on your location."
  },
];

const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-sterling-mist/10 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left text-sterling-mist/80 hover:text-sterling-mist transition-colors cursor-pointer"
      >
        <span className="font-semibold">{q}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 transition-transform duration-300 text-sterling-blue ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <p className="pb-5 text-sterling-mist/60 text-sm leading-relaxed">{a}</p>
      )}
    </div>
  );
};

export const PricingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-6 mb-2"
      >
        <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-[0.2em] uppercase border border-sterling-blue/30 rounded-full bg-sterling-blue/5 text-sterling-cyan">
          Max Commander
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          Simple <span className="text-sterling-blue">Pricing</span>
        </h1>
        <p className="text-sterling-mist/60 text-base max-w-xl mx-auto mb-1">
          Free download now. Pro features available via license key.
        </p>
        <p className="text-sterling-mist/40 text-sm">
          Windows 10 &amp; Windows 11 only. Prices shown exclude tax.
        </p>
      </motion.div>

      {/* Pricing Cards */}
      <Pricing plans={plans} showHeader={false} showFooterNote={false} />

      {/* Legal Compliance Block */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto px-6 mt-4 mb-12 p-6 rounded-2xl bg-sterling-blue/5 border border-sterling-blue/15 flex flex-col items-center"
      >
        <div className="flex flex-col items-center justify-center gap-4 mb-6">
          <div className="flex items-center gap-2 text-sterling-mist/30 text-[10px] font-bold uppercase tracking-[0.2em]">
            <ShieldCheck size={14} className="text-emerald-500/70" />
            <span>Payments Powered by</span>
            <StripeLogo className="h-6 w-auto" />
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6">
            <VisaLogo className="h-6 w-auto" />
            <MastercardLogo className="h-6 w-auto" />
            <ApplePayLogo className="h-6 w-auto" />
            <GooglePayLogo className="h-6 w-auto" />
            <AmexLogo className="h-6 w-auto" />
            <AmazonLogo className="h-6 w-auto" />
          </div>
        </div>

        <p className="text-sterling-mist/50 text-xs leading-relaxed text-center">
          The free Windows build is available today, and Pro features are unlocked via paid licenses. 
          Prices shown exclude tax. VAT and applicable sales tax will be calculated at checkout based on your location.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs">
          <a href="/terms" className="text-sterling-blue hover:underline cursor-pointer">Terms of Service</a>
          <span className="text-sterling-mist/20">·</span>
          <a href="/refund" className="text-sterling-blue hover:underline cursor-pointer">Refund Policy</a>
          <span className="text-sterling-mist/20">·</span>
          <a href="/privacy" className="text-sterling-blue hover:underline cursor-pointer">Privacy Policy</a>
          <span className="text-sterling-mist/20">·</span>
          <a href="mailto:support@sterling.ltd" className="text-sterling-blue hover:underline cursor-pointer">Licensing Questions</a>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto px-6 mb-16"
      >
        <div className="flex items-center gap-3 mb-8">
          <HelpCircle size={20} className="text-sterling-blue" />
          <h2 className="text-2xl font-bold">Frequently Asked <span className="text-sterling-blue">Questions</span></h2>
        </div>
        <div className="bg-sterling-deep rounded-2xl border border-sterling-mist/5 px-6">
          {faqs.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
        <p className="text-center text-sterling-mist/40 text-sm mt-8">
          Still have questions?{' '}
          <a href="mailto:support@sterling.ltd" className="text-sterling-blue hover:underline cursor-pointer">
            Email support@sterling.ltd
          </a>{' '}
          and we'll help you choose the right license.
        </p>
      </motion.section>

      {/* Back link */}
      <div className="text-center">
        <button
          onClick={() => navigate('/products/max-commander')}
          className="text-sterling-mist/40 hover:text-sterling-blue text-sm transition-colors cursor-pointer"
        >
          ← View full Max Commander product page
        </button>
      </div>
    </div>
  );
};
