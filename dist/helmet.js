import * as THREE from './vendor/three.module.js';
export function mountHelmet(el,paused,notify){
  const resources=new Set(),scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(35,1,.1,50);camera.position.set(0,.25,5.5);camera.lookAt(0,.05,0);
  const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
  renderer.domElement.setAttribute('aria-label','Original 3D helmet. Move the pointer to reveal its surface. Use the buttons to show or lock the reveal.');
  renderer.domElement.tabIndex=0;el.prepend(renderer.domElement);
  scene.add(new THREE.AmbientLight('#ffffff',2));const key=new THREE.DirectionalLight('#ffffff',4);key.position.set(3,4,5);scene.add(key);const rim=new THREE.DirectionalLight('#d7f2a5',2);rim.position.set(-4,1,-2);scene.add(rim);
  const object=new THREE.Group();object.rotation.y=.32;scene.add(object);
  const uniforms={uPointer:{value:new THREE.Vector2(.5,.55)},uResolution:{value:new THREE.Vector2(1,1)},uReveal:{value:.7},uFull:{value:0}};
  function solid(color,metalness=.15,roughness=.4){const mat=new THREE.MeshStandardMaterial({color,metalness,roughness,side:THREE.DoubleSide});resources.add(mat);mat.onBeforeCompile=shader=>{Object.assign(shader.uniforms,uniforms);shader.fragmentShader='uniform vec2 uPointer;uniform vec2 uResolution;uniform float uReveal;uniform float uFull;\n'+shader.fragmentShader;shader.fragmentShader=shader.fragmentShader.replace('#include <clipping_planes_fragment>','#include <clipping_planes_fragment>\nvec2 delta=(gl_FragCoord.xy/uResolution-uPointer)*vec2(uResolution.x/uResolution.y,1.0);float revealMask=1.0-smoothstep(0.24,0.31,length(delta));if(uFull<0.5 && revealMask*uReveal<0.18)discard;');};return mat;}
  const wire=new THREE.MeshBasicMaterial({color:'#486a45',wireframe:true,transparent:true,opacity:.4,depthWrite:false});resources.add(wire);
  wire.onBeforeCompile=shader=>{Object.assign(shader.uniforms,uniforms);shader.fragmentShader='uniform vec2 uPointer;uniform vec2 uResolution;uniform float uReveal;uniform float uFull;\n'+shader.fragmentShader;shader.fragmentShader=shader.fragmentShader.replace('#include <clipping_planes_fragment>','#include <clipping_planes_fragment>\nvec2 delta=(gl_FragCoord.xy/uResolution-uPointer)*vec2(uResolution.x/uResolution.y,1.0);float revealMask=1.0-smoothstep(0.24,0.31,length(delta));if(uFull>0.5 || revealMask*uReveal>=0.18)discard;');};
  function part(geometry,material,position=[0,0,0],scale=[1,1,1],rotation=[0,0,0]){resources.add(geometry);const group=new THREE.Group();group.position.set(...position);group.scale.set(...scale);group.rotation.set(...rotation);group.add(new THREE.Mesh(geometry,material));const ghost=new THREE.Mesh(geometry,wire);ghost.scale.setScalar(1.003);group.add(ghost);object.add(group);return group;}
  const shell=new THREE.SphereGeometry(1.15,52,32,0,Math.PI*2,0,2.5);
  const pos=shell.attributes.position,indices=shell.index.array,filtered=[];
  for(let i=0;i<indices.length;i+=3){const a=indices[i],b=indices[i+1],c=indices[i+2];const y=(pos.getY(a)+pos.getY(b)+pos.getY(c))/3,z=(pos.getZ(a)+pos.getZ(b)+pos.getZ(c))/3;if(!(z>.72&&y>.12&&y<.72))filtered.push(a,b,c);}
  shell.setIndex(filtered);shell.computeVertexNormals();
  const lime=solid('#c5db45'),dark=solid('#26332e',.65,.22),trim=solid('#6f865b',.2,.45),visor=solid('#53616a',.75,.14);
  part(shell,lime,[0,.12,0],[.88,1,1]);
  part(new THREE.SphereGeometry(1.155,48,9,0,Math.PI,1.0,.45),visor,[0,.12,0],[.89,1,1.01]);
  part(new THREE.TorusGeometry(.79,.105,10,50,Math.PI),lime,[0,-.6,.12],[1,1.16,1],[Math.PI/2,0,0]);
  part(new THREE.TorusGeometry(.8,.04,8,48),dark,[0,-.8,0],[1,1.15,1],[Math.PI/2,0,0]);
  for(const x of [-.97,.97])part(new THREE.CylinderGeometry(.1,.1,.05,14),trim,[x,.38,.16],[1,1,1],[0,0,Math.PI/2]);
  for(const x of [-.19,0,.19])part(new THREE.BoxGeometry(.085,.12,.025),dark,[x,-.55,.88]);
  part(new THREE.SphereGeometry(1.16,48,5,0,Math.PI*2,.25,.12),dark,[0,.12,0],[.88,1,1]);
  let hovered=false,locked=false,full=false,targetX=.32,targetY=0,frame;
  const disposers=[],listen=(node,event,fn)=>{node.addEventListener(event,fn);disposers.push(()=>node.removeEventListener(event,fn));};
  const status=()=>{el.querySelector('.helmet-status').textContent=full?'Full surface':locked?'Reveal locked':'Move over the helmet';el.querySelector('[data-helmet=full]').setAttribute('aria-pressed',full);el.querySelector('[data-helmet=full]').textContent=full?'Wireframe':'Show full';el.querySelector('[data-helmet=lock]').setAttribute('aria-pressed',locked);el.querySelector('[data-helmet=lock]').textContent=locked?'Unlock':'Lock reveal';};
  const move=event=>{if(locked)return;const r=renderer.domElement.getBoundingClientRect();const x=(event.clientX-r.left)/r.width,y=1-(event.clientY-r.top)/r.height;uniforms.uPointer.value.set(x,y);hovered=true;targetX=.32+(x-.5)*.5;targetY=(y-.5)*.2;};
  listen(renderer.domElement,'pointermove',move);listen(renderer.domElement,'pointerdown',move);listen(renderer.domElement,'pointerenter',()=>hovered=true);listen(renderer.domElement,'pointerleave',()=>{if(!locked)hovered=false;});
  listen(renderer.domElement,'focus',()=>hovered=true);listen(renderer.domElement,'blur',()=>{if(!locked)hovered=false;});
  listen(renderer.domElement,'keydown',event=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Enter',' '].includes(event.key))return;event.preventDefault();hovered=true;if(['Enter',' '].includes(event.key)){full=!full;uniforms.uFull.value=Number(full);}if(!locked){uniforms.uPointer.value.x=THREE.MathUtils.clamp(uniforms.uPointer.value.x+(event.key==='ArrowRight'?.05:event.key==='ArrowLeft'?-.05:0),0,1);uniforms.uPointer.value.y=THREE.MathUtils.clamp(uniforms.uPointer.value.y+(event.key==='ArrowUp'?.05:event.key==='ArrowDown'?-.05:0),0,1);}status();});
  listen(el.querySelector('.helmet-controls'),'click',event=>{const action=event.target.closest('[data-helmet]')?.dataset.helmet;if(action==='full'){full=!full;uniforms.uFull.value=Number(full);}if(action==='lock'){locked=!locked;hovered=true;}if(action==='reset'){locked=false;full=false;hovered=false;uniforms.uFull.value=0;uniforms.uPointer.value.set(.5,.55);targetX=.32;targetY=0;notify('Helmet reveal reset.');}status();});
  const resize=()=>{const r=el.getBoundingClientRect();renderer.setSize(r.width,r.height);uniforms.uResolution.value.set(renderer.domElement.width,renderer.domElement.height);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();renderer.render(scene,camera);};const observer=new ResizeObserver(resize);observer.observe(el);resize();status();
  const tick=()=>{const k=paused()?1:.12;uniforms.uReveal.value+=(Number(hovered||locked)-uniforms.uReveal.value)*k;object.rotation.y+=(targetX-object.rotation.y)*k;object.rotation.x+=(targetY-object.rotation.x)*k;renderer.render(scene,camera);frame=requestAnimationFrame(tick);};tick();
  return()=>{cancelAnimationFrame(frame);observer.disconnect();disposers.forEach(fn=>fn());resources.forEach(r=>r.dispose());renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();};
}
