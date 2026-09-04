import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })

  useEffect(() => {
    // Only on desktop (pointer: fine)
    const mq = window.matchMedia('(pointer: fine)')
    if (!mq.matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      gsap.to(dot, {
        x: pos.current.x - 5,
        y: pos.current.y - 5,
        duration: 0.08,
        ease: 'none',
      })
    }

    // Ring follows with lag
    let rafId: number
    const followRing = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12
      gsap.set(ring, {
        x: ringPos.current.x - 18,
        y: ringPos.current.y - 18,
      })
      rafId = requestAnimationFrame(followRing)
    }
    rafId = requestAnimationFrame(followRing)

    // Grow ring on interactive elements
    const onEnter = () => {
      gsap.to(ring, { scale: 2, opacity: 0.3, duration: 0.3 })
      gsap.to(dot, { scale: 0.5, duration: 0.3 })
    }
    const onLeave = () => {
      gsap.to(ring, { scale: 1, opacity: 0.5, duration: 0.3 })
      gsap.to(dot, { scale: 1, duration: 0.3 })
    }

    const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    document.addEventListener('mousemove', onMove)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="custom-cursor" aria-hidden="true" />
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
    </>
  )
}
