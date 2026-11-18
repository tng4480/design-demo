// Builds the agent-facing docs served by GitHub Pages from catalog.json and agents/directions.json:
//   dist/llms.txt, dist/agents/directions.md, dist/agents/studies.md, dist/agents/sources.md
// guide.md and media.md are hand-written. Fails if a direction or media.md names a study that does not exist.
// Run: node scripts/agent-docs.mjs   (also runs at the end of scripts/generate-catalog.mjs)
import {readFile,writeFile} from 'node:fs/promises';

const BASE='https://tng4480.github.io/design-demo/';
const catalog=JSON.parse(await readFile('dist/catalog.json','utf8'));
const {directions}=JSON.parse(await readFile('dist/agents/directions.json','utf8'));
const media=await readFile('dist/agents/media.md','utf8');
const byId=Object.fromEntries(catalog.demos.map(d=>[d.id,d]));
const src=Object.fromEntries(catalog.sources.map(s=>[s.id,s]));
const styleName=Object.fromEntries(catalog.styles.map(s=>[s.id,s.name]));

// ---- validation
const missing=[];
for(const d of directions){for(const id of Object.values(d.studies).flat())if(!byId[id])missing.push(`${d.id} → study ${id}`);
  for(const id of d.sources)if(!src[id])missing.push(`${d.id} → source ${id}`);}
for(const [,id] of media.matchAll(/`([a-z0-9-]+)`/g))if(!byId[id]&&!/^(prefers-reduced-motion)$/.test(id))missing.push(`media.md → study ${id}`);
// Every direction's text pairs must meet WCAG 2 AA (4.5:1), since the guide tells agents to build only from these tokens.
const lum=h=>{const c=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return .2126*c[0]+.7152*c[1]+.0722*c[2];};
const ratio=(a,b)=>{const x=lum(a),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
for(const d of directions){const t=d.tokens;
  for(const [fg,bg] of [['ink','bg'],['muted','bg'],['ink','surface'],['muted','surface'],['onAccent','accent']]){const r=ratio(t[fg],t[bg]);if(r<4.5)missing.push(`${d.id} → ${fg} on ${bg} is ${r.toFixed(2)}:1 (needs 4.5)`);}}
if(missing.length){console.error('Agent docs problems:\n  '+missing.join('\n  '));process.exit(1);}

// ---- helpers
const studyUrl=d=>BASE+(d.file||`index.html#study=${d.id}`);
const usedIn={};for(const dir of directions)for(const id of Object.values(dir.studies).flat())(usedIn[id]??=new Set()).add(dir.id);
// Google Fonts rejects a request that asks for weights a family lacks, so single-weight families are requested bare.
const WEIGHTS={'Anton':'','Press Start 2P':'','VT323':'','Instrument Serif':'','Archivo Black':'','DM Mono':':wght@400;500','Space Mono':':wght@400;700'};
const fontHref=fams=>'https://fonts.googleapis.com/css2?'+[...new Set(fams)].map(f=>'family='+f.replace(/ /g,'+')+(WEIGHTS[f]??':wght@400;500;600;700')).join('&')+'&display=swap';
const fontStack=(f,kind)=>`'${f}', ${kind==='mono'?'ui-monospace, monospace':/Serif|Garamond|Fraunces|Newsreader/.test(f)?'Georgia, serif':'system-ui, sans-serif'}`;
const link=d=>`[${d.title}](${studyUrl(d)})`;

// ---- directions.md
let md=`# UI Atlas: design directions

Each direction is a complete starting system. Pick one per project (see ${BASE}agents/guide.md), paste its tokens and font link, then build only from those values. Study links open self-contained code or the gallery entry; ids resolve in ${BASE}agents/studies.md.

| id | name | best for |
|---|---|---|
${directions.map(d=>`| \`${d.id}\` | ${d.name} | ${d.fits.slice(0,7).join(', ')} |`).join('\n')}
`;
for(const d of directions){const t=d.tokens,ty=d.type,href=fontHref([ty.display,ty.body,ty.mono]);
  md+=`
---

## ${d.name} (\`${d.id}\`)

${d.oneLine}

**Fits:** ${d.fits.join(', ')}. **Mode:** ${d.mode}.

