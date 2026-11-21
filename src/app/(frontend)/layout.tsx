import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import Link from 'next/link'
import { contactEmail } from '@/constants/contact'
import Image from 'next/image'
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
            <Link href="/" className="wordmark studio-brand">
              <Image src="/ak-visual-mark.webp" alt="" width={35} height={32} unoptimized />
              <span>
                AK <em>Visual</em>
              </span>
            </Link>
            <nav aria-label="Nawigacja">
              <Link href="/#projects">Projekty</Link>
              <Link href="/kontakt">Kontakt</Link>
              {header.navItems?.map(({ link, id }) => (
                <CMSLink key={id} {...link} />
              ))}
            </nav>
          </header>
          {children}
          <footer id="kontakt" className="studio-bar studio-foot" aria-label="Kontakt">
            <p className="contact-kicker">
              AK Visual <span aria-hidden="true">/</span> Sieradz · Wrocław
            </p>
            <h2 className="contact-invitation">
              Porozmawiajmy <em>o wnętrzu.</em>
            </h2>
            <p className="contact-coverage">Projektujemy na terenie całej Polski</p>
            <address className="studio-contact">
              <a className="contact-email" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
              <a className="hover:underline" href="tel:+48726453736">
                +48 726 453 736
              </a>
            </address>
            <div className="contact-socials">
              <a
                className="inline-flex size-11 items-center justify-center rounded-full border hover:bg-black/5"
                href="https://www.instagram.com/ak.visual_pracownia_projektowa/"
                aria-label="AK Visual na Instagramie"
                title="Instagram"
              >
                <svg
                  aria-hidden="true"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                className="inline-flex size-11 items-center justify-center rounded-full border hover:bg-black/5"
                href="https://www.facebook.com/AKVISUALpracowniaprojektowa"
                aria-label="AK Visual na Facebooku"
                title="Facebook"
              >
                <svg
                  aria-hidden="true"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14 22v-9h3l.5-3H14V7.9c0-.9.3-1.5 1.6-1.5h2V3.6c-.4-.1-1.6-.2-2.8-.2-2.8 0-4.6 1.7-4.6 4.7V10H7v3h3.2v9z" />
                </svg>
              </a>
            </div>
            {Boolean(footer.navItems?.length) && (
              <nav aria-label="Stopka">
                {footer.navItems?.map(({ link, id }) => (
                  <CMSLink key={id} {...link} />
                ))}
              </nav>
            )}
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
