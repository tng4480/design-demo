import {build} from 'esbuild';
import {readFile,writeFile,mkdir,stat,rm} from 'node:fs/promises';
import {resolve} from 'node:path';
import {execFileSync} from 'node:child_process';
const snapshots=JSON.parse(await readFile('research/shadcn-snapshots.json','utf8'));
for(const [key,item] of Object.entries(snapshots))for(const file of item.files){
 const local=`.cache/shadcn/${key}/${file}`;await mkdir(resolve(local,'..'),{recursive:true});
 try{await stat(local);}catch{const r=await fetch(`https://raw.githubusercontent.com/${item.repo}/${item.commit}/${file}`);if(!r.ok)throw Error(`${file}: ${r.status}`);await writeFile(local,await r.text());}
}
const registry='.cache/shadcn/animate/apps/www/registry/';
const aliases={
 'cn':'shadcn-lab/utils.js','@/lib/utils':'shadcn-lab/utils.js','@workspace/ui/lib/utils':'shadcn-lab/utils.js',
 '@/registry/primitives/radix/tabs':registry+'primitives/radix/tabs/index.tsx',
 '@/registry/primitives/effects/highlight':registry+'primitives/effects/highlight/index.tsx',
 '@/registry/primitives/effects/auto-height':registry+'primitives/effects/auto-height/index.tsx',
 '@/registry/primitives/animate/slot':registry+'primitives/animate/slot/index.tsx',
 '@/registry/hooks/use-auto-height':registry+'hooks/use-auto-height/index.tsx',
 '@/registry/hooks/use-controlled-state':registry+'hooks/use-controlled-state/index.tsx',
 '@/registry/lib/get-strict-context':registry+'lib/get-strict-context/index.tsx'
};
const plugin={name:'atlas-adapters',setup(api){
 api.onResolve({filter:/^(cn$|@\/|@workspace\/)/},args=>aliases[args.path]?{path:resolve(aliases[args.path])}:undefined);
 api.onLoad({filter:/kibo\/packages\/comparison\/index\.tsx$/},async args=>{
  let contents=await readFile(args.path,'utf8');
  // Preserve the upstream comparison renderer while making its focused slider
  // respond to keyboard input as well as pointer and touch input.
  contents=contents.replace('role="slider"',`onKeyDown={(event) => {
    let next = sliderPosition;
    if (event.key === "ArrowLeft") next -= 5;
    else if (event.key === "ArrowRight") next += 5;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 100;
    else return;
    event.preventDefault(); next = Math.max(0, Math.min(100, next));
    motionValue.set(next); setSliderPosition(next);
  }} role="slider"`);
  return{contents,loader:'tsx'};
 });
}};
await rm('dist/shadcn-app',{recursive:true,force:true});
const result=await build({entryPoints:['shadcn-lab/app.jsx'],outdir:'dist/shadcn-app',bundle:true,splitting:true,format:'esm',minify:true,metafile:true,entryNames:'app-[hash]',chunkNames:'chunk-[hash]',jsx:'automatic',define:{'process.env.NODE_ENV':'"production"'},plugins:[plugin],legalComments:'eof'});
const output=Object.entries(result.metafile.outputs).find(([,v])=>v.entryPoint==='shadcn-lab/app.jsx');
// shadcn's Nova button rules are used verbatim; unrelated style rules aren't needed.
const nova=await readFile('.cache/shadcn/core/apps/v4/registry/styles/style-nova.css','utf8');
const section=nova.slice(nova.indexOf('/* MARK: Button */'),nova.indexOf('/* MARK: Button Group */'));
if(!section.includes('cn-button'))throw Error('Nova button section moved');
await writeFile('.cache/shadcn/nova-buttons.css','.style-nova {\n'+section+'\n}');
execFileSync(process.execPath,['node_modules/@tailwindcss/cli/dist/index.mjs','-i','shadcn-lab/lab.css','-o','dist/shadcn-app/lab.css','--minify'],{stdio:'inherit'});
const js=output[0].replace('dist/','');
const page=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>shadcn & friends — Four picks</title><link rel="stylesheet" href="shadcn-app/lab.css?v=${js}"></head><body><div id="root"></div><script type="module" src="${js}"></script></body></html>`;
await writeFile('dist/shadcn.html',page);
let notices='# shadcn and community application demo sources\n\n';
for(const [key,item]of Object.entries(snapshots)){const license=item.files.find(f=>/license/i.test(f));notices+=`## ${item.repo} @ ${item.commit}\n\n`+await readFile(`.cache/shadcn/${key}/${license}`,'utf8')+'\n\n';}
for(const name of ['radix-ui','react-resizable-panels','lucide-react','clsx','tailwind-merge','class-variance-authority']){const pkg=JSON.parse(await readFile(`node_modules/${name}/package.json`,'utf8'));notices+=`## ${name} ${pkg.version}\n\n`;let found=false;for(const file of ['LICENSE','LICENSE.md','LICENSE.txt','license'])try{notices+=await readFile(`node_modules/${name}/${file}`,'utf8')+'\n\n';found=true;break;}catch{}if(!found)throw Error('License missing: '+name);}
await writeFile('dist/SHADCN_NOTICES.txt',notices);
console.log('Built four actual shadcn and community demo compositions.');
