import styles from './OrbitalLogo.module.css'

interface OrbitalLogoProps {
  size?: number
}

export function OrbitalLogo({ size = 28 }: OrbitalLogoProps) {
  return (
    <div className={styles.orbital} style={{ width: size, height: size }}>
      <svg viewBox="0 0 60 60" className={styles.ring}>
        <ellipse
          cx="30" cy="30" rx="26" ry="10"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1.5"
          className={styles.ellipse}
        />
        <circle className={styles.dot} r="3" fill="white" />
      </svg>
      <span className={styles.letter}>Q</span>
    </div>
  )
}
