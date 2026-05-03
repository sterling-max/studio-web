import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { type Product } from '../constants/products';
import { ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  index: number;
  className?: string;
}

export const ProductCard = ({ product, index }: ProductCardProps) => {
  const navigate = useNavigate();
  const previewImage = (() => {
    const imageMap: Record<string, string> = {
      'max-commander': '/assets/max-commander/1.png',
      'dash': '/assets/dash/1.png',
      'zap-studio': '/assets/zap-studio/0.png',
      'tales-universe': '/assets/tales-universe/01.jpg',
    };
    return imageMap[product.id] || null;
  })();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onClick={() => navigate(`/products/${product.id}`)}
      className="group relative flex flex-col bg-sterling-deep rounded-[2.5rem] overflow-hidden cursor-pointer"
    >
      {/* 3D Image Container with Framer Motion */}
      {previewImage && (
        <div className="p-6 pb-0 perspective-[1040px]">
          <motion.div
            initial={{ rotateY: -8, rotateX: 3 }}
            whileHover={{ rotateY: -4, rotateX: 1, scale: 1.02 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-sterling-blue/20 via-transparent to-transparent opacity-60 z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-sterling-midnight/60 z-10" />
            <img
              src={previewImage}
              alt={`${product.name} preview`}
              className="w-full h-full object-cover object-top scale-125 group-hover:scale-150 transition-transform duration-700"
            />
          </motion.div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col p-6 pt-4">
        {/* Header: Title & Status */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              {product.id === 'max-commander' && (
                <img src="/assets/mc-logo.png" alt="Max Commander" className="w-6 h-6 object-contain" />
              )}
              {product.id === 'dash' && (
                <img src="/assets/dash-logo.png" alt="Dash" className="w-6 h-6 object-contain" />
              )}
              {product.id === 'zap-studio' && (
                <img src="/assets/zap-logo.svg" alt="Zap Studio" className="w-6 h-6 object-contain" />
              )}
              <h3 className="text-2xl font-bold text-sterling-mist tracking-tight group-hover:text-sterling-blue transition-colors">
                {product.name}
              </h3>
            </div>
            <p className="text-sterling-cyan text-[10px] font-bold uppercase tracking-[0.1em] opacity-80 italic">
              {product.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {product.status === 'soon' && (
              <div className="px-3 py-1 bg-sterling-blue text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full shadow-[0_0_15px_rgba(0,122,255,0.4)] animate-pulse">
                Coming Soon
              </div>
            )}
            <ArrowUpRight className="text-sterling-mist/20 group-hover:text-sterling-blue group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" size={20} />
          </div>
        </div>

        <p className="text-sterling-mist/50 text-sm leading-relaxed line-clamp-2 group-hover:text-sterling-mist/70 transition-colors mb-4">
          {product.description}
        </p>

        {/* Chips Footer */}
        <div className="mt-auto flex flex-wrap gap-2">
          <span className="text-[9px] font-bold text-sterling-blue/80 bg-sterling-blue/10 px-2 py-0.5 rounded-md uppercase tracking-wider">
            {product.category}
          </span>
          {product.features.slice(0, 2).map((f, i) => (
            <span key={i} className="text-[9px] text-sterling-mist/30 bg-sterling-mist/5 px-2 py-0.5 rounded-md">
              {f}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
