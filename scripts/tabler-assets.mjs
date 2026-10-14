import {readFile,writeFile,readdir} from 'node:fs/promises';
const root='node_modules/@tabler/icons';
const metadata=JSON.parse(await readFile(root+'/icons.json','utf8'));
const pkg=JSON.parse(await readFile(root+'/package.json','utf8'));
const entries=[];
for(const style of ['outline','filled'])for(const file of await readdir(root+'/icons/'+style)){
  if(!file.endsWith('.svg'))continue;
  const name=file.slice(0,-4), info=metadata[name]||{};
  const svg=(await readFile(root+'/icons/'+style+'/'+file,'utf8')).replace(/\s+/g,' ').trim();
  if(/<script|onload=|onclick=/i.test(svg))throw Error('Unexpected executable SVG: '+name);
  entries.push({name,style,category:info.category||'Other',tags:info.tags||[],svg});
}
entries.sort((a,b)=>a.name.localeCompare(b.name)||a.style.localeCompare(b.style));
await writeFile('dist/tabler-icons.json',JSON.stringify({version:pkg.version,entries}));
await writeFile('dist/TABLER_LICENSE.txt',await readFile(root+'/LICENSE','utf8'));
console.log(`Exported ${entries.length} actual Tabler SVGs, pinned to ${pkg.version}, with MIT license.`);
