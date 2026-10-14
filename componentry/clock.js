const request=window.requestAnimationFrame.bind(window),cancel=window.cancelAnimationFrame.bind(window);
let paused=false,next=0;
const pending=new Map();
window.requestAnimationFrame=callback=>{const id=++next;const run=time=>{const item=pending.get(id);if(!item)return;if(paused){item.native=null;return;}pending.delete(id);callback(time);};const item={run,native:null};pending.set(id,item);if(!paused)item.native=request(run);return id;};
window.cancelAnimationFrame=id=>{const item=pending.get(id);if(item?.native)cancel(item.native);pending.delete(id);};
export function pauseClock(value){paused=value;document.documentElement.classList.toggle('motion-paused',value);if(!value)for(const item of pending.values())if(item.native===null)item.native=request(item.run);}
