import { motion } from 'framer-motion';

interface LegalPageProps {
  onBack: () => void;
}

export const LegalNotice = ({ onBack }: LegalPageProps) => {
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

        <h1 className="text-4xl font-bold mb-12">Legal <span className="text-sterling-blue">Notice</span></h1>
        
        <div className="prose prose-invert max-w-none space-y-8 text-sterling-mist/70">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">Information according to § 5 TMG</h2>
            <p>
              Sterling Lab<br />
              Maximiliano Villarreal
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">Contact</h2>
            <p>
              Email: max@sterling.ltd<br />
              Website: www.sterling.ltd
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">Dispute Resolution</h2>
            <p>
              The European Commission provides a platform for online dispute resolution (OS): 
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-sterling-blue hover:underline ml-1">
                https://ec.europa.eu/consumers/odr
              </a>.<br />
              Our e-mail address can be found above in the impressum.
            </p>
            <p>
              We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.
            </p>
          </section>

          <section className="text-sm opacity-40">
            <p>
              Note: As an independent lab focused on tool development, physical address details are provided upon legitimate legal request to protect the privacy of the developer.
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
