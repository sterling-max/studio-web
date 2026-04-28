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
          className="mb-8 text-sterling-blue hover:text-sterling-cyan transition-colors flex items-center gap-2 cursor-pointer"
        >
          ← Back to Sterling Lab
        </button>

        <h1 className="text-4xl font-bold mb-12">Terms of <span className="text-sterling-blue">Service</span></h1>
        
        <div className="prose max-w-none space-y-8 text-sterling-mist/70">
          <section className="p-6 bg-sterling-blue/5 border border-sterling-blue/20 rounded-2xl">
            <h2 className="text-xl font-bold text-sterling-mist mb-4">Merchant of Record</h2>
            <p className="text-sterling-mist italic">
              Our order process is conducted by Lemon Squeezy, our authorized reseller and Merchant of Record. Lemon Squeezy handles payment processing, applicable VAT and sales tax, refunds, disputes, and billing support for purchases.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-sterling-mist mb-4">Vendor Information</h2>
            <p>
              These Terms of Service are issued by:<br />
              <strong className="text-sterling-mist">Maximiliano Villarreal</strong>, operating as <strong className="text-sterling-mist">Sterling Lab</strong><br />
              Via XX Settembre 37, 63063 Carassai (AP), Italy<br />
              Email: <a href="mailto:support@sterling.ltd" className="text-sterling-blue hover:underline cursor-pointer">support@sterling.ltd</a><br />
              Phone: +39 347 539 3181
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-sterling-mist mb-4">License Types</h2>
            <p className="mb-4">
              Max Commander is available under two license tiers:
            </p>
            <ul className="space-y-2 list-disc pl-6">
              <li><strong className="text-sterling-mist">Free License:</strong> For personal, non-commercial use. Includes the full dual-pane file manager, configurable keybindings, archive support, multi-rename, native context menu, LAN browsing, and Quick Viewer.</li>
              <li><strong className="text-sterling-mist">Pro License:</strong> For personal or professional use. Adds FTP/SFTP remote connections, Space Analyzer, Profiles &amp; Workspaces, and the Plugin System (Jellyfin and more). Perpetual license with lifetime updates. Not transferable.</li>
            </ul>
            <p className="mt-4">
              You may not transfer, assign, rent, lease, lend, sell, redistribute, or sub-license the software or your license key under any circumstances.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-sterling-mist mb-4">1. Scope</h2>
            <p>
              These terms apply to all tools and services provided by Sterling Lab. By using our website or software, you agree to these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-sterling-mist mb-4">2. Software Usage</h2>
            <p>
              Our software (such as Max Commander) is provided under specific licenses. Pro features require a valid license key. Unauthorized redistribution or modification of our software is prohibited.
            </p>
            <p className="mt-4">
              Refunded, disputed, reversed, or otherwise invalid purchases may result in deactivation of the associated license key and Pro features. The software may periodically contact Sterling Lab licensing servers to validate license status and refresh a local machine-bound entitlement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-sterling-mist mb-4">3. Limitation of Liability & Disclaimer of Warranties</h2>
            <p>
              Sterling Lab tools are provided "as is" and "as available" without any warranties of any kind, whether express or implied. To the maximum extent permitted by law, Sterling Lab shall not be liable for any indirect, incidental, or consequential damages (including data loss or business interruption) arising out of the use of our software.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-sterling-mist mb-4">4. Governing Law</h2>
            <p>
              These terms and any disputes arising from the use of our services shall be governed by and construed in accordance with the laws of Italy, without regard to its conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-sterling-mist mb-4">5. Contact &amp; Support</h2>
            <p>
              For any questions regarding these Terms, or to request support, please contact us at:<br />
              Email: <a href="mailto:support@sterling.ltd" className="text-sterling-blue hover:underline cursor-pointer">support@sterling.ltd</a><br />
              Phone: +39 347 539 3181 (also WhatsApp)
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
