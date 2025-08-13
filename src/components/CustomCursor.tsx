import { useEffect, useRef } from 'react'

type Props = {
  size?: number
  ringSize?: number
  ringThickness?: number
  color?: string
  lerp?: number
  hideOnCoarsePointer?: boolean
}

const isSSR = typeof window === 'undefined'

export default function CustomCursor({
  size = 8,
  ringSize = 28,
  ringThickness = 2,
  color = '#12b886',
  lerp = 0.2,
  hideOnCoarsePointer = true,
}: Props) {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  const targetX = useRef(0)
  const targetY = useRef(0)
  const x = useRef(0)
  const y = useRef(0)
  const rafId = useRef<number | null>(null)
  const visible = useRef(false)
  const active = useRef(false)

  useEffect(() => {
    if (isSSR) return

    if (hideOnCoarsePointer && window.matchMedia('(pointer: coarse)').matches) {
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const dot = dotRef.current!
    const ring = ringRef.current!
    dot.style.width = `${size}px`
    dot.style.height = `${size}px`
    ring.style.width = `${ringSize}px`
    ring.style.height = `${ringSize}px`
    ring.style.borderWidth = `${ringThickness}px`
    dot.style.background = color
    ring.style.borderColor = color

    const onMove = (e: MouseEvent) => {
      targetX.current = e.clientX
      targetY.current = e.clientY
      if (!visible.current) {
        x.current = targetX.current
        y.current = targetY.current
        visible.current = true
        dot.style.opacity = '1'
        ring.style.opacity = '1'
      }
    }

    const onEnter = () => {
      visible.current = true
      dot.style.opacity = '1'
      ring.style.opacity = '1'
    }
    const onLeave = () => {
      visible.current = false
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }
    const onDown = () => {
      active.current = true
      dot.style.transform += ' scale(0.85)'
      ring.style.transform += ' scale(0.9)'
      ring.style.opacity = '0.75'
    }
    const onUp = () => {
      active.current = false
      ring.style.opacity = '1'
    }

    const hoverSelectors = "a, button, [role='button'], input, textarea, select, [data-cursor='hover'], .cursor-hover"
    const onMouseOver = (e: MouseEvent) => {
      const t = e.target as Element | null
      if (!t) return
      const isHover = t.closest(hoverSelectors)
      if (isHover) {
        ring.style.transform += ' scale(1.3)'
        ring.style.opacity = '0.9'
      }
    }
    const onMouseOut = () => {
      if (!active.current) {
        ring.style.transform = ring.style.transform.replace(/scale\([^)]*\)/g, '')
        ring.style.opacity = '1'
      }
    }

    const tick = () => {
      x.current += (targetX.current - x.current) * lerp
      y.current += (targetY.current - y.current) * lerp

      dot.style.transform = `translate3d(${targetX.current - size / 2}px, ${
        targetY.current - size / 2
      }px, 0) ${active.current ? ' scale(0.85)' : ''}`
      ring.style.transform = `translate3d(${x.current - ringSize / 2}px, ${
        y.current - ringSize / 2
      }px, 0)`

      rafId.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseenter', onEnter, { passive: true })
    window.addEventListener('mouseleave', onLeave, { passive: true })
    window.addEventListener('mousedown', onDown, { passive: true })
    window.addEventListener('mouseup', onUp, { passive: true })
    window.addEventListener('mouseover', onMouseOver, { passive: true })
    window.addEventListener('mouseout', onMouseOut, { passive: true })

    rafId.current = requestAnimationFrame(tick)

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('mouseover', onMouseOver)
      window.removeEventListener('mouseout', onMouseOut)
    }
  }, [size, ringSize, ringThickness, color, lerp, hideOnCoarsePointer])

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: size,
          height: size,
          borderRadius: '50%',
          pointerEvents: 'none',
          transform: 'translate3d(-9999px, -9999px, 0)',
          transition: 'opacity 120ms ease',
          opacity: 0,
          zIndex: 999999,
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: ringSize,
          height: ringSize,
          borderRadius: '50%',
          border: `${ringThickness}px solid ${color}`,
          pointerEvents: 'none',
          transform: 'translate3d(-9999px, -9999px, 0)',
          transition: 'opacity 120ms ease',
          opacity: 0,
          zIndex: 999998,
        }}
      />
    </>
  )
}

