import { useState } from 'react';
import { ShoppingCart, Tag } from 'lucide-react';
import { ProductCard } from './components/ProductCard';
import   { CartDetails } from './components/CartDetails';
import type { Product, Promotion, Coupon, ShippingInfo } from './types';

function App() {
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Camiseta Básica",
      originalPrice: 79.90,
      promoPrice: 59.90,
      promoType: "Desconto Direto",
      stock: 15
    },
    {
      id: 2,
      name: "Calça Jeans",
      originalPrice: 199.90,
      promoPrice: 159.90,
      promoType: "Cupom JEANS20",
      stock: 8
    },
    {
      id: 3,
      name: "Tênis Casual",
      originalPrice: 299.90,
      promoPrice: 239.90,
      promoType: "Pagamento em Dinheiro",
      stock: 5
    }
  ]);

  const [availableCoupons] = useState<Coupon[]>([
    {
      code: 'PROMO10',
      discount: 10,
      validUntil: new Date('2024-12-31')
    },
    {
      code: 'FRETE20',
      discount: 20,
      minValue: 200,
      validUntil: new Date('2024-12-31')
    }
  ]);

  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string>('');
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);

  const [activePromos] = useState<Promotion[]>([
    {
      id: 1,
      name: "Desconto Verão",
      discount: "25%",
      validity: "Até 31/12"
    },
    {
      id: 2,
      name: "Frete Grátis",
      conditions: "Compras acima de R$299",
      validity: "Até 15/12"
    }
  ]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleApplyCoupon = (code: string) => {
    // Padroniza o código do cupom (remove espaços e converte para maiúsculo)
    const normalizedCode = code.replace(/\s+/g, '').toUpperCase();
    
    const coupon = availableCoupons.find(c => c.code === normalizedCode);
    
    if (!coupon) {
      setCouponError('Cupom inválido');
      setAppliedCoupon(null);
      return;
    }
  
    if (coupon.validUntil < new Date()) {
      setCouponError('Cupom expirado');
      setAppliedCoupon(null);
      return;
    }
  
    const cartTotal = cart.reduce((total, item) => total + item.promoPrice, 0);
    
    if (coupon.minValue && cartTotal < coupon.minValue) {
      setCouponError(`Valor mínimo para este cupom: R$ ${coupon.minValue}`);
      setAppliedCoupon(null);
      return;
    }
  
    setAppliedCoupon(coupon);
    setCouponError('');
  };

  const calculateShipping = async (cep: string) => {
    setIsCalculatingShipping(true);
    try {
      // Simula uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simula diferentes valores baseados no CEP
      const lastDigit = Number(cep.slice(-1));
      const mockShipping: ShippingInfo = {
        cep,
        price: 15 + lastDigit,
        deliveryTime: 3 + lastDigit % 3,
        type: lastDigit % 2 === 0 ? 'PAC' : 'SEDEX'
      };
      
      setShippingInfo(mockShipping);
    } catch (error) {
      console.error('Erro ao calcular frete:', error);
    } finally {
      setIsCalculatingShipping(false);
    }
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((total, item) => total + item.promoPrice, 0);
    const couponDiscount = appliedCoupon ? subtotal * (appliedCoupon.discount / 100) : 0;
    const shippingCost = subtotal >= 299 ? 0 : (shippingInfo?.price || 0);
    
    return subtotal - couponDiscount + shippingCost;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Banner de Promoções */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg overflow-hidden shadow-lg">
          <div className="p-4">
            <h2 className="text-white text-xl font-bold flex items-center gap-2">
              <Tag className="h-6 w-6" />
              Promoções Ativas
            </h2>
          </div>
          <div className="p-4 space-y-2">
            {activePromos.map(promo => (
              <div key={promo.id} className="bg-white/90 rounded-lg p-3 flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{promo.name}</h3>
                  <p className="text-sm text-gray-600">
                    {promo.discount || promo.conditions}
                  </p>
                </div>
                <span className="bg-gray-100 text-gray-800 text-sm py-1 px-3 rounded-full">
                  {promo.validity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Catálogo de Produtos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>

        {/* Mini Carrinho */}
        <div className="fixed bottom-4 left-4 right-4 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
          <div 
            className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setIsCartOpen(true)}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-6 w-6 text-purple-600" />
                <span className="font-medium">
                  {cart.length} {cart.length === 1 ? 'item' : 'itens'} no carrinho
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total com descontos:</p>
                <p className="text-xl font-bold">
                  R$ {calculateTotal().toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal do Carrinho */}
        {isCartOpen && (
          <CartDetails 
            items={cart}
            onClose={() => setIsCartOpen(false)}
            onRemoveItem={removeFromCart}
            onApplyCoupon={handleApplyCoupon}
            appliedCoupon={appliedCoupon}
            couponError={couponError}
            onCalculateShipping={calculateShipping}
            shippingInfo={shippingInfo}
            isCalculatingShipping={isCalculatingShipping}
          />
        )}
      </div>
    </div>
  );
}

export default App;