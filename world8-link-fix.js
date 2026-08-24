/* CARNET WORLD8 — navigation + paiement public propre — 20260824 */
(function(){
  'use strict';

  var HOME='https://digiylyfe.com/';
  var CARNET_REQUEST='#digiy-carnet-paiement';
  var DOSSIER='https://digiylyfe.com/preparer-ma-carte.html?product=carnet-pro';
  var PHONE='+221771342889';
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
  var PAYMENT_COPY={
    fr:{eyebrow:'ABONNEMENT AUTONOME',title:'Régler CARNET PRO',lead:'Choisissez simplement votre règlement selon votre pays. Le paiement reste direct ; DIGIYLYFE ne prend aucune commission.',snTitle:'🇸🇳 SÉNÉGAL',snPrice:'13 000 FCFA / mois',snMethod:'WAVE',snName:'JB BEAVILLE',euTitle:'🇫🇷 FRANCE / EUROPE',euPrice:'20 € / mois',euMethod:'SENDWAVE → WAVE SÉNÉGAL',euName:'Jean Baptiste Beauville',after:'Après le règlement, transmettez votre preuve pour ouvrir votre dossier CARNET PRO.',paid:'✅ J’AI PAYÉ — PRÉPARER MON DOSSIER CARNET PRO →'},
    en:{eyebrow:'STANDALONE SUBSCRIPTION',title:'Pay for CARNET PRO',lead:'Choose the payment method for your country. Payment stays direct; DIGIYLYFE takes no commission.',snTitle:'🇸🇳 SENEGAL',snPrice:'13,000 FCFA / month',snMethod:'WAVE',snName:'JB BEAVILLE',euTitle:'🇫🇷 FRANCE / EUROPE',euPrice:'€20 / month',euMethod:'SENDWAVE → WAVE SENEGAL',euName:'Jean Baptiste Beauville',after:'After payment, send your proof to open your CARNET PRO file.',paid:'✅ I HAVE PAID — PREPARE MY CARNET PRO FILE →'},
    es:{eyebrow:'SUSCRIPCIÓN AUTÓNOMA',title:'Pagar CARNET PRO',lead:'Elija el método de pago según su país. El pago es directo; DIGIYLYFE no cobra comisión.',snTitle:'🇸🇳 SENEGAL',snPrice:'13 000 FCFA / mes',snMethod:'WAVE',snName:'JB BEAVILLE',euTitle:'🇫🇷 FRANCIA / EUROPA',euPrice:'20 € / mes',euMethod:'SENDWAVE → WAVE SENEGAL',euName:'Jean Baptiste Beauville',after:'Después del pago, envíe el justificante para abrir su expediente CARNET PRO.',paid:'✅ HE PAGADO — PREPARAR MI EXPEDIENTE CARNET PRO →'},
    pt:{eyebrow:'ASSINATURA AUTÓNOMA',title:'Pagar CARNET PRO',lead:'Escolha o meio de pagamento conforme o seu país. O pagamento é direto; a DIGIYLYFE não cobra comissão.',snTitle:'🇸🇳 SENEGAL',snPrice:'13 000 FCFA / mês',snMethod:'WAVE',snName:'JB BEAVILLE',euTitle:'🇫🇷 FRANÇA / EUROPA',euPrice:'20 € / mês',euMethod:'SENDWAVE → WAVE SENEGAL',euName:'Jean Baptiste Beauville',after:'Após o pagamento, envie o comprovativo para abrir o seu processo CARNET PRO.',paid:'✅ JÁ PAGUEI — PREPARAR O MEU PROCESSO CARNET PRO →'},
    de:{eyebrow:'EIGENSTÄNDIGES ABONNEMENT',title:'CARNET PRO bezahlen',lead:'Wählen Sie die Zahlung passend zu Ihrem Land. Die Zahlung erfolgt direkt; DIGIYLYFE erhebt keine Provision.',snTitle:'🇸🇳 SENEGAL',snPrice:'13.000 FCFA / Monat',snMethod:'WAVE',snName:'JB BEAVILLE',euTitle:'🇫🇷 FRANKREICH / EUROPA',euPrice:'20 € / Monat',euMethod:'SENDWAVE → WAVE SENEGAL',euName:'Jean Baptiste Beauville',after:'Nach der Zahlung senden Sie den Nachweis, um Ihren CARNET-PRO-Antrag zu öffnen.',paid:'✅ ICH HABE BEZAHLT — CARNET-PRO-ANTRAG VORBEREITEN →'},
    it:{eyebrow:'ABBONAMENTO AUTONOMO',title:'Pagare CARNET PRO',lead:'Scegli il pagamento in base al tuo Paese. Il pagamento resta diretto; DIGIYLYFE non prende commissioni.',snTitle:'🇸🇳 SENEGAL',snPrice:'13.000 FCFA / mese',snMethod:'WAVE',snName:'JB BEAVILLE',euTitle:'🇫🇷 FRANCIA / EUROPA',euPrice:'20 € / mese',euMethod:'SENDWAVE → WAVE SENEGAL',euName:'Jean Baptiste Beauville',after:'Dopo il pagamento, invia la prova per aprire il tuo dossier CARNET PRO.',paid:'✅ HO PAGATO — PREPARA IL MIO DOSSIER CARNET PRO →'},
    nl:{eyebrow:'ZELFSTANDIG ABONNEMENT',title:'CARNET PRO betalen',lead:'Kies de betaling voor uw land. De betaling blijft rechtstreeks; DIGIYLYFE rekent geen commissie.',snTitle:'🇸🇳 SENEGAL',snPrice:'13.000 FCFA / maand',snMethod:'WAVE',snName:'JB BEAVILLE',euTitle:'🇫🇷 FRANKRIJK / EUROPA',euPrice:'€ 20 / maand',euMethod:'SENDWAVE → WAVE SENEGAL',euName:'Jean Baptiste Beauville',after:'Stuur na betaling uw bewijs om uw CARNET PRO-dossier te openen.',paid:'✅ IK HEB BETAALD — MIJN CARNET PRO-DOSSIER VOORBEREIDEN →'},
    ar:{eyebrow:'اشتراك مستقل',title:'دفع اشتراك CARNET PRO',lead:'اختر طريقة الدفع حسب بلدك. الدفع مباشر وDIGIYLYFE لا تأخذ أي عمولة.',snTitle:'🇸🇳 السنغال',snPrice:'13 000 FCFA شهريًا',snMethod:'WAVE',snName:'JB BEAVILLE',euTitle:'🇫🇷 فرنسا / أوروبا',euPrice:'20 € شهريًا',euMethod:'SENDWAVE ← WAVE السنغال',euName:'Jean Baptiste Beauville',after:'بعد الدفع أرسل إثبات الدفع لفتح ملف CARNET PRO.',paid:'✅ لقد دفعت — إعداد ملف CARNET PRO ←'}
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

  function installPayment(){
    var main=document.querySelector('main');
    if(!main) return;
    var section=document.getElementById('digiy-carnet-paiement');
    if(!section){
      var style=document.createElement('style');
      style.setAttribute('data-digiy-carnet-payment-style','1');
      style.textContent='#digiy-carnet-paiement{scroll-margin-top:90px;padding:24px 0 120px}.digiyCarnetPayBox{border:1px solid rgba(214,168,95,.46);border-radius:28px;padding:22px;background:linear-gradient(145deg,rgba(214,168,95,.10),rgba(168,213,181,.07));box-shadow:0 20px 52px rgba(0,0,0,.22)}.digiyCarnetPayHead{text-align:center;max-width:760px;margin:0 auto 18px}.digiyCarnetPayEye{display:inline-flex;padding:7px 11px;border-radius:999px;border:1px solid rgba(214,168,95,.45);color:#f8e7c3;font-size:11px;font-weight:1000;letter-spacing:.08em}.digiyCarnetPayHead h2{margin:12px 0 6px;font-size:clamp(28px,5vw,44px);line-height:1;font-weight:1000}.digiyCarnetPayHead p{margin:0;color:rgba(255,255,255,.74);font-weight:800;line-height:1.5}.digiyCarnetPayGrid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.digiyCarnetPayCard{border:1px solid rgba(255,255,255,.13);border-radius:22px;padding:18px;background:rgba(255,255,255,.055)}.digiyCarnetPayCard h3{margin:0;font-size:18px}.digiyCarnetPayPrice{margin:10px 0;font-size:clamp(28px,5vw,38px);font-weight:1000;color:#f8e7c3}.digiyCarnetPayMethod{margin:0 0 10px;font-size:13px;font-weight:1000;color:#a8d5b5}.digiyCarnetPayIdentity{margin:0 0 14px;line-height:1.55;font-weight:850}.digiyCarnetPayIdentity a{color:#f8e7c3;text-decoration:none}.digiyCarnetPaid{display:flex;min-height:56px;align-items:center;justify-content:center;padding:12px 15px;border-radius:18px;background:linear-gradient(135deg,#d6a85f,#f3d49a);color:#17120e;font-weight:1000;text-align:center;text-decoration:none}.digiyCarnetPayAfter{margin:16px 0 0;text-align:center;color:rgba(255,255,255,.75);font-size:12px;font-weight:850;line-height:1.45}@media(max-width:720px){.digiyCarnetPayGrid{grid-template-columns:1fr}.digiyCarnetPayBox{padding:16px}}';
      document.head.appendChild(style);
      section=document.createElement('section');
      section.id='digiy-carnet-paiement';
      section.innerHTML='<div class="wrap"><div class="digiyCarnetPayBox"><div class="digiyCarnetPayHead"><span class="digiyCarnetPayEye" data-pay-eye></span><h2 data-pay-title></h2><p data-pay-lead></p></div><div class="digiyCarnetPayGrid"><article class="digiyCarnetPayCard"><h3 data-pay-sn-title></h3><div class="digiyCarnetPayPrice" data-pay-sn-price></div><p class="digiyCarnetPayMethod" data-pay-sn-method></p><p class="digiyCarnetPayIdentity"><strong data-pay-sn-name></strong><br><a href="tel:+221771342889">+221 77 134 28 89</a></p><a class="digiyCarnetPaid" data-pay-sn-paid></a></article><article class="digiyCarnetPayCard"><h3 data-pay-eu-title></h3><div class="digiyCarnetPayPrice" data-pay-eu-price></div><p class="digiyCarnetPayMethod" data-pay-eu-method></p><p class="digiyCarnetPayIdentity"><strong data-pay-eu-name></strong><br><a href="tel:+221771342889">+221 77 134 28 89</a></p><a class="digiyCarnetPaid" data-pay-eu-paid></a></article></div><p class="digiyCarnetPayAfter" data-pay-after></p></div></div>';
      main.appendChild(section);
    }

    var l=active();
    var c=PAYMENT_COPY[l]||PAYMENT_COPY.fr;
    section.dir=l==='ar'?'rtl':'ltr';
    section.querySelector('[data-pay-eye]').textContent=c.eyebrow;
    section.querySelector('[data-pay-title]').textContent=c.title;
    section.querySelector('[data-pay-lead]').textContent=c.lead;
    section.querySelector('[data-pay-sn-title]').textContent=c.snTitle;
    section.querySelector('[data-pay-sn-price]').textContent=c.snPrice;
    section.querySelector('[data-pay-sn-method]').textContent=c.snMethod;
    section.querySelector('[data-pay-sn-name]').textContent=c.snName;
    section.querySelector('[data-pay-eu-title]').textContent=c.euTitle;
    section.querySelector('[data-pay-eu-price]').textContent=c.euPrice;
    section.querySelector('[data-pay-eu-method]').textContent=c.euMethod;
    section.querySelector('[data-pay-eu-name]').textContent=c.euName;
    section.querySelector('[data-pay-after]').textContent=c.after;
    var sn=section.querySelector('[data-pay-sn-paid]');
    var eu=section.querySelector('[data-pay-eu-paid]');
    sn.textContent=c.paid;
    eu.textContent=c.paid;
    sn.href=DOSSIER+'&country=sn&lang='+encodeURIComponent(l);
    eu.href=DOSSIER+'&country=fr&lang='+encodeURIComponent(l);
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
    installPayment();
    repairHome();
    installWorld8Switch();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run,{once:true});
  else run();
  window.addEventListener('pageshow',run);
  setTimeout(run,250);
  setTimeout(run,900);
})();
