import { motion } from 'framer-motion';
import { Check, Download, ShieldCheck, CreditCard } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface PricingPlan {
  price: string;
  type: string;
  features: string[];
  badge: string;
  highlight: boolean;
  isFree?: boolean;
  priceId?: string;
  buttonLabel?: string;
  comingSoon?: boolean;
}

import { useState } from 'react';
import { startStripeCheckout } from '../../constants/checkout';

interface PricingProps {
  plans: PricingPlan[];
  showHeader?: boolean;
  showFooterNote?: boolean;
}

export const Pricing = ({ plans, showHeader = true, showFooterNote = true }: PricingProps) => {
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);

  const handleCheckout = async (plan: PricingPlan) => {
    if (plan.isFree) {
        // Trigger download via worker alias
        // Add a cache buster (timestamp) to ensure the Worker is always triggered
        const cacheBuster = Date.now();
        window.location.href = `/download/mc-setup.exe?t=${cacheBuster}`;
        
        // Immediate scroll to SmartScreen guide
        document.getElementById('smartscreen-guide')?.scrollIntoView({ behavior: 'smooth' });
        return;
    }

    if (plan.priceId && !plan.comingSoon) {
      setLoadingPriceId(plan.priceId);
      await startStripeCheckout(plan.priceId, (err) => {
        alert(err);
        setLoadingPriceId(null);
      });
    }
  };

  return (
    <section id="pricing" className="py-8 px-6 max-w-7xl mx-auto scroll-mt-24">
      {showHeader && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Simple <span className="text-sterling-blue">Pricing</span></h2>
          <p className="text-sterling-mist/60 text-base">Free download now. Pro features available via license key.</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "relative p-5 rounded-[2rem] border flex flex-col items-center text-center overflow-hidden transition-all duration-300",
              plan.highlight 
                ? "bg-sterling-surface border-sterling-blue/50 shadow-[0_0_40px_rgba(0,122,255,0.15)] scale-105 z-10" 
                : "bg-sterling-deep border-sterling-mist/5 hover:border-sterling-mist/20"
            )}
          >
            <span className={cn(
              "inline-block px-3 py-1 mb-3 text-[10px] font-bold tracking-widest uppercase rounded-full",
              plan.highlight 
                ? "bg-sterling-blue text-white" 
                : "bg-sterling-mist/5 text-sterling-mist/50"
            )}>
              {plan.badge}
            </span>

            <div className="text-3xl font-bold mb-1 text-sterling-mist">
              {plan.price}
            </div>
            <div className="text-sterling-mist/50 text-sm mb-4 font-medium">
              {plan.type}
            </div>

            <ul className="space-y-2 mb-6 w-full">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center justify-center gap-2 text-xs text-sterling-mist/70">
                  <div className={cn(
                    "w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0",
                    plan.highlight ? "bg-sterling-blue text-white" : "bg-sterling-mist/10 text-sterling-mist/50"
                  )}>
                    <Check size={10} strokeWidth={3} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <button 
              onClick={() => handleCheckout(plan)}
              disabled={(!plan.isFree && !plan.priceId) || plan.comingSoon || loadingPriceId === plan.priceId}
              className={cn(
                "w-full py-3 rounded-xl font-bold transition-all mt-auto flex items-center justify-center gap-2",
                plan.isFree || (plan.priceId && !plan.comingSoon)
                  ? "cursor-pointer"
                  : "cursor-not-allowed opacity-70",
                plan.highlight && (plan.isFree || (plan.priceId && !plan.comingSoon))
                  ? "bg-sterling-blue text-white hover:shadow-[0_0_30px_rgba(0,122,255,0.4)] hover:scale-[1.02]" 
                  : "bg-sterling-mist/5 text-sterling-mist hover:bg-sterling-mist/10"
              )}
            >
              {loadingPriceId === plan.priceId ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : plan.buttonLabel ? (
                plan.buttonLabel
              ) : plan.isFree ? (
                <>
                  <Download size={18} />
                  Download Free
                </>
              ) : plan.comingSoon ? (
                'Available Soon'
              ) : (
                'Get License'
              )}
            </button>
          </motion.div>
        ))}
      </div>
      
      {showFooterNote && (
        <div className="mt-12 text-center">
          <div className="flex flex-col items-center justify-center gap-3 mb-6">
            <div className="flex items-center gap-1.5 text-sterling-mist/40 text-xs font-semibold uppercase tracking-widest">
              <ShieldCheck size={14} className="text-emerald-500/70" />
              Secured by Stripe
            </div>
            <div className="flex items-center gap-2 text-sterling-mist/30">
              <CreditCard size={24} />
              <div className="h-4 w-px bg-sterling-mist/10 mx-1"></div>
              <span className="text-xs font-medium">Visa · Mastercard · Amex · Apple Pay</span>
            </div>
          </div>
          
          <p className="text-sterling-mist/30 text-[11px] max-w-2xl mx-auto leading-relaxed">
            Licenses are sold as a one-time purchase. Purchases are covered by Sterling Lab's <button onClick={() => window.location.href='/terms'} className="text-sterling-blue hover:underline cursor-pointer">Terms of Service</button> and <button onClick={() => window.location.href='/refund'} className="text-sterling-blue hover:underline cursor-pointer">Refund Policy</button>.
          </p>
        </div>
      )}
    </section>
  );
};
