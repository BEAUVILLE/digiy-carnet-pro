/* CARNET WORLD8 — navigation publique propre — 20260824 */
(function(){
  'use strict';

  var HOME='https://digiylyfe.com/';
  var CARNET_REQUEST='https://digiylyfe.com/tarifs-adherents-1.html?country=sn&product=carnet-pro';
  var LANGS=['fr','en','es','pt','de','it','nl','ar'];
  var FLAGS={fr:'🇫🇷 FR',en:'🇬🇧 EN',es:'🇪🇸 ES',pt:'🇵🇹 PT',de:'🇩🇪 DE',it:'🇮🇹 IT',nl:'🇳🇱 NL',ar:'🌙 AR'};
  var CARNET_LABEL={
    fr:'📒 S’ABONNER À CARNET PRO',
    en:'📒 SUBSCRIBE TO CARNET PRO',
    es:'📒 SUSCRIBIRSE A CARNET PRO',
    pt:'📒 ASSINAR CARNET PRO',
    de:'📒 CARNET PRO ABONNIEREN',
    it:'📒 ABBONATI A CARNET PRO',
    nl:'📒 ABONNEREN OP CARNET PRO',
    ar:'📒 الاشتراك في CARNET PRO'
  };
  var PRICE_LABEL={
    fr:'ABONNEMENT CARNET PRO · 13 000 FCFA / mois · 20 € / mois',
    en:'CARNET PRO SUBSCRIPTION · 13,000 FCFA / month · €20 / month',
    es:'SUSCRIPCIÓN CARNET PRO · 13 000 FCFA / mes · 20 € / mes',
    pt:'ASSINATURA CARNET PRO · 13 000 FCFA / mês · 20 € / mês',
    de:'CARNET PRO ABONNEMENT · 13.000 FCFA / Monat · 20 € / Monat',
    it:'ABBONAMENTO CARNET PRO · 13.000 FCFA / mese · 20 € / mese',
    nl:'CARNET PRO ABONNEMENT · 13.000 FCFA / maand · € 20 / maand',
    ar:'اشتراك CARNET PRO · 13 000 FCFA شهريًا · 20 € شهريًا'
  };

  function active(){
    try{
      var q=(new URLSearchParams(location.search).get('lang')||'').slice(0,2).toLowerCase();
      if(LANGS.indexOf(q)!==-1) return q;
      var s=(localStorage.getItem('digiy-lang')||localStorage.getItem('digiy_lang')||'fr').slice(0,2).toLowerCase();
      return LANGS.indexOf(s)!==-1?s:'fr';
    }catch(e){return 'fr';}
  }

  function setLang(lang){
    if(LANGS.indexOf(lang)===-1) lang='fr';
    try{
      localStorage.setItem('digiy-lang',lang);
      localStorage.setItem('digiy_lang',lang);
      if(lang==='en') localStorage.setItem('digiy_carnet_pro_lang_v1','en');
      else localStorage.removeItem('digiy_carnet_pro_lang_v1');
    }catch(e){}
    var u=new URL(location.href);
    u.searchParams.set('lang',lang);
    location.assign(u.pathname+u.search+u.hash);
  }

  function removeLegacyCtas(){
    document.querySelectorAll('a').forEach(function(a){
      var h=(a.getAttribute('href')||'').toLowerCase();
      if(h.indexOf('https://tarifs.digiylyfe.com/')===0 ||
         h.indexOf('https://pro-carnet.digiylyfe.com/pin.html')===0){
        a.remove();
      }
    });
    document.querySelectorAll('.pay-pro-secure-inner').forEach(function(box){
      if(box.children.length<=1) box.style.gridTemplateColumns='1fr';
    });
  }

  function repairCarnetRequest(){
    var lang=active();
    document.querySelectorAll('a[href*="inscription-pay.html"],a[href*="inscription-world8.html"],a[data-digiy-carnet-adhesion],a[data-digiy-carnet-request]').forEach(function(a){
      a.href=CARNET_REQUEST;
      a.setAttribute('data-digiy-carnet-request','1');
      a.removeAttribute('data-digiy-carnet-adhesion');
      a.textContent=CARNET_LABEL[lang]||CARNET_LABEL.fr;
    });
  }

  function installPrice(){
    var hero=document.querySelector('.hero-actions');
    if(!hero) return;
    var badge=document.querySelector('[data-digiy-carnet-public-price]');
    if(!badge){
      badge=document.createElement('div');
      badge.setAttribute('data-digiy-carnet-public-price','1');
      badge.style.cssText='margin:14px 0 6px;padding:12px 14px;border-radius:18px;border:1px solid rgba(214,168,95,.58);background:linear-gradient(135deg,rgba(214,168,95,.16),rgba(168,213,181,.10));color:#f8e7c3;font-size:clamp(14px,2.4vw,18px);font-weight:1000;line-height:1.35;text-align:center';
      hero.parentNode.insertBefore(badge,hero);
    }
    var l=active();
    badge.textContent=PRICE_LABEL[l]||PRICE_LABEL.fr;
    badge.dir=l==='ar'?'rtl':'ltr';
  }

  function repairHome(){
    document.querySelectorAll('a').forEach(function(a){
      var h=a.getAttribute('href')||'';
      if(h.indexOf('https://digiy-hub.digiylyfe.com/')===0 || h.indexOf('./digiy-hub/')===0){
        a.href=HOME;
        if(/hub/i.test(a.textContent||'')) a.textContent='🏠 DIGIYLYFE';
      }
    });
    var nav=document.querySelector('.topbar .nav')||document.querySelector('nav.nav');
    if(nav && !nav.querySelector('a[href="https://digiylyfe.com/"]')){
      var home=document.createElement('a');
      home.href=HOME;
      home.setAttribute('data-digiy-home-return','1');
      home.textContent='🏠 DIGIYLYFE';
      nav.insertBefore(home,nav.firstChild);
    }
  }

  function installWorld8Switch(){
    var wrap=document.querySelector('.langSwitch');
    if(!wrap) return;
    var lang=active();
    wrap.innerHTML='';
    wrap.setAttribute('aria-label','Choisir la langue');
    wrap.style.display='flex';
    wrap.style.flexWrap='wrap';
    wrap.style.gap='6px';
    wrap.style.maxWidth='100%';
    wrap.style.borderRadius='18px';
    wrap.style.alignItems='center';
    LANGS.forEach(function(code){
      var b=document.createElement('button');
      b.type='button';
      b.className='langBtn'+(code===lang?' active':'');
      b.setAttribute('data-lang-btn',code);
      b.setAttribute('aria-label','Langue '+code.toUpperCase());
      b.textContent=FLAGS[code];
      b.addEventListener('click',function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        setLang(code);
      });
      wrap.appendChild(b);
    });
  }

  function run(){
    removeLegacyCtas();
    repairCarnetRequest();
    installPrice();
    repairHome();
    installWorld8Switch();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run,{once:true});
  else run();
  window.addEventListener('pageshow',run);
  setTimeout(run,250);
  setTimeout(run,900);
})();
