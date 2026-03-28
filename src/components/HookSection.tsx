import { useEffect, useRef, useState } from 'react'
import { BinaryBoard } from './BinaryBoard'
import styles from './HookSection.module.css'

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function formatStat(value: number): { main: string; sup?: string } {
  if (value >= 1e9) return { main: '10', sup: '9' }
  if (value >= 1e6) return { main: `${Math.round(value / 1e6)}M` }
  if (value >= 1e3) return { main: `${Math.round(value / 1e3)}K` }
  return { main: `${Math.round(value)}` }
}

export function HookSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const [statValue, setStatValue] = useState(0)
  const [quoteVisible, setQuoteVisible] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        obs.disconnect()
        setVisible(true)

        const start = performance.now()
        const duration = 1200
        const target = 1e9

        function tick(now: number) {
          const elapsed = now - start
          const progress = Math.min(elapsed / duration, 1)
          setStatValue(easeOut(progress) * target)
          if (progress < 1) {
            rafRef.current = requestAnimationFrame(tick)
          } else {
            setStatValue(target)
            setTimeout(() => setQuoteVisible(true), 200)
          }
        }

        rafRef.current = requestAnimationFrame(tick)
      },
      { threshold: 0.3 }
    )

    obs.observe(el)
    return () => {
      obs.disconnect()
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const { main, sup } = formatStat(statValue)

  return (
    <div className={styles.wrapper}>
      <hr className={styles.rule} />

      <div
        ref={sectionRef}
        className={`${styles.inner} ${visible ? styles.visible : ''}`}
      >
        {/* Part 1 — BinaryBoard */}
        <div className={styles.boardWrap}>
          <BinaryBoard />
          <p className={styles.boardLabel}>↓ This is what's happening</p>
        </div>

        {/* Part 2 — Stat + Quote */}
        <div className={styles.statRow}>
          <div className={styles.statBlock}>
            <div className={styles.statNumber}>
              {main}
              {sup && <sup className={styles.statSup}>{sup}</sup>}
            </div>
            <div className={styles.statSub}>ops / sec</div>
          </div>

          <div className={styles.vertDivider} />

          <div className={`${styles.quoteBlock} ${quoteVisible ? styles.quoteVisible : ''}`}>
            <p className={styles.quotePrimary}>
              One tap. One billion operations. A chip the size of your fingernail makes it happen.
            </p>
            <p className={styles.quoteSecondary}>
              QUASAR is where the people who design that chip do their work.
            </p>
          </div>
        </div>
      </div>

      <hr className={styles.rule} />
    </div>
  )
}
