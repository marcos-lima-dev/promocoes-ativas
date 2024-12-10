import { useState } from 'react';
import { Product, Coupon, ShippingInfo } from '../types';
import { X, CheckCircle, Search } from 'lucide-react';
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
  const [cepInput, setCepInput] = useState('');
  const [couponCode, setCouponCode] = useState('');
  
  const subtotal = items.reduce((sum, item) => sum + item.promoPrice, 0);
  const couponDiscount = appliedCoupon ? subtotal * (appliedCoupon.discount / 100) : 0;
  const shippingCost = subtotal >= 299 ? 0 : (shippingInfo?.price || 0);
  const total = subtotal - couponDiscount + shippingCost;

  const handleCepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cepInput.length === 8) {
      onCalculateShipping(cepInput);
    }
  };

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyCoupon(couponCode.toUpperCase());
  };

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
            {/* Lista de Produtos */}
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

            {/* Seção de Cupom */}
            <div className="pt-4">
              <h3 className="font-semibold mb-2">Cupom de Desconto</h3>
              <form onSubmit={handleCouponSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Digite o código"
                  className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  Aplicar
                </button>
              </form>
              {couponError && (
                <p className="text-red-500 text-sm mt-1">{couponError}</p>
              )}
              {appliedCoupon && (
                <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Cupom aplicado!
                </p>
              )}
            </div>

            {/* Seção de Frete */}
            <div className="pt-4">
              <h3 className="font-semibold mb-2">Calcular Frete</h3>
              {subtotal >= 299 ? (
                <p className="text-green-600 text-sm">✓ Frete grátis para esta compra!</p>
              ) : (
                <>
                  <form onSubmit={handleCepSubmit} className="flex gap-2">
                    <input
                      type="text"
                      value={cepInput}
                      onChange={(e) => setCepInput(e.target.value.replace(/\D/g, ''))}
                      placeholder="Digite seu CEP"
                      maxLength={8}
                      className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      disabled={cepInput.length !== 8 || isCalculatingShipping}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
                    >
                      {isCalculatingShipping ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Search className="w-6 h-6" />
                      )}
                    </button>
                  </form>
                  {shippingInfo && (
                    <div className="mt-2 p-2 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{shippingInfo.type}</p>
                          <p className="text-sm text-gray-600">
                            Entrega em até {shippingInfo.deliveryTime} dias úteis
                          </p>
                        </div>
                        <p className="font-bold">
                          R$ {shippingInfo.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Resumo de Valores */}
            <div className="pt-4 border-t mt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-green-600">
                  <span>Desconto:</span>
                  <span>- R$ {couponDiscount.toFixed(2)}</span>
                </div>
              )}
              {shippingInfo && subtotal < 299 && (
                <div className="flex justify-between text-gray-600">
                  <span>Frete:</span>
                  <span>R$ {shippingCost.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total:</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => setShowCheckout(true)}
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors mt-4"
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