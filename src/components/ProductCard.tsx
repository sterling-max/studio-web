import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { type Product } from '../constants/products';
import { ArrowUpRight, Folder, Play, Video, Activity, Book } from 'lucide-react';
import { cn } from '../utils/cn';

interface ProductCardProps {
  product: Product;
  index: number;
  className?: string;
}

export const ProductCard = ({ product, index, className }: ProductCardProps) => {
  const navigate = useNavigate();
  const previewImage = product.id === 'max-commander' ? '/assets/max-commander/1.png' : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={product.status === 'available' ? { y: -8, transition: { duration: 0.3 } } : {}}
      onClick={() => product.status === 'available' && navigate(`/products/${product.id}`)}
      className={cn(
        "group relative flex flex-col bg-sterling-deep border border-sterling-mist/5 rounded-[2.5rem] p-6 h-full transition-all duration-500 overflow-hidden",
        product.status === 'available' 
          ? "hover:border-sterling-blue/40 hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)] cursor-pointer" 
          : "opacity-80 grayscale-[0.5]"
      )}
    >
      {/* Glossy Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-sterling-blue/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Top Section: Icon & Category */}
      <div className="relative z-10 flex items-center justify-between mb-8">
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg",
          product.status === 'available' 
            ? "bg-sterling-blue/15 text-sterling-blue group-hover:bg-sterling-blue group-hover:text-white group-hover:scale-110" 
            : "bg-sterling-mist/10 text-sterling-mist/40"
        )}>
          {product.id === 'max-commander' && <Folder size={24} />}
          {product.id === 'dash' && <Play size={24} />}
          {product.id === 'zap-studio' && <Video size={24} />}
          {product.id === 'easy-monitor' && <Activity size={24} />}
          {product.id === 'tales-universe' && <Book size={24} />}
        </div>
        
        {product.status === 'soon' ? (
          <div className="px-4 py-1.5 bg-sterling-cyan text-sterling-midnight text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-[0_0_15px_rgba(0,255,255,0.4)] animate-pulse">
            Coming Soon
          </div>
        ) : (
          <span className="px-3 py-1 bg-sterling-midnight/50 text-sterling-mist/40 text-[9px] uppercase tracking-widest rounded-full border border-sterling-mist/5">
            {product.category}
          </span>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-3xl font-bold text-sterling-mist mb-1 tracking-tight group-hover:text-white transition-colors">
              {product.name}
            </h3>
            <p className="text-sterling-cyan text-xs font-semibold uppercase tracking-wider opacity-80 mb-4 italic">
              {product.tagline}
            </p>
          </div>
          {product.status === 'available' && (
            <ArrowUpRight className="text-sterling-mist/20 group-hover:text-sterling-blue group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" size={24} />
          )}
        </div>

        {/* Smaller, Contained Screenshot */}
        {previewImage && (
          <div className="relative mt-2 mb-8 mx-auto w-[90%] aspect-[16/10] overflow-hidden rounded-2xl border border-sterling-blue/15 bg-sterling-midnight/50 shadow-2xl group-hover:border-sterling-blue/30 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-tr from-sterling-blue/10 via-transparent to-transparent opacity-50 z-10" />
            <img
              src={previewImage}
              alt={`${product.name} preview`}
              className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
        )}

        <p className="text-sterling-mist/50 text-sm leading-relaxed line-clamp-3 group-hover:text-sterling-mist/70 transition-colors">
          {product.description}
        </p>
        
        {/* Features Preview (Subtle) */}
        <div className="mt-6 flex flex-wrap gap-2">
          {product.features.slice(0, 3).map((f, i) => (
            <span key={i} className="text-[10px] text-sterling-mist/30 border border-sterling-mist/5 px-2 py-0.5 rounded-md">
              {f}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
