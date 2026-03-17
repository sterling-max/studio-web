import { motion } from 'framer-motion';

interface LegalPageProps {
  onBack: () => void;
}

export const PrivacyPolicy = ({ onBack }: LegalPageProps) => {
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

        <h1 className="text-4xl font-bold mb-12">Privacy <span className="text-sterling-blue">Policy</span></h1>
        
        <div className="prose prose-invert max-w-none space-y-8 text-sterling-mist/70">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. General Information</h2>
            <p>
              Sterling Lab takes the protection of your personal data very seriously. The "Controller" responsible for processing your personal data under the General Data Protection Regulation (GDPR) is Maximiliano Villarreal.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. Data Collection on this Website</h2>
            <h3 className="text-lg font-semibold text-sterling-mist mb-2">Server Log Files</h3>
            <p>
              The provider of the pages automatically collects and stores information in so-called server log files, which your browser automatically transmits to us. These are:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Browser type and browser version</li>
              <li>Operating system used</li>
              <li>Referrer URL</li>
              <li>Host name of the accessing computer</li>
              <li>Time of the server request</li>
              <li>IP address</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. Third-Party Services & Data Processors</h2>
            <p>
              To provide our services, we use the following third-party processors:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Paddle:</strong> Our merchant of record for processing payments and managing tax compliance.</li>
              <li><strong>Resend:</strong> Used for sending transactional emails and license keys.</li>
              <li><strong>Cloudflare:</strong> Provides our global hosting, DNS, and secure Worker infrastructure.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Third-Country Transfers</h2>
            <p>
              Some of our processors (Paddle, Resend) are based in the United States. We ensure that your data is protected through Standard Contractual Clauses (SCCs) as approved by the European Commission, ensuring a level of data protection comparable to that of the GDPR.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">5. Licensing System</h2>
            <p>
              When you purchase or activate a license for our software, we collect your email address and a unique hardware identifier (Machine ID) to manage your license and prevent unauthorized use. This data is handled via our secure Cloudflare-based infrastructure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">6. Your Rights</h2>
            <p>
              Under the GDPR, you have the right to access, rectify, or delete your personal data. You can contact the controller directly at max@sterling.ltd for any privacy-related inquiries.
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
