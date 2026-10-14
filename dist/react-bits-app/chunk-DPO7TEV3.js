"use client";import{c as V,d as ve,e as te}from"./chunk-P3PGQN3B.js";var y=V(ve());var N=V(te()),G=5,re=3,xe=2.4,ye=`#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`,ge=`#version 300 es
precision highp float;
precision highp int;
uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uStops[${G}];
uniform int uStopCount;
uniform float uAmplitude;
uniform float uBlend;
uniform float uHeight;
uniform float uScale;
uniform float uGlow;
uniform float uBrightness;
uniform int uLayers;
uniform float uFlip;
uniform vec3 uPointer;
uniform float uReveal;
uniform float uOpacity;
uniform float uLightMode;
out vec4 outColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float smootherstep(float edge0, float edge1, float x) {
  float t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

vec3 oklabToLinear(vec3 c) {
  float l = c.x + 0.3963377774 * c.y + 0.2158037573 * c.z;
  float m = c.x - 0.1055613458 * c.y - 0.0638541728 * c.z;
  float s = c.x - 0.0894841775 * c.y - 1.2914855480 * c.z;
  l = l * l * l;
  m = m * m * m;
  s = s * s * s;
  return vec3(
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
  );
}

vec3 toSrgb(vec3 c) {
  c = clamp(c, 0.0, 1.0);
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}

vec3 ramp(float t) {
  float x = clamp(t, 0.0, 1.0) * float(uStopCount - 1);
  int i = int(min(floor(x), float(uStopCount - 2)));
  float f = x - float(i);
  f = f * f * (3.0 - 2.0 * f);
  vec3 lch = mix(uStops[i], uStops[i + 1], f);
  lch.x = mix(lch.x, min(lch.x, 0.7), uLightMode);
  return toSrgb(oklabToLinear(vec3(lch.x, lch.y * cos(lch.z), lch.y * sin(lch.z))));
}

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  float y = 1.0 - frag.y / uResolution.y;
  y = mix(y, 1.0 - y, uFlip);
  float u = frag.x / uResolution.x;
  float X = (frag.x - uResolution.x * 0.5) / uResolution.y;
  float t = uTime;
  float reach = uPointer.z * exp(-pow((X - uPointer.x) / 0.38, 2.0));

  vec3 glow = vec3(0.0);
  float cover = 0.0;
  for (int k = 0; k < ${re}; k++) {
    if (k >= uLayers) break;
    float layer = float(k);
    float seed = layer * 13.7;
    float pace = t * (1.0 - layer * 0.18);
    float warp = snoise(vec2(X * 0.45 * uScale + pace * 0.02 + seed, pace * 0.05 + seed));
    float wave = snoise(vec2(X * 0.75 * uScale + warp * 0.35 - pace * 0.03 + seed, pace * 0.07 - seed)) * 0.72
      + snoise(vec2(X * 1.6 * uScale + warp * 0.5 + pace * 0.04 - seed, pace * 0.1 + seed * 0.5)) * 0.28;
    float hem = uHeight + layer * 0.07 + wave * 0.15 * uAmplitude;
    hem += reach * 0.08 * (layer < 0.5 ? 1.0 : 0.4);
    hem = mix(-0.25, hem, uReveal);

    float soft = (0.04 + uBlend * 0.16) * (1.0 + layer * 0.9);
    float rise = hem - y;
    float low = -soft - uGlow * 0.14;
    float high = 0.26 + soft * 0.6;
    float body = pow(smootherstep(low, high, rise), 1.5 + uGlow * 0.6);
    float lobes = 0.86 + 0.14 * snoise(vec2(X * 0.9 * uScale - pace * 0.025 + seed, y * 0.3 + pace * 0.04));
    float alpha = body * lobes * (layer < 0.5 ? 1.0 : 0.32 / layer);
    alpha = clamp(alpha * (1.0 + reach * 0.25 * smootherstep(0.9, 0.0, abs(y - hem))), 0.0, 1.0);

    vec3 tint = ramp(u + 0.05 * sin(pace * 0.08 + layer * 2.3) + layer * 0.1 + max(rise, 0.0) * 0.05);
    glow = 1.0 - (1.0 - glow) * (1.0 - tint * alpha);
    cover = 1.0 - (1.0 - cover) * (1.0 - alpha);
  }

  float fade = smootherstep(0.0, 0.7, uReveal) * uOpacity;
  float strength = clamp(uBrightness, 0.0, 2.0);
  glow *= fade * min(strength, 1.0);
  cover *= fade * min(strength, 1.0);
  glow = 1.0 - pow(1.0 - glow, vec3(max(strength, 1.0)));
  float dither = (hash(frag) - 0.5) / 255.0;

  if (uLightMode > 0.5) {
    vec3 tint = cover > 0.0001 ? glow / cover : vec3(0.0);
    cover *= smootherstep(0.0, 0.25, cover);
    float alpha = cover * 0.7;
    outColor = vec4(tint * alpha + dither, clamp(alpha + dither, 0.0, 1.0));
    return;
  }
  outColor = vec4(glow + dither, clamp(cover + dither, 0.0, 1.0));
}`,P=(t,c,f)=>Math.min(f,Math.max(c,t)),we=t=>{let[c,f,r]=t.map(A=>A<=.04045?A/12.92:Math.pow((A+.055)/1.055,2.4)),l=Math.cbrt(.4122214708*c+.5363325363*f+.0514459929*r),h=Math.cbrt(.2119034982*c+.6806995451*f+.1073969566*r),p=Math.cbrt(.0883024619*c+.2817188376*f+.6299787005*r),m=[.2104542553*l+.793617785*h-.0040720468*p,1.9779984951*l-2.428592205*h+.4505937099*p,.0259040371*l+.7827717662*h-.808675766*p];return[m[0],Math.hypot(m[1],m[2]),Math.atan2(m[2],m[1])]},be=t=>{let c=t.findIndex(l=>l[1]>.02),r=c===-1?0:t[c][2];return t.map(l=>{let h=l[1]>.02?l[2]:r;for(;h-r>Math.PI;)h-=Math.PI*2;for(;h-r<-Math.PI;)h+=Math.PI*2;return r=h,[l[0],l[1],h]})},oe=(t,c,f)=>{let r=t.createShader(c);return r?(t.shaderSource(r,f),t.compileShader(r),t.getShaderParameter(r,t.COMPILE_STATUS)?r:(t.deleteShader(r),null)):null},Me=t=>{let c=oe(t,t.VERTEX_SHADER,ye),f=oe(t,t.FRAGMENT_SHADER,ge),r=t.createProgram();if(!c||!f||!r)return null;if(t.attachShader(r,c),t.attachShader(r,f),t.bindAttribLocation(r,0,"aPosition"),t.linkProgram(r),t.deleteShader(c),t.deleteShader(f),!t.getProgramParameter(r,t.LINK_STATUS))return t.deleteProgram(r),null;let l={},h=t.getProgramParameter(r,t.ACTIVE_UNIFORMS);for(let p=0;p<h;p++){let m=t.getActiveUniform(r,p);m&&(l[m.name.replace("[0]","")]=t.getUniformLocation(r,m.name))}return{program:r,uniforms:l}},Se=({colorStops:t=["#5227FF","#7cff67","#5227FF"],amplitude:c=1,blend:f=.5,speed:r=1,time:l,height:h=.45,scale:p=1,glow:m=.6,brightness:A=1,layers:ne=1,direction:ae="top",mouseInteraction:ie=!0,intro:ce=!0,opacity:se=1,lightMode:le=!1,paused:ue=!1,dpr:fe,className:U="",style:he})=>{let D=(0,y.useRef)(null),H=(0,y.useRef)(null),_=(0,y.useRef)(null),R=(Array.isArray(t)?t:[]).filter(Boolean).map(String).slice(0,G),Y={stops:R.length>=2?R:R.length===1?[R[0],R[0]]:["#5227FF","#7cff67"],amplitude:Math.max(0,c),blend:P(f,0,1),speed:r,time:l,height:P(h,0,1),scale:Math.max(.1,p),glow:Math.max(0,m),brightness:Math.max(0,A),layers:P(Math.round(ne),1,re),flip:ae==="bottom"?1:0,mouseInteraction:ie,intro:ce,opacity:P(se,0,1),lightMode:le,paused:ue,dpr:fe},v=(0,y.useRef)(Y);return v.current=Y,(0,y.useEffect)(()=>{let g=D.current,x=H.current,e=x?.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1});if(!g||!x||!e)return;let F=Me(e);if(!F)return;let s=F.uniforms,$=e.createBuffer(),B=e.createVertexArray();e.bindVertexArray(B),e.bindBuffer(e.ARRAY_BUFFER,$),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0);let w=document.createElement("canvas").getContext("2d",{willReadFrequently:!0}),C=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,O=new Map,me=o=>{if(O.has(o))return O.get(o);let n=[1,1,1];if(w){w.clearRect(0,0,1,1),w.fillStyle="#ffffff",w.fillStyle=o,w.fillRect(0,0,1,1);let[u,d,L]=w.getImageData(0,0,1,1).data;n=[u/255,d/255,L/255]}return O.set(o,n),n},q=new Float32Array(G*3),b={width:1,height:1},i={x:0,y:0,inside:!1},a={clock:0,px:0,py:.5,reach:0,reveal:v.current.intro&&!C?0:1},M=0,S=0,T=!0,k=()=>{let o=v.current;be(o.stops.map(u=>we(me(u)))).forEach((u,d)=>q.set(u,d*3));let n=a.reveal;e.viewport(0,0,x.width,x.height),e.useProgram(F.program),e.bindVertexArray(B),e.uniform2f(s.uResolution,x.width,x.height),e.uniform1f(s.uTime,o.time!==void 0?o.time*o.speed*.1:a.clock),e.uniform3fv(s.uStops,q),e.uniform1i(s.uStopCount,o.stops.length),e.uniform1f(s.uAmplitude,o.amplitude),e.uniform1f(s.uBlend,o.blend),e.uniform1f(s.uHeight,o.height),e.uniform1f(s.uScale,o.scale),e.uniform1f(s.uGlow,o.glow),e.uniform1f(s.uBrightness,o.brightness),e.uniform1i(s.uLayers,o.layers),e.uniform1f(s.uFlip,o.flip),e.uniform3f(s.uPointer,a.px,a.py,a.reach),e.uniform1f(s.uReveal,1-Math.pow(1-n,3)),e.uniform1f(s.uOpacity,o.opacity),e.uniform1f(s.uLightMode,o.lightMode?1:0),e.drawArrays(e.TRIANGLES,0,3)},W=o=>{if(M=0,!T||document.hidden)return;let n=v.current,u=S?P((o-S)/1e3,5e-4,.05):1/60;if(S=o,n.paused){a.reveal=1,k(),S=0;return}let d=C?0:1;a.clock+=u*n.speed*d;let L=n.mouseInteraction&&i.inside&&!C,ee=1-Math.exp(-u/.6);if(L){let de=(i.x-b.width/2)/b.height,pe=n.flip?1-i.y/b.height:i.y/b.height;a.px+=(de-a.px)*ee,a.py+=(pe-a.py)*ee}a.reach+=((L?1:0)-a.reach)*(1-Math.exp(-u/(L?.9:1.4))),!n.intro||C?a.reveal=1:a.reveal<1&&(a.reveal=Math.min(1,a.reveal+u/xe)),k(),M=requestAnimationFrame(W)},E=()=>{!M&&T&&!document.hidden&&(M=requestAnimationFrame(W))},X=()=>{let o=v.current,n=Math.max(1,g.clientWidth),u=Math.max(1,g.clientHeight),d=Math.min(o.dpr||window.devicePixelRatio||1,2);b.width=n,b.height=u,x.width=Math.max(1,Math.round(n*d)),x.height=Math.max(1,Math.round(u*d)),k(),E()},z=o=>{let n=g.getBoundingClientRect();i.x=o.clientX-n.left,i.y=o.clientY-n.top;let u=i.inside;if(i.inside=i.x>=0&&i.y>=0&&i.x<=n.width&&i.y<=n.height,i.inside&&!u){let d=v.current;a.px=(i.x-n.width/2)/Math.max(1,n.height),a.py=d.flip?1-i.y/Math.max(1,n.height):i.y/Math.max(1,n.height)}v.current.paused||E()},I=o=>{o.pointerType!=="mouse"&&(i.inside=!1)},K=()=>{i.inside=!1},J=()=>{S=0,E()},Q=new ResizeObserver(X);Q.observe(g);let Z=new IntersectionObserver(o=>{T=o.some(n=>n.isIntersecting),T&&(S=0,E())});Z.observe(g),window.addEventListener("pointermove",z,{passive:!0}),window.addEventListener("pointerdown",z,{passive:!0}),window.addEventListener("pointerup",I,{passive:!0}),window.addEventListener("pointercancel",I,{passive:!0}),document.documentElement.addEventListener("pointerleave",K),document.addEventListener("visibilitychange",J),X();let j=v.current.dpr;return _.current=()=>{let o=v.current;if(o.dpr!==j){j=o.dpr,X();return}M||k(),E()},()=>{cancelAnimationFrame(M),_.current=null,Q.disconnect(),Z.disconnect(),window.removeEventListener("pointermove",z),window.removeEventListener("pointerdown",z),window.removeEventListener("pointerup",I),window.removeEventListener("pointercancel",I),document.documentElement.removeEventListener("pointerleave",K),document.removeEventListener("visibilitychange",J),e.deleteProgram(F.program),e.deleteBuffer($),e.deleteVertexArray(B),e.getExtension("WEBGL_lose_context")?.loseContext()}},[]),(0,y.useEffect)(()=>{_.current?.()}),(0,N.jsx)("div",{ref:D,className:`aurora-container${U?` ${U}`:""}`,style:he,children:(0,N.jsx)("canvas",{ref:H,className:"aurora-canvas","aria-hidden":"true"})})},Le=Se;export{Le as default};
