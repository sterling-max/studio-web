import { motion } from 'framer-motion';

export const VisualStyleGuide = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-5xl font-bold mb-2">Visual Identity System</h1>
        <p className="text-sterling-mist/60 text-xl mb-12">
          The Sterling Design Language adapts fluidly between two atmospheric modes: 
          <span className="text-sterling-blue font-semibold"> Midnight (Dark)</span> and 
          <span className="text-sterling-cyan font-semibold"> Porcelain (Light)</span>.
        </p>

        {/* Color System */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8 border-b border-sterling-mist/10 pb-4">Adaptive Color Palette</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ColorCard 
              name="Midnight / Porcelain" 
              variable="--color-sterling-midnight" 
              usage="Main Background"
            />
            <ColorCard 
              name="Deep / Surface" 
              variable="--color-sterling-deep" 
              usage="Card Backgrounds"
            />
            <ColorCard 
              name="Mist / Ink" 
              variable="--color-sterling-mist" 
              usage="Primary Text"
            />
            <ColorCard 
              name="Surface / Cloud" 
              variable="--color-sterling-surface" 
              usage="Secondary Elements"
            />
            <ColorCard 
              name="Electric Blue" 
              variable="--color-sterling-blue" 
              usage="Primary Accent"
            />
            <ColorCard 
              name="Sky Cyan" 
              variable="--color-sterling-cyan" 
              usage="Secondary Accent"
            />
          </div>
        </section>

        {/* Typography */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8 border-b border-sterling-mist/10 pb-4">Typography & Hierarchy</h2>
          <div className="space-y-8 bg-sterling-deep p-10 rounded-[2rem] border border-sterling-mist/5">
            <div>
              <h1 className="text-6xl font-bold mb-2">Display Heading</h1>
              <span className="text-xs font-mono text-sterling-mist/40">Inter Bold / 64px / Tracking Tight</span>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-2">Section Title</h2>
              <span className="text-xs font-mono text-sterling-mist/40">Inter Bold / 36px</span>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Component Label</h3>
              <span className="text-xs font-mono text-sterling-mist/40">Inter SemiBold / 24px</span>
            </div>
            <div className="max-w-2xl">
              <p className="text-lg leading-relaxed text-sterling-mist/80">
                Body Copy — The quick brown fox jumps over the lazy dog. Sterling's typography is designed for 
                high readability and technical precision. We use slightly relaxed line-heights to create an 
                open, airy feel in both light and dark modes.
              </p>
              <span className="text-xs font-mono text-sterling-mist/40 mt-2 block">Inter Regular / 18px / Relaxed</span>
            </div>
          </div>
        </section>

        {/* UI Components */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8 border-b border-sterling-mist/10 pb-4">Component Library</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-sterling-mist/50 uppercase tracking-widest">Buttons</h3>
              <div className="flex gap-4">
                <button className="px-8 py-3 bg-sterling-blue text-white rounded-2xl font-semibold shadow-[0_0_20px_rgba(0,122,255,0.3)] hover:scale-105 transition-transform">
                  Primary Action
                </button>
                <button className="px-8 py-3 bg-sterling-surface text-sterling-mist rounded-2xl font-semibold border border-sterling-mist/10 hover:bg-sterling-surface/80 transition-all">
                  Secondary
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-sterling-mist/50 uppercase tracking-widest">Interactive States</h3>
              <div className="flex gap-4">
                 <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-[0.2em] uppercase border border-sterling-blue/30 rounded-full bg-sterling-blue/5 text-sterling-cyan">
                  Badge
                </span>
                <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-[0.2em] uppercase border border-sterling-mist/10 rounded-full bg-sterling-surface text-sterling-mist/60">
                  Tag
                </span>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

const ColorCard = ({ name, variable, usage }: { name: string, variable: string, usage: string }) => (
  <div className="bg-sterling-deep p-6 rounded-2xl border border-sterling-mist/5 flex flex-col gap-4">
    <div 
      className="h-24 rounded-xl shadow-inner border border-sterling-mist/5 transition-colors duration-500" 
      style={{ backgroundColor: `var(${variable})` }}
    />
    <div>
      <h4 className="font-bold text-lg">{name}</h4>
      <p className="text-sm text-sterling-mist/50 mb-2">{usage}</p>
      <code className="text-xs bg-sterling-midnight px-2 py-1 rounded text-sterling-blue font-mono">
        {variable}
      </code>
    </div>
  </div>
);