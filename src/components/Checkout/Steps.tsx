// src/components/Checkout/Steps.tsx
interface StepsProps {
    currentStep: 'customer' | 'payment' | 'review';
  }
  
  export function Steps({ currentStep }: StepsProps): JSX.Element {
    return (
      <div className="py-4">
        <div className="flex justify-center items-center">
          {/* Cliente */}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep === 'customer' ? 'bg-purple-600 text-white' : 'bg-gray-200'
          }`}>1</div>
          
          {/* Linha */}
          <div className="w-16 h-1 bg-gray-200">
            <div className={`h-full ${
              currentStep !== 'customer' ? 'bg-purple-600' : ''
            }`} />
          </div>
          
          {/* Pagamento */}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep === 'payment' ? 'bg-purple-600 text-white' : 'bg-gray-200'
          }`}>2</div>
          
          {/* Linha */}
          <div className="w-16 h-1 bg-gray-200">
            <div className={`h-full ${
              currentStep === 'review' ? 'bg-purple-600' : ''
            }`} />
          </div>
          
          {/* Revisão */}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep === 'review' ? 'bg-purple-600 text-white' : 'bg-gray-200'
          }`}>3</div>
        </div>
        
        {/* Labels */}
        <div className="flex justify-center mt-2 text-sm">
          <div className="w-24 text-center">Dados</div>
          <div className="w-24 text-center">Pagamento</div>
          <div className="w-24 text-center">Revisão</div>
        </div>
      </div>
    );
  }