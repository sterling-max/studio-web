import { motion } from 'framer-motion';
import { MessageCircle, Mail, Globe } from 'lucide-react';

export const Contact = () => {
  const whatsappNumber = "1234567890"; // Placeholder
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%20Sterling%20Lab,%20I'd%20like%20to%20discuss%20a%20project.`;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full text-center"
      >
        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium tracking-[0.2em] uppercase border border-sterling-cyan/30 rounded-full bg-sterling-cyan/5 text-sterling-cyan">
          Get in Touch
        </span>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-8">Start a <span className="text-sterling-blue">Conversation</span></h1>
        
        <p className="text-xl text-sterling-mist/60 mb-12 max-w-lg mx-auto">
          Ready to elevate your digital presence? We are just a message away. 
          Let's discuss how Sterling can help you achieve your vision.
        </p>

        <motion.a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 px-10 py-5 bg-[#25D366] text-white rounded-2xl font-bold text-lg shadow-[0_0_30px_rgba(37,211,102,0.3)] hover:shadow-[0_0_50px_rgba(37,211,102,0.5)] transition-all mb-12"
        >
          <MessageCircle size={24} />
          Chat on WhatsApp
        </motion.a>

        <div className="flex justify-center gap-8 text-sterling-mist/40 text-sm">
          <div className="flex items-center gap-2 hover:text-sterling-mist transition-colors cursor-pointer">
            <Mail size={16} />
            <span>hello@sterling.lab</span>
          </div>
          <div className="flex items-center gap-2 hover:text-sterling-mist transition-colors cursor-pointer">
            <Globe size={16} />
            <span>sterling.lab</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
