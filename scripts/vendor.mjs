import {mkdir,copyFile,readFile,writeFile} from 'node:fs/promises';
await mkdir('dist/vendor',{recursive:true});
const files={'motion/dist/motion.js':'motion.js','gsap/dist/gsap.min.js':'gsap.js','gsap/dist/ScrollTrigger.min.js':'ScrollTrigger.js','lenis/dist/lenis.min.js':'lenis.js','three/build/three.module.js':'three.module.js','three/build/three.core.js':'three.core.js','@barba/core/dist/barba.umd.js':'barba.js','three-vanta/build/three.min.js':'three-vanta.js','vanta/dist/vanta.net.min.js':'vanta.net.js','vanta/dist/vanta.fog.min.js':'vanta.fog.js','vanta/dist/vanta.waves.min.js':'vanta.waves.js','vanta/dist/vanta.globe.min.js':'vanta.globe.js','vanta/dist/vanta.topology.min.js':'vanta.topology.js','p5/lib/p5.min.js':'p5.js'};
for(const [from,to] of Object.entries(files))await copyFile('node_modules/'+from,'dist/vendor/'+to);
let notices='# Third-party libraries\n\nThese files are pinned local copies. Local studies are original implementations, not copies of premium example code.\n\n';
for(const name of ['motion','gsap','lenis','three','@barba/core','vanta','three-vanta','p5']){const pkg=JSON.parse(await readFile('node_modules/'+name+'/package.json','utf8'));notices+=`## ${name} ${pkg.version}\n\n`;for(const f of ['LICENSE','LICENSE.md','LICENSE.txt','license.md'])try{notices+=await readFile('node_modules/'+name+'/'+f,'utf8');break;}catch{}notices+='\n\n';}
await writeFile('dist/THIRD_PARTY_NOTICES.txt',notices);
console.log('Vendored library files and preserved license notices.');
