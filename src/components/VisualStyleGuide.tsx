import { motion } from 'framer-motion';
import { MonitorSmartphone, Sparkles, Layout, Code2, ArrowRight } from 'lucide-react';

export const VisualStyleGuide = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center max-w-5xl mx-auto mb-24">
          <h1 className="text-4xl md:text-6xl font-bold mb-10 tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-sterling-mist to-sterling-mist/50">
            Elevate Your <span className="text-sterling-blue">Digital Presence</span>
          </h1>
          <p className="text-sterling-mist/60 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
            We don't just build websites; we craft immersive digital environments. 
            High-performance design engineering for the next generation of software.
          </p>
        </div>

        {/* Services Grid */}
        <section className="mb-32">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<Layout size={28} />}
              title="UX/UI Design"
              desc="Intuitive, emotion-driven interfaces designed with typography and hierarchy that guide users seamlessly."
              delay={0.1}
            />
            <FeatureCard 
              icon={<MonitorSmartphone size={28} />}
              title="Responsive Web Apps"
              desc="Fluid layouts that adapt flawlessly across all devices, ensuring a premium experience everywhere."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Sparkles size={28} />}
              title="Visual Identity"
              desc="Bespoke logos, strict color systems, and cohesive branding that make your product instantly recognizable."
              delay={0.3}
            />
            <FeatureCard 
              icon={<Code2 size={28} />}
              title="Frontend Engineering"
              desc="Clean, performant React and Tailwind logic married to Framer Motion for buttery-smooth micro-interactions."
              delay={0.4}
            />
          </div>
        </section>

        {/* Process Showcase / Graphical Presentation */}
        <section className="mb-32">
          <h2 className="text-3xl font-bold mb-12 text-center">The Sterling Standard</h2>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-sterling-blue/10 flex items-center justify-center shrink-0 text-sterling-blue">
                  01
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-sterling-mist">Atmospheric Depth</h3>
                  <p className="text-sterling-mist/60 leading-relaxed">We leverage glassmorphism, dynamic glowing orbs, and multi-layered backgrounds to break away from flat, lifeless web pages.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-sterling-cyan/10 flex items-center justify-center shrink-0 text-sterling-cyan">
                  02
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-sterling-mist">Mathematical Precision</h3>
                  <p className="text-sterling-mist/60 leading-relaxed">Every margin, padding, and font-size adheres to a strict spacing system ensuring perfect rhythm and balance across the viewport.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-sterling-mist/10 flex items-center justify-center shrink-0 text-sterling-mist">
                  03
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-sterling-mist">Motion Design</h3>
                  <p className="text-sterling-mist/60 leading-relaxed">We don't use animation for the sake of it. We implement physics-based transitions that provide spatial awareness and satisfying tactile feedback.</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square md:aspect-video lg:aspect-square bg-sterling-midnight rounded-[3rem] border border-sterling-mist/5 overflow-hidden flex items-center justify-center p-8 shadow-2xl"
            >
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sterling-blue/10 rounded-full blur-[100px] animate-pulse" />
               <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sterling-cyan/5 rounded-full blur-[100px] animate-glow" />
               
               {/* Abstract Mockup UI */}
               <div className="relative z-10 w-full h-full bg-sterling-surface/50 backdrop-blur-md border border-sterling-mist/10 rounded-2xl p-6 flex flex-col gap-4 shadow-xl">
                 <div className="flex items-center gap-2 border-b border-sterling-mist/10 pb-4">
                   <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-400/50"/><div className="w-3 h-3 rounded-full bg-yellow-400/50"/><div className="w-3 h-3 rounded-full bg-green-400/50"/></div>
                   <div className="mx-auto w-32 h-4 bg-sterling-mist/5 rounded-full" />
                 </div>
                 <div className="flex gap-4 h-full">
                    <div className="w-1/3 bg-sterling-mist/5 rounded-xl h-full animate-pulse" />
                    <div className="w-2/3 flex flex-col gap-4">
                      <div className="h-24 bg-gradient-to-r from-sterling-blue/20 to-sterling-cyan/10 rounded-xl" />
                      <div className="flex-1 flex gap-4">
                        <div className="w-1/2 bg-sterling-mist/5 rounded-xl" />
                        <div className="w-1/2 bg-sterling-mist/5 rounded-xl" />
                      </div>
                    </div>
                 </div>
               </div>
            </motion.div>

          </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-sterling-deep p-12 md:p-20 rounded-[3rem] border border-sterling-blue/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-sterling-blue/5 to-transparent pointer-events-none" />
          <h2 className="text-4xl font-bold mb-6 relative z-10">Ready to build something extraordinary?</h2>
          <p className="text-sterling-mist/60 mb-10 max-w-xl mx-auto relative z-10 text-lg">
            Let's collaborate to give your product the digital presence it deserves. Professional, performant, and unforgettable.
          </p>
          <a
            href="https://wa.me/393475393181?text=Hello%20Sterling%20Lab,%20I'd%20like%20to%20discuss%20a%20web%20design%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-sterling-blue text-white rounded-2xl font-bold hover:scale-105 transition-transform shadow-[0_0_30px_rgba(0,122,255,0.3)] relative z-10"
          >
            Start a Project <ArrowRight size={20} />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="bg-sterling-deep p-8 rounded-3xl border border-sterling-mist/5 hover:border-sterling-blue/30 transition-all hover:-translate-y-1 shadow-sm hover:shadow-xl group"
  >
    <div className="w-14 h-14 bg-sterling-surface rounded-2xl flex items-center justify-center text-sterling-mist mb-6 group-hover:bg-sterling-blue group-hover:text-white transition-colors duration-300">
      {icon}
    </div>
    <h3 className="font-bold text-xl mb-3 text-sterling-mist group-hover:text-sterling-blue transition-colors">{title}</h3>
    <p className="text-sterling-mist/60 leading-relaxed text-sm">{desc}</p>
  </motion.div>
);