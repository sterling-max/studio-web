import { motion } from 'framer-motion';
import { Shield, ShieldAlert, CheckCircle2, Info } from 'lucide-react';

export const SmartScreenGuide = () => {
  return (
    <section id="smartscreen-guide" className="py-24 px-6 max-w-4xl mx-auto border-t border-sterling-mist/5">
      <div className="bg-sterling-surface/50 rounded-[2.5rem] p-8 md:p-12 border border-sterling-blue/20">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-sterling-blue/10 flex items-center justify-center text-sterling-blue">
            <Shield size={28} />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Trusted <span className="text-sterling-blue">Execution</span></h2>
            <p className="text-sterling-mist/60">A note on Windows SmartScreen & Safety</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <p className="text-sterling-mist/80 leading-relaxed">
              Max Commander is an unsigned application. To keep costs low and avoid expensive EV certificates, we distribute the software "naked". Windows may show a <span className="text-sterling-blue font-semibold">SmartScreen Warning</span> the first time you run it.
            </p>
            
            <div className="bg-sterling-midnight/40 rounded-2xl p-6 border border-sterling-mist/5">
              <h3 className="flex items-center gap-2 font-bold mb-4 text-sterling-mist">
                <ShieldAlert size={18} className="text-sterling-blue" />
                How to Proceed:
              </h3>
              <ol className="space-y-4 text-sm text-sterling-mist/60 list-decimal pl-4">
                <li>Run the installer (`Max Commander Setup.exe`)</li>
                <li>When the blue box appears, click <span className="text-sterling-mist underline font-medium">"More info"</span></li>
                <li>Click <span className="text-sterling-mist underline font-medium">"Run anyway"</span></li>
              </ol>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle2 size={24} className="text-sterling-cyan" />
              Why Trust Sterling?
            </h3>
            <ul className="space-y-4">
              {[
                "100% Virus-Free (Verified by VirusTotal)",
                "No Bundled Crapware or Ads",
                "Privacy First: No Data Collection",
                "Open Community Feedback",
                "Built by Developers, for Developers"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sterling-mist/70">
                  <div className="w-1.5 h-1.5 rounded-full bg-sterling-blue" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex items-start gap-3 p-4 bg-sterling-blue/5 rounded-xl border border-sterling-blue/10 mt-4">
              <Info size={20} className="text-sterling-blue shrink-0 mt-0.5" />
              <p className="text-xs text-sterling-mist/50">
                Wait for a few weeks! As more users install the software, the warning will eventually disappear as Sterling Lab gains "Trust Reputation".
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
