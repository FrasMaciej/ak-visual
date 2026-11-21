'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

const links = [
  { href: '/#o-nas', label: 'O nas' },
  { href: '/wspolpraca', label: 'Współpraca' },
  { href: '/oferta', label: 'Oferta projektowa' },
  { href: '/#projects', label: 'Projekty' },
  { href: '/kontakt', label: 'Kontakt' },
]

export function StudioNavigation() {
  const menu = useRef<HTMLDetailsElement>(null)
  const summary = useRef<HTMLElement>(null)

  useEffect(() => {
    const header = menu.current?.closest<HTMLElement>('.studio-header')
    if (!header) return

    const root = document.documentElement
    const mobile = window.matchMedia('(max-width: 760px)')
    const setHeaderHeight = () =>
      root.style.setProperty('--studio-header-height', `${header.offsetHeight}px`)
    const observer = new ResizeObserver(setHeaderHeight)
    observer.observe(header)
    setHeaderHeight()

    let lastY = Math.max(0, window.scrollY)
    let frame = 0

    const update = () => {
      frame = 0
      const y = Math.max(0, window.scrollY)
      if (!mobile.matches || y <= header.offsetHeight) {
        header.removeAttribute('data-scroll-hidden')
      } else if (Math.abs(y - lastY) >= 8) {
        header.toggleAttribute('data-scroll-hidden', y > lastY)
      } else {
        return
      }
      lastY = y
    }

    function onScroll() {
      if (mobile.matches && !frame) frame = requestAnimationFrame(update)
    }

    const onBreakpointChange = () => {
      header.removeAttribute('data-scroll-hidden')
      lastY = Math.max(0, window.scrollY)
      if (!mobile.matches && menu.current) menu.current.open = false
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    mobile.addEventListener('change', onBreakpointChange)
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      mobile.removeEventListener('change', onBreakpointChange)
      cancelAnimationFrame(frame)
      root.style.removeProperty('--studio-header-height')
      header.removeAttribute('data-scroll-hidden')
    }
  }, [])

  useEffect(() => {
    function dismissOutside(event: PointerEvent) {
      const disclosure = menu.current
      if (disclosure?.open && event.target instanceof Node && !disclosure.contains(event.target)) {
        disclosure.open = false
      }
    }
    document.addEventListener('pointerdown', dismissOutside)
    return () => document.removeEventListener('pointerdown', dismissOutside)
  }, [])

  return (
    <>
      <nav className="studio-desktop-nav" aria-label="Nawigacja główna">
        {links.map(({ href, label }) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
      </nav>
      <details
        ref={menu}
        className="studio-menu"
        onKeyDown={(event) => {
          if (event.key === 'Escape' && menu.current?.open) {
            menu.current.open = false
            summary.current?.focus()
          }
        }}
      >
        <summary ref={summary}>
          Menu <span className="studio-menu-icon" aria-hidden="true" />
        </summary>
        <nav aria-label="Nawigacja mobilna">
          {links.map(({ href, label }, index) => (
            <Link
              key={href}
              href={href}
              onClick={() => {
                if (menu.current) menu.current.open = false
                if (href.startsWith('/#') && window.location.pathname === '/') {
                  requestAnimationFrame(() =>
                    document.getElementById(href.slice(2))?.focus({ preventScroll: true }),
                  )
                }
              }}
            >
              <span className="studio-menu-number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>{label}</span>
              <span className="studio-menu-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </nav>
      </details>
    </>
  )
}
