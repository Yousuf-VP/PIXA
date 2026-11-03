/* PIXAFORGE — site systems + playable Cookie Emperor */
"use strict";

const PIXAFORGE_CONFIG = { particleCount: 32, revealThreshold: 0.12, toastDuration: 2600, favoriteStorageKey: "pixaforge_favorites_v1" };
const PIXAFORGE_NEWS = [
  { category:"studio", label:"STUDIO UPDATE", date:"NOVEMBER 2026", title:"A new digital playground is taking shape.", description:"PIXAFORGE is building a collection of original browser gaming experiences. The journey is just getting started.", link:"#about", linkText:"EXPLORE THE STUDIO" },
  { category:"development", label:"DEVELOPMENT", date:"NOVEMBER 2026", title:"Cookie Emperor continues to grow.", description:"Our first original game is expanding with new systems, progression and a growing cookie kingdom.", link:"#cookie-emperor", linkText:"PLAY THE GAME" },
  { category:"development", label:"IN DEVELOPMENT", date:"COMING SOON", title:"A mysterious world is on the horizon.", description:"Unknown World is part of the next chapter of the PIXAFORGE collection.", link:"#games", linkText:"VIEW COLLECTION" },
  { category:"release", label:"COLLECTION", date:"PIXAFORGE", title:"Three game worlds. One growing collection.", description:"Explore the current lineup and follow the development of upcoming experiences.", link:"#games", linkText:"EXPLORE ARCADE" }
];
const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const touchDevice = matchMedia("(hover: none)").matches;
const pageLoader=$("#pageLoader"), siteHeader=$("#siteHeader"), scrollProgress=$("#scrollProgress"), menuToggle=$("#menuToggle"), mainNav=$("#mainNav");
const cursorGlow=$("#cursorGlow"), cursorDot=$("#cursorDot"), gamesGrid=$("#gamesGrid"), gameSearch=$("#gameSearch"), gamesEmpty=$("#gamesEmpty");
const newsGrid=$("#newsGrid"), newsEmpty=$("#newsEmpty"), detailsModal=$("#detailsModal"), modalImage=$("#modalImage"), modalTitle=$("#modalTitle"), modalDescription=$("#modalDescription"), modalCategory=$("#modalCategory"), modalStatus=$("#modalStatus"), modalPlay=$("#modalPlay"), toastContainer=$("#toastContainer"), floatingTopButton=$("#floatingTopButton");

/* Loading and shared feedback */
function finishLoading(){ if(!pageLoader)return; pageLoader.classList.add("loaded"); setTimeout(()=>pageLoader.remove(),800); }
if(document.readyState==="complete") finishLoading(); else addEventListener("load",finishLoading,{once:true});
setTimeout(finishLoading,3500);
function showToast(message){ if(!toastContainer)return; const node=document.createElement("div"); node.className="toast"; node.textContent=message; toastContainer.append(node); setTimeout(()=>{node.classList.add("removing");setTimeout(()=>node.remove(),320)},PIXAFORGE_CONFIG.toastDuration); }

