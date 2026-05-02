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
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      onClick={() => product.status === 'available' && navigate(`/products/${product.id}`)}
      className={cn(
        "group relative flex flex-col bg-sterling-deep border border-sterling-mist/5 rounded-[2.5rem] p-8 h-full transition-all duration-500 overflow-hidden",
        product.status === 'available' ? "cursor-pointer" : "cursor-default",
        "hover:border-sterling-blue/40 hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
      )}
    >
      {/* Glossy Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-sterling-blue/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Top Header: Title & Status */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              {product.id === 'max-commander' && (
                <img src="/assets/mc-logo.png" alt="Max Commander" className="w-8 h-8 object-contain" />
              )}
              <h3 className="text-3xl font-bold text-sterling-mist tracking-tight group-hover:text-white transition-colors">
                {product.name}
              </h3>
            </div>
            <p className="text-sterling-cyan text-[11px] font-bold uppercase tracking-[0.1em] opacity-80 italic">
              {product.tagline}
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            {product.status === 'soon' && (
              <div className="px-4 py-1.5 bg-sterling-blue text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-[0_0_15px_rgba(0,122,255,0.4)] animate-pulse">
                Coming Soon
              </div>
            )}
            {product.status === 'available' && (
              <ArrowUpRight className="text-sterling-mist/20 group-hover:text-sterling-blue group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" size={24} />
            )}
          </div>
        </div>

        {/* Contained Screenshot */}
        {previewImage && (
          <div className="relative mt-2 mb-8 mx-auto w-full aspect-[16/10] overflow-hidden rounded-2xl border border-sterling-blue/15 bg-sterling-midnight/50 shadow-2xl group-hover:border-sterling-blue/30 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-tr from-sterling-blue/10 via-transparent to-transparent opacity-50 z-10" />
            <img
              src={previewImage}
              alt={`${product.name} preview`}
              className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
        )}

        <p className="text-sterling-mist/50 text-sm leading-relaxed line-clamp-3 group-hover:text-sterling-mist/70 transition-colors mb-6">
          {product.description}
        </p>
        
        {/* Chips Footer: Category + Features */}
        <div className="mt-auto flex flex-wrap gap-2">
          <span className="text-[10px] font-bold text-sterling-blue border border-sterling-blue/20 bg-sterling-blue/5 px-2 py-0.5 rounded-md uppercase tracking-wider">
            {product.category}
          </span>
          {product.features.slice(0, 2).map((f, i) => (
            <span key={i} className="text-[10px] text-sterling-mist/30 border border-sterling-mist/5 px-2 py-0.5 rounded-md">
              {f}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
