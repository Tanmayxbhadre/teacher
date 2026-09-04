import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

let lenisInstance: Lenis | null = null

/**
 * Initialize Lenis smooth scroll on the root.
 * Call this once at app root level.
 */
export function useSmoothScroll() {
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time: number) {
      lenisInstance?.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }

    rafRef.current = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafRef.current)
      lenisInstance?.destroy()
      lenisInstance = null
    }
  }, [])

  return lenisInstance
}

/**
 * Get the global Lenis instance (for use outside of hook context).
 */
export function getLenis(): Lenis | null {
  return lenisInstance
}

/**
 * Stop smooth scrolling (e.g., when a modal is open).
 */
export function stopScroll() {
  lenisInstance?.stop()
}

/**
 * Resume smooth scrolling.
 */
export function startScroll() {
  lenisInstance?.start()
}