/* Navigation */
function closeNavigation(){ if(!menuToggle||!mainNav)return; menuToggle.classList.remove("active");mainNav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");menuToggle.setAttribute("aria-label","Open navigation");document.body.classList.remove("menu-open"); }
if(menuToggle&&mainNav){ menuToggle.addEventListener("click",()=>{const open=mainNav.classList.toggle("open");menuToggle.classList.toggle("active",open);menuToggle.setAttribute("aria-expanded",String(open));menuToggle.setAttribute("aria-label",open?"Close navigation":"Open navigation");document.body.classList.toggle("menu-open",open)}); $$(".nav-link",mainNav).forEach(a=>a.addEventListener("click",closeNavigation)); document.addEventListener("click",e=>{if(mainNav.classList.contains("open")&&!mainNav.contains(e.target)&&!menuToggle.contains(e.target))closeNavigation()}); addEventListener("resize",()=>{if(innerWidth>760)closeNavigation()}); }
let scrollFrame=false;
function updateScrollInterface(){const y=scrollY,max=document.documentElement.scrollHeight-innerHeight;if(scrollProgress)scrollProgress.style.width=`${max>0?y/max*100:0}%`;siteHeader?.classList.toggle("scrolled",y>40);floatingTopButton?.classList.toggle("visible",y>600);scrollFrame=false;}
addEventListener("scroll",()=>{if(!scrollFrame){requestAnimationFrame(updateScrollInterface);scrollFrame=true}},{passive:true});updateScrollInterface();
function scrollToTop(){scrollTo({top:0,behavior:reducedMotion?"auto":"smooth"})}floatingTopButton?.addEventListener("click",scrollToTop);$("#backToTop")?.addEventListener("click",e=>{e.preventDefault();scrollToTop()});
const navSections=$$("#home,#games,#features,#news,#about"),navLinks=$$(".nav-link");
if("IntersectionObserver" in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")===`#${entry.target.id}`))}),{rootMargin:"-35% 0px -55% 0px"});navSections.forEach(s=>observer.observe(s));}

/* Scroll reveal and counters */
const revealElements=$$(".reveal");
if("IntersectionObserver" in window&&!reducedMotion){const ro=new IntersectionObserver((entries,obs)=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target)}}),{threshold:PIXAFORGE_CONFIG.revealThreshold,rootMargin:"0px 0px -35px 0px"});revealElements.forEach(el=>ro.observe(el));}else revealElements.forEach(el=>el.classList.add("visible"));
$$(".games-grid,.features-grid,.news-grid,.numbers-grid").forEach(group=>[...group.children].forEach((item,i)=>item.style.transitionDelay=`${Math.min(i*90,360)}ms`));
function animateCounter(el){const target=Number(el.dataset.count);if(!Number.isFinite(target))return;if(reducedMotion){el.textContent=target.toLocaleString();return}const start=performance.now(),duration=1300;function tick(now){const p=Math.min((now-start)/duration,1),v=Math.round(target*(1-Math.pow(1-p,4)));el.textContent=v.toLocaleString();if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick)}
const counters=$$("[data-count]");if("IntersectionObserver" in window){const co=new IntersectionObserver((entries,obs)=>entries.forEach(e=>{if(e.isIntersecting){animateCounter(e.target);obs.unobserve(e.target)}}),{threshold:.65});counters.forEach(el=>co.observe(el))}else counters.forEach(animateCounter);

/* Background particles and cursor */
function createParticles(){const field=$("#particleField");if(!field||reducedMotion||touchDevice)return;const frag=document.createDocumentFragment();for(let i=0;i<PIXAFORGE_CONFIG.particleCount;i++){const p=document.createElement("span");p.className="particle";p.style.left=`${Math.random()*100}%`;p.style.top=`${Math.random()*100}%`;p.style.animationDuration=`${12+Math.random()*20}s`;p.style.animationDelay=`${-Math.random()*25}s`;p.style.opacity=String(.15+Math.random()*.45);frag.append(p)}field.append(frag)}createParticles();
if(cursorGlow&&cursorDot&&!touchDevice&&!reducedMotion){let x=0,y=0,dx=0,dy=0,active=false;addEventListener("mousemove",e=>{x=e.clientX;y=e.clientY;cursorGlow.style.opacity="1";cursorDot.style.opacity="1";if(!active){active=true;requestAnimationFrame(moveCursor)}},{passive:true});function moveCursor(){dx+=(x-dx)*.25;dy+=(y-dy)*.25;cursorGlow.style.left=`${x}px`;cursorGlow.style.top=`${y}px`;cursorDot.style.left=`${dx}px`;cursorDot.style.top=`${dy}px`;if(Math.abs(x-dx)>.1||Math.abs(y-dy)>.1)requestAnimationFrame(moveCursor);else active=false}document.addEventListener("mouseleave",()=>{cursorGlow.style.opacity="0";cursorDot.style.opacity="0"})}

