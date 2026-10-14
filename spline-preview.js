const container=document.getElementById('scene'),button=document.querySelector('[data-play]');
let running=false;
function play(next){running=next;container.replaceChildren();if(next){const frame=document.createElement('iframe');frame.title='Spline Mini Home — official interactive template';frame.src='https://app.spline.design/file/8dca6daa-d77b-4c65-85a5-b220b8b66ba0?view=preview';frame.allowFullscreen=true;container.append(frame);}button.textContent=next?'Pause scene':'Play scene';button.setAttribute('aria-pressed',String(next));}
button.onclick=()=>play(!running);
window.addEventListener('message',e=>{if(e.source===parent&&e.origin===location.origin&&e.data?.type==='atlas-motion'&&e.data.paused)play(false);});
document.addEventListener('visibilitychange',()=>{if(document.hidden)play(false);});
window.addEventListener('pagehide',()=>play(false));
