'use strict';
(() => {
const data=window.VISIT_DATA, config=window.VISIT_CONFIG||{}, app=document.querySelector('#app'), live=document.querySelector('#status');
const icons={arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',back:'<path d="m14 6-6 6 6 6"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>',grid:'<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v1"/>',up:'<path d="M12 19V5m-6 6 6-6 6 6"/>',check:'<path d="m5 12 4 4L19 6"/>'};
const svg=n=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[n]||icons.arrow}</svg>`;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const groups=config.universes||[
{id:'college',title:'Collège',subtitle:'Grandir, découvrir, s’épanouir',color:'#91c219',routes:[],photo:null},
{id:'lycee',title:'Lycée',subtitle:'Général, technologique et professionnel',color:'#c8559d',routes:['seconde-gt','st2s','bac-assp','bac-ecp'],photo:'d3a77117d255e46b.webp'},
{id:'cap',title:'CAP',subtitle:'Apprendre un métier, construire son projet',color:'#c8559d',routes:['cap-aepe'],photo:'b122b102e107ebeb.webp'},
{id:'bts',title:'BTS',subtitle:'Étudier, se professionnaliser, avancer',color:'#d28db7',routes:['bts-tourisme','bts-sp3s'],photo:'338955e86ba81fb4.webp'}
];
const route=id=>data.routes.find(r=>r.id===id),groupFor=r=>groups.find(g=>g.routes.includes(r.id));
let state={page:'home'},generation=0,busy=false,shown=false,currentImage=null;const images=new Map();let saved={};
try{const v=JSON.parse(localStorage.getItem('bs-visite-v1')||'{}');if(v&&typeof v==='object'&&!Array.isArray(v)){for(const r of data.routes){const s=v[r.id];if(s&&Number.isInteger(s.index)&&s.index>=0&&s.index<r.scenes.length)saved[r.id]={index:s.index,done:s.done===true,at:Number(s.at)||0};}}}catch{}
function save(done=false){const r=state.route;if(!r)return;saved[r.id]={index:state.index,done,at:Date.now()};try{localStorage.setItem('bs-visite-v1',JSON.stringify(saved));}catch{}}
function announce(text){live.textContent=text;}
function theme(g){document.documentElement.dataset.universe=g?.id||'establishment';document.documentElement.style.setProperty('--accent',g?.color||'#0076ac');document.querySelector('meta[name="theme-color"]').content=g?.color||'#0076ac';}
function brand(){return '<span class="brand-lockup"><img class="brand-logo" src="assets/logo-bon-sauveur.webp" alt="" onerror="this.hidden=true"><span class="brand-title">BON SAUVEUR<small>ENSEMBLE SCOLAIRE · SAINT-LÔ</small></span></span>';}
function button(label,action,icon='arrow',cls='primary'){return `<button class="${cls}" data-action="${action}"><span>${label}</span>${svg(icon)}</button>`;}
function head(back='home',label='Portes ouvertes'){return `<header class="topbar"><button class="iconButton" data-action="${back}" aria-label="Retour">${svg('back')}</button><span class="topLabel">${esc(label)}</span><button class="iconButton" data-action="home" aria-label="Accueil">${svg('grid')}</button></header>`;}
function go(hash){if(location.hash==='#'+hash)render();else location.hash=hash;}
function resumeIndex(r){const s=saved[r.id];return s&&!s.done?s.index:0;}
function start(id,restart=false){const r=route(id);if(r)go(`circuit=${r.id}&vue=${(restart?0:resumeIndex(r))+1}`);}
function home(){
theme();
const latest=data.routes.filter(r=>saved[r.id]&&!saved[r.id].done).sort((a,b)=>saved[b.id].at-saved[a.id].at)[0];
const video=config.welcomeVideo? `<video autoplay muted loop playsinline preload="metadata" poster="${esc(config.cover||'b122b102e107ebeb.webp')}" aria-hidden="true"><source src="${esc(config.welcomeVideo)}" type="video/mp4"></video>`:'';
app.innerHTML=`<section class="home v2-home" aria-label="Bienvenue au Bon Sauveur">
<div class="heroBackdrop"><img src="${esc(config.cover||'b122b102e107ebeb.webp')}" alt="" fetchpriority="high">${video}</div><div class="heroGradient" aria-hidden="true"></div>
<header class="homeHeader v2-homeHeader"><div class="logoBadge">${brand()}</div><span class="edition">PORTES<br>OUVERTES<small>Visite interactive</small></span></header>
<div class="homeStory"><span class="heroPill">ENSEMBLE SCOLAIRE · SAINT-LÔ</span><h1><span>Bienvenue</span><em>au Bon Sauveur.</em></h1><p>Des lieux à découvrir.<br>Des chemins à inventer.</p></div>
<footer class="homeBottom v2-homeBottom">${button('Découvrir nos univers','univers')}${latest?button('Reprendre · '+esc(latest.title),'resume:'+latest.id,'arrow','textButton'):''}
<div class="heroMeta"><span>COLLÈGE <span class="dot"></span> LYCÉE <span class="dot"></span> CAP <span class="dot"></span> BTS</span><span>Défiler pour découvrir ${svg('arrow')}</span></div></footer>
</section>`;
}
function univers(){
theme();
app.innerHTML=`<section class="page selection">${head()}
<div class="pageIntro"><span class="eyebrow">01 / VOTRE DÉCOUVERTE</span><h1>À chacun<br><em>son univers.</em></h1><p>Quel parcours vous ressemble ? Choisissez un univers pour commencer la visite.</p></div>
<div class="universeDeck">${groups.map(g=>{
const available=g.routes.length>0;
return `<button class="universeCard" data-universe="${esc(g.id)}" style="--realm:${esc(g.color)}" data-action="group:${esc(g.id)}" aria-label="${esc(g.title)} : ${available?'découvrir les formations':'visite photographique en préparation'}">
${g.photo?`<img src="${esc(g.photo)}" loading="lazy" alt="">`:''}<span class="scrim"></span>
<span class="universeCopy"><span class="universeKicker"><i></i>${available?`${g.routes.length} ${g.routes.length>1?'parcours':'parcours'} à découvrir`:'VISITE À VENIR'}</span><strong>${esc(g.title)}</strong><small>${available?esc(g.subtitle):'Une prochaine découverte se prépare'}</small></span>
<span class="roundArrow">${svg('arrow')}</span></button>`;
}).join('')}</div>
<p class="universeNote">Vous pourrez changer d'univers à tout moment, sans perdre votre progression.</p>
<div class="selectionFooter"><span></span>LE BON SAUVEUR · SAINT-LÔ</div>
</section>`;
}
function programmes(g){
theme(g);
if(!g.routes.length){app.innerHTML=`<section class="page">${head('univers','Collège')}
<div class="emptyState"><span class="eyebrow">COLLÈGE / BON SAUVEUR</span><h1>Votre prochain<br><em>terrain de découverte.</em></h1><p>Le parcours photographique du collège est en préparation. Les autres univers et leurs visites sont déjà disponibles.</p><div class="collegeMotif" aria-hidden="true"></div>${button('Découvrir les autres univers','univers')}</div></section>`;return;}
app.innerHTML=`<section class="page programmes">${head('univers',g.title)}
<div class="pageIntro"><span class="eyebrow">02 / ${esc(g.title.toUpperCase())}</span><h1>Bienvenue<br><em>${g.title==='CAP'?'au CAP':g.title==='BTS'?'en BTS':'au lycée'}.</em></h1><p>Découvrez les formations à travers leurs espaces, étape après étape.</p></div>
<div class="programmeList">${g.routes.map(id=>{
const r=route(id),savedRoute=saved[id],cover=r.cover||data.scenes[r.scenes[0]].photo;
return `<button class="programmeCard" data-action="intro:${esc(id)}">
<span class="programmePic"><img src="${esc(cover)}" loading="lazy" alt=""></span>
<span class="programmeCopy"><span class="programmeMeta">${r.scenes.length} VUES ${savedRoute?.done?'· VISITE TERMINÉE':savedRoute?'· À REPRENDRE':'· VISITE PHOTO'}</span>
<strong>${esc(r.title)}</strong><span class="programmeSummary">${esc(r.summary)}</span>
<span class="programmeFooter"><span>${savedRoute&&!savedRoute.done?'Reprendre la découverte':'Découvrir la formation'}</span>${svg('arrow')}</span></span></button>`;
}).join('')}</div>
<p class="universeNote">Chaque visite est libre, vous pouvez revenir en arrière et reprendre votre circuit plus tard.</p>
</section>`;
}
function intro(r){
const g=groupFor(r);theme(g);const s=saved[r.id];
app.innerHTML=`<section class="routeIntro">${head('group:'+g.id,r.title)}
<div class="introPhoto"><img src="${esc(r.cover||data.scenes[r.scenes[0]].photo)}" alt="Photographie du circuit ${esc(r.title)}"><span class="imageIndex">${esc(g.title.toUpperCase())} / VISITE PHOTO</span></div>
<div class="introText"><span class="eyebrow">DÉCOUVREZ À VOTRE RYTHME · ${r.scenes.length} VUES</span>
<h1>${esc(r.title)}</h1><p>${esc(r.description||r.summary)}</p>
<div class="introRule"><span>Votre visite commence ici</span><span>Explorez les lieux ${svg('arrow')}</span></div>
${button(s&&!s.done?'Reprendre ma visite':'Commencer la visite','start:'+r.id)}
${s&&!s.done?button('Recommencer depuis le début','restart:'+r.id,'arrow','textButton'):''}
</div></section>`;
}
function image(src){if(images.has(src)){const p=images.get(src);images.delete(src);images.set(src,p);return p;}const p=new Promise((resolve,reject)=>{const im=new Image();let timer=setTimeout(()=>{im.onload=im.onerror=null;images.delete(src);reject(Error('timeout'));},15000);im.onload=()=>{clearTimeout(timer);resolve(im);};im.onerror=()=>{clearTimeout(timer);images.delete(src);reject(Error('image'));};im.src=src;});images.set(src,p);while(images.size>6)images.delete(images.keys().next().value);return p;}
function preload(){const r=state.route;[1,2].forEach(step=>{const scene=data.scenes[r.scenes[state.index+step]];if(scene)image(scene.photo).catch(()=>{});});}
function visit(r,n){theme(groupFor(r));state={page:'visit',route:r,index:n};shown=false;currentImage=null;app.innerHTML=`<section class="visit" aria-label="Visite ${esc(r.title)}"><header class="visitHeader"><button class="iconButton" data-action="visitBack" aria-label="Vue précédente">${svg('back')}</button><div><span class="eyebrow">VOTRE CIRCUIT</span><strong>${esc(r.title)}</strong></div><button class="iconButton" data-action="univers" aria-label="Changer de circuit">${svg('grid')}</button></header><div class="photoStage" id="photoStage"><img id="photo" class="scenePhoto" alt=""><div id="points"></div><button id="direction" class="direction hidden" data-action="next" aria-label="Aller à la vue suivante">${svg('up')}</button><span class="viewLabel" id="viewLabel"></span><div class="loading" id="loading" role="status"><span class="spinner"></span>Chargement de la photo</div><div class="photoError hidden" id="photoError"><strong>La photo n’a pas chargé.</strong><p>Vérifiez votre connexion et réessayez.</p>${button('Réessayer','retry')}${button('Revenir aux formations','univers','back','textButton')}</div></div><footer class="visitBottom"><div class="sceneCaption"><div><span class="eyebrow" id="sceneKicker"></span><h1 id="sceneTitle">Votre visite</h1></div><button class="iconButton" data-action="details" disabled aria-label="Informations sur cette étape">${svg('info')}</button></div><p id="sceneDescription"></p><div class="visitNavigation"><button class="progressButton" data-action="steps" disabled aria-label="Voir toutes les vues du circuit"><span id="count"></span><span class="progressTrack"><span id="progressFill"></span></span></button>${button('Continuer','next')}</div></footer></section>`;show(n,true);}
async function show(n,first=false){if(busy||state.page!=='visit')return;const r=state.route;if(n<0||n>=r.scenes.length)return;const token=++generation,scene=data.scenes[r.scenes[n]];busy=true;app.setAttribute('aria-busy','true');document.querySelector('#loading').classList.remove('hidden');document.querySelector('#photoError').classList.add('hidden');document.querySelectorAll('[data-action="next"]').forEach(b=>b.disabled=true);document.querySelector('#points').innerHTML='';document.querySelector('#direction').classList.add('hidden');
try{const im=await image(scene.photo);if(token!==generation||state.page!=='visit')return;const photo=document.querySelector('#photo');photo.src=scene.photo;photo.alt=scene.title||`${r.title}, vue ${n+1} sur ${r.scenes.length}`;photo.classList.remove('arrive');void photo.offsetWidth;photo.classList.add('arrive');state.index=n;shown=true;currentImage=im;document.querySelectorAll('[data-action="details"],[data-action="steps"]').forEach(b=>b.disabled=false);document.querySelector('#viewLabel').textContent=`VUE ${String(n+1).padStart(2,'0')}`;document.querySelector('#sceneKicker').textContent=r.title;document.querySelector('#sceneTitle').textContent=scene.title||(scene.sourceName==='Vers la sortie'?'Vers la sortie':'Découvrez les lieux');document.querySelector('#sceneDescription').textContent=scene.description||'Explorez la photo, puis poursuivez votre découverte.';document.querySelector('#count').textContent=`${String(n+1).padStart(2,'0')} / ${r.scenes.length}`;document.querySelector('#progressFill').style.width=`${(n+1)/r.scenes.length*100}%`;const next=document.querySelector('.visitNavigation [data-action="next"] span');next.textContent=n===r.scenes.length-1?'Terminer':'Continuer';history.replaceState(null,'',`#circuit=${r.id}&vue=${n+1}`);save();positionPoints();preload();document.title=`${r.title} · ${n+1}/${r.scenes.length} · Bon Sauveur`;announce(`${r.title}. Vue ${n+1} sur ${r.scenes.length}.`);if(first)document.querySelector('.visitHeader').focus?.({preventScroll:true});}
catch{if(token!==generation||state.page!=='visit')return;document.querySelector('#photoError').classList.remove('hidden');document.querySelector('#photoError [data-action="retry"]').onclick=()=>show(n,first);announce('La photo n’a pas chargé. Vous pouvez réessayer.');}
finally{if(token===generation&&state.page==='visit'){busy=false;app.removeAttribute('aria-busy');document.querySelector('#loading').classList.add('hidden');document.querySelectorAll('[data-action="next"]').forEach(b=>b.disabled=!shown);}}
}
function geometry(pos){const stage=document.querySelector('#photoStage');if(!stage||!currentImage)return null;const w=stage.clientWidth,h=stage.clientHeight,nw=currentImage.naturalWidth,nh=currentImage.naturalHeight,scale=Math.min(w/nw,h/nh);return {x:(w-nw*scale)/2+pos.x/100*nw*scale,y:(h-nh*scale)/2+pos.y/100*nh*scale,w,h};}
function positionPoints(){if(state.page!=='visit'||!shown)return;const scene=data.scenes[state.route.scenes[state.index]],btn=document.querySelector('#direction');btn.classList.add('hidden');if(scene.nextPosition&&state.index<state.route.scenes.length-1){const p=geometry(scene.nextPosition);if(p&&p.x>=26&&p.x<=p.w-26&&p.y>=26&&p.y<=p.h-26){btn.style.left=p.x+'px';btn.style.top=p.y+'px';btn.classList.remove('hidden');}}
const points=document.querySelector('#points');points.innerHTML=(scene.points||[]).map((p,i)=>{const xy=geometry(p.position||{x:50,y:50});if(!xy)return '';return `<button class="interestPoint" data-action="point:${i}" style="left:${Math.max(24,Math.min(xy.w-24,xy.x))}px;top:${Math.max(24,Math.min(xy.h-24,xy.y))}px" aria-label="${esc(p.title)}">+</button>`;}).join('');}
function next(){if(busy||!shown)return;if(state.index===state.route.scenes.length-1){save(true);go('fin='+state.route.id);}else show(state.index+1);}
function sheet(title,body){const dialog=document.querySelector('#sheet');document.querySelector('#sheetTitle').textContent=title;document.querySelector('#sheetContent').innerHTML=body;if(!dialog.open)dialog.showModal();}
function details(){const r=state.route,scene=data.scenes[r.scenes[state.index]];const related=r.scenes.map((id,n)=>({scene:data.scenes[id],n})).filter(x=>x.scene.sourceName===scene.sourceName);sheet(scene.title||r.title,`<span class="eyebrow">LA FORMATION</span><p>${esc(r.description||r.summary)}</p>${scene.description?`<p>${esc(scene.description)}</p>`:''}<div class="infoRule"></div><p>Touchez la flèche sur la photo ou le bouton Continuer pour avancer. Le sommaire permet de retrouver une vue.</p>${related.length>1?`<h3>Autres vues de cette séquence</h3><div class="related">${related.map(x=>`<button data-action="jump:${x.n}" aria-label="Aller à la vue ${x.n+1}"><img src="${esc(x.scene.photo)}" alt="" loading="lazy"><span>Vue ${x.n+1}</span></button>`).join('')}</div>`:''}`);}
function steps(){const r=state.route;sheet('Votre parcours',`<p>${esc(r.title)} · ${r.scenes.length} vues</p><div class="steps">${r.scenes.map((id,n)=>`<button data-action="jump:${n}" class="${n===state.index?'current':''}" ${n===state.index?'aria-current="step"':''} aria-label="Aller à la vue ${n+1}"><img src="${esc(data.scenes[id].photo)}" alt="" loading="lazy"><span>${String(n+1).padStart(2,'0')}</span></button>`).join('')}</div>`);}
function point(n){const s=data.scenes[state.route.scenes[state.index]],p=s.points?.[n];if(!p)return;sheet(p.title,`<p>${esc(p.text||'')}</p>${(p.photos||[]).map(src=>`<img class="detailPhoto" src="${esc(src)}" alt="${esc(p.title)}" loading="lazy">`).join('')}${p.target&&state.route.scenes.includes(p.target)?button('Explorer cette vue','jump:'+state.route.scenes.indexOf(p.target)):''}`);}
function finish(r){theme(groupFor(r));const g=groupFor(r);app.innerHTML=`<section class="finish page">${head('last:'+r.id,r.title)}<div class="finishArt"><span>${svg('check')}</span><span class="eyebrow">CIRCUIT TERMINÉ</span></div><h1>La suite<br><em>vous appartient.</em></h1><p>Vous venez de découvrir le circuit ${esc(r.title)}.</p><p class="finishSummary">${esc(r.summary)}</p><div class="finishActions">${button('Explorer un autre parcours','univers')}${button('Revoir ce circuit','restart:'+r.id,'arrow','secondary')}${button('Revenir à la dernière photo','last:'+r.id,'back','textButton')}</div><span class="signature">BON SAUVEUR · SAINT-LÔ</span></section>`;}
function dispatch(action){if(!action)return;const [kind,value]=action.split(':');if(kind==='home')go('');if(kind==='univers')go('univers');if(kind==='group')go('univers='+value);if(kind==='intro')go('formation='+value);if(kind==='start'||kind==='resume')start(value);if(kind==='restart')start(value,true);if(kind==='last'){const r=route(value);go(`circuit=${r.id}&vue=${r.scenes.length}`);}if(kind==='visitBack'){if(state.index>0&&!busy)show(state.index-1);else if(!busy)go('formation='+state.route.id);}if(kind==='next')next();if(kind==='retry'&&state.page==='visit'&&!busy)show(state.index);if(kind==='details'&&shown)details();if(kind==='steps'&&shown)steps();if(kind==='point'&&shown)point(Number(value));if(kind==='jump'&&state.page==='visit'){document.querySelector('#sheet').close();show(Number(value));}}
function render(){generation++;busy=false;shown=false;document.querySelector('#sheet').close();app.removeAttribute('aria-busy');const params=new URLSearchParams(location.hash.slice(1)),r=route(params.get('circuit')),f=route(params.get('formation')),end=route(params.get('fin')),g=groups.find(x=>x.id===params.get('univers'));state={page:'home'};if(r){const requested=Number(params.get('vue'));const n=params.has('vue')&&Number.isInteger(requested)&&requested>0?Math.min(r.scenes.length-1,requested-1):resumeIndex(r);visit(r,n);}else if(f){state={page:'intro',route:f};intro(f);}else if(end){state={page:'finish',route:end};finish(end);}else if(g){state={page:'group',group:g};programmes(g);}else if(location.hash==='#univers'){state={page:'univers'};univers();}else home();window.scrollTo(0,0);if(state.page!=='visit'){document.title='Bon Sauveur · Portes ouvertes';const h=app.querySelector('h1');if(h){h.tabIndex=-1;h.focus({preventScroll:true});}announce('');}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(b&&!b.disabled)dispatch(b.dataset.action);});document.querySelector('#closeSheet').onclick=()=>document.querySelector('#sheet').close();document.querySelector('#sheet').addEventListener('click',e=>{if(e.target===e.currentTarget){const b=e.currentTarget.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)e.currentTarget.close();}});window.addEventListener('hashchange',render);window.addEventListener('resize',positionPoints);document.addEventListener('keydown',e=>{if(state.page!=='visit'||document.querySelector('#sheet').open)return;if(e.key==='ArrowRight')next();if(e.key==='ArrowLeft'&&!busy&&state.index>0)show(state.index-1);});
for(const font of config.fonts||[]){if(!font.family||!font.url)continue;const face=new FontFace(font.family,`url("${font.url}")`,{weight:String(font.weight||400)});face.load().then(f=>{document.fonts.add(f);document.documentElement.classList.add('official-fonts');}).catch(()=>{});}
render();
})();