/* Game library filtering, favorites and details */
function getGameCards(){return gamesGrid?$$(".game-card",gamesGrid):[]}function gameData(card){return{title:card.dataset.title||"Untitled game",description:card.dataset.description||"",category:card.dataset.category||"",status:card.dataset.status||"soon",image:card.dataset.image||"",link:card.dataset.link||""}}
let activeGameFilter="all";
function filterGames(){if(!gamesGrid)return;const query=(gameSearch?.value||"").trim().toLowerCase();let count=0;getGameCards().forEach(card=>{const d=gameData(card),category=activeGameFilter==="all"||d.category.split(/\s+/).includes(activeGameFilter),search=`${d.title} ${d.description} ${d.category}`.toLowerCase().includes(query),visible=category&&search;card.classList.toggle("is-filtered-out",!visible);card.setAttribute("aria-hidden",String(!visible));if(visible)count++});if(gamesEmpty)gamesEmpty.hidden=count!==0;resetCarouselAfterFilter();}
$$(".filter-button").forEach(button=>button.addEventListener("click",()=>{activeGameFilter=button.dataset.filter||"all";$$(".filter-button").forEach(b=>b.classList.toggle("active",b===button));filterGames()}));gameSearch?.addEventListener("input",filterGames);
$("#clearGameSearch")?.addEventListener("click",()=>{activeGameFilter="all";if(gameSearch)gameSearch.value="";$(".filter-button[data-filter='all']")?.click();gameSearch?.focus()});
document.addEventListener("keydown",e=>{const t=e.target,typing=t instanceof HTMLElement&&(t.isContentEditable||["INPUT","TEXTAREA","SELECT"].includes(t.tagName));if(e.key==="/"&&!typing&&gameSearch){e.preventDefault();gameSearch.focus();$("#games")?.scrollIntoView({behavior:reducedMotion?"auto":"smooth"})}if(e.key==="Escape"){closeDetailsModal();closeNavigation()}});
function readFavorites(){try{const v=JSON.parse(localStorage.getItem(PIXAFORGE_CONFIG.favoriteStorageKey)||"[]");return Array.isArray(v)?v:[]}catch{return[]}}let favorites=readFavorites();
function saveFavorites(){try{localStorage.setItem(PIXAFORGE_CONFIG.favoriteStorageKey,JSON.stringify(favorites))}catch{showToast("Favorites could not be saved in this browser.")}}
function updateFavoriteButtons(){getGameCards().forEach(card=>{const b=$(".favorite-button",card);if(!b)return;const on=favorites.includes(gameData(card).title);b.setAttribute("aria-pressed",String(on));b.textContent=on?"★":"☆"})}
getGameCards().forEach(card=>$(".favorite-button",card)?.addEventListener("click",()=>{const title=gameData(card).title;if(favorites.includes(title)){favorites=favorites.filter(x=>x!==title);showToast(`${title} removed from favorites.`)}else{favorites.push(title);showToast(`${title} added to favorites.`)}saveFavorites();updateFavoriteButtons()}));updateFavoriteButtons();
function openDetailsModal(card){if(!detailsModal)return;const d=gameData(card);if(modalTitle)modalTitle.textContent=d.title;if(modalDescription)modalDescription.textContent=d.description;if(modalCategory)modalCategory.textContent=d.category.toUpperCase();if(modalImage){modalImage.src=d.image;modalImage.alt=`${d.title} artwork`}if(modalStatus)modalStatus.textContent=d.status==="available"?"● AVAILABLE TO PLAY":"◷ IN DEVELOPMENT";if(modalPlay){modalPlay.hidden=d.status!=="available"||!d.link;if(!modalPlay.hidden){modalPlay.href=d.link;modalPlay.textContent="PLAY NOW ↗"}}detailsModal.classList.add("open");detailsModal.setAttribute("aria-hidden","false");document.body.classList.add("modal-open");$(".modal-close",detailsModal)?.focus()}
function closeDetailsModal(){if(!detailsModal)return;detailsModal.classList.remove("open");detailsModal.setAttribute("aria-hidden","true");document.body.classList.remove("modal-open")}
getGameCards().forEach(card=>$(".game-details-button",card)?.addEventListener("click",()=>openDetailsModal(card)));$$('[data-modal-close]',detailsModal||document).forEach(b=>b.addEventListener("click",closeDetailsModal));

