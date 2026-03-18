import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Download } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface PricingPlan {
  price: string;
  type: string;
  features: string[];
  badge: string;
  highlight: boolean;
  priceId?: string; // Paddle Price ID
  isFree?: boolean;
}

interface PricingProps {
  plans: PricingPlan[];
  showHeader?: boolean;
  showFooterNote?: boolean;
}

// Replace with your actual Paddle Client Token from Dashboard
const PADDLE_CLIENT_TOKEN = 'plt_01kkwtgs11cy5p532ngg8x8wtd'; 

export const Pricing = ({ plans, showHeader = true, showFooterNote = true }: PricingProps) => {
  useEffect(() => {
    // Initialize Paddle
    if ((window as any).Paddle) {
      (window as any).Paddle.Initialize({ 
        token: PADDLE_CLIENT_TOKEN
      });
    }
  }, []);

  const handleCheckout = (plan: PricingPlan) => {
    if (plan.isFree) {
        // Trigger download via worker alias
        window.location.href = '/download/mc-setup.exe';
        
        // Immediate scroll to SmartScreen guide
        document.getElementById('smartscreen-guide')?.scrollIntoView({ behavior: 'smooth' });
        return;
    }

    if (plan.priceId && (window as any).Paddle) {
      (window as any).Paddle.Checkout.open({
        items: [
          {
            priceId: plan.priceId,
            quantity: 1
          }
        ],
        settings: {
          displayMode: 'overlay',
          theme: 'dark',
          locale: 'en'
        }
      });
    } else {
      console.warn('Paddle Price ID missing or Paddle not initialized');
    }
  };

  return (
    <section id="pricing" className="py-12 px-6 max-w-7xl mx-auto">
      {showHeader && (
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Simple <span className="text-sterling-blue">Pricing</span></h2>
          <p className="text-sterling-mist/60 text-base">One-time payment. No subscriptions. Complete ownership.</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "relative p-6 rounded-[2rem] border flex flex-col items-center text-center overflow-hidden transition-all duration-300",
              plan.highlight 
                ? "bg-sterling-surface border-sterling-blue/50 shadow-[0_0_40px_rgba(0,122,255,0.15)] scale-105 z-10" 
                : "bg-sterling-deep border-sterling-mist/5 hover:border-sterling-mist/20"
            )}
          >
            <span className={cn(
              "inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-widest uppercase rounded-full",
              plan.highlight 
                ? "bg-sterling-blue text-white" 
                : "bg-sterling-mist/5 text-sterling-mist/50"
            )}>
              {plan.badge}
            </span>

            <div className="text-4xl font-bold mb-1 text-sterling-mist">
              {plan.price}
            </div>
            <div className="text-sterling-mist/50 text-sm mb-6 font-medium">
              {plan.type}
            </div>

            <ul className="space-y-2 mb-8 w-full">
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
              className={cn(
                "w-full py-4 rounded-xl font-bold transition-all mt-auto flex items-center justify-center gap-2",
                plan.highlight 
                  ? "bg-sterling-blue text-white hover:shadow-[0_0_30px_rgba(0,122,255,0.4)] hover:scale-[1.02]" 
                  : "bg-sterling-mist/5 text-sterling-mist hover:bg-sterling-mist/10"
              )}
            >
              {plan.isFree ? (
                <>
                  <Download size={18} />
                  Download Free
                </>
              ) : (
                'Buy Now'
              )}
            </button>
          </motion.div>
        ))}
      </div>
      {showFooterNote && (
        <div className="mt-16 text-center">
          <p className="text-sterling-mist/30 text-xs max-w-2xl mx-auto leading-relaxed">
            By completing a purchase, you agree to Sterling Lab's <button onClick={() => window.location.href='/terms'} className="text-sterling-blue hover:underline">Terms of Service</button> and <button onClick={() => window.location.href='/refund'} className="text-sterling-blue hover:underline">Refund Policy</button>.<br />
            Payments are securely processed by <strong>Paddle</strong>, our Merchant of Record.
          </p>
        </div>
      )}
    </section>
  );
};
