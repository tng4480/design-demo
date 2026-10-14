import React from 'react';
import {createRoot} from 'react-dom/client';
import {Drawer} from 'vaul';
import './lab.css';

const embedded=new URLSearchParams(location.search).has('embedded');
document.body.classList.toggle('embedded',embedded);
function App(){
 return <Drawer.Root autoFocus={false} preventScrollRestoration>
  <main><small>ACTUAL VAUL / TOUCH & POINTER</small><h1>A moment<br/>of detail.</h1><p>A focused space for the next decision.</p>
   <Drawer.Trigger className="trigger">Open details ↑</Drawer.Trigger>
   <span className="hint">Drag down to dismiss · tap outside to close</span>
  </main>
  {!embedded&&<footer><a href="index.html#explore">← UI Atlas</a><a href="VAUL_NOTICES.txt">Source licenses ↗</a></footer>}
  <Drawer.Portal>
   <Drawer.Overlay className="overlay"/>
   <Drawer.Content className="sheet" onOpenAutoFocus={e=>e.preventDefault()} onCloseAutoFocus={e=>{e.preventDefault();document.querySelector('.trigger')?.focus({preventScroll:true});}}>
    <Drawer.Handle className="handle" aria-label="Drag drawer down to close"/>
    <div className="sheet-body"><small>YOUR NEXT IDEA</small><Drawer.Title>A little room to explore.</Drawer.Title>
    <Drawer.Description>Move the handle down and let go. The drawer follows your gesture and settles naturally.</Drawer.Description>
    <div className="facts"><span>Drag to dismiss</span><span>Keyboard accessible</span><span>Real Vaul physics</span></div>
    <Drawer.Close className="close">Close details</Drawer.Close></div>
   </Drawer.Content>
  </Drawer.Portal>
 </Drawer.Root>;
}
addEventListener('message',event=>{if(event.origin===location.origin&&event.data?.type==='atlas-motion')document.body.classList.toggle('reduced',!!event.data.paused);});
createRoot(document.getElementById('root')).render(<App/>);
