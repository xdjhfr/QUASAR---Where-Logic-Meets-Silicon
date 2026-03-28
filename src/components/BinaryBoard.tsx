import { useEffect, useRef, useState } from 'react'
import { generateAddition, type BinaryAddition } from '../utils/binary'
import styles from './BinaryBoard.module.css'

export function BinaryBoard() {
  const [data, setData] = useState<BinaryAddition>(() => generateAddition())
  const [aVisible, setAVisible] = useState<boolean[]>(new Array(8).fill(false))
  const [bVisible, setBVisible] = useState<boolean[]>(new Array(8).fill(false))
  const [resultVisible, setResultVisible] = useState<boolean[]>(new Array(8).fill(false))
  const [carryVisible, setCarryVisible] = useState<boolean[]>(new Array(8).fill(false))
  const [lineVisible, setLineVisible] = useState(false)
  const [decimalVisible, setDecimalVisible] = useState(false)
  const [fadingOut, setFadingOut] = useState(false)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const addTimer = (fn: () => void, delay: number) => {
    const t = setTimeout(fn, delay)
    timersRef.current.push(t)
    return t
  }

  const runAnimation = (d: BinaryAddition) => {
    let t = 0

    // Type A bits
    for (let i = 0; i < 8; i++) {
      const idx = i
      addTimer(() => setAVisible(prev => { const n = [...prev]; n[idx] = true; return n }), t)
      t += 80
    }
    t += 300

    // Type B bits
    for (let i = 0; i < 8; i++) {
      const idx = i
      addTimer(() => setBVisible(prev => { const n = [...prev]; n[idx] = true; return n }), t)
      t += 80
    }
    t += 400

    // Draw line
    addTimer(() => setLineVisible(true), t)
    t += 250

    // Carry bits (right to left)
    for (let i = 7; i >= 0; i--) {
      if (d.carryBits[i]) {
        const idx = i
        addTimer(() => setCarryVisible(prev => { const n = [...prev]; n[idx] = true; return n }), t)
        t += 80
      }
    }
    t += 100

    // Result bits (right to left)
    for (let i = 7; i >= 0; i--) {
      const idx = i
      addTimer(() => setResultVisible(prev => { const n = [...prev]; n[idx] = true; return n }), t)
      t += 100
    }
    t += 300

    // Show decimal
    addTimer(() => setDecimalVisible(true), t)
    t += 2000

    // Fade out
    addTimer(() => setFadingOut(true), t)
    t += 500

    // Reset
    addTimer(() => {
      setAVisible(new Array(8).fill(false))
      setBVisible(new Array(8).fill(false))
      setResultVisible(new Array(8).fill(false))
      setCarryVisible(new Array(8).fill(false))
      setLineVisible(false)
      setDecimalVisible(false)
      setFadingOut(false)
      const next = generateAddition()
      setData(next)
      addTimer(() => runAnimation(next), 200)
    }, t)
  }

  useEffect(() => {
    const t = setTimeout(() => runAnimation(data), 300)
    timersRef.current.push(t)
    return () => { timersRef.current.forEach(clearTimeout); timersRef.current = [] }
  }, [])

  return (
    <div className={`${styles.board} ${fadingOut ? styles.fadeOut : ''}`}>
      <div className={styles.titleBar}>
        <span className={styles.dot} style={{ background: '#ff5f57' }} />
        <span className={styles.dot} style={{ background: '#ffbd2e' }} />
        <span className={styles.dot} style={{ background: '#28c840' }} />
        <span className={styles.title}>// RISC-V ALU OPERATION</span>
      </div>

      <div className={styles.body}>
        <div className={styles.row}>
          <span className={styles.operator}>&nbsp;</span>
          {data.aBits.map((bit, i) => (
            <span key={i} className={`${styles.bit} ${aVisible[i] ? styles.visible : ''} ${carryVisible[i] ? styles.carry : ''}`}>
              {aVisible[i] ? bit : '\u00A0'}
              {carryVisible[i] && <sup className={styles.carryMark}>^</sup>}
            </span>
          ))}
        </div>

        <div className={styles.row}>
          <span className={styles.operator}>+</span>
          {data.bBits.map((bit, i) => (
            <span key={i} className={`${styles.bit} ${bVisible[i] ? styles.visible : ''}`}>
              {bVisible[i] ? bit : '\u00A0'}
            </span>
          ))}
        </div>

        <div className={`${styles.divider} ${lineVisible ? styles.lineVisible : ''}`} />

        <div className={styles.row}>
          <span className={styles.operator}>&nbsp;</span>
          {data.resultBits.map((bit, i) => (
            <span key={i} className={`${styles.bit} ${styles.resultBit} ${resultVisible[i] ? styles.visible : ''}`}>
              {resultVisible[i] ? bit : '\u00A0'}
            </span>
          ))}
        </div>

        <div className={`${styles.decimal} ${decimalVisible ? styles.decimalVisible : ''}`}>
          <span className={styles.decimalText}>
            [DEC: {data.a} + {data.b} = {data.result}]
          </span>
        </div>
      </div>
    </div>
  )
}
