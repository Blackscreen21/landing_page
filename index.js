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

/* ---------- Sprachen ---------- */
const T = {
  de:{account:'Mein Konto',logged_out:'Nicht angemeldet',nav_products:'Alle Produkte',nav_cart:'Warenkorb',nav_tickets:'Meine Tickets',
    login:'Anmelden',headline:'Wohin soll es gehen?',tt_label:'Tickettyp',tt_single:'Einzel- und Tagestickets',tt_season:'Zeitkarten',
    res:'Nur Sitzplatzreservierung',res_hint:'Ich habe schon ein Ticket',from:'Von',to:'Nach',swap:'Von und Nach tauschen',
    search:'Suchen',date:'Datum',time:'Uhrzeit',now:'Jetzt',pax:'Reisende',disc:'Ermäßigung',disc_none:'Keine',
    recent:'Zuletzt gesucht',clear:'Alle löschen',popular:'Beliebte Produkte',all:'Alle Produkte ›',
    p1:'Vorteilscard kaufen',p1d:'Vorteilscard Classic, Jugend & Senior: ÖBB-Standardtickets um 50 % ermäßigt',
    p2:'ÖBB Erlebnistickets',p2d:'Bahn und Freizeitangebot kombinieren und dabei sparen',p3d:'Nahverkehrs-Ticket für 2–5 Personen',
    p4:'Freizeit-Tickets',p4d:'Regionale Tagestickets für den Nahverkehr',trips:'Gemerkte Reisen',routes:'Gemerkte Strecken',
    s1:'Gewünschte Verbindung suchen',s2:'Reisedetails öffnen',s3:'Auf das Herzsymbol bei „Merken“ klicken',
    saved_hint:'Melde dich an, um Verbindungen zu speichern und auf allen Geräten wiederzufinden.',routes_empty:'Noch keine Strecken gemerkt.',
    cookie_settings:'Cookie-Einstellungen ändern',
    consent_text:'Wir messen mit Google Analytics (über den Google Tag Manager) und Matomo, wie diese Seite genutzt wird – erst nach deiner Zustimmung. IP-Adressen werden anonymisiert.',
    decline:'Ablehnen',accept:'Zustimmen',empty:'Noch keine Suchen.',done:'Prototype: Hier würden die Verbindungen erscheinen.',
    missing:'Bitte Start und Ziel angeben.',del:'Entfernen',conn:'Verbindung'},
  en:{account:'My account',logged_out:'Not logged in',nav_products:'All products',nav_cart:'Cart',nav_tickets:'My tickets',
    login:'Log in',headline:'Where to?',tt_label:'Ticket type',tt_single:'Single and day tickets',tt_season:'Season tickets',
    res:'Seat reservation only',res_hint:'I already have a ticket',from:'From',to:'To',swap:'Swap origin and destination',
    search:'Search',date:'Date',time:'Time',now:'Now',pax:'Travellers',disc:'Discount',disc_none:'None',
    recent:'Recent searches',clear:'Clear all',popular:'Popular products',all:'All products ›',
    p1:'Buy Vorteilscard',p1d:'Vorteilscard Classic, Youth & Senior: standard ÖBB tickets at 50% off',
    p2:'ÖBB Experience tickets',p2d:'Combine rail and leisure offers and save',p3d:'Regional ticket for 2–5 people',
    p4:'Leisure tickets',p4d:'Regional day tickets for local transport',trips:'Saved trips',routes:'Saved routes',
    s1:'Search for a connection',s2:'Open trip details',s3:'Click the heart icon next to “Save”',
    saved_hint:'Log in to save connections and find them on all your devices.',routes_empty:'No saved routes yet.',
    cookie_settings:'Change cookie settings',
    consent_text:'We measure how this page is used with Google Analytics (via Google Tag Manager) and Matomo – only after you agree. IP addresses are anonymised.',
    decline:'Decline',accept:'Accept',empty:'No searches yet.',done:'Prototype: connections would appear here.',
    missing:'Please enter origin and destination.',del:'Remove',conn:'Connection'}
};
let lang = 'de';
function applyLang(l){
  lang = l; document.documentElement.lang = l;
  document.querySelectorAll('[data-i18n]').forEach(e => e.textContent = T[l][e.dataset.i18n]);
  document.querySelectorAll('[data-i18n-ph]').forEach(e => e.placeholder = T[l][e.dataset.i18nPh]);
  document.querySelectorAll('[data-i18n-aria]').forEach(e => e.setAttribute('aria-label', T[l][e.dataset.i18nAria]));
  document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === l));
  $('result').textContent = '';
  renderRecent();
}
document.querySelectorAll('[data-lang]').forEach(b => b.onclick = () => {
  if (b.dataset.lang !== lang){ applyLang(b.dataset.lang); track('language_change', {language: lang}); }
});

