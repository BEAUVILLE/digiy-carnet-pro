/* CARNET WORLD8 — public routes + DIGIYLYFE home return — production */
(function(){
  'use strict';
  var HOME='https://digiylyfe.com/';
  var ADHESION='https://digiylyfe.com/tarifs-adherents-1.html?country=sn';
  var ADHESION_LABEL={
    fr:'📝 DEMANDER L’ADHÉSION',
    en:'📝 REQUEST MEMBERSHIP',
    es:'📝 SOLICITAR ADHESIÓN',
    pt:'📝 PEDIR ADESÃO',
    it:'📝 RICHIEDI ADESIONE',
    de:'📝 MITGLIEDSCHAFT BEANTRAGEN',
    nl:'📝 LIDMAATSCHAP AANVRAGEN',
    ar:'📝 طلب العضوية'
  };
  function active(){
    try{
      var x=(new URLSearchParams(location.search).get('lang')||localStorage.getItem('digiy-lang')||localStorage.getItem('digiy_lang')||'fr').slice(0,2).toLowerCase();
      return /^(fr|en|es|pt|de|it|nl|ar)$/.test(x)?x:'fr';
    }catch(e){return'fr'}
  }
  function removeLegacyCtas(){
    document.querySelectorAll('a').forEach(function(a){
      var h=(a.getAttribute('href')||'').toLowerCase();
      var t=(a.textContent||'').replace(/\s+/g,' ').trim();
      var oldPricing=h.indexOf('https://tarifs.digiylyfe.com/')===0 || /^💳?\s*tarifs?$/i.test(t);
      var oldOpen=h.indexOf('https://pro-carnet.digiylyfe.com/pin.html')===0 || /ouvrir\s+pro\s+carnet/i.test(t);
      if(oldPricing || oldOpen) a.remove();
    });
  }
  function run(){
    var l=active();
    document.querySelectorAll('a[href*="inscription-pay.html"],a[href*="inscription-world8.html"],a[data-digiy-carnet-adhesion]').forEach(function(a){
      if(a.href!==ADHESION) a.href=ADHESION;
      a.setAttribute('data-digiy-carnet-adhesion','1');
      var label=ADHESION_LABEL[l]||ADHESION_LABEL.fr;
      if(a.textContent!==label) a.textContent=label;
    });
    removeLegacyCtas();
    document.querySelectorAll('a').forEach(function(a){
      var h=a.getAttribute('href')||'';
      if(h.indexOf('https://digiy-hub.digiylyfe.com/')===0 || h.indexOf('./digiy-hub/')===0){
        a.href=HOME;
        if(/hub/i.test(a.textContent||'') && a.textContent!=='🏠 DIGIYLYFE') a.textContent='🏠 DIGIYLYFE';
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
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run,{once:true}); else run();
  new MutationObserver(run).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['href','lang','dir']});
})();
