const projectGrid = document.getElementById('projectGrid');
function renderProjects(data) {
  const arr = Array.isArray(data) ? data : (data.projects || data.proyectos || []);
  if (!arr.length) throw new Error('Sin proyectos');
  projectGrid.innerHTML = arr.map((p,i)=>{
    const url = 'Proyecto.html#' + encodeURIComponent(p.id);
    return `<a class="project-card reveal" data-tilt data-project-link href="${url}" target="_blank" rel="noopener noreferrer"><img src="${p.image||'img/Convivencia.webp'}" alt="${p.title||'Proyecto'}" loading="lazy" decoding="async"><div class="project-body"><div class="project-meta"><span>${p.displayDate||''}</span><span>${String(i+1).padStart(2,'0')}</span></div><h3>${p.title||'Proyecto'}</h3><p>${p.summary||''}</p><span class="project-link">Ver proyecto ↗</span></div></a>`;
  }).join('');
  // Evita que el arrastre horizontal intercepte el clic del enlace.
  projectGrid.querySelectorAll('[data-project-link]').forEach(link => {
    link.addEventListener('pointerdown', e => e.stopPropagation());
  });
  document.querySelectorAll('.reveal').forEach(e=>e.classList.add('visible'));
}
fetch('templates/data/index-proyectos.json')
  .then(r=>{ if(!r.ok) throw new Error('No se pudo cargar el índice'); return r.json(); })
  .then(renderProjects)
  .catch(error=>{
    console.warn('Usando datos locales de respaldo:', error);
    if (window.INSM_PROJECT_INDEX) renderProjects(window.INSM_PROJECT_INDEX);
    else projectGrid.innerHTML='<div class="content-body"><h2>No se pudieron cargar los proyectos.</h2><p>Falta el archivo de datos de proyectos.</p></div>';
  });