/* News feed */
function renderNews(filter="all"){if(!newsGrid)return;newsGrid.innerHTML="";const items=PIXAFORGE_NEWS.filter(item=>filter==="all"||item.category===filter);if(newsEmpty)newsEmpty.hidden=items.length>0;const frag=document.createDocumentFragment();items.forEach(item=>{const article=document.createElement("article");article.className="news-card";const top=document.createElement("div");top.className="news-card-top";const tag=document.createElement("span");tag.className="news-tag";tag.textContent=item.label;const date=document.createElement("span");date.className="news-date";date.textContent=item.date;top.append(tag,date);const h=document.createElement("h3");h.textContent=item.title;const p=document.createElement("p");p.textContent=item.description;const a=document.createElement("a");a.className="news-read";a.href=item.link||"#news";a.textContent=`${item.linkText||"READ MORE"} ↗`;article.append(top,h,p,a);frag.append(article)});newsGrid.append(frag)}
renderNews();$$(".news-filter").forEach(b=>b.addEventListener("click",()=>{$$(".news-filter").forEach(x=>x.classList.toggle("active",x===b));renderNews(b.dataset.newsFilter||"all")}));

/* Responsive game carousel: autoplay on desktop, tablet and mobile; user interaction always wins. */
let carouselTimer=null,carouselIdleTimer=null,carouselUserActive=false,carouselVisible=false;
function carouselCards(){return getGameCards().filter(c=>!c.classList.contains("is-filtered-out")&&c.getClientRects().length>0)}
function stopCarousel(){clearTimeout(carouselTimer);carouselTimer=null}
function carouselCanRun(){return !!gamesGrid&&!reducedMotion&&!document.hidden&&carouselVisible&&!carouselUserActive&&carouselCards().length>1}
function cardLeftInTrack(card){const track=gamesGrid.getBoundingClientRect(),rect=card.getBoundingClientRect();return gamesGrid.scrollLeft+(rect.left-track.left)}
function scheduleCarousel(){stopCarousel();if(!carouselCanRun())return;carouselTimer=setTimeout(()=>{const cards=carouselCards();if(cards.length<2)return;const first=cards[0],last=cards[cards.length-1],track=gamesGrid.getBoundingClientRect();let current=cards.find(card=>{const r=card.getBoundingClientRect();return r.right>track.left+Math.min(35,r.width*.2)});if(!current)current=first;let index=cards.indexOf(current),next=cards[index+1]||first;const target=next===first?0:cardLeftInTrack(next);gamesGrid.scrollTo({left:target,behavior:"smooth"});scheduleCarousel()},4700)}
function pauseCarousel(){carouselUserActive=true;stopCarousel();clearTimeout(carouselIdleTimer);}
function resumeCarousel(){clearTimeout(carouselIdleTimer);carouselIdleTimer=setTimeout(()=>{carouselUserActive=false;scheduleCarousel()},4200)}
function resetCarouselAfterFilter(){if(!gamesGrid)return;stopCarousel();gamesGrid.scrollTo({left:0,behavior:reducedMotion?"auto":"smooth"});if(!carouselUserActive)scheduleCarousel()}
if(gamesGrid){["pointerdown","touchstart","wheel","focusin"].forEach(type=>gamesGrid.addEventListener(type,pauseCarousel,{passive:type!=="focusin"}));["pointerup","touchend","touchcancel","focusout"].forEach(type=>gamesGrid.addEventListener(type,resumeCarousel,{passive:true}));gamesGrid.addEventListener("mouseenter",pauseCarousel);gamesGrid.addEventListener("mouseleave",resumeCarousel);gamesGrid.addEventListener("scroll",()=>{if(carouselUserActive){stopCarousel();resumeCarousel()}},{passive:true});}
if("IntersectionObserver" in window&&gamesGrid){const carouselObserver=new IntersectionObserver(entries=>{carouselVisible=entries[0].isIntersecting;if(carouselVisible)scheduleCarousel();else stopCarousel()},{threshold:.12});carouselObserver.observe(gamesGrid)}else carouselVisible=true;
document.addEventListener("visibilitychange",()=>{if(document.hidden)stopCarousel();else scheduleCarousel()});

