import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    gsap.set(bar, { scaleX: 0 })

    const trigger = ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress })
      },
    })

    return () => trigger.kill()
  }, [])

  return (
    <div
      ref={barRef}
      className="scroll-progress"
      style={{ width: '100%', transformOrigin: 'left' }}
      aria-hidden="true"
    />
  )
}
