let dataPromise;
const load=()=>dataPromise||=fetch(new URL('tabler-icons.json',import.meta.url)).then(r=>{if(!r.ok)throw Error('Icon catalog could not be loaded');return r.json();});
const favorites=['home','search','settings','user','heart','bell','calendar','mail','code','rocket','chart-line','folder','device-desktop','sparkles','palette','check','x','menu-2','arrow-right','download','share','camera','map-pin','world'];
export function mountIcons(root,full=false){
  let alive=true,list=[],selected,limit=full?96:16,style='outline',query='',category='',size=28,stroke=2,color='#5e7a4b';
  const listeners=[];
  root.classList.add('icon-explorer');
  root.innerHTML='<p class="icon-loading">Loading official Tabler SVGs…</p>';
  const on=(node,event,fn)=>{node.addEventListener(event,fn);listeners.push(()=>node.removeEventListener(event,fn));};
  const customize=icon=>icon.svg.replace(/width="24"/,'width="'+size+'"').replace(/height="24"/,'height="'+size+'"').replace(/stroke-width="2"/,'stroke-width="'+stroke+'"').replace(/currentColor/g,color);
  function inspector(){
    if(!selected)return;
    const panel=root.querySelector('.icon-inspector');
    panel.hidden=false;
    panel.innerHTML=`<div class="icon-large">${customize(selected)}</div><h3>${selected.name}</h3><small>${selected.style} · ${selected.category}</small><div class="icon-settings"><label>Size <input aria-label="Icon size" type="range" min="16" max="64" value="${size}"></label><label>Stroke <input aria-label="Icon stroke width" type="range" min="0.5" max="3.5" step="0.25" value="${stroke}" ${selected.style==='filled'?'disabled':''}></label><label>Color <input aria-label="Icon color" type="color" value="${color}"></label></div><div class="icon-copy-actions"><button data-icon-copy>Copy SVG</button><button data-icon-download>Download</button></div><pre></pre><div class="icon-feedback" role="status"></div>`;
    panel.querySelector('pre').textContent=customize(selected);
  }
  function render(){
    const matches=list.filter(i=>i.style===style&&(!category||i.category===category)&&(!query||[i.name,i.category,...i.tags].join(' ').toLowerCase().includes(query.toLowerCase())));
    if(!query&&!category)matches.sort((a,b)=>{const x=favorites.indexOf(a.name),y=favorites.indexOf(b.name);return (x<0?999:x)-(y<0?999:y)||a.name.localeCompare(b.name);});
    root.querySelector('.icon-result-count').textContent=`${matches.length.toLocaleString()} ${style} icons · showing ${Math.min(limit,matches.length)} · v3.49.0`;
    root.querySelector('.icon-grid').innerHTML=matches.slice(0,limit).map(i=>`<button class="icon-choice ${selected?.name===i.name&&selected?.style===i.style?'selected':''}" data-icon="${i.name}" aria-label="Select ${i.name}">${customize(i)}<small>${i.name}</small></button>`).join('')||'<p>No matching icons.</p>';
    root.querySelector('.icon-more').hidden=!full||matches.length<=limit;
  }
  load().then(data=>{
    if(!alive)return;
    list=data.entries;
    const categories=[...new Set(list.map(i=>i.category))].sort();
    root.innerHTML=`<div class="icon-toolbar"><input type="search" aria-label="Search Tabler icons" placeholder="Search icons…"><select aria-label="Icon style"><option value="outline">Outline</option><option value="filled">Filled</option></select>${full?`<select aria-label="Icon category"><option value="">All categories</option>${categories.map(c=>`<option>${c}</option>`).join('')}</select>`:''}</div><p class="icon-result-count"></p><div class="icon-layout"><div><div class="icon-grid"></div><button class="icon-more">Show more icons</button></div><aside class="icon-inspector" ${full?'':'hidden'}></aside></div>`;
    selected=full?list.find(i=>i.name==='home'&&i.style==='outline'):undefined;
    render();if(selected)inspector();
    on(root.querySelector('input[type=search]'),'input',e=>{query=e.target.value;limit=full?96:16;render();});
    on(root.querySelector('[aria-label="Icon style"]'),'change',e=>{style=e.target.value;limit=full?96:16;selected=undefined;root.querySelector('.icon-inspector').hidden=true;render();});
    if(full)on(root.querySelector('[aria-label="Icon category"]'),'change',e=>{category=e.target.value;limit=96;render();});
    on(root,'click',async e=>{
      const b=e.target.closest('button');if(!b)return;
      if(b.dataset.icon){selected=list.find(i=>i.name===b.dataset.icon&&i.style===style);inspector();render();if(full&&matchMedia('(max-width:700px)').matches)root.querySelector('.icon-inspector').scrollIntoView({behavior:'smooth',block:'start'});}
      if(b.classList.contains('icon-more')){limit+=96;render();}
      if(b.hasAttribute('data-icon-copy')&&selected){try{await navigator.clipboard.writeText(customize(selected));root.querySelector('.icon-feedback').textContent='SVG copied.';}catch{root.querySelector('.icon-feedback').textContent='Clipboard unavailable; use Download.';}}
      if(b.hasAttribute('data-icon-download')&&selected){const url=URL.createObjectURL(new Blob([customize(selected)],{type:'image/svg+xml'}));const a=document.createElement('a');a.href=url;a.download=`tabler-${selected.name}-${style}.svg`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);root.querySelector('.icon-feedback').textContent='SVG downloaded.';}
    });
    on(root,'input',e=>{
      if(e.target.getAttribute('aria-label')==='Icon size')size=Number(e.target.value);
      else if(e.target.getAttribute('aria-label')==='Icon stroke width')stroke=Number(e.target.value);
      else if(e.target.getAttribute('aria-label')==='Icon color')color=e.target.value;
      else return;
      root.style.setProperty('--icon-size',size+'px');root.style.setProperty('--icon-color',color);
      root.querySelector('.icon-large').innerHTML=customize(selected);root.querySelector('.icon-inspector pre').textContent=customize(selected);render();
    });
  }).catch(error=>{if(alive)root.innerHTML=`<p class="icon-loading">${error.message}. <a href="https://tabler.io/icons" target="_blank" rel="noopener">Open official library ↗</a></p>`;});
  return()=>{alive=false;listeners.forEach(fn=>fn());};
}