/* Card tilt and hero parallax */
if(!touchDevice&&!reducedMotion){getGameCards().forEach(card=>{card.addEventListener("pointermove",e=>{if(innerWidth<=760)return;const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;card.style.transform=`perspective(900px) rotateX(${(.5-y)*5}deg) rotateY(${(x-.5)*5}deg) translateY(-3px)`});card.addEventListener("pointerleave",()=>card.style.transform="")});const hero=$(".hero-visual");hero?.addEventListener("pointermove",e=>{const r=hero.getBoundingClientRect(),emblem=$(".hero-emblem-container",hero);if(emblem)emblem.style.transform=`translate(${((e.clientX-r.left)/r.width-.5)*12}px,${((e.clientY-r.top)/r.height-.5)*12}px)`});hero?.addEventListener("pointerleave",()=>{const emblem=$(".hero-emblem-container",hero);if(emblem)emblem.style.transform=""})}
if(reducedMotion){const marquee=$(".marquee-content");if(marquee){marquee.style.animation="none";marquee.style.transform="none"}}
$$ (".game-art img").forEach(img=>img.addEventListener("error",()=>img.classList.add("image-unavailable")));

/* Single-page hash routing for the game. The landing page stays intact. */
const siteMain=$("#siteMain"),gameView=$("#cookieEmperorView");
function route(){const playing=location.hash.toLowerCase()==="#cookie-emperor";const wasPlaying=document.body.classList.contains("game-mode");if(siteMain)siteMain.hidden=playing;if(gameView)gameView.hidden=!playing;document.body.classList.toggle("game-mode",playing);if(playing){closeDetailsModal();closeNavigation();window.scrollTo({top:0,behavior:"auto"});renderGame();}else{updateScrollInterface();if(wasPlaying&&location.hash&&location.hash!=="#")requestAnimationFrame(()=>document.querySelector(location.hash)?.scrollIntoView({behavior:reducedMotion?"auto":"smooth"}))}}
addEventListener("hashchange",route);

