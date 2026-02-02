import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface PricingPlan {
  price: string;
  type: string;
  features: string[];
  badge: string;
  highlight: boolean;
}

interface PricingProps {
  plans: PricingPlan[];
}

export const Pricing = ({ plans }: PricingProps) => {
  return (
    <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Simple <span className="text-sterling-blue">Pricing</span></h2>
        <p className="text-sterling-mist/60 text-lg">One-time payment. No subscriptions. Complete ownership.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "relative p-8 rounded-[2.5rem] border flex flex-col items-center text-center overflow-hidden transition-all duration-300",
              plan.highlight 
                ? "bg-sterling-surface border-sterling-blue/50 shadow-[0_0_40px_rgba(0,122,255,0.15)] scale-105 z-10" 
                : "bg-sterling-deep border-sterling-mist/5 hover:border-sterling-mist/20"
            )}
          >
            <span className={cn(
              "inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase rounded-full",
              plan.highlight 
                ? "bg-sterling-blue text-white" 
                : "bg-sterling-mist/5 text-sterling-mist/50"
            )}>
              {plan.badge}
            </span>

            <div className="text-5xl font-bold mb-2 text-sterling-mist">
              {plan.price}
            </div>
            <div className="text-sterling-mist/50 mb-8 font-medium">
              {plan.type}
            </div>

            <ul className="space-y-4 mb-10 w-full">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center justify-center gap-3 text-sterling-mist/80">
                  <div className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
                    plan.highlight ? "bg-sterling-blue text-white" : "bg-sterling-mist/10 text-sterling-mist/50"
                  )}>
                    <Check size={12} strokeWidth={3} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <button className={cn(
              "w-full py-4 rounded-xl font-bold transition-all mt-auto",
              plan.highlight 
                ? "bg-sterling-blue text-white hover:shadow-[0_0_30px_rgba(0,122,255,0.4)] hover:scale-[1.02]" 
                : "bg-sterling-mist/5 text-sterling-mist hover:bg-sterling-mist/10"
            )}>
              Get Started
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
