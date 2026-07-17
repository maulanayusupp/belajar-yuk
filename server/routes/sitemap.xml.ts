import { lessonService } from '~/services/lessonService'

// Dynamic sitemap: home, subjects, each lesson, + utility pages.
export default defineEventHandler((event) => {
  const base = (useRuntimeConfig(event).public.siteUrl as string).replace(/\/$/, '')

  const paths = [
    '/',
    '/english',
    '/math',
    '/science',
    '/bahasa',
    '/latihan',
    '/kemajuan',
    '/changelog',
  ]
  for (const lesson of lessonService.getLessons()) {
    paths.push(`/${lesson.subject}/${lesson.id}`)
  }

  const urls = paths
    .map((p) => `  <url><loc>${base}${p}</loc><changefreq>weekly</changefreq></url>`)
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return xml
})
