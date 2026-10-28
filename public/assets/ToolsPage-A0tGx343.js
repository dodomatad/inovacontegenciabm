function e(e){let t={back:`<polyline points="15 18 9 12 15 6"/>`,arrow:`<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>`,shield:`<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7Z"/><path d="m9 12 2 2 4-4"/>`,copy:`<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>`,play:`<polygon points="6 3 20 12 6 21 6 3"/>`,eye:`<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>`,eyeOff:`<path d="m3 3 18 18"/><path d="M10.6 5.1A11.7 11.7 0 0 1 12 5c6.5 0 10 7 10 7a15 15 0 0 1-3.2 4.1"/><path d="M6.2 6.2C3.4 8.2 2 12 2 12s3.5 7 10 7a10.9 10.9 0 0 0 4.2-.8"/>`};return`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      ${t[e]||t.play}
    </svg>
  `}function t(t=`/`,n=`Voltar`){return`
    <a
      href="${t}"
      onclick="return window.router && window.router.handleLinkClick(event, '${t}')"
      class="tc-back-btn"
      aria-label="${n}"
      style="text-decoration: none;"
    >
      ${e(`back`)}
      ${n}
    </a>
  `}function n({title:n,subtitle:r,iconName:i=`shield`,backPath:a=`/`,backLabel:o=`Voltar`}){return`
    <div class="tools-page-header">
      ${t(a,o)}

      <div class="tools-title-row">
        <div class="tools-title-icon">${e(i)}</div>
        <div class="tools-title-copy">
          <h1 class="tools-title">${n}</h1>
          <p class="tools-subtitle">${r}</p>
        </div>
      </div>
    </div>
  `}function r(){return`
    <div class="tools-page animate-fade-in">
      ${n({title:`Ferramentas`,subtitle:`Gere seu código de verificação de forma rápida e simples.`})}

      <div class="tools-choice-grid">
        <a
          href="/ferramentas/gerador-2fa"
          onclick="return window.router && window.router.handleLinkClick(event, '/ferramentas/gerador-2fa')"
          class="tools-choice-card tools-choice-card--featured"
        >
          <div class="tools-card-icon tools-card-icon-shield">${e(`shield`)}</div>
          <div class="tools-choice-copy">
            <h2 class="tools-card-title">Gerador de código 2FA</h2>
            <p class="tools-card-subtitle">Cole sua chave Base32 ou URL otpauth. O código aparece automaticamente e pode ser copiado com um toque.</p>
          </div>
          <span class="tools-choice-link">
            Abrir gerador
            ${e(`arrow`)}
          </span>
        </a>
      </div>
    </div>
  `}function i(){return`
    <div class="tools-page tools-page--totp animate-fade-in">
      ${n({title:`Gerador de código 2FA`,subtitle:`Cole sua chave e copie o código de verificação atualizado automaticamente.`,iconName:`shield`,backPath:`/ferramentas`,backLabel:`Ferramentas`})}

      <div class="tools-totp-workspace" id="totp-tool">
        <section class="tools-card tools-totp-entry" aria-labelledby="totp-entry-title">
          <span class="tools-panel-step">01 / INSIRA SUA CHAVE</span>
          <h2 id="totp-entry-title">Sua chave 2FA</h2>
          <p class="tools-panel-intro">Use a chave Base32 ou a URL otpauth fornecida pelo serviço.</p>

          <label class="tools-label" for="totp-secret">Chave Base32 ou URL otpauth</label>
          <div class="tools-secret-field">
            <input
              id="totp-secret"
              class="tools-input"
              type="password"
              inputmode="text"
              autocomplete="off"
              autocapitalize="off"
              spellcheck="false"
              aria-describedby="totp-secret-hint totp-error"
              placeholder="Cole sua chave aqui"
              oninput="window.updateTotpCode()"
            />
            <button type="button" class="tools-secret-toggle" onclick="window.toggleTotpSecret()" aria-label="Mostrar chave" title="Mostrar chave">${e(`eye`)}</button>
          </div>
          <div class="tools-field-footer">
            <p id="totp-secret-hint">O código é gerado assim que você informa a chave.</p>
            <button type="button" class="tools-clear-btn" onclick="window.clearTotpSecret()">Limpar</button>
          </div>
          <p class="tools-error" id="totp-error" aria-live="polite"></p>

        </section>

        <section class="tools-card tools-totp-result" aria-labelledby="totp-result-title">
          <span class="tools-panel-step">02 / USE O CÓDIGO</span>
          <h2 id="totp-result-title">Código atual</h2>
          <p class="tools-panel-intro">Renovado automaticamente a cada 30 segundos.</p>

          <div class="tools-totp-display">
            <span class="tools-small-label">CÓDIGO DE VERIFICAÇÃO</span>
            <div class="tools-code" id="totp-code">------</div>
          </div>

          <div class="tools-meta-row">
            <span>Próximo código em <strong id="totp-seconds">30s</strong></span>
            <span>Período de 30s</span>
          </div>
          <div class="tools-progress-wrap" role="progressbar" aria-label="Tempo restante para o próximo código" aria-valuemin="0" aria-valuemax="30" aria-valuenow="30">
            <div class="tools-progress" id="totp-progress" style="width:100%;"></div>
          </div>

          <button type="button" id="totp-copy" class="tools-copy-btn" onclick="window.copyTotpCode()" disabled>
            ${e(`copy`)} Copiar código
          </button>
          <p class="tools-status" id="totp-status" role="status" aria-live="polite">Informe sua chave para gerar o código.</p>
        </section>
      </div>

      <section class="tools-totp-notes" aria-label="Orientações para uso">
        <div class="tools-totp-guidance">
          <strong>Como usar</strong>
          <ol>
            <li>Cole a chave ou URL recebida.</li>
            <li>Copie o código de 6 dígitos.</li>
            <li>Use o código antes da próxima atualização.</li>
          </ol>
        </div>
        <p class="tools-totp-safety">Mantenha sua chave secreta segura. Nunca a compartilhe com terceiros.</p>
      </section>

    </div>
  `}function a(e){let t=`${e||``}`.trim();if(/^otpauth:\/\//i.test(t))try{return(new URL(t).searchParams.get(`secret`)||``).replace(/[\s-]/g,``).toUpperCase()}catch{throw Error(`URL otpauth inválida.`)}return t.replace(/[\s-]/g,``).toUpperCase()}function o(e){let t=``,n=a(e).replace(/=+$/g,``);if(!n)throw Error(`Informe uma chave 2FA.`);for(let e of n){let n=`ABCDEFGHIJKLMNOPQRSTUVWXYZ234567`.indexOf(e);if(n<0)throw Error(`Chave 2FA inválida. Use uma chave Base32 ou URL otpauth.`);t+=n.toString(2).padStart(5,`0`)}let r=[];for(let e=0;e+8<=t.length;e+=8)r.push(parseInt(t.slice(e,e+8),2));return new Uint8Array(r)}async function s(e,t=Date.now()){let n=o(e),r=Math.floor(t/1e3/30),i=new ArrayBuffer(8),a=new DataView(i);a.setUint32(0,Math.floor(r/4294967296)),a.setUint32(4,r>>>0);let s=await crypto.subtle.importKey(`raw`,n,{name:`HMAC`,hash:`SHA-1`},!1,[`sign`]),c=new Uint8Array(await crypto.subtle.sign(`HMAC`,s,i)),l=c[c.length-1]&15,u=(c[l]&127)<<24|(c[l+1]&255)<<16|(c[l+2]&255)<<8|c[l+3]&255;return String(u%1e6).padStart(6,`0`)}function c(e,t,n=``){let r=document.getElementById(e);r&&(r.textContent!==t&&(r.textContent=t),r.dataset.type!==n&&(r.dataset.type=n))}async function l(e,t,n){if(e)try{await navigator.clipboard.writeText(e),c(t,n,`success`)}catch{c(t,`Não foi possível copiar automaticamente.`,`error`)}}function u(){let t=``,n=0;window.updateTotpCode=async()=>{let e=document.getElementById(`totp-secret`),r=e?.value||``,i=document.getElementById(`totp-code`),a=document.getElementById(`totp-copy`),o=document.getElementById(`totp-seconds`),l=document.getElementById(`totp-progress`),u=30-Math.floor(Date.now()/1e3)%30,d=++n;if(r!==t&&(t=r,i&&(i.textContent=`------`),a&&(a.disabled=!0)),o&&(o.textContent=`${u}s`),l&&(l.style.width=`${u/30*100}%`,l.classList.toggle(`is-expiring`,u<=5),l.parentElement?.setAttribute(`aria-valuenow`,String(u))),!r.trim()){i&&(i.textContent=`------`),a&&(a.disabled=!0),e?.removeAttribute(`aria-invalid`),c(`totp-error`,``),c(`totp-status`,`Informe sua chave para gerar o código.`);return}try{let t=await s(r);if(d!==n||e?.value!==r)return;let o=i?.textContent!==t;i&&(i.textContent=t),a&&(a.disabled=!1),e.removeAttribute(`aria-invalid`),c(`totp-error`,``),o&&c(`totp-status`,`Código pronto para copiar.`,`success`)}catch(t){if(d!==n||e?.value!==r)return;i&&(i.textContent=`------`),a&&(a.disabled=!0),e?.setAttribute(`aria-invalid`,`true`),c(`totp-error`,t.message||`Não foi possível gerar o código.`,`error`),c(`totp-status`,`Verifique a chave informada.`,`error`)}},window.toggleTotpSecret=()=>{let t=document.getElementById(`totp-secret`),n=document.querySelector(`.tools-secret-toggle`);if(!t||!n)return;let r=t.type===`password`;t.type=r?`text`:`password`,n.innerHTML=e(r?`eyeOff`:`eye`),n.setAttribute(`aria-label`,r?`Ocultar chave`:`Mostrar chave`),n.title=r?`Ocultar chave`:`Mostrar chave`},window.clearTotpSecret=()=>{let t=document.getElementById(`totp-secret`);if(!t)return;t.value=``,t.type=`password`;let n=document.querySelector(`.tools-secret-toggle`);n&&(n.innerHTML=e(`eye`),n.setAttribute(`aria-label`,`Mostrar chave`),n.title=`Mostrar chave`),window.updateTotpCode(),t.focus()},window.copyTotpCode=()=>{let e=document.getElementById(`totp-code`)?.textContent||``;/^\d{6}$/.test(e)&&l(e,`totp-status`,`Código copiado.`)}}function d(e=`index`){window.toolsTotpTimer&&(window.clearInterval(window.toolsTotpTimer),window.toolsTotpTimer=null),e===`totp`&&(u(),window.toolsTotpTimer=window.setInterval(()=>window.updateTotpCode(),1e3),window.updateTotpCode())}export{r as ToolsPage,i as TotpGeneratorPage,d as initToolsPage};