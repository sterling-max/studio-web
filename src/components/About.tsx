import { motion } from 'framer-motion';
import { Award, Users, Code } from 'lucide-react';

export const About = () => {
  return (
    <section id="lab" className="pt-0 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">The <span className="text-sterling-blue">Lab</span></h2>
        <p className="max-w-3xl text-lg text-sterling-mist/60 leading-relaxed">
          Sterling Lab is a premier software atelier born in the heart of Italy. 
          We blend the timeless principles of Italian design—elegance, proportion, and emotion—with 
          cutting-edge engineering to create digital products that feel inevitable.
        </p>
      </motion.div>
 
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: <Award size={32} />, color: "text-sterling-blue", bg: "bg-sterling-blue/10", title: "Excellence", desc: "We don't just write code; we craft experiences. Every pixel is deliberated, every interaction polished to perfection." },
          { icon: <Code size={32} />, color: "text-sterling-cyan", bg: "bg-sterling-cyan/10", title: "Innovation", desc: "Leveraging the latest in Rust, React, and AI to build tools that empower users to do their best work." },
          { icon: <Users size={32} />, color: "text-sterling-mist", bg: "bg-sterling-mist/10", title: "Human-Centric", desc: "Technology should serve humanity. Our products are designed to be intuitive, accessible, and delightful." }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
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
    </section>
  );
};
