// Run: node tests.js. Isolated evaluation of pure engine definitions.
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const src=fs.readFileSync(__dirname+'/game.js','utf8').split('let state=safeLoad();')[0];
const ctx=vm.createContext({});vm.runInContext(src+';globalThis.api={rng,shuffle,initial,CARDS,BY_ID};',ctx);const {rng,shuffle,initial,CARDS}=ctx.api;
const a=rng(42),b=rng(42);for(let i=0;i<100;i++)assert.strictEqual(a(),b());
assert.strictEqual(CARDS.length,10);
assert.strictEqual(initial().deck.length,9);
assert.strictEqual(initial().coins,100);
const r=rng(3),items=['a','b','c','d'];const shuffled=shuffle(items,r);assert.strictEqual(shuffled.length,4);assert.strictEqual(new Set(shuffled).size,4);assert.strictEqual(items.join(''),'abcd');
for(const c of CARDS){assert(c.cost>=1&&c.cost<=3);assert(c.power>0)}
console.log('✓ 8 Prüfungen erfolgreich: Seed, Kartenzahl, Startdeck, Startgold, Shuffle-Länge, Shuffle-Eindeutigkeit, Eingabe unverändert, Kartendaten.');
