function e(){return`
    <div class="tc-page animate-fade-in">
      <div class="tc-page-header">
        <a
          href="/"
          onclick="return window.router && window.router.handleLinkClick(event, '/')"
          class="tc-back-btn"
          aria-label="Voltar"
          style="text-decoration: none;"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Voltar
        </a>

        <div class="tc-page-title-wrap">
          <div class="tc-page-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              style="color:#4ade80;">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
              <polyline points="16 7 22 7 22 13"/>
            </svg>
          </div>
          <div>
            <h1 class="tc-page-title">Calculadora de Economia</h1>
            <p class="tc-page-subtitle">Conta brasileira vs. conta americana em Meta Ads</p>
          </div>
        </div>
      </div>

      <div class="tc-card">
        <div class="tc-section">
          <h2 class="tc-section-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Insira seu investimento
          </h2>

          <div class="tc-inputs">
            <div class="tc-field">
              <label class="tc-label" for="tc-monthly">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                </svg>
                Orcamento mensal em anuncios
              </label>
              <div class="tc-presets">
                <button type="button" class="tc-preset-btn" onclick="window.tcPreset(100)">R$ 100</button>
                <button type="button" class="tc-preset-btn" onclick="window.tcPreset(1000)">R$ 1.000</button>
                <button type="button" class="tc-preset-btn" onclick="window.tcPreset(10000)">R$ 10.000</button>
              </div>
              <div class="tc-input-wrap">
                <span class="tc-prefix">R$</span>
                <input
                  id="tc-monthly"
                  type="text"
                  inputmode="decimal"
                  placeholder="0,00"
                  class="tc-input"
                  oninput="window.tcCalc()"
                  autocomplete="off"
                />
              </div>
            </div>

            <div class="tc-field">
              <label class="tc-label" for="tc-daily">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Orcamento diario
                <span class="tc-optional">opcional</span>
              </label>
              <div class="tc-input-wrap">
                <span class="tc-prefix">R$</span>
                <input
                  id="tc-daily"
                  type="text"
                  inputmode="decimal"
                  placeholder="0,00"
                  class="tc-input"
                  oninput="window.tcCalcDaily()"
                  autocomplete="off"
                />
              </div>
            </div>

            <div class="tc-field">
              <label class="tc-label" for="tc-rate">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="19" y1="5" x2="5" y2="19"/>
                  <circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>
                </svg>
                Taxa de imposto brasileira
              </label>
              <div class="tc-input-wrap">
                <input
                  id="tc-rate"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value="12"
                  class="tc-input"
                  oninput="window.tcCalc()"
                  style="padding-left: 1rem; padding-right: 2.5rem;"
                />
                <span class="tc-suffix">%</span>
              </div>
            </div>
          </div>
        </div>

        <div class="tc-divider"><span>Resultados estimados</span></div>

        <div class="tc-results">
          <div class="tc-result-card tc-card-red">
            <div class="tc-card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/>
                <polyline points="16 17 22 17 22 11"/>
              </svg>
            </div>
            <p class="tc-card-label">Imposto pago no Brasil</p>
            <p class="tc-card-value" id="tc-tax">R$ 0,00</p>
            <p class="tc-card-sub">por mes</p>
          </div>

          <div class="tc-result-card tc-card-green">
            <div class="tc-card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                <polyline points="16 7 22 7 22 13"/>
              </svg>
            </div>
            <p class="tc-card-label">Economia mensal</p>
            <p class="tc-card-value" id="tc-monthly-saving">R$ 0,00</p>
            <p class="tc-card-sub">com conta americana</p>
          </div>

          <div class="tc-result-card tc-card-blue">
            <div class="tc-card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <p class="tc-card-label">Economia anual</p>
            <p class="tc-card-value" id="tc-yearly-saving">R$ 0,00</p>
            <p class="tc-card-sub">projecao 12 meses</p>
          </div>

          <div class="tc-result-card tc-card-accent">
            <div class="tc-card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="19" y1="5" x2="5" y2="19"/>
                <circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>
              </svg>
            </div>
            <p class="tc-card-label">Percentual economizado</p>
            <p class="tc-card-value" id="tc-percent">0%</p>
            <p class="tc-card-sub">do total investido</p>
          </div>
        </div>

        <div class="tc-compare-section">
          <p class="tc-compare-title">Comparacao de custo total</p>
          <div class="tc-compare-bars">
            <div class="tc-bar-row">
              <span class="tc-bar-label">Conta brasileira</span>
              <div class="tc-bar-track">
                <div class="tc-bar tc-bar-br" id="tc-bar-br" style="width:100%;"></div>
              </div>
              <span class="tc-bar-value" id="tc-total-br">R$ 0,00</span>
            </div>
            <div class="tc-bar-row">
              <span class="tc-bar-label">Conta americana</span>
              <div class="tc-bar-track">
                <div class="tc-bar tc-bar-us" id="tc-bar-us" style="width:100%;"></div>
              </div>
              <span class="tc-bar-value" id="tc-total-us">R$ 0,00</span>
            </div>
          </div>
        </div>

        <p class="tc-disclaimer">
          Anunciantes no Brasil podem pagar cerca de 12% adicionais em impostos ao investir em anuncios.
          Esta calculadora mostra uma estimativa da economia potencial ao utilizar uma estrutura internacional de pagamento.
        </p>
      </div>
    </div>
  `}function t(){let e=e=>e.toLocaleString(`pt-BR`,{style:`currency`,currency:`BRL`}),t=(t,n)=>{if(!t)return;let r=performance.now(),i=parseFloat(t.dataset.raw||0);t.dataset.raw=n;let a=o=>{let s=Math.min((o-r)/400,1),c=1-(1-s)**3;t.textContent=e(i+(n-i)*c),s<1&&requestAnimationFrame(a)};requestAnimationFrame(a)},n=e=>parseFloat(e.replace(/\./g,``).replace(`,`,`.`))||0,r=e=>{let t=e.value.replace(/\D/g,``);if(!t){e.value=``;return}e.value=(parseInt(t,10)/100).toLocaleString(`pt-BR`,{minimumFractionDigits:2,maximumFractionDigits:2})};window.tcCalc=()=>{let e=document.getElementById(`tc-monthly`);if(!e)return;r(e);let i=n(e.value),a=i*(parseFloat(document.getElementById(`tc-rate`)?.value||12)/100),o=i+a,s=i,c=i>0?(a/o*100).toFixed(1):0;t(document.getElementById(`tc-tax`),a),t(document.getElementById(`tc-monthly-saving`),a),t(document.getElementById(`tc-yearly-saving`),a*12),t(document.getElementById(`tc-total-br`),o),t(document.getElementById(`tc-total-us`),s);let l=document.getElementById(`tc-percent`);l&&(l.textContent=`${c}%`);let u=document.getElementById(`tc-bar-br`),d=document.getElementById(`tc-bar-us`);u&&d&&(u.style.width=`100%`,d.style.width=o>0?`${(s/o*100).toFixed(1)}%`:`100%`)},window.tcPreset=e=>{let t=document.getElementById(`tc-monthly`);t&&(t.value=e.toLocaleString(`pt-BR`,{minimumFractionDigits:2,maximumFractionDigits:2}),document.querySelectorAll(`.tc-preset-btn`).forEach(t=>{t.classList.toggle(`tc-preset-btn--active`,t.textContent.replace(/\D/g,``)===String(e))}),window.tcCalc())},window.tcCalcDaily=()=>{let e=document.getElementById(`tc-daily`),t=document.getElementById(`tc-monthly`);if(!e||!t)return;r(e);let i=n(e.value);i>0&&(t.value=(i*30).toLocaleString(`pt-BR`,{minimumFractionDigits:2,maximumFractionDigits:2})),window.tcCalc()}}export{e as TaxCalculatorPage,t as initTaxCalculatorPage};