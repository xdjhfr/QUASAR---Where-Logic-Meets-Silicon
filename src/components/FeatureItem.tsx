import { useEffect, useRef, useState } from 'react'
import styles from './FeatureItem.module.css'

interface FeatureItemProps {
  icon: string
  title: string
  description: string
  index?: number
  stat?: { value: number; suffix: string }
}

function useCountUp(target: number, duration: number, active: boolean): number {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    const start = performance.now()
    let raf: number
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
      setCount(Math.round(eased * target))
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration])
  return count
}

export function FeatureItem({ icon, title, description, index = 0, stat }: FeatureItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const count = useCountUp(stat?.value ?? 0, 1200, active)

  useEffect(() => {
    const el = itemRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          obs.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Odd index → slideInLeft, even → slideInRight
  const slideClass = index % 2 === 0 ? styles.slideLeft : styles.slideRight

  return (
    <div
      ref={itemRef}
      className={`${styles.item} ${slideClass} ${active ? styles.visible : ''}`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className={styles.iconWrap}>{icon}</div>
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <h4 className={styles.title}>{title}</h4>
          {stat && (
            <span className={styles.stat}>
              {count}{stat.suffix}
            </span>
          )}
        </div>
        <p className={styles.desc}>{description}</p>
      </div>
    </div>
  )
}
