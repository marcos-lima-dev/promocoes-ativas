# Sistema de Promoções e Checkout

Um sistema moderno de e-commerce focado em promoções, desenvolvido com React e TypeScript, oferecendo uma experiência fluida de compra.

## 🛠️ Tecnologias Utilizadas

- React 18.3
- TypeScript
- Tailwind CSS
- Vite
- Lucide React (ícones)

## ✨ Funcionalidades

### Catálogo de Produtos
- Exibição de produtos com preços originais e promocionais
- Badges indicativas de promoções ativas
- Sistema de estoque integrado

### Carrinho de Compras
- Adição/remoção de produtos
- Cálculo automático de subtotal
- Sistema de cupons de desconto
- Cálculo de frete com base no CEP
- Frete grátis para compras acima de R$ 299

### Checkout em 3 Etapas
1. **Dados Pessoais**
   - Formulário de informações do cliente
   - Endereço de entrega
   - Validação de campos

2. **Pagamento**
   - Múltiplas formas de pagamento
   - Cartão de crédito com parcelamento
   - PIX
   - Boleto

3. **Revisão**
   - Resumo do pedido
   - Valores e descontos
   - Confirmação da compra

## 🚀 Como Executar

```bash
# Clone o repositório
git clone https://github.com/marcos-lima-dev/promocoes-ativas.git

# Entre na pasta do projeto
cd promocoes-ativas

# Instale as dependências
npm install

# Execute o projeto
npm run dev
