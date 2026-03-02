import { motion } from 'framer-motion';
import { Shield, ArrowLeft } from 'lucide-react';

interface Props {
    onBack: () => void;
}

export const MaxCommanderPrivacyPolicy = ({ onBack }: Props) => {
    const lastUpdated = "March 2, 2026";

    return (
        <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-sterling-mist">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-sterling-mist/50 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Max Commander
                </button>

                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-sterling-blue/10 text-sterling-blue flex items-center justify-center">
                        <Shield size={24} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
                </div>

                <p className="text-sterling-mist/50 mb-12">
                    Last Updated: {lastUpdated}
                </p>

                <div className="space-y-12 prose prose-invert prose-sterling max-w-none text-sterling-mist/80">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                        <p className="leading-relaxed mb-4">
                            Welcome to Max Commander, a product of Sterling Lab ("we", "our", or "us"), based in Italy. We are committed to protecting your privacy and ensuring you have a secure experience with our software. This Privacy Policy details how we handle information when you use Max Commander.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Information Collection and Use</h2>
                        <p className="leading-relaxed mb-4">
                            <strong>Local Processing:</strong> Max Commander is designed primarily as a local file manager. By default, your files, folder structures, searches, and configurations remain on your local device. We do not transmit your local file data to our servers.
                        </p>
                        <p className="leading-relaxed mb-4">
                            <strong>Telemetry and Diagnostics:</strong> To improve Max Commander, we may collect anonymous, non-personally identifiable diagnostic data (such as crash reports and general usage statistics). This data helps us fix bugs and optimize the application. You can opt out of this diagnostic reporting within the application settings.
                        </p>
                        <p className="leading-relaxed mb-4">
                            <strong>Account and Licensing:</strong> When you purchase or register Max Commander, we collect basic information such as your email address and license key to verify your purchase and provide support. Payments are processed through secure third-party providers, and we do not store full credit card details.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Microsoft Store Integration</h2>
                        <p className="leading-relaxed mb-4">
                            When you acquire Max Commander through the Microsoft Store, Microsoft may collect certain information in accordance with their privacy policies. We receive limited data from Microsoft (such as installation numbers and high-level crash reports) necessary to support and maintain the application. We do not receive your Microsoft account credentials.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Cloud Services and Plugins</h2>
                        <p className="leading-relaxed mb-4">
                            Max Commander features "Cloud Hybrid" integration and supports various plugins. When you authenticate with third-party cloud storage providers (e.g., OneDrive, Google Drive), Max Commander acts as a client. Authentication tokens are stored securely on your local device. We do not intercept or store your cloud credentials on our servers. The data you access via these plugins is governed by the respective third-party provider's privacy policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Data Retention and Security</h2>
                        <p className="leading-relaxed mb-4">
                            Any personal data collected for licensing and support purposes is retained only as long as necessary to provide you with the software and fulfilling our legal obligations. We employ industry-standard security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
                        <p className="leading-relaxed mb-4">
                            Under applicable laws (including the General Data Protection Regulation (GDPR) applicable to EU residents), you have the right to access, rectify, restrict, or delete your personal data held by Sterling Lab. Since most data regarding Max Commander usage is stored locally on your device, you have full control over that information. For any requests regarding licensing data securely held by us, please contact us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">7. Changes to This Policy</h2>
                        <p className="leading-relaxed mb-4">
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">8. Contact Us</h2>
                        <p className="leading-relaxed mb-4">
                            If you have any questions or concerns about this Privacy Policy or our data practices, please contact Sterling Lab through our main website or support channels.
                        </p>
                    </section>
                </div>
            </motion.div>
        </div>
    );
};
