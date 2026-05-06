import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, Eye, type LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Pricing, type PricingPlan } from './Pricing';

export interface TimelineStep {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  image?: string;
}

interface ProductLayoutProps {
  title: string;
  titleSuffix?: string;
  tagline: string;
  rotatingPhrases?: string[];
  icon: LucideIcon | string;
  steps: TimelineStep[];
  pricingPlans?: PricingPlan[];
  onBack: () => void;
  isMobileFrame?: boolean; // For Tales Universe vertical screenshots
  extraHeroContent?: React.ReactNode;
  heroActions?: React.ReactNode;
  heroImage?: string;
}

export const ProductLayout = ({
  title,
  titleSuffix,
  tagline,
  rotatingPhrases,
  icon: HeroIcon,
  steps,
  pricingPlans,
  onBack,
  isMobileFrame = false,
  extraHeroContent,
  heroActions,
  heroImage
}: ProductLayoutProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [phraseIndex, setPhraseIndex] = useState(0);

  // Rotating Tagline Logic
  if (rotatingPhrases && rotatingPhrases.length > 0) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useState(() => {
      const interval = setInterval(() => {
        setPhraseIndex((prev) => (prev + 1) % rotatingPhrases.length);
      }, 2500);
      return () => clearInterval(interval);
    });
  }

  const scrollToPricing = () => {
    const element = document.getElementById('pricing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Auto-scroll to pricing if requested via URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('tab') === 'pricing') {
      // Small delay to ensure component and sub-components are fully rendered
      const timer = setTimeout(scrollToPricing, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="pt-24 pb-20 px-4 md:px-6 max-w-7xl mx-auto min-h-screen relative">
      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-sterling-midnight/95 backdrop-blur-xl p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className={cn(
                "relative w-full overflow-hidden shadow-2xl border border-sterling-mist/10 rounded-3xl",
                isMobileFrame ? "max-w-md max-h-[90vh]" : "max-w-5xl max-h-[90vh]"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-3 bg-sterling-midnight/80 hover:bg-sterling-blue rounded-full text-white transition-all z-20 border border-sterling-mist/20 cursor-pointer"
              >
                <X size={24} />
              </button>
              <img
                src={selectedImage}
                alt="Full preview"
                className="w-full h-full object-contain bg-sterling-deep cursor-pointer"
                onClick={() => setSelectedImage(null)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header / Nav */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12"
      >
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-sterling-mist/60 hover:text-sterling-blue transition-colors cursor-pointer"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Products</span>
        </button>
      </motion.div>

      {/* Hero Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16"
      >
        <div className={cn("flex-1", heroImage ? "lg:text-left text-center" : "text-center")}>
          <div className={cn(
            "inline-flex items-center justify-center mb-6",
            typeof HeroIcon !== 'string' && "p-4 bg-sterling-blue/10 rounded-3xl"
          )}>
            {typeof HeroIcon === 'string' ? (
              <img src={HeroIcon} alt={title} className="w-14 h-14 md:w-16 md:h-16 object-contain" />
            ) : (
              <HeroIcon size={32} className="text-sterling-blue" />
            )}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {title} {titleSuffix && <span className="text-sterling-blue">{titleSuffix}</span>}
          </h1>

          <div className={cn("max-w-2xl mb-6 min-h-[3.5rem]", heroImage ? "lg:mx-0 mx-auto" : "mx-auto")}>
            {rotatingPhrases ? (
              <AnimatePresence mode="wait">
                <motion.p
                  key={phraseIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-lg md:text-xl text-sterling-mist/60 leading-relaxed font-medium"
                >
                  {rotatingPhrases[phraseIndex]}
                </motion.p>
              </AnimatePresence>
            ) : (
              <p className="text-lg md:text-xl text-sterling-mist/60 leading-relaxed">
                {tagline}
              </p>
            )}
          </div>

          {/* Extra Hero Content (e.g., Version Info) */}
          {extraHeroContent && (
            <div className="mb-6">{extraHeroContent}</div>
          )}

          {(pricingPlans || heroActions) && (
            <div className={cn("flex flex-col sm:flex-row gap-3", heroImage ? "lg:justify-start justify-center" : "justify-center")}>
              {pricingPlans && (
                <button
                  onClick={scrollToPricing}
                  className="px-8 py-3 bg-sterling-blue text-white rounded-xl font-bold shadow-[0_0_20px_rgba(0,122,255,0.3)] hover:scale-105 transition-transform cursor-pointer"
                >
                  Get {title}
                </button>
              )}
              {heroActions}
            </div>
          )}
        </div>

        {heroImage && (
          <div className="flex-1 w-full max-w-xl hidden lg:block perspective-[1040px]">
            <motion.div
              initial={{ opacity: 0, rotateY: -20, rotateX: 10 }}
              animate={{ opacity: 1, rotateY: -12, rotateX: 4 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden border border-sterling-blue/20 bg-sterling-surface shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-sterling-blue/10 to-transparent pointer-events-none z-10" />
              <img
                src={heroImage}
                alt={`${title} Preview`}
                className="w-full h-auto rounded-xl object-cover"
              />
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* Timeline */}
      <div className="relative mb-32">
        {/* Center Line (Desktop) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-sterling-blue/0 via-sterling-blue/50 to-sterling-blue/0 -translate-x-1/2" />

        {/* Mobile Line */}
        <div className="md:hidden absolute left-[27px] top-4 bottom-12 w-px bg-gradient-to-b from-sterling-blue/0 via-sterling-blue/50 to-sterling-blue/0" />

        <div className="space-y-24">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            const Icon = step.icon;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className={cn(
                  "relative flex flex-col md:flex-row items-center gap-8 md:gap-24",
                  isEven ? "" : "md:flex-row-reverse"
                )}
              >
                {/* Center Node (Desktop) */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-sterling-midnight border-4 border-sterling-blue rounded-full z-10 items-center justify-center shadow-[0_0_20px_rgba(0,122,255,0.4)]">
                  <div className="w-3 h-3 bg-sterling-cyan rounded-full animate-pulse" />
                </div>

                {/* Mobile Node */}
                <div className="md:hidden absolute left-0 top-0 w-14 h-14 flex items-center justify-center z-10">
                  <div className="w-10 h-10 bg-sterling-midnight border-2 border-sterling-blue rounded-full flex items-center justify-center text-sterling-blue font-bold">
                    {step.id}
                  </div>
                </div>

                {/* Content Card */}
                <div className={cn(
                  step.image ? "flex-1 w-full md:w-auto pl-20 md:pl-0" : "w-full pl-20 md:pl-0",
                  isEven ? "md:text-right" : "md:text-left"
                )}>
                  <div className="bg-sterling-deep border border-sterling-mist/5 p-8 rounded-[2rem] hover:border-sterling-blue/30 transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] group">
                    <div className={cn(
                      "flex items-center gap-4 mb-4",
                      isEven ? "md:flex-row-reverse" : "md:flex-row"
                    )}>
                      <div className="w-12 h-12 bg-sterling-blue/10 rounded-2xl flex items-center justify-center text-sterling-blue group-hover:bg-sterling-blue group-hover:text-white transition-all">
                        <Icon size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-sterling-mist">{step.title}</h3>
                    </div>
                    <p className="text-sterling-mist/60 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Image 3D Effect */}
                <div className={cn(
                  "hidden md:block w-full perspective-[1040px] group/image",
                  step.image ? "flex-1" : "hidden"
                )}>
                  <motion.div
                    className={cn(
                      "relative rounded-2xl overflow-hidden border-2 border-sterling-blue/20 p-1 bg-sterling-surface shadow-2xl cursor-none", // cursor-none because we use the overlay
                      isMobileFrame ? "max-w-[300px] mx-auto" : ""
                    )}
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: isEven
                        ? 'rotateY(-11deg) rotateX(2deg) rotate(2deg)'
                        : 'rotateY(11deg) rotateX(2deg) rotate(-2deg)'
                    }}
                    whileHover={{
                      transform: 'scale(1.02) rotateY(0deg) rotateX(0deg) rotate(0deg)',
                      zIndex: 50
                    }}
                    transition={{ duration: 0.5 }}
                    onClick={() => step.image && setSelectedImage(step.image)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-sterling-blue/10 to-transparent pointer-events-none z-10" />

                    {/* The Eye Icon Overlay */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-sterling-midnight/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-sterling-blue/50 shadow-[0_0_30px_rgba(0,122,255,0.5)]">
                        <Eye size={32} className="text-sterling-cyan" />
                      </div>
                    </div>

                    {step.image && (
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-auto rounded-xl"
                      />
                    )}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {pricingPlans && <Pricing plans={pricingPlans} />}
    </div>
  );
};
