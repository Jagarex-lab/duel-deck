'use strict';
/* Duel Deck v0.1: pure seeded combat logic + lightweight mobile UI. No external dependencies. */
const CARDS=[
{id:'slash',name:'Schwertstreich',emoji:'⚔️',cost:1,kind:'attack',power:6,rarity:'common',desc:'6 Schaden'},
{id:'guard',name:'Eisenschild',emoji:'🛡️',cost:1,kind:'block',power:6,rarity:'common',desc:'6 Block'},
{id:'heal',name:'Heiltrank',emoji:'🧪',cost:2,kind:'heal',power:7,rarity:'common',desc:'7 Leben heilen'},
{id:'fire',name:'Feuerball',emoji:'🔥',cost:2,kind:'attack',power:12,rarity:'rare',desc:'12 Schaden'},
{id:'dagger',name:'Doppelklinge',emoji:'🗡️',cost:1,kind:'attack',power:8,rarity:'rare',desc:'8 Schaden'},
{id:'wall',name:'Runenwall',emoji:'🔮',cost:2,kind:'block',power:15,rarity:'rare',desc:'15 Block'},
{id:'vamp',name:'Seelenraub',emoji:'🦇',cost:2,kind:'drain',power:9,rarity:'epic',desc:'9 Schaden + 5 Heilung'},
{id:'storm',name:'Donnersturm',emoji:'🌩️',cost:3,kind:'attack',power:22,rarity:'epic',desc:'22 Schaden'},
{id:'bless',name:'Lebensquelle',emoji:'🌿',cost:2,kind:'heal',power:14,rarity:'rare',desc:'14 Leben heilen'},
{id:'pierce',name:'Schattenpfeil',emoji:'🏹',cost:1,kind:'attack',power:10,rarity:'epic',desc:'10 Schaden'}
];
const BY_ID=Object.fromEntries(CARDS.map(c=>[c.id,c]));
const START_DECK=['slash','slash','slash','guard','guard','guard','heal','fire','dagger','wall','elf','dwarf'];
const MIN_DECK=12, MAX_DECK=18, MAX_COPIES=3;
const EXTRA_CARDS=[
{id:'elf',name:'Elfenklinge',emoji:'🧝',cost:1,kind:'attack',power:7,rarity:'common',desc:'7 Schaden'},
{id:'dwarf',name:'Zwergenschild',emoji:'🪓',cost:1,kind:'block',power:9,rarity:'common',desc:'9 Block'},
{id:'frost',name:'Frostmagie',emoji:'❄️',cost:2,kind:'attack',power:13,rarity:'rare',desc:'13 Schaden'},
{id:'dragon',name:'Drachenodem',emoji:'🐉',cost:3,kind:'attack',power:23,rarity:'epic',desc:'23 Schaden'},
{id:'paladin',name:'Paladinschutz',emoji:'✨',cost:2,kind:'block',power:17,rarity:'rare',desc:'17 Block'},
{id:'phoenix',name:'Phönixfeder',emoji:'🪶',cost:2,kind:'heal',power:11,rarity:'epic',desc:'11 Heilung · verbraucht'},
{id:'golem',name:'Steingolem',emoji:'🪨',cost:2,kind:'block',power:16,rarity:'rare',desc:'16 Block'},
{id:'curse',name:'Hexenfluch',emoji:'🧙‍♀️',cost:1,kind:'attack',power:9,rarity:'rare',desc:'9 Schaden'},
{id:'griffin',name:'Greifenstoß',emoji:'🦅',cost:2,kind:'attack',power:15,rarity:'rare',desc:'15 Schaden'},
{id:'holy',name:'Heiliges Licht',emoji:'☀️',cost:2,kind:'heal',power:10,rarity:'common',desc:'10 Heilung · verbraucht'}
];
CARDS.push(...EXTRA_CARDS);
for(const c of EXTRA_CARDS)BY_ID[c.id]=c;
const NEW_CARDS=[
{id:'spark',name:'Ätherfunke',emoji:'✦',cost:0,kind:'energy',power:1,rarity:'common',desc:'+1 Energie'},
{id:'ritual',name:'Arkanes Ritual',emoji:'☽',cost:1,kind:'energy',power:2,rarity:'rare',desc:'+2 Energie'},
{id:'vital',name:'Herz des Waldes',emoji:'❖',cost:2,kind:'maxhp',power:5,rarity:'rare',desc:'+5 max. Leben und Heilung'},
{id:'oath',name:'Eid des Wächters',emoji:'♜',cost:2,kind:'maxhp',power:8,rarity:'epic',desc:'+8 max. Leben und Heilung'},
{id:'thorn',name:'Dornenfluch',emoji:'♠',cost:1,kind:'attack',power:8,rarity:'common',desc:'8 Schaden'},
{id:'ember',name:'Glutklinge',emoji:'♨',cost:2,kind:'attack',power:14,rarity:'rare',desc:'14 Schaden'},
{id:'aegis',name:'Sternenpanzer',emoji:'✧',cost:2,kind:'block',power:18,rarity:'epic',desc:'18 Block'},
{id:'moon',name:'Mondschlag',emoji:'☾',cost:1,kind:'attack',power:9,rarity:'rare',desc:'9 Schaden'},
{id:'oracle',name:'Orakelsiegel',emoji:'◈',cost:0,kind:'block',power:3,rarity:'common',desc:'3 Block'},
{id:'relic',name:'Dämmerungsreliquie',emoji:'✺',cost:3,kind:'attack',power:24,rarity:'epic',desc:'24 Schaden'},
{id:'sylph',name:'Sylphenwind',emoji:'➶',cost:1,kind:'block',power:8,rarity:'rare',desc:'8 Block'},
{id:'rune',name:'Runenstich',emoji:'ᚱ',cost:0,kind:'attack',power:3,rarity:'common',desc:'3 Schaden'}
];
CARDS.push(...NEW_CARDS);for(const c of NEW_CARDS)BY_ID[c.id]=c;

