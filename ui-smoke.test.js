const fs=require('fs'),vm=require('vm'),assert=require('assert');
const E=require('./engine.js');let html='';const app={set innerHTML(x){html=x},get innerHTML(){return html}};
const elements={app};const document={getElementById(id){return elements[id]||{focus(){},setSelectionRange(){},click(){}}},querySelectorAll(){return []},addEventListener(){},createElement(){return {click(){}}}};
const storage={};const ctx={window:{AetherEngine:E,crypto:require('crypto').webcrypto},document,localStorage:{getItem(k){return storage[k]||null},setItem(k,v){storage[k]=v}},alert(){},confirm(){return true},prompt(){return 'ash'},Blob,URL:{createObjectURL(){return 'blob:test'},revokeObjectURL(){}},setTimeout,console};
vm.runInNewContext(fs.readFileSync('game.js','utf8'),ctx);
assert(html.includes('Die fünf Pfade'));assert(html.includes('Münze werfen'));
assert(JSON.parse(storage['nachtsiegel-creatures-v09']).deck.length===20);
console.log('UI smoke: first render and storage passed');
