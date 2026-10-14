import React,{Suspense,lazy,useEffect,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import manifest from '../research/react-bits.json';
import './showroom.css';

document.documentElement.classList.toggle('gallery',new URLSearchParams(location.search).has('gallery'));
const components={
  aurora:lazy(()=>import('../.cache/react-bits/Backgrounds/Aurora/Aurora.jsx')),
  silk:lazy(()=>import('../.cache/react-bits/Backgrounds/Silk/Silk.jsx')),
  orb:lazy(()=>import('../.cache/react-bits/Backgrounds/Orb/Orb.jsx')),
  'blur-text':lazy(()=>import('../.cache/react-bits/TextAnimations/BlurText/BlurText.jsx')),
  'rotating-text':lazy(()=>import('../.cache/react-bits/TextAnimations/RotatingText/RotatingText.jsx')),
  'tilted-card':lazy(()=>import('../.cache/react-bits/Components/TiltedCard/TiltedCard.jsx')),
  'glass-icons':lazy(()=>import('../.cache/react-bits/Components/GlassIcons/GlassIcons.jsx')),
  'pixel-transition':lazy(()=>import('../.cache/react-bits/Animations/PixelTransition/PixelTransition.jsx'))
};
const qs=new URLSearchParams(location.search),embedded=qs.has('embedded');
const demos=manifest.demos;
const initial=demos.find(d=>d.id===qs.get('demo'))?.id||'aurora';
const groups={Backgrounds:'Backgrounds',TextAnimations:'Text',Components:'Components',Animations:'Interaction'};

// Motion's loops and upstream RAF effects share this frame-local clock. Pausing
// preserves the actual rendered output; resuming runs queued frames again.
const nativeRAF=window.requestAnimationFrame.bind(window),nativeCancel=window.cancelAnimationFrame.bind(window);
let clockPaused=false,rafID=0;
const frames=new Map();
window.requestAnimationFrame=callback=>{const id=++rafID;const run=time=>{const item=frames.get(id);if(!item)return;if(clockPaused){item.native=null;return;}frames.delete(id);callback(time);};const item={callback:run,native:null};frames.set(id,item);if(!clockPaused)item.native=nativeRAF(run);return id;};
window.cancelAnimationFrame=id=>{const item=frames.get(id);if(item?.native)nativeCancel(item.native);frames.delete(id);};
function pauseClock(value){clockPaused=value;document.documentElement.classList.toggle('motion-paused',value);if(!value)for(const item of frames.values())if(item.native===null)item.native=nativeRAF(item.callback);}

class Boundary extends React.Component{
  state={failed:false};
  static getDerivedStateFromError(){return{failed:true};}
  render(){return this.state.failed?<div className="fallback"><h2>This effect could not render.</h2><p>Try another study or visit its official example. A compatible WebGL2 device is required for the three backgrounds.</p></div>:this.props.children;}
}
function Glyph({name}){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width="27" height="27" aria-hidden="true">{name==='Explore'?<><circle cx="12" cy="12" r="9"/><path d="m16 8-3 5-5 3 3-5z"/></>:name==='Collect'?<><path d="M5 4h14v17l-7-4-7 4z"/></>:<><path d="m12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4z"/></>}</svg>;}
function Study({id,accent,speed,paused,variation,wordRef,onAction}){
  const Component=components[id];
  const warm=variation%2===1;
  const common={paused,dpr:embedded?1:Math.min(devicePixelRatio,1.5),intro:!paused};
  if(id==='aurora')return <><Component {...common} colorStops={warm?['#d5a890',accent,'#c5b3d3']:['#b6a4cc',accent,'#e2c6b5']} amplitude={warm?1.3:1} speed={speed*.55} blend={.45} height={.65} glow={.75} layers={2}/><div className="hero-copy"><small>REACT BITS / AURORA</small><h1>Beyond<br/>the ordinary.</h1><p>Light that sets the mood.</p></div></>;
  if(id==='silk')return <><Component {...common} color={accent} sheenColor={warm?'#dac4ad':'#b7c6ac'} speed={speed*3} noiseIntensity={.7} scale={warm?1.5:1} rotation={warm?.7:0} sheen={.16}/><div className="hero-copy"><small>REACT BITS / SILK</small><h1>A softer<br/>perspective.</h1><p>Move over the fabric. Click to ripple.</p></div></>;
  if(id==='orb')return <><Component {...common} colors={warm?['#ff8470',accent,'#f1a8ff']:['#cba6c8',accent,'#d8b899']} speed={speed*.65} backgroundColor="#373446" hoverIntensity={1.4}/><div className="orb-copy"><small>REACT BITS / ORB</small><h1>An idea is forming.</h1><p>Move around the orb. Click to pulse.</p></div></>;
  if(id==='blur-text')return <div className="type-composition"><small>REACT BITS / BLUR TEXT</small><Component text={warm?'Make room for possibility.':'A little clarity changes everything.'} className="blur-headline" delay={paused?0:85/speed} stepDuration={paused?.01:.35/speed} direction={warm?'bottom':'top'} animationFrom={paused?{filter:'blur(0px)',opacity:1,y:0}:undefined}/><p>Words settle into focus, one after another.</p></div>;
  if(id==='rotating-text')return <div className="type-composition"><small>REACT BITS / ROTATING TEXT</small><h1>Make it<br/><Component ref={wordRef} texts={warm?['clearer.','bolder.','distinctive.']:['expressive.','playful.','memorable.']} mainClassName="rotating-pill" splitLevelClassName="rotating-word" staggerDuration={.035} rotationInterval={2200/speed} auto={!paused} transition={paused?{duration:0}:{type:'spring',damping:24,stiffness:280}}/></h1><p>One headline. A few possibilities.</p>{embedded&&<button className="small-action" onClick={()=>wordRef.current?.next()}>Next word ↗</button>}</div>;
  if(id==='tilted-card')return <div className="card-composition"><Component imageSrc={`assets/react-bits/${warm?'studio':'orbit'}-pastel.svg`} altText={warm?'Original abstract studio artwork':'Original geometric orbit artwork'} captionText="Original artwork · React Bits tilt" containerHeight={embedded?'220px':'330px'} containerWidth="100%" imageWidth={embedded?'176px':'260px'} imageHeight={embedded?'220px':'325px'} scaleOnHover={1.07} rotateAmplitude={paused?0:16} showMobileWarning={false} showTooltip={!embedded} displayOverlayContent overlayContent={<div className="art-caption"><span>FORM / 01</span><b>New<br/>perspectives.</b></div>}/><small>MOVE OVER THE CARD · STATIC ON TOUCH</small></div>;
  if(id==='glass-icons')return <div className="glass-composition"><small>REACT BITS / GLASS ICONS</small><h1>Room for ideas.</h1><Component items={['Explore','Collect','Create'].map((label,i)=>({label,icon:<Glyph name={label}/>,color:[accent,'#b6a4c8','#d9b294'][i],onClick:()=>onAction(label+' selected — demo action.')}))} size={embedded?54:80} gap={embedded?35:54} columns={3} labels="always" theme="light" iconColor="#46553f" refraction={warm?1.3:.8} frost={.18} tint={accent} intro={!paused} plate={warm?'offset':'tilt'}/><p>Hover, press or focus each glass button.</p></div>;
  return <div className="pixel-composition"><Component firstContent={<div className="pixel-face"><img src="assets/react-bits/orbit-pastel.svg" alt="Original geometric orbit artwork"/><b>Outside<br/>the grid.</b></div>} secondContent={<div className="pixel-face alternate"><img src="assets/react-bits/studio-pastel.svg" alt="Original abstract studio artwork"/><b>A fresh<br/>point of view.</b></div>} gridSize={warm?12:8} pixelColor={accent} pattern={warm?'ripple':'random'} animationStepDuration={paused?.01:.45/speed} trigger="click" aspectRatio="100%" style={{width:embedded?195:300,borderRadius:20}}/><small>CLICK, TAP OR PRESS ENTER TO SWITCH</small></div>;
}
const usage={
 aurora:'<Aurora colorStops={["#b6a4cc", "#a7bea5", "#e2c6b5"]} amplitude={1} speed={0.55} layers={2} />',
 silk:'<Silk color="#708672" speed={3} noiseIntensity={0.7} sheen={0.16} />',
 orb:'<Orb colors={["#cba6c8", "#a7bea5", "#d8b899"]} backgroundColor="#373446" hoverIntensity={1.4} />',
 'blur-text':'<BlurText text="A little clarity changes everything." delay={85} animateBy="words" />',
 'rotating-text':'<RotatingText texts={["expressive.", "playful.", "memorable."]} staggerDuration={0.035} />',
 'tilted-card':'<TiltedCard imageSrc="/your-artwork.svg" imageWidth="260px" imageHeight="325px" rotateAmplitude={16} />',
 'glass-icons':'<GlassIcons items={[{ label: "Explore", icon: <YourIcon />, color: "#a7bea5", onClick: yourAction }]} labels="always" />',
 'pixel-transition':'<PixelTransition firstContent={<FirstView />} secondContent={<SecondView />} gridSize={8} pixelColor="#64dfbc" trigger="click" />'
};
function GalleryReady(){useEffect(()=>{const t=setTimeout(()=>{document.documentElement.dataset.previewReady='true';parent.postMessage({type:'atlas-preview-ready'},location.origin);},900);return()=>clearTimeout(t);},[]);return null;}
function App(){
 const [id,setId]=useState(initial),[accent,setAccent]=useState(initial==='silk'?'#708672':'#a7bea5'),[speed,setSpeed]=useState(1),[paused,setPaused]=useState(qs.get('paused')==='1'||matchMedia('(prefers-reduced-motion: reduce)').matches),[variation,setVariation]=useState(0),[replay,setReplay]=useState(0),[status,setStatus]=useState('');
 const wordRef=useRef(),demo=demos.find(d=>d.id===id);
 useEffect(()=>{const timer=setTimeout(()=>pauseClock(paused),900);return()=>clearTimeout(timer);},[paused,id,replay]);
 useEffect(()=>{if(!embedded)return;const receive=e=>{if(e.source!==parent||e.origin!==location.origin||e.data?.type!=='atlas-motion')return;setPaused(Boolean(e.data.paused));};window.addEventListener('message',receive);return()=>window.removeEventListener('message',receive);},[]);
 useEffect(()=>{if(embedded)return;const url=new URL(location.href);url.searchParams.set('demo',id);history.replaceState(null,'',url);document.title=demo.title+' — React Bits playground';},[id]);
 useEffect(()=>()=>pauseClock(false),[]);
 const choose=next=>{pauseClock(false);setId(next);setAccent(next==='silk'?'#708672':'#a7bea5');setVariation(0);setStatus('');setReplay(r=>r+1);};
 const action=message=>setStatus(message);
 const live=<div className={`study-stage stage-${id}`} style={{'--accent':accent}}><Boundary key={id+replay}><Suspense fallback={<p className="loading">Loading actual component…</p>}><Study id={id} accent={accent} speed={speed} paused={paused} variation={variation} wordRef={wordRef} onAction={action}/>{qs.has('gallery')&&<GalleryReady/>}</Suspense></Boundary><span className="study-status" role="status">{status}</span></div>;
 if(embedded)return <main className="embedded">{live}</main>;
 return <><header className="showroom-header"><a href="index.html#explore">← UI Atlas</a><span>ACTUAL REACT BITS / EIGHT PICKS</span><a href="https://reactbits.dev" target="_blank" rel="noopener">Official library ↗</a></header><main className="showroom"><section className="introduction"><small>A SHORTLIST, NOT THE WHOLE LIBRARY</small><h1>Eight ways to make<br/>an interface feel alive.</h1><p>Actual React Bits components, composed with original text, artwork and icons. Select a study, try its interaction, then inspect what you would use.</p></section><div className="showroom-layout"><nav aria-label="React Bits studies">{Object.entries(groups).map(([group,label])=><section key={group}><h2>{label}</h2>{demos.filter(d=>d.group===group).map(d=><button key={d.id} aria-pressed={id===d.id} onClick={()=>choose(d.id)}><span>{d.title}</span><small>{d.effort}</small></button>)}</section>)}</nav><section className="live-area"><div className="stage-heading"><h2>{demo.title}</h2><span>Runs React Bits</span></div>{live}<div className="playground-controls"><button onClick={()=>{pauseClock(false);setReplay(r=>r+1);}}>Replay ↻</button><button aria-pressed={paused} onClick={()=>{pauseClock(!paused);setPaused(!paused);}}>{paused?'Resume motion':'Pause motion'}</button><button onClick={()=>{pauseClock(false);setVariation(v=>v+1);setReplay(r=>r+1);}}>Try another look</button>{id==='rotating-text'&&<button onClick={()=>wordRef.current?.next()}>Next word</button>}{id!=='tilted-card'&&id!=='blur-text'&&<label>Accent <input type="color" aria-label="Accent colour" value={accent} onChange={e=>setAccent(e.target.value)}/></label>}{['aurora','silk','orb','blur-text','rotating-text','pixel-transition'].includes(id)&&<label>Speed <input type="range" aria-label="Animation speed" min="0.4" max="1.8" step="0.1" value={speed} onChange={e=>setSpeed(Number(e.target.value))}/></label>}</div><div className="study-notes"><p>{demo.summary}</p><dl><dt>Best used for</dt><dd>{demo.use}</dd><dt>Implementation notes</dt><dd>{demo.watch}</dd></dl><div className="study-links"><a href={demo.official} target="_blank" rel="noopener">Official component ↗</a><a href={`https://github.com/DavidHDev/react-bits/blob/${manifest.commit}/${demo.path}`} target="_blank" rel="noopener">Pinned source ↗</a><a href="REACT_BITS_LICENSE.txt" target="_blank">MIT + Commons Clause ↗</a></div><details><summary>Implementation starting point</summary><p>Install from the official registry, then use your own content and assets.</p><pre>npx shadcn@latest add @react-bits/{demo.name}-JS-CSS</pre><pre>{usage[id]}</pre><button onClick={()=>navigator.clipboard.writeText(usage[id]).then(()=>action('Usage copied.')).catch(()=>action('Select the usage example to copy it.'))}>Copy usage</button></details></div></section></div><footer>Snapshot {manifest.commit.slice(0,7)} · Eight application demos, not a redistributed component kit. Preserve the upstream license; review the Commons Clause before reuse. {demo.group==='Backgrounds'?'Backgrounds require WebGL2.':''}</footer></main></>;
}
createRoot(document.getElementById('root')).render(<App/>);
