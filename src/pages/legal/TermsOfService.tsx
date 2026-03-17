import { motion } from 'framer-motion';

interface LegalPageProps {
  onBack: () => void;
}

export const TermsOfService = ({ onBack }: LegalPageProps) => {
  return (
    <div className="min-h-screen py-32 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <button 
          onClick={onBack}
          className="mb-8 text-sterling-blue hover:text-sterling-cyan transition-colors flex items-center gap-2"
        >
          ← Back to Sterling Lab
        </button>

        <h1 className="text-4xl font-bold mb-12">Terms of <span className="text-sterling-blue">Service</span></h1>
        
        <div className="prose prose-invert max-w-none space-y-8 text-sterling-mist/70">
          <section className="p-6 bg-sterling-blue/5 border border-sterling-blue/20 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-4">Merchant of Record</h2>
            <p className="text-sterling-mist italic">
              Our order process is conducted by our online reseller Paddle.com. Paddle.com is the Merchant of Record for all our orders. Paddle provides all customer service inquiries and handles returns.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Scope</h2>
            <p>
              These terms apply to all tools and services provided by Sterling Lab. By using our website or software, you agree to these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. Software Usage</h2>
            <p>
              Our software (such as Max Commander) is provided under specific licenses. Pro features require a valid license key. Unauthorized redistribution or modification of our software is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. Limitation of Liability & Disclaimer of Warranties</h2>
            <p>
              Sterling Lab tools are provided "as is" and "as available" without any warranties of any kind, whether express or implied. To the maximum extent permitted by law, Sterling Lab shall not be liable for any indirect, incidental, or consequential damages (including data loss or business interruption) arising out of the use of our software.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Governing Law</h2>
            <p>
              These terms and any disputes arising from the use of our services shall be governed by and construed in accordance with the laws of Italy, without regard to its conflict of law principles.
            </p>
          </section>

          <section className="text-sm pt-8 border-t border-sterling-mist/10">
            <p>
              Last updated: March 2026
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
};
