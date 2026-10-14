import {execFileSync,spawnSync} from 'node:child_process';
import {mkdtemp,cp,rm,readdir,stat} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import {tmpdir} from 'node:os';
const root=resolve('.');
await stat(join(root,'dist/index.html'));
const auth=['-c','credential.helper=','-c','credential.helper=!gh auth git-credential'];
const run=(args,cwd=root)=>execFileSync('git',args,{cwd,encoding:'utf8'}).trim();
const remote=run(['remote','get-url','origin']);
if(remote!=='https://github.com/tng4480/design-demo.git')throw Error('Unexpected repository origin; inspect the target before publishing.');
const temp=await mkdtemp(join(tmpdir(),'design-demo-pages-'));
try{
  run(['init','-b','gh-pages'],temp);
  run(['remote','add','origin',remote],temp);
  const exists=run([...auth,'ls-remote','--heads',remote,'refs/heads/gh-pages']);
  if(exists){run([...auth,'fetch','origin','gh-pages'],temp);run(['checkout','-B','gh-pages','FETCH_HEAD'],temp);}
  for(const item of await readdir(temp))if(item!=='.git')await rm(join(temp,item),{recursive:true,force:true});
  await cp(join(root,'dist'),temp,{recursive:true});
  run(['config','user.name',run(['show','-s','--format=%an','HEAD'])],temp);
  run(['config','user.email',run(['show','-s','--format=%ae','HEAD'])],temp);
  run(['add','--all'],temp);
  const changed=spawnSync('git',['diff','--cached','--quiet'],{cwd:temp});
  if(changed.status!==0){run(['commit','-m','Publish static design demos'],temp);run([...auth,'push','origin','gh-pages'],temp);}
  console.log('Published dist/ to the gh-pages branch. GitHub Pages will update automatically.');
}finally{await rm(temp,{recursive:true,force:true});}
