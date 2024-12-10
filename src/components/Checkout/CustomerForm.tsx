// src/components/Checkout/CustomerForm.tsx
interface CustomerFormProps {
    onNext: () => void;
  }
  
  export function CustomerForm({ onNext }: CustomerFormProps) {
    return (
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }} 
        className="space-y-6"
      >
        {/* Dados Pessoais */}
        <div className="space-y-4">
          <h3 className="font-semibold">Dados Pessoais</h3>
          <input
            type="text"
            placeholder="Nome completo"
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="CPF"
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
            <input
              type="tel"
              placeholder="Telefone"
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
        </div>
  
        {/* Endereço */}
        <div className="space-y-4">
          <h3 className="font-semibold">Endereço de Entrega</h3>
          
          <input
            type="text"
            placeholder="CEP"
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Rua"
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
  
            <input
              type="text"
              placeholder="Número"
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
  
            <input
              type="text"
              placeholder="Complemento (opcional)"
              className="w-full px-3 py-2 border rounded-lg"
            />
  
            <input
              type="text"
              placeholder="Bairro"
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
  
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <input
                  type="text"
                  placeholder="Cidade"
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="UF"
                maxLength={2}
                className="w-full px-3 py-2 border rounded-lg uppercase"
                required
              />
            </div>
          </div>
        </div>
  
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
        >
          Continuar para Pagamento
        </button>
      </form>
    );
  }