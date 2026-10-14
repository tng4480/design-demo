export const neuroPresets={
 Default:{colorFront:'#ffffff',colorMid:'#47a6ff',colorBack:'#000000',brightness:.05,contrast:.3,speed:1,scale:1,rotation:0},
 Sensation:{colorFront:'#00c8ff',colorMid:'#fbff00',colorBack:'#8b42ff',brightness:.19,contrast:.12,speed:1,scale:3,rotation:0},
 Bloodstream:{colorFront:'#ff0000',colorMid:'#ff0000',colorBack:'#ffffff',brightness:.24,contrast:.17,speed:1,scale:.7,rotation:0},
 Ghost:{colorFront:'#ffffff',colorMid:'#000000',colorBack:'#ffffff',brightness:0,contrast:1,speed:1,scale:.55,rotation:0}
};
export function mountNeuro(container,{paused=()=>false,settings={...neuroPresets.Default},onError=()=>{}}={}){
 let instance,dead=false,timer,lastSpeed;
 const state={...neuroPresets.Default,...settings};
 const uniforms=()=>{const color=library.getShaderColorFromString;return{u_colorFront:color(state.colorFront),u_colorMid:color(state.colorMid),u_colorBack:color(state.colorBack),u_brightness:state.brightness,u_contrast:state.contrast,u_scale:state.scale,u_rotation:state.rotation,u_fit:0,u_originX:.5,u_originY:.5,u_offsetX:0,u_offsetY:0,u_worldWidth:0,u_worldHeight:0};};
 const apply=()=>{if(!instance)return;instance.setUniforms(uniforms());speed();};
 const speed=()=>{if(!instance)return;const next=paused()?0:state.speed;if(next!==lastSpeed){lastSpeed=next;instance.setSpeed(next);}};
 let library;
 const ready=import('./vendor/paper-neuro.js').then(lib=>{
  if(dead)return;library=lib;
  instance=new lib.ShaderMount(container,lib.neuroNoiseFragmentShader,uniforms(), {alpha:false,antialias:false},0,5000,1,1600000);
  instance.canvasElement.setAttribute('aria-label','Actual Paper Neuro Noise shader');
  instance.canvasElement.setAttribute('role','img');
  apply();timer=setInterval(speed,120);return instance;
 }).catch(error=>{if(dead)return;instance?.dispose();container.innerHTML='<p class="neuro-fallback">This shader needs WebGL2. Try a compatible browser or visit the official Paper example.</p>';onError(error);});
 return{ready,state,update(values){Object.assign(state,values);apply();},resetFrame(){instance?.setFrame(5000);},dispose(){dead=true;clearInterval(timer);instance?.dispose();}};
}
export function mountNeuroPreview(el,paused){
 const shader=mountNeuro(el.querySelector('.neuro-surface'),{paused});
 const buttons=[...el.querySelectorAll('[data-neuro-preset]')];
 const select=e=>{const name=e.currentTarget.dataset.neuroPreset;shader.update(neuroPresets[name]);buttons.forEach(b=>b.setAttribute('aria-pressed',b===e.currentTarget));el.classList.toggle('neuro-light',name==='Bloodstream'||name==='Ghost');};
 buttons.forEach(b=>b.addEventListener('click',select));
 return{replay:()=>shader.resetFrame(),dispose(){buttons.forEach(b=>b.removeEventListener('click',select));shader.dispose();}};
}
if(document.querySelector('#neuro-playground')){
 const stage=document.querySelector('#neuro-playground'),headline=document.querySelector('#neuro-headline');
 let localPause=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const shader=mountNeuro(stage,{paused:()=>localPause,onError:()=>{document.querySelector('#neuro-status').textContent='WebGL2 is unavailable on this device.';}});
 const inputs=[...document.querySelectorAll('[data-neuro-param]')],presets=[...document.querySelectorAll('[data-preset]')];
 const drawControls=()=>{for(const input of inputs){const key=input.dataset.neuroParam;input.value=shader.state[key];const out=document.querySelector(`[data-value="${key}"]`);if(out)out.value=Number(input.value).toFixed(key==='rotation'?0:2);}headline.classList.toggle('light-background',['#ffffff'].includes(shader.state.colorBack));};
 const selectPreset=name=>{document.querySelector('#neuro-status').textContent='';shader.update(neuroPresets[name]);drawControls();presets.forEach(b=>b.setAttribute('aria-pressed',b.dataset.preset===name));};
 presets.forEach(b=>b.addEventListener('click',()=>selectPreset(b.dataset.preset)));
 inputs.forEach(input=>input.addEventListener('input',()=>{document.querySelector('#neuro-status').textContent='';const key=input.dataset.neuroParam;shader.update({[key]:input.type==='color'?input.value:Number(input.value)});presets.forEach(b=>b.setAttribute('aria-pressed','false'));drawControls();}));
 const pause=document.querySelector('#neuro-pause');const labelPause=()=>{pause.textContent=localPause?'Resume motion':'Pause motion';pause.setAttribute('aria-pressed',localPause);};pause.onclick=()=>{document.querySelector('#neuro-status').textContent='';localPause=!localPause;labelPause();shader.update({});};labelPause();
 document.querySelector('#neuro-reset').onclick=()=>{selectPreset('Default');shader.resetFrame();document.querySelector('#neuro-status').textContent='Default preset restored.';};
 document.querySelector('#neuro-headline-toggle').onclick=e=>{headline.hidden=!headline.hidden;e.currentTarget.setAttribute('aria-pressed',!headline.hidden);e.currentTarget.textContent=headline.hidden?'Show example headline':'Hide example headline';};
 document.querySelector('#neuro-copy').onclick=()=>{const s=shader.state;const code=`import { NeuroNoise } from '@paper-design/shaders-react';\n\n<NeuroNoise\n  style={{ width: '100%', height: 500 }}\n  colorFront="${s.colorFront}"\n  colorMid="${s.colorMid}"\n  colorBack="${s.colorBack}"\n  brightness={${s.brightness}}\n  contrast={${s.contrast}}\n  scale={${s.scale}}\n  rotation={${s.rotation}}\n  speed={${localPause?0:s.speed}}\n/>`;navigator.clipboard.writeText(code).then(()=>{document.querySelector('#neuro-status').textContent='React usage copied with your current settings.';}).catch(()=>{document.querySelector('#neuro-code').textContent=code;document.querySelector('#neuro-code').hidden=false;});};
 drawControls();window.addEventListener('pagehide',()=>shader.dispose(),{once:true});
}
