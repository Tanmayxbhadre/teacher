import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useReducedMotion } from '@/animations/useReducedMotion'

const VALUES = [
  'KNOWLEDGE',
  'CONFIDENCE',
  'DISCIPLINE',
  'CURIOSITY',
  'COURAGE',
  'DREAMS',
]

export function ValuesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    if (!section || reduced) {
      section?.querySelectorAll('[data-value]').forEach((el) => {
        ;(el as HTMLElement).style.opacity = '1'
      })
      return
    }

    const items = section.querySelectorAll('[data-value]')
    const thankYou = section.querySelector('[data-thankyou]')

    const ctx = gsap.context(() => {
      items.forEach((item) => gsap.set(item, { opacity: 0, y: 50, scale: 0.9 }))
      if (thankYou) gsap.set(thankYou, { opacity: 0, y: 30 })

      ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        onEnter: () => {
          const tl = gsap.timeline()
          items.forEach((item, i) => {
            tl.to(item, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: 'power3.out',
            }, i * 0.18)

            // Fade out before next (except last)
            if (i < items.length - 1) {
              tl.to(item, {
                opacity: 0.08,
                scale: 0.85,
                duration: 0.5,
                ease: 'power2.in',
              }, i * 0.18 + 0.5)
            }
          })

          if (thankYou) {
            tl.to(thankYou, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
            }, items.length * 0.18 + 0.2)
          }
        },
        once: true,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        backgroundColor: 'var(--foreground)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      {/* Section eyebrow */}
      <p
        className="text-eyebrow mb-16"
        style={{
          color: 'var(--accent-secondary)',
          letterSpacing: '0.3em',
          opacity: 0.7,
        }}
      >
        YOU GAVE US MORE THAN KNOWLEDGE
      </p>

      {/* Values stack */}
      <div
        className="relative flex flex-col items-center gap-2 md:gap-0"
        style={{ minHeight: 'clamp(200px, 40vw, 400px)' }}
      >
        {VALUES.map((word, i) => (
          <p
            key={word}
            data-value
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.5rem, 8vw, 6.5rem)',
              fontWeight: 300,
              letterSpacing: '-0.01em',
              color: i % 2 === 0 ? '#F7F3EC' : 'var(--accent-secondary)',
              lineHeight: 1,
              opacity: 0,
              textAlign: 'center',
            }}
          >
            {word}
          </p>
        ))}
      </div>

      {/* Thank you */}
      <div
        data-thankyou
        className="mt-16 text-center"
        style={{ opacity: 0 }}
      >
        <p
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 600,
            color: '#F7F3EC',
            opacity: 0.9,
          }}
        >
          Thank you.
        </p>
      </div>

      {/* Decorative lines */}
      <div
        className="absolute left-0 top-1/2"
        style={{
          width: '80px',
          height: '1px',
          background: 'var(--accent-secondary)',
          opacity: 0.2,
        }}
      />
      <div
        className="absolute right-0 top-1/2"
        style={{
          width: '80px',
          height: '1px',
          background: 'var(--accent-secondary)',
          opacity: 0.2,
        }}
      />
    </section>
  )
}
