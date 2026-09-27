export default function handler(req, res) {
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const base = `${proto}://${host}`;
  const pages = [
    ['', 'weekly', '1.0'],
    ['/NuestroColegio.html', 'monthly', '0.8'],
    ['/Proyectos.html', 'weekly', '0.8'],
    ['/Contacto.html', 'monthly', '0.8'],
    ['/Inscripciones.html', 'monthly', '0.9'],
    ['/NivelInicial.html', 'monthly', '0.7'],
    ['/NivelPrimario.html', 'monthly', '0.7'],
    ['/NivelSecundario.html', 'monthly', '0.7'],
    ['/NivelTerciario.html', 'monthly', '0.7'],
    ['/privacidad.html', 'yearly', '0.3']
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    pages.map(([path, freq, priority]) =>
      `<url><loc>${base}${path}</loc><changefreq>${freq}</changefreq><priority>${priority}</priority></url>`
    ).join('') + `</urlset>`;
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
  res.status(200).send(xml);
}
