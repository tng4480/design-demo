"use client";import{c as j,d as Fe,e as xe}from"./chunk-P3PGQN3B.js";var A=j(Fe());var ee=j(xe()),Ie=1.1,_=3.2,ze=`#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`,Xe=`#version 300 es
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform float uRotation;
uniform vec2 uReach;
uniform float uNear;
uniform float uAwake;
uniform vec3 uBackground;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uScale;
uniform float uWobble;
uniform float uGlow;
uniform float uBleed;
uniform float uHighlight;
uniform float uSwirl;
uniform float uOrbit;
uniform vec2 uEcho;
uniform float uReveal;
uniform float uOpacity;
uniform float uTrail;
uniform vec2 uTilt;
out vec4 outColor;

vec3 hash33(vec3 p3) {
  p3 = fract(p3 * vec3(0.1031, 0.11369, 0.13787));
  p3 += dot(p3, p3.yxz + 19.19);
  return -1.0 + 2.0 * fract(vec3(p3.x + p3.y, p3.x + p3.z, p3.y + p3.z) * p3.zyx);
}

float snoise3(vec3 p) {
  const float K1 = 0.333333333;
  const float K2 = 0.166666667;
  vec3 i = floor(p + (p.x + p.y + p.z) * K1);
  vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);
  vec3 e = step(vec3(0.0), d0 - d0.yzx);
  vec3 i1 = e * (1.0 - e.zxy);
  vec3 i2 = 1.0 - e.zxy * (1.0 - e);
  vec3 d1 = d0 - (i1 - K2);
  vec3 d2 = d0 - (i2 - K1);
  vec3 d3 = d0 - 0.5;
  vec4 h = max(0.6 - vec4(dot(d0, d0), dot(d1, d1), dot(d2, d2), dot(d3, d3)), 0.0);
  vec4 n = h * h * h * h * vec4(dot(d0, hash33(i)), dot(d1, hash33(i + i1)), dot(d2, hash33(i + i2)), dot(d3, hash33(i + 1.0)));
  return dot(vec4(31.316), n);
}

float light1(float intensity, float attenuation, float dist) {
  return intensity / (1.0 + dist * attenuation);
}

float light2(float intensity, float attenuation, float dist) {
  return intensity / (1.0 + dist * dist * attenuation);
}

vec4 draw(vec2 uv) {
  float rawLen = length(uv);
  vec2 dir = rawLen > 0.0001 ? uv / rawLen : vec2(1.0, 0.0);
  float reachAmount = length(uReach);
  vec2 reachDir = reachAmount > 0.00001 ? uReach / reachAmount : vec2(1.0, 0.0);
  float facing = exp((dot(dir, reachDir) - 1.0) * 3.2);
  float len = max(rawLen - reachAmount * facing * smoothstep(0.25, 0.65, rawLen), 0.0);
  uv = dir * len;
  float ang = atan(dir.y, dir.x);
  float invLen = len > 0.0 ? 1.0 / len : 0.0;
  float near = facing * uNear;
  float bgLuminance = dot(uBackground, vec3(0.299, 0.587, 0.114));

  float n0 = snoise3(vec3(uv * 0.65, uTime * 0.5)) * 0.5 + 0.5;
  float r0 = mix(0.8 - 0.04 * uWobble, 0.8 + 0.04 * uWobble, n0);
  float d0 = distance(uv, (r0 * invLen) * uv);
  float v0 = light1(1.0, 10.0 / uGlow, d0);
  v0 *= smoothstep(r0 * 1.05, r0, len);
  float reach = max(uBleed, 0.04);
  float innerFade = smoothstep(r0 * (1.0 - 0.2 * reach), r0 * (1.0 - 0.05 * reach), len);
  v0 *= mix(innerFade, 1.0, bgLuminance * 0.7 * min(uBleed, 1.0));
  float body = smoothstep(0.8 - 0.2 * reach, 0.8, len);
  float cl = cos(ang + uSwirl) * 0.5 + 0.5;

  vec2 pos = vec2(cos(uOrbit), sin(uOrbit)) * r0;
  float d = distance(uv, pos);
  vec2 head = vec2(cos(uOrbit), sin(uOrbit));
  float lag = atan(head.x * dir.y - head.y * dir.x, dot(dir, head));
  float trail = uTrail > 0.0 ? smoothstep(0.0, 0.35, lag) * exp(-max(lag, 0.0) * 2.6 / uTrail) : 0.0;
  float v1 = (light2(1.5, 5.0, d) + trail * 0.6) * uHighlight;
  v1 *= light1(1.0, 50.0, d0);
  float band = v0 * smoothstep(1.0, mix(0.6, 1.0, n0 * 0.5), len) * body;
  float heat = pow(clamp(band / 0.82, 0.0, 1.0), 3.0);
  float bloom = light2(1.0, 160.0 / uGlow, max(len - r0, 0.0)) * smoothstep(0.4, 0.0, len - r0) * step(r0, len);

  float v2 = smoothstep(1.0, mix(0.6, 1.0, n0 * 0.5), len);
  float v3 = body;

  vec3 colBase = mix(uColor1, uColor2, cl);
  float fadeAmount = mix(1.0, 0.1, bgLuminance);

  float echoD = abs(len - r0 - uEcho.x);
  float echo = light1(1.0, 60.0, echoD) * smoothstep(0.12, 0.0, echoD) * uEcho.y;

  vec3 darkCol = mix(uColor3, colBase, v0);
  darkCol = (darkCol + v1) * v2 * v3 * (1.0 + uAwake + near * 0.35) + mix(colBase, vec3(1.0), 0.25) * heat * (0.28 + near * 0.3);
  darkCol = clamp(darkCol + colBase * (bloom * 0.1 + echo), 0.0, 1.0);

  vec3 lightCol = (colBase + v1) * mix(1.0, v2 * v3, fadeAmount);
  lightCol = mix(uBackground, lightCol, clamp(v0 + echo, 0.0, 1.0));
  lightCol = mix(lightCol, colBase, clamp(v0, 0.0, 1.0) * clamp(near * 0.4 + uAwake, 0.0, 0.6));
  lightCol = clamp(mix(lightCol, vec3(1.0), clamp(v1 * 0.35, 0.0, 0.6)), 0.0, 1.0);

  vec3 finalCol = mix(darkCol, lightCol, bgLuminance);
  float alpha = max(max(finalCol.r, finalCol.g), finalCol.b);
  return vec4(finalCol / (alpha + 1e-5), alpha);
}

vec2 toPlane(vec2 p, out float hit) {
  float cx = cos(uTilt.x);
  float sx = sin(uTilt.x);
  float cy = cos(uTilt.y);
  float sy = sin(uTilt.y);
  vec3 ex = vec3(cy, 0.0, -sy);
  vec3 ey = vec3(sy * sx, cx, cy * sx);
  vec3 normal = vec3(sy * cx, -sx, cy * cx);
  vec3 origin = vec3(0.0, 0.0, ${_.toFixed(1)});
  vec3 ray = vec3(p, -${_.toFixed(1)});
  float denom = dot(normal, ray);
  float t = -dot(normal, origin) / (abs(denom) > 0.00001 ? denom : -0.00001);
  hit = t > 0.0 ? 1.0 : 0.0;
  vec3 q = origin + ray * t;
  return vec2(dot(q, ex), dot(q, ey));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - uResolution * 0.5) / min(uResolution.x, uResolution.y) * 2.0;
  uv *= uScale;
  float hit = 1.0;
  if (abs(uTilt.x) + abs(uTilt.y) > 0.0001) uv = toPlane(uv, hit);

  float s = sin(uRotation);
  float c = cos(uRotation);
  uv = vec2(c * uv.x - s * uv.y, s * uv.x + c * uv.y);

  vec4 col = draw(uv);
  float dither = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 255.0;
  float alpha = clamp(col.a * hit * uReveal * uOpacity + dither, 0.0, 1.0);
  outColor = vec4(col.rgb * alpha * alpha, alpha);
}`,w=(i,x,g)=>Math.min(g,Math.max(x,i)),ge=(i,x,g)=>{let c=i.createShader(x);return c?(i.shaderSource(c,g),i.compileShader(c),i.getShaderParameter(c,i.COMPILE_STATUS)?c:(i.deleteShader(c),null)):null},Ye=i=>{let x=ge(i,i.VERTEX_SHADER,ze),g=ge(i,i.FRAGMENT_SHADER,Xe),c=i.createProgram();if(!x||!g||!c)return null;if(i.attachShader(c,x),i.attachShader(c,g),i.bindAttribLocation(c,0,"aPosition"),i.linkProgram(c),i.deleteShader(x),i.deleteShader(g),!i.getProgramParameter(c,i.LINK_STATUS))return i.deleteProgram(c),null;let D={},W=i.getProgramParameter(c,i.ACTIVE_UNIFORMS);for(let O=0;O<W;O++){let F=i.getActiveUniform(c,O);F&&(D[F.name]=i.getUniformLocation(c,F.name))}return{program:c,uniforms:D}},_e=({colors:i=["#9c43fe","#4cc2e9","#101499"],hue:x=0,backgroundColor:g="#000000",size:c=1,glow:D=1,bleed:W=1,wobble:O=1,highlight:F=1,trail:ye=1,tiltX:be=0,tiltY:we=0,speed:Me=1,hoverIntensity:Ce=1,rotateOnHover:Se=!0,forceHoverState:Ae=!1,followCursor:Re=!0,clickPulse:Ee=!0,intro:Le=!0,opacity:ke=1,paused:Te=!1,dpr:Pe,className:te="",style:Be})=>{let oe=(0,A.useRef)(null),ne=(0,A.useRef)(null),$=(0,A.useRef)(null),N=Array.isArray(i)?i:[],re={colors:[N[0]??"#9c43fe",N[1]??N[0]??"#4cc2e9",N[2]??"#101499"].map(String),hue:x,backgroundColor:String(g),size:w(c,.1,3),glow:w(D,.1,5),bleed:w(W,0,4),wobble:Math.max(0,O),highlight:Math.max(0,F),trail:Math.max(0,ye),tiltX:w(be,-70,70),tiltY:w(we,-70,70),speed:Me,hoverIntensity:Math.max(0,Ce),rotateOnHover:Se,forceHoverState:Ae,followCursor:Re,clickPulse:Ee,intro:Le,opacity:w(ke,0,1),paused:Te,dpr:Pe},m=(0,A.useRef)(re);return m.current=re,(0,A.useEffect)(()=>{let E=oe.current,M=ne.current,t=M?.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1});if(!E||!M||!t)return;let q=Ye(t);if(!q)return;let a=q.uniforms,ie=t.createBuffer(),J=t.createVertexArray();t.bindVertexArray(J),t.bindBuffer(t.ARRAY_BUFFER,ie),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),t.STATIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0);let L=document.createElement("canvas").getContext("2d",{willReadFrequently:!0}),I=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,Q=new Map,ae=o=>{if(Q.has(o))return Q.get(o);let n=[0,0,0];if(L){L.clearRect(0,0,1,1),L.fillStyle="#000000",L.fillStyle=o,L.fillRect(0,0,1,1);let[r,l,h,s]=L.getImageData(0,0,1,1).data;n=s?[r/255,l/255,h/255]:[0,0,0]}return Q.set(o,n),n},Oe=(o,n)=>{if(!n)return o;let r=n*Math.PI/180,l=Math.cos(r),h=Math.sin(r),[s,u,f]=o,v=.299*s+.587*u+.114*f,C=.596*s-.274*u-.322*f,R=.211*s-.523*u+.312*f,y=C*l-R*h,p=C*h+R*l;return[v+.956*y+.621*p,v-.272*y-.647*p,v-1.106*y+1.703*p]},k={width:1,height:1},d={x:0,y:0,inside:!1},e={time:0,swirl:0,orbit:0,echo:1,rotation:0,hover:0,near:0,reachX:0,reachY:0,reachSpeedX:0,reachSpeedY:0,pulse:0,pulseSpeed:0,kick:m.current.intro&&!I?2.5:0,reveal:m.current.intro&&!I?0:1},T=0,P=0,H=!0,ce=(o,n)=>{let r=m.current,l=Math.min(k.width,k.height),h=1/(r.size*(1+e.pulse)),s=(o-k.width/2)/l*2*h,u=(k.height/2-n)/l*2*h;if(r.tiltX||r.tiltY){let C=-r.tiltX*Math.PI/180,R=r.tiltY*Math.PI/180,[y,p,z,X]=[Math.cos(C),Math.sin(C),Math.cos(R),Math.sin(R)],S=[X*y,-p,z*y],b=[s,u,-_],U=S[0]*b[0]+S[1]*b[1]+S[2]*b[2],K=-(S[2]*_)/(Math.abs(U)>1e-5?U:-1e-5);if(K<=0)return[99,99];let Y=[b[0]*K,b[1]*K,_+b[2]*K];s=Y[0]*z-Y[2]*X,u=Y[0]*X*p+Y[1]*y+Y[2]*z*p}let f=Math.sin(e.rotation),v=Math.cos(e.rotation);return[v*s-f*u,f*s+v*u]},V=()=>{let o=m.current,[n,r,l]=o.colors.map(f=>Oe(ae(f),o.hue)),h=e.reveal,s=h-1,u=1+2.2*s*s*s+1.2*s*s;t.viewport(0,0,M.width,M.height),t.useProgram(q.program),t.bindVertexArray(J),t.uniform2f(a.uResolution,M.width,M.height),t.uniform1f(a.uTime,e.time),t.uniform2f(a.uReach,e.reachX,e.reachY),t.uniform1f(a.uNear,e.near),t.uniform1f(a.uAwake,e.hover*o.hoverIntensity*.18),t.uniform1f(a.uRotation,e.rotation),t.uniform3fv(a.uBackground,ae(o.backgroundColor)),t.uniform3fv(a.uColor1,n),t.uniform3fv(a.uColor2,r),t.uniform3fv(a.uColor3,l),t.uniform1f(a.uScale,1/(o.size*(1+e.pulse)*(.62+.38*u))),t.uniform1f(a.uWobble,o.wobble),t.uniform1f(a.uGlow,o.glow),t.uniform1f(a.uBleed,o.bleed),t.uniform1f(a.uHighlight,o.highlight),t.uniform2f(a.uEcho,e.echo*.55,e.echo<1?(1-e.echo)*(1-e.echo):0),t.uniform1f(a.uSwirl,e.swirl),t.uniform1f(a.uOrbit,e.orbit),t.uniform1f(a.uReveal,Math.min(1,h/.55)*Math.min(1,h/.55)*(3-2*Math.min(1,h/.55))),t.uniform1f(a.uOpacity,o.opacity),t.uniform1f(a.uTrail,o.trail),t.uniform2f(a.uTilt,-o.tiltX*Math.PI/180,o.tiltY*Math.PI/180),t.drawArrays(t.TRIANGLES,0,3)},se=o=>{if(T=0,!H||document.hidden)return;let n=m.current,r=P?w((o-P)/1e3,5e-4,.05):1/60;if(P=o,n.paused){e.reveal=1,V(),P=0;return}let l=I?0:1,[h,s]=ce(d.x,d.y),u=Math.hypot(h,s),f=d.inside&&l?w((1.45-u)/.4,0,1):0,v=f*f*(3-2*f),C=v*w((u-.15)/.45,0,1),R=v>.5,y=n.forceHoverState?1:v;e.hover+=(y-e.hover)*(1-Math.exp(-r/.16));let p=.075*n.hoverIntensity*C,z=u>1e-4?h/u*p:0,X=u>1e-4?s/u*p:0;e.reachSpeedX+=(70*(z-e.reachX)-7*e.reachSpeedX)*r,e.reachSpeedY+=(70*(X-e.reachY)-7*e.reachSpeedY)*r,e.reachX+=e.reachSpeedX*r,e.reachY+=e.reachSpeedY*r,e.near+=(C*n.hoverIntensity-e.near)*(1-Math.exp(-r/.12));let S=r*n.speed*l;e.time+=S,e.swirl+=S*2*(1+e.kick),e.echo=Math.min(1,e.echo+r/1.2),n.rotateOnHover&&(e.rotation+=r*.3*e.hover*l);let b=Math.atan2(s,h);if(n.followCursor&&R&&l){let U=Math.atan2(Math.sin(b-e.orbit),Math.cos(b-e.orbit));e.orbit+=U*(1-Math.exp(-r*6))}else e.orbit-=S;e.orbit=Math.atan2(Math.sin(e.orbit),Math.cos(e.orbit)),e.pulseSpeed+=(-170*e.pulse-11*e.pulseSpeed)*r,e.pulse+=e.pulseSpeed*r,e.kick*=Math.exp(-r*2.5),!n.intro||I?e.reveal=1:e.reveal<1&&(e.reveal=Math.min(1,e.reveal+r/Ie)),V(),T=requestAnimationFrame(se)},B=()=>{!T&&H&&!document.hidden&&(T=requestAnimationFrame(se))},Z=()=>{let o=m.current,n=Math.max(1,E.clientWidth),r=Math.max(1,E.clientHeight),l=Math.min(o.dpr||window.devicePixelRatio||1,2);k.width=n,k.height=r,M.width=Math.max(1,Math.round(n*l)),M.height=Math.max(1,Math.round(r*l)),V(),B()},le=o=>{let n=E.getBoundingClientRect();d.x=o.clientX-n.left,d.y=o.clientY-n.top,d.inside=d.x>=0&&d.y>=0&&d.x<=n.width&&d.y<=n.height},ue=o=>{le(o),m.current.paused||B()},he=o=>{let n=m.current;if(le(o),!d.inside||!n.clickPulse||n.paused||I)return;let[r,l]=ce(d.x,d.y);Math.hypot(r,l)>1||(e.pulseSpeed+=.9,e.kick=2.2,e.echo=0,B())},G=o=>{o.pointerType!=="mouse"&&(d.inside=!1)},de=()=>{d.inside=!1},fe=()=>{P=0,B()},me=new ResizeObserver(Z);me.observe(E);let ve=new IntersectionObserver(o=>{H=o.some(n=>n.isIntersecting),H&&(P=0,B())});ve.observe(E),window.addEventListener("pointermove",ue,{passive:!0}),window.addEventListener("pointerdown",he,{passive:!0}),window.addEventListener("pointerup",G,{passive:!0}),window.addEventListener("pointercancel",G,{passive:!0}),document.documentElement.addEventListener("pointerleave",de),document.addEventListener("visibilitychange",fe),Z();let pe=m.current.dpr;return $.current=()=>{let o=m.current;if(o.dpr!==pe){pe=o.dpr,Z();return}T||V(),B()},()=>{cancelAnimationFrame(T),$.current=null,me.disconnect(),ve.disconnect(),window.removeEventListener("pointermove",ue),window.removeEventListener("pointerdown",he),window.removeEventListener("pointerup",G),window.removeEventListener("pointercancel",G),document.documentElement.removeEventListener("pointerleave",de),document.removeEventListener("visibilitychange",fe),t.deleteProgram(q.program),t.deleteBuffer(ie),t.deleteVertexArray(J),t.getExtension("WEBGL_lose_context")?.loseContext()}},[]),(0,A.useEffect)(()=>{$.current?.()}),(0,ee.jsx)("div",{ref:oe,className:`orb-container${te?` ${te}`:""}`,style:Be,children:(0,ee.jsx)("canvas",{ref:ne,className:"orb-canvas","aria-hidden":"true"})})},He=_e;export{He as default};
