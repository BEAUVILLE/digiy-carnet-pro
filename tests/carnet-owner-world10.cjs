const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const html=fs.readFileSync('acces-proprietaire.html','utf8');
const codes=['fr','en','es','pt','it','de','nl','ar','wo','zh'];
const present=[...html.matchAll(/<button data-lang="([^"]+)"/g)].map(x=>x[1]);
assert.deepEqual(present,codes,'dix boutons accessibles sur la page propriétaire');
const scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]).filter(x=>x.trim());
assert.equal(scripts.length,1,'script métier conservé');
new (require('node:vm').Script)(scripts[0]);

function verify(language,recovery){
  const nodes=Object.fromEntries(['title','lead','send','back'].map(k=>[k,{dataset:{i18n:k},textContent:''}]));
  const buttons=codes.map(code=>({dataset:{lang:code},active:false,classList:{toggle(name,v){if(name==='active')this._isActive=v}}}));
  const msg={textContent:'',className:''};
  const send={onclick:null,disabled:false};
  const email={value:''};
  const stored={};
  const loc='https://digiy-carnet-pro.digiylyfe.com/acces-proprietaire.html?lang='+language+(recovery?'&recuperation=1':'');
  const document={
    documentElement:{lang:'fr',dir:'ltr'},
    querySelectorAll(selector){return selector==='[data-i18n]'?Object.values(nodes):selector==='[data-lang]'?buttons:[]},
    getElementById(id){return {msg,send,email}[id]}
  };
  const context={
    window:{supabase:{createClient(){return{auth:{signInWithOtp(){throw Error('no network in unit test')}}}}}},
    document,location:{href:loc,search:new URL(loc).search},URL,URLSearchParams,
    localStorage:{getItem(k){return stored[k]||null},setItem(k,v){stored[k]=v}},
    sessionStorage:{setItem(){}}
  };
  vm.runInNewContext(scripts[0],context,{timeout:1000});
  assert.equal(document.documentElement.lang,language,'document language');
  assert.equal(buttons.filter(b=>b.classList._isActive).length,1,'one selected language');
  assert.equal(buttons.find(b=>b.dataset.lang===language).classList._isActive,true);
  assert.equal(stored.digiy_lang,language);
  assert.notEqual(nodes.title.textContent,'Accès propriétaire','title should translate to '+language);
  assert.ok(nodes.lead.textContent.length>15,'help text '+language);
  assert.notEqual(nodes.send.textContent,'Envoyer le magic-link');
  if(recovery)assert.match(nodes.title.textContent,language==='wo'?/PIN/:/PIN/);
  assert.equal(send.disabled,false);
  send.onclick();
  assert.ok(msg.textContent,'missing-email error must be localized');
  assert.ok(!msg.textContent.includes('E-mail requis.'),'French fallback on '+language);
}
for(const language of ['wo','zh']){
  verify(language,false);
  verify(language,true);
}
console.log('CARNET propriétaire: boutons, traduction, récupération et erreur mail WO/ZH OK');
