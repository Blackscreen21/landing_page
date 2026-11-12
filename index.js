extendT({
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
    missing:'Bitte Start und Ziel angeben.',del:'Entfernen',conn:'Verbindung', d_choose: 'Auswählen', disc_count: 'Ermäßigungen gewählt'},
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
    missing:'Please enter origin and destination.',del:'Remove',conn:'Connection', d_choose: 'Select', disc_count: 'discounts selected'}
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

  const selectedDiscounts = getSelectedDiscounts().map(d => d.de);
  track('search_submit', {
    ticket_type: $('tt').value,
    reservation_only: $('res').checked,
    travellers: $('pax').value,
    discounts: selectedDiscounts.join(', ') || 'none'
  });

  setRecent([{from, to}].concat(getRecent().filter(r => r.from !== from || r.to !== to)).slice(0,4));
  $('result').textContent = T[lang].done;
  showProgress();
});

/* ---------- Weitere KPI-Events ---------- */
$('saved-login').onclick = () => track('login_click', {location: 'saved_trips'});

/* ---------- Ermäßigungen-Verknüpfung & Übersetzungen ---------- */
extendT({
  de:{ disc_count: 'Ermäßigungen gewählt' },
  en:{ disc_count: 'discounts selected' }
});

const KEY_D = 'discounts';

// Clear discounts on direct page reload unless returning from discounts.html
if (!sessionStorage.getItem('from_discounts')) {
  localStorage.removeItem(KEY_D);
} else {
  sessionStorage.removeItem('from_discounts');
}

const getSelectedDiscounts = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY_D));
    if (!Array.isArray(raw)) return [];
    return raw.map(item => {
      if (!item) return null;
      const deVal = typeof item === 'string' ? item : (item.de || item.en);
      const enVal = typeof item === 'string' ? item : (item.en || item.de);
      if (!deVal || deVal === 'undefined' || enVal === 'undefined') return null;
      return { de: deVal, en: enVal };
    }).filter(Boolean);
  } catch(e){ return []; }
};

function updateDiscountButton(){
  const list = getSelectedDiscounts();
  const summary = $('disc-summary');
  if (!summary) return;

  if (!list.length){
    summary.textContent = T[lang].disc_none;
  } else {
    const names = list.map(d => {
      const fullPath = d[lang] || d.de;
      const parts = fullPath.split(' › ');
      return parts[parts.length - 1];
    });
    summary.innerHTML = names.join('<br>');
  }
}

$('disc-btn').onclick = () => {
  track('open_discounts_selector');
  location.href = 'discounts.html';
};

window.onLang = () => {
  renderRecent();
  updateDiscountButton();
};