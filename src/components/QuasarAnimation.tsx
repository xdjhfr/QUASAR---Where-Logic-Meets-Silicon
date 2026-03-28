import { useEffect, useRef, useState } from 'react'
import styles from './QuasarAnimation.module.css'

type AnimState = 'hidden' | 'expanding' | 'collapsing'

export function QuasarAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stateRef = useRef<AnimState>('hidden')
  const [state, setState] = useState<AnimState>('hidden')
  const collapseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const ratio = entries[0].intersectionRatio
        if (ratio >= 0.4 && stateRef.current === 'hidden') {
          stateRef.current = 'expanding'
          setState('expanding')
        } else if (ratio < 0.2 && stateRef.current === 'expanding') {
          if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current)
          stateRef.current = 'collapsing'
          setState('collapsing')
          collapseTimerRef.current = setTimeout(() => {
            stateRef.current = 'hidden'
            setState('hidden')
          }, 650)
        }
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5] }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${state !== 'hidden' ? styles[state] : ''}`}
    >
      {/* Glow halo behind core */}
      <div className={styles.coreGlow} />

      {/* Accretion disk — 3D perspective ring */}
      <div className={styles.diskScene}>
        <div className={styles.diskRotator}>
          <div className={styles.diskRing} />
        </div>
      </div>

      {/* Relativistic jets */}
      <div className={`${styles.jet} ${styles.jetTop}`}>
        <div className={styles.jetBeam} />
        <div className={styles.jetBloom} />
      </div>
      <div className={`${styles.jet} ${styles.jetBottom}`}>
        <div className={styles.jetBeam} />
        <div className={styles.jetBloom} />
      </div>

      {/* Core dot */}
      <div className={styles.core} />
    </div>
  )
}
