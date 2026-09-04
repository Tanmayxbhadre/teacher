import { useRevealAnimation } from '@/animations/useRevealAnimation'
import type { Teacher } from '@/types/teacher'

interface PersonalMessageProps {
  teacher: Teacher
}

export function PersonalMessage({ teacher }: PersonalMessageProps) {
  const sectionRef = useRevealAnimation(0)

  // Split message into paragraphs
  const paragraphs = teacher.personalizedMessage
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative"
      style={{
        backgroundColor: 'var(--background)',
        padding: 'clamp(5rem, 10vw, 10rem) clamp(1.5rem, 6vw, 5rem)',
      }}
    >
      {/* Background accent line */}
      <div
        className="absolute left-0 top-0 bottom-0"
        style={{
          width: '2px',
          background: `linear-gradient(to bottom, transparent, var(--accent), transparent)`,
          opacity: 0.3,
          left: 'clamp(1rem, 4vw, 3rem)',
        }}
      />

      <div className="container-narrow relative">
        {/* Section eyebrow */}
        <p
          data-reveal
          className="text-eyebrow mb-8"
          style={{ color: 'var(--accent)', letterSpacing: '0.3em' }}
        >
          A MESSAGE FOR YOU
        </p>

        {/* Large decorative quote mark */}
        <div
          data-reveal
          className="quote-mark"
          style={{ marginBottom: '-2rem', marginLeft: '-0.5rem' }}
        >
          "
        </div>

        {/* Message paragraphs */}
        <div className="space-y-6" data-reveal>
          {paragraphs.map((para, i) => (
            <p
              key={i}
              style={{
                fontFamily: i === 0 ? "'Cormorant Garamond', serif" : "'Inter', sans-serif",
                fontSize: i === 0
                  ? 'clamp(1.1rem, 2.5vw, 1.4rem)'
                  : 'clamp(0.95rem, 2vw, 1.1rem)',
                fontWeight: i === 0 ? 300 : 400,
                fontStyle: i === 0 ? 'italic' : 'normal',
                lineHeight: 1.85,
                color: i === 0 ? 'var(--foreground)' : 'var(--muted-foreground)',
                whiteSpace: 'pre-line',
              }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Closing message */}
        {teacher.closingMessage && (
          <div
            data-reveal
            className="mt-12 pt-8"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <p
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                fontWeight: 600,
                color: 'var(--accent-secondary)',
                fontStyle: 'italic',
              }}
            >
              {teacher.closingMessage}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
