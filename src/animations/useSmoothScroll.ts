import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'

let lenisInstance: Lenis | null = null

/**
 * Initialize Lenis smooth scroll on the root.
 * Synchronized directly with GSAP ScrollTrigger.
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

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update)

    const tickerCb = (time: number) => {
      lenisInstance?.raf(time * 1000)
    }
    gsap.ticker.add(tickerCb)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tickerCb)
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
