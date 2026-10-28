# Inova Estúdio Store

Loja oficial da **Inova Estúdio** - Estrutura profissional para tráfego pago & marketing digital.

## 🚀 Como Executar

O servidor foi construído em **Node.js** com zero dependências externas obrigatórias.

### Pré-requisitos
- Node.js instalado (v16+)

### Inicialização
```bash
# Iniciar o servidor
npm start

# Ou no modo observador (watch) para desenvolvimento
npm run dev
```

O site estará disponível imediatamente em:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 📁 Estrutura do Projeto

```
.
├── data/
│   ├── categories.json        # Categorias de produtos da loja
│   └── products.json          # Catálogo completo com preços e recursos
├── public/
│   ├── assets/                # Bundles JS (Router, ProductPage, TaxCalculator, Tools) e CSS
│   ├── fonts/                 # Fontes originais (Manrope Latin Variable)
│   ├── images/                # Banners neon, cards otimizados e ícones
│   └── index.html             # Shell principal da SPA
├── server.js                  # Servidor HTTP com rotas de API e fallback SPA
├── package.json
└── README.md
```

---

## ✨ Funcionalidades Incluídas

- **Catálogo Completo**: 23 produtos organizados por categorias (Meta Ads, Combo BMs, TikTok Ads, Google Ads e Proxies).
- **Páginas de Categorias**:
  - `/categoria/meta-ads`
  - `/categoria/meta-packages`
  - `/categoria/tiktok-ads`
  - `/categoria/google-ads`
  - `/categoria/proxy`
- **Páginas Individuais de Produtos**:
  - Exemplo: `/produto/perfil-bm-pagina` com especificações, garantia, selos e botão de compra direta via WhatsApp.
- **Calculadora de Economia**:
  - `/calculadora` - Simulador de economia tributária e de taxas para contas de anúncios.
- **Ferramentas**:
  - `/ferramentas` e `/ferramentas/gerador-2fa` - Gerador de códigos de autenticação TOTP de 6 dígitos.
- **Floating WhatsApp Button & FAQ**:
  - Botão flutuante de atendimento e seção interativa de dúvidas frequentes.
- **API Mock Embutida**:
  - `/api/products`
  - `/api/categories`
  - `/api/products/slug/:slug`
  - `/api/tracking/event`
  - `/api/presence/*`

---

## 🛠️ Personalização

- **Alterar Produtos e Preços**: Edite o arquivo [`data/products.json`](file:///c:/Users/dedeu/Documents/antigravity/resilient-lavoisier/data/products.json).
- **Alterar Categorias**: Edite o arquivo [`data/categories.json`](file:///c:/Users/dedeu/Documents/antigravity/resilient-lavoisier/data/categories.json).
- **Alterar Número de WhatsApp e Contato**: Substitua o número `5581996176288` nos arquivos da pasta `public/assets/` ou em `public/index.html`.
