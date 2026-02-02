import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { VisualStyleGuide } from './components/VisualStyleGuide';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { ZapStudio } from './components/products/ZapStudio';
import { MaxCommander } from './components/products/MaxCommander';
import { Dash } from './components/products/Dash';
import { EasyMonitor } from './components/products/EasyMonitor';
import { TalesUniverse } from './components/products/TalesUniverse';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const whatsappNumber = "1234567890"; // Placeholder
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%20Sterling%20Studio,%20I'd%20like%20to%20discuss%20a%20project.`;

  const handleViewProduct = (productId: string) => {
    setActiveTab(`product-${productId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
                    className="inline-block px-10 py-4 bg-white text-sterling-midnight rounded-2xl font-bold hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]"
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

          {activeTab === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="pt-20"
            >
              <ProductGrid onViewProduct={handleViewProduct} />
            </motion.div>
          )}

          {/* Product Routes */}
          {activeTab === 'product-zap-studio' && (
            <motion.div key="p-zap" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
              <ZapStudio onBack={() => setActiveTab('products')} />
            </motion.div>
          )}
          {activeTab === 'product-max-commander' && (
            <motion.div key="p-mc" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
              <MaxCommander onBack={() => setActiveTab('products')} />
            </motion.div>
          )}
          {activeTab === 'product-dash' && (
            <motion.div key="p-dash" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
              <Dash onBack={() => setActiveTab('products')} />
            </motion.div>
          )}
          {activeTab === 'product-easy-monitor' && (
            <motion.div key="p-em" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
              <EasyMonitor onBack={() => setActiveTab('products')} />
            </motion.div>
          )}
          {activeTab === 'product-tales-universe' && (
            <motion.div key="p-tu" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
              <TalesUniverse onBack={() => setActiveTab('products')} />
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
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-sterling-mist/5 bg-sterling-deep">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div>
            <div className="text-2xl font-bold mb-4">Sterling <span className="text-sterling-blue">Studio</span></div>
            <p className="text-sterling-mist/40 text-sm max-w-xs leading-relaxed">
              Hand-crafted software solutions with a focus on precision, performance, and atmospheric design.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="font-bold mb-4 text-xs uppercase tracking-widest text-sterling-blue">Connect</h4>
              <ul className="text-sterling-mist/50 text-sm space-y-2">
                <li onClick={() => setActiveTab('contact')} className="hover:text-sterling-cyan cursor-pointer transition-colors">Contact</li>
                <li className="hover:text-sterling-cyan cursor-pointer transition-colors">GitHub</li>
                <li className="hover:text-sterling-cyan cursor-pointer transition-colors">Dribbble</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-xs uppercase tracking-widest text-sterling-blue">Products</h4>
              <ul className="text-sterling-mist/50 text-sm space-y-2">
                <li onClick={() => setActiveTab('products')} className="hover:text-sterling-cyan cursor-pointer transition-colors">Max Commander</li>
                <li onClick={() => setActiveTab('products')} className="hover:text-sterling-cyan cursor-pointer transition-colors">Dash</li>
                <li onClick={() => setActiveTab('products')} className="hover:text-sterling-cyan cursor-pointer transition-colors">Zap Studio</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-sterling-mist/5 flex flex-col md:flex-row justify-between text-[10px] text-sterling-mist/20 uppercase tracking-[0.2em]">
          <span>© 2026 Sterling Studio. All rights reserved.</span>
          <span>Designed with precision in Marche.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;