import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  radius: number
  baseOpacity: number
  twinkleSpeed: number
  twinklePhase: number
}

interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  progress: number
  duration: number
  startTime: number
}

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const shootingStarsRef = useRef<ShootingStar[]>([])
  const shootingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.scale(dpr, dpr)
    }
    resize()

    // ResizeObserver catches DPI/scaling changes that don't fire window resize
    const ro = new ResizeObserver(() => resize())
    ro.observe(document.documentElement)
    window.addEventListener('resize', resize)

    // Generate stars using logical pixels (innerWidth/Height)
    const stars: Star[] = Array.from({ length: 280 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: 0.5 + Math.random() * 1.3,
      baseOpacity: 0.2 + Math.random() * 0.6,
      twinkleSpeed: 2 + Math.random() * 4,
      twinklePhase: Math.random() * Math.PI * 2,
    }))

    const scheduleShootingStar = () => {
      const delay = 1500 + Math.random() * 2500
      shootingTimeoutRef.current = setTimeout(() => {
        if (shootingStarsRef.current.length < 4) {
          const innerWidth = window.innerWidth
          const innerHeight = window.innerHeight
          // Travel distance exceeds the full diagonal so the star always exits the viewport
          const diagonal = Math.sqrt(innerWidth ** 2 + innerHeight ** 2)
          const travel = diagonal * 0.85

          let startX: number, startY: number
          if (Math.random() > 0.5) {
            // Top edge: x from 20% to 100%
            startX = innerWidth * 0.2 + Math.random() * (innerWidth * 0.8)
            startY = 0
          } else {
            // Right edge: y from 0 to 40%
            startX = innerWidth
            startY = Math.random() * (innerHeight * 0.4)
          }

          shootingStarsRef.current.push({
            x: startX,
            y: startY,
            length: travel,
            speed: 1,
            progress: 0,
            duration: 600 + Math.random() * 300,
            startTime: performance.now(),
          })
        }
        scheduleShootingStar()
      }, delay)
    }
    scheduleShootingStar()

    const isLight = () => document.documentElement.getAttribute('data-theme') === 'light'

    const draw = (time: number) => {
      const innerWidth = window.innerWidth
      const innerHeight = window.innerHeight
      ctx.clearRect(0, 0, innerWidth, innerHeight)
      const light = isLight()
      const opacityScale = light ? 0.3 : 1

      // Draw stars
      for (const star of stars) {
        const flicker = Math.sin(time * 0.001 * star.twinkleSpeed + star.twinklePhase)
        const opacity = (star.baseOpacity + flicker * 0.25) * opacityScale
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, opacity)})`
        ctx.fill()
      }

      // Draw shooting stars — angle 210–225° (down-left)
      // Using 225° (cos = -1/√2, sin = +1/√2) for consistent direction
      const now = performance.now()
      shootingStarsRef.current = shootingStarsRef.current.filter(s => {
        const elapsed = now - s.startTime
        if (elapsed > s.duration) return false
        const t = elapsed / s.duration
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
        const diag = s.length / Math.SQRT2
        // Head moves down-left from start position
        const curX = s.x - eased * diag
        const curY = s.y + eased * diag
        // Tail trails behind (up-right of head)
        const tailX = curX + diag
        const tailY = curY - diag

        const grad = ctx.createLinearGradient(tailX, tailY, curX, curY)
        grad.addColorStop(0, `rgba(255,255,255,0)`)
        grad.addColorStop(1, `rgba(255,255,255,${(1 - t) * 0.8 * opacityScale})`)
        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(curX, curY)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.stroke()
        return true
      })

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      ro.disconnect()
      if (shootingTimeoutRef.current) clearTimeout(shootingTimeoutRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
