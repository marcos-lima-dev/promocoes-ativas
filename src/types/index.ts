export interface Product {
    id: number;
    name: string;
    originalPrice: number;
    promoPrice: number;
    promoType: string;
    stock: number;
  }
  
  export interface Promotion {
    id: number;
    name: string;
    discount?: string;
    conditions?: string;
    validity: string;
  }

  export interface Coupon {
    code: string;
    discount: number; // percentual de desconto
    minValue?: number; // valor mínimo para aplicar o cupom
    validUntil: Date;
  }

  export interface ShippingInfo {
    cep: string;
    price: number;
    deliveryTime: number;
    type: 'PAC' | 'SEDEX';
  }

  export interface ShippingInfo {
    cep: string;
    price: number;
    deliveryTime: number;
    type: 'PAC' | 'SEDEX';
  }