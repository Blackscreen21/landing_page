const GTM_ID = 'GTM-KD3RTMKB';
const KEY = 'analytics_consent';
let consented = false;

/* ---------- Consent + GTM (loads only after consent) ---------- */
function loadGTM(){
  if (consented) return;
  consented = true;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({'gtm.start': Date.now(), event: 'gtm.js'});
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
  document.head.appendChild(s);
}
function track(name, params){            // dropped entirely without consent
  if (!consented) return;
  window.dataLayer.push(Object.assign({event: name}, params || {}));
}
const $ = id => document.getElementById(id);
const banner = $('banner');
const saved = localStorage.getItem(KEY);
if (saved === 'granted') loadGTM(); else if (saved !== 'denied') banner.style.display = 'flex';
$('accept').onclick = () => { localStorage.setItem(KEY,'granted'); banner.style.display='none'; loadGTM(); };
$('decline').onclick = () => { localStorage.setItem(KEY,'denied'); banner.style.display='none'; };
$('reset-consent').onclick = () => { localStorage.removeItem(KEY); location.reload(); };

/* ---------- Language switch ---------- */
const T = {
  de:{nav_products:'Alle Produkte',nav_cart:'Warenkorb',nav_tickets:'Meine Tickets',login:'Anmelden',headline:'Wohin soll es gehen?',
    tt_single:'Einzel- & Tagestickets',tt_season:'Zeitkarten',tt_res:'Nur Sitzplatzreservierung',from:'Von',to:'Nach',
    ph_from:'z. B. Wien Hbf',ph_to:'z. B. Innsbruck',date:'Datum',time:'Uhrzeit',now:'Jetzt',pax:'Reisende',disc:'Ermäßigung',disc_none:'Keine',
    search:'Verbindung suchen',recent:'Zuletzt gesucht',clear:'Alle löschen',saved:'Gespeicherte Reisen und Strecken',
    saved_hint:'Melde dich an, um Verbindungen mit dem Herz-Symbol zu speichern und auf allen Geräten wiederzufinden.',
    popular:'Beliebte Produkte',tag_save:'Spart bis zu 50 %',tag_group:'Für 2–5 Personen',tag_ext:'Externe Seite ↗',
    p_vc:'Classic, Jugend und Senior: ÖBB-Standardtickets um 50 % ermäßigt.',p_er:'Nahverkehrs-Ticket für Gruppen.',
    p_ex:'Bahn und Freizeitangebot kombinieren und sparen.',buy:'Kaufen',view:'Ansehen',cookie_settings:'Cookie-Einstellungen ändern',
    consent_text:'Wir messen mit Google Analytics (über den Google Tag Manager), wie diese Seite genutzt wird – erst nach deiner Zustimmung. IP-Adressen werden anonymisiert.',
    decline:'Ablehnen',accept:'Zustimmen',empty:'Noch keine Suchen.',done:'Prototype: Hier würden die Verbindungen erscheinen.',del:'Entfernen'},
  en:{nav_products:'All products',nav_cart:'Cart',nav_tickets:'My tickets',login:'Log in',headline:'Where to?',
    tt_single:'Single & day tickets',tt_season:'Season tickets',tt_res:'Seat reservation only',from:'From',to:'To',
    ph_from:'e.g. Vienna Hbf',ph_to:'e.g. Innsbruck',date:'Date',time:'Time',now:'Now',pax:'Travellers',disc:'Discount',disc_none:'None',
    search:'Search connections',recent:'Recent searches',clear:'Clear all',saved:'Saved trips and routes',
    saved_hint:'Log in to save connections with the heart icon and find them on all your devices.',
    popular:'Popular products',tag_save:'Save up to 50%',tag_group:'For 2–5 people',tag_ext:'External site ↗',
    p_vc:'Classic, Youth and Senior: standard ÖBB tickets at 50% off.',p_er:'Regional ticket for groups.',
    p_ex:'Combine rail and leisure offers and save.',buy:'Buy',view:'View',cookie_settings:'Change cookie settings',
    consent_text:'We measure how this page is used with Google Analytics (via Google Tag Manager) – only after you agree. IP addresses are anonymised.',
    decline:'Decline',accept:'Accept',empty:'No searches yet.',done:'Prototype: connections would appear here.',del:'Remove'}
};
let lang = 'de';
function applyLang(l){
  lang = l; document.documentElement.lang = l;
  document.querySelectorAll('[data-i18n]').forEach(e => e.textContent = T[l][e.dataset.i18n]);
  document.querySelectorAll('[data-i18n-ph]').forEach(e => e.placeholder = T[l][e.dataset.i18nPh]);
  document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === l));
  renderRecent();
}
document.querySelectorAll('[data-lang]').forEach(b => b.onclick = () => {
  if (b.dataset.lang !== lang){ applyLang(b.dataset.lang); track('language_change', {language: lang}); }
});

/* ---------- Search form ---------- */
$('date').value = new Date().toISOString().slice(0,10);
$('swap-btn').onclick = () => {
  const f = $('from'), t = $('to'); [f.value, t.value] = [t.value, f.value];
  track('swap_stations_click');
};
$('now-btn').onclick = () => { $('time').value = new Date().toTimeString().slice(0,5); track('time_now_click'); };

/* ---------- Recent searches (stored only on the user's device) ---------- */
const RK = 'recent_searches';
const getRecent = () => { try { return JSON.parse(localStorage.getItem(RK)) || []; } catch(e){ return []; } };
const setRecent = a => { try { localStorage.setItem(RK, JSON.stringify(a)); } catch(e){} renderRecent(); };
function renderRecent(){
  const box = $('recent'); box.textContent = '';
  const list = getRecent();
  if (!list.length){ const p = document.createElement('p'); p.className='empty'; p.textContent = T[lang].empty; box.appendChild(p); return; }
  list.forEach((r, i) => {
    const chip = document.createElement('span'); chip.className = 'chip';
    const use = document.createElement('button'); use.type='button'; use.textContent = r.from + ' → ' + r.to;
    use.onclick = () => { $('from').value = r.from; $('to').value = r.to; track('recent_search_click'); };
    const del = document.createElement('button'); del.type='button'; del.className='del'; del.textContent='✕';
    del.setAttribute('aria-label', T[lang].del + ': ' + r.from + ' → ' + r.to);
    del.onclick = () => { setRecent(getRecent().filter((_, j) => j !== i)); track('recent_search_delete'); };
    chip.append(use, del); box.appendChild(chip);
  });
}
$('clear-recent').onclick = () => { setRecent([]); track('recent_search_clear'); };

$('search-form').addEventListener('submit', e => {
  e.preventDefault();
  const from = $('from').value.trim(), to = $('to').value.trim();
  const tt = document.querySelector('input[name="tt"]:checked').value;
  track('search_submit', {ticket_type: tt, travellers: $('pax').value, discount: $('disc').value}); // no station names
  if (from && to) setRecent([{from, to}].concat(getRecent().filter(r => r.from !== from || r.to !== to)).slice(0,4));
  $('result').textContent = T[lang].done;
});
document.querySelectorAll('input[name="tt"]').forEach(r => r.onchange = () => track('ticket_type_change', {ticket_type: r.value}));

/* ---------- Other KPI events ---------- */
$('login-btn').onclick = () => track('login_click', {location: 'header'});
$('saved-login').onclick = () => track('login_click', {location: 'saved_trips'});
document.querySelectorAll('[data-cta]').forEach(b => b.onclick = () => track('cta_click', {cta_name: b.dataset.cta}));

applyLang('de');