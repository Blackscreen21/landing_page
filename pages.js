/* Unterseiten: Produkte, Warenkorb, Meine Tickets */
extendT({
  de:{products_h:'Alle Produkte',add:'In den Warenkorb',added:'Zum Warenkorb hinzugefügt: ',cart_h:'Warenkorb',
    cart_empty:'Dein Warenkorb ist leer.',total:'Gesamt',checkout:'Zur Kasse',confirm_h:'Bestellung prüfen',
    confirm_text:'Prototype: Es erfolgt keine echte Zahlung.',confirm:'Kauf bestätigen',remove:'Entfernen',
    tickets_h:'Meine Tickets',tickets_empty:'Noch keine Tickets gekauft.',download:'Ticket herunterladen',
    to_products:'Zu den Produkten',home:'Zur Startseite',ticket_no:'Ticket-Nr.'},
  en:{products_h:'All products',add:'Add to cart',added:'Added to cart: ',cart_h:'Cart',
    cart_empty:'Your cart is empty.',total:'Total',checkout:'Checkout',confirm_h:'Review order',
    confirm_text:'Prototype: no real payment is made.',confirm:'Confirm purchase',remove:'Remove',
    tickets_h:'My tickets',tickets_empty:'No tickets purchased yet.',download:'Download ticket',
    to_products:'To products',home:'Back to start',ticket_no:'Ticket no.'}
});

const CAT = {
  vorteilscard:{price:19.90,name:{de:'Vorteilscard Classic',en:'Vorteilscard Classic'},desc:{de:'ÖBB-Standardtickets um 50 % ermäßigt',en:'Standard ÖBB tickets at 50% off'}},
  erlebnis:{price:29.00,name:{de:'ÖBB Erlebnistickets',en:'ÖBB Experience tickets'},desc:{de:'Bahn und Freizeitangebot kombinieren',en:'Combine rail and leisure offers'}},
  einfach_raus:{price:38.00,name:{de:'Einfach-Raus-Ticket',en:'Einfach-Raus ticket'},desc:{de:'Nahverkehrs-Ticket für 2–5 Personen',en:'Regional ticket for 2–5 people'}},
  freizeit:{price:15.00,name:{de:'Freizeit-Ticket',en:'Leisure ticket'},desc:{de:'Regionales Tagesticket',en:'Regional day ticket'}}
};
const page = document.body.dataset.page;
const money = n => n.toLocaleString(lang === 'de' ? 'de-AT' : 'en-GB', {style:'currency', currency:'EUR'});
const load = k => { try { return JSON.parse(localStorage.getItem(k)) || []; } catch(e){ return []; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} };
function el(tag, cls, text){ const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }
function row(id, p, extra){
  const li = el('li'), r = el('div', 'prow'), ico = el('span', 'ico', '▬'), txt = el('div', 'grow');
  ico.setAttribute('aria-hidden', 'true');
  txt.append(el('strong', '', p.name[lang]), el('small', '', p.desc[lang]));
  r.append(ico, txt, el('span', 'price', money(p.price)));
  extra.forEach(x => r.appendChild(x));
  li.appendChild(r); return li;
}
const cartItems = () => load('cart').filter(id => CAT[id]);
const cartTotal = () => cartItems().reduce((s, id) => s + CAT[id].price, 0);

/* ---------- Produkte ---------- */
function renderProducts(){
  const ul = $('product-list'); ul.textContent = '';
  Object.entries(CAT).forEach(([id, p]) => {
    const b = el('button', 'soft', T[lang].add); b.type = 'button';
    b.onclick = () => {
      const c = load('cart'); if (!c.includes(id)) c.push(id); save('cart', c);
      $('msg').textContent = T[lang].added + p.name[lang];
      track('add_to_cart', {product: id, value: p.price, currency: 'EUR'});
    };
    ul.appendChild(row(id, p, [b]));
  });
}

/* ---------- Warenkorb ---------- */
function renderCart(){
  const items = cartItems(), ul = $('cart-list'); ul.textContent = '';
  $('cart-empty').hidden = items.length > 0;
  $('cart-summary').hidden = items.length === 0;
  if (!items.length) $('confirm').hidden = true;
  items.forEach(id => {
    const b = el('button', 'soft', T[lang].remove); b.type = 'button';
    b.onclick = () => { save('cart', load('cart').filter(x => x !== id)); track('remove_from_cart', {product: id}); renderCart(); };
    ul.appendChild(row(id, CAT[id], [b]));
  });
  $('cart-total').textContent = money(cartTotal());
}
if (page === 'cart'){
  $('checkout-btn').onclick = () => {
    $('confirm').hidden = false;
    track('begin_checkout', {items: cartItems().length, value: cartTotal(), currency: 'EUR'});
  };
  $('confirm-btn').onclick = () => {
    const items = cartItems(), value = cartTotal();
    if (!items.length) return;
    const ref = 'TK-' + Date.now().toString(36).toUpperCase();
    track('purchase', {transaction_id: ref, items: items.length, value, currency: 'EUR'});
    const now = new Date().toISOString().slice(0, 10);
    save('tickets', items.map((id, i) => ({id, ref: ref + '-' + (i + 1), date: now})).concat(load('tickets')));
    save('cart', []);
    setTimeout(() => location.href = 'tickets.html', 250);
  };
}

/* ---------- Meine Tickets ---------- */
function renderTickets(){
  const list = load('tickets').filter(t => CAT[t.id]), ul = $('ticket-list'); ul.textContent = '';
  $('tickets-empty').hidden = list.length > 0;
  list.forEach(t => {
    const p = CAT[t.id];
    const b = el('button', 'soft', T[lang].download); b.type = 'button';
    b.onclick = () => {
      track('ticket_download', {product: t.id});
      const blob = new Blob(['ÖBB Ticketshop Prototype\n' + p.name[lang] + '\n' + T[lang].ticket_no + ' ' + t.ref + '\n' + t.date + '\n'], {type: 'text/plain'});
      const a = el('a'); a.href = URL.createObjectURL(blob); a.download = t.ref + '.txt'; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    };
    const li = row(t.id, p, [b]);
    li.querySelector('small').textContent = T[lang].ticket_no + ' ' + t.ref + ' · ' + t.date;
    ul.appendChild(li);
  });
}

window.onLang = () => {
  if (page === 'products') renderProducts();
  if (page === 'cart') renderCart();
  if (page === 'tickets') renderTickets();
};