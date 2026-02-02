import { PRODUCTS } from '../constants/products';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  onViewProduct?: (productId: string) => void;
}

export const ProductGrid = ({ onViewProduct }: ProductGridProps) => {
  return (
    <section id="products" className="py-24 px-6 md:px-12 bg-sterling-midnight">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Crafted <span className="text-sterling-blue">Software</span></h2>
            <p className="text-sterling-mist/60 max-w-lg">
              Our portfolio spans from hyper-optimized system tools to imaginative creative engines.
            </p>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 md:pb-0 no-scrollbar">
            {['All', 'Productivity', 'Multimedia', 'Creative', 'Health'].map((filter) => (
              <button 
                key={filter}
                className="px-6 py-2 rounded-full border border-sterling-mist/10 text-sm whitespace-nowrap hover:bg-sterling-blue hover:border-sterling-blue transition-all"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index} 
              onViewProduct={onViewProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