/* ---------- Suchformular ---------- */
const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset());   // lokales Datum statt UTC
$('date').value = d.toISOString().slice(0,10);
$('swap-btn').onclick = () => { const f = $('from'), t = $('to'); [f.value, t.value] = [t.value, f.value]; track('swap_stations_click'); };
$('now-btn').onclick  = () => { $('time').value = new Date().toTimeString().slice(0,5); track('time_now_click'); };
$('tt').onchange  = () => track('ticket_type_change', {ticket_type: $('tt').value});
$('res').onchange = () => track('reservation_only_toggle', {enabled: $('res').checked});

/* ---------- Zuletzt gesucht (nur lokal im Browser) ---------- */
const RK = 'recent_searches';
const getRecent = () => { try { return JSON.parse(localStorage.getItem(RK)) || []; } catch(e){ return []; } };
const setRecent = a => { try { localStorage.setItem(RK, JSON.stringify(a)); } catch(e){} renderRecent(); };
function renderRecent(){
  const box = $('recent'); box.textContent = '';
  const list = getRecent();
  if (!list.length){ const p = document.createElement('p'); p.className = 'empty'; p.textContent = T[lang].empty; box.appendChild(p); return; }
  list.forEach((r, i) => {
    const chip = document.createElement('div'); chip.className = 'chip';
    const use = document.createElement('button'); use.type = 'button';
    const s = document.createElement('small'); s.textContent = T[lang].conn;
    use.append(s, r.from + ' › ' + r.to);
    use.onclick = () => { $('from').value = r.from; $('to').value = r.to; track('recent_search_click'); };
    const del = document.createElement('button'); del.type = 'button'; del.className = 'del'; del.textContent = '✕';
    del.setAttribute('aria-label', T[lang].del + ': ' + r.from + ' › ' + r.to);
    del.onclick = () => { setRecent(getRecent().filter((_, j) => j !== i)); track('recent_search_delete'); };
    chip.append(use, del); box.appendChild(chip);
  });
}
$('clear-recent').onclick = () => { setRecent([]); track('recent_search_clear'); };

/* ---------- Submit (ein Listener: Validierung, Tracking, Ladebalken) ---------- */
function showProgress(){
  $('loading-progress-bar')?.remove();
  const bar = document.createElement('div');
  bar.id = 'loading-progress-bar'; bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  setTimeout(() => bar.remove(), 2700);
}
$('search-form').addEventListener('submit', e => {
  e.preventDefault();
  const from = $('from').value.trim(), to = $('to').value.trim();
  if (!from || !to){ $('result').textContent = T[lang].missing; (from ? $('to') : $('from')).focus(); return; }
  track('search_submit', {ticket_type: $('tt').value, reservation_only: $('res').checked, travellers: $('pax').value, discount: $('disc').value}); // keine Stationsnamen
  setRecent([{from, to}].concat(getRecent().filter(r => r.from !== from || r.to !== to)).slice(0,4));
  $('result').textContent = T[lang].done;
  showProgress();
});

/* ---------- Weitere KPI-Events ---------- */
$('login-btn').onclick   = () => track('login_click', {location: 'header'});
$('saved-login').onclick = () => track('login_click', {location: 'saved_trips'});
document.querySelectorAll('[data-cta]').forEach(b => b.onclick = () => track('cta_click', {cta_name: b.dataset.cta}));

applyLang('de');