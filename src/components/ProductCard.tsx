import { Product } from '../types';
import { Percent } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const getDiscountPercentage = (original: number, promo: number) => {
    return Math.round(((original - promo) / original) * 100);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <span className="absolute top-2 right-2 bg-green-500 text-white text-sm py-1 px-2 rounded-full">
          {getDiscountPercentage(product.originalPrice, product.promoPrice)}% OFF
        </span>
      </div>
      <div className="p-4 space-y-4">
        <div className="space-y-1">
          <p className="text-2xl font-bold">
            R$ {product.promoPrice.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 line-through">
            R$ {product.originalPrice.toFixed(2)}
          </p>
          <div className="flex items-center gap-1 text-sm text-purple-600">
            <Percent className="h-4 w-4" />
            {product.promoType}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Estoque: {product.stock} unidades
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}