import { useState } from 'react';
import { Search } from 'lucide-react';

interface CepInputProps {
  onCalculateShipping: (cep: string) => void;
  isLoading?: boolean;
}

export function CepInput({ onCalculateShipping, isLoading = false }: CepInputProps) {
  const [cep, setCep] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cep.length === 8) {
      onCalculateShipping(cep);
    }
  };

  const handleCepChange = (value: string) => {
    // Aceita apenas números
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length <= 8) {
      setCep(numericValue);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={cep}
        onChange={(e) => handleCepChange(e.target.value)}
        placeholder="Digite seu CEP"
        className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        maxLength={8}
      />
      <button
        type="submit"
        disabled={cep.length !== 8 || isLoading}
        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400"
      >
        {isLoading ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <Search className="h-5 w-5" />
        )}
      </button>
    </form>
  );
}