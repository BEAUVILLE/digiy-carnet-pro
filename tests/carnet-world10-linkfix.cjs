// Regression CARNET PRO: le moteur historique reconstruisait 8 boutons à 250 et 900 ms.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const source=fs.readFileSync('world8-link-fix.js','utf8');
const languages=['fr','en','es','pt','de','it','nl','ar','wo','zh'];

function simulate(lang) {
  const href='https://digiy-carnet-pro.digiylyfe.com/?country=sn&lang='+lang;
  let buttons=[];
  let navigation=null;
  const scheduled=[];
  const storage={};
  const bar={
    style:{},
    set innerHTML(value){if(value==='')buttons=[]},
    get innerHTML(){return''},
    setAttribute(){},
    appendChild(btn){buttons.push(btn)}
  };
  const document={
    readyState:'complete',
    querySelectorAll(){return[]},
    querySelector(sel){return sel==='.langSwitch'?bar:null},
    createElement(tag){
      return {
        tagName:tag,style:{},className:'',textContent:'',
        setAttribute(k,v){this[k]=v},
        addEventListener(type,callback){if(type==='click')this.click=callback}
      }
    }
  };
  const location={
    href,search:new URL(href).search,
    assign(path){navigation=path}
  };
  const localStorage={
    getItem(k){return storage[k]||null},
    setItem(k,v){storage[k]=v}
  };
  const window={addEventListener(){}};
  vm.runInNewContext(source,{document,location,localStorage,URL,URLSearchParams,window,
    setTimeout(fn,delay){scheduled.push({fn,delay})}},
    {timeout:1500});

  function verify(stage){
    assert.equal(buttons.length,10,stage+': doit afficher 10 langues');
    assert.deepEqual(buttons.map(b=>b['data-lang-btn']),languages,stage+': langues disponibles');
    const active=buttons.filter(b=>b.className.includes('active')).map(b=>b['data-lang-btn']);
    assert.deepEqual(active,[lang],stage+': langue active');
  }
  verify('chargement '+lang);
  for(const timer of scheduled){
    timer.fn();
    verify('après '+timer.delay+' ms, '+lang);
  }
  for(const code of ['wo','zh']){
    const btn=buttons.find(b=>b['data-lang-btn']===code);
    assert.ok(btn&&typeof btn.click==='function',code+' est cliquable');
    btn.click({preventDefault(){},stopPropagation(){}});
    assert.equal(new URL(navigation,'https://digiy-carnet-pro.digiylyfe.com').searchParams.get('lang'),code);
    assert.equal(storage['digiy-lang'],code);
  }
}

for(const lang of ['fr','wo','zh'])simulate(lang);
assert.match(source,/wo:'🇸🇳 WO'/);
assert.match(source,/zh:'🇨🇳 中文'/);
assert.match(source,/zh:'📒 申请 CARNET PRO'/);
assert.match(source,/wo:'📒 Laaj CARNET PRO'/);
console.log('CARNET PRO: 10 langues stables après timers WORLD8, FR/WO/ZH actifs et cliquables');
