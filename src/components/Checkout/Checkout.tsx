// src/components/Checkout/Checkout.tsx
import { useState } from 'react';
import { Product, Coupon, ShippingInfo } from '../../types';
import { CustomerForm } from './CustomerForm';
import { PaymentForm } from './PaymentForm';
import { OrderReview } from './OrderReview';
import { Steps } from './Steps';
import { X } from 'lucide-react';

interface CheckoutProps {
  items: Product[];
  subtotal: number;
  appliedCoupon: Coupon | null;
  shippingInfo: ShippingInfo | null;
  onClose: () => void;
}

export function Checkout({ items, subtotal, appliedCoupon, shippingInfo, onClose }: CheckoutProps) {
  const [step, setStep] = useState<'customer' | 'payment' | 'review'>('customer');

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-y-auto p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Finalizar Compra</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <Steps currentStep={step} />

        {/* Content */}
        <div className="p-6">
          {step === 'customer' && (
            <CustomerForm onNext={() => setStep('payment')} />
          )}
          
          {step === 'payment' && (
            <PaymentForm 
              onNext={() => setStep('review')} 
              onBack={() => setStep('customer')}
            />
          )}
          
          {step === 'review' && (
            <OrderReview
              items={items}
              subtotal={subtotal}
              appliedCoupon={appliedCoupon}
              shippingInfo={shippingInfo}
              onBack={() => setStep('payment')}
              onFinish={() => console.log('Pedido finalizado!')}
            />
          )}
        </div>
      </div>
    </div>
  );
}