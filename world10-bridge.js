/* DIGIY CARNET · pont local WO/ZH pour la façade uniquement.
   Ne touche ni aux écrans propriétaires, ni aux paiements, ni aux enregistrements. */
(function(){
'use strict';
var lang=(new URLSearchParams(location.search).get('lang')||'').slice(0,2).toLowerCase();
if(lang!=='wo'&&lang!=='zh')return;
var dict=(window.DIGIY_WORLD8_PAGE&&window.DIGIY_WORLD8_PAGE[lang])||{};
if(!Object.keys(dict).length)return;
function translateText(root){
 if(!root)return;
 var walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(n){
  var p=n.parentElement;
  if(!p||p.closest('script,style,textarea,option,select,noscript,pre,code,[contenteditable="true"]'))return NodeFilter.FILTER_REJECT;
  return NodeFilter.FILTER_ACCEPT;
 }});
 var n;while((n=walker.nextNode())){var raw=n.nodeValue,trim=raw.trim();
  if(Object.prototype.hasOwnProperty.call(dict,trim)){var t=dict[trim];if(typeof t==='string'&&t!==trim)n.nodeValue=raw.replace(trim,t);}
 }
}
function samePlatform(url){return /(^|\.)digiylyfe\.com$/i.test(url.hostname)&&/^https?:$/.test(url.protocol)}
function updateLinks(root){
 (root||document).querySelectorAll('a[href]').forEach(function(a){
  var raw=a.getAttribute('href');if(!raw||raw.charAt(0)==='#'||/^(mailto:|tel:|javascript:)/i.test(raw))return;
  try{var u=new URL(raw,location.href);if(!samePlatform(u))return;
  if(u.searchParams.get('lang')!==lang){u.searchParams.set('lang',lang);a.href=u.toString();}
  }catch(e){}
 });
}
function ensureControls(){
 var bar=document.querySelector('[data-world8-bar],.language-buttons,.langbar,.langs,.langSwitch,.digiyLangSwitch,.digiy-langbar');
 if(!bar)return;
 ['wo','zh'].forEach(function(l){if(bar.querySelector('[data-world8-lang="'+l+'"],[data-lang="'+l+'"]'))return;
  var a=document.createElement('a');a.href='?lang='+l;a.dataset.world8Lang=l;a.lang=l;
  a.textContent=l==='wo'?'🇸🇳 WO':'🇨🇳 中文';
  a.style.cssText='min-height:34px;padding:7px 10px;border:1px solid #f6c453;border-radius:999px;color:inherit;text-decoration:none;font:900 11px system-ui;display:inline-flex;align-items:center';
  if(l===lang)a.style.background='#e8bf61';
  bar.appendChild(a);
 });
}
function start(){
 document.documentElement.lang=lang==='zh'?'zh-CN':lang;
 document.documentElement.dir='ltr';
 try{localStorage.setItem('digiy-lang',lang);localStorage.setItem('digiy_lang',lang)}catch(e){}
 translateText(document.body);updateLinks(document);ensureControls();
 var observer=new MutationObserver(function(rs){
  rs.forEach(function(r){r.addedNodes.forEach(function(n){if(n.nodeType===1){translateText(n);updateLinks(n)}else if(n.nodeType===3){var p=n.parentElement;if(p)translateText(p)}})});
 });
 observer.observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
