import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { VisualStyleGuide } from './components/VisualStyleGuide';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { ZapStudio } from './components/products/ZapStudio';
import { MaxCommander } from './components/products/MaxCommander';
import { MaxCommanderPrivacyPolicy } from './components/products/MaxCommanderPrivacyPolicy';
import { Dash } from './components/products/Dash';
import { EasyMonitor } from './components/products/EasyMonitor';
import { TalesUniverse } from './components/products/TalesUniverse';
import { ManageLicense } from './components/ManageLicense';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './components/Logo';
import { PrivacyPolicy } from './pages/legal/PrivacyPolicy';
import { TermsOfService } from './pages/legal/TermsOfService';
import { LegalNotice } from './pages/legal/LegalNotice';
import { RefundPolicy } from './pages/legal/RefundPolicy';
import { Instagram, Twitter } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('tab') || 'home';
  });

  useEffect(() => {
    const url = new URL(window.location.href);
    if (activeTab === 'home') {
      url.searchParams.delete('tab');
    } else {
      url.searchParams.set('tab', activeTab);
    }
    window.history.replaceState({}, '', url);

    if (activeTab === 'pricing') {
      scrollToProducts();
    }
  }, [activeTab]);

  const whatsappNumber = "1234567890"; // Placeholder
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%20Sterling%20Lab,%20I'd%20like%20to%20discuss%20a%20project.`;

  const handleViewProduct = (productId: string) => {
    setActiveTab(`product-${productId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToProducts = () => {
    setActiveTab('home');
    setTimeout(() => {
      const element = document.getElementById('products');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleBackToProducts = () => {
    window.location.hash = 'products';
    setActiveTab('home');
  };

  return (
    <div className="min-h-screen bg-sterling-midnight text-sterling-mist selection:bg-sterling-blue selection:text-white">
      <Navbar activeTab={activeTab.startsWith('product-') ? 'products' : activeTab} setActiveTab={setActiveTab} />

      <main>
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Hero onNavigate={setActiveTab} />
              <ProductGrid onViewProduct={handleViewProduct} />

              {/* Call to Action Section */}
              <section className="py-32 px-6 text-center">
                <div className="max-w-3xl mx-auto p-12 rounded-[3rem] bg-gradient-to-b from-sterling-deep to-sterling-midnight border border-sterling-blue/20 relative overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-sterling-blue/20 blur-[80px] rounded-full" />
                  <h2 className="text-4xl font-bold mb-6">Have a project in mind?</h2>
                  <p className="text-sterling-mist/60 mb-10 text-lg">
                    Whether it's a productivity powerhouse or a creative experiment, we'd love to help you build it.
                  </p>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-10 py-4 bg-white text-sterling-deep rounded-2xl font-bold hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                  >
                    Let's Talk
                  </a>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'design' && (
            <motion.div
              key="design"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <VisualStyleGuide />
            </motion.div>
          )}

          {/* Product Routes */}
          {activeTab === 'product-zap-studio' && (
            <motion.div key="p-zap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ZapStudio onBack={handleBackToProducts} />
            </motion.div>
          )}
          {activeTab === 'product-max-commander' && (
            <motion.div key="p-mc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <MaxCommander onBack={handleBackToProducts} onViewPrivacy={() => setActiveTab('product-max-commander-privacy')} />
            </motion.div>
          )}
          {activeTab === 'product-max-commander-privacy' && (
            <motion.div key="p-mc-priv" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <MaxCommanderPrivacyPolicy onBack={() => setActiveTab('product-max-commander')} />
            </motion.div>
          )}
          {activeTab === 'product-dash' && (
            <motion.div key="p-dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Dash onBack={handleBackToProducts} />
            </motion.div>
          )}
          {activeTab === 'product-easy-monitor' && (
            <motion.div key="p-em" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <EasyMonitor onBack={handleBackToProducts} />
            </motion.div>
          )}
          {activeTab === 'product-tales-universe' && (
            <motion.div key="p-tu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <TalesUniverse onBack={handleBackToProducts} />
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <About />
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="pt-20"
            >
              <Contact />
            </motion.div>
          )}

          {activeTab === 'manage' && (
            <motion.div
              key="manage"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <ManageLicense />
            </motion.div>
          )}

          {activeTab === 'privacy' && (
            <motion.div key="privacy" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <PrivacyPolicy onBack={() => setActiveTab('home')} />
            </motion.div>
          )}

          {activeTab === 'terms' && (
            <motion.div key="terms" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <TermsOfService onBack={() => setActiveTab('home')} />
            </motion.div>
          )}

          {activeTab === 'legal' && (
            <motion.div key="legal" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LegalNotice onBack={() => setActiveTab('home')} />
            </motion.div>
          )}

          {activeTab === 'refund' && (
            <motion.div key="refund" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <RefundPolicy onBack={() => setActiveTab('home')} />
            </motion.div>
          )}

          {activeTab === 'pricing' && (
            <motion.div
              key="pricing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onViewportEnter={scrollToProducts}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-sterling-mist/5 bg-sterling-deep">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Logo className="w-8 h-8" />
              <div className="text-2xl font-bold">Sterling <span className="text-sterling-blue">Lab</span></div>
            </div>
            <p className="text-sterling-mist/40 text-sm max-w-xs leading-relaxed">
              A dedicated Lab for Tool Development with a focus on precision, performance, and atmospheric design.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="font-bold mb-4 text-xs uppercase tracking-widest text-sterling-blue">Connect</h4>
              <ul className="text-sterling-mist/50 text-sm space-y-2">
                <li onClick={() => setActiveTab('contact')} className="hover:text-sterling-cyan cursor-pointer transition-colors flex items-center gap-2">
                   Contact
                </li>
                <li>
                  <a href="https://instagram.com/sterlinglab" target="_blank" rel="noopener noreferrer" className="hover:text-sterling-cyan transition-colors flex items-center gap-2">
                    <Instagram size={14} /> Instagram
                  </a>
                </li>
                <li>
                  <a href="https://x.com/sterlinglab" target="_blank" rel="noopener noreferrer" className="hover:text-sterling-cyan transition-colors flex items-center gap-2">
                    <Twitter size={14} /> X (Twitter)
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-xs uppercase tracking-widest text-sterling-blue">Products</h4>
              <ul className="text-sterling-mist/50 text-sm space-y-2">
                <li onClick={() => handleViewProduct('max-commander')} className="hover:text-sterling-cyan cursor-pointer transition-colors">Max Commander</li>
                <li onClick={() => handleViewProduct('dash')} className="hover:text-sterling-cyan cursor-pointer transition-colors">Dash</li>
                <li onClick={() => handleViewProduct('zap-studio')} className="hover:text-sterling-cyan cursor-pointer transition-colors">Zap Studio</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-xs uppercase tracking-widest text-sterling-blue">Legal</h4>
              <ul className="text-sterling-mist/50 text-sm space-y-2">
                <li onClick={() => setActiveTab('legal')} className="hover:text-sterling-cyan cursor-pointer transition-colors">Legal Notice</li>
                <li onClick={() => setActiveTab('privacy')} className="hover:text-sterling-cyan cursor-pointer transition-colors">Privacy Policy</li>
                <li onClick={() => setActiveTab('terms')} className="hover:text-sterling-cyan cursor-pointer transition-colors">Terms of Service</li>
                <li onClick={() => setActiveTab('refund')} className="hover:text-sterling-cyan cursor-pointer transition-colors">Refund Policy</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-sterling-mist/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-sterling-mist/20 uppercase tracking-[0.2em]">© 2026 Sterling Lab. All rights reserved.</span>
            <span className="text-[10px] text-sterling-mist/30 font-medium italic">Crafted with precision in the heart of Europe.</span>
          </div>
          
          <div className="flex gap-4">
             {/* European Compliance Badges / Indicators could go here */}
             <div className="px-3 py-1 border border-sterling-mist/10 rounded-full text-[9px] uppercase tracking-widest text-sterling-mist/30">
               EU Data Protection
             </div>
             <div className="px-3 py-1 border border-sterling-mist/10 rounded-full text-[9px] uppercase tracking-widest text-sterling-mist/30">
               Secure Licensing
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;