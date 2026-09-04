import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useReducedMotion } from './useReducedMotion'

/**
 * Fade-up reveal animation triggered by ScrollTrigger.
 * Attach the returned ref to any element or container.
 */
export function useRevealAnimation(
  delay = 0,
  options: { y?: number; duration?: number; stagger?: number } = {}
) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (reduced) {
      gsap.set(el, { opacity: 1, y: 0 })
      return
    }

    const { y = 40, duration = 0.9, stagger = 0.12 } = options
    const targets = el.querySelectorAll('[data-reveal]')
    const animTargets = targets.length > 0 ? Array.from(targets) : [el]

    gsap.set(animTargets, { opacity: 0, y })

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 82%',
      onEnter: () => {
        gsap.to(animTargets, {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
        })
      },
      once: true,
    })

    return () => trigger.kill()
  }, [delay, options, reduced])

  return ref
}

/**
 * Line-by-line text reveal for headings.
 * Splits text by <br> tags or newlines and animates each line.
 */
export function useLineReveal(delay = 0) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) {
      if (el) gsap.set(el, { opacity: 1 })
      return
    }

    gsap.set(el, { opacity: 1 })
    const lines = el.querySelectorAll('[data-line]')

    if (lines.length === 0) return

    gsap.set(lines, { opacity: 0, y: 30 })

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(lines, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          delay,
          ease: 'power3.out',
        })
      },
      once: true,
    })

    return () => trigger.kill()
  }, [delay, reduced])

  return ref
}
