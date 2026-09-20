import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { experience } from './src/data/experience'
import { projects } from './src/data/projects'

/** The canonical origin. Also hardcoded in index.html's og:image and og:url. */
const ORIGIN = 'https://bhanusadhu.com'

/**
 * Writes sitemap.xml from the same data the router renders, so the two cannot
 * drift: every path here resolves to a real page. Face-down projects render
 * the 404, so they stay out. No lastmod: the dates would be invented.
 */
function sitemap(): Plugin {
  return {
    name: 'sitemap',
    apply: 'build',
    generateBundle() {
      const paths = [
        '/',
        '/list',
        ...experience.map((e) => `/experience/${e.slug}`),
        ...projects.filter((p) => p.status !== 'idea').map((p) => `/projects/${p.slug}`),
      ]
      const body = paths.map((p) => `  <url>\n    <loc>${ORIGIN}${p}</loc>\n  </url>`).join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), sitemap()],
  build: {
    target: 'es2022',
    cssTarget: 'safari15',
    modulePreload: { polyfill: false },
    reportCompressedSize: false,
  },
})
