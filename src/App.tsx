import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { VisualStyleGuide } from './components/VisualStyleGuide';
import { Collaborate } from './components/Collaborate';
import { MaxCommander } from './components/products/MaxCommander';
import { MaxCommanderPrivacyPolicy } from './components/products/MaxCommanderPrivacyPolicy';
import { Dash } from './components/products/Dash';
import { ZapStudio } from './components/products/ZapStudio';
import { EasyMonitor } from './components/products/EasyMonitor';
import { TalesUniverse } from './components/products/TalesUniverse';
import { ManageLicense } from './components/ManageLicense';
import { DownloadReport } from './components/admin/DownloadReport';
import { PluginCatalogAdmin } from './components/admin/PluginCatalogAdmin';
import { PricingPage } from './components/products/PricingPage';
import { MaxCommanderPlugins } from './components/products/MaxCommanderPlugins';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './components/Logo';
import { PrivacyPolicy } from './pages/legal/PrivacyPolicy';
import { TermsOfService } from './pages/legal/TermsOfService';
import { LegalNotice } from './pages/legal/LegalNotice';
import { RefundPolicy } from './pages/legal/RefundPolicy';
import { SupportPage } from './pages/SupportPage';
import { LATEST_WEBSITE_VERSION } from './data/website-changelog';
import { ThanksPage } from './pages/ThanksPage';



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
      <Collaborate />
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
            <Route path="/contact" element={<Page><div className="pt-20"><Collaborate showHeader={false} showCards={false} showContainer={false} /></div></Page>} />
            <Route path="/support" element={<Page><SupportPage /></Page>} />
            <Route path="/design" element={<Page><VisualStyleGuide /></Page>} />
            <Route path="/manage" element={<Page><ManageLicense /></Page>} />
            <Route path="/admin" element={<Page><DownloadReport /></Page>} />
            <Route path="/admin/downloads" element={<Page><DownloadReport /></Page>} />
            <Route path="/admin/plugins" element={<Page><PluginCatalogAdmin /></Page>} />

            {/* Product Routes */}
            <Route path="/products/max-commander" element={<Page><MaxCommander onBack={() => navigate('/')} onViewPrivacy={() => navigate('/products/max-commander/privacy')} /></Page>} />
            <Route path="/products/max-commander/privacy" element={<Page><MaxCommanderPrivacyPolicy onBack={() => navigate('/products/max-commander')} /></Page>} />
            <Route path="/products/max-commander/plugins" element={<Page><MaxCommanderPlugins /></Page>} />
             <Route path="/products/dash" element={<Page><Dash onBack={() => navigate('/')} /></Page>} />
             <Route path="/products/zap-studio" element={<Page><ZapStudio onBack={() => navigate('/')} /></Page>} />
             <Route path="/products/easy-monitor" element={<Page><EasyMonitor onBack={() => navigate('/')} /></Page>} />
             <Route path="/products/tales-universe" element={<Page><TalesUniverse onBack={() => navigate('/')} /></Page>} />

            {/* Legal Routes */}
            <Route path="/privacy" element={<Page><PrivacyPolicy onBack={() => navigate('/')} /></Page>} />
            <Route path="/terms" element={<Page><TermsOfService onBack={() => navigate('/')} /></Page>} />
            <Route path="/legal" element={<Page><LegalNotice onBack={() => navigate('/')} /></Page>} />
            <Route path="/refund" element={<Page><RefundPolicy onBack={() => navigate('/')} /></Page>} />

            {/* Dedicated Pricing Page */}
            <Route path="/pricing" element={<Page><PricingPage /></Page>} />
            <Route path="/download" element={<Page><MaxCommander onBack={() => navigate('/')} onViewPrivacy={() => navigate('/products/max-commander/privacy')} /></Page>} />
            
            {/* Post-Purchase */}
            <Route path="/thanks" element={<Page><ThanksPage /></Page>} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-sterling-mist/5 bg-sterling-deep">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Logo className="w-8 h-8" />
              <div className="text-xl font-bold">Sterling <span className="text-sterling-blue">Lab</span></div>
            </div>
            <p className="text-sterling-mist/60 text-sm max-w-xs leading-relaxed">
              A dedicated Lab for Tool Development with a focus on precision, performance, and atmospheric design.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <h4 className="font-bold mb-3 text-[10px] uppercase tracking-[0.2em] text-sterling-blue">Connect</h4>
              <ul className="text-sterling-mist/80 text-sm space-y-1.5">
                <li>
                  <a href="/contact" className="hover:text-sterling-cyan cursor-pointer transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/support" className="hover:text-sterling-cyan cursor-pointer transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-[10px] uppercase tracking-[0.2em] text-sterling-blue">Products</h4>
              <ul className="text-sterling-mist/80 text-sm space-y-1.5">
                <li><a href="/products/max-commander" className="hover:text-sterling-cyan transition-colors cursor-pointer">Max Commander</a></li>
                <li><a href="/products/max-commander/plugins" className="hover:text-sterling-cyan transition-colors cursor-pointer">MC Plugins</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-[10px] uppercase tracking-[0.2em] text-sterling-blue">Legal</h4>
              <ul className="text-sterling-mist/80 text-sm space-y-1.5">
                <li><a href="/legal" className="hover:text-sterling-cyan transition-colors cursor-pointer text-xs">Legal Notice</a></li>
                <li><a href="/privacy" className="hover:text-sterling-cyan transition-colors cursor-pointer text-xs">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-sterling-cyan transition-colors cursor-pointer text-xs">Terms of Service</a></li>
                <li><a href="/refund" className="hover:text-sterling-cyan transition-colors cursor-pointer text-xs">Refund Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-sterling-mist/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-sterling-mist/40 uppercase tracking-[0.1em] font-medium">© 2026 Sterling Lab. All rights reserved.</span>
              <span className="px-2 py-0.5 bg-sterling-blue/10 border border-sterling-blue/20 rounded-md text-[9px] font-mono text-sterling-blue font-bold tracking-tighter">
                v{LATEST_WEBSITE_VERSION}
              </span>
            </div>
            <span className="text-[10px] text-sterling-mist/50 font-medium italic">Crafted with precision in the heart of Europe.</span>
          </div>
          <div className="flex gap-3">
            <div className="px-3 py-1 border border-sterling-mist/10 rounded-full text-[9px] uppercase tracking-widest text-sterling-mist/50 font-bold bg-sterling-mist/5">
              EU Data Protection
            </div>
            <div className="px-3 py-1 border border-sterling-mist/10 rounded-full text-[9px] uppercase tracking-widest text-sterling-mist/50 font-bold bg-sterling-mist/5">
              Secure Licensing
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
