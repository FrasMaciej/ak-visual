import type { NextConfig } from 'next'
import media from './src/migrations/portfolio-media.json'

export const redirects: NextConfig['redirects'] = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header' as const,
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  return [
    internetExplorerRedirect,
    ...media.flatMap((row) =>
      [...new Set(['.jpg', ...Object.values(row.sizes)])].map((suffix) => ({
        source: `/api/media/file/${row.old}${suffix}`,
        destination: `/api/media/file/${row.new}${suffix}`,
        permanent: true,
      })),
    ),
  ]
}
