INSM — BUILD OPTIMIZADO PARA WEBSCORE + VERCEL
================================================

Objetivo
--------
Esta versión prioriza rendimiento, SEO, accesibilidad, buenas prácticas y seguridad sin quitar
las secciones institucionales ni el sistema de inscripciones.

CAMBIOS PRINCIPALES
-------------------
- Imágenes WebP optimizadas y carga diferida en contenido no crítico.
- Logo reducido para evitar descargar una imagen enorme para un elemento de 48–42 px.
- Hero/LCP con prioridad alta.
- Se eliminaron scripts de analítica de terceros que agregaban requests al cargar la página.
- JavaScript inline se pasó a archivos externos y se dejó una CSP más estricta.
- Headers de seguridad en vercel.json.
- Cache de 1 año para CSS, JS, fuentes, imágenes, JSON y PDF estáticos.
- Sitemap, robots.txt y security.txt conservados.
- Metadatos SEO, Open Graph, Twitter Cards y datos estructurados conservados/mejorados.
- FAQPage estructurado en la portada.
- Imágenes dinámicas de proyectos con loading=lazy, decoding=async y dimensiones reservadas.
- Soporte para reduced motion.
- Se corrigieron detalles de HTML/recursos y se mantuvo el sistema de inscripciones.

PUBLICAR EN VERCEL
------------------
1. Entrá a https://vercel.com/
2. Importá este proyecto como proyecto nuevo.
3. Si podés elegir el nombre del proyecto, usá:
      web95
   para obtener:
      https://TU-PROYECTO.vercel.app/
4. Framework Preset: Other.
5. Build Command: dejalo vacío.
6. Output Directory: dejalo vacío / raíz del proyecto.
7. Deploy.

IMPORTANTE SOBRE LA URL
-----------------------
Los canonical, sitemap, robots.txt, security.txt y datos estructurados están preparados para:
    https://TU-PROYECTO.vercel.app/

Si Vercel te asigna otra URL, reemplazá globalmente:
    https://TU-PROYECTO.vercel.app
por la URL *.vercel.app real del proyecto antes de volver a desplegar.

NO HACE FALTA COMPRAR UN DOMINIO.
La URL gratuita de Vercel alcanza para publicar el sitio.

DESPUÉS DEL DEPLOY
------------------
- Abrí la URL en incógnito.
- Comprobá Inicio, niveles, Proyectos, un proyecto individual, Contacto e Inscripciones.
- En Inscripciones, probá que las conexiones de Google Apps Script sigan funcionando.
- Volvé a WebScore.ai y escaneá la URL pública.
- Si el primer resultado cambia unos puntos, hacé una segunda medición: los tests de rendimiento
  pueden variar entre ejecuciones según red, servidor y navegador.

NOTA
----
No se puede garantizar matemáticamente un 95+ desde un ZIP porque el puntaje depende también
del servidor, TTFB, ejecución real del navegador y de la medición de WebScore. Esta build sí
está preparada para atacar los problemas técnicos que normalmente más afectan ese resultado.
