// src/components/Checkout/PaymentForm.tsx
interface PaymentFormProps {
    onNext: () => void;
    onBack: () => void;
  }
  
  export function PaymentForm({ onNext, onBack }: PaymentFormProps) {
    return (
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }} 
        className="space-y-6"
      >
        <div className="space-y-4">
          <h3 className="font-semibold">Método de Pagamento</h3>
          
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="payment"
                value="credit"
                defaultChecked
                className="mr-2"
              />
              Cartão de Crédito
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="payment"
                value="pix"
                className="mr-2"
              />
              PIX
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="payment"
                value="boleto"
                className="mr-2"
              />
              Boleto
            </label>
          </div>
        </div>
  
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
          >
            Voltar
          </button>
          <button
            type="submit"
            className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
          >
            Revisar Pedido
          </button>
        </div>
      </form>
    );
  }