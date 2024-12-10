// src/types/checkout.ts
import { z } from "zod";

export const customerFormSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  cpf: z.string().min(11, "CPF inválido").max(14),
  phone: z.string().min(10, "Telefone inválido").max(15),
  address: z.object({
    cep: z.string().min(8, "CEP inválido").max(9),
    street: z.string().min(3, "Endereço inválido"),
    number: z.string().min(1, "Número inválido"),
    complement: z.string().optional(),
    neighborhood: z.string().min(2, "Bairro inválido"),
    city: z.string().min(2, "Cidade inválida"),
    state: z.string().length(2, "Estado inválido")
  })
});

export type CustomerFormData = z.infer<typeof customerFormSchema>;