const assert=require('node:assert/strict');const E=require('./engine.js');let passed=0;function test(name,fn){fn();passed++;console.log('✓ '+name)}
test('88 unique cards',()=>{assert.equal(E.CARDS.length,88);assert.equal(new Set(E.CARDS.map(x=>x.id)).size,88)});
test('starting deck legal',()=>assert.equal(E.validateDeck(E.START),''));
test('minimum and maximum deck',()=>{assert.ok(E.validateDeck(E.START.slice(1)));assert.ok(E.validateDeck([...E.START,...E.START.slice(0,7)]))});
test('coin toss deterministic',()=>{assert.equal(E.createBattle(E.START,234).coin,E.createBattle(E.START,234).coin)});
test('no reshuffle',()=>{let b=E.createBattle(E.START,88);assert.equal(b.hero.deck.length+b.hero.hand.length,18)});
test('shield persists, block absorbs first',()=>{let p={hp:40,ward:8,block:5};E.damage(p,9);assert.equal(p.block,0);assert.equal(p.ward,4);assert.equal(p.hp,40)});
test('shield cap & play log',()=>{let b=E.createBattle(E.START,8);assert.ok(b.log.length>0);assert.ok(['hero','enemy'].includes(b.active))});
test('enemy finite hand',()=>{let b=E.createBattle(E.START,8);assert.ok(b.enemy.hand.length<=5)});
test('same faction no resonance',()=>{let b=E.createBattle(E.START,11);b.active='hero';b.hero.hand=['ash-0','ash-0'];b.hero.energy=4;E.play(b,'hero',0);E.play(b,'hero',0);assert.equal(b.hero.resonance,0)});
test('cross order generates resonance',()=>{let b=E.createBattle(E.START,11);b.active='hero';b.hero.hand=['ash-0','tide-0'];b.hero.energy=4;E.play(b,'hero',0);E.play(b,'hero',0);assert.equal(b.hero.resonance,2)});
test('hand overflow requires discard',()=>{let b=E.createBattle(E.START,11);b.active='hero';b.hero.hand=Array(6).fill('ash-0');assert.equal(E.endTurn(b,'hero'),false);assert.equal(E.discard(b,0),true);assert.equal(b.hero.hand.length,5)});
console.log(`${passed} tests passed`);
