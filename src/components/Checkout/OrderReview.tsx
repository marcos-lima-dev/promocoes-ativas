// src/components/Checkout/OrderReview.tsx
import { Product, Coupon, ShippingInfo } from '../../types';

interface OrderReviewProps {
  items: Product[];
  subtotal: number;
  appliedCoupon: Coupon | null;
  shippingInfo: ShippingInfo | null;
  onBack: () => void;
  onFinish: () => void;
}

export function OrderReview({ 
  items, 
  subtotal, 
  appliedCoupon, 
  shippingInfo,
  onBack,
  onFinish 
}: OrderReviewProps): JSX.Element {
  const couponDiscount = appliedCoupon ? subtotal * (appliedCoupon.discount / 100) : 0;
  const shippingCost = subtotal >= 299 ? 0 : (shippingInfo?.price || 0);
  const total = subtotal - couponDiscount + shippingCost;

  return (
    <div className="space-y-6">
      {/* Produtos */}
      <div className="space-y-4">
        <h3 className="font-semibold">Produtos</h3>
        <div className="divide-y">
          {items.map((item, index) => (
            <div key={index} className="py-3 flex justify-between">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">{item.promoType}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">R$ {item.promoPrice.toFixed(2)}</p>
                <p className="text-sm text-gray-500 line-through">
                  R$ {item.originalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Entrega */}
      <div className="space-y-2 border-t pt-4">
        <h3 className="font-semibold">Entrega</h3>
        {subtotal >= 299 ? (
          <p className="text-green-600">Frete Grátis</p>
        ) : shippingInfo ? (
          <div className="flex justify-between">
            <div>
              <p className="font-medium">{shippingInfo.type}</p>
              <p className="text-sm text-gray-600">
                Entrega em até {shippingInfo.deliveryTime} dias úteis
              </p>
            </div>
            <p className="font-medium">R$ {shippingInfo.price.toFixed(2)}</p>
          </div>
        ) : (
          <p className="text-gray-600">Frete não calculado</p>
        )}
      </div>

      {/* Resumo de Valores */}
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal:</span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>
        
        {appliedCoupon && (
          <div className="flex justify-between text-green-600">
            <span>Desconto ({appliedCoupon.code}):</span>
            <span>- R$ {couponDiscount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between text-gray-600">
          <span>Frete:</span>
          <span>R$ {shippingCost.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between items-center text-lg font-bold pt-2 border-t">
          <span>Total:</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
      </div>

      {/* Botões de Navegação */}
      <div className="flex gap-4 pt-4">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Voltar
        </button>
        <button
          onClick={onFinish}
          className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Confirmar Pedido
        </button>
      </div>
    </div>
  );
}