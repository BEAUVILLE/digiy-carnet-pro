/* DIGIY CARNET PRO · correction de la façade publique 10 langues.
   Le shell natif FR/EN + les deux anciens moteurs WORLD8 sont conservés.
   Ce pont rend WO et ZH accessibles dans toutes les langues, sans toucher
   aux accès propriétaires, aux tarifs ou aux données professionnelles.
*/
(function(){
'use strict';
var QUERY=new URLSearchParams(location.search);
var requested=String(QUERY.get('lang')||window.DIGIY_CARNET_ENTRY_LANG||'fr').slice(0,2).toLowerCase();
var lang=(requested==='wo'||requested==='zh')?requested:'';
var nativeBarSelectors='[data-world8-bar],.language-buttons,.langbar,.langs,.langSwitch,.digiyLangSwitch,.digiy-langbar';
function dict(){return (window.DIGIY_WORLD8_PAGE&&window.DIGIY_WORLD8_PAGE[lang])||{}}
function recognizedDomain(url){
 return /(^|\.)digiylyfe\.com$/i.test(url.hostname)&&/^https?:$/.test(url.protocol);
}
function ensureControls(){
 var bar=document.querySelector(nativeBarSelectors);
 if(!bar)return;
 ['wo','zh'].forEach(function(code){
  var a=bar.querySelector('[data-world8-lang="'+code+'"],[data-lang="'+code+'"],[data-lang-btn="'+code+'"]');
  if(!a){a=document.createElement('a');bar.appendChild(a)}
  // Le vieux bridge WORLD8 réécrit tous les liens en FR/EN. Rétablir
  // le vrai destinataire du bouton et préserver les autres paramètres.
  var u=new URL(location.href);u.searchParams.set('lang',code);
  a.href=u.toString();
  a.className='langBtn'+(requested===code?' active':'');
  a.dataset.world8Lang=code;a.lang=code==='zh'?'zh-CN':'wo';
  a.textContent=code==='wo'?'🇸🇳 WO':'🇨🇳 中文';
  a.style.cssText='flex:0 0 auto;min-height:34px;padding:7px 10px;border:1px solid rgba(214,168,95,.35);border-radius:999px;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;font:900 11px system-ui;color:inherit';
 });
}
function translateText(root){
 var copy=dict();if(!root||!Object.keys(copy).length)return;
 var walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(n){
  var p=n.parentElement;
  return !p||p.closest('script,style,textarea,option,select,noscript,pre,code,[contenteditable="true"]')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT;
 }});
 var n;
 while((n=walker.nextNode())){
  var value=n.nodeValue||'',trim=value.trim();
  if(Object.prototype.hasOwnProperty.call(copy,trim)&&typeof copy[trim]==='string'&&copy[trim]!==trim){
   n.nodeValue=value.replace(trim,copy[trim]);
  }
 }
}
function updateLinks(root){
 if(!lang||!root||!root.querySelectorAll)return;
 root.querySelectorAll('a[href]').forEach(function(a){
  if(a.hasAttribute('data-world8-lang'))return;
  var raw=a.getAttribute('href');
  if(!raw||raw.charAt(0)==='#'||/^(mailto:|tel:|javascript:)/i.test(raw))return;
  try{
   var u=new URL(raw,location.href);
   if(!recognizedDomain(u))return;
   if(u.searchParams.get('lang')!==lang){
    u.searchParams.set('lang',lang);a.href=u.toString();
   }
  }catch(e){}
 });
}
function start(){
 // Les 2 boutons doivent apparaître aussi sur l'accueil normal en français.
 ensureControls();
 if(!lang)return;
 document.documentElement.lang=lang==='zh'?'zh-CN':'wo';
 document.documentElement.dir='ltr';
 try{
  localStorage.setItem('digiy-lang',lang);
  localStorage.setItem('digiy_lang',lang);
 }catch(e){}
 translateText(document.body);
 updateLinks(document);
 // Le contenu public peut être ajouté après DOMContentLoaded.
 // Ne pas observer la frappe ou la saisie des usagers.
 var observer=new MutationObserver(function(rs){
  rs.forEach(function(r){r.addedNodes.forEach(function(n){
   if(n.nodeType===1){translateText(n);updateLinks(n)}
   else if(n.nodeType===3&&n.parentElement)translateText(n.parentElement);
  })});
 });
 observer.observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
else start();
})();
