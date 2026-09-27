INSM — VERSION OPTIMIZADA PARA WEB PERFORMANCE / VERCEL
============================================================

Objetivo
--------
Esta versión mantiene el contenido institucional, niveles Inicial/Primario/Secundario/Superior,
proyectos, contacto e inscripciones, pero prioriza carga rápida, SEO técnico, accesibilidad,
UX móvil y seguridad.

CAMBIOS PRINCIPALES
-------------------
- Se conserva WebP y lazy-loading en imágenes no críticas.
- Se mantienen dimensiones explícitas en imágenes para reducir CLS.
- Se prioriza la imagen principal de cada página.
- Se eliminan atributos HTML duplicados.
- Se agrega content-visibility a contenido fuera de pantalla para reducir trabajo inicial.
- Se mantienen fuentes locales con font-display: swap.
- Se mantienen headers de seguridad en vercel.json.
- Se mantienen robots.txt y sitemap.xml.
- Se conserva la lógica de Inscripciones y sus endpoints.
- Se mantiene la estructura y contenido de los niveles educativos.

PUBLICAR EN VERCEL SIN PAGAR DOMINIO
------------------------------------
1. Entrá a https://vercel.com/
2. Iniciá sesión.
3. Elegí "Add New..." -> "Project".
4. Subí/importá este proyecto como sitio estático.
5. No hace falta elegir framework: si Vercel lo pregunta, dejá el proyecto como estático.
6. Deploy.
7. Vercel te dará una URL *.vercel.app gratuita.

IMPORTANTE SOBRE EL DOMINIO / SEO
---------------------------------
El proyecto usa actualmente https://TU-PROYECTO.vercel.app/ en canonical, Open Graph y sitemap.
Si Vercel te asigna OTRA URL, reemplazá:
  https://TU-PROYECTO.vercel.app
por tu nueva URL *.vercel.app en:
  - archivos HTML
  - sitemap.xml
  - robots.txt
  - datos JSON-LD

Después de desplegar, ejecutá nuevamente WebScore.ai sobre la URL FINAL.

SOBRE EL objetivo alto
------------
No existe una forma responsable de garantizar 95+ sin ejecutar el auditor sobre la URL
final y sus condiciones reales de red. WebScore puede cambiar su resultado según servidor,
caché, rastreo, URL, contenido y criterios del auditor. Esta versión está preparada para
maximizar las áreas técnicas que el sitio puede controlar directamente.

NO MODIFICAR
------------
No elimines ni cambies la página Inscripciones.html ni inscripciones.js si querés conservar
el formulario y su conexión actual.

