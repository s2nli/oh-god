const V='codexstudys-hub-v3';
const CORE=['./','index.html','style.css','app.js','data.js','manifest.json','logo-64.png','logo-192.png','logo-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('codexstudys-hub-')&&x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request; const u=new URL(r.url); if(r.method!=='GET'||u.origin!==location.origin||/^\/(pw|nt|ae|cw|rg|sm|mm|vm|kd|uc|pr|shared)\//.test(u.pathname)) return;
  e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put(r,cp));return res}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))));
});
