const params=new URLSearchParams(location.search),zoom=params.get('demo')==='tx-zoom',embedded=params.has('embedded');
document.body.classList.add(zoom?'zoom':'clip');document.body.classList.toggle('embedded',embedded);
document.querySelector('h1').textContent=zoom?'Zoom through':'Clip path reveal';document.title=(zoom?'Zoom through':'Clip path reveal')+' — Atlas';document.querySelector(`nav a[href="?demo=tx-${zoom?'zoom':'clip'}"]`).setAttribute('aria-current','page');
const slider=document.querySelector('input'),output=document.querySelector('output'),clip=document.querySelector('.clip-scene'),portal=document.querySelector('.portal-scene'),destination=document.querySelector('.destination'),stage=document.querySelector('.stage'),button=document.querySelector('[data-replay]');
let paused=params.has('paused')||matchMedia('(prefers-reduced-motion: reduce)').matches,origin=[50,50],tween;
const state={progress:paused?1:zoom?.26:.25};
function draw(){const p=state.progress;slider.value=String(Math.round(p*100));output.value=Math.round(p*100)+'%';if(zoom){gsap.set(portal,{scale:Math.pow(9,p),opacity:p>.96?Math.max(0,(1-p)/.04):1});gsap.set(destination,{scale:.8+p*.2});}else{clip.style.clipPath=`circle(${p*150}% at ${origin[0]}% ${origin[1]}%)`;}}
function replay(){tween?.kill();state.progress=0;draw();if(paused){state.progress=1;draw();return;}button.textContent='Replay ↗';tween=gsap.to(state,{progress:1,duration:1.7,ease:'power3.inOut',onUpdate:draw});}
button.onclick=replay;
slider.oninput=()=>{tween?.kill();state.progress=Number(slider.value)/100;draw();};
stage.addEventListener('pointerdown',e=>{if(zoom||e.target.closest('.controls'))return;const r=stage.getBoundingClientRect();origin=[(e.clientX-r.left)/r.width*100,(e.clientY-r.top)/r.height*100];replay();});
window.addEventListener('message',e=>{if(e.source===parent&&e.origin===location.origin&&e.data?.type==='atlas-motion'){paused=Boolean(e.data.paused);if(paused){tween?.kill();state.progress=1;draw();}}});
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',e=>{if(e.matches){paused=true;tween?.kill();state.progress=1;draw();}});
document.addEventListener('visibilitychange',()=>{if(document.hidden)tween?.pause();});window.addEventListener('pagehide',()=>tween?.kill());
draw();parent.postMessage({type:'atlas-preview-ready'},location.origin);
