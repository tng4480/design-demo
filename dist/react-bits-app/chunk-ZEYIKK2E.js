"use client";import{c as $,d as Be,e as me}from"./chunk-P3PGQN3B.js";var w=$(Be());var K=$(me()),Ge=`#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`,we=`
uniform vec2 uView;
uniform float uScale;
uniform float uRotation;
uniform float uTime;
uniform float uWave;
uniform float uRipple;
uniform float uFold;
uniform vec2 uShift;
uniform vec4 uPointer;
uniform vec2 uDrag;
uniform vec4 uWaves[4];

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2 r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2 rot = mat2(c, -s, s, c);
  return rot * uv;
}

vec2 bend(vec2 uv) {
  vec2 aspect = vec2(uView.x / uView.y, 1.0);
  vec2 offset = (uv - uPointer.xy) * aspect;
  float touch = uPointer.z * exp(-dot(offset, offset) / (uPointer.w * uPointer.w));
  uv -= uDrag * touch;
  for (int i = 0; i < 4; i++) {
    vec4 wave = uWaves[i];
    if (wave.w <= 0.0) continue;
    vec2 q = (uv - wave.xy) * aspect;
    float dist = length(q);
    float front = dist - wave.z;
    float ring = exp(-front * front * 60.0) * wave.w;
    uv += q / max(dist, 0.0001) / aspect * ring * 0.034 * sin(front * 34.0);
  }
  return uv;
}

float silk(vec2 vUv) {
  vec2 uv = rotateUvs(vUv * uScale, uRotation);
  vec2 tex = uv * uScale + uShift;
  float tOffset = uTime;
  tex.y += 0.03 * uWave * sin(8.0 * tex.x - tOffset);
  return 0.6 + 0.4 * uFold * sin(5.0 * (tex.x + tex.y + cos(3.0 * tex.x + 5.0 * tex.y) + 0.02 * tOffset) + uRipple * sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));
}
`,Ne=`#version 300 es
precision highp float;
${we}
out vec4 outColor;

void main() {
  vec2 vUv = gl_FragCoord.xy / uView;
  float pattern = silk(bend(vUv));
  float n = clamp((pattern - 0.2) / 0.8, 0.0, 1.0);
  outColor = vec4(pow(n, 6.0), 0.0, 0.0, 1.0);
}`,ke=`#version 300 es
precision highp float;
${we}
uniform sampler2D uBloom;
uniform vec3 uColor;
uniform vec3 uSheenColor;
uniform float uNoiseIntensity;
uniform float uDepth;
uniform float uSheen;
uniform float uGlow;
uniform float uLightMode;
uniform vec3 uLight;
uniform vec2 uStep;
uniform float uPresence;
uniform float uFade;
out vec4 outColor;

float smootherstep01(float t) {
  t = clamp(t, 0.0, 1.0);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

vec3 softClip(vec3 c) {
  vec3 over = max(c - 0.75, 0.0);
  return min(c, 0.75) + 0.25 * (1.0 - exp(-over * 4.0));
}

void main() {
  vec2 vUv = gl_FragCoord.xy / uView;
  vec2 coord = bend(vUv);
  float pattern = silk(coord);
  float rnd = noise(gl_FragCoord.xy);
  float n = clamp((pattern - 0.2) / 0.8, 0.0, 1.0);

  float gx = silk(coord + vec2(uStep.x, 0.0)) - pattern;
  float gy = silk(coord + vec2(0.0, uStep.y)) - pattern;
  vec3 normal = normalize(vec3(-gx * 26.0, -gy * 26.0, 1.0));
  vec3 toLight = normalize(vec3(uLight.xy, 0.85));
  float relief = 1.0 + (dot(normal, toLight) - toLight.z) * 1.8 * uDepth;
  vec3 halfway = normalize(toLight + vec3(0.0, 0.0, 1.0));
  float gloss = pow(max(dot(normal, halfway), 0.0), 48.0) * smoothstep(0.25, 0.85, n);
  float crest = pow(n, 5.0);
  float shine = (gloss * 0.85 + crest * 0.4) * uSheen * (1.0 + uLight.z * 0.6);

  float bloom = 0.0;
  if (uGlow > 0.0) {
    bloom += textureLod(uBloom, vUv, 1.0).r * 0.35;
    bloom += textureLod(uBloom, vUv, 2.0).r * 0.3;
    bloom += textureLod(uBloom, vUv, 3.0).r * 0.2;
    bloom += textureLod(uBloom, vUv, 4.0).r * 0.15;
  }

  vec3 result;
  if (uLightMode > 0.5) {
    float fold = smoothstep(0.28, 0.9, pattern);
    float specular = smoothstep(0.72, 0.98, pattern);
    vec3 shadowColor = uColor * (0.72 - 0.12 * uDepth);
    vec3 bodyColor = min(uColor * 1.18, vec3(1.0));
    vec3 lightBase = mix(shadowColor, bodyColor, fold) * mix(1.0, relief, 0.6);
    lightBase = mix(lightBase, vec3(1.0), clamp(specular * 0.92 + shine * 0.22 + bloom * uGlow * 0.2, 0.0, 1.0));
    float fineNoise = noise(gl_FragCoord.xy * 0.63 + vec2(17.0, 41.0));
    float grainSignal = (rnd + fineNoise - 1.0);
    float grainStrength = clamp(uNoiseIntensity * 0.038, 0.0, 0.16);
    result = clamp(lightBase + grainSignal * grainStrength, 0.0, 1.0);
  } else {
    float grain = rnd / 15.0 * uNoiseIntensity;
    float floorValue = mix(0.2, 0.03, uDepth);
    float curve = uDepth > 0.0 ? pow(n, 1.0 + 1.4 * uDepth) : n;
    float shade = uDepth > 0.0 ? floorValue + (1.0 - floorValue) * curve : pattern;
    vec3 tone = mix(uColor, pow(uColor, vec3(1.45)), (1.0 - n) * uDepth);
    vec3 lit = tone * shade * relief - vec3(grain);
    vec3 tint = mix(uColor, uSheenColor, 0.8);
    vec3 extra = tint * (shine + bloom * uGlow * 0.55);
    float blend = clamp((uSheen + uGlow) * 4.0, 0.0, 1.0);
    result = mix(clamp(lit, 0.0, 1.0), clamp(softClip(lit + extra), 0.0, 1.0), blend);
  }

  float edge = uFade * 0.5;
  float mask = 1.0;
  if (edge > 0.0) {
    mask = smootherstep01(vUv.x / edge) * smootherstep01((1.0 - vUv.x) / edge);
    mask *= smootherstep01(vUv.y / edge) * smootherstep01((1.0 - vUv.y) / edge);
  }
  float alpha = uPresence * mask;
  outColor = vec4(result * alpha, alpha);
}`,Ye=2.2,Oe=1.6,ve=1.6,S=[-.55,.7],ge=Math.hypot(S[0],S[1]),B=(r,m,h)=>Math.min(h,Math.max(m,r)),Ve=r=>r*r*r*(r*(r*6-15)+10),We=r=>{let m=Number(r)||0;if(!m)return[0,0];let h=u=>{let s=Math.sin(m*12.9898+u*78.233)*43758.5453;return s-Math.floor(s)-.5};return[h(1)*6,h(2)*6]},pe=(r,m,h)=>{let u=r.createShader(m);return u?(r.shaderSource(u,h),r.compileShader(u),r.getShaderParameter(u,r.COMPILE_STATUS)?u:(r.deleteShader(u),null)):null},xe=(r,m)=>{let h=pe(r,r.VERTEX_SHADER,Ge),u=pe(r,r.FRAGMENT_SHADER,m),s=r.createProgram();if(!h||!u||!s)return null;if(r.attachShader(s,h),r.attachShader(s,u),r.bindAttribLocation(s,0,"aPosition"),r.linkProgram(s),r.deleteShader(h),r.deleteShader(u),!r.getProgramParameter(s,r.LINK_STATUS))return r.deleteProgram(s),null;let P={},G=r.getProgramParameter(s,r.ACTIVE_UNIFORMS);for(let A=0;A<G;A++){let L=r.getActiveUniform(s,A);L&&(P[L.name.replace(/\[0\]$/,"")]=r.getUniformLocation(s,L.name))}return{program:s,uniforms:P}},ze=({speed:r=5,scale:m=1,color:h="#7B7481",sheenColor:u="#ffffff",noiseIntensity:s=1.5,rotation:P=0,sheen:G=.5,depth:A=.5,glow:L=.3,ripple:Ee=1,wave:Te=1,variation:Re=0,mouseInteraction:ye=!0,interactionStrength:Me=1,clickRipple:be=!0,intro:Se=!0,fade:Ae=0,lightMode:Le=!1,paused:Fe=!1,dpr:_e,className:J="",style:Pe})=>{let Q=(0,w.useRef)(null),Z=(0,w.useRef)(null),N=(0,w.useRef)(null),g=(0,w.useRef)(null);return g.current={speed:r,scale:m,color:String(h),sheenColor:String(u),noiseIntensity:Math.max(0,s),rotation:P,sheen:Math.max(0,G),depth:B(A,0,1),glow:Math.max(0,L),ripple:Math.max(0,Ee),wave:Math.max(0,Te),variation:Re,mouseInteraction:ye,interactionStrength:Math.max(0,Me),clickRipple:be,intro:Se,fade:B(Ae,0,1),lightMode:Le,paused:Fe,dpr:_e},(0,w.useEffect)(()=>{let R=Q.current,d=Z.current,e=d?.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1,powerPreference:"high-performance"});if(!R||!d||!e)return;let U=xe(e,Ne),C=xe(e,ke);if(!U||!C)return;let j=e.createBuffer(),k=e.createVertexArray();e.bindVertexArray(k),e.bindBuffer(e.ARRAY_BUFFER,j),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0);let F=e.createTexture(),Y=e.createFramebuffer(),p={width:0,height:0},Ue=(t,n)=>{p.width===t&&p.height===n||(p.width=t,p.height=n,e.bindTexture(e.TEXTURE_2D,F),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,t,n,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.bindFramebuffer(e.FRAMEBUFFER,Y),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,F,0))},y=document.createElement("canvas").getContext("2d",{willReadFrequently:!0}),O=new Map,ee=t=>{if(O.has(t))return O.get(t);let n=[1,1,1];if(y){y.clearRect(0,0,1,1),y.fillStyle="#ffffff",y.fillStyle=t,y.fillRect(0,0,1,1);let[a,i,c]=y.getImageData(0,0,1,1).data;n=[a/255,i/255,c/255]}return O.set(t,n),n},_=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,l={width:1,height:1,ratio:1},f={x:0,y:0,inside:!1},v=[],V=new Float32Array(16),o={flow:0,intro:g.current.intro&&!_?0:1,touch:0,x:0,y:0,dragX:0,dragY:0,lightX:S[0],lightY:S[1]},E=0,M=0,D=!0,te=(t,n,a,i,c)=>{let[b,H]=We(i.variation);e.uniform2f(t.uView,n,a),e.uniform1f(t.uScale,i.scale),e.uniform1f(t.uRotation,i.rotation),e.uniform1f(t.uTime,o.flow-Oe*(1-c)),e.uniform1f(t.uWave,i.wave),e.uniform1f(t.uRipple,i.ripple),e.uniform1f(t.uFold,.25+.75*c),e.uniform2f(t.uShift,b,H),e.uniform4f(t.uPointer,o.x/l.width,1-o.y/l.height,o.touch*i.interactionStrength,.32),e.uniform2f(t.uDrag,o.dragX,o.dragY),e.uniform4fv(t.uWaves,V)},W=()=>{let t=g.current,n=Ve(o.intro),a=1-Math.pow(1-o.intro,3);e.bindVertexArray(k),V.fill(0),v.slice(-4).forEach((c,b)=>{V.set([c.x,c.y,c.age*.6,Math.exp(-c.age/(ve*.45))],b*4)}),t.glow>0&&(Ue(Math.max(1,Math.round(d.width/4)),Math.max(1,Math.round(d.height/4))),e.bindFramebuffer(e.FRAMEBUFFER,Y),e.viewport(0,0,p.width,p.height),e.useProgram(U.program),te(U.uniforms,p.width,p.height,t,n),e.drawArrays(e.TRIANGLES,0,3),e.bindTexture(e.TEXTURE_2D,F),e.generateMipmap(e.TEXTURE_2D));let i=C.uniforms;e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,d.width,d.height),e.useProgram(C.program),te(i,d.width,d.height,t,n),e.uniform3fv(i.uColor,ee(t.color)),e.uniform3fv(i.uSheenColor,ee(t.sheenColor)),e.uniform1f(i.uNoiseIntensity,t.noiseIntensity),e.uniform1f(i.uDepth,t.depth),e.uniform1f(i.uSheen,t.sheen),e.uniform1f(i.uGlow,t.glow),e.uniform1f(i.uLightMode,t.lightMode?1:0),e.uniform3f(i.uLight,o.lightX,o.lightY,o.touch*t.interactionStrength),e.uniform2f(i.uStep,l.ratio/d.width,l.ratio/d.height),e.uniform1f(i.uPresence,a),e.uniform1f(i.uFade,t.fade),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,F),e.uniform1i(i.uBloom,0),e.drawArrays(e.TRIANGLES,0,3)},oe=t=>{if(E=0,!D||document.hidden)return;let n=g.current,a=M?Math.min(.05,(t-M)/1e3):1/60;M=t;let i=!n.paused&&!_&&n.speed!==0;i&&(o.flow+=a*.1*n.speed),!n.intro||_?o.intro=1:o.intro<1&&(o.intro=Math.min(1,o.intro+a/Ye));let c=n.mouseInteraction&&f.inside&&!_;c&&o.touch<.01&&(o.x=f.x,o.y=f.y);let b=1-Math.exp(-a*10),H=o.x,Ce=o.y;o.x+=(f.x-o.x)*b,o.y+=(f.y-o.y)*b;let De=(o.x-H)/Math.max(a,.001)/l.height,Ie=(o.y-Ce)/Math.max(a,.001)/l.height,fe=1-Math.exp(-a*4);o.dragX+=(B(De*.03,-.06,.06)-o.dragX)*fe,o.dragY+=(B(-Ie*.03,-.06,.06)-o.dragY)*fe,o.touch+=((c?1:0)-o.touch)*(1-Math.exp(-a*(c?3.5:1.4)));let I=S[0],X=S[1];if(c){let x=(f.x/l.width-.5)*(l.width/l.height),de=.5-f.y/l.height,q=Math.hypot(x,de);q>.04?(I=x/q*ge,X=de/q*ge):(I=o.lightX,X=o.lightY)}let he=1-Math.exp(-a*3);o.lightX+=(I-o.lightX)*he,o.lightY+=(X-o.lightY)*he;for(let x=v.length-1;x>=0;x--)v[x].age+=a,v[x].age>ve*2.5&&v.splice(x,1);W();let Xe=o.intro<1||v.length>0||Math.abs((c?1:0)-o.touch)>.002||Math.abs(o.dragX)+Math.abs(o.dragY)>2e-4||Math.abs(f.x-o.x)+Math.abs(f.y-o.y)>.3||Math.abs(I-o.lightX)+Math.abs(X-o.lightY)>.001;i||Xe?E=requestAnimationFrame(oe):M=0},T=()=>{!E&&D&&!document.hidden&&(E=requestAnimationFrame(oe))},z=()=>{let t=g.current,n=Math.max(1,R.clientWidth),a=Math.max(1,R.clientHeight),i=Math.min(t.dpr||window.devicePixelRatio||1,2);l.width=n,l.height=a,l.ratio=i,d.width=Math.max(1,Math.round(n*i)),d.height=Math.max(1,Math.round(a*i)),E||W(),T()},re=t=>{let n=R.getBoundingClientRect(),a=t.clientX-n.left,i=t.clientY-n.top;return{x:a,y:i,inside:a>=0&&i>=0&&a<=n.width&&i<=n.height}},ne=t=>{let n=re(t);f.x=n.x,f.y=n.y,f.inside=n.inside,T()},ie=t=>{if(!g.current.clickRipple||_)return;let a=re(t);a.inside&&(v.push({x:a.x/l.width,y:1-a.y/l.height,age:0}),v.length>4&&v.shift(),T())},ae=()=>{f.inside=!1,T()},se=()=>{M=0,T()},le=new ResizeObserver(z);le.observe(R);let ce=new IntersectionObserver(t=>{D=t.some(n=>n.isIntersecting),D&&(M=0,T())});ce.observe(R),window.addEventListener("pointermove",ne,{passive:!0}),window.addEventListener("pointerdown",ie,{passive:!0}),document.documentElement.addEventListener("pointerleave",ae),document.addEventListener("visibilitychange",se),z();let ue=g.current.dpr;return N.current=()=>{let t=g.current;if(t.dpr!==ue){ue=t.dpr,z();return}E||W(),T()},()=>{cancelAnimationFrame(E),N.current=null,le.disconnect(),ce.disconnect(),window.removeEventListener("pointermove",ne),window.removeEventListener("pointerdown",ie),document.documentElement.removeEventListener("pointerleave",ae),document.removeEventListener("visibilitychange",se),e.deleteTexture(F),e.deleteFramebuffer(Y),e.deleteProgram(U.program),e.deleteProgram(C.program),e.deleteBuffer(j),e.deleteVertexArray(k),e.getExtension("WEBGL_lose_context")?.loseContext()}},[]),(0,w.useEffect)(()=>{N.current?.()}),(0,K.jsx)("div",{ref:Q,className:`silk-container${J?` ${J}`:""}`,style:Pe,children:(0,K.jsx)("canvas",{ref:Z,className:"silk-canvas","aria-hidden":"true"})})},Ke=ze;export{Ke as default};
