const params = new URLSearchParams(location.search);
const id = params.get('id') || location.hash.replace(/^#/, '') || 'onu';
const root = document.getElementById('projectRoot');

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}
function renderProject(p) {
  if (!p) throw new Error('not found');
  const g=p.general||{}, h=p.hero||{}, a=p.academic||{};
  const fixAsset = value => { const v=String(value||''); return v.replace(/^\.\.\/img\//,'img/').replace(/^\.\/img\//,'img/'); };
  const gallery=Array.isArray(p.gallery)?p.gallery:[];
  const videos=Array.isArray(p.videos)?p.videos:[];
  const resources=Array.isArray(p.resources)?p.resources:[];
  const galleryHtml=gallery.length ? `
    <section class="section white project-gallery-section">
      <div class="container">
        <div class="section-head">
          <div><div class="section-label">Registro</div><h2 class="display">Así se <em>vivió.</em></h2></div>
          <p class="section-intro">Imágenes y producciones de esta experiencia.</p>
        </div>
        <div class="projects project-gallery-grid">
          ${gallery.map((item,i)=>{
            const image=fixAsset(typeof item==='string'?item:item.image);
            const title=typeof item==='string'?'Registro '+String(i+1).padStart(2,'0'):(item.title||'Registro '+String(i+1).padStart(2,'0'));
            const description=typeof item==='string'?'':(item.description||'');
            return `<div class="project-card project-gallery-card"><img src="${escapeHtml(image)}" alt="${escapeHtml(title)}" loading="lazy" decoding="async" width="1200" height="900"><div class="project-body"><div class="project-meta"><span>Cortometraje</span><span>${String(i+1).padStart(2,'0')}</span></div><h3>${escapeHtml(title)}</h3>${description?`<p>${escapeHtml(description)}</p>`:''}</div></div>`;
          }).join('')}
        </div>
      </div>
    </section>` : '';
  const videosHtml=videos.length ? `
    <section class="section project-video-section">
      <div class="container">
        <div class="section-head"><div><div class="section-label">Material audiovisual</div><h2 class="display">Mirá los <em>cortos.</em></h2></div></div>
        <div class="project-video-grid">${videos.map((src,i)=>`<div class="project-video-item"><iframe src="${escapeHtml(src)}" title="Video ${i+1}" loading="lazy" allowfullscreen></iframe></div>`).join('')}</div>
      </div>
    </section>` : '';
  const resourcesHtml=resources.length ? `
    <section class="section white project-resources-section"><div class="container"><div class="section-head"><div><div class="section-label">Enlaces</div><h2 class="display">Seguí <em>explorando.</em></h2></div></div><div class="project-resources">${resources.map(r=>`<a class="btn" href="${escapeHtml(r.url)}" target="_blank" rel="noopener"><i class="${escapeHtml(r.icon||'fas fa-link')}" rel="noopener"></i> ${escapeHtml(r.title||'Ver enlace')} ↗</a>`).join('')}</div></div></section>` : '';
  root.innerHTML=`
    <div class="project-detail">
      <div class="reveal visible"><div class="eyebrow">INSM · Proyecto</div><div class="project-title" role="heading" aria-level="1">${escapeHtml(h.titleLine1||p.title||'Proyecto')}<br><em>${escapeHtml(h.titleLine2||'')}</em></div><p class="project-detail-text">${g.summary||''}</p><div class="project-meta-list"><div><strong>Fecha</strong><span>${escapeHtml(g.date||'')}</span></div><div><strong>Área</strong><span>${escapeHtml(a.value3||'INSM')}</span></div><div><strong>Participan</strong><span>${escapeHtml(a.value1||'')}</span></div><div><strong>Acompañamiento</strong><span>${escapeHtml(a.value2||'')}</span></div></div></div>
      <div class="reveal visible delay-1"><img class="hero-img" src="${escapeHtml(fixAsset(g.image||h.backgroundImage||'img/Convivencia.webp'))}" alt="${escapeHtml(h.titleLine1||'Proyecto')}" loading="lazy" decoding="async"></div>
    </div>
    <div class="section" style="padding-bottom:0"><div class="content-grid"><aside class="content-sticky"><div class="section-label">La experiencia</div><h2>Detrás del <em>proyecto.</em></h2></aside><div class="content-body">${g.detail||''}</div></div></div>
    ${galleryHtml}${videosHtml}${resourcesHtml}`;
  document.title=(h.titleLine1||p.title||'Proyecto')+' · INSM';
}

async function loadProject(){
  if(!id){
    root.innerHTML='<div class="content-body"><h2>Proyecto no seleccionado.</h2><p>Volvé a proyectos para elegir uno.</p><a class="btn btn-dark" href="Proyectos.html">Volver a proyectos ↗</a></div>';
    return;
  }
  try {
    // Al abrir la web directamente desde la PC, usamos los datos locales.
    if (window.INSM_PROJECTS && window.INSM_PROJECTS[id]) {
      renderProject(window.INSM_PROJECTS[id]);
      return;
    }
    // Cuando la web está publicada en un servidor, usamos el JSON real.
    const response=await fetch('templates/data/proyectos/'+encodeURIComponent(id)+'.json');
    if(!response.ok) throw new Error('not found');
    renderProject(await response.json());
  } catch(error) {
    console.error(error);
    root.innerHTML='<div class="content-body"><h2>No se pudo cargar este proyecto.</h2><p>Revisá que exista su archivo JSON dentro de <strong>templates/data/proyectos/</strong>.</p><a class="btn btn-dark" href="Proyectos.html">Volver a proyectos ↗</a></div>';
  }
}
loadProject();
