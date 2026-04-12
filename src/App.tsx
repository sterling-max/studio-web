import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { VisualStyleGuide } from './components/VisualStyleGuide';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { MaxCommander } from './components/products/MaxCommander';
import { MaxCommanderPrivacyPolicy } from './components/products/MaxCommanderPrivacyPolicy';
import { Dash } from './components/products/Dash';
import { EasyMonitor } from './components/products/EasyMonitor';
import { ManageLicense } from './components/ManageLicense';
import { PricingPage } from './components/products/PricingPage';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './components/Logo';
import { PrivacyPolicy } from './pages/legal/PrivacyPolicy';
import { TermsOfService } from './pages/legal/TermsOfService';
import { LegalNotice } from './pages/legal/LegalNotice';
import { RefundPolicy } from './pages/legal/RefundPolicy';
import { LATEST_WEBSITE_VERSION } from './data/website-changelog';

const whatsappNumber = "393475393181";
const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%20Sterling%20Lab,%20I'd%20like%20to%20discuss%20a%20project.`;

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

// Fade wrapper for page transitions
const Page = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.35 }}
  >
    {children}
  </motion.div>
);

function HomePage() {
  return (
    <Page>
      <Hero />
      <ProductGrid />
      <About />
      <section className="pt-8 pb-32 px-6 text-center">
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
            className="inline-block px-10 py-4 bg-sterling-blue text-white rounded-2xl font-bold hover:scale-105 transition-transform shadow-[0_0_30px_rgba(0,122,255,0.3)]"
          >
            Let's Talk
          </a>
        </div>
      </section>
    </Page>
  );
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-sterling-midnight text-sterling-mist selection:bg-sterling-blue selection:text-white">
      <ScrollToTop />
      <Navbar />

      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<Page><div className="pt-20"><Contact /></div></Page>} />
            <Route path="/design" element={<Page><VisualStyleGuide /></Page>} />
            <Route path="/manage" element={<Page><ManageLicense /></Page>} />

            {/* Product Routes */}
            <Route path="/products/max-commander" element={<Page><MaxCommander onBack={() => navigate('/')} onViewPrivacy={() => navigate('/products/max-commander/privacy')} /></Page>} />
            <Route path="/products/max-commander/privacy" element={<Page><MaxCommanderPrivacyPolicy onBack={() => navigate('/products/max-commander')} /></Page>} />
            <Route path="/products/dash" element={<Page><Dash onBack={() => navigate('/')} /></Page>} />
            <Route path="/products/zap-studio" element={<Navigate to="/" replace />} />
            <Route path="/products/easy-monitor" element={<Page><EasyMonitor onBack={() => navigate('/')} /></Page>} />
            <Route path="/products/tales-universe" element={<Navigate to="/" replace />} />

            {/* Legal Routes */}
            <Route path="/privacy" element={<Page><PrivacyPolicy onBack={() => navigate('/')} /></Page>} />
            <Route path="/terms" element={<Page><TermsOfService onBack={() => navigate('/')} /></Page>} />
            <Route path="/legal" element={<Page><LegalNotice onBack={() => navigate('/')} /></Page>} />
            <Route path="/refund" element={<Page><RefundPolicy onBack={() => navigate('/')} /></Page>} />

            {/* Dedicated Pricing Page */}
            <Route path="/pricing" element={<Page><PricingPage /></Page>} />
            <Route path="/download" element={<Page><MaxCommander onBack={() => navigate('/')} onViewPrivacy={() => navigate('/products/max-commander/privacy')} /></Page>} />
          </Routes>
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
                <li>
                  <a href="/contact" className="hover:text-sterling-cyan cursor-pointer transition-colors flex items-center gap-2">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-xs uppercase tracking-widest text-sterling-blue">Products</h4>
              <ul className="text-sterling-mist/50 text-sm space-y-2">
                <li><a href="/products/max-commander" className="hover:text-sterling-cyan transition-colors">Max Commander</a></li>
                <li><a href="/products/dash" className="hover:text-sterling-cyan transition-colors">Dash</a></li>
                <li><a href="/products/easy-monitor" className="hover:text-sterling-cyan transition-colors">EasyMonitor</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-xs uppercase tracking-widest text-sterling-blue">Legal</h4>
              <ul className="text-sterling-mist/50 text-sm space-y-2">
                <li><a href="/legal" className="hover:text-sterling-cyan transition-colors">Legal Notice</a></li>
                <li><a href="/privacy" className="hover:text-sterling-cyan transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-sterling-cyan transition-colors">Terms of Service</a></li>
                <li><a href="/refund" className="hover:text-sterling-cyan transition-colors">Refund Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-sterling-mist/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col gap-1 items-start md:items-start">
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-sterling-mist/20 uppercase tracking-[0.2em]">© 2026 Sterling Lab. All rights reserved.</span>
              <span className="px-2 py-0.5 bg-sterling-blue/5 border border-sterling-blue/10 rounded-md text-[9px] font-mono text-sterling-blue/50 tracking-tighter">
                v{LATEST_WEBSITE_VERSION}
              </span>
            </div>
            <span className="text-[10px] text-sterling-mist/30 font-medium italic">Crafted with precision in the heart of Europe.</span>
          </div>
          <div className="flex gap-4">
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
