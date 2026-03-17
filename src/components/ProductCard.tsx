import { motion } from 'framer-motion';
import { type Product } from '../constants/products';
import { ArrowUpRight, Folder, Play, Video, Activity, Book } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  index: number;
  onViewProduct?: (productId: string) => void;
  className?: string;
}

export const ProductCard = ({ product, index, onViewProduct, className }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ scale: 1.02, y: -5 }}
      onClick={() => onViewProduct?.(product.id)}
      className={`group relative flex flex-col bg-sterling-deep border border-sterling-mist/5 rounded-3xl p-8 overflow-hidden transition-all hover:border-sterling-blue/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] cursor-pointer ${className || ''}`}
    >
      {/* Decorative Gradient Overlay */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-sterling-blue/10 rounded-full blur-[60px] group-hover:bg-sterling-blue/20 transition-all duration-500" />

      <div className="relative z-10 flex justify-between items-start mb-6">
        <div className="w-14 h-14 shrink-0 bg-sterling-blue/10 rounded-2xl flex items-center justify-center text-sterling-blue group-hover:bg-sterling-blue group-hover:text-white transition-all duration-300 shadow-sm">
          {product.id === 'max-commander' && <Folder size={28} />}
          {product.id === 'dash' && <Play size={28} />}
          {product.id === 'zap-studio' && <Video size={28} />}
          {product.id === 'easy-monitor' && <Activity size={28} />}
          {product.id === 'tales-universe' && <Book size={28} />}
        </div>
        <span className="px-3 py-1 bg-sterling-midnight text-sterling-mist/40 text-[10px] uppercase tracking-widest rounded-full border border-sterling-mist/5">
          {product.category}
        </span>
      </div>

      <div className="relative z-10 mb-auto">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-2xl font-bold text-sterling-mist group-hover:text-sterling-blue transition-colors">{product.name}</h3>
          {product.status === 'soon' && (
            <span className="px-2 py-0.5 text-[9px] font-bold tracking-widest text-sterling-midnight bg-sterling-cyan rounded-full uppercase">
              Soon
            </span>
          )}
          <ArrowUpRight className="ml-auto text-sterling-mist/20 group-hover:text-sterling-blue group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" size={24} />
        </div>
        <p className="text-sm text-sterling-cyan font-medium italic opacity-80 mb-4">{product.tagline}</p>
        
        <p className="text-sterling-mist/60 text-sm leading-relaxed line-clamp-3 mb-6">
          {product.description}
        </p>
      </div>
    </motion.div>
  );
};
