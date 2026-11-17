const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');

const bridge=fs.readFileSync('world10-bridge.js','utf8');
const native=fs.readFileSync('index-native-world8-source.html','utf8');
assert.match(native,/data-world8-lang="wo"/);
assert.match(native,/data-world8-lang="zh"/);

function check(lang,existing){
 const href='https://digiy-carnet-pro.digiylyfe.com/?country=sn'+(lang==='fr'?'':'&lang='+lang);
 const buttons=[];
 const link={href:'https://digiylyfe.com/tarifs-adherents-1.html',
   getAttribute(k){return k==='href'?this.href:null},
   hasAttribute(){return false}
 };
 function anchor(code){
  return {dataset:{world8Lang:code},href:'https://digiy-carnet-pro.digiylyfe.com/?lang=fr',
   style:{},className:'langBtn',getAttribute(k){return k==='href'?this.href:null},
   hasAttribute(k){return k==='data-world8-lang'}
  };
 }
 if(existing){buttons.push(anchor('wo'),anchor('zh'))}
 const bar={
  querySelector(selector){
   const m=selector.match(/data-world8-lang="(wo|zh)"/);
   return m?buttons.find(b=>b.dataset.world8Lang===m[1])||null:null;
  },
  appendChild(a){buttons.push(a)}
 };
 const node={nodeValue:'Ton activité.',nodeType:3,parentElement:{closest(){return false}}};
 const body={querySelectorAll(){return [...buttons,link]}};
 const document={
  readyState:'complete',documentElement:{lang:'fr',dir:'ltr'},body,
  querySelector(){return bar},createElement(){return{dataset:{},style:{}}},
  createTreeWalker(){let done=false;return{nextNode(){if(done)return false;done=true;this.currentNode=node;return true}}},
 };
 const store={};
 const dicts={wo:{'Ton activité.':'Sa liggéey.'},zh:{'Ton activité.':'您的业务。'}};
 const env={
  window:{DIGIY_WORLD8_PAGE:dicts,DIGIY_CARNET_ENTRY_LANG:lang},
  location:{href,search:new URL(href).search},document,
  localStorage:{setItem(k,v){store[k]=v}},
  NodeFilter:{SHOW_TEXT:4,FILTER_ACCEPT:1,FILTER_REJECT:2},
  MutationObserver:class{observe(){}},URL,URLSearchParams
 };
 vm.runInNewContext(bridge,env,{timeout:1200});
 assert.equal(buttons.length,2,'les contrôles WO/ZH doivent rester uniques');
 for(const code of ['wo','zh']){
  const item=buttons.find(b=>b.dataset.world8Lang===code);
  assert.ok(item,'bouton '+code);
  assert.equal(new URL(item.href).searchParams.get('lang'),code,'l’ancien moteur a écrasé '+code);
  assert.equal(new URL(item.href).searchParams.get('country'),'sn');
 }
 if(lang==='wo'||lang==='zh'){
  assert.equal(document.documentElement.lang,lang==='zh'?'zh-CN':'wo');
  assert.equal(node.nodeValue,dicts[lang]['Ton activité.']);
  assert.equal(new URL(link.href).searchParams.get('lang'),lang);
  assert.equal(store['digiy-lang'],lang);
 }else{
  assert.equal(node.nodeValue,'Ton activité.');
  assert.equal(document.documentElement.lang,'fr');
 }
}

for(const lang of ['fr','wo','zh']){
 check(lang,true);  // WO/ZH présents dès le HTML natif, liens réécrits par WORLD8
 check(lang,false); // secours si le HTML natif ne fournit pas encore les contrôles
}
console.log('DIGIY CARNET: 10 langues visibles, sélection WO/ZH et liens non écrasés');