/* Cookie Emperor — clicker/idle game with persistent progression */
const GAME_KEY="pixaforge_cookie_emperor_v1";
const buildingDefs=[
 {id:"bakery",name:"Tiny Bakery",icon:"🏠",desc:"A small bakery baking cookies for you.",base:15,rate:0.2},
 {id:"farm",name:"Cookie Farm",icon:"🌾",desc:"Grow ingredients and bake at scale.",base:100,rate:1.5},
 {id:"factory",name:"Cookie Factory",icon:"🏭",desc:"Industrial-scale cookie production.",base:650,rate:8},
 {id:"castle",name:"Cookie Castle",icon:"🏰",desc:"A royal centre of cookie production.",base:4000,rate:42}
];
const upgradeDefs=[
 {id:"strongHands",name:"Baker's Gloves",icon:"🧤",desc:"Double cookies earned per click.",cost:50,effect:"click",value:2},
 {id:"rollingPin",name:"Golden Rolling Pin",icon:"🥖",desc:"Triple cookies earned per click.",cost:450,effect:"click",value:3},
 {id:"ovenHeat",name:"Superheated Oven",icon:"🔥",desc:"Double production from every building.",cost:900,effect:"rate",value:2},
 {id:"royalRecipe",name:"Royal Recipe",icon:"📜",desc:"Triple production from every building.",cost:6000,effect:"rate",value:3}
];
const achievementDefs=[
 {id:"firstCookie",name:"First Batch",desc:"Bake your first cookie.",icon:"🍪",test:s=>s.total>=1},
 {id:"hundred",name:"Baker's Dozen Plus",desc:"Bake 100 cookies in total.",icon:"🥣",test:s=>s.total>=100},
 {id:"thousand",name:"Cookie Collector",desc:"Bake 1,000 cookies in total.",icon:"💰",test:s=>s.total>=1000},
 {id:"firstBuilding",name:"A Place to Bake",desc:"Purchase your first building.",icon:"🏠",test:s=>Object.values(s.buildings).some(v=>v>0)},
 {id:"empire",name:"Cookie Emperor",desc:"Reach 10,000 cookies baked.",icon:"👑",test:s=>s.total>=10000}
];
const defaultGame=()=>({cookies:0,total:0,clickPower:1,buildings:{bakery:0,farm:0,factory:0,castle:0},upgrades:[],lastTime:Date.now(),sound:false});
let gameState=defaultGame(),shopTab="buildings",soundContext=null;
function loadGame(){try{const saved=JSON.parse(localStorage.getItem(GAME_KEY)||"null");if(saved&&typeof saved==="object"){gameState={...defaultGame(),...saved,buildings:{...defaultGame().buildings,...(saved.buildings||{})},upgrades:Array.isArray(saved.upgrades)?saved.upgrades:[]};const elapsed=Math.max(0,Math.min((Date.now()-(Number(saved.lastTime)||Date.now()))/1000,60*60*8));const offline=productionRate()*elapsed;if(Number.isFinite(offline)&&offline>0){gameState.cookies+=offline;gameState.total+=offline;}}}catch{gameState=defaultGame()}gameState.lastTime=Date.now()}
function persistGame(){try{gameState.lastTime=Date.now();localStorage.setItem(GAME_KEY,JSON.stringify(gameState));const s=$("#saveStatus");if(s)s.textContent="PROGRESS SAVED";setTimeout(()=>{if(s)s.textContent="AUTO-SAVE ACTIVE"},1400)}catch{showToast("Save unavailable. Check browser storage settings.")}}
function productionRate(){let rate=0;buildingDefs.forEach(b=>rate+=(gameState.buildings[b.id]||0)*b.rate);if(gameState.upgrades.includes("ovenHeat"))rate*=2;if(gameState.upgrades.includes("royalRecipe"))rate*=3;return rate}
function formatNumber(n){if(!Number.isFinite(n))return"0";if(n<1000)return Math.floor(n).toLocaleString();const units=[[1e12,"T"],[1e9,"B"],[1e6,"M"],[1e3,"K"]];for(const [v,s] of units)if(n>=v)return(n/v).toFixed(n/v>=100?0:1)+s;return Math.floor(n).toLocaleString()}
function addCookies(amount){if(!Number.isFinite(amount)||amount<=0)return;gameState.cookies+=amount;gameState.total+=amount;}
function playClickSound(){if(!gameState.sound)return;try{const Ctx=window.AudioContext||window.webkitAudioContext;if(!Ctx)return;soundContext ||= new Ctx();const osc=soundContext.createOscillator(),gain=soundContext.createGain();osc.type="sine";osc.frequency.value=520+Math.random()*120;gain.gain.setValueAtTime(.045,soundContext.currentTime);gain.gain.exponentialRampToValueAtTime(.001,soundContext.currentTime+.09);osc.connect(gain);gain.connect(soundContext.destination);osc.start();osc.stop(soundContext.currentTime+.1)}catch{}}
function renderShop(){const list=$("#shopItems");if(!list)return;list.innerHTML="";const items=shopTab==="buildings"?buildingDefs:upgradeDefs;$("#shopCount").textContent=`${items.length} ITEMS`;items.forEach(item=>{const owned=shopTab==="buildings"?(gameState.buildings[item.id]||0):gameState.upgrades.includes(item.id);const cost=shopTab==="buildings"?Math.floor(item.base*Math.pow(1.17,gameState.buildings[item.id]||0)):item.cost;const article=document.createElement("article");article.className="shop-item";const icon=document.createElement("div");icon.className="shop-item-icon";icon.textContent=item.icon;const info=document.createElement("div");const title=document.createElement("h3");title.textContent=item.name;const desc=document.createElement("p");desc.textContent=item.desc;const meta=document.createElement("small");meta.textContent=shopTab==="buildings"?`OWNED: ${owned} • +${item.rate}/SEC EACH`:(owned?"PURCHASED":"ONE-TIME UPGRADE");info.append(title,desc,meta);const button=document.createElement("button");button.className="buy-button";button.textContent=owned&&shopTab==="upgrades"?"OWNED":`🍪 ${formatNumber(cost)}`;button.disabled=(owned&&shopTab==="upgrades")||gameState.cookies<cost;button.addEventListener("click",()=>buyItem(item.id));article.append(icon,info,button);list.append(article)})}
function buyItem(id){if(shopTab==="buildings"){const item=buildingDefs.find(x=>x.id===id);if(!item)return;const count=gameState.buildings[id]||0,cost=Math.floor(item.base*Math.pow(1.17,count));if(gameState.cookies<cost)return;gameState.cookies-=cost;gameState.buildings[id]=count+1;showToast(`${item.name} purchased.`)}else{const item=upgradeDefs.find(x=>x.id===id);if(!item||gameState.upgrades.includes(id)||gameState.cookies<item.cost)return;gameState.cookies-=item.cost;gameState.upgrades.push(id);if(item.effect==="click")gameState.clickPower*=item.value;showToast(`${item.name} unlocked.`)}persistGame();renderGame()}
function renderAchievements(){const list=$("#achievementList");if(!list)return;list.innerHTML="";let unlocked=0;achievementDefs.forEach(a=>{const done=a.test(gameState);if(done)unlocked++;const row=document.createElement("div");row.className=`achievement${done?" unlocked":""}`;const icon=document.createElement("div");icon.className="achievement-icon";icon.textContent=a.icon;const text=document.createElement("div");const title=document.createElement("strong");title.textContent=a.name;const desc=document.createElement("span");desc.textContent=a.desc;text.append(title,desc);row.append(icon,text);list.append(row)});$("#achievementCount").textContent=`${unlocked} / ${achievementDefs.length}`}
function renderGame(){if(!gameView||gameView.hidden)return;$("#cookieCount").textContent=formatNumber(gameState.cookies);$("#cookieRate").textContent=formatNumber(productionRate().toFixed(1));$("#totalBaked").textContent=formatNumber(gameState.total);$("#clickPower").textContent=formatNumber(gameState.clickPower);$("#buildingCount").textContent=Object.values(gameState.buildings).reduce((a,b)=>a+b,0);const level=1+Math.floor(Math.log10(Math.max(1,gameState.total)));$("#kingdomLevel").textContent=`LEVEL ${level}`;const progress=Math.min(100,(gameState.total%1000)/10);$("#empireProgressBar").style.width=`${progress}%`;$("#empireProgressText").textContent=`${formatNumber(gameState.total%1000)} / 1,000 cookies to next milestone`;$("#gameSoundToggle").textContent=`SOUND: ${gameState.sound?"ON":"OFF"}`;$("#gameSoundToggle").setAttribute("aria-pressed",String(gameState.sound));renderShop();renderAchievements()}
$("#giantCookie")?.addEventListener("click",()=>{addCookies(gameState.clickPower);playClickSound();renderGame();if(Math.floor(gameState.total)%10===0)persistGame()});
$$ (".shop-tab").forEach(b=>b.addEventListener("click",()=>{shopTab=b.dataset.shopTab;$$ (".shop-tab").forEach(x=>x.classList.toggle("active",x===b));renderShop()}));
$("#gameSoundToggle")?.addEventListener("click",()=>{gameState.sound=!gameState.sound;renderGame();if(gameState.sound)playClickSound();persistGame()});
$("#saveGameButton")?.addEventListener("click",()=>{persistGame();showToast("Cookie Emperor progress saved.")});
$("#resetGameButton")?.addEventListener("click",()=>{if(!confirm("Reset all Cookie Emperor progress? This cannot be undone."))return;gameState=defaultGame();persistGame();renderGame();showToast("Your bakery kingdom has been reset.")});
loadGame();
let lastGameTick=performance.now();setInterval(()=>{const now=performance.now(),elapsed=Math.min((now-lastGameTick)/1000,1);lastGameTick=now;if(!gameView||gameView.hidden)return;const earned=productionRate()*elapsed;if(earned>0){addCookies(earned);renderGame()}},250);
setInterval(()=>{if(gameView&&!gameView.hidden)persistGame()},10000);

/* Initial state */
function initializePixaforge(){filterGames();updateFavoriteButtons();updateScrollInterface();route();console.log("%cPIXAFORGE","color:#c084fc;font-size:24px;font-weight:900;");console.log("%cFORGE YOUR EXPERIENCE.","color:#00e5ff;font-size:12px;")}
initializePixaforge();
