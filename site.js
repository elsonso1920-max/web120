(function(){
'use strict';
const nav=document.querySelector('.site-nav'), progress=document.querySelector('.progress');
const menu=document.querySelector('.mobile-menu'), toggle=document.querySelector('.menu-toggle');
function scrollUI(){const h=document.documentElement.scrollHeight-innerHeight;
 if(nav)nav.classList.toggle('scrolled',scrollY>70);
 if(progress)progress.style.width=(h>0?scrollY/h*100:0)+'%';}
addEventListener('scroll',scrollUI,{passive:true});scrollUI();
if(toggle&&menu){
 const setMenu=o=>{menu.classList.toggle('open',o);toggle.setAttribute('aria-expanded',String(o));toggle.setAttribute('aria-label',o?'Cerrar menú':'Abrir menú');};
 toggle.addEventListener('click',()=>setMenu(!menu.classList.contains('open')));
 menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
 addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false);});
}
const reveal=document.querySelectorAll('.reveal');
if('IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}}),{threshold:.08,rootMargin:'0px 0px -30px'});reveal.forEach(e=>io.observe(e));}else reveal.forEach(e=>e.classList.add('visible'));
document.querySelectorAll('[data-count]').forEach(el=>{
 const target=Number(el.dataset.count);if(!Number.isFinite(target))return;
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){el.textContent=target.toLocaleString('es-AR');return;}
 let started=false;const run=()=>{if(started)return;started=true;let n=0;const step=Math.max(1,Math.ceil(target/35));const t=setInterval(()=>{n=Math.min(target,n+step);el.textContent=n.toLocaleString('es-AR');if(n>=target)clearInterval(t);},28);};
 if('IntersectionObserver'in window){const io2=new IntersectionObserver(es=>{if(es[0].isIntersecting){run();io2.disconnect();}},{threshold:.6});io2.observe(el);}else run();
});
})();