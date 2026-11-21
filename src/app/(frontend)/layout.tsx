import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import Link from 'next/link'
import { CMSLink } from '@/components/Link'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { draftMode } from 'next/headers'

import './globals.css'
import './portfolio.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const [header, footer] = await Promise.all([
    getCachedGlobal('header', 1)(),
    getCachedGlobal('footer', 1)(),
  ])

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="pl" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/ak.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <header className="studio-bar">
            <Link href="/" className="wordmark">
              AK <em>Visual</em>
            </Link>
            <nav aria-label="Nawigacja">
              <Link href="/#projects">Projekty</Link>
              <a href="#kontakt">Kontakt</a>
              {header.navItems?.map(({ link, id }) => (
                <CMSLink key={id} {...link} />
              ))}
            </nav>
          </header>
          {children}
          <footer id="kontakt" className="studio-bar studio-foot flex-wrap">
            <Link href="/" className="wordmark">
              AK <em>Visual</em>
            </Link>
            <address className="grid gap-2 not-italic">
              <h2 className="folio-index">Kontakt · Sieradz</h2>
              <a className="hover:underline" href="mailto:biuro@akvisual.pl">biuro@akvisual.pl</a>
              <a className="hover:underline" href="tel:+48726453736">+48 726 453 736</a>
              <a className="hover:underline" href="https://www.instagram.com/ak.visual_pracownia_projektowa/">Instagram ↗</a>
            </address>
            <nav aria-label="Stopka">
              {footer.navItems?.map(({ link, id }) => (
                <CMSLink key={id} {...link} />
              ))}
              <span className="folio-index">Portfolio wnętrz</span>
            </nav>
          </footer>
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: { siteName: 'AK Visual', locale: 'pl_PL', type: 'website' },
  twitter: {
    card: 'summary_large_image',
  },
}
