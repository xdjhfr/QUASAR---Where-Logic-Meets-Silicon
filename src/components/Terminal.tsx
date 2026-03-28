import { useState, useEffect, useRef } from 'react'
import styles from './Terminal.module.css'

export type TerminalLine =
  | { type: 'command'; text: string }
  | { type: 'output'; text: string }
  | { type: 'comment'; text: string }
  | { type: 'success'; text: string }

interface TerminalProps {
  os: 'linux' | 'mac' | 'windows'
  lines: TerminalLine[]
  title?: string
}

export function Terminal({ os, lines, title }: TerminalProps) {
  const [visibleCount, setVisibleCount] = useState(0)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    setVisibleCount(0)
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []

    lines.forEach((_, i) => {
      const t = setTimeout(() => setVisibleCount(i + 1), i * 60)
      timersRef.current.push(t)
    })

    return () => { timersRef.current.forEach(clearTimeout) }
  }, [lines, os])

  const filename = { linux: 'terminal.sh', mac: 'terminal.zsh', windows: 'PowerShell' }[os]

  return (
    <div className={styles.terminal}>
      <div className={styles.titleBar}>
        <span className={styles.dot} style={{ background: '#ff5f57' }} />
        <span className={styles.dot} style={{ background: '#ffbd2e' }} />
        <span className={styles.dot} style={{ background: '#28c840' }} />
        <span className={styles.filename}>{title || filename}</span>
      </div>
      <div className={styles.body}>
        {lines.slice(0, visibleCount).map((line, i) => (
          <div key={i} className={`${styles.line} ${styles[line.type]}`}
            style={{ animationDelay: `${i * 60}ms` }}>
            {line.type === 'command' && <span className={styles.prompt}>
              {os === 'windows' ? 'PS> ' : '$ '}
            </span>}
            <span>{line.text}</span>
          </div>
        ))}
        {visibleCount < lines.length && (
          <div className={styles.cursor} />
        )}
      </div>
    </div>
  )
}