\`\`\`html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="${href}" rel="stylesheet">
\`\`\`

\`\`\`css
:root {
  --bg: ${t.bg};
  --surface: ${t.surface};
  --ink: ${t.ink};
  --muted: ${t.muted};
  --line: ${t.line};
  --accent: ${t.accent};
  --on-accent: ${t.onAccent};
  --font-display: ${fontStack(ty.display)};
  --font-body: ${fontStack(ty.body)};
  --font-mono: ${fontStack(ty.mono,'mono')};
}
\`\`\`

- **Type:** ${ty.display} for display, ${ty.body} for body, ${ty.mono} for mono. ${ty.scale}. ${ty.notes}
- **Shape:** radius ${d.shape.radius}; ${d.shape.border}; ${d.shape.density}.
- **Layout:**
${d.layout.map(l=>`  - ${l}`).join('\n')}
- **Motion:** ${d.motion}
- **Copy:** ${d.copy}
${d.keep.map(k=>`- ${k}`).join('\n')}

**Signature (pick one):** ${d.studies.signature.map(id=>link(byId[id])).join(', ')}
**Supporting:** ${d.studies.components.map(id=>link(byId[id])).join(', ')}${d.studies.motion.length?`
**Motion:** ${d.studies.motion.map(id=>link(byId[id])).join(', ')}`:''}
**Sources:** ${d.sources.map(id=>`[${src[id].name}](${src[id].url}) (${(src[id].license||'').split(';')[0]})`).join(', ')}${d.references.length?`
**Full-page references:** ${d.references.map(r=>BASE+r).join(', ')}`:''}
`;}
await writeFile('dist/agents/directions.md',md);

// ---- studies.md
const CATS=[['Graphics','Graphics and print'],['Styles','Visual styles'],['Components','Components'],['Motion','Motion'],['Color','Colour and assets']];
let st=`# UI Atlas: study index

${catalog.demos.length} studies. Each line: what it is, when to use it, effort, how it runs, and links. "code" links to a self-contained HTML file you can read and copy; "gallery" opens a bundled study, so build those from the upstream source. "preview" is a screenshot you can look at.
`;
for(const [cat,title] of CATS){const list=catalog.demos.filter(d=>d.category===cat);
  st+=`\n## ${title} (${list.length})\n\n`;
  for(const d of list){const s=src[d.source],links=[`[${d.file?'code':'gallery'}](${studyUrl(d)})`];
    if(d.previewImage)links.push(`[preview](${BASE+d.previewImage})`);if(d.official)links.push(`[upstream](${d.official})`);
    st+=`- **${d.title}** \`${d.id}\`: ${d.summary} *Use for:* ${d.use}. *Effort:* ${d.effort}. *Runs:* ${d.kind}. *Source:* ${s?.name||d.source}${d.style&&styleName[d.style]?`. *Style:* ${styleName[d.style]}`:''}${usedIn[d.id]?`. *Directions:* ${[...usedIn[d.id]].join(', ')}`:''}. ${links.join(' · ')}\n`;}}
await writeFile('dist/agents/studies.md',st);

// ---- sources.md
let so=`# UI Atlas: sources

${catalog.sources.length} libraries, tools and references. Check the licence before shipping anything copied from them. "Inspiration only" means look, do not copy.

`;
for(const s of [...catalog.sources].sort((a,b)=>a.name.localeCompare(b.name)))
  so+=`- **[${s.name}](${s.url})** \`${s.id}\`: ${s.bestFor||s.category||''}. *Licence:* ${s.license||'not stated'}. *Install:* ${s.install||'see site'}.${s.caveat?` *Note:* ${s.caveat}`:''}\n`;
await writeFile('dist/agents/sources.md',so);

// ---- llms.txt
const graphics=catalog.demos.filter(d=>d.category==='Graphics').length;
await writeFile('dist/llms.txt',`# UI Atlas

> A design library for AI agents and people: ${directions.length} complete design directions (tokens, type, layout, motion, copy), ${catalog.demos.length} live studies (${graphics} of them graphics: posters, charts, slides, social images, identities, generative art) and ${catalog.sources.length} vetted sources with licences. Use it to choose a deliberate design for a website, app UI or graphic instead of a generic default.

When asked to "use the UI Atlas" or "choose a design from the atlas":

1. Read the guide: ${BASE}agents/guide.md (the process, the budget and the checklist).
2. Pick one direction from ${BASE}agents/directions.md and paste its tokens and font link.
3. Read your medium's rules in ${BASE}agents/media.md.
4. Choose one signature element and two to four supporting ones from the direction, opening their study code from ${BASE}agents/studies.md.

## Docs

- [Agent guide](${BASE}agents/guide.md): the seven-step process, restraint budget, defaults to replace and final checklist
- [Design directions](${BASE}agents/directions.md): ${directions.map(d=>d.name).join(', ')}
- [Rules per medium](${BASE}agents/media.md): web page, app UI, poster and print, chart, slides, social image, brand identity, pattern and generative art, infographic
- [Study index](${BASE}agents/studies.md): every study with use, effort, code link and preview image
- [Sources](${BASE}agents/sources.md): libraries, tools and references with licences and install lines

## Data

- [directions.json](${BASE}agents/directions.json): the directions as structured data
- [catalog.json](${BASE}catalog.json): every study, style and source as structured data

## Optional

- [Gallery](${BASE}): the visual atlas for people; open one study with ${BASE}index.html#study=<id>
`);
console.log(`agent docs: ${directions.length} directions, ${catalog.demos.length} studies, ${catalog.sources.length} sources`);
