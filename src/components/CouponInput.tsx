// src/components/CouponInput.tsx
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';  

interface CouponInputProps {
  onApplyCoupon: (code: string) => void;
  isValid?: boolean;
  errorMessage?: string;
}

export function CouponInput({ onApplyCoupon, isValid, errorMessage }: CouponInputProps) {
  const [couponCode, setCouponCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyCoupon(couponCode.toUpperCase());
  };

  return (
    <div className="space-y-2">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
          placeholder="Digite o código (ex: JEANS20)"
          className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 
            ${isValid ? 'border-green-500' : errorMessage ? 'border-red-500' : 'border-gray-300'}`}
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded-lg transition-colors
            ${isValid 
              ? 'bg-green-500 hover:bg-green-600' 
              : 'bg-purple-600 hover:bg-purple-700'} 
            text-white`}
        >
          {isValid ? 'Aplicado' : 'Aplicar'}
        </button>
      </form>
      {errorMessage && (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      )}
      {isValid && (
        <p className="text-green-500 text-sm flex items-center gap-1">
          <CheckCircle className="w-4 h-4" /> 
          Cupom aplicado com sucesso!
        </p>
      )}
    </div>
   
  );
}