(function(){

/*
   n('Name', [Unterpunkte])              -> Name in DE und EN gleich
   n('Name DE', 'Name EN', [Unterpunkte])-> Name pro Sprache
   n('Name') / n('Name DE','Name EN')    -> Endpunkt (wird angewendet)
  */
const n = (de, a, b) => Array.isArray(a) ? {name:{de, en:de}, next:a}
                      : {name:{de, en:a || de}, next:b || []};

  const STEPS = [
    n('ÖBB Vorteilscards & ÖBB Cards', [
      n('Vorteilscard Comfort'),
      n('Vorteilscard Classic'),
      n('Vorteilscard Jugend', 'Vorteilscard Youth'),
      n('Vorteilscard Senior'),
      n('Vorteilscard Family'),
      n('Vorteilscard Family Vorarlberg'),
      n('Vorteilscard Senior Frei'),
      n('ÖBB Reservierungsvorteil', 'ÖBB Reservation Advantage'),
      n('Klimaticket Ö-Vorteilsabo')
    ]),
    n('Klimaticket Österreich', 'Climate Ticket Austria', [
      n('Klimaticket Ö Classic', [
        n('KlimaTicket Ö Classic'),
        n('KlimaTicket Ö Classic Familie')
      ]),
      n('Klimaticket Ö Jugend', 'Climate Ticket Austria Youth', [
        n('KlimaTicket Ö Jugend'),
        n('KlimaTicket Ö Jugend Familie')
      ]),
      n('Klimaticket Ö Senior', 'Climate Ticket Austria Senior', [
        n('KlimaTicket Ö Senior'),
        n('KlimaTicket Ö Senior Familie')
      ]),
      n('Klimaticket Ö Spezial', 'Climate Ticket Austria Special', [
        n('KlimaTicket Ö Spezial'),
        n('KlimaTicket Ö Spezial Familie')
      ]),
      n('Klimaticket Ö Sonderstatus', 'Climate Ticket Austria Special Status', [
        n('KlimaTicket Ö Bundesheer'),
        n('KlimaTicket Ö Zivildienst'),
        n('KlimaTicket Ö Freiwilligendienst')
      ]),
      n('1. Klasse zum Klimaticket Österreich', '1st Class Upgrade Climate Ticket Austria', [
        n('1.Klasse zum KlimaTicket Ö Classic'),
        n('1.Klasse zum KlimaTicket Ö Classic Familie'),
        n('1.Klasse zum KlimaTicket Ö Jugend'),
        n('1.Klasse zum KlimaTicket Ö Jugend Familie'),
        n('1.Klasse zum KlimaTicket Ö Senior'),
        n('1.Klasse zum KlimaTicket Ö Senior Familie'),
        n('1.Klasse zum KlimaTicket Ö Spezial'),
        n('1.Klasse zum KlimaTicket Ö Spezial Familie'),
        n('1.Klasse zum KlimaTicket Ö Bundesheer'),
        n('1.Klasse zum KlimaTicket Ö Zivildienst'),
        n('1.Klasse zum KlimaTicket Ö Freiwilligendienst')
      ])
    ]),
    n('Bundesländer & Regionaltickets', 'Federal State & Regional Tickets', [
      n('Steiermark', 'Styria', [
        n('Klimaticket Steiermark'),
        n('SchülerInnen-/Lehrlings Top-Ticket Steiermark'),
        n('Top-Ticket Studierende Steiermark'),
        n('Ticket für Graz (Zone 101)'),
        n('Ticket für Leoben (Zone 102)'),
        n('Ticket für Bruck/Mur (Zone 103)'),
        n('Steir. Familienpass')
      ]),
      n('Tirol', 'Tyrol', [
        n('VVT Netzkarte Tirol'),
        n('Euregio FamilyPass Tirol'),
        n('Euregio Ticket Students'),
        n('Ticket Stadtverkehr Innsbruck'),
        n('KlimaTicket Innsbruck'),
        n('KlimaTicket Innsbruck (Partner)'),
        n('KlimaTicket Kufstein'),
        n('KlimaTicket Lienz'),
        n('KlimaTicket Schwaz'),
        n('KlimaTicket Schwaz Ermäßigt'),
        n('KlimaTicket Tirol SeniorIn'),
        n('KlimaTicket St. Anton'),
        n('KlimaTicket Tirol'),
        n('KlimaTicket Tirol PlusEins-Bonus'),
        n('KlimaTicket Tirol Spezial'),
        n('KlimaTicket Tirol U26'),
        n('Lehrticket Tirol'),
        n('Schulticket Tirol'),
        n('Semesterticket Innsbruck'),
        n('Semesterticket Tirol'),
        n('KlimaTicket Tirol Ausgleichszulage'),
        n('Aufzahlung Innsbruck > Land'),
        n('Aufzahlung Innsbruck > Region 14'),
        n('Aufzahlung Innsbruck > Region 15'),
        n('Aufzahlung Region > Land'),
        n('KlimaTicket Tirol Regionen (Individual Combinations)', [
          n('KlimaTicket Tirol Regionen 01+02'),
          n('KlimaTicket Tirol Regionen 02+03'),
          n('KlimaTicket Tirol Regionen 02+07'),
          n('KlimaTicket Tirol Regionen 03+09'),
          n('KlimaTicket Tirol Regionen 04+05'),
          n('KlimaTicket Tirol Regionen 04+07'),
          n('KlimaTicket Tirol Regionen 05+06'),
          n('KlimaTicket Tirol Regionen 06+08'),
          n('KlimaTicket Tirol Regionen 07+08'),
          n('KlimaTicket Tirol Regionen 07+09'),
          n('KlimaTicket Tirol Regionen 07+10'),
          n('KlimaTicket Tirol Regionen 08+10'),
          n('KlimaTicket Tirol Regionen 08+12'),
          n('KlimaTicket Tirol Regionen 10+12'),
          n('KlimaTicket Tirol Regionen 11+12'),
          n('KlimaTicket Tirol Regionen 11+14'),
          n('KlimaTicket Tirol Regionen 12+14'),
          n('KlimaTicket Tirol Regionen 13+14'),
          n('KlimaTicket Tirol Regionen 13+15'),
          n('KlimaTicket Tirol Regionen 14+16'),
          n('KlimaTicket Tirol Regionen 14+17'),
          n('KlimaTicket Tirol Regionen 15+17'),
          n('KlimaTicket Tirol Regionen 15+18'),
          n('KlimaTicket Tirol Regionen 16+17'),
          n('KlimaTicket Tirol Regionen 18+19'),
          n('KlimaTicket Tirol Regionen 19+20'),
          n('KlimaTicket Tirol Regionen 19+21'),
          n('KlimaTicket Tirol Regionen 19+22'),
          n('KlimaTicket Tirol Regionen 21+22'),
          n('KlimaTicket Tirol Regionen 22+23'),
          n('KlimaTicket Tirol Regionen 22+25'),
          n('KlimaTicket Tirol Regionen 23+24'),
          n('KlimaTicket Tirol Regionen 23+25'),
          n('KlimaTicket Tirol Regionen 24+26'),
          n('KlimaTicket Tirol Regionen 25+26'),
          n('KlimaTicket Tirol Regionen 25+27'),
          n('KlimaTicket Tirol Regionen 26+27'),
          n('KlimaTicket Tirol Regionen 28+29'),
          n('KlimaTicket Tirol Regionen 29+30')
        ])
      ]),
      n('Oberösterreich', 'Upper Austria', [
        n('KlimaTicket OÖ Gesamt Classic'),
        n('KlimaTicket OÖ Gesamt Junior'),
        n('KlimaTicket OÖ Gesamt Senior'),
        n('KlimaTicket OÖ Gesamt Spezial'),
        n('KlimaTicket OÖ Regional Classic'),
        n('KlimaTicket OÖ Regional Junior'),
        n('KlimaTicket OÖ Regional Senior'),
        n('KlimaTicket OÖ Regional Spezial'),
        n('KlimaTicket OÖ Regional + Linz Classic'),
        n('KlimaTicket OÖ Regional + Linz Junior'),
        n('KlimaTicket OÖ Regional + Linz Senior'),
        n('KlimaTicket OÖ Regional + Linz Spezial'),
        n('KlimaTicket OÖ Regional + Steyr Classic'),
        n('KlimaTicket OÖ Regional + Steyr Junior'),
        n('KlimaTicket OÖ Regional + Steyr Senior'),
        n('KlimaTicket OÖ Regional + Steyr Spezial'),
        n('KlimaTicket OÖ Regional + Wels Classic'),
        n('KlimaTicket OÖ Regional + Wels Junior'),
        n('KlimaTicket OÖ Regional + Wels Senior'),
        n('KlimaTicket OÖ Regional + Wels Spezial'),
        n('KlimaTicket OÖ Kernzone Wels'),
        n('Jugendticket-Netz Oberösterreich'),
        n('Familienkarte des Landes Oberösterreich')
      ]),
      n('Wien, Niederösterreich & Burgenland', 'Vienna, Lower Austria & Burgenland', [
        n('VOR KlimaTicket MetropolRegion'),
        n('VOR KlimaTicket Region'),
        n('Top Jugendticket Wien, NÖ, Bgld'),
        n('Ticket Stadtverkehr Wien (Kernzone) exkl. Jahreskarte'),
        n('Jahreskarte Stadtverkehr Wien (Kernzone)')
      ]),
      n('Salzburg', [
        n('KlimaTicket Salzburg'),
        n('SUPER s\'COOL-CARD Salzburg'),
        n('Salzburger Familienpass'),
        n('Guest Mobility Ticket Salzburg'),
        n('Ticket Stadtverkehr Stadt Salzburg')
      ]),
      n('Kärnten', 'Carinthia', [
        n('KlimaTicket Kärnten'),
        n('Jugend.Mobil ticket Kärnten')
      ]),
      n('Vorarlberg', [
        n('Maximo Ticket Vorarlberg'),
        n('Vorarlberger Familienpass'),
        n('Zulassungskarte zu at.Fbg.')
      ]),
      n('Linz', [
        n('Ticket Stadtverkehr Linz')
      ])
    ]),
    n('Ermäßigte & Barrierefreie Ausweise', 'Disability & Accessibility Passes', [
      n('Österr. Behindertenpass (ab 70% GdB / Zusatzeintrag)'),
      n('Österr. Beh. Pass (weniger 70% GdB + Vermerk Begl.)'),
      n('Blind bzw. hochgradig sehbehindert'),
      n('EU Disability Card')
    ]),
    n('Internationale Bahntickets & Karten', 'International Rail Tickets & Cards', [
      n('DB BahnCard', [
        n('DB BahnCard 25 2. Klasse'),
        n('DB BahnCard 25 1. Klasse'),
        n('DB BahnCard 50 2. Klasse'),
        n('DB BahnCard 50 1. Klasse'),
        n('DB BahnCard 100 2. Klasse'),
        n('DB BahnCard 100 1. Klasse')
      ]),
      n('SBB (Schweiz)', 'SBB (Switzerland)', [
        n('SBB Halbtax-Abo'),
        n('SBB General-Abo 2. Klasse'),
        n('SBB General-Abo 1. Klasse')
      ]),
      n('CD (Tschechien)', 'CD (Czech Republic)', [
        n('In Karta 100'),
        n('In Karta 50'),
        n('In Karta 25'),
        n('Ticket-Tschechien 1. Kl vorhanden'),
        n('Ticket-Tschechien 2. Kl vorhanden')
      ]),
      n('MAV (Ungarn)', 'MAV (Hungary)', [
        n('MAV START Klub'),
        n('MAV START Klub Bónusz'),
        n('MAV START Klub VIP'),
        n('Ticket-Ungarn 1. Kl vorhanden'),
        n('Ticket-Ungarn 2. Kl vorhanden')
      ]),
      n('ZSSK (Slowakei)', 'ZSSK (Slovakia)', [
        n('ZSSK Junior'),
        n('ZSSK Klasik'),
        n('ZSSK Maxi Klasik 1. Klasse'),
        n('ZSSK Maxi Klasik 2. Klasse'),
        n('Ticket-Slowakei 1. Kl vorhanden'),
        n('Ticket-Slowakei 2. Kl vorhanden')
      ]),
      n('Italien', 'Italy', [
        n('Green card ("Carta Verde")'),
        n('Silver Card ("Carta d\'Argento")')
      ]),
      n('Weitere Länder', 'Other Countries', [
        n('Ticket-Dänemark 1. Kl vorhanden'),
        n('Ticket-Dänemark 2. Kl vorhanden'),
        n('Ticket-Kroatien 1. Kl vorhanden'),
        n('Ticket-Kroatien 2. Kl vorhanden'),
        n('Ticket-Schweiz 1. Kl vorhanden'),
        n('Ticket-Schweiz 2. Kl vorhanden'),
        n('Ticket-Slowenien 1. Kl vorhanden'),
        n('Ticket-Slowenien 2. Kl vorhanden'),
        n('Ticket Niederland 1. Klasse vorhanden'),
        n('Ticket Niederlande 2. Klasse vorhanden'),
        n('Interrail Globalpass')
      ])
    ]),
    n('Ausweise & Clubs', 'ID Cards & Clubs', [
      n('Studentenausweis', 'Student ID'),
      n('ÖAMTC'),
      n('ARBÖ'),
      n('ADAC')
    ])
  ];





extendT({
  de:{d_choose:'Auswählen',d_back:'Zurück',d_applied_h:'Angewendete Ermäßigungen',d_none:'Noch keine Ermäßigung angewendet.',
      d_done:'Ermäßigung angewendet: ',d_remove:'Entfernen',d_apply:'Anwenden',d_pick:'Wähle eine Ermäßigung.', d_apply_back: 'Auswahl übernehmen & Zurück'},
  en:{d_choose:'Select',d_back:'Back',d_applied_h:'Applied discounts',d_none:'No discount applied yet.',
      d_done:'Discount applied: ',d_remove:'Remove',d_apply:'Apply',d_pick:'Choose a discount.', d_apply_back: 'Apply selections & Back'}
});

  const KEY_D = 'discounts';
  const navEntry = performance.getEntriesByType('navigation')[0];
  if (navEntry && navEntry.type === 'reload') {
    localStorage.removeItem(KEY_D);
  }
  let path = [];
  const loadD = () => {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY_D));
      if (!Array.isArray(raw)) return [];
      return raw.map(item => {
        if (typeof item === 'string') return { de: item, en: item };
        if (item && typeof item === 'object' && (item.de || item.en)) {
          return { de: item.de || item.en, en: item.en || item.de };
        }
        return null;
      }).filter(Boolean);
    } catch(e){ return []; }
  };
  const saveD = v => { try { localStorage.setItem(KEY_D, JSON.stringify(v)); } catch(e){} };
  const nm = x => x.name[lang];

