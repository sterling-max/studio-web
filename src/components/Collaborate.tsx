import { motion } from 'framer-motion';
import { ShieldCheck, MessageCircle, Mail, Award, Code, Users } from 'lucide-react';
import { cn } from '../utils/cn';
import { StripeLogo, VisaLogo, MastercardLogo, ApplePayLogo, GooglePayLogo } from './PaymentLogos';

export const Collaborate = ({ 
  showHeader = true, 
  showCards = true,
  showContainer = true
}: { 
  showHeader?: boolean;
  showCards?: boolean;
  showContainer?: boolean;
}) => {
  const whatsappNumber = "393475393181";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%20Sterling%20Lab,%20I'd%20like%20to%20discuss%20a%20project.`;

  return (
    <section id="lab" className={cn("py-24 px-6 md:px-12 max-w-7xl mx-auto", !showContainer && "py-0")}>
      {showHeader && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center lg:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">The <span className="text-sterling-blue">Lab</span></h2>
          <p className="max-w-3xl text-xl text-sterling-mist/60 leading-relaxed mx-auto lg:mx-0">
            Sterling Lab is more than a software house. It's an atelier where 
            timeless design meets cutting-edge engineering to create products that feel inevitable.
          </p>
        </motion.div>
      )}

      {showCards && (
        <div className="grid lg:grid-cols-3 gap-8 mb-24">
          {[
            { icon: <Award size={32} />, color: "text-sterling-blue", bg: "bg-sterling-blue/10", title: "Excellence", desc: "Every pixel is deliberated, every interaction polished. We don't just write code; we craft digital legacy." },
            { icon: <Code size={32} />, color: "text-sterling-cyan", bg: "bg-sterling-cyan/10", title: "Innovation", desc: "From Rust performance to AI-driven creativity, we leverage the frontier to build tools of the future." },
            { icon: <Users size={32} />, color: "text-sterling-mist", bg: "bg-sterling-mist/10", title: "Human-Centric", desc: "Technology should be invisible. Our products are designed to be intuitive, accessible, and deeply personal." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-sterling-deep/50 p-8 rounded-[2.5rem] border border-sterling-mist/5 hover:border-sterling-blue/20 transition-all shadow-sm hover:shadow-2xl hover:-translate-y-2 duration-500"
            >
              <div className={`mb-6 w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-sterling-blue group-hover:text-white`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-sterling-mist group-hover:text-white transition-colors">{item.title}</h3>
              <p className="text-sterling-mist/60 leading-relaxed group-hover:text-sterling-mist/80 transition-colors">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Unified CTA Block */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className={cn(
          "relative overflow-hidden p-12 md:p-20 text-center",
          showContainer && "rounded-[3rem] bg-gradient-to-br from-sterling-deep to-sterling-midnight border border-sterling-blue/20"
        )}
      >
        {showContainer && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-sterling-blue/20 blur-[100px] rounded-full pointer-events-none" />
        )}
        
        <h3 className="text-4xl md:text-6xl font-bold mb-8 relative z-10 tracking-tight">
          Have a <span className="text-sterling-blue">Project</span> in mind?
        </h3>
        <p className="text-xl text-sterling-mist/60 mb-12 max-w-xl mx-auto relative z-10 leading-relaxed">
          Whether it's a productivity powerhouse or a creative experiment, we'd love to discuss how we can bring your vision to life.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative z-10 mb-16">
          <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-10 py-5 bg-[#25D366] text-white rounded-2xl font-bold text-lg shadow-[0_0_30px_rgba(37,211,102,0.3)] hover:shadow-[0_0_50px_rgba(37,211,102,0.5)] transition-all w-full md:w-auto justify-center"
          >
            <MessageCircle size={24} />
            Chat on WhatsApp
          </motion.a>
          
          <a 
            href="mailto:support@sterling.ltd" 
            className="flex items-center gap-2 text-sterling-mist/40 hover:text-sterling-mist transition-colors cursor-pointer text-sm py-2 px-4"
          >
            <Mail size={18} />
            <span>support@sterling.ltd</span>
          </a>
        </div>

        {/* Payment & Trust Info */}
        <div className="relative z-10 pt-10 border-t border-sterling-mist/5 flex flex-col items-center gap-6">
          <div className="flex items-center gap-3 text-sterling-mist/30 text-[10px] font-bold uppercase tracking-[0.2em]">
            <ShieldCheck size={14} className="text-emerald-500/50" />
            <span>Payments Powered by</span>
            <StripeLogo className="h-4 w-auto text-sterling-mist/40" />
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            <VisaLogo className="h-4 w-auto" />
            <MastercardLogo className="h-6 w-auto" />
            <ApplePayLogo className="h-5 w-auto" />
            <GooglePayLogo className="h-5 w-auto" />
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-sterling-mist/60">
              <span className="w-1.5 h-1.5 rounded-full bg-sterling-blue" />
              AMEX
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
