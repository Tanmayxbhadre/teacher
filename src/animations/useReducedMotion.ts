import { useEffect } from 'react'

/**
 * Returns true if the user prefers reduced motion.
 * Used to conditionally skip or simplify animations.
 */
export function useReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Hook version that listens for changes at runtime.
 */
export function useReducedMotionLive(callback: (reduced: boolean) => void): void {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => callback(e.matches)
    callback(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [callback])
}
