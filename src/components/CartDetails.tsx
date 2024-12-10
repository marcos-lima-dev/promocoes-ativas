import { useState } from 'react';
import { Product, Coupon, ShippingInfo } from '../types';
import { X } from 'lucide-react';
import { Checkout } from './Checkout/Checkout';

interface CartDetailsProps {
  items: Product[];
  onClose: () => void;
  onRemoveItem: (index: number) => void;
  onApplyCoupon: (code: string) => void;
  onCalculateShipping: (cep: string) => void;
  appliedCoupon: Coupon | null;
  couponError: string;
  shippingInfo: ShippingInfo | null;
  isCalculatingShipping: boolean;
}

export function CartDetails({ 
  items, 
  onClose, 
  onRemoveItem,
  onApplyCoupon,
  onCalculateShipping,
  appliedCoupon,
  couponError,
  shippingInfo,
  isCalculatingShipping
}: CartDetailsProps) {
  const [showCheckout, setShowCheckout] = useState(false);
  const subtotal = items.reduce((sum, item) => sum + item.promoPrice, 0);
  const couponDiscount = appliedCoupon ? subtotal * (appliedCoupon.discount / 100) : 0;
  const shippingCost = subtotal >= 299 ? 0 : (shippingInfo?.price || 0);
  const total = subtotal - couponDiscount + shippingCost;

  if (items.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md m-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Carrinho</h2>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <p className="text-center text-gray-600">Seu carrinho está vazio</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {!showCheckout ? (
        <div 
          className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md m-4" 
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Carrinho</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between border-b pb-4">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-purple-600 text-sm">{item.promoType}</p>
                  <p className="text-gray-600">
                    R$ {item.promoPrice.toFixed(2)}
                    <span className="text-sm text-gray-400 line-through ml-2">
                      R$ {item.originalPrice.toFixed(2)}
                    </span>
                  </p>
                </div>
                <button 
                  onClick={() => onRemoveItem(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-green-600">
                  <span>Desconto:</span>
                  <span>- R$ {couponDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => setShowCheckout(true)}
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      ) : (
        <Checkout
          items={items}
          subtotal={subtotal}
          appliedCoupon={appliedCoupon}
          shippingInfo={shippingInfo}
          onClose={() => {
            setShowCheckout(false);
            onClose();
          }}
        />
      )}
    </div>
  );
}