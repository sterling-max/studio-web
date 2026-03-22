import { motion } from 'framer-motion';
import { RefreshCw, ShieldCheck, Mail, ArrowLeft } from 'lucide-react';

interface RefundPolicyProps {
  onBack: () => void;
}

export const RefundPolicy = ({ onBack }: RefundPolicyProps) => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="flex items-center gap-2 text-sterling-mist/40 hover:text-sterling-blue transition-colors mb-12 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Sterling Lab
      </motion.button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <header>
          <div className="w-16 h-16 bg-sterling-blue/10 rounded-2xl flex items-center justify-center mb-6 text-sterling-blue">
            <RefreshCw size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Refund <span className="text-sterling-blue">Policy</span></h1>
          <p className="text-xl text-sterling-mist/50">Our commitment to your satisfaction and fairness.</p>
        </header>

        <div className="prose max-w-none space-y-8 text-sterling-mist/70">
          <section>
            <h2 className="text-xl font-bold text-sterling-mist mb-4">Try Before You Buy</h2>
            <p>
              At Sterling Lab, we believe in the quality of our tools. Most of our software, including Max Commander, offers a free version or a trial period. We strongly encourage you to evaluate the software thoroughly before making a purchase to ensure it meets your needs and runs correctly on your system.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-sterling-mist mb-4">14-Day Money-Back Guarantee</h2>
            <p>
              If you are not satisfied with your purchase, you are entitled to a full refund within **14 days** of the original purchase date. No questions asked.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-sterling-mist mb-4">How to Request a Refund</h2>
            <p>
              To request a refund, please contact us at <span className="text-sterling-mist font-medium">support@sterling.ltd</span> with the following information:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Your order number (provided by Paddle)</li>
              <li>The email address used for the purchase</li>
              <li>The license key provided</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-sterling-mist mb-4">Exceptions</h2>
            <p>
              Refunds requested after the 14-day window will be evaluated on a case-by-case basis (e.g., technical issues that prevent the software from functioning as advertised).
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-6 pt-12">
            <div className="bg-sterling-surface/50 p-6 rounded-2xl border border-sterling-mist/5">
              <ShieldCheck className="text-sterling-blue mb-4" size={24} />
              <h3 className="font-bold text-sterling-mist mb-2">Secure Payments</h3>
              <p className="text-sm">Processed via Paddle, our merchant of record, ensuring global compliance and safety.</p>
            </div>
            <div className="bg-sterling-surface/50 p-6 rounded-2xl border border-sterling-mist/5">
              <Mail className="text-sterling-blue mb-4" size={24} />
              <h3 className="font-bold text-sterling-mist mb-2">Direct Support</h3>
              <p className="text-sm">Fast, human response to all refund requests within 48 hours.</p>
            </div>
          </div>

          <section className="text-sm pt-8 border-t border-sterling-mist/10 opacity-40">
            <p>
              Last updated: March 2026<br />
              Sterling Lab by Maximiliano Villarreal
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
};
