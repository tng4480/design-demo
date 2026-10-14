import {build} from 'esbuild';
import {readFile,writeFile,rm} from 'node:fs/promises';
await rm('dist/drawer-app',{recursive:true,force:true});
const result=await build({entryPoints:['drawer-lab/app.jsx'],outdir:'dist/drawer-app',bundle:true,format:'esm',minify:true,metafile:true,entryNames:'app-[hash]',jsx:'automatic',define:{'process.env.NODE_ENV':'"production"'},legalComments:'eof'});
const js=Object.entries(result.metafile.outputs).find(([,v])=>v.entryPoint==='drawer-lab/app.jsx')[0].replace('dist/','');
const css=Object.keys(result.metafile.outputs).find(path=>path.endsWith('.css')).replace('dist/','');
await writeFile('dist/drawer.html',`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Mobile drawer — actual Vaul</title><link rel="stylesheet" href="${css}"></head><body><div id="root"></div><script type="module" src="${js}"></script></body></html>`);
let notices='# Actual Vaul drawer demo\n\nOriginal composition using Vaul 1.1.2. Upstream: https://github.com/emilkowalski/vaul\n\n';
for(const name of ['vaul','@radix-ui/react-dialog']){const pkg=JSON.parse(await readFile(`node_modules/${name}/package.json`,'utf8'));notices+=`## ${name} ${pkg.version}\n\n`;for(const file of ['LICENSE.md','LICENSE','LICENSE.txt'])try{notices+=await readFile(`node_modules/${name}/${file}`,'utf8')+'\n\n';break;}catch{}}
notices+='React, React DOM and transitive Radix dependencies are MIT licensed; retained copyright notices are included in the application bundle. See THIRD_PARTY_NOTICES.txt for React licenses.\n';
await writeFile('dist/VAUL_NOTICES.txt',notices);
console.log('Built actual Vaul drawer demo.');
