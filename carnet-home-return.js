/* DIGIY CARNET — remove quarantined HUB routes and keep a direct home return */
(function(){
  'use strict';
  var HOME='https://digiylyfe.com/';
  function run(){
    document.querySelectorAll('a').forEach(function(a){
      var h=a.getAttribute('href')||'';
      if(h.indexOf('https://digiy-hub.digiylyfe.com/')===0 || h.indexOf('./digiy-hub/')===0){
        a.href=HOME;
        if(/hub/i.test(a.textContent||'')) a.textContent='🏠 DIGIYLYFE';
      }
    });
    var nav=document.querySelector('nav.nav')||document.querySelector('.nav');
    if(nav && !nav.querySelector('a[href="https://digiylyfe.com/"]')){
      var a=document.createElement('a');
      a.href=HOME;
      a.className='btn';
      a.setAttribute('data-digiy-home-return','1');
      a.textContent='🏠 DIGIYLYFE';
      nav.appendChild(a);
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run,{once:true}); else run();
})();
