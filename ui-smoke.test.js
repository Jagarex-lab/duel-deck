'use strict';
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const E=require('./engine.js');
let html='',handlers={},saved={},nav=[{dataset:{nav:'arena'},classList:{toggle(){}}},{dataset:{nav:'collection'},classList:{toggle(){}}}];
const app={set innerHTML(v){html=v},get innerHTML(){return html}};
const document={getElementById(id){if(id==='app')return app;if(id==='log')return {scrollHeight:0,scrollTop:0};return {click(){},focus(){},files:[]}},querySelectorAll(){return nav},addEventListener(type,fn){handlers[type]=fn},createElement(){return {click(){}}}};
const context={window:{AetherEngine:E},document,localStorage:{getItem:k=>saved[k]||null,setItem:(k,v)=>saved[k]=v},console,alert(){},confirm(){return true},Blob,URL:{createObjectURL(){return 'blob:test'},revokeObjectURL(){}},setTimeout(){}};
vm.createContext(context);vm.runInContext(fs.readFileSync(require.resolve('./game.js'),'utf8'),context);
assert.match(html,/Das Erwachen der Namenlosen/,'startup should render');
function click(dataset){handlers.click({target:{closest(sel){if(sel==='[data-nav]'&&dataset.nav)return {dataset};if(sel==='[data-act]'&&dataset.act)return {dataset};return null}}})}
click({nav:'collection'});assert.match(html,/Das Kartenpocket/);
click({nav:'deck'});assert.match(html,/Deckwerkstatt/);
click({nav:'arena'});click({act:'start'});assert.match(html,/Schlachtchronik/);
assert.match(html,/NAMENLOSER/);
console.log('✓ UI boot, collection, deck, arena, combat log (VM smoke test)');
