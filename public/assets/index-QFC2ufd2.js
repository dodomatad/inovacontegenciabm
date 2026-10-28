(function () {
  let e = document.createElement(`link`).relList;
  if (e && e.supports && e.supports(`modulepreload`)) return;
  for (let e of document.querySelectorAll(`link[rel="modulepreload"]`)) n(e);
  new MutationObserver((e) => {
    for (let t of e)
      if (t.type === `childList`)
        for (let e of t.addedNodes)
          e.tagName === `LINK` && e.rel === `modulepreload` && n(e);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(e) {
    let t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === `use-credentials`
        ? (t.credentials = `include`)
        : e.crossOrigin === `anonymous`
          ? (t.credentials = `omit`)
          : (t.credentials = `same-origin`),
      t
    );
  }
  function n(e) {
    if (e.ep) return;
    e.ep = !0;
    let n = t(e);
    fetch(e.href, n);
  }
})();
var e = `/api`,
  FALLBACK_RAW_PRODUCTS = [
    {
      id: 3,
      name: `BM BR VERIFICADA ILIMITADA`,
      slug: `bm-br-verificada-ilimitada`,
      shortDescription: `Business Manager verificada no Brasil (CNPJ) com limite de gastos ilimitado e alta maturidade para escalar sem bloqueios.`,
      fullDescription: null,
      categoryId: 1,
      price: 397,
      promoPrice: null,
      visible: !0,
      featured: !0,
      bestSeller: !0,
      image: `/images/bm-br-verificada.jpg`,
      gallery: [],
      features: [
        `Limite de gastos diário: Ilimitado`,
        `Empresa 100% Verificada no Brasil (CNPJ Ativo)`,
        `Alta maturidade e confiança algorítmica na Meta`,
        `Pronta para rodar campanhas de conversão e escala`,
        `Acesso de Administrador transferido imediatamente`,
        `Garantia de Reposição + Suporte 1:1 Inova Estúdio`,
      ],
      stock: `available`,
      ctaUrl: null,
      ctaType: `whatsapp`,
      tags: [],
      countryCode: `BR`,
      order: 1,
      softDeleted: !1,
      category: {
        id: 1,
        name: `Meta ADS`,
        slug: `meta-ads`,
        description: `Contas e BMs para Meta Ads (Facebook/Instagram)`,
        visible: !0,
        order: 1,
      },
    },
    {
      id: 8,
      name: `BM DISPARO COM 2.000 MENSAGENS / DIA (2K)`,
      slug: `bm-disparo-2k-msgs`,
      shortDescription: `Estrutura oficial Meta verificada e liberada para 2.000 conversas diárias iniciadas pela empresa na API Oficial do WhatsApp.`,
      fullDescription: null,
      categoryId: 1,
      price: 597,
      promoPrice: null,
      visible: !0,
      featured: !0,
      bestSeller: !0,
      image: `/images/bm-disparo-2000.jpg`,
      gallery: [],
      features: [
        `Limite liberado: 2.000 disparos/dia na API Oficial`,
        `Business Manager verificada e com alta reputação`,
        `Integra com Typebot, Evolution, Z-API, ManyChat e CRMs`,
        `Ideal para escala de X1, lançamentos e recuperação`,
        `Entrega imediata + Suporte técnico 1:1 no WhatsApp`,
      ],
      stock: `available`,
      ctaUrl: null,
      ctaType: `whatsapp`,
      tags: [],
      countryCode: `BR`,
      order: 2,
      softDeleted: !1,
      category: {
        id: 1,
        name: `Meta ADS`,
        slug: `meta-ads`,
        description: `Contas e BMs para Meta Ads (Facebook/Instagram)`,
        visible: !0,
        order: 1,
      },
    },
    {
      id: 7,
      name: `BM DISPARO COM 250 MENSAGENS / DIA`,
      slug: `bm-disparo-250-msgs`,
      shortDescription: `BM pronta para 250 conversas iniciadas pela empresa em período contínuo de 24h na API do WhatsApp. Excelente custo-benefício.`,
      fullDescription: null,
      categoryId: 1,
      price: 200,
      promoPrice: null,
      visible: !0,
      featured: !1,
      bestSeller: !1,
      image: `/images/bm-disparo-250.jpg`,
      gallery: [],
      features: [
        `Limite liberado: 250 disparos/dia na API WhatsApp`,
        `Estrutura ativa com excelente custo-benefício`,
        `Perfeita para validação de funis e aquecimento de números`,
        `Compatível com todas as ferramentas de automação`,
        `Entrega imediata + Suporte técnico 1:1 no WhatsApp`,
      ],
      stock: `available`,
      ctaUrl: null,
      ctaType: `whatsapp`,
      tags: [],
      countryCode: `BR`,
      order: 3,
      softDeleted: !1,
      category: {
        id: 1,
        name: `Meta ADS`,
        slug: `meta-ads`,
        description: `Contas e BMs para Meta Ads (Facebook/Instagram)`,
        visible: !0,
        order: 1,
      },
    },
  ],
  t = [],
  n = null;
function r(e) {
  let t = [];
  try {
    t =
      typeof e.features == `string` ? JSON.parse(e.features) : e.features || [];
  } catch {}
  return {
    ...e,
    dbId: e.id,
    id: e.slug,
    title: e.name,
    description: e.shortDescription,
    category: e.category?.slug || e.categoryId,
    hidden: e.visible === !1,
    isBestSeller: e.bestSeller,
    isFeatured: e.featured,
    outOfStock: [`out_of_stock`, `out-of-stock`].includes(e.stock),
    features: t,
  };
}
t = FALLBACK_RAW_PRODUCTS.map(r);
async function i() {
  if (t.length > 0) return t;
  if (n) return n;
  n = fetch(`${e}/products?visible=true&limit=100&sort=order`)
    .then((e) => {
      if (!e.ok) throw Error(`Falha ao carregar produtos`);
      return e.json();
    })
    .then((e) => {
      let mapped = Array.isArray(e?.data)
        ? e.data.map(r).filter((p) => !p.hidden)
        : [];
      t = mapped.length > 0 ? mapped : FALLBACK_RAW_PRODUCTS.map(r);
      return t;
    })
    .catch(() => {
      t = FALLBACK_RAW_PRODUCTS.map(r);
      return t;
    })
    .finally(() => {
      n = null;
    });
  return n;
}
function a() {
  ((t = []), (n = null));
}
function o(e, t) {
  return e
    ? typeof e.message == `string` && e.message.trim()
      ? e.message
      : typeof e.error == `string` && e.error.trim()
        ? e.error
        : typeof e.error?.message == `string` && e.error.message.trim()
          ? e.error.message
          : t
    : t;
}
async function s() {
  try {
    let t = await fetch(`${e}/categories`);
    if (!t.ok) throw Error(`Falha ao carregar categorias`);
    let n = await t.json();
    return Array.isArray(n.data) ? n.data : [];
  } catch (e) {
    return (console.error(`API Error (getCategories):`, e), []);
  }
}
async function c() {
  try {
    let n = await fetch(`${e}/products?limit=100&sort=order`);
    if (!n.ok) throw Error(`Falha ao carregar todos os produtos`);
    let i = (await n.json()).data.map(r);
    return ((t = i.filter((e) => e.visible)), i);
  } catch (e) {
    return (console.error(`API Error (getAllProductsWithConfig):`, e), []);
  }
}
async function l(t, n) {
  try {
    let r = await fetch(`${e}/products/slug/${t}`).then((e) => e.json());
    if (!r.success) return !1;
    let i = await fetch(`${e}/products/${r.data.id}`, {
      method: `PUT`,
      headers: { "Content-Type": `application/json` },
      body: JSON.stringify({ price: parseFloat(n) }),
    });
    return (i.ok && a(), i.ok);
  } catch (e) {
    return (console.error(`API Error (setPriceOverride):`, e), !1);
  }
}
async function u(t, n) {
  try {
    let r = await fetch(`${e}/products/slug/${t}`).then((e) => e.json());
    if (!r.success) return !1;
    let i = await fetch(`${e}/products/${r.data.id}`, {
      method: `PUT`,
      headers: { "Content-Type": `application/json` },
      body: JSON.stringify({ name: n }),
    });
    return (i.ok && a(), i.ok);
  } catch (e) {
    return (console.error(`API Error (setProductName):`, e), !1);
  }
}
async function ee(t, n) {
  try {
    let r = await fetch(`${e}/products/slug/${t}`).then((e) => e.json());
    if (!r.success) return !1;
    let i = Array.isArray(n) ? n.map((e) => `${e}`.trim()).filter(Boolean) : [],
      o = await fetch(`${e}/products/${r.data.id}`, {
        method: `PUT`,
        headers: { "Content-Type": `application/json` },
        body: JSON.stringify({ features: i }),
      });
    return (o.ok && a(), o.ok);
  } catch (e) {
    return (console.error(`API Error (setProductFeatures):`, e), !1);
  }
}
async function te(t) {
  try {
    let n = await fetch(`${e}/products`, {
        method: `POST`,
        headers: { "Content-Type": `application/json` },
        body: JSON.stringify(t),
      }),
      i = await n.json().catch(() => null);
    return n.ok
      ? (a(), { ok: !0, data: i?.data ? r(i.data) : null })
      : { ok: !1, error: o(i, `Nao foi possivel criar o produto.`) };
  } catch (e) {
    return (
      console.error(`API Error (createProduct):`, e),
      { ok: !1, error: `Erro ao conectar com a API.` }
    );
  }
}
async function ne(t) {
  try {
    let n = await fetch(`${e}/affiliates`, {
        method: `POST`,
        headers: { "Content-Type": `application/json` },
        body: JSON.stringify(t),
      }),
      r = await n.json().catch(() => null);
    return n.ok
      ? { ok: !0, data: r?.data || null, alreadyExists: !1 }
      : n.status === 409
        ? { ok: !0, data: null, alreadyExists: !0 }
        : { ok: !1, error: o(r, `Nao foi possivel salvar o afiliado.`) };
  } catch (e) {
    return (
      console.error(`API Error (createAffiliate):`, e),
      { ok: !1, error: `Erro ao conectar com a API.` }
    );
  }
}
async function re() {
  try {
    let t = await fetch(`${e}/affiliates?limit=200&sort=-createdAt`, {
      cache: `no-store`,
    });
    if (!t.ok) throw Error(`Falha ao carregar afiliados`);
    let n = await t.json();
    return Array.isArray(n.data) ? n.data : [];
  } catch (e) {
    return (console.error(`API Error (getAffiliates):`, e), []);
  }
}
async function ie(t) {
  try {
    let n = Number.parseInt(t, 10);
    if (!Number.isInteger(n) || `${n}` != `${t}`) {
      let r = await fetch(`${e}/products/slug/${t}`).then((e) => e.json());
      if (!r.success) return { ok: !1, error: o(r, `Produto nao encontrado.`) };
      n = r.data.id;
    }
    let r = await fetch(`${e}/products/${n}`, { method: `DELETE` }),
      i = await r.json().catch(() => null);
    return r.ok
      ? (a(), { ok: !0 })
      : { ok: !1, error: o(i, `Nao foi possivel excluir o produto.`) };
  } catch (e) {
    return (
      console.error(`API Error (deleteProduct):`, e),
      { ok: !1, error: `Erro ao conectar com a API.` }
    );
  }
}
async function ae(t, n) {
  try {
    let i = await fetch(`${e}/products/reorder`, {
        method: `PUT`,
        headers: { "Content-Type": `application/json` },
        body: JSON.stringify({ categoryId: t, orderedProductIds: n }),
      }),
      s = await i.json().catch(() => null);
    return i.ok
      ? (a(), { ok: !0, data: Array.isArray(s?.data) ? s.data.map(r) : [] })
      : {
          ok: !1,
          error: o(s, `Nao foi possivel salvar a ordem dos produtos.`),
        };
  } catch (e) {
    return (
      console.error(`API Error (reorderProducts):`, e),
      { ok: !1, error: `Erro ao conectar com a API.` }
    );
  }
}
async function oe() {
  return (console.warn(`resetPriceOverrides não é mais suportado.`), !0);
}
async function se(
  t,
  {
    hidden: n,
    isBestSeller: r,
    isFeatured: i,
    outOfStock: o,
    countryCode: s,
  } = {},
) {
  try {
    let c = await fetch(`${e}/products/slug/${t}`).then((e) => e.json());
    if (!c.success) return !1;
    let l = {};
    (n !== void 0 && (l.visible = !n),
      r !== void 0 && (l.bestSeller = r),
      i !== void 0 && (l.featured = i),
      o !== void 0 && (l.stock = o ? `out_of_stock` : `available`),
      s !== void 0 && (l.countryCode = s));
    let u = await fetch(`${e}/products/${c.data.id}`, {
      method: `PUT`,
      headers: { "Content-Type": `application/json` },
      body: JSON.stringify(l),
    });
    return (u.ok && a(), u.ok);
  } catch (e) {
    return (console.error(`API Error (setProductConfig):`, e), !1);
  }
}
function d() {
  let e = window.location.pathname,
    t = e === `/`,
    n = t && window.location.hash === `#duvidas-frequentes`,
    r = e.startsWith(`/categoria/`) || e.startsWith(`/produto/`),
    i = e.startsWith(`/calculadora`),
    a = e.startsWith(`/ferramentas`);
  return `
    <header class="adsflowz-topbar">
      <div class="container nav-container">
        <a href="/" onclick="return window.router && window.router.handleLinkClick(event, '/')" class="logo" aria-label="Inova Estúdio">
          <img src="/images/inova-logo.png" alt="Inova Estúdio" class="logo-image" width="40" height="40" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; display: block;">
        </a>

        <button
          type="button"
          class="nav-toggle"
          aria-expanded="false"
          aria-controls="primary-navigation"
          aria-label="Abrir menu"
          onclick="return window.adsflowzToggleNav && window.adsflowzToggleNav(event)"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>

        <nav id="primary-navigation" class="links nav-links" aria-label="Navegação principal">
          ${[
            { href: `/`, label: `Início`, active: t && !n, icon: `🏠` },
            {
              href: `/#product-categories`,
              label: `Catálogo de BMs`,
              active: r,
              icon: `⚡`,
              action: `return window.router && window.router.handleProductsClick(event)`,
            },
            {
              href: `/#disparos`,
              label: `Disparos WhatsApp`,
              active: !1,
              icon: `🚀`,
              action: `if(window.inovaScrollTo) return window.inovaScrollTo(event, 'disparos');`,
            },
            {
              href: `/#depoimentos`,
              label: `Avaliações`,
              active: !1,
              icon: `⭐`,
              action: `if(window.inovaScrollTo) return window.inovaScrollTo(event, 'depoimentos');`,
            },
            {
              href: `/#duvidas-frequentes`,
              label: `Dúvidas`,
              active: n,
              icon: `❓`,
              action: `return window.router && window.router.handleFaqClick(event)`,
            },
          ]
            .map(
              ({ href: e, label: t, active: n = !1, action: r = null, icon: o = `` }) => `
    <a
      href="${e}"
      ${r ? `onclick="${r}"` : `onclick="return window.router && window.router.handleLinkClick(event, '${e}')"`}
      class="nav-link-item${n ? ` nav-link-item--active` : ``}"
      ${n ? `aria-current="page"` : ``}
    ><span class="nav-link-icon">${o}</span><span>${t}</span></a>
  `,
            )
            .join(``)}
          <a href="https://wa.me/5581996176288?text=Ol%C3%A1!%20Gostaria%20de%20comprar%20uma%20BM%20ou%20tirar%20d%C3%BAvidas%20com%20a%20Inova%20Est%C3%BAdio." target="_blank" rel="noopener noreferrer" class="btn btn-primary nav-cta">
            <svg viewBox="0 0 448 512" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
            <span>WhatsApp (81) 99617-6288</span>
          </a>
        </nav>
      </div>
    </header>
  `;
}
function ce() {
  return `
    <header class="storefront-hero storefront-hero--light">
      <div class="storefront-hero__content">
        <h1 class="storefront-hero__title">BMs Facebook &amp; API WhatsApp Prontas para <span class="text-gradient">Escalar Sem Bloqueios</span></h1>
        <p class="hero-copy">Receba seu acesso em minutos com garantia de reposição.</p>
        <ul class="hero-trust" aria-label="Vantagens da loja">
          <li class="hero-chip"><span class="hero-chip__icon">✓</span> +1.200 BMs Entregues</li>
          <li class="hero-chip"><span class="hero-chip__icon">🛡️</span> Garantia de Reposição</li>
          <li class="hero-chip"><span class="hero-chip__icon">⚡</span> Suporte ao Cliente</li>
        </ul>
      </div>
    </header>
  `;
}
function f(e) {
  return typeof e == `string`
    ? e
        .replace(/&/g, `&amp;`)
        .replace(/</g, `&lt;`)
        .replace(/>/g, `&gt;`)
        .replace(/"/g, `&quot;`)
        .replace(/'/g, `&#39;`)
    : e;
}
function p(e) {
  return !e ||
    typeof e != `string` ||
    e.startsWith(`http`) ||
    e.startsWith(`data:`) ||
    e.includes(`?v=`)
    ? e
    : `${e}?v=muzuz48l`;
}
var m = [
  {
    slug: `meta-ads`,
    label: `BMs Facebook & Meta Ads`,
    shortLabel: `BMs Meta Ads`,
    icon: `/images/inova-badge-bm.png`,
    gradient: `var(--gradient-card-meta)`,
    seoTitle: `BMs Facebook Verificadas e Disparos | Inova Estúdio`,
    seoDescription: `Compre BMs verificadas ilimitadas e BMs de 2k e 250 disparos para Facebook Ads com entrega imediata e suporte da Inova Estúdio.`,
    introTitle: `BMs Facebook Verificadas & Disparos WhatsApp`,
    introCopy: `Business Managers verificadas com limite ilimitado e BMs de alta performance para 2.000 e 250 disparos na API WhatsApp. Estrutura pronta e blindada para sua operação.`,
  },
];
function h(e) {
  return m.find((t) => t.slug === e) || null;
}
function g(e) {
  return `/categoria/${e}`;
}
function _(e) {
  return h(e)?.label || e || `Categoria`;
}
function v(e) {
  return !!h(e);
}
function y(e, t = !1) {
  let n = `/images/bm-br-verificada.jpg`,
    r = `/images/bm-br-verificada.jpg`;
  if (e.id === 8 || e.slug === `bm-disparo-2k-msgs` || e.id === `bm-disparo-2k-msgs`) {
    n = `/images/bm-disparo-2000.jpg`;
    r = `/images/bm-disparo-2000.jpg`;
  } else if (e.id === 7 || e.slug === `bm-disparo-250-msgs` || e.id === `bm-disparo-250-msgs`) {
    n = `/images/bm-disparo-250.jpg`;
    r = `/images/bm-disparo-250.jpg`;
  } else if (e.category === `tiktok-ads`) {
    n = `/images/card-header-tiktok-optimized.jpg`;
    r = `/images/card-header-tiktok-mobile.jpg`;
  } else if (e.category === `meta-packages`) {
    n = `/images/card-header-meta-packages.jpg`;
    r = `/images/card-header-meta-packages.jpg`;
  } else if (e.category === `meta-ads`) {
    n = `/images/bm-br-verificada.jpg`;
    r = `/images/bm-br-verificada.jpg`;
  } else if (e.category === `google-ads`) {
    n = `/images/google-ads-banner-optimized.jpg`;
    r = `/images/google-ads-banner-mobile.jpg`;
  }
  let isBm = (e.title && e.title.toUpperCase().includes('BM')) || (e.name && e.name.toUpperCase().includes('BM'));
  let toggleBtnText = isBm ? 'Mais informações sobre a BM' : 'Mais informações do produto';
  let s = `article`,
    c = e.outOfStock
      ? `aria-disabled="true"`
      : `data-href="/produto/${e.id}" onclick="if(!event.target.closest('.product-card__buy-direct') && !event.target.closest('.product-card__toggle-info') && !event.target.closest('.product-card__collapsible-info') && !event.target.closest('a') && window.router) window.router.handleLinkClick(event, '/produto/${e.id}')"`;
  let zapBuyUrl = `https://wa.me/5581996176288?text=${encodeURIComponent(`Olá! Quero comprar agora: ${e.title} (R$ ${e.price.toFixed(2).replace('.', ',')})` + (typeof k === 'function' ? k() : ''))}`;
  let topBadge = e.isBestSeller
    ? `<span class="badge badge-accent product-card__badge">🔥 MAIS VENDIDA</span>`
    : e.isFeatured
      ? `<span class="badge badge-featured product-card__badge">★ DESTAQUE</span>`
      : `<span class="badge badge-featured product-card__badge">✓ VERIFICADA</span>`;
  return `
    <${s} class="card product-card animate-fade-in${e.isFeatured ? ` product-card--featured` : ``}${e.isBestSeller ? ` product-card--best-seller` : ``}"
         ${c}
    >
      <div class="product-card__media">
         <a href="/produto/${e.id}" onclick="return window.router && window.router.handleLinkClick(event, '/produto/${e.id}')" class="product-card__media-link" aria-label="Ver detalhes de ${f(e.title)}">
           <img src="${p(n)}" alt="${f(e.title)}" width="960" height="540" loading="eager" fetchpriority="high">
         </a>
      </div>

      <div class="product-card__body">
        <div class="product-card__meta-top">
          <span class="product-card__origin"><img src="/br-flag.svg" alt="Brasil" width="16" height="11"> Estrutura Oficial Meta</span>
          <span class="product-card__guarantee-tag">🛡️ Garantia Inclusa</span>
        </div>

        <h3 class="font-bold product-card__title">
          <a href="/produto/${e.id}" onclick="return window.router && window.router.handleLinkClick(event, '/produto/${e.id}')" class="product-card__title-link">
            ${f(e.title)}
          </a>
        </h3>

        <button type="button" class="product-card__toggle-info" aria-expanded="false" onclick="event.stopPropagation(); window.toggleProductCardInfo(this)" data-bm="${isBm ? 'true' : 'false'}">
          <span class="toggle-text">${toggleBtnText}</span>
          <svg class="toggle-chevron" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>

        <div class="product-card__collapsible-info">
          ${e.description ? `<p class="product-card__desc">${f(e.description)}</p>` : ``}

          <ul class="product-card__benefits" aria-label="Principais benefícios">
            ${(Array.isArray(e.features) && e.features.length ? e.features : [`Entrega imediata`, `Garantia de reposição`])
              .slice(0, 4)
              .map(
                (b) => `
              <li class="product-card__benefit-item">
                <span class="product-card__benefit-check" aria-hidden="true">✓</span>
                <span class="product-card__benefit-text">${f(b)}</span>
              </li>
            `,
              )
              .join(``)}
          </ul>
        </div>

        <div class="product-card__price-box">
          <div>
            <span class="product-card__price-label">VALOR À VISTA</span>
            <div class="font-bold product-card__price">
              R$ ${e.price.toFixed(2).replace(`.`, `,`)}
            </div>
            <div class="product-card__no-warranty">Sem garantia 30% de desconto</div>
          </div>
          <span class="product-card__pix-badge">⚡ PIX ou Cartão</span>
        </div>

        <div class="product-card__actions">
          <a href="${zapBuyUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-buy product-card__buy product-card__buy-direct" onclick="event.stopPropagation(); if(window.trackZapProduct) window.trackZapProduct(${e.dbId || 0});" aria-label="Comprar ${f(e.title)} agora no WhatsApp">
            <svg viewBox="0 0 448 512" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
            <span>Comprar pelo WhatsApp</span>
          </a>
          <a href="/produto/${e.id}" onclick="event.stopPropagation(); return window.router && window.router.handleLinkClick(event, '/produto/${e.id}')" class="product-card__details-btn">
            <span>Ver detalhes da estrutura</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </${s}>
  `;
}
function b(e = 6) {
  return `
    <div class="grid-responsive product-skeleton-grid" aria-busy="true" aria-label="Carregando produtos">
      ${Array.from(
        { length: e },
        () => `
        <article class="product-skeleton-card" aria-hidden="true">
          <div class="product-skeleton-card__image"></div>
          <div class="product-skeleton-card__body">
            <div class="product-skeleton-card__title"></div>
            <div class="product-skeleton-card__price"></div>
            <div class="product-skeleton-card__meta"></div>
            <div class="product-skeleton-card__button"></div>
          </div>
        </article>
      `,
      ).join(``)}
    </div>
  `;
}
function le() {
  let e = window.matchMedia(
      `(min-width: 1024px) and (hover: hover) and (pointer: fine)`,
    ),
    t = document.createElement(`aside`);
  ((t.className = `product-hover-preview`),
    t.setAttribute(`aria-hidden`, `true`),
    (t.innerHTML = `
    <span class="product-hover-preview__scan" aria-hidden="true"></span>
    <span class="product-hover-preview__corner product-hover-preview__corner--tl" aria-hidden="true"></span>
    <span class="product-hover-preview__corner product-hover-preview__corner--br" aria-hidden="true"></span>
    <div class="product-hover-preview__content"></div>
  `),
    document.body.append(t));
  let n = null,
    r = null,
    i = null,
    a = () => {
      (window.clearTimeout(r),
        window.cancelAnimationFrame(i),
        t.classList.remove(`is-visible`),
        n?.classList.remove(`is-preview-active`),
        (n = null),
        (r = window.setTimeout(() => {
          t.style.visibility = `hidden`;
        }, 120)));
    },
    o = (a) => {
      if (!a || !e.matches || a === n) return;
      let o = a.querySelector(`.product-card-preview-template`);
      if (!o) return;
      (window.clearTimeout(r),
        window.cancelAnimationFrame(i),
        n?.classList.remove(`is-preview-active`),
        (n = a),
        a.classList.add(`is-preview-active`),
        t.classList.remove(
          `is-visible`,
          `is-left`,
          `is-right`,
          `opens-left`,
          `opens-right`,
        ),
        (t.querySelector(`.product-hover-preview__content`).innerHTML =
          o.innerHTML),
        (t.style.visibility = `hidden`));
      let s = a.getBoundingClientRect();
      if (document.body.dataset.surface === `public`) {
        (t.classList.add(`is-sidecar-preview`), (t.style.height = ``));
        let e = Math.min(300, s.width, window.innerWidth - s.width - 48),
          r = window.innerWidth - s.right - 14 - 16,
          o = s.left - 14 - 16,
          c = r >= e || r >= o;
        ((t.style.width = `${e}px`),
          (t.style.left = `${Math.max(16, Math.min(window.innerWidth - e - 16, c ? s.right + 14 : s.left - e - 14))}px`),
          (t.style.top = `16px`));
        let l = t.offsetHeight;
        ((t.style.top = `${Math.max(16, Math.min(window.innerHeight - l - 16, s.top + 16))}px`),
          (t.style.visibility = `visible`),
          t.classList.add(c ? `opens-right` : `opens-left`),
          (i = window.requestAnimationFrame(() => {
            n === a && t.classList.add(`is-visible`);
          })));
        return;
      }
      (t.classList.remove(`is-sidecar-preview`), (t.style.height = ``));
      let c = Math.min(560, window.innerWidth - 48),
        l = window.innerWidth - s.right >= c + 22;
      ((t.style.width = `${c}px`),
        (t.style.left = `${Math.max(16, Math.min(window.innerWidth - c - 16, l ? s.right + 22 : s.left - c - 22))}px`),
        (t.style.top = `16px`));
      let u = t.offsetHeight;
      ((t.style.top = `${Math.max(16, Math.min(window.innerHeight - u - 16, s.top + (s.height - u) / 2))}px`),
        (t.style.visibility = `visible`),
        t.classList.add(l ? `is-right` : `is-left`),
        t.offsetWidth,
        (i = window.requestAnimationFrame(() => {
          n === a && t.classList.add(`is-visible`);
        })));
    };
  (document.addEventListener(`pointerover`, (e) => {
    let t = e.target.closest?.(`.grid-responsive .card`);
    t && !t.contains(e.relatedTarget) && o(t);
  }),
    document.addEventListener(`pointerout`, (e) => {
      let t = e.target.closest?.(`.grid-responsive .card`);
      t && !t.contains(e.relatedTarget) && a();
    }),
    document.addEventListener(`focusin`, (e) =>
      o(e.target.closest?.(`.grid-responsive .card`)),
    ),
    document.addEventListener(`focusout`, (e) => {
      let t = e.target.closest?.(`.grid-responsive .card`);
      t && !t.contains(e.relatedTarget) && a();
    }),
    window.addEventListener(`scroll`, a, { passive: !0 }),
    window.addEventListener(`resize`, a));
}
function x(e, t, n = 30) {
  let r = ``;
  if (n) {
    let e = new Date();
    (e.setTime(e.getTime() + n * 24 * 60 * 60 * 1e3),
      (r = `; expires=` + e.toUTCString()));
  }
  let i = window.location.protocol === `https:` ? `; Secure` : ``;
  document.cookie = e + `=` + (t || ``) + r + `; path=/; SameSite=Strict` + i;
}
function S(e) {
  let t = e + `=`,
    n = document.cookie.split(`;`);
  for (let e = 0; e < n.length; e++) {
    let r = n[e];
    for (; r.charAt(0) === ` `;) r = r.substring(1, r.length);
    if (r.indexOf(t) === 0) return r.substring(t.length, r.length);
  }
  return null;
}
function C() {
  sessionStorage.setItem(`adminSession`, `1`);
}
function ue() {
  sessionStorage.removeItem(`adminSession`);
}
function w() {
  return sessionStorage.getItem(`adminSession`) === `1`;
}
async function de(e = fetch) {
  if (w()) return !0;
  try {
    return (await e(`/api/auth/me`, { cache: `no-store` })).ok ? (C(), !0) : !1;
  } catch {
    return !1;
  }
}
var T = `affiliate_name`;
function E(e) {
  return `${e || ``}`.trim().replace(/\s+/g, ` `).slice(0, 100) || null;
}
function fe() {
  let e = sessionStorage.getItem(T) || S(T);
  if (!e) return null;
  try {
    return E(decodeURIComponent(e));
  } catch {
    return E(e);
  }
}
function D(e) {
  return (
    `${e || ``}`
      .trim()
      .toLowerCase()
      .normalize(`NFD`)
      .replace(/[\u0300-\u036f]/g, ``)
      .replace(/\s+/g, `_`)
      .replace(/[^a-z0-9_-]/g, ``)
      .slice(0, 50) || null
  );
}
function pe(e, t = e) {
  let n = D(e);
  if (!n) return ``;
  let r = new URL(`/`, window.location.origin);
  return (
    r.searchParams.set(`ref`, n),
    r.searchParams.set(`affiliate`, E(t) || n),
    r.toString()
  );
}
function O() {
  let e = new URLSearchParams(window.location.search),
    t = D(e.get(`ref`));
  if (t) {
    let n = E(e.get(`affiliate`)) || t.replace(/[_-]+/g, ` `);
    return (
      sessionStorage.setItem(`affiliate_ref`, t),
      sessionStorage.setItem(T, n),
      x(`affiliate_ref`, t, 30),
      x(T, encodeURIComponent(n), 30),
      t
    );
  }
  return D(sessionStorage.getItem(`affiliate_ref`) || S(`affiliate_ref`));
}
function k() {
  let e = O();
  return e
    ? `\n\nAfiliado que me recomendou: ${fe() || e.replace(/[_-]+/g, ` `)}`
    : ``;
}
function A() {
  return `
    <a
      href="${`https://wa.me/5581996176288?text=${encodeURIComponent(`Olá! Gostaria de tirar dúvidas sobre as BMs de Facebook da Inova Estúdio.${k()}`)}`}"
      target="_blank"
      rel="noopener noreferrer"
      onclick="if(window.trackZapFloat) window.trackZapFloat()"
      class="floating-whatsapp"
      aria-label="Falar com a Inova Estúdio pelo WhatsApp"
    >
      <svg viewBox="0 0 448 512" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
    </a>
  `;
}
function me() {
  return ``;
}
function he() {
  let e = [
    [`Lucas S.`, `Gestor de Tráfego`, `/images/testimonials/lucas.jpg`, `Acesso liberado em minutos no WhatsApp. Já investimos mais de R$ 20k na BM Verificada BR sem nenhum bloqueio.`, `BM BR Verificada Ilimitada`],
    [`Matheus B.`, `Agência de Lançamentos`, `/images/testimonials/matheus.jpg`, `A BM de 2.000 disparos rodou liso para mais de 10 mil leads no nosso lançamento. Suporte nota 10!`, `BM Disparo 2.000 Msgs/Dia`],
    [`Rodrigo M.`, `Infoprodutor`, `/images/testimonials/rodrigo.jpg`, `Comecei com a BM de 250 disparos para validar o funil no Typebot e em 10 minutos já estava rodando.`, `BM Disparo 250 Msgs/Dia`],
    [`Felipe A.`, `Operação de E-commerce`, `/images/testimonials/felipe.jpg`, `Comprei a BM Verificada e configurei os pixels sem estresse. Entrega imediata no WhatsApp conforme o combinado.`, `BM BR Verificada Ilimitada`],
    [`Gabriel C.`, `Drop & Afiliado`, `/images/testimonials/gabriel.jpg`, `Melhor suporte que já tive no mercado de contingência. Atendimento rápido e a BM veio 100% pronta para anunciar.`, `BM Disparo 2.000 Msgs/Dia`],
  ];
  return `
    <section id="disparos" class="disparos-section" aria-label="Estrutura de Disparos em Massa no WhatsApp">
      <div class="disparos-container">
        <div class="disparos-header">
          <div class="disparos-badge">
            <span class="disparos-badge__dot"></span>
            <span>API OFICIAL DO WHATSAPP • ESCALA MASSIVA</span>
          </div>
          <h2 class="disparos-title">
            Estrutura Oficial de <span class="text-gradient">Disparos em Massa</span> sem Bloqueios
          </h2>
          <p class="disparos-subtitle">
            Conecte seus funis de vendas, lançamentos e recuperação no WhatsApp com Business Managers verificadas e limites de <strong>250, 2.000 até 10.000+ mensagens/dia</strong> liberados na Meta.
          </p>
        </div>

        <div class="disparos-grid">
          <div class="disparos-card">
            <div class="disparos-card__icon">⚡</div>
            <div class="disparos-card__content">
              <h3>Alta Capacidade de Envio</h3>
              <p>Limites liberados pela Meta de 250 a milhares de mensagens diárias iniciadas pela empresa, prontas para tracionar grandes volumes de leads.</p>
            </div>
          </div>

          <div class="disparos-card">
            <div class="disparos-card__icon">🛡️</div>
            <div class="disparos-card__content">
              <h3>Zero Risco de Banimento</h3>
              <p>Opere 100% dentro das diretrizes oficiais do WhatsApp Cloud API. Elimine a perda de números e dores de cabeça com bloqueios comuns.</p>
            </div>
          </div>

          <div class="disparos-card">
            <div class="disparos-card__icon">🔌</div>
            <div class="disparos-card__content">
              <h3>Integração Plug &amp; Play</h3>
              <p>Compatível com Typebot, Evolution API, Z-API, Chatwoot, ManyChat, N8N, ActiveCampaign e qualquer CRM ou webhook.</p>
            </div>
          </div>

          <div class="disparos-card">
            <div class="disparos-card__icon">🚀</div>
            <div class="disparos-card__content">
              <h3>Suporte e Ativação Imediata</h3>
              <p>Entrega rápida da BM com acesso de Administrador e suporte técnico 1:1 no WhatsApp para ajudar você a colocar os disparos no ar.</p>
            </div>
          </div>
        </div>

        <div class="disparos-cta-box">
          <div class="disparos-cta-info">
            <span class="disparos-cta-pill">⚡ Disponibilidade Imediata</span>
            <h3>Pronto para escalar seus disparos no WhatsApp?</h3>
            <p>Fale diretamente com nosso especialista e garanta a BM com o limite ideal para a sua operação.</p>
          </div>
          <a href="https://wa.me/5581996176288?text=Ol%C3%A1!%20Gostaria%20de%20consultar%20a%20disponibilidade%20e%20pre%C3%A7os%20de%20BM%20para%20Disparos%20no%20WhatsApp." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp-disparos" aria-label="Solicitar estrutura de disparos no WhatsApp">
            <svg viewBox="0 0 448 512" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
            <span>Solicitar Estrutura de Disparos no WhatsApp</span>
          </a>
        </div>
      </div>
    </section>

              <section id="contas-sociais" class="social-accounts-section" aria-label="Contas de Facebook, Instagram e TikTok">
            <div class="social-accounts-grid">
              <!-- Card 1: Conta de Facebook -->
              <article class="social-account-card social-account-card--facebook">
                <div class="social-card-topbar"></div>
                <div class="social-card-icon-wrap">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M14 13.5h2.5l1-4H14v-2c0-1.03.2-1.5 1.5-1.5H17V2.5c-.8-.1-1.8-.2-3.1-.2C10.7 2.3 9 4 9 7.3V9.5H6.5v4H9V22h5v-8.5z"/>
                  </svg>
                </div>
                <h3 class="social-card-title">Conta de Facebook</h3>
                <ul class="social-card-list">
                  <li>
                    <svg class="social-card-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                    <span>Perfis antigos e aquecidos</span>
                  </li>
                  <li>
                    <svg class="social-card-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                    <span>2FA ativo e documentação validada</span>
                  </li>
                  <li>
                    <svg class="social-card-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                    <span>Resistência a bloqueios</span>
                  </li>
                  <li>
                    <svg class="social-card-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                    <span>Acesso completo e seguro</span>
                  </li>
                  <li>
                    <svg class="social-card-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                    <span>Pronto para administrar páginas e BMs</span>
                  </li>
                </ul>
                <div class="social-card-footer">
                  <a href="https://wa.me/5581996176288?text=Ol%C3%A1!%20Gostaria%20de%20consultar%20o%20portf%C3%B3lio%20de%20Contas%20de%20Facebook." target="_blank" rel="noopener noreferrer" class="social-card-btn" aria-label="Consultar portfólio de Contas de Facebook no WhatsApp">Portfólio</a>
                </div>
              </article>

              <!-- Card 2: Conta de Instagram -->
              <article class="social-account-card social-account-card--instagram">
                <div class="social-card-topbar"></div>
                <div class="social-card-icon-wrap">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </div>
                <h3 class="social-card-title">Conta de Instagram</h3>
                <ul class="social-card-list">
                  <li>
                    <svg class="social-card-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                    <span>Contas antigas com engajamento</span>
                  </li>
                  <li>
                    <svg class="social-card-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                    <span>Perfis formatados e aquecidos</span>
                  </li>
                  <li>
                    <svg class="social-card-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                    <span>Seguidores reais e orgânicos</span>
                  </li>
                  <li>
                    <svg class="social-card-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                    <span>Pronto para anúncios e direct</span>
                  </li>
                  <li>
                    <svg class="social-card-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                    <span>Segurança e proteção antifraud</span>
                  </li>
                </ul>
                <div class="social-card-footer">
                  <a href="https://wa.me/5581996176288?text=Ol%C3%A1!%20Gostaria%20de%20consultar%20o%20portf%C3%B3lio%20de%20Contas%20de%20Instagram." target="_blank" rel="noopener noreferrer" class="social-card-btn" aria-label="Consultar portfólio de Contas de Instagram no WhatsApp">Portfólio</a>
                </div>
              </article>

              <!-- Card 3: Contas de Tiktok -->
              <article class="social-account-card social-account-card--tiktok">
                <div class="social-card-topbar"></div>
                <div class="social-card-icon-wrap">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M4 6a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3H4zm13.7 3.5a1 1 0 0 0-1.7.7v7.6a1 1 0 0 0 1.7.7l4.5-3.8a1 1 0 0 0 0-1.4l-4.5-3.8z"/>
                  </svg>
                </div>
                <h3 class="social-card-title">Contas de Tiktok</h3>
                <ul class="social-card-list">
                  <li>
                    <svg class="social-card-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                    <span>Contas TikTok Ads e orgânicas</span>
                  </li>
                  <li>
                    <svg class="social-card-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                    <span>Configuradas para alcance viral</span>
                  </li>
                  <li>
                    <svg class="social-card-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                    <span>Prontas para campanhas de conversão</span>
                  </li>
                  <li>
                    <svg class="social-card-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                    <span>Pixel configurado e testado</span>
                  </li>
                  <li>
                    <svg class="social-card-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                    <span>Sem travamentos de verificação</span>
                  </li>
                </ul>
                <div class="social-card-footer">
                  <a href="https://wa.me/5581996176288?text=Ol%C3%A1!%20Gostaria%20de%20consultar%20o%20portf%C3%B3lio%20de%20Contas%20de%20TikTok." target="_blank" rel="noopener noreferrer" class="social-card-btn" aria-label="Consultar portfólio de Contas de TikTok no WhatsApp">Portfólio</a>
                </div>
              </article>
            </div>
          </section>

    <section class="how-it-works-section" aria-label="Como funciona a entrega">
      <div class="section-header" style="margin-bottom: 1.5rem;">
        <div>
          <p class="section-eyebrow">PROCESSO SIMPLES E SEGURO</p>
          <h2 class="section-title">
            <span class="section-indicator"></span>
            Receba sua estrutura em 3 passos
          </h2>
        </div>
      </div>
      <div class="steps-grid">
        <div class="step-card">
          <div class="step-card__badge">01</div>
          <h3>Escolha sua BM</h3>
          <p>Entre em contato e verifique a disponibilidade de quantidade de BM disparos na API Oficial do WhatsApp.</p>
        </div>
        <div class="step-card">
          <div class="step-card__badge">02</div>
          <h3>Chame no WhatsApp</h3>
          <p>Clique em Comprar para abrir uma conversa direta com nosso time comercial no número <strong>(81) 99617-6288</strong>.</p>
        </div>
        <div class="step-card">
          <div class="step-card__badge">03</div>
          <h3>Acesso em Minutos</h3>
          <p>Após a confirmação via PIX ou Cartão, você recebe o link de Administrador imediatamente com suporte 1:1.</p>
        </div>
      </div>
    </section>

    <section id="depoimentos" class="testimonials-section" style="margin-bottom: 4rem; scroll-margin-top: 90px;">
      <div class="section-header">
        <div>
          <p class="section-eyebrow">Avaliação</p>
          <h2 class="section-title">
             <span class="section-indicator"></span>
             Quem já comprou e escala com a Inova
          </h2>
        </div>
      </div>
      <div class="testimonials-wrap">
        <button type="button" class="carousel-arrow carousel-arrow-prev" aria-label="Avaliações anteriores" onclick="window.scrollTestimonials && window.scrollTestimonials(this, -1)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <div class="testimonials-carousel" id="testimonials-carousel">
          ${e
            .map(
              ([t, n, r, i, a], o) => `
            <article class="testimonial-card">
              <div class="testimonial-card__top">
                <span class="testimonial-stars" aria-label="5 de 5 estrelas">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                <span class="testimonial-verified">&#10003; Compra verificada</span>
              </div>
              <p class="testimonial-text">“${i}”</p>
              <div class="testimonial-footer">
                <div class="testimonial-header">
                  <div class="testimonial-avatar"><img src="${r}" alt="${t}" width="36" height="36" loading="lazy"></div>
                  <div class="testimonial-meta">
                    <div class="testimonial-name">${t}</div>
                    <div class="testimonial-role">${n}</div>
                  </div>
                </div>
                ${a ? `<span class="testimonial-product-tag">${a}</span>` : ``}
              </div>
            </article>
          `,
            )
            .join(``)}
        </div>
        <button type="button" class="carousel-arrow carousel-arrow-next" aria-label="Próximas avaliações" onclick="window.scrollTestimonials && window.scrollTestimonials(this, 1)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
      <div class="carousel-controls-bottom">
        <button type="button" class="carousel-bottom-btn carousel-bottom-prev" aria-label="Avaliação anterior" onclick="window.scrollTestimonials && window.scrollTestimonials(this, -1)">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          <span>Anterior</span>
        </button>
        <div class="carousel-dots" id="testimonial-dots" aria-label="Navegação dos depoimentos">
          ${e.map((_, idx) => `<button type="button" class="carousel-dot ${idx === 0 ? 'active' : ''}" aria-label="Depoimento ${idx + 1}" onclick="window.goToTestimonial && window.goToTestimonial(${idx})"></button>`).join('')}
        </div>
        <button type="button" class="carousel-bottom-btn carousel-bottom-next" aria-label="Próxima avaliação" onclick="window.scrollTestimonials && window.scrollTestimonials(this, 1)">
          <span>Próximo</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    </section>
  `;
}
function j() {
  return `
    <section id="duvidas-frequentes" style="margin-bottom: 4rem; scroll-margin-top: 90px;">
      <div class="section-header">
        <div>
          <p class="section-eyebrow">TIRE SUAS DÚVIDAS</p>
          <h2 class="section-title">
            <span class="section-indicator"></span>
            Dúvidas Frequentes
          </h2>
        </div>
      </div>
      <div style="max-width: 820px; margin: 0 auto; display: flex; flex-direction: column; gap: 0.6rem;">
        ${[
          {
            question: `Como recebo o acesso à minha BM após a compra?`,
            answer: `Assim que o pagamento (PIX ou Cartão) é confirmado no nosso WhatsApp oficial (81) 99617-6288, enviamos imediatamente os links de convite de Administrador e instruções passo a passo.`,
          },
          {
            question: `Como funciona a garantia de reposição?`,
            answer: `Todas as estruturas são testadas antes do envio. Caso a BM apresente qualquer restrição no acesso inicial antes de subir campanhas, realizamos a reposição imediata sem custo adicional.`,
          },
          {
            question: `As BMs de 250 e 2.000 disparos funcionam na API Oficial?`,
            answer: `Sim! São Business Managers verificadas com o limite de 250 ou 2.000 conversas iniciadas pela empresa em 24h já liberado na Meta, prontas para integrar com Typebot, Evolution, Z-API e CRMs.`,
          },
          {
            question: `Vocês dão suporte caso eu tenha dúvidas na configuração?`,
            answer: `Sim, você conta com suporte individual 1:1 diretamente pelo nosso WhatsApp (81) 99617-6288 todos os dias, das 10h às 22h.`,
          },
        ]
          .map(
            (e, t) => `
          <div class="faq-item" id="faq-item-${t}">
            <button class="faq-question" onclick="window.toggleFaq(${t})" type="button" aria-expanded="false" aria-controls="faq-answer-${t}">
              <span>${e.question}</span>
              <span class="faq-icon" style="color: var(--color-primary); font-size: 0.8rem;">&#9660;</span>
            </button>
            <div class="faq-answer" id="faq-answer-${t}">
              ${e.answer}
            </div>
          </div>
        `,
          )
          .join(``)}
      </div>
      <div class="faq-cta-banner">
        <div>
          <strong>Ainda ficou com alguma dúvida?</strong>
          <p>Fale agora direto com nosso especialista no WhatsApp e escolha a melhor BM para sua operação.</p>
        </div>
        <a href="https://wa.me/5581996176288?text=Ol%C3%A1!%20Tenho%20uma%20d%C3%BAvida%20sobre%20as%20BMs%20da%20Inova%20Est%C3%BAdio." target="_blank" rel="noopener noreferrer" class="btn btn-primary faq-cta-btn">
          <svg viewBox="0 0 448 512" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
          <span>Chamar no WhatsApp (81) 99617-6288</span>
        </a>
      </div>
    </section>
  `;
}
function M(e) {
  return new Date(e.getFullYear(), e.getMonth(), e.getDate());
}
function ge(e) {
  let t = M(e),
    n = t.getDay(),
    r = n === 0 ? -6 : 1 - n;
  return (t.setDate(t.getDate() + r), t);
}
function _e(e) {
  let t = M(e);
  return (t.setDate(t.getDate() + 1), t);
}
function N(e) {
  if (!e) return null;
  let [t, n, r] = e.split(`-`).map(Number);
  return !t || !n || !r ? null : new Date(t, n - 1, r);
}
function P(e = `all`, t = null) {
  if (e === `all`) return ``;
  let n = new Date(),
    r = M(n),
    i = new Date(r);
  i.setDate(i.getDate() - 1);
  let a = N(t?.from),
    o = N(t?.to),
    s =
      e === `daily`
        ? r
        : e === `yesterday`
          ? i
          : e === `custom`
            ? a
            : e === `weekly`
              ? ge(n)
              : e === `monthly`
                ? new Date(n.getFullYear(), n.getMonth(), 1)
                : null;
  if (!s) return ``;
  let c = e === `yesterday` ? r : e === `custom` && o ? _e(o) : n;
  return `?${new URLSearchParams({ from: s.toISOString(), to: c.toISOString() }).toString()}`;
}
function F(t, n = null, r = {}) {
  let i = t === `product_view` || t === `product_views`,
    a = JSON.stringify({
      eventType: t,
      refCode: n,
      productId: r.productId ?? null,
      metadata: r,
      page: window.location.pathname,
      referrer: document.referrer,
    }),
    o = () => {
      if (!i && navigator.sendBeacon) {
        let e = new Blob([a], { type: `application/json` });
        if (navigator.sendBeacon(`/api/tracking/event`, e)) return;
      }
      fetch(`${e}/tracking/event`, {
        method: `POST`,
        headers: { "Content-Type": `application/json` },
        body: a,
        keepalive: !0,
      }).catch(() => {});
    };
  if (i) {
    o();
    return;
  }
  `requestIdleCallback` in window
    ? window.requestIdleCallback(o, { timeout: 2e3 })
    : window.setTimeout(o, 1200);
}
async function ve(t = `all`, n = null) {
  try {
    let r = await fetch(`${e}/dashboard/summary${P(t, n)}`);
    if (!r.ok) throw Error(`API Error`);
    let i = await r.json();
    return {
      accesses:
        (i.data.events.byType.accesses || 0) +
        (i.data.events.byType.page_view || 0),
      product_views:
        (i.data.events.byType.product_views || 0) +
        (i.data.events.byType.product_view || 0),
      zap_float:
        (i.data.events.byType.zap_float || 0) +
        (i.data.events.byType.whatsapp_click_float || 0),
      zap_product:
        (i.data.events.byType.zap_product || 0) +
        (i.data.events.byType.whatsapp_click_product || 0),
      zap_total:
        (i.data.events.byType.zap_float || 0) +
        (i.data.events.byType.zap_product || 0) +
        (i.data.events.byType.whatsapp_click_float || 0) +
        (i.data.events.byType.whatsapp_click_product || 0),
      mobile_accesses: i.data.events.mobileAccesses || 0,
      available: !0,
    };
  } catch {
    return {
      accesses: 0,
      product_views: 0,
      zap_float: 0,
      zap_product: 0,
      zap_total: 0,
      mobile_accesses: 0,
      available: !1,
    };
  }
}
async function ye(t, n, r = {}) {
  let i = new URLSearchParams(P(t, n).replace(/^\?/, ``));
  (i.set(`granularity`, r.granularity || `auto`),
    i.set(`device`, r.device || `all`),
    i.set(`offsetMinutes`, String(-new Date().getTimezoneOffset())));
  try {
    let r = await fetch(`${e}/dashboard/analytics?${i}`, { cache: `no-store` });
    if (r.status === 404) {
      let e = await ve(t, n);
      return { available: !1, legacy: e.available, totals: e };
    }
    if (!r.ok) throw Error(`Analytics unavailable`);
    return { ...(await r.json()).data, available: !0 };
  } catch {
    return { available: !1, legacy: !1 };
  }
}
async function be() {
  try {
    let t = await fetch(`${e}/dashboard/affiliates`, { cache: `no-store` });
    if (!t.ok) throw Error(`API Error`);
    let n = await t.json(),
      r = {};
    for (let e of n.data)
      r[e.code] = {
        first_seen: e.firstSeen,
        last_seen: e.lastSeen,
        accesses:
          (e.events.accesses || 0) +
          (e.events.page_view || 0) +
          (e.events.affiliate_click || 0),
        zap_total:
          (e.events.zap_float || 0) +
          (e.events.zap_product || 0) +
          (e.events.whatsapp_click_float || 0) +
          (e.events.whatsapp_click_product || 0),
      };
    return r;
  } catch {
    return {};
  }
}
async function xe(t = 15) {
  try {
    let n = await fetch(`${e}/tracking/events?take=${t}&skip=0`);
    if (!n.ok) throw Error(`API Error`);
    return (await n.json()).data;
  } catch {
    return [];
  }
}
async function Se() {
  try {
    return (await fetch(`${e}/tracking/events`, { method: `DELETE` })).ok;
  } catch {
    return !1;
  }
}
async function Ce() {
  try {
    return (
      await fetch(`${e}/tracking/events/affiliates`, { method: `DELETE` })
    ).ok;
  } catch {
    return !1;
  }
}
var I = `adsflowz_cid`,
  L = `adsflowz_tid`,
  we = 5e3,
  Te = 15e3;
function R() {
  try {
    if (crypto.randomUUID) return crypto.randomUUID();
  } catch {}
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
function Ee() {
  try {
    let e = localStorage.getItem(I);
    return (e || ((e = R()), localStorage.setItem(I, e)), e);
  } catch {
    return R();
  }
}
function De() {
  try {
    let e = sessionStorage.getItem(L);
    return (e || ((e = R()), sessionStorage.setItem(L, e)), e);
  } catch {
    return R();
  }
}
function Oe() {
  if (window.__clientPresence) return window.__clientPresence;
  let t = Ee(),
    n = De(),
    r = () =>
      JSON.stringify({
        sessionId: t,
        tabId: n,
        path: window.location.pathname,
      }),
    i = (t, { beacon: n = !1 } = {}) => {
      let i = `${e}/presence/${t}`,
        a = r();
      if (n && navigator.sendBeacon) {
        let e = new Blob([a], { type: `application/json` });
        if (navigator.sendBeacon(i, e)) return;
      }
      fetch(i, {
        method: `POST`,
        headers: { "Content-Type": `application/json` },
        body: a,
        keepalive: n,
      }).catch(() => {});
    },
    a = 0,
    o = () => {
      let e = Date.now();
      e - a < we || ((a = e), i(`heartbeat`));
    },
    s = [`click`, `keydown`, `scroll`, `mousemove`, `touchstart`];
  s.forEach((e) => window.addEventListener(e, o, { passive: !0 }));
  let c = () => {
    document.visibilityState === `visible` && o();
  };
  document.addEventListener(`visibilitychange`, c);
  let l = window.setInterval(() => {
      document.visibilityState === `visible` && i(`heartbeat`);
    }, Te),
    u = () => {
      i(`offline`, { beacon: !0 });
    };
  return (
    window.addEventListener(`pagehide`, u),
    window.addEventListener(`beforeunload`, u),
    i(`heartbeat`),
    (window.__clientPresence = {
      disconnect() {
        (window.clearInterval(l),
          s.forEach((e) => window.removeEventListener(e, o)),
          document.removeEventListener(`visibilitychange`, c),
          window.removeEventListener(`pagehide`, u),
          window.removeEventListener(`beforeunload`, u),
          u(),
          (window.__clientPresence = null));
      },
    }),
    window.__clientPresence
  );
}
var z = `https://adsflowz.org`.replace(/\/+$/, ``),
  ke = `/images/inova-logo.png`,
  Ae = `script[type="application/ld+json"][data-seo-managed="true"]`;
function B(e = `/`) {
  if (!e) return `${z}/`;
  if (/^https?:\/\//i.test(e)) return e;
  let t = e.startsWith(`/`) ? e : `/${e}`;
  return new URL(t, `${z}/`).toString();
}
function V() {
  return B(ke);
}
function H(e, t) {
  let n = document.head.querySelector(e);
  return (
    n || ((n = document.createElement(`meta`)), document.head.appendChild(n)),
    Object.entries(t).forEach(([e, t]) => {
      n.setAttribute(e, t);
    }),
    n
  );
}
function je(e, t) {
  let n = document.head.querySelector(e);
  return (
    n || ((n = document.createElement(`link`)), document.head.appendChild(n)),
    Object.entries(t).forEach(([e, t]) => {
      n.setAttribute(e, t);
    }),
    n
  );
}
function Me() {
  document.head.querySelectorAll(Ae).forEach((e) => e.remove());
}
function Ne(e = []) {
  (Me(),
    e.forEach((e) => {
      let t = document.createElement(`script`);
      ((t.type = `application/ld+json`),
        (t.dataset.seoManaged = `true`),
        (t.textContent = JSON.stringify(e)),
        document.head.appendChild(t));
    }));
}
function U({
  title: e,
  description: t,
  path: n = `/`,
  image: r = V(),
  type: i = `website`,
  robots: a = `index,follow,max-image-preview:large`,
  jsonLd: o = [],
}) {
  let s = B(n),
    c = B(r);
  ((document.title = e),
    H(`meta[name="description"]`, { name: `description`, content: t }),
    H(`meta[name="robots"]`, { name: `robots`, content: a }),
    H(`meta[property="og:type"]`, { property: `og:type`, content: i }),
    H(`meta[property="og:site_name"]`, {
      property: `og:site_name`,
      content: `Inova Estúdio`,
    }),
    H(`meta[property="og:locale"]`, {
      property: `og:locale`,
      content: `pt_BR`,
    }),
    H(`meta[property="og:title"]`, { property: `og:title`, content: e }),
    H(`meta[property="og:description"]`, {
      property: `og:description`,
      content: t,
    }),
    H(`meta[property="og:url"]`, { property: `og:url`, content: s }),
    H(`meta[property="og:image"]`, { property: `og:image`, content: c }),
    H(`meta[name="twitter:card"]`, {
      name: `twitter:card`,
      content: `summary_large_image`,
    }),
    H(`meta[name="twitter:title"]`, { name: `twitter:title`, content: e }),
    H(`meta[name="twitter:description"]`, {
      name: `twitter:description`,
      content: t,
    }),
    H(`meta[name="twitter:image"]`, { name: `twitter:image`, content: c }),
    je(`link[rel="canonical"]`, { rel: `canonical`, href: s }),
    Ne(o));
}
function W(e) {
  return {
    "@context": `https://schema.org`,
    "@type": `BreadcrumbList`,
    itemListElement: e.map((e, t) => ({
      "@type": `ListItem`,
      position: t + 1,
      name: e.name,
      item: B(e.path),
    })),
  };
}
function Pe() {
  return {
    "@context": `https://schema.org`,
    "@type": `Organization`,
    name: `Inova Estúdio`,
    url: B(`/`),
    logo: V(),
    contactPoint: [
      {
        "@type": `ContactPoint`,
        telephone: `+55-81-99617-6288`,
        contactType: `sales`,
        areaServed: `BR`,
        availableLanguage: [`pt-BR`],
      },
    ],
  };
}
function Fe() {
  return {
    "@context": `https://schema.org`,
    "@type": `WebSite`,
    name: `Inova Estúdio`,
    url: B(`/`),
    inLanguage: `pt-BR`,
    description: `Catálogo de contas para anúncios, combos de BMs e proxies para operações de marketing digital.`,
    publisher: { "@type": `Organization`, name: `Inova Estúdio`, url: B(`/`) },
  };
}
function G({ name: e, description: t, path: n }) {
  return {
    "@context": `https://schema.org`,
    "@type": `CollectionPage`,
    name: e,
    description: t,
    url: B(n),
    inLanguage: `pt-BR`,
  };
}
function Ie(e, t) {
  return {
    "@context": `https://schema.org`,
    "@type": `Product`,
    name: e.title,
    description: e.description,
    category: t,
    image: e.image ? [B(e.image)] : [V()],
    brand: { "@type": `Brand`, name: `Inova Estúdio` },
    offers: {
      "@type": `Offer`,
      priceCurrency: `BRL`,
      price: Number(e.price).toFixed(2),
      availability: e.outOfStock
        ? `https://schema.org/OutOfStock`
        : `https://schema.org/InStock`,
      url: B(`/produto/${e.id}`),
    },
  };
}
var K = `https://clarity.microsoft.com`,
  Le = [`/admin`, `/testdash`],
  q = !1,
  J = !1;
function Y() {
  return ``;
}
function X() {
  return !1;
}
function Z() {
  return !1;
}
function Q(e = window.location.pathname) {
  let t = String(e || ``);
  return Le.some((e) => t === e || t.startsWith(`${e}/`));
}
function Re() {
  if (typeof window.__cookieConsent == `boolean`) return window.__cookieConsent;
  try {
    let e = window.localStorage?.getItem(`cookie_consent`);
    if (e === `denied` || e === `false`) return !1;
  } catch {}
  return !0;
}
function ze() {
  let e = Y(),
    t = e.length > 0,
    n = t ? `${K}/projects/view/${encodeURIComponent(e)}` : K;
  return {
    projectId: e,
    configured: t,
    isDev: X(),
    devEnabled: Z(),
    active: q && !J,
    dashboardUrl: t ? `${n}/dashboard` : `${K}/`,
    heatmapsUrl: t ? `${n}/heatmaps` : `${K}/`,
    recordingsUrl: t ? `${n}/recordings` : `${K}/`,
    insightsUrl: t ? `${n}/dashboard` : `${K}/`,
    settingsUrl: t ? `${n}/settings/overview` : `${K}/`,
  };
}
function Be(e = window.location.pathname) {
  return typeof window > `u`
    ? { eligible: !1, reason: `no-window` }
    : Y()
      ? X() && !Z()
        ? { eligible: !1, reason: `dev-disabled` }
        : Q(e)
          ? { eligible: !1, reason: `admin-route` }
          : Re()
            ? { eligible: !0, reason: `ok` }
            : { eligible: !1, reason: `no-consent` }
      : { eligible: !1, reason: `missing-project-id` };
}
function Ve(e) {
  window.clarity ||
    (function (e, t, n, r, i, a, o) {
      ((e[n] =
        e[n] ||
        function () {
          (e[n].q = e[n].q || []).push(arguments);
        }),
        (a = t.createElement(r)),
        (a.async = 1),
        (a.src = `https://www.clarity.ms/tag/` + i),
        (o = t.getElementsByTagName(r)[0]),
        o.parentNode.insertBefore(a, o));
    })(window, document, `clarity`, `script`, e);
}
function He(e = window.location.pathname) {
  let { eligible: t } = Be(e);
  if (!t) return !1;
  if (((q ||= (Ve(Y()), !0)), J && typeof window.clarity == `function`)) {
    try {
      window.clarity(`start`);
    } catch {}
    J = !1;
  }
  return !0;
}
function Ue() {
  if (q && !J && typeof window.clarity == `function`) {
    try {
      window.clarity(`stop`);
    } catch {}
    J = !0;
  }
}
function We(e = window.location.pathname) {
  return Q(e) ? (Ue(), !1) : He(e);
}
var Ge = `modulepreload`,
  Ke = function (e) {
    return `/` + e;
  },
  qe = {},
  $ = function (e, t, n) {
    let r = Promise.resolve();
    if (t && t.length > 0) {
      let e = document.getElementsByTagName(`link`),
        i = document.querySelector(`meta[property=csp-nonce]`),
        a = i?.nonce || i?.getAttribute(`nonce`);
      function o(e) {
        return Promise.all(
          e.map((e) =>
            Promise.resolve(e).then(
              (e) => ({ status: `fulfilled`, value: e }),
              (e) => ({ status: `rejected`, reason: e }),
            ),
          ),
        );
      }
      function s(e) {
        return import.meta.resolve
          ? import.meta.resolve(e)
          : new URL(e, import.meta.url).href;
      }
      r = o(
        t.map((t) => {
          if (((t = Ke(t, n)), (t = s(t)), t in qe)) return;
          qe[t] = !0;
          let r = t.endsWith(`.css`);
          for (let n = e.length - 1; n >= 0; n--) {
            let i = e[n];
            if (i.href === t && (!r || i.rel === `stylesheet`)) return;
          }
          let i = document.createElement(`link`);
          if (
            ((i.rel = r ? `stylesheet` : Ge),
            r || (i.as = `script`),
            (i.crossOrigin = ``),
            (i.href = t),
            a && i.setAttribute(`nonce`, a),
            document.head.appendChild(i),
            r)
          )
            return new Promise((e, n) => {
              (i.addEventListener(`load`, e),
                i.addEventListener(`error`, () =>
                  n(Error(`Unable to preload CSS for ${t}`)),
                ));
            });
        }),
      );
    }
    function i(e) {
      let t = new Event(`vite:preloadError`, { cancelable: !0 });
      if (((t.payload = e), window.dispatchEvent(t), !t.defaultPrevented))
        throw e;
    }
    return r.then((t) => {
      for (let e of t || []) e.status === `rejected` && i(e.reason);
      return e().catch(i);
    });
  };
function Je() {
  let e = () => We();
  `requestIdleCallback` in window
    ? window.requestIdleCallback(e, { timeout: 3e3 })
    : window.setTimeout(e, 1500);
}
function Ye(e) {
  return `
    <nav aria-label="Breadcrumb" style="display:flex;flex-wrap:wrap;gap:0.5rem;font-size:0.92rem;margin-bottom:1.5rem;color:var(--color-text-secondary);">
      ${e
        .map(
          (t, n) => `
        ${t.href ? `<a href="${t.href}" onclick="return window.router && window.router.handleLinkClick(event, '${t.href}')" style="color:inherit;text-decoration:none;">${t.label}</a>` : `<span style="color:var(--color-text-main);">${t.label}</span>`}
        ${n < e.length - 1 ? `<span>/</span>` : ``}
      `,
        )
        .join(``)}
    </nav>
  `;
}
function Xe(e = window.location.pathname) {
  return [`/testdash`, `/admin`].some((t) => e.startsWith(t));
}
function Ze(e = window.location.pathname) {
  if (Xe(e)) {
    window.__clientPresence?.disconnect && window.__clientPresence.disconnect();
    return;
  }
  (window.destroyAnalyticsCharts?.(), window.destroyLiveClientsKpi?.(), Oe());
}
new (class {
  constructor() {
    ((this.app = document.getElementById(`app`)),
      (this.handlePopState = this.handlePopState.bind(this)),
      window.addEventListener(`popstate`, this.handlePopState),
      (window.router = this),
      (window.trackZapFloat = () => F(`zap_float`, O())),
      (window.trackZapProduct = (e) => F(`zap_product`, O(), { productId: e })),
      (this._dashHelpersRegistered = !1),
      (this._searchTimer = null),
      (this._homeRequestKey = null),
      (this._pendingProductsScroll = !1),
      (window.toggleFaq = (e) => {
        let t = document.getElementById(`faq-item-${e}`);
        if (t) {
          t.classList.toggle(`active`);
          let e = t.querySelector(`.faq-icon`);
          e &&
            (e.innerHTML = t.classList.contains(`active`)
              ? `&#9650;`
              : `&#9660;`);
          let n = t.querySelector(`.faq-question`);
          n &&
            n.setAttribute(
              `aria-expanded`,
              t.classList.contains(`active`) ? `true` : `false`,
            );
        }
      }),
      (window.inovaScrollTo = (ev, targetId) => {
        ev && ev.preventDefault && ev.preventDefault();
        window.adsflowzCloseNav && window.adsflowzCloseNav();
        let el = document.getElementById(targetId);
        if (el) {
          let offset = (document.querySelector(`.adsflowz-topbar`)?.getBoundingClientRect().height || 64) + 18;
          let yPos = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: Math.max(0, yPos), behavior: `smooth` });
          return !1;
        }
        if (window.location.pathname !== `/`) {
          this.navigate(`/`);
          window.setTimeout(() => {
            let targetEl = document.getElementById(targetId);
            if (targetEl) {
              let offset = (document.querySelector(`.adsflowz-topbar`)?.getBoundingClientRect().height || 64) + 18;
              window.scrollTo({ top: Math.max(0, targetEl.getBoundingClientRect().top + window.scrollY - offset), behavior: `smooth` });
            }
          }, 120);
        }
        return !1;
      }));
    let e = (e) => {
      let t = document.querySelector(`.adsflowz-topbar`),
        n = document.querySelector(`.nav-toggle`);
      !t ||
        !n ||
        (t.classList.toggle(`nav-open`, e),
        n.setAttribute(`aria-expanded`, e ? `true` : `false`),
        n.setAttribute(`aria-label`, e ? `Fechar menu` : `Abrir menu`));
    };
    ((window.adsflowzToggleNav = (t) => {
      t && (t.preventDefault(), t.stopPropagation());
      let n = document.querySelector(`.adsflowz-topbar`);
      return (e(!(n && n.classList.contains(`nav-open`))), !1);
    }),
      (window.adsflowzCloseNav = () => e(!1)),
      document.addEventListener(`keydown`, (e) => {
        e.key === `Escape` &&
          window.adsflowzCloseNav &&
          window.adsflowzCloseNav();
      }),
      document.addEventListener(`click`, (e) => {
        let topbar = document.querySelector(`.adsflowz-topbar`);
        topbar && topbar.classList.contains(`nav-open`) && !topbar.contains(e.target) && window.adsflowzCloseNav && window.adsflowzCloseNav();
        e.target.closest &&
          e.target.closest(`.nav-links a`) &&
          window.adsflowzCloseNav &&
          window.adsflowzCloseNav();
      }),
      (window.scrollTestimonials = (e, t) => {
        let sec = (e && e.closest) ? (e.closest(`.testimonials-wrap`) || e.closest(`.testimonials-section`)) : document.querySelector(`.testimonials-section`);
        let r = sec ? sec.querySelector(`.testimonials-carousel`) : document.querySelector(`.testimonials-carousel`);
        if (!r) return;
        let i = r.querySelector(`.testimonial-card`),
          a = i ? (i.getBoundingClientRect().width + 14) : (r.clientWidth * 0.85);
        r.scrollBy({ left: t * a, behavior: `smooth` });
      }),
      (window.goToTestimonial = (idx) => {
        let r = document.querySelector(`.testimonials-carousel`);
        if (!r) return;
        let i = r.querySelector(`.testimonial-card`),
          a = i ? (i.getBoundingClientRect().width + 14) : (r.clientWidth * 0.85);
        r.scrollTo({ left: idx * a, behavior: `smooth` });
      }),
      this.initCarouselInteractions(),
      le(),
      this.init());
  }
  initCarouselInteractions() {
    let e = null;
    let updateDots = () => {
      let r = document.querySelector(`.testimonials-carousel`);
      if (!r) return;
      let cards = r.querySelectorAll(`.testimonial-card`);
      if (!cards.length) return;
      let cardWidth = cards[0].getBoundingClientRect().width + 14;
      let activeIndex = Math.round(r.scrollLeft / cardWidth);
      if (activeIndex < 0) activeIndex = 0;
      if (activeIndex >= cards.length) activeIndex = cards.length - 1;
      let dots = document.querySelectorAll(`.carousel-dot`);
      dots.forEach((dot, idx) => {
        dot.classList.toggle(`active`, idx === activeIndex);
      });
    };
    document.addEventListener(`scroll`, (t) => {
      if (t.target && t.target.classList && t.target.classList.contains(`testimonials-carousel`)) {
        updateDots();
      }
    }, !0);
    setInterval(() => {
      let r = document.querySelector(`.testimonials-carousel`);
      if (!r || r.matches(`:hover`) || r.classList.contains(`dragging`)) return;
      let i = r.querySelector(`.testimonial-card`);
      if (!i) return;
      let a = i.getBoundingClientRect().width + 14;
      let maxScroll = r.scrollWidth - r.clientWidth;
      if (r.scrollLeft >= maxScroll - 15) {
        r.scrollTo({ left: 0, behavior: `smooth` });
      } else {
        r.scrollBy({ left: a, behavior: `smooth` });
      }
    }, 4500);
    (document.addEventListener(`pointerdown`, (t) => {
      let n = t.target.closest && t.target.closest(`.testimonials-carousel`);
      !n ||
        (t.target.closest && t.target.closest(`a, button`)) ||
        ((e = {
          el: n,
          startX: t.clientX,
          scrollLeft: n.scrollLeft,
          moved: !1,
        }),
        n.classList.add(`dragging`));
    }),
      document.addEventListener(`pointermove`, (t) => {
        if (!e) return;
        let n = t.clientX - e.startX;
        (Math.abs(n) > 3 && (e.moved = !0),
          (e.el.scrollLeft = e.scrollLeft - n));
      }));
    let t = () => {
      e &&= (e.el.classList.remove(`dragging`), null);
    };
    (document.addEventListener(`pointerup`, t),
      document.addEventListener(`pointercancel`, t),
      document.addEventListener(
        `click`,
        (t) => {
          e && e.moved && (t.preventDefault(), t.stopPropagation());
        },
        !0,
      ),
      document.addEventListener(
        `wheel`,
        (e) => {
          let t =
            e.target.closest && e.target.closest(`.testimonials-carousel`);
          !t ||
            e.deltaY === 0 ||
            t.scrollWidth <= t.clientWidth ||
            ((t.scrollLeft += e.deltaY), e.preventDefault());
        },
        { passive: !1 },
      ));
  }
  init() {
    this.redirectLegacy() || this.resolve();
  }
  handlePopState() {
    this.resolve();
  }
  handleLinkClick(e, t) {
    return !e ||
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
      ? !0
      : (e.preventDefault(), this.navigate(t), !1);
  }
  handleProductsClick(e) {
    if (
      !e ||
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    )
      return !0;
    e.preventDefault();
    let t = new URL(window.location);
    if (!(t.pathname === `/` && !t.searchParams.get(`search`)))
      return (
        (t.pathname = `/`),
        (t.search = ``),
        (t.hash = ``),
        (this._pendingProductsScroll = !0),
        window.history.pushState({}, ``, t),
        this.resolve(),
        !1
      );
    if (t.hash) {
      ((t.hash = ``), window.history.pushState({}, ``, t));
      let e = document.getElementById(`navbar-container`);
      e && (e.innerHTML = d());
    }
    return (this.scrollToProducts(), !1);
  }
  scrollToProducts() {
    let e = document.getElementById(`product-categories`);
    if (!e) {
      this._pendingProductsScroll = !0;
      return;
    }
    let t =
        (document.querySelector(`.adsflowz-topbar`)?.getBoundingClientRect()
          .height || 0) + 24,
      n = e.getBoundingClientRect().top + window.scrollY - t;
    window.scrollTo({ top: Math.max(0, n), behavior: `smooth` });
  }
  handleFaqClick(e) {
    if (
      !e ||
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    )
      return !0;
    e.preventDefault();
    let t = new URL(window.location),
      n = t.pathname === `/` && !t.searchParams.get(`search`);
    if (
      ((t.pathname = `/`),
      (t.search = ``),
      (t.hash = `duvidas-frequentes`),
      (window.location.pathname !== `/` ||
        window.location.search ||
        window.location.hash !== t.hash) &&
        window.history.pushState({}, ``, t),
      n && document.getElementById(`duvidas-frequentes`))
    ) {
      let e = document.getElementById(`navbar-container`);
      (e && (e.innerHTML = d()), this.scrollToFaq());
    } else this.resolve();
    return !1;
  }
  scrollToFaq() {
    let e = document.getElementById(`duvidas-frequentes`);
    if (!e) return;
    let t =
        (document.querySelector(`.adsflowz-topbar`)?.getBoundingClientRect()
          .height || 0) + 24,
      n = e.getBoundingClientRect().top + window.scrollY - t;
    window.scrollTo({ top: Math.max(0, n), behavior: `smooth` });
  }
  redirectLegacy() {
    let e = new URL(window.location),
      t = e.searchParams,
      n = t.get(`view`);
    if (n) {
      let r = {
        home: `/`,
        product: `/produto/${t.get(`id`) || ``}`,
        "calculator-tax": `/calculadora`,
        testdash: `/testdash`,
      }[n];
      if (r)
        return (
          t.delete(`view`),
          t.delete(`id`),
          (e.pathname = r),
          history.replaceState(
            {},
            ``,
            `${e.pathname}${t.toString() ? `?${t.toString()}` : ``}`,
          ),
          this.resolve(),
          !0
        );
    }
    let r = t.get(`category`),
      i = t.get(`search`);
    if (e.pathname === `/` && r && !i && v(r)) {
      t.delete(`category`);
      let e = g(r);
      return (
        history.replaceState(
          {},
          ``,
          `${e}${t.toString() ? `?${t.toString()}` : ``}`,
        ),
        this.resolve(),
        !0
      );
    }
    return !1;
  }
  navigate(e) {
    let t = new URL(window.location);
    ((t.pathname = e),
      (t.hash = ``),
      e === `/` || t.searchParams.delete(`search`),
      t.searchParams.delete(`category`),
      window.history.pushState({}, ``, t),
      this.resolve(),
      window.scrollTo(0, 0));
  }
  resolve() {
    let e = window.location.pathname;
    if (
      ((document.body.dataset.surface = Xe(e) ? `admin` : `public`),
      e.startsWith(`/admin`) || e === `/testdash` ? We(e) : Je(),
      Ze(e),
      e !== `/ferramentas/gerador-2fa` &&
        window.toolsTotpTimer &&
        (window.clearInterval(window.toolsTotpTimer),
        (window.toolsTotpTimer = null)),
      e === `/` || e === ``)
    ) {
      this.renderHome();
      return;
    }
    if (e === `/calculadora`) {
      this.renderCalculator();
      return;
    }
    if (e === `/ferramentas`) {
      this.renderTools();
      return;
    }
    if (e === `/ferramentas/conversor-cookies`) {
      (window.history.replaceState({}, ``, `/ferramentas`), this.renderTools());
      return;
    }
    if (e === `/ferramentas/gerador-2fa`) {
      this.renderTotpGenerator();
      return;
    }
    if (e === `/testdash`) {
      this.renderDashboard();
      return;
    }
    if (e === `/admin` || e === `/admin/`) {
      this.renderDashboard();
      return;
    }
    if (e === `/admin/heatmap`) {
      this.renderDashboard(`heatmap`);
      return;
    }
    if (e.startsWith(`/produto/`)) {
      let t = e.replace(`/produto/`, ``);
      if (t) {
        this.renderProduct(t);
        return;
      }
    }
    if (e.startsWith(`/categoria/`)) {
      let t = e.replace(`/categoria/`, ``);
      if (v(t)) {
        this.renderCategory(t);
        return;
      }
    }
    this.navigate(`/`);
  }
  async renderHome() {
    F(`accesses`, O());
    let e = (new URLSearchParams(window.location.search).get(`search`) || ``)
        .trim()
        .toLowerCase(),
      t = `home:${e}`;
    ((this._homeRequestKey = t), this._ensureHomeShell());
    let n = await i();
    if (this._homeRequestKey !== t || window.location.pathname !== `/`) return;
    if (!e) {
      U({
        title: `Contas para Meta Ads, Google Ads, TikTok Ads e proxies | Inova Estúdio`,
        description: `Encontre contas para Meta Ads, Google Ads e TikTok Ads, combos de BMs e proxies. Compra segura, entrega rápida e suporte comercial da Inova Estúdio.`,
        path: `/`,
        jsonLd: [
          Pe(),
          Fe(),
          G({
            name: `Produtos para tráfego pago | Inova Estúdio`,
            description: `Catálogo de contas para anúncios, combos de BMs e proxies para operações de marketing digital.`,
            path: `/`,
          }),
        ],
      });
      let e = this._groupProducts(n),
        t = document.getElementById(`home-content`);
      (t &&
        (t.innerHTML = `
          ${this._renderSection(``, e[`meta-ads`])}
          ${he()}
          ${j()}
        `),
        this._pendingProductsScroll &&
          ((this._pendingProductsScroll = !1),
          window.requestAnimationFrame(() => this.scrollToProducts())),
        window.location.hash === `#duvidas-frequentes` &&
          window.requestAnimationFrame(() => this.scrollToFaq()));
      return;
    }
    let r = n.filter(
      (t) =>
        t.title.toLowerCase().includes(e) ||
        (t.description || ``).toLowerCase().includes(e),
    );
    U({
      title: `Busca por "${e}" | Inova Estúdio`,
      description: `Resultados internos da busca por ${e} na Inova Estúdio.`,
      path: `/`,
      robots: `noindex,follow,noarchive`,
      jsonLd: [],
    });
    let a = document.getElementById(`home-content`);
    a &&
      (a.innerHTML = `
        <section style="margin-bottom: 4rem;">
          <div class="section-header">
            <h2 class="section-title">
              <span class="section-indicator"></span>
              Resultados da busca
            </h2>
            <a href="/" onclick="return window.router && window.router.handleLinkClick(event, '/')" class="btn btn-secondary" style="text-decoration:none;">Limpar busca</a>
          </div>
          <p class="text-secondary" style="margin-bottom: 1.5rem;">
            ${r.length} produto(s) encontrado(s) para <strong style="color:white;">${f(e)}</strong>.
          </p>
          ${r.length > 0 ? `<div class="grid-responsive">${r.map((e) => y(e)).join(``)}</div>` : `<div class="catalog-loading">Nenhum produto encontrado para esse termo.</div>`}
        </section>
      `);
  }
  async renderCategory(e) {
    let t = h(e);
    if (!t) {
      this.navigate(`/`);
      return;
    }
    let n = `category:${e}`;
    ((this._homeRequestKey = n),
      this._renderShell(`
      <section class="animate-fade-in category-page">
        ${Ye([{ label: `Inicio`, href: `/` }, { label: t.label }])}
        ${b(6)}
      </section>
    `));
    let r = await i();
    if (this._homeRequestKey !== n || window.location.pathname !== g(e)) return;
    let a = r.filter((t) => t.category === e);
    (U({
      title: `${t.seoTitle} | Inova Estúdio`,
      description: t.seoDescription,
      path: g(e),
      jsonLd: [
        G({ name: t.label, description: t.introCopy, path: g(e) }),
        W([
          { name: `Inicio`, path: `/` },
          { name: t.label, path: g(e) },
        ]),
      ],
    }),
      this._renderShell(`
      <section class="animate-fade-in category-page">
        ${Ye([{ label: `Inicio`, href: `/` }, { label: t.label }])}

        <header class="category-page__intro" style="margin-bottom: 2.5rem; padding: 2rem; border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; background: rgba(255,255,255,0.03);">
          <div class="section-header" style="margin-bottom: 1rem;">
            <h1 class="section-title" style="margin-bottom: 0;">
              <span class="section-indicator"></span>
              ${t.introTitle}
            </h1>
            <a href="/" onclick="return window.router && window.router.handleLinkClick(event, '/')" class="btn btn-secondary" style="text-decoration:none;">Voltar ao catalogo</a>
          </div>
          <p class="text-secondary" style="font-size: 1rem; line-height: 1.7; max-width: 860px;">
            ${t.introCopy}
          </p>
        </header>

        ${a.length > 0 ? `<div class="grid-responsive">${a.map((e, t) => y(e, t === 0)).join(``)}</div>` : `<div class="catalog-loading">Nenhum produto disponivel nesta categoria agora.</div>`}
      </section>
      ${he()}
      ${j()}
    `));
  }
  async renderProduct(e) {
    let t = (c, l = []) => {
        let u = encodeURIComponent(
            `Olá! Tenho interesse no produto: ${c.title} (R$ ${c.price.toFixed(2).replace('.', ',')})${k()}`,
          ),
          d = g(c.category),
          fLabel = _(c.category),
          pImg = `/images/bm-br-verificada.jpg`;
        if (c.id === 8 || c.slug === `bm-disparo-2k-msgs` || c.id === `bm-disparo-2k-msgs`) pImg = `/images/bm-disparo-2000.jpg`;
        else if (c.id === 7 || c.slug === `bm-disparo-250-msgs` || c.id === `bm-disparo-250-msgs`) pImg = `/images/bm-disparo-250.jpg`;
        let vRelated = l.filter((item) => item.category === c.category && item.id !== c.id).slice(0, 3);
        return `
          <div class="product-detail animate-fade-in">
            <nav class="product-detail__breadcrumbs" aria-label="Navegação estrutural">
              <a href="/" onclick="return window.router && window.router.handleLinkClick(event, '/')">Início</a>
              <span aria-hidden="true">/</span>
              <a href="/#product-categories" onclick="return (window.inovaScrollTo && window.inovaScrollTo(event, 'product-categories')) || (window.router && window.router.handleProductsClick(event))">${f(fLabel)}</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">${f(c.title)}</span>
            </nav>

            <a href="/#product-categories" onclick="return (window.inovaScrollTo && window.inovaScrollTo(event, 'product-categories')) || (window.router && window.router.handleProductsClick(event))" class="product-detail__back">
              <span aria-hidden="true">←</span> Voltar para o Catálogo de BMs
            </a>

            <article class="product-detail__layout" aria-labelledby="product-title">
              <div class="product-detail__visual">
                <img class="product-detail__banner" src="${p(pImg)}" alt="${f(c.title)}" width="960" height="540" fetchpriority="high">
              </div>

              <div class="product-detail__purchase" aria-label="Compra do produto">
                <p class="product-detail__eyebrow">${f(fLabel)} • PRONTA ENTREGA</p>
                <h1 id="product-title">${f(c.title)}</h1>
                <div class="product-detail__price">R$ ${c.price.toFixed(2).replace(`.`, `,`)}</div>
                <p class="product-detail__description">${f(c.description || `Estrutura verificada da Inova Estúdio pronta para operação imediata.`)}</p>
                <div class="product-detail__facts">
                  <span><img src="/pix.png" alt="" width="19" height="19"> PIX ou Cartão</span>
                  <span><img src="/br-flag.svg" alt="" width="20" height="14"> Estrutura Oficial Meta</span>
                  <span>⚡ Entrega imediata no WhatsApp</span>
                </div>
                <a href="https://wa.me/5581996176288?text=${u}" target="_blank" rel="noopener noreferrer" onclick="if(window.trackZapProduct) window.trackZapProduct(${c.dbId})" class="product-detail__buy">
                  <svg viewBox="0 0 448 512" width="20" height="20" fill="currentColor" aria-hidden="true" style="margin-right:6px;"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
                  COMPRAR AGORA NO WHATSAPP <span aria-hidden="true" style="margin-left:4px;">↗</span>
                </a>
                <div class="product-detail__guarantee">
                  <span class="product-detail__guarantee-icon" aria-hidden="true">✓</span>
                  <div>
                    <strong>Compra segura e garantia de reposição Inova Estúdio</strong>
                    <p>Atendimento individual no WhatsApp (81) 99617-6288. Caso a estrutura apresente restrição no acesso inicial antes de rodar campanhas, realizamos a reposição imediata.</p>
                  </div>
                </div>
              </div>

              ${
                c.features && c.features.length
                  ? `
                <section class="product-detail__included" aria-labelledby="product-included-title">
                  <div class="product-detail__section-heading">
                    <h2 id="product-included-title">O que está incluso nesta estrutura</h2>
                  </div>
                  <ul>${c.features
                    .map(
                      (feat) => `
                    <li><span aria-hidden="true">✓</span>${f(feat)}</li>
                  `,
                    )
                    .join(``)}</ul>
                </section>
              `
                  : ``
              }
            </article>

            ${
              vRelated.length
                ? `
              <section class="product-detail__related" aria-labelledby="product-related-title">
                <div class="product-detail__related-heading">
                  <div><span class="product-detail__section-index">OUTRAS OPÇÕES EM ESTOQUE</span><h2 id="product-related-title">Veja também</h2></div>
                  <a href="/#product-categories" onclick="return (window.inovaScrollTo && window.inovaScrollTo(event, 'product-categories')) || (window.router && window.router.handleProductsClick(event))">Ver catálogo completo <span aria-hidden="true">→</span></a>
                </div>
                <div class="grid-responsive">${vRelated.map((item) => y(item, !0)).join(``)}</div>
              </section>
            `
                : ``
            }
          </div>
        `;
      },
      n = await i(),
      r = n.find((t) => t.id === e);
    if (!r) {
      (U({
        title: `Produto nao encontrado | Inova Estúdio`,
        description: `O produto solicitado nao foi encontrado na Inova Estúdio.`,
        path: `/produto/${e}`,
        robots: `noindex,follow,noarchive`,
        jsonLd: [],
      }),
        this._renderShell(`
        <div class="container" style="text-align: center; padding: 4rem;">
          <h1>Produto nao encontrado</h1>
          <a href="/" onclick="return window.router && window.router.handleLinkClick(event, '/')" class="btn btn-primary" style="text-decoration:none;">Voltar ao catalogo</a>
        </div>
      `));
      return;
    }
    F(`product_view`, O(), { productId: r.dbId });
    let a = _(r.category),
      o = g(r.category);
    (U({
      title: `${r.title} | Inova Estúdio`,
      description:
        r.description || `Produto da categoria ${a} na Inova Estúdio.`,
      path: `/produto/${r.id}`,
      image: r.image || `/images/inova-logo.png`,
      type: `product`,
      jsonLd: [
        W([
          { name: `Inicio`, path: `/` },
          { name: a, path: o },
          { name: r.title, path: `/produto/${r.id}` },
        ]),
        Ie(r, a),
      ],
    }),
      this._renderShell(t(r, n)));
  }
  async renderCalculator() {
    let { TaxCalculatorPage: e, initTaxCalculatorPage: t } =
      await $(async () => {
        let { TaxCalculatorPage: e, initTaxCalculatorPage: t } = await import(
          `./TaxCalculator-CzC-TO3i.js`
        );
        return { TaxCalculatorPage: e, initTaxCalculatorPage: t };
      }, []);
    (U({
      title: `Calculadora de economia em Meta Ads | Inova Estúdio`,
      description: `Compare o custo de anuncios com conta brasileira e conta americana em Meta Ads e estime sua economia mensal e anual.`,
      path: `/calculadora`,
      jsonLd: [],
    }),
      this._renderShell(e()),
      t());
  }
  async renderTools() {
    let { ToolsPage: e, initToolsPage: t } = await $(async () => {
      let { ToolsPage: e, initToolsPage: t } = await import(
        `./ToolsPage-A0tGx343.js`
      );
      return { ToolsPage: e, initToolsPage: t };
    }, []);
    (U({
      title: `Ferramentas | Inova Estúdio`,
      description: `Acesse o gerador de códigos 2FA TOTP da Inova Estúdio.`,
      path: `/ferramentas`,
      jsonLd: [
        W([
          { name: `Inicio`, path: `/` },
          { name: `Ferramentas`, path: `/ferramentas` },
        ]),
      ],
    }),
      this._renderShell(e()),
      t());
  }
  async renderTotpGenerator() {
    let { TotpGeneratorPage: e, initToolsPage: t } = await $(async () => {
      let { TotpGeneratorPage: e, initToolsPage: t } = await import(
        `./ToolsPage-A0tGx343.js`
      );
      return { TotpGeneratorPage: e, initToolsPage: t };
    }, []);
    (U({
      title: `Gerador de código 2FA | Inova Estúdio`,
      description: `Gere códigos TOTP de 6 dígitos a partir de uma chave 2FA ou URL otpauth diretamente no navegador.`,
      path: `/ferramentas/gerador-2fa`,
      jsonLd: [
        W([
          { name: `Inicio`, path: `/` },
          { name: `Ferramentas`, path: `/ferramentas` },
          { name: `Gerador de código 2FA`, path: `/ferramentas/gerador-2fa` },
        ]),
      ],
    }),
      this._renderShell(e()),
      t(`totp`));
  }
  async renderDashboard(e = `analytics`) {
    let {
      Dashboard: t,
      hydrateAdminSession: n,
      registerDashHelpers: r,
    } = await $(async () => {
      let {
        Dashboard: e,
        hydrateAdminSession: t,
        registerDashHelpers: n,
      } = await import(`./Dashboard-BsJkkVkP.js`);
      return { Dashboard: e, hydrateAdminSession: t, registerDashHelpers: n };
    }, []);
    (e && (window.currentDashTab = e),
      U({
        title: `Painel administrativo | Inova Estúdio`,
        description: `Área administrativa da Inova Estúdio.`,
        path: window.location.pathname,
        robots: `noindex,nofollow,noarchive`,
        jsonLd: [],
      }),
      await n(),
      (this._dashHelpersRegistered ||=
        (r(() => {
          this.resolve();
        }),
        !0)),
      this._renderShell(t(), { fullWidth: !0 }));
  }
  _ensureHomeShell() {
    let e = document.getElementById(`home-content`);
    if (!e) {
      this._renderShell(
        ce() +
          `
        <div id="home-content" class="animate-fade-in">
          ${b()}
        </div>
      `,
      );
      return;
    }
    e.querySelector(`.fallback-grid`) && (e.innerHTML = b());
    let t = document.getElementById(`navbar-container`);
    (t && !t.querySelector(`input`) && (t.innerHTML = d()),
      this.app.querySelector(`.floating-whatsapp`) ||
        document
          .getElementById(`main-content`)
          .insertAdjacentHTML(`afterend`, A()),
      this._ensureFooter());
  }
  _groupProducts(e) {
    return e.reduce(
      (e, t) => (
        e[t.category] || (e[t.category] = []),
        e[t.category].push(t),
        e
      ),
      {},
    );
  }
  _renderSection(e, t = []) {
    if (!t.length) return ``;
    return `
      <section id="product-categories" class="catalog-section" style="margin-bottom: 4rem; scroll-margin-top: 90px;">
        <div class="section-header" style="margin-bottom: 1.5rem; justify-content: center; text-align: center;">
          <div style="text-align: center; width: 100%;">
            <p class="section-eyebrow" style="text-align: center;">CATÁLOGO OFICIAL • BMs PRONTA ENTREGA</p>
            ${e ? `
            <h2 class="section-title">
              <span class="section-indicator"></span>
              ${e}
            </h2>` : ``}
          </div>
        </div>
        <div class="grid-responsive">
          ${t.map((t, n) => y(t, n === 0)).join(``)}
        </div>
      </section>
    `;
  }
  _renderShell(e, t = {}) {
    let n = t.fullWidth === !0,
      r = d(),
      i = this._footerHTML();
    if (!this.app.querySelector(`#main-content`)) {
      this.app.innerHTML = `
        <div id="navbar-container">${r}</div>
        <main id="main-content" class="${n ? `` : `container`}" style="${n ? `width: 100%; max-width: none; padding: 0;` : ``}">
          ${e}
        </main>
        ${A()}
        ${i}
      `;
      return;
    }
    let a = document.getElementById(`main-content`);
    ((a.className = n ? `` : `container`),
      (a.style.width = n ? `100%` : ``),
      (a.style.maxWidth = n ? `none` : ``),
      (a.style.padding = n ? `0` : ``),
      (a.innerHTML = e),
      this.app.querySelector(`.floating-whatsapp`) ||
        document
          .getElementById(`main-content`)
          .insertAdjacentHTML(`afterend`, A()),
      this.app.querySelector(`footer`) ||
        this.app.insertAdjacentHTML(`beforeend`, i));
    let o = this.app.querySelector(`#navbar-container input`);
    (!o || document.activeElement !== o) &&
      (document.getElementById(`navbar-container`).innerHTML = r);
  }
  _ensureFooter() {
    this.app.querySelector(`footer`) ||
      this.app.insertAdjacentHTML(`beforeend`, this._footerHTML());
  }
  _footerHTML() {
    return `
      <footer class="site-footer">
        <div class="container site-footer__inner">
          <a href="/" onclick="return window.router && window.router.handleLinkClick(event, '/')" class="site-footer__brand" aria-label="Inova Estúdio" style="flex-direction: row; gap: 10px; align-items: center;">
            <img src="/images/inova-logo.png" alt="Inova Estúdio" style="width: 42px; height: 42px; border-radius: 50%; object-fit: cover;">
            <div style="display: flex; flex-direction: column; align-items: flex-start; line-height: 1.05;">
              <span class="site-footer__brand-word site-footer__brand-word--light" style="font-size: 1.35rem; letter-spacing: -0.02em; color: #ffffff !important;">INOVA</span>
              <span class="site-footer__brand-word site-footer__brand-word--gradient" style="font-size: 1.35rem; letter-spacing: -0.02em;">ESTÚDIO</span>
            </div>
          </a>

          <div class="site-footer__columns">
            <section class="site-footer__section" aria-labelledby="footer-policies">
              <h2 id="footer-policies">Políticas</h2>
              <a href="/politica-de-privacidade.html" target="_blank" rel="noopener">Política de Privacidade</a>
              <a href="/termos-de-uso.html" target="_blank" rel="noopener">Termos de Uso</a>
            </section>

            <section class="site-footer__section site-footer__section--center" aria-labelledby="footer-support">
              <h2 id="footer-support">Atendimento Oficial</h2>
              <p>WhatsApp Comercial: <a class="site-footer__highlight" href="https://wa.me/5581996176288?text=Ol%C3%A1!%20Gostaria%20de%20atendimento%20sobre%20as%20BMs%20da%20Inova%20Est%C3%BAdio." target="_blank" rel="noopener">+55 (81) 99617-6288</a></p>
              <p>Todos os dias: 10h até 22h</p>
            </section>
          </div>

          <div class="site-footer__bottom">
            <a class="site-footer__instagram" href="https://www.instagram.com/inovaestudio__?psln=MWVpaHlobWwyenV3bg%3D%3D&utm_source=qr" target="_blank" rel="noopener" aria-label="Siga a Inova Estúdio no Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z"></path>
                <path d="M17.5 6.5h.01"></path>
              </svg>
              <span>Siga-nos no Instagram</span>
            </a>
            <p>&copy; 2026 Inova Estúdio. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    `;
  }
  setCategory(e) {
    if (e === `all`) {
      this.navigate(`/`);
      return;
    }
    this.navigate(g(e));
  }
  setSearch(e) {
    let t = new URL(window.location);
    ((t.pathname = `/`),
      e ? t.searchParams.set(`search`, e) : t.searchParams.delete(`search`),
      t.searchParams.delete(`category`),
      window.history.replaceState({}, ``, t),
      window.clearTimeout(this._searchTimer),
      (this._searchTimer = window.setTimeout(() => this.resolve(), 160)));
  }
})();
export {
  oe as A,
  te as C,
  s as D,
  c as E,
  se as M,
  ee as N,
  t as O,
  u as P,
  ne as S,
  re as T,
  _,
  xe as a,
  f as b,
  pe as c,
  ue as d,
  w as f,
  m as g,
  y as h,
  ye as i,
  l as j,
  ae as k,
  k as l,
  C as m,
  Be as n,
  Ce as o,
  de as p,
  be as r,
  Se as s,
  ze as t,
  D as u,
  g as v,
  ie as w,
  e as x,
  p as y,
};
