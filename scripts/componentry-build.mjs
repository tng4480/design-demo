import {build} from 'esbuild';
import {mkdir,readFile,writeFile,stat,rm} from 'node:fs/promises';
import {resolve} from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const snapshot=JSON.parse(await readFile('research/componentry-snapshot.json','utf8'));
for(const file of snapshot.files){const local='.cache/componentry/'+file;await mkdir(resolve(local,'..'),{recursive:true});try{await stat(local);}catch{const r=await fetch(`https://raw.githubusercontent.com/${snapshot.repo}/${snapshot.commit}/${file}`);if(!r.ok)throw Error(file+': '+r.status);await writeFile(local,await r.text());}}
await rm('dist/componentry-app',{recursive:true,force:true});
const result=await build({entryPoints:['componentry/app.jsx'],outdir:'dist/componentry-app',bundle:true,format:'esm',minify:true,metafile:true,entryNames:'app-[hash]',jsx:'automatic',alias:{'@workspace/ui/lib/utils':resolve('shadcn-lab/utils.js')},define:{'process.env.NODE_ENV':'"production"'},legalComments:'eof'});
execFileSync(process.execPath,['node_modules/@tailwindcss/cli/dist/index.mjs','-i','componentry/lab.css','-o','dist/componentry-app/lab.css','--minify'],{stdio:'inherit'});
const css=await readFile('dist/componentry-app/lab.css'),hash=createHash('sha256').update(css).digest('hex').slice(0,12);
const js=Object.keys(result.metafile.outputs).find(p=>p.endsWith('.js')).replace('dist/','');
await writeFile('dist/componentry.html',`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Componentry — Three live demos</title><link rel="stylesheet" href="componentry-app/lab.css?v=${hash}"></head><body><div id="root"></div><script type="module" src="${js}"></script></body></html>`);
await writeFile('dist/COMPONENTRY_LICENSE.txt',await readFile('.cache/componentry/LICENSE','utf8'));
await writeFile('dist/COMPONENTRY_NOTES.txt',`Componentry application demos\n\nSource: https://github.com/${snapshot.repo}\nRevision: ${snapshot.commit}\nLicense: MIT (retained in COMPONENTRY_LICENSE.txt).\n\nHover Transition, Circuit Board and Scroll Choreography run actual upstream component logic. Framer Motion imports use the same installed runtime as motion/react. The demo controls, text and composition are original.\n\nScroll Choreography uses the same public Unsplash image URLs referenced in the upstream demo, at a smaller delivery size. Images remain hosted by Unsplash and are subject to their license: https://unsplash.com/license\n\nReact, Motion, clsx and tailwind-merge dependency notices are retained in THIRD_PARTY_NOTICES.txt and SHADCN_NOTICES.txt.\n`);
console.log('Built three actual Componentry component demos.');
