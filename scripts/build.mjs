import { cp, mkdir, rm, readFile, writeFile } from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});
await mkdir('dist',{recursive:true});
await cp('public','dist',{recursive:true});
await cp('src','dist/src',{recursive:true});
await cp('index.html','dist/index.html');
await writeFile('dist/.nojekyll','');
if(process.env.INQUIRY_ENDPOINT){
 const endpoint=new URL(process.env.INQUIRY_ENDPOINT);
 if(endpoint.protocol!=='https:')throw new Error('Inquiry endpoint must use HTTPS.');
 await writeFile('dist/runtime-config.js',`globalThis.PRESCORN_CONFIG = ${JSON.stringify({inquiryEndpoint:endpoint.href})};\n`);
}
const html=await readFile('dist/index.html','utf8');
if(/(?:src|href)="\//.test(html))throw new Error('Root-relative asset paths are not allowed.');
console.log('PRESCORN built successfully → dist/ (GitHub Pages /prescorn/ compatible)');
