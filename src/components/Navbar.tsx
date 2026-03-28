import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { OrbitalLogo } from './OrbitalLogo'
import { useTheme } from '../hooks/useTheme'
import styles from '../styles/Navbar.module.css'

const NAV_LINKS = [
  { label: 'Home',     to: '/',         scrollId: 'section-home' },
  { label: 'Download', to: '/download', scrollId: null },
  { label: 'Docs',     to: '/docs',     scrollId: null },
  { label: 'About',    to: '/about',    scrollId: null },
]

// Maps section IDs → which nav route becomes active
const SECTION_TO_ROUTE: Record<string, string> = {
  'section-home':         '/',
  'section-what':         '/',
  'section-eda':          '/',
  'section-tools':        '/',
  'section-download-cta': '/download',
}

export function Navbar() {
  const { theme, toggle } = useTheme()
  const [open, setOpen]         = useState(false)
  const [activeRoute, setActiveRoute] = useState('/')
  const [progress, setProgress] = useState(0)
  const [showTop, setShowTop]   = useState(false)
  const [hovTop, setHovTop]     = useState(false)

  const location = useLocation()
  const navigate = useNavigate()
  const isHome   = location.pathname === '/'

  /* ── IntersectionObserver + scroll progress (Home only) ── */
  useEffect(() => {
    if (!isHome) {
      setActiveRoute(location.pathname)
      setProgress(0)
      return
    }

    setActiveRoute('/')

    const ids = Object.keys(SECTION_TO_ROUTE)
    const els = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]

    const obs = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActiveRoute(SECTION_TO_ROUTE[e.target.id] ?? '/')
          }
        }
      },
      { threshold: 0.4 }
    )
    els.forEach(el => obs.observe(el))

    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      obs.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [isHome, location.pathname])

  /* ── Back-to-top visibility (all pages) ── */
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Nav click handler ── */
  const handleNav = (to: string, scrollId: string | null) => {
    setOpen(false)
    if (isHome && scrollId) {
      document.getElementById(scrollId)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate(to)
    }
  }

  /* ── Active link detection ── */
  const isActive = (to: string) => {
    if (isHome) return activeRoute === to
    if (to === '/') return location.pathname === '/'
    return location.pathname === to || location.pathname.startsWith(to + '/')
  }

  const handleGitHub = () => {
    window.open('https://github.com/xdjhfr/QUASAR---Where-Logic-Meets-Silicon', '_blank')
  }

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.inner}>
          {/* Brand */}
          <button className={styles.brand} onClick={() => handleNav('/', 'section-home')}>
            <OrbitalLogo size={36} />
            <span className={styles.brandName}>QUASAR</span>
          </button>

          {/* Nav links */}
          <div className={`${styles.links} ${open ? styles.open : ''}`}>
            {NAV_LINKS.map(({ label, to, scrollId }) => (
              <button
                key={to}
                className={`${styles.link} ${isActive(to) ? styles.active : ''}`}
                onClick={() => handleNav(to, scrollId)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <button className={styles.githubBtn} onClick={handleGitHub}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.37.6.1.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.08-.74.08-.72.08-.72 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.79 1.29 3.47.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </button>

            <button className={styles.themeBtn} onClick={toggle} title="Toggle theme">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            <button
              className={`${styles.hamburger} ${open ? styles.hamburgerOpen : ''}`}
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* ── Scroll progress bar (Home only) ── */}
        {isHome && (
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
        )}
      </nav>

      {/* ── Back to top button (all pages) ── */}
      <button
        className={styles.backToTop}
        style={{
          opacity:    showTop ? 1 : 0,
          pointerEvents: showTop ? 'auto' : 'none',
          borderColor:   hovTop ? 'var(--text-primary)' : 'var(--border)',
          color:         hovTop ? 'var(--text-primary)' : 'var(--text-dim)',
          transform:     hovTop ? 'translateY(-2px)' : 'translateY(0)',
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onMouseEnter={() => setHovTop(true)}
        onMouseLeave={() => setHovTop(false)}
        aria-label="Back to top"
      >
        ↑
      </button>
    </>
  )
}
