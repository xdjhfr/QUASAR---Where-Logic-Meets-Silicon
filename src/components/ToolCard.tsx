import { useEffect, useRef } from 'react'
import styles from './ToolCard.module.css'

interface ToolCardProps {
  icon: string
  name: string
  badge: string
  description: string
  index?: number
}

export function ToolCard({ icon, name, badge, description, index = 0 }: ToolCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Scroll-triggered stagger reveal
  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animationDelay = `${index * 150}ms`
          el.classList.add(styles.visible)
          obs.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  // Cursor-following inner glow
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.removeProperty('--mouse-x')
    e.currentTarget.style.removeProperty('--mouse-y')
  }

  return (
    <div
      ref={cardRef}
      className={styles.card}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cursor-following radial glow */}
      <div className={styles.cursorGlow} />
      {/* Animated gradient border sweep */}
      <div className={styles.borderSweep} />
      <div className={styles.topBorder} />
      <div className={styles.icon}>{icon}</div>
      <div className={styles.header}>
        <h3 className={styles.name}>{name}</h3>
        <span className={styles.badge}>{badge}</span>
      </div>
      <p className={styles.desc}>{description}</p>
    </div>
  )
}
