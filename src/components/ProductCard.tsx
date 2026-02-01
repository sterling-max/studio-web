import { motion } from 'framer-motion';
import { type Product } from '../constants/products';
import { ArrowUpRight, Folder, Play, Video, Activity, Book } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  index: number;
}

export const ProductCard = ({ product, index }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="group relative flex flex-col bg-sterling-deep border border-sterling-mist/5 rounded-[2rem] p-8 overflow-hidden transition-all hover:border-sterling-blue/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
    >
      {/* Decorative Gradient Overlay */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-40 h-40 bg-sterling-blue/10 rounded-full blur-[60px] group-hover:bg-sterling-blue/20 transition-all" />

      <div className="flex justify-between items-start mb-6">
        <div className="w-14 h-14 bg-sterling-blue/10 rounded-2xl flex items-center justify-center text-sterling-blue group-hover:bg-sterling-blue group-hover:text-white transition-all duration-300">
          {product.id === 'max-commander' && <Folder size={28} />}
          {product.id === 'dash' && <Play size={28} />}
          {product.id === 'zap-studio' && <Video size={28} />}
          {product.id === 'easy-monitor' && <Activity size={28} />}
          {product.id === 'tales-universe' && <Book size={28} />}
        </div>
        <span className="px-3 py-1 bg-sterling-surface text-sterling-mist/40 text-[10px] uppercase tracking-widest rounded-full border border-sterling-mist/5">
          {product.category}
        </span>
      </div>

      <h3 className="text-2xl font-bold mb-2 text-sterling-mist group-hover:text-white transition-colors">{product.name}</h3>
      <p className="text-sm text-sterling-cyan font-medium mb-4 italic opacity-80">{product.tagline}</p>
      
      <p className="text-sterling-mist/60 text-sm leading-relaxed mb-6 line-clamp-3">
        {product.description}
      </p>

      <div className="mt-auto pt-6 border-t border-sterling-mist/5 flex flex-wrap gap-2">
        {product.techStack.slice(0, 3).map(tech => (
          <span key={tech} className="text-[10px] bg-sterling-surface px-2 py-1 rounded-md text-sterling-mist/50 font-mono">
            {tech}
          </span>
        ))}
        {product.techStack.length > 3 && (
          <span className="text-[10px] text-sterling-mist/30 flex items-center">
            +{product.techStack.length - 3} more
          </span>
        )}
      </div>

      <motion.button
        className="mt-6 flex items-center gap-2 text-sm font-semibold text-sterling-blue group-hover:gap-3 transition-all"
      >
        View Product <ArrowUpRight size={16} />
      </motion.button>
    </motion.div>
  );
};