const REALMS=[
['ashen','Aschenpakt','☄','ember'],['tide','Gezeitenorden','◉','tide'],['wild','Dornenzirkel','❈','wild'],['void','Nachtkonklave','◈','void']];
const EXPANSION=[
['cinder','Glutjäger','ashen',1,'attack',7,'common','7 Schaden'],
['salamander','Salamander','ashen',2,'attack',13,'rare','13 Schaden'],
['meteor','Sternenfall','ashen',3,'attack',21,'epic','21 Schaden'],
['ashguard','Aschenwache','ashen',1,'block',7,'common','7 Schild'],
['furnace','Schmiedefeuer','ashen',2,'energy',2,'rare','+2 Energie'],
['inferno','Infernoherz','ashen',3,'drain',16,'epic','16 Schaden · +5 Leben'],
['coral','Korallenschild','tide',1,'block',8,'common','8 Schild'],
['wave','Flutklinge','tide',1,'attack',7,'common','7 Schaden'],
['siren','Sirenenruf','tide',2,'heal',9,'rare','9 Heilung'],
['leviathan','Leviathan','tide',3,'attack',21,'epic','21 Schaden'],
['trident','Sturmdreizack','tide',2,'attack',14,'rare','14 Schaden'],
['current','Strömung','tide',0,'energy',1,'common','+1 Energie'],
['briar','Dornenkrone','wild',1,'block',8,'common','8 Schild'],
['stag','Hirschgeist','wild',2,'heal',9,'rare','9 Heilung'],
['root','Wurzelgriff','wild',1,'attack',8,'common','8 Schaden'],
['ancient','Uralter Hüter','wild',3,'maxhp',10,'epic','+10 max. Leben'],
['huntress','Mondjägerin','wild',2,'attack',14,'rare','14 Schaden'],
['sap','Lebenssaft','wild',0,'energy',1,'common','+1 Energie'],
['shade','Schattenläufer','void',1,'attack',8,'common','8 Schaden'],
['veil','Nachtmantel','void',1,'block',8,'common','8 Schild'],
['specter','Seelenflüsterer','void',2,'drain',11,'rare','11 Schaden · +5 Leben'],
['eclipse','Finsternis','void',3,'attack',22,'epic','22 Schaden'],
['sigil','Leersiegel','void',0,'block',4,'common','4 Schild'],
['nightmare','Alptraum','void',2,'attack',14,'rare','14 Schaden'],
['sunward','Sonnenhüter','tide',2,'maxhp',6,'rare','+6 max. Leben'],
['wolf','Runenwolf','wild',1,'attack',8,'common','8 Schaden'],
['scorch','Brandmal','ashen',2,'attack',15,'rare','15 Schaden'],
['abyss','Abgrundtor','void',3,'block',24,'epic','24 Schild'],
['thicket','Dickicht','wild',2,'block',15,'rare','15 Schild'],
['tidal','Tidenherz','tide',3,'heal',17,'epic','17 Heilung']
];
for(const [id,name,faction,cost,kind,power,rarity,desc] of EXPANSION){const c={id,name,faction,cost,kind,power,rarity,desc,emoji:({ashen:'✦',tide:'◉',wild:'❈',void:'◈'})[faction]};CARDS.push(c);BY_ID[id]=c}
for(const c of CARDS)if(!c.faction)c.faction=({attack:'ashen',block:'tide',heal:'wild',drain:'void',energy:'void',maxhp:'wild'})[c.kind]||'void';

