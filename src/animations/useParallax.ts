import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useReducedMotion } from './useReducedMotion'

/**
 * Subtle parallax effect on scroll for an element.
 * @param speed - How much to move relative to scroll (0.1 = subtle, 0.4 = strong)
 * @param direction - 'up' moves opposite to scroll, 'down' moves with it
 */
export function useParallax(
  speed = 0.15,
  direction: 'up' | 'down' = 'up'
) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return

    const factor = direction === 'up' ? -speed : speed

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        gsap.set(el, {
          y: self.progress * 100 * factor * 2,
        })
      },
    })

    return () => {
      trigger.kill()
      gsap.set(el, { y: 0 })
    }
  }, [speed, direction, reduced])

  return ref
}

/**
 * Image parallax — moves the image inside its container for depth effect.
 */
export function useImageParallax(speed = 0.12) {
  const ref = useRef<HTMLImageElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return

    const parent = el.parentElement
    if (!parent) return

    const trigger = ScrollTrigger.create({
      trigger: parent,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const offset = (self.progress - 0.5) * 100 * speed * 2
        gsap.set(el, { y: offset, scale: 1.08 })
      },
    })

    gsap.set(el, { scale: 1.08 })

    return () => {
      trigger.kill()
      gsap.set(el, { y: 0, scale: 1 })
    }
  }, [speed, reduced])

  return ref
}
