import {build} from 'esbuild';
import {readFile,writeFile,mkdir,stat,rm} from 'node:fs/promises';
const manifest=JSON.parse(await readFile('research/react-bits.json','utf8'));
const base=`https://raw.githubusercontent.com/DavidHDev/react-bits/${manifest.commit}/`;
for(const demo of manifest.demos){
  const dir=`.cache/react-bits/${demo.group}/${demo.name}`;
  await mkdir(dir,{recursive:true});
  for(const file of demo.files){
    const local=`${dir}/${file}`;
    try{await stat(local);}catch{
      const response=await fetch(base+demo.path.replace(`${demo.name}.jsx`,file));
      if(!response.ok)throw Error(`Unable to fetch ${file}: ${response.status}`);
      await writeFile(local,await response.text());
    }
  }
}
try{await stat('dist/REACT_BITS_LICENSE.txt');}catch{
  const response=await fetch(base+'LICENSE.md');
  if(!response.ok)throw Error('React Bits license unavailable');
  await writeFile('dist/REACT_BITS_LICENSE.txt',await response.text());
}
await rm('dist/react-bits-app',{recursive:true,force:true});
const result=await build({entryPoints:['react-bits/app.jsx'],outdir:'dist/react-bits-app',bundle:true,splitting:true,format:'esm',minify:true,metafile:true,entryNames:'app-[hash]',chunkNames:'chunk-[hash]',jsx:'automatic',define:{'process.env.NODE_ENV':'"production"'},legalComments:'eof'});
const output=Object.entries(result.metafile.outputs).find(([,o])=>o.entryPoint==='react-bits/app.jsx');
const js=output[0].replace('dist/',''),css=output[1].cssBundle?.replace('dist/','');
const page=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>React Bits — Eight live studies</title>${css?`<link rel="stylesheet" href="${css}">`:''}</head><body><div id="root"></div><script type="module" src="${js}"></script></body></html>`;
await writeFile('dist/react-bits.html',page);
await writeFile('dist/react-bits-frame.html',page);
console.log(`Built ${manifest.demos.length} actual React Bits demos from ${manifest.commit.slice(0,7)}.`);