const STORAGE='duel-deck-save-v1';
const HAND_MAX=5,DRAW_PER_TURN=3;

function rng(seed){let a=seed>>>0;return ()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296}}
function shuffle(items,random){const out=[...items];for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j],out[i]]}return out}
function initial(){return {version:4,coins:100,wins:0,losses:0,level:1,owned:{slash:3,guard:3,heal:1,fire:1,dagger:1,wall:1,elf:1,dwarf:1},deck:[...START_DECK],battle:null,seed:192837,packCount:0,tab:'battle'}}
function safeLoad(){try{const raw=JSON.parse(localStorage.getItem(STORAGE));if((raw?.version===1||raw?.version===2||raw?.version===3||raw?.version===4)&&Array.isArray(raw.deck)&&raw.owned&&Number.isFinite(raw.coins))return migrate({...initial(),...raw,tab:'battle'})}catch{}return initial()}
function migrate(s){s.battle=null;s.version=4;const counts={};s.deck=s.deck.filter(id=>{if(!BY_ID[id]||(counts[id]||0)>=MAX_COPIES||(counts[id]||0)>=(s.owned[id]||0))return false;counts[id]=(counts[id]||0)+1;return true});for(const id of START_DECK){if(s.deck.length>=MIN_DECK)break;if((s.deck.filter(x=>x===id).length)<Math.min(MAX_COPIES,s.owned[id]||0))s.deck.push(id)}if(s.deck.length<MIN_DECK){s.deck=[...START_DECK];s.owned={...s.owned,slash:3,guard:3,fire:1,dagger:1,wall:1,heal:1,elf:1,dwarf:1}}return s}
let state=safeLoad();
function save(){try{localStorage.setItem(STORAGE,JSON.stringify(state))}catch{}}
function draw(b,count){for(let i=0;i<count;i++){if(!b.draw.length)break;b.hand.push(b.draw.pop())}b.overflow=b.hand.length>HAND_MAX} 
function discardFromHand(index){const b=state.battle;if(!b||!b.overflow||index<0||index>=b.hand.length)return;const id=b.hand.splice(index,1)[0];b.discard.push(id);b.overflow=b.hand.length>HAND_MAX;log(b,BY_ID[id].name+' abgeworfen.');save();render()}
function sellExcess(id){const owned=state.owned[id]||0,used=state.deck.filter(x=>x===id).length;if(owned<=Math.max(3,used)){toast('Nur Überschuss über 3 Kopien verkaufbar');return}state.owned[id]--;state.coins+=BY_ID[id].rarity==='epic'?65:BY_ID[id].rarity==='rare'?35:15;save();render()}

