// src/components/Checkout/NavigationButtons.tsx
interface NavigationButtonsProps {
    onBack?: () => void;
    onNext?: () => void;
    nextLabel?: string;
    showBack?: boolean;
  }
  
  export function NavigationButtons({ 
    onBack, 
    onNext, 
    nextLabel = "Continuar", 
    showBack = true 
  }: NavigationButtonsProps) {
    return (
      <div className="flex gap-4 mt-6">
        {showBack && onBack && (
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
          >
            Voltar
          </button>
        )}
        {onNext && (
          <button
            type="button"
            onClick={onNext}
            className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
          >
            {nextLabel}
          </button>
        )}
      </div>
    );
  }