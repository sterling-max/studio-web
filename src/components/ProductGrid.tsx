import { useEffect } from 'react';
import { PRODUCTS } from '../constants/products';
import { ProductCard } from './ProductCard';

export const ProductGrid = () => {
  const visibleProducts = PRODUCTS.filter((product) => product.isVisible !== false);

  useEffect(() => {
    if (window.location.hash === '#products') {
      const element = document.getElementById('products');
      if (element) {
        setTimeout(() => {
          const y = element.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