function enemyDeck(level,random){
 const pool=['slash','slash','slash','guard','guard','dagger','elf','dwarf','fire','heal','spark','rune'];
 if(level>=4)pool.splice(5,1,'frost');
 if(level>=8)pool.splice(8,1,'griffin');
 if(level>=12)pool.splice(2,1,'dragon');
 return shuffle(pool,random);
}
function log(b,msg){b.logs.unshift('Runde '+b.turn+': '+msg);b.logs=b.logs.slice(0,45)}
function startBattle(){if(state.deck.length<MIN_DECK||state.deck.length>MAX_DECK){toast('Deck benötigt 12–18 Karten');state.tab='collection';render();return}
 const level=state.level,random=rng(state.seed+level*7919+state.wins*131);
 const hp=36+Math.min(22,Math.floor((level-1)*1.15));
 const b={hp:48,maxHp:48,block:0,enemyHp:hp,enemyMax:hp,enemyBlock:0,energy:3,turn:1,overflow:false,draw:shuffle(state.deck,random),discard:[],exhaust:[],hand:[],enemyDraw:enemyDeck(level,random),enemyHand:[],enemyDiscard:[],enemyExhaust:[],enemyEnergy:3,enemyFatigue:0,heroFatigue:0,healsTurn:0,enemyHealsTurn:0,intent:null,logs:[],status:'active'};
 draw(b,DRAW_PER_TURN);drawEnemy(b,3);b.intent=enemyPlan(b);state.battle=b;log(b,'Zwei Magier betreten den Ätherring. Beide Decks sind endlich.');save();render();
}
function drawEnemy(b,count){for(let i=0;i<count&&b.enemyDraw.length;i++)b.enemyHand.push(b.enemyDraw.pop());while(b.enemyHand.length>HAND_MAX){const i=enemyDiscardChoice(b);b.enemyDiscard.push(b.enemyHand.splice(i,1)[0])}}
function enemyDiscardChoice(b){let worst=0;for(let i=1;i<b.enemyHand.length;i++){const a=BY_ID[b.enemyHand[i]],w=BY_ID[b.enemyHand[worst]];if(a.cost>w.cost||(a.cost===w.cost&&a.power<w.power))worst=i}return worst}
function enemyPlan(b){const cards=b.enemyHand.map(id=>BY_ID[id]);let budget=3,healUsed=false;const plan=[];const threat=b.hp<=15;
 const sorted=cards.map((c,i)=>({c,i,score: c.kind==='attack'?c.power*1.1:c.kind==='drain'?c.power+5:c.kind==='block'?Math.min(c.power,11)*.72:c.kind==='heal'?(b.enemyMax-b.enemyHp>=7?c.power*.9:0):c.kind==='energy'?4:3})).sort((a,b)=>b.score-a.score||a.i-b.i);
 for(const x of sorted){const c=x.c;if(c.cost>budget||c.kind==='heal'&&healUsed||plan.length>=3)continue;if(c.kind==='heal'&&(b.enemyMax-b.enemyHp)<5)continue;if(c.kind==='block'&&b.enemyBlock>14)continue;plan.push(x.i);budget-=c.cost;if(c.kind==='heal')healUsed=true;}
 return {cards:plan.map(i=>b.enemyHand[i]),damage:plan.reduce((sum,i)=>sum+(['attack','drain'].includes(cards[i].kind)?cards[i].power:0),0),block:plan.reduce((sum,i)=>sum+(cards[i].kind==='block'?cards[i].power:0),0)};
}
function finish(b,won){b.status=won?'won':'lost';if(won){state.wins++;state.level++;const reward=45+Math.min(100,state.level*5);state.coins+=reward;log(b,'Sieg! +'+reward+' Gold.')}else{state.losses++;state.coins+=10;log(b,'Niederlage. +10 Trostgold.')}save()}
function playCard(index){const b=state.battle;if(!b||b.status!=='active'||b.overflow)return;const id=b.hand[index],c=BY_ID[id];if(!c||c.cost>b.energy)return;if(c.kind==='heal'&&b.healsTurn>=1){toast('Nur eine Heilkarte pro Runde!');return}
 b.energy-=c.cost;b.hand.splice(index,1);if(c.kind==='heal'){b.exhaust.push(id);b.healsTurn++}else b.discard.push(id);
 if(c.kind==='attack'||c.kind==='drain'){const absorbed=Math.min(b.enemyBlock,c.power);b.enemyBlock-=absorbed;b.enemyHp=Math.max(0,b.enemyHp-(c.power-absorbed));log(b,c.name+': '+(c.power-absorbed)+' Schaden.');if(c.kind==='drain')b.hp=Math.min(b.maxHp,b.hp+5)}
 else if(c.kind==='block'){b.block+=c.power;log(b,c.name+': +'+c.power+' Schild.')}
 else if(c.kind==='energy'){b.energy+=c.power;log(b,c.name+': +'+c.power+' Energie.')}
 else if(c.kind==='maxhp'){b.maxHp+=c.power;b.hp+=c.power;log(b,c.name+': +'+c.power+' max. Leben.')}
 else{const healed=Math.min(c.power,b.maxHp-b.hp);b.hp+=healed;log(b,c.name+': +'+healed+' Leben.')}
 if(b.enemyHp<=0)finish(b,true);save();render();
}
function enemyPlay(b){const plan=enemyPlan(b),names=[];let energy=3,healed=false;
 for(const id of plan.cards){const i=b.enemyHand.indexOf(id);if(i<0)continue;const c=BY_ID[id];if(c.cost>energy||c.kind==='heal'&&healed)continue;energy-=c.cost;b.enemyHand.splice(i,1);if(c.kind==='heal'){b.enemyExhaust.push(id);healed=true}else b.enemyDiscard.push(id);names.push(c.name);
 if(c.kind==='attack'||c.kind==='drain'){const absorbed=Math.min(b.block,c.power);b.block-=absorbed;b.hp=Math.max(0,b.hp-c.power+absorbed);if(c.kind==='drain')b.enemyHp=Math.min(b.enemyMax,b.enemyHp+5)}
 else if(c.kind==='block')b.enemyBlock+=c.power;
 else if(c.kind==='heal')b.enemyHp=Math.min(b.enemyMax,b.enemyHp+c.power);
 else if(c.kind==='maxhp'){b.enemyMax+=c.power;b.enemyHp+=c.power}
 else if(c.kind==='energy')energy+=c.power;
 }
 if(names.length)log(b,'Gegner spielt: '+names.join(', ')+'.');else log(b,'Gegner passt.');
}
function endTurn(){const b=state.battle;if(!b||b.status!=='active')return;if(b.overflow){toast('Erst auf 5 Handkarten reduzieren.');return}
 enemyPlay(b);
 if(b.hp<=0){finish(b,false);render();return}if(b.enemyHp<=0){finish(b,true);render();return}
 b.block=0;b.enemyBlock=0;b.turn++;b.energy=3;b.healsTurn=0;
 draw(b,DRAW_PER_TURN);drawEnemy(b,DRAW_PER_TURN);
 if(!b.draw.length&&!b.hand.length){b.heroFatigue++;const dmg=2+2*b.heroFatigue;b.hp=Math.max(0,b.hp-dmg);log(b,'Dein Deck ist erschöpft: −'+dmg+' Leben.')}
 if(!b.enemyDraw.length&&!b.enemyHand.length){b.enemyFatigue++;const dmg=2+2*b.enemyFatigue;b.enemyHp=Math.max(0,b.enemyHp-dmg);log(b,'Gegnerdeck erschöpft: −'+dmg+' Leben.')}
 if(b.hp<=0||b.enemyHp<=0){finish(b,b.enemyHp<=0&&b.hp>0);render();return}
 b.intent=enemyPlan(b);save();render();
}
function openPack(){if(state.coins<100)return;state.coins-=100;const random=rng(state.seed+state.packCount*911+17);const roll=random();const pool=CARDS.filter(c=>c.rarity===(roll<.06?'epic':roll<.34?'rare':'common'));const c=pool[Math.floor(random()*pool.length)];state.owned[c.id]=(state.owned[c.id]||0)+1;state.packCount++;state.seed+=17;save();toast('🎉 '+c.name+' ('+rarityName(c.rarity)+') erhalten!');render()}
function addDeck(id){if(state.deck.length>=MAX_DECK){toast('Maximal 18 Karten im Deck');return}if(state.deck.filter(x=>x===id).length>=MAX_COPIES){toast('Maximal 3 Kopien je Karte');return}if((state.deck.filter(x=>x===id).length)>=(state.owned[id]||0))return;state.deck.push(id);save();render()}
function removeDeck(id){if(state.deck.length<=MIN_DECK){toast('Mindestens 12 Karten nötig');return}const index=state.deck.lastIndexOf(id);if(index<0)return;state.deck.splice(index,1);save();render()}
function rarityName(r){return {common:'GEWÖHNLICH',rare:'SELTEN',epic:'EPISCH'}[r]}
function art(c){const glyph={ashen:'✦',tide:'◉',wild:'❈',void:'◈'}[c.faction];const kind={attack:'⚔',block:'⬡',heal:'✚',drain:'☾',energy:'✧',maxhp:'♜'}[c.kind];return `<div class="art art-${c.faction}"><span class="art-halo"></span><span class="art-sigil">${glyph}</span><span class="art-mark">${kind}</span><span class="art-rune">ᚨ · ᛟ · ᚱ</span></div>`}
function cardHtml(id,index,disabled=false){const c=BY_ID[id];return `<button class="card ${c.rarity} faction-${c.faction}" ${disabled?'disabled':''} ${index===null?'':'data-play="'+index+'"'}><span class="cost">${c.cost}</span><span class="card-rank">${c.rarity==='epic'?'✦✦✦':c.rarity==='rare'?'✦✦':'✦'}</span>${art(c)}<span class="name">${c.name}</span><span class="desc">${c.desc}</span><span class="rarity">${rarityName(c.rarity)}</span></button>`}
function healthBar(hp,max,hero){return `<div class="health"><span>❤️ Leben</span><b>${hp} / ${max}</b></div><div class="bar ${hero?'hero':''}"><div style="width:${Math.max(0,100*hp/max)}%"></div></div>`}
function battleView(){const b=state.battle;if(!b)return `<section class="panel"><div class="eyebrow">Arena · Kapitel ${state.level}</div><div class="heading">Der Ätherring ruft.</div><div class="arena-emblem">◈</div><p class="small">Spiele Karten für Energie, blocke Angriffe und besiege Gegner. Jeder Sieg bringt Gold und schwierigere Herausforderungen.</p><div class="notice">48 Leben · 3 Energie pro Runde · 5 Handkarten · Beide Spieler haben endliche Decks und dieselben Grundregeln.</div><button class="btn" data-action="start">⚔️ Duell beginnen</button></section>`;
const ended=b.status!=='active';return `<section class="panel"><div class="row between"><div><div class="eyebrow">Kapitel ${state.level} · Runde ${b.turn}</div><div class="heading" style="font-size:19px">${ended?(b.status==='won'?'🏆 Sieg!':'💀 Niederlage'):'Ätherring'}</div></div><span class="tag">⚡ ${b.energy} Energie</span></div><div class="combatants"><div class="fighter"><div class="avatar">♜</div><b>Dein Held</b>${healthBar(b.hp,b.maxHp,true)}<div class="intent">🛡️ ${b.block} Block</div></div><div class="fighter"><div class="avatar">${state.level%3===0?'♛':'☠'}</div><b>Arena-Gegner</b>${healthBar(b.enemyHp,b.enemyMax,false)}<div class="intent">${ended?'Kampf beendet':'⚔️ Drohung: '+b.intent.damage+' · 🛡️ '+b.intent.block}<br>🛡️ ${b.enemyBlock} Block · 🃏 ${b.enemyDraw.length} Stapel · ✋ ${b.enemyHand.length} Hand</div></div></div>${ended?`<div style="margin-top:16px"><button class="btn" data-action="start">${b.status==='won'?'Nächstes Duell':'Erneut kämpfen'} →</button></div>`:`<div class="section">Deine Hand · ${b.hand.length}/${HAND_MAX} <span class="tag">${b.draw.length} Nachziehen · ${b.discard.length} Ablage · ${b.exhaust.length} verbraucht</span></div>${b.overflow?`<div class="notice">⚠️ Handlimit überschritten! Tippe Karten an, die du abwerfen möchtest, bis nur noch 5 übrig sind.</div>`:''}<div class="hand">${b.hand.map((id,i)=>cardHtml(id,i,!b.overflow&&(BY_ID[id].cost>b.energy||(BY_ID[id].kind==='heal'&&b.healsTurn>=1)))).join('')}</div><div class="row" style="margin-top:15px"><button class="btn" data-action="end">Runde beenden →</button><span class="small">${b.overflow?'Karte antippen = abwerfen':'Ungespielte Karten bleiben auf der Hand'}</span></div>`}</section><section class="panel"><div class="eyebrow">Kampfprotokoll</div><div class="log">${b.logs.map(l=>'<div>'+l+'</div>').join('')}</div></section>`}
function collectionView(){return `<section class="panel"><div class="eyebrow">Deck-Editor</div><div class="heading">Deine Karten</div><p class="small">Dein Deck enthält ${state.deck.length} Karten. Erlaubt: 12–18 Karten, maximal 3 Kopien je Karte. Änderungen gelten ab dem nächsten Duell.</p><div class="stats"><div class="stat"><b>${Object.values(state.owned).reduce((a,b)=>a+b,0)}</b><span>Karten</span></div><div class="stat"><b>${Object.keys(state.owned).length}/${CARDS.length}</b><span>Entdeckt</span></div><div class="stat"><b>${state.deck.length}</b><span>Im Deck</span></div></div></section><div class="section">Sammlung & Deck</div><div class="collection">${CARDS.filter(c=>state.owned[c.id]).map(c=>`<div>${cardHtml(c.id,null,true)}<div class="small" style="text-align:center;margin:7px 0">${state.deck.filter(x=>x===c.id).length} / ${state.owned[c.id]} im Deck</div><div class="row" style="justify-content:center"><button class="btn alt" style="padding:7px 12px" data-remove="${c.id}">−</button><button class="btn alt" style="padding:7px 12px" data-add="${c.id}">+</button><button class="btn alt" style="padding:7px 9px" data-sell="${c.id}" ${state.owned[c.id]<=Math.max(3,state.deck.filter(x=>x===c.id).length)?'disabled':''}>🪙</button></div></div>`).join('')}</div>`}
function shopView(){return `<section class="panel"><div class="eyebrow">Karten-Shop</div><div class="heading">Neue Karten entdecken</div><div class="avatar" style="font-size:70px">🎁</div><p class="small">Öffne ein Kartenpaket und erhalte eine zufällige Karte. Du kannst alle Karten durch Spielen verdienen – keine Echtgeldkäufe.</p><div class="stats"><div class="stat"><b>66 %</b><span>Gewöhnlich</span></div><div class="stat"><b>28 %</b><span>Selten</span></div><div class="stat"><b>6 %</b><span>Episch</span></div></div><div style="margin-top:18px"><button class="btn" data-action="pack" ${state.coins<100?'disabled':''}>🎁 Paket öffnen · 100 🪙</button></div><p class="small">Dein Gold: ${state.coins} · Geöffnete Pakete: ${state.packCount}</p></section><div class="notice">Prototyp: Gold ist ausschließlich Spielwährung. Es gibt weder bezahlte Lootboxen noch Werbung.</div>`}
function profileView(){return `<section class="panel"><div class="eyebrow">Spielerprofil</div><div class="heading">Arena-Champion</div><div class="avatar">🏆</div><div class="stats"><div class="stat"><b>${state.wins}</b><span>Siege</span></div><div class="stat"><b>${state.losses}</b><span>Niederlagen</span></div><div class="stat"><b>${state.level}</b><span>Kapitel</span></div></div><p class="small">Dein Fortschritt wird automatisch auf diesem Gerät gespeichert.</p></section><section class="panel"><div class="section" style="margin-top:0">Speicherstand</div><p class="small">Exportiere deine Sammlung als Datei, um sie zu sichern oder auf ein anderes Gerät zu übertragen.</p><div class="row"><button class="btn alt" data-action="export">⬇️ Exportieren</button><label class="btn alt" style="cursor:pointer">⬆️ Importieren<input id="import" type="file" accept="application/json" style="display:none"></label></div><div style="margin-top:20px"><button class="btn danger" data-action="reset">Fortschritt zurücksetzen</button></div></section>`}
function render(){const app=document.getElementById('app');app.innerHTML=`<div class="top"><div class="logo">◈ ÄTHER<span>BRUCH</span></div><div class="currency">🪙 ${state.coins}</div></div><div class="sub">DIE VIER ORDEN · KARTENDUELL · v0.4</div>${({battle:battleView,collection:collectionView,shop:shopView,profile:profileView}[state.tab]||battleView)()}`;document.querySelectorAll('[data-tab]').forEach(el=>el.classList.toggle('active',el.dataset.tab===state.tab))}
function toast(message){const el=document.getElementById('toast');el.textContent=message;el.classList.remove('hidden');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.add('hidden'),2600)}
document.addEventListener('click',e=>{const el=e.target.closest('button');if(!el)return;if(el.dataset.tab){state.tab=el.dataset.tab;save();render();return}if(el.dataset.play!==undefined){if(state.battle?.overflow)discardFromHand(Number(el.dataset.play));else playCard(Number(el.dataset.play));return}if(el.dataset.sell){sellExcess(el.dataset.sell);return}if(el.dataset.add){addDeck(el.dataset.add);return}if(el.dataset.remove){removeDeck(el.dataset.remove);return}switch(el.dataset.action){case'start':startBattle();break;case'end':endTurn();break;case'pack':openPack();break;case'export':{const clean={...state,battle:null};const blob=new Blob([JSON.stringify(clean,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='duel-deck-save.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);break}case'reset':if(confirm('Wirklich den gesamten Fortschritt löschen?')){state=initial();save();render()}break}});
document.addEventListener('change',async e=>{if(e.target.id!=='import')return;try{const text=await e.target.files[0].text();const obj=JSON.parse(text);if(![1,2,3,4].includes(obj.version)||!Array.isArray(obj.deck)||!obj.deck.every(id=>BY_ID[id])||!obj.owned||!Number.isFinite(obj.coins))throw Error('Ungültiger Speicherstand');state=migrate({...initial(),...obj,battle:null,tab:'profile'});save();render();toast('Spielstand importiert!')}catch{toast('Import fehlgeschlagen.')}});
/* Serialized battles are plain JSON; no runtime functions in save data. */
if(state.battle&&!Array.isArray(state.battle.enemyDraw))state.battle=null;
render();