function mk(tag, cls, text){
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}
function mkRow(title, sub, icon, btnText, onClick){
  const li = mk('li'), r = mk('div', 'prow'), ico = mk('span', 'ico', icon), txt = mk('div', 'grow');
  ico.setAttribute('aria-hidden', 'true');
  txt.appendChild(mk('strong', '', title));
  if (sub) txt.appendChild(mk('small', '', sub));
  r.append(ico, txt);
  const b = mk('button', 'soft', btnText); b.type = 'button'; b.onclick = onClick;
  r.appendChild(b); li.appendChild(r); return li;
}

function render(){
  const ul = $('product-list'); ul.textContent = '';
  if (path.length){
    const last = path[path.length - 1];
    ul.appendChild(mkRow(nm(last), path.map(nm).join(' › '), '✓', T[lang].d_back, () => { path.pop(); render(); track('discount_back'); }));
  }
  const options = path.length ? path[path.length - 1].next : STEPS;
  options.forEach(o => {
    const leaf = !o.next || !o.next.length;
    ul.appendChild(mkRow(nm(o), '', '▬', leaf ? T[lang].d_apply : T[lang].d_choose, () => choose(o, leaf)));
  });
  $('msg').textContent = path.length ? '' : T[lang].d_pick;
  renderApplied();
}

function choose(o, leaf){
  if (!leaf){ path.push(o); render(); track('discount_step', {step: path.length}); return; }
  const full = path.concat(o);
  const label = {de: full.map(x => x.name.de).join(' › '), en: full.map(x => x.name.en).join(' › ')};
  const list = loadD().filter(x => x.de !== label.de);
  list.push(label); saveD(list);
  path = [];
  render();
  $('msg').textContent = T[lang].d_done + label[lang];
  track('discount_apply', {discount: label.de});
}

function renderApplied(){
  const h = $('applied-h'), ul = $('applied-list');
  if (!ul) return;
  if (h) h.textContent = T[lang].d_applied_h;
  ul.textContent = '';
  const list = loadD();
  if (!list.length){ ul.appendChild(mk('li', 'empty', T[lang].d_none)); return; }
  list.forEach(x => ul.appendChild(mkRow(x[lang], '', '%', T[lang].d_remove, () => {
    saveD(loadD().filter(y => y.de !== x.de)); renderApplied(); track('discount_remove');
  })));
}

window.onLang = render;
})();
