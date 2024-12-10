// src/utils/price.ts
// Funções auxiliares para cálculos
export const calculateDiscount = (price: number, discountPercentage: number): number => {
    return price * (discountPercentage / 100);
  };
  
  export const formatPrice = (price: number): string => {
    return price.toFixed(2);
  };