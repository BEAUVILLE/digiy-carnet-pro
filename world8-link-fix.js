/* DIGIY CARNET PRO — navigation commerciale vers la source ADHÉRENT — 20260927 */
(function(){
  'use strict';
  var HOME='https://digiylyfe.com/';
  var ADHERENT='https://digiylyfe.com/tarifs-adherents-1.html?country=sn#carnet-pro';
  var LANGS=['fr','en','es','pt','de','it','nl','ar'];
  var FLAGS={fr:'🇫🇷 FR',en:'🇬🇧 EN',es:'🇪🇸 ES',pt:'🇵🇹 PT',de:'🇩🇪 DE',it:'🇮🇹 IT',nl:'🇳🇱 NL',ar:'🌙 AR'};
  var LABEL={
    fr:'📒 ACTIVER CARNET PRO',
    en:'📒 ACTIVATE CARNET PRO',
    es:'📒 ACTIVAR CARNET PRO',
    pt:'📒 ATIVAR CARNET PRO',
    de:'📒 CARNET PRO AKTIVIEREN',
    it:'📒 ATTIVA CARNET PRO',
    nl:'📒 CARNET PRO ACTIVEREN',
    ar:'📒 تفعيل CARNET PRO'
  };
  var PRICE={
    fr:'CARNET PRO · 13 000 FCFA / mois · tarif unique · aucun palier',
    en:'CARNET PRO · 13,000 FCFA / month · single price · no tiers',
    es:'CARNET PRO · 13 000 FCFA / mes · precio único · sin niveles',
    pt:'CARNET PRO · 13 000 FCFA / mês · preço único · sem níveis',
    de:'CARNET PRO · 13.000 FCFA / Monat · ein Preis · keine Stufen',
    it:'CARNET PRO · 13 000 FCFA / mese · prezzo unico · nessun livello',
    nl:'CARNET PRO · 13.000 FCFA / maand · één prijs · geen niveaus',
    ar:'CARNET PRO · 13 000 FCFA / شهر · سعر واحد · بدون مستويات'
  };
  function active(){
    try{
      var q=(new URLSearchParams(location.search).get('lang')||'').slice(0,2).toLowerCase();
      if(LANGS.indexOf(q)!==-1)return q;
      var s=(localStorage.getItem('digiy-lang')||localStorage.getItem('digiy_lang')||'fr').slice(0,2).toLowerCase();
      return LANGS.indexOf(s)!==-1?s:'fr';
    }catch(e){return'fr'}
  }
  function setLang(l){
    if(LANGS.indexOf(l)===-1)l='fr';
    try{localStorage.setItem('digiy-lang',l);localStorage.setItem('digiy_lang',l)}catch(e){}
    var u=new URL(location.href);u.searchParams.set('lang',l);location.assign(u.pathname+u.search+u.hash);
  }
  function target(){
    var l=active();
    return 'https://digiylyfe.com/tarifs-adherents-1.html?country=sn&lang='+encodeURIComponent(l)+'#carnet-pro';
  }
  function repairCommercialLinks(){
    document.querySelectorAll('a[href*="inscription-pay.html"],a[href*="inscription-world8.html"],a[href*="payer.html"],a[data-digiy-carnet-adhesion],a[data-digiy-carnet-request]').forEach(function(a){
      a.href=target();a.setAttribute('data-digiy-carnet-request','1');a.removeAttribute('data-digiy-carnet-adhesion');a.textContent=LABEL[active()]||LABEL.fr;
    });
    document.querySelectorAll('a[href^="https://tarifs.digiylyfe.com/"],a[href^="https://pro-carnet.digiylyfe.com/pin.html"]').forEach(function(a){a.remove()});
  }
  var OWNER_LABEL={
    fr:'🔐 ACCÈS PROPRIÉTAIRE',
    en:'🔐 OWNER ACCESS',
    es:'🔐 ACCESO PROPIETARIO',
    pt:'🔐 ACESSO DO PROPRIETÁRIO',
    de:'🔐 INHABERZUGANG',
    it:'🔐 ACCESSO PROPRIETARIO',
    nl:'🔐 EIGENAARTOEGANG',
    ar:'🔐 دخول المالك'
  };
  function ownerTarget(){
    return './acces-proprietaire.html?lang='+encodeURIComponent(active());
  }
  function installOwnerAccess(){
    var label=OWNER_LABEL[active()]||OWNER_LABEL.fr;
    var hero=document.querySelector('.hero-actions');
    if(hero&&!hero.querySelector('[data-digiy-carnet-owner]')){
      var a=document.createElement('a');a.className='btn btn-green';a.href=ownerTarget();a.setAttribute('data-digiy-carnet-owner','1');a.textContent=label;hero.appendChild(a);
    }
    var nav=document.querySelector('.topbar .nav')||document.querySelector('nav.nav');
    if(nav&&!nav.querySelector('[data-digiy-carnet-owner]')){
      var n=document.createElement('a');n.href=ownerTarget();n.setAttribute('data-digiy-carnet-owner','1');n.textContent=label;nav.insertBefore(n,nav.querySelector('.langSwitch')||null);
    }
    var dock=document.querySelector('.pay-pro-secure-inner');
    if(dock&&!dock.querySelector('[data-digiy-carnet-owner]')){
      var d=document.createElement('a');d.className='pro';d.href=ownerTarget();d.setAttribute('data-digiy-carnet-owner','1');d.textContent=label;dock.appendChild(d);
    }
  }
  function installPrice(){
    var hero=document.querySelector('.hero-actions');if(!hero)return;
    var badge=document.querySelector('[data-digiy-carnet-public-price]');
    if(!badge){badge=document.createElement('div');badge.setAttribute('data-digiy-carnet-public-price','1');badge.style.cssText='margin:14px 0 6px;padding:12px 14px;border-radius:18px;border:1px solid rgba(214,168,95,.58);background:linear-gradient(135deg,rgba(214,168,95,.16),rgba(168,213,181,.10));color:#f8e7c3;font-size:clamp(14px,2.4vw,18px);font-weight:1000;line-height:1.35;text-align:center';hero.parentNode.insertBefore(badge,hero)}
    var l=active();badge.textContent=PRICE[l]||PRICE.fr;badge.dir=l==='ar'?'rtl':'ltr';
  }
  function repairHome(){
    document.querySelectorAll('a').forEach(function(a){var h=a.getAttribute('href')||'';if(h.indexOf('https://digiy-hub.digiylyfe.com/')===0||h.indexOf('./digiy-hub/')===0){a.href=HOME;if(/hub/i.test(a.textContent||''))a.textContent='🏠 DIGIYLYFE'}});
    var nav=document.querySelector('.topbar .nav')||document.querySelector('nav.nav');
    if(nav&&!nav.querySelector('a[data-digiy-home-return]')){var a=document.createElement('a');a.href=HOME;a.setAttribute('data-digiy-home-return','1');a.textContent='🏠 DIGIYLYFE';nav.insertBefore(a,nav.firstChild)}
  }
  function installWorld8Switch(){
    var wrap=document.querySelector('.langSwitch');if(!wrap)return;var l=active();wrap.innerHTML='';wrap.setAttribute('aria-label','Choisir la langue');wrap.style.display='flex';wrap.style.flexWrap='wrap';wrap.style.gap='6px';wrap.style.maxWidth='100%';wrap.style.borderRadius='18px';wrap.style.alignItems='center';
    LANGS.forEach(function(code){var b=document.createElement('button');b.type='button';b.className='langBtn'+(code===l?' active':'');b.setAttribute('data-lang-btn',code);b.textContent=FLAGS[code];b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();setLang(code)});wrap.appendChild(b)});
  }
  function run(){repairCommercialLinks();installPrice();repairHome();installOwnerAccess();installWorld8Switch()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
  window.addEventListener('pageshow',run);setTimeout(run,250);setTimeout(run,900);
})();