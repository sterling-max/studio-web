import { motion } from 'framer-motion';

interface HeroProps {
  onNavigate: (tab: string) => void;
}

export const Hero = ({ onNavigate }: HeroProps) => {
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-sterling">
      {/* Background Animated Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-sterling-blue/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-sterling-cyan/15 rounded-full blur-[120px] animate-glow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sterling-blue/10 rounded-full blur-[150px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4"
      >
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block px-4 py-1.5 mb-6 text-xs font-medium tracking-[0.2em] uppercase border border-sterling-blue/30 rounded-full bg-sterling-blue/5 text-sterling-cyan"
        >
          Crafting Everyday Excellence
        </motion.span>
        
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 pb-6 bg-clip-text text-transparent bg-gradient-to-b from-sterling-mist to-sterling-mist/50">
          Sterling <span className="text-sterling-blue">Studio</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-sterling-mist/70 leading-relaxed mb-10">
          We build productivity tools, educational platforms, and creative software with 
          uncompromising precision and atmospheric design.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToProducts}
            className="px-8 py-4 bg-sterling-blue text-white rounded-2xl font-semibold shadow-[0_0_30px_rgba(0,122,255,0.3)] transition-all hover:shadow-[0_0_40px_rgba(0,122,255,0.5)] cursor-pointer"
          >
            Explore Our Work
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('about')}
            className="px-8 py-4 bg-sterling-surface text-sterling-mist rounded-2xl font-semibold border border-sterling-mist/10 hover:bg-sterling-surface/80 transition-all cursor-pointer"
          >
            The Studio
          </motion.button>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sterling-midnight to-transparent" />
    </div>
  );
};
