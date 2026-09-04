import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useReducedMotion } from '@/animations/useReducedMotion'

const STORY_LINES = [
  { text: 'IT WAS NEVER JUST\nABOUT THE LESSON.', size: 'large', accent: false },
  { text: 'YOU TAUGHT US\nTO ASK.', size: 'large', accent: true },
  { text: 'YOU TAUGHT US\nTO TRY.', size: 'large', accent: false },
  { text: 'YOU TAUGHT US\nTO KEEP GOING.', size: 'large', accent: true },
  { text: 'YOU TAUGHT US\nTO BELIEVE.', size: 'large', accent: false },
  { text: 'AND SOMEHOW...', size: 'medium', accent: false },
  { text: 'YOU INSPIRED US.', size: 'xl', accent: true },
]

export function StorySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current
    if (!section || !container) return

    const panels = container.querySelectorAll('[data-story-panel]')

    if (reduced) {
      panels.forEach((panel) => {
        gsap.set(panel, { opacity: 1, y: 0 })
      })
      return
    }

    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches

      if (isMobile) {
        // On mobile: simple scroll reveal (no pin — better perf)
        panels.forEach((panel) => {
          gsap.set(panel, { opacity: 0, y: 30 })
          ScrollTrigger.create({
            trigger: panel,
            start: 'top 85%',
            onEnter: () => {
              gsap.to(panel, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
            },
            once: true,
          })
        })
        return
      }

      // Desktop: pinned scroll sequence
      const totalPanels = panels.length
      gsap.set(panels, { opacity: 0, scale: 0.95 })
      gsap.set(panels[0], { opacity: 1, scale: 1 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${totalPanels * 100}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })

      panels.forEach((panel, i) => {
        if (i === totalPanels - 1) return

        tl.to(panel, {
          opacity: 0,
          scale: 0.9,
          duration: 0.3,
          ease: 'power2.in',
        })
        .fromTo(
          panels[i + 1],
          { opacity: 0, scale: 0.95, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power3.out' }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        backgroundColor: 'var(--background)',
        minHeight: reduced ? 'auto' : '100vh',
      }}
    >
      {/* Mobile: stack vertically */}
      <div
        ref={containerRef}
        className="md:absolute md:inset-0 flex flex-col md:block"
        style={{ perspective: '1000px' }}
      >
        {STORY_LINES.map((line, i) => (
          <div
            key={i}
            data-story-panel
            className="relative md:absolute md:inset-0 flex items-center justify-center px-6 py-24 md:py-0"
            style={{
              ...(i === 0 ? {} : {}),
            }}
          >
            <div className="text-center max-w-4xl">
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: line.size === 'xl'
                    ? 'clamp(3rem, 9vw, 8rem)'
                    : line.size === 'large'
                    ? 'clamp(2rem, 6vw, 5.5rem)'
                    : 'clamp(1.5rem, 4vw, 3rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: line.accent ? 'var(--accent)' : 'var(--foreground)',
                  whiteSpace: 'pre-line',
                }}
              >
                {line.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Gradient separator — visible only above panels in mobile */}
      <div
        className="md:hidden"
        style={{
          height: '4rem',
          background: `linear-gradient(to bottom, var(--background), transparent)`,
        }}
      />
    </section>
  )
}
