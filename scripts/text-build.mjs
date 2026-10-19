import {build} from 'esbuild';
import {writeFile,rm} from 'node:fs/promises';
await rm('dist/text-app',{recursive:true,force:true});
const result=await build({entryPoints:['text-lab/app.jsx'],outdir:'dist/text-app',bundle:true,format:'esm',minify:true,metafile:true,entryNames:'app-[hash]',jsx:'automatic',define:{'process.env.NODE_ENV':'"production"'}});
const [js,out]=Object.entries(result.metafile.outputs).find(([,o])=>o.entryPoint);
await writeFile('dist/text-preview.html',`<!doctype html><html lang="en"><head><script>if(window.top===window.self)location.replace('index.html#explore');</script><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Text transitions — UI Atlas</title><link rel="stylesheet" href="${out.cssBundle.replace('dist/','')}"></head><body><div id="root"></div><script type="module" src="${js.replace('dist/','')}"></script></body></html>`);
