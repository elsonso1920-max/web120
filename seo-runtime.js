(function(){
  const origin=window.location.origin;
  const path=window.location.pathname||'/';
  const clean=origin+path;
  const canonical=document.querySelector('link[rel="canonical"]');
  if(canonical) canonical.href=clean;
  const og=document.querySelector('meta[property="og:url"]');
  if(og) og.content=clean;
  document.querySelectorAll('meta[property="og:image"],meta[name="twitter:image"]').forEach(function(m){if(m.content && m.content.startsWith('/')) m.content=origin+m.content;});
  const ld=document.querySelector('script[type="application/ld+json"]');
  if(ld){
    try{
      const data=JSON.parse(ld.textContent);
      const graph=data['@graph']||[];
      graph.forEach(x=>{
        if(x.url && typeof x.url==='string' && x.url.includes('web95.vercel.app')) x.url=x.url.replace('https://web95.vercel.app',origin);
        if(x['@id'] && typeof x['@id']==='string' && x['@id'].includes('web95.vercel.app')) x['@id']=x['@id'].replace('https://web95.vercel.app',origin);
        if(Array.isArray(x.itemListElement)) x.itemListElement.forEach(i=>{if(i.item&&typeof i.item==='string'&&i.item.includes('web95.vercel.app')) i.item=i.item.replace('https://web95.vercel.app',origin)});
        if(x.logo && typeof x.logo==='string' && x.logo.includes('web95.vercel.app')) x.logo=x.logo.replace('https://web95.vercel.app',origin);
      });
      ld.textContent=JSON.stringify(data);
    }catch(e){}
  }
})();
