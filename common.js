const GTM_ID = 'GTM-KD3RTMKB';
const MATOMO_URL = 'https://p54v94.matomo.cloud/';
const MATOMO_SRC = 'https://cdn.matomo.cloud/p54v94.matomo.cloud/matomo.js';
const KEY = 'analytics_consent';
const $ = id => document.getElementById(id);
let consented = false;

/* ---------- Consent + GTM (GA4) + Matomo (laden erst nach Zustimmung) ---------- */
function loadMatomo(){
  const _paq = window._paq = window._paq || [];
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  _paq.push(['setTrackerUrl', MATOMO_URL + 'matomo.php']);
  _paq.push(['setSiteId', '1']);
  const g = document.createElement('script');
  g.async = true;
  g.src = MATOMO_SRC;
  document.head.appendChild(g);
}
function loadGTM(){
  if (consented) return;
  consented = true;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({'gtm.start': Date.now(), event: 'gtm.js'});
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
  document.head.appendChild(s);
  loadMatomo();
}
function track(name, params){            // ohne Einwilligung wird nichts gesendet
  if (!consented) return;
  window.dataLayer.push(Object.assign({event: name}, params || {}));      // GA4 via GTM
  const label = params ? Object.values(params).join('|') : '';
  window._paq.push(label ? ['trackEvent', 'prototype', name, label] : ['trackEvent', 'prototype', name]); // Matomo
}
function deleteTrackingCookies(){        // beim Widerruf: GA- und Matomo-Cookies entfernen
  const host = location.hostname.split('.');
  document.cookie.split(';').map(c => c.split('=')[0].trim())
    .filter(n => n.startsWith('_ga') || n === '_gid' || n.startsWith('_pk_') || n.startsWith('mtm_'))
    .forEach(n => {
      for (let i = 0; i < host.length; i++){
        const d = host.slice(i).join('.');
        document.cookie = `${n}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${d}`;
        document.cookie = `${n}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${d}`;
      }
      document.cookie = `${n}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
}
const banner = $('banner');
const saved = localStorage.getItem(KEY);
if (saved === 'granted') loadGTM(); else if (saved !== 'denied') banner.style.display = 'flex';
$('accept').onclick  = () => { localStorage.setItem(KEY,'granted'); banner.style.display='none'; loadGTM(); };
$('decline').onclick = () => { localStorage.setItem(KEY,'denied');  banner.style.display='none'; };
$('reset-consent').onclick = () => { localStorage.removeItem(KEY); deleteTrackingCookies(); location.reload(); };

/* ---------- Sprachen (für alle Seiten) ---------- */
const T = {de:{}, en:{}};
function extendT(x){ ['de','en'].forEach(l => Object.assign(T[l], x[l] || {})); }
extendT({
  de:{account:'Mein Konto',logged_out:'Nicht angemeldet',nav_products:'Alle Produkte',nav_cart:'Warenkorb',nav_tickets:'Meine Tickets',
    login:'Anmelden',cookie_settings:'Cookie-Einstellungen ändern',decline:'Ablehnen',accept:'Zustimmen',
    consent_text:'Wir messen mit Google Analytics (über den Google Tag Manager) und Matomo, wie diese Seite genutzt wird – erst nach deiner Zustimmung. IP-Adressen werden anonymisiert.'},
  en:{account:'My account',logged_out:'Not logged in',nav_products:'All products',nav_cart:'Cart',nav_tickets:'My tickets',
    login:'Log in',cookie_settings:'Change cookie settings',decline:'Decline',accept:'Accept',
    consent_text:'We measure how this page is used with Google Analytics (via Google Tag Manager) and Matomo – only after you agree. IP addresses are anonymised.'}
});
let lang = (() => { try { return localStorage.getItem('lang') || 'de'; } catch(e){ return 'de'; } })();
function applyLang(l){
  lang = l; document.documentElement.lang = l;
  try { localStorage.setItem('lang', l); } catch(e){}
  const has = k => k in T[l];
  document.querySelectorAll('[data-i18n]').forEach(e => { if (has(e.dataset.i18n)) e.textContent = T[l][e.dataset.i18n]; });
  document.querySelectorAll('[data-i18n-ph]').forEach(e => { if (has(e.dataset.i18nPh)) e.placeholder = T[l][e.dataset.i18nPh]; });
  document.querySelectorAll('[data-i18n-aria]').forEach(e => { if (has(e.dataset.i18nAria)) e.setAttribute('aria-label', T[l][e.dataset.i18nAria]); });
  document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === l));
  const r = $('result'); if (r) r.textContent = '';
  if (window.onLang) window.onLang();
}
document.querySelectorAll('[data-lang]').forEach(b => b.onclick = () => {
  if (b.dataset.lang !== lang){ applyLang(b.dataset.lang); track('language_change', {language: lang}); }
});

/* ---------- Gemeinsame Klicks (alle Seiten) ---------- */
const loginBtn = $('login-btn');
if (loginBtn) loginBtn.onclick = () => track('login_click', {location: 'header'});
document.querySelectorAll('[data-cta]').forEach(b => b.onclick = () => {
  track('cta_click', {cta_name: b.dataset.cta});
  if (b.dataset.href) setTimeout(() => location.href = b.dataset.href, 150);
});

window.addEventListener('DOMContentLoaded', () => applyLang(lang));