import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useReducedMotion } from '@/animations/useReducedMotion'
import type { StudentMessage } from '@/types/teacher'

interface StudentMessagesProps {
  messages: StudentMessage[]
}

export function StudentMessages({ messages }: StudentMessagesProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    if (!section || reduced) {
      section?.querySelectorAll('[data-message]').forEach((el) => {
        gsap.set(el, { opacity: 1, y: 0 })
      })
      return
    }

    const ctx = gsap.context(() => {
      const items = section.querySelectorAll('[data-message]')
      items.forEach((item) => {
        gsap.set(item, { opacity: 0, y: 30 })
        ScrollTrigger.create({
          trigger: item,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(item, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
            })
          },
          once: true,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--background)',
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      <div className="container-narrow">
        {/* Heading */}
        <div className="text-center mb-16">
          <p
            className="text-eyebrow mb-4"
            style={{ color: 'var(--accent)', letterSpacing: '0.3em' }}
          >
            WORDS FROM YOUR STUDENTS
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 300,
              color: 'var(--foreground)',
            }}
          >
            What they remember
          </h2>
        </div>

        {/* Messages */}
        <div className="flex flex-col gap-16">
          {messages.map((msg, i) => (
            <div
              key={i}
              data-message
              className="relative"
              style={{
                paddingLeft: 'clamp(1.5rem, 4vw, 3rem)',
                borderLeft: `2px solid ${i % 2 === 0 ? 'var(--accent)' : 'var(--accent-secondary)'}`,
              }}
            >
              {/* Quote mark */}
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(3rem, 6vw, 5rem)',
                  fontWeight: 300,
                  color: i % 2 === 0 ? 'var(--accent)' : 'var(--accent-secondary)',
                  opacity: 0.15,
                  lineHeight: 0,
                  position: 'absolute',
                  top: '-0.5rem',
                  left: '-0.8rem',
                }}
                aria-hidden="true"
              >
                "
              </span>

              <blockquote>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(1.15rem, 2.8vw, 1.6rem)',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    lineHeight: 1.65,
                    color: 'var(--foreground)',
                    marginBottom: '1rem',
                  }}
                >
                  "{msg.message}"
                </p>
                <footer>
                  <p
                    style={{
                      fontFamily: "'Dancing Script', cursive",
                      fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                      fontWeight: 600,
                      color: i % 2 === 0 ? 'var(--accent)' : 'var(--accent-secondary)',
                    }}
                  >
                    — {msg.author}
                  </p>
                </footer>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
