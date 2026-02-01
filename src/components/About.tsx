import { motion } from 'framer-motion';
import { MapPin, Award, Users, Code } from 'lucide-react';

export const About = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6">The <span className="text-sterling-blue">Studio</span></h1>
        <div className="flex items-center justify-center gap-2 text-sterling-cyan/80 mb-8">
          <MapPin size={18} />
          <span className="uppercase tracking-[0.2em] text-sm">Marche, Italy</span>
        </div>
        <p className="max-w-3xl mx-auto text-xl text-sterling-mist/70 leading-relaxed">
          Sterling Studio is a premier software atelier born in the heart of Italy. 
          We blend the timeless principles of Italian design—elegance, proportion, and emotion—with 
          cutting-edge engineering to create digital products that feel inevitable.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {[
          { icon: <Award size={32} />, color: "text-sterling-blue", bg: "bg-sterling-blue/10", title: "Excellence", desc: "We don't just write code; we craft experiences. Every pixel is deliberated, every interaction polished to perfection." },
          { icon: <Code size={32} />, color: "text-sterling-cyan", bg: "bg-sterling-cyan/10", title: "Innovation", desc: "Leveraging the latest in Rust, React, and AI to build tools that empower users to do their best work." },
          { icon: <Users size={32} />, color: "text-sterling-mist", bg: "bg-sterling-mist/10", title: "Human-Centric", desc: "Technology should serve humanity. Our products are designed to be intuitive, accessible, and delightful." }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.3 }}
            className="bg-sterling-deep p-8 rounded-[2rem] border border-sterling-mist/5 hover:border-sterling-blue/20 transition-all shadow-sm hover:shadow-md"
          >
            <div className={`mb-6 w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
              {item.icon}
            </div>
            <h3 className="text-xl font-bold mb-4 text-sterling-mist">{item.title}</h3>
            <p className="text-sterling-mist/70 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="relative rounded-[3rem] overflow-hidden bg-sterling-surface h-96 flex items-center justify-center border border-sterling-mist/5"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-sterling-midnight to-transparent z-10 opacity-90" />
        {/* Placeholder for an office or landscape shot */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />
        
        <div className="relative z-20 text-center p-8 px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Rooted in Tradition, Built for the Future</h2>
          <p className="text-white/70 max-w-xl mx-auto">
            From our headquarters in Italy, we serve a global clientele who demand nothing less than the best.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
