import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
const production=process.argv.includes('--production');
const root=resolve(production?'dist':'.');
const port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webp':'image/webp','.svg':'image/svg+xml','.jpg':'image/jpeg','.woff2':'font/woff2'};
createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://localhost');
  if(url.pathname==='/'){res.writeHead(302,{Location:'/prescorn/'});return res.end();}
  let path=decodeURIComponent(url.pathname).replace(/^\/prescorn\//,'/');
  if(path.endsWith('/'))path+='index.html';
  const relative=path.replace(/^\//,'');
  if(relative.split('/').some(x=>x.startsWith('.'))){res.writeHead(403);return res.end();}
  let file=resolve(root,relative);
  if(!file.startsWith(root+'/')){res.writeHead(403);return res.end();}
  if(!production&&/^(images\/|favicon.svg|runtime-config.js)/.test(relative))file=resolve(root,'public',relative);
  if(!(await stat(file)).isFile())throw new Error('not a file');
  const body=await readFile(file);res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(body);
 }catch{res.writeHead(404);res.end('Not found');}
}).listen(port,'0.0.0.0',()=>console.log(`PRESCORN preview listening on ${port}/prescorn/`));
