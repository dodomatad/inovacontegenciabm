import {
  O as e,
  _ as t,
  b as n,
  h as r,
  l as i,
  v as a,
  y as o,
} from "./index-QFC2ufd2.js";
function s(e) {
  let r = t(e.category),
    i = a(e.category);
  return `
    <nav class="product-detail__breadcrumbs" aria-label="Navegação estrutural">
      <a href="/" onclick="return window.router && window.router.handleLinkClick(event, '/')">Início</a>
      <span aria-hidden="true">/</span>
      <a href="${i}" onclick="return window.router && window.router.handleLinkClick(event, '${i}')">${n(r)}</a>
      <span aria-hidden="true">/</span>
      <span aria-current="page">${n(e.title)}</span>
    </nav>
  `;
}
function c(c, l = e) {
  let u = encodeURIComponent(
      `Ola, tenho interesse no produto: ${c.title}${i()}`,
    ),
    d = a(c.category),
    f = t(c.category),
    p = `/images/card-header-proxy-optimized.jpg`;
  if (c.id === 8 || c.slug === `bm-disparo-2k-msgs` || c.id === `bm-disparo-2k-msgs`) p = `/images/bm-disparo-2000.jpg`;
  else if (c.id === 7 || c.slug === `bm-disparo-250-msgs` || c.id === `bm-disparo-250-msgs`) p = `/images/bm-disparo-250.jpg`;
  else if (c.category === `tiktok-ads`) p = `/images/card-header-tiktok-optimized.jpg`;
  else if (c.category === `meta-packages`) p = `/images/card-header-meta-packages.jpg`;
  else if (c.category === `meta-ads`) p = `/images/bm-br-verificada.jpg`;
  else if (c.category === `google-ads`) p = `/images/google-ads-banner-optimized.jpg`;
  let m = c.category === `meta-ads` || c.category === `meta-packages`,
    h =
      c.title.toUpperCase().includes(`EUA`) ||
      c.title.toUpperCase().includes(`AMERICANA`) ||
      c.title.toUpperCase().includes(`AMERICANO`),
    g = m || h,
    _ =
      (c.countryCode === `BR` ? `BR` : `US`) == `BR`
        ? {
            label: `Brasil`,
            accountLabel: `Conta brasileira`,
            flagUrl: `/br-flag.svg`,
          }
        : {
            label: `EUA`,
            accountLabel: `Conta americana`,
            flagUrl: `/us-flag.svg`,
          },
    v = l.filter((e) => e.category === c.category && e.id !== c.id).slice(0, 3);
  return `
    <div class="product-detail animate-fade-in">
      ${s(c)}

      <a href="/#product-categories" onclick="return (window.inovaScrollTo && window.inovaScrollTo(event, 'product-categories')) || (window.router && window.router.handleProductsClick(event))" class="product-detail__back">
        <span aria-hidden="true">←</span> Voltar para o Catálogo de BMs
      </a>

      <article class="product-detail__layout" aria-labelledby="product-title">
        <div class="product-detail__visual">
          <img class="product-detail__banner" src="${o(p)}" alt="${n(c.title)}" width="960" height="540" fetchpriority="high" decoding="async">
        </div>

        <div class="product-detail__purchase" aria-label="Compra do produto">
          <p class="product-detail__eyebrow">${n(f)} • PRONTA ENTREGA</p>
          <h1 id="product-title">${n(c.title)}</h1>
          <div class="product-detail__price">R$ ${c.price.toFixed(2).replace(`.`, `,`)}</div>
          <div class="product-card__no-warranty" style="font-size:12.5px;font-weight:700;color:#d97706;margin:4px 0 10px;">Sem garantia 30% de desconto</div>
          <p class="product-detail__description">${n(c.description || `Produto da categoria ${f}.`)}</p>
          <div class="product-detail__facts">
            <span><img src="/pix.png" alt="" width="19" height="19" loading="lazy" decoding="async"> PIX ou Cartão</span>
            ${g ? `<span><img src="${_.flagUrl}" alt="" width="20" height="14" loading="lazy" decoding="async"> ${_.accountLabel}</span>` : ``}
            <span>⚡ Entrega imediata no WhatsApp</span>
          </div>
          ${c.outOfStock ? `<span class="product-detail__buy product-detail__buy--disabled" aria-disabled="true">FORA DE ESTOQUE</span>` : `<a href="https://wa.me/5581996176288?text=${u}" target="_blank" rel="noopener noreferrer" onclick="if(window.trackZapProduct) window.trackZapProduct(${c.dbId})" class="product-detail__buy"><svg viewBox="0 0 448 512" width="20" height="20" fill="currentColor" aria-hidden="true" style="margin-right:6px;"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>COMPRAR AGORA NO WHATSAPP <span aria-hidden="true">↗</span></a>`}
          <div class="product-detail__guarantee">
            <span class="product-detail__guarantee-icon" aria-hidden="true">✓</span>
            <div>
              <strong>Compra segura e garantia de reposição Inova Estúdio</strong>
              <p>Atendimento individual no WhatsApp (81) 99617-6288. Caso a estrutura apresente restrição no acesso inicial antes de rodar campanhas, realizamos a reposição imediata.</p>
            </div>
          </div>
        </div>

        ${
          c.features.length
            ? `
          <section class="product-detail__included" aria-labelledby="product-included-title">
            <div class="product-detail__section-heading">
              <h2 id="product-included-title">O que está incluso</h2>
            </div>
            <ul>${c.features
              .map(
                (e) => `
              <li><span aria-hidden="true">✓</span>${n(e)}</li>
            `,
              )
              .join(``)}</ul>
          </section>
        `
            : ``
        }
      </article>

      ${
        v.length
          ? `
        <section class="product-detail__related" aria-labelledby="product-related-title">
          <div class="product-detail__related-heading">
            <div><span class="product-detail__section-index">CONTINUE EXPLORANDO</span><h2 id="product-related-title">Veja também</h2></div>
            <a href="${d}" onclick="return window.router && window.router.handleLinkClick(event, '${d}')">Ver ${n(f)} <span aria-hidden="true">→</span></a>
          </div>
          <div class="grid-responsive">${v.map((e) => r(e)).join(``)}</div>
        </section>
      `
          : ``
      }
    </div>
  `;
}
export { c as ProductPage };
