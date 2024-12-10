import { useState } from 'react';
import { Product, Coupon, ShippingInfo } from '../types';
import { X } from 'lucide-react';
import { Steps } from './Checkout/Steps';

interface CheckoutProps {
  items: Product[];
  subtotal: number;
  appliedCoupon: Coupon | null;
  shippingInfo: ShippingInfo | null;
  onClose: () => void;
}

interface CustomerData {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    cep: string;
  };
}

interface PaymentMethod {
  type: 'credit' | 'pix' | 'boleto';
  installments?: number;
}

export function Checkout({ 
  items, 
  subtotal, 
  appliedCoupon, 
  shippingInfo, 
  onClose 
}: CheckoutProps): JSX.Element {
  const [step, setStep] = useState<'customer' | 'payment' | 'review'>('customer');
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    address: {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      cep: shippingInfo?.cep || ''
    }
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({ type: 'credit' });

  const couponDiscount = appliedCoupon ? subtotal * (appliedCoupon.discount / 100) : 0;
  const shippingCost = subtotal >= 299 ? 0 : (shippingInfo?.price || 0);
  const total = subtotal - couponDiscount + shippingCost;

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('review');
  };

  const handleFinishPurchase = () => {
    console.log('Pedido finalizado:', {
      items,
      customerData,
      paymentMethod,
      total
    });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={(e) => {
        // Fecha apenas se o clique for exatamente no backdrop
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="bg-white w-full max-w-2xl rounded-lg shadow-xl m-4"
        onClick={e => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Finalizar Compra</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-6">
          <Steps currentStep={step} />

          <div className="mt-6">
            {/* Formulário de Cliente */}
            {step === 'customer' && (
              <form onSubmit={handleCustomerSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Nome Completo */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Nome Completo</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={customerData.name}
                      onChange={e => setCustomerData({...customerData, name: e.target.value})}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-1">E-mail</label>
                    <input
                      type="email"
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={customerData.email}
                      onChange={e => setCustomerData({...customerData, email: e.target.value})}
                    />
                  </div>

                  {/* CPF */}
                  <div>
                    <label className="block text-sm font-medium mb-1">CPF</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={customerData.cpf}
                      onChange={e => setCustomerData({...customerData, cpf: e.target.value})}
                    />
                  </div>

                  {/* Telefone */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Telefone</label>
                    <input
                      type="tel"
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={customerData.phone}
                      onChange={e => setCustomerData({...customerData, phone: e.target.value})}
                    />
                  </div>

                  {/* CEP */}
                  <div>
                    <label className="block text-sm font-medium mb-1">CEP</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={customerData.address.cep}
                      onChange={e => setCustomerData({
                        ...customerData,
                        address: { ...customerData.address, cep: e.target.value }
                      })}
                    />
                  </div>
                  {/* Rua */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Rua</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={customerData.address.street}
                      onChange={e => setCustomerData({
                        ...customerData,
                        address: { ...customerData.address, street: e.target.value }
                      })}
                    />
                  </div>

                  {/* Número */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Número</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={customerData.address.number}
                      onChange={e => setCustomerData({
                        ...customerData,
                        address: { ...customerData.address, number: e.target.value }
                      })}
                    />
                  </div>

                  {/* Complemento */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Complemento</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={customerData.address.complement}
                      onChange={e => setCustomerData({
                        ...customerData,
                        address: { ...customerData.address, complement: e.target.value }
                      })}
                    />
                  </div>

                  {/* Bairro */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Bairro</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={customerData.address.neighborhood}
                      onChange={e => setCustomerData({
                        ...customerData,
                        address: { ...customerData.address, neighborhood: e.target.value }
                      })}
                    />
                  </div>

                  {/* Cidade */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Cidade</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={customerData.address.city}
                      onChange={e => setCustomerData({
                        ...customerData,
                        address: { ...customerData.address, city: e.target.value }
                      })}
                    />
                  </div>

                  {/* Estado */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Estado</label>
                    <input
                      type="text"
                      required
                      maxLength={2}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent uppercase"
                      value={customerData.address.state}
                      onChange={e => setCustomerData({
                        ...customerData,
                        address: { ...customerData.address, state: e.target.value.toUpperCase() }
                      })}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Continuar para Pagamento
                </button>
              </form>
            )}

            {/* Formulário de Pagamento */}
            {step === 'payment' && (
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Método de Pagamento</label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value="credit"
                          checked={paymentMethod.type === 'credit'}
                          onChange={() => setPaymentMethod({ type: 'credit' })}
                        />
                        <span>Cartão de Crédito</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value="pix"
                          checked={paymentMethod.type === 'pix'}
                          onChange={() => setPaymentMethod({ type: 'pix' })}
                        />
                        <span>PIX</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value="boleto"
                          checked={paymentMethod.type === 'boleto'}
                          onChange={() => setPaymentMethod({ type: 'boleto' })}
                        />
                        <span>Boleto</span>
                      </label>
                    </div>
                  </div>

                  {paymentMethod.type === 'credit' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Número do Cartão</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Validade</label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="MM/AA"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">CVV</label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="123"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Nome no Cartão</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Parcelas</label>
                        <select 
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          value={paymentMethod.installments}
                          onChange={(e) => setPaymentMethod({
                            ...paymentMethod,
                            installments: Number(e.target.value)
                          })}
                        >
                          <option value="1">1x sem juros</option>
                          <option value="2">2x sem juros</option>
                          <option value="3">3x sem juros</option>
                          <option value="4">4x sem juros</option>
                          <option value="5">5x sem juros</option>
                          <option value="6">6x sem juros</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setStep('customer')}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Revisar Pedido
                  </button>
                </div>
              </form>
            )}

            {/* Revisão do Pedido */}
            {step === 'review' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Resumo do Pedido</h3>
                  {items.map((item, index) => (
                    <div key={index} className="flex justify-between py-2 border-b">
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

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal:</span>
                      <span>R$ {subtotal.toFixed(2)}</span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between text-green-600">
                        <span>Desconto:</span>
                        <span>-R$ {couponDiscount.toFixed(2)}</span>
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
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep('payment')}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={handleFinishPurchase}
                    className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Confirmar Pedido
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}