import {build} from 'esbuild';
import {copyFile} from 'node:fs/promises';
await build({stdin:{contents:"export {ShaderMount,neuroNoiseFragmentShader,getShaderColorFromString} from '@paper-design/shaders';",resolveDir:process.cwd(),sourcefile:'paper-neuro-entry.js'},outfile:'dist/vendor/paper-neuro.js',bundle:true,format:'esm',minify:true,legalComments:'eof'});
await copyFile('node_modules/@paper-design/shaders/LICENSE','dist/PAPER_SHADERS_LICENSE.txt');
await copyFile('node_modules/@paper-design/shaders/NOTICE','dist/PAPER_SHADERS_NOTICE.txt');
console.log('Built the actual Paper Neuro Noise shader and retained LICENSE / NOTICE.');
