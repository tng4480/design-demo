import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
const catalog=JSON.parse(await readFile('dist/catalog.json','utf8'));
assert.equal(catalog.styles.length,20,'All requested styles must be represented');
for(const key of ['demos','sources','styles'])assert.equal(new Set(catalog[key].map(x=>x.id)).size,catalog[key].length,`${key}: duplicate IDs`);
for(const style of catalog.styles)assert(catalog.demos.some(d=>d.style===style.id),`${style.name}: no study`);
for(const demo of catalog.demos){if(demo.previewImage)assert((await stat('dist/'+demo.previewImage)).size>0,`${demo.id}: missing preview`);assert(catalog.sources.some(s=>s.id===demo.source),`${demo.id}: missing source`);assert(['Low','Medium','High'].includes(demo.effort));assert.match(demo.official,/^https:\/\//);assert(demo.watch&&demo.kind);}
for(const source of catalog.sources.filter(s=>s.capture))await stat(`dist/assets/${source.id}.jpg`);
for(const file of ['dist/skill-lab/lab.js','dist/design-prompts/studies.js','dist/app.js','dist/engines.js','dist/neuro-noise.js','scripts/paper-shaders-build.mjs','dist/playground.js','dist/helmet.js','dist/icons.js','scripts/tabler-assets.mjs','dist/scroll-lab.js','dist/transitions/transition.js','dist/journey.js','scripts/generate-catalog.mjs','scripts/vendor.mjs']){const r=spawnSync(process.execPath,['--check',file],{encoding:'utf8'});assert.equal(r.status,0,r.stderr);}
for(const file of ['skills.html','skill-lab/lab.js','skill-lab/lab.css','skill-lab/NOTES.txt','design-prompts.html','design-prompts/studies.css','design-prompts/studies.js','drawer.html','VAUL_NOTICES.txt','shadergradient-scroll.html','shadergradient-app/story.css','SHADERGRADIENT_NOTICES.txt','shadergradient-demo-source.txt','componentry.html','componentry-app/lab.css','COMPONENTRY_LICENSE.txt','COMPONENTRY_NOTES.txt','neuro-noise.html','neuro-noise.css','neuro-noise.js','vendor/paper-neuro.js','PAPER_SHADERS_LICENSE.txt','PAPER_SHADERS_NOTICE.txt','shadcn.html','SHADCN_NOTICES.txt','shadcn-app/lab.css','react-bits.html','react-bits-frame.html','REACT_BITS_LICENSE.txt','assets/react-bits/orbit.svg','assets/react-bits/studio.svg','index.html','atlas.css','effects.css','scroll-lab.html','scroll-lab.css','catalog.json','transitions/a.html','transitions/b.html','journey.html','journey.js','journey.css','icons.html','icons.js','icons.css','helmet.js','tabler-icons.json','TABLER_LICENSE.txt','vendor/gsap.js','vendor/ScrollTrigger.js','vendor/motion.js','vendor/lenis.js','vendor/lenis.css','vendor/barba.js','vendor/three.module.js','vendor/three.core.js','vendor/three-vanta.js','vendor/vanta.net.js','vendor/vanta.fog.js','vendor/vanta.waves.js','vendor/vanta.globe.js','vendor/vanta.topology.js','vendor/p5.js','THIRD_PARTY_NOTICES.txt'])assert((await stat('dist/'+file)).size>0,`${file}: empty`);
const notices=await readFile('dist/THIRD_PARTY_NOTICES.txt','utf8');for(const lib of ['motion','gsap','lenis','three','@barba/core','vanta','three-vanta','p5','react','react-dom','framer-motion'])assert(notices.includes('## '+lib),`${lib}: missing notice`);
const icons=JSON.parse(await readFile('dist/tabler-icons.json','utf8'));assert.equal(icons.entries.length,6238);assert(icons.entries.some(i=>i.name==='home'&&i.style==='outline'));assert(icons.entries.some(i=>i.style==='filled'));
assert.equal(catalog.demos.filter(d=>d.kind==='Runs React Bits').length,8);
assert.equal(catalog.demos.filter(d=>d.effect.startsWith('sc-')).length,4);
assert.equal(catalog.demos.filter(d=>d.kind==='Runs Componentry').length,3);
assert(catalog.demos.some(d=>d.id==='shadergradient-scroll'&&d.kind==='Runs Shader Gradient'));
assert(catalog.demos.some(d=>d.id==='drawer'&&d.kind==='Runs Vaul'));
const drawerPage=await readFile('dist/drawer.html','utf8');
for(const [,file] of drawerPage.matchAll(/(?:src|href)="(drawer-app\/[^"]+)"/g))assert((await stat('dist/'+file)).size>0,`Drawer asset missing: ${file}`);
assert.equal(catalog.demos.filter(d=>d.effect.startsWith('dp-')).length,4);
assert.equal(catalog.demos.filter(d=>d.effect.startsWith('sk-')).length,3);
const rbPage=await readFile('dist/react-bits.html','utf8');assert(rbPage.includes('react-bits-app/app-'));
console.log(`Validated ${catalog.demos.length} studies, ${catalog.sources.length} sources, all 20 styles, script syntax, local assets, and library notices.`);
