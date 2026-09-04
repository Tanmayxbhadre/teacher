import { useState, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { Mail } from 'lucide-react'
import { useRevealAnimation } from '@/animations/useRevealAnimation'

interface EnvelopeRevealProps {
  messages: string[]
}

function Envelope({ message, index }: { message: string; index?: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const flapRef = useRef<HTMLDivElement>(null)
  const paperRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  const handleOpen = () => {
    if (isOpen) return
    setIsOpen(true)

    const tl = gsap.timeline()

    // Flap opens
    tl.to(flapRef.current, {
      rotateX: 180,
      duration: 0.5,
      ease: 'power2.inOut',
      transformOrigin: 'top center',
      transformPerspective: 600,
    })

    // Paper slides up
    .to(paperRef.current, {
      y: '-60%',
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.2')

    // Text fades in
    .to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
      onStart: () => setRevealed(true),
    }, '-=0.1')
  }

  return (
    <div
      className="flex flex-col items-center cursor-pointer select-none"
      onClick={handleOpen}
      role="button"
      tabIndex={0}
      aria-label={
        isOpen
          ? `Message ${index !== undefined ? index + 1 : ''} revealed`
          : `Open envelope ${index !== undefined ? index + 1 : ''} to reveal message`
      }
      onKeyDown={(e) => e.key === 'Enter' && handleOpen()}
    >
      {/* Envelope wrapper */}
      <div
        className="relative"
        style={{
          width: 'clamp(160px, 28vw, 220px)',
          height: 'clamp(110px, 18vw, 150px)',
        }}
      >
        {/* Envelope body */}
        <div
          className="absolute inset-0 envelope-body"
          style={{
            background: 'var(--background)',
            border: `1px solid var(--border)`,
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          {/* Paper inside */}
          <div
            ref={paperRef}
            className="absolute inset-x-2 bottom-0"
            style={{
              height: '120%',
              background: 'var(--surface)',
              border: '1px solid var(--muted)',
              borderRadius: '2px 2px 0 0',
              display: 'flex',
              alignItems: 'flex-start',
              padding: '0.75rem',
              transform: 'translateY(0)',
            }}
          >
            <p
              ref={textRef}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontSize: '0.75rem',
                lineHeight: 1.5,
                color: 'var(--foreground)',
                opacity: 0,
                transform: 'translateY(8px)',
                userSelect: 'text',
              }}
            >
              {message}
            </p>
          </div>

          {/* Envelope V-fold lines */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{ height: '50%' }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                background: `linear-gradient(135deg, var(--surface) 50%, transparent 50%)`,
              }}
            />
          </div>
        </div>

        {/* Flap */}
        <div
          ref={flapRef}
          className="absolute top-0 left-0 right-0"
          style={{
            height: '50%',
            background: 'var(--muted)',
            borderRadius: '2px 2px 0 0',
            transformOrigin: 'top center',
            transformStyle: 'preserve-3d',
            zIndex: 2,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(to bottom, var(--muted), var(--surface))`,
              borderRadius: '2px 2px 0 0',
            }}
          />
        </div>

        {/* Seal */}
        {!isOpen && (
          <div
            className="absolute top-1/2 left-1/2 z-10 flex items-center justify-center"
            style={{
              transform: 'translate(-50%, -50%)',
              width: '32px',
              height: '32px',
              background: 'var(--accent)',
              borderRadius: '50%',
            }}
          >
            <Mail size={12} color="var(--background)" />
          </div>
        )}
      </div>

      {/* Label */}
      <p
        className="text-eyebrow mt-3"
        style={{
          color: isOpen ? 'var(--accent)' : 'var(--muted-foreground)',
          letterSpacing: '0.15em',
          fontSize: '0.6rem',
          transition: 'color 0.3s ease',
        }}
      >
        {isOpen ? 'OPENED' : `TAP TO OPEN`}
      </p>

      {/* Revealed message on mobile (below envelope) */}
      {revealed && (
        <div
          className="mt-4 max-w-xs text-center"
          style={{
            padding: '1rem 1.25rem',
            background: 'var(--surface)',
            border: '1px solid var(--muted)',
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: '0.9rem',
              lineHeight: 1.6,
              color: 'var(--foreground)',
            }}
          >
            "{message}"
          </p>
        </div>
      )}
    </div>
  )
}

export function EnvelopeReveal({ messages }: EnvelopeRevealProps) {
  const sectionRef = useRevealAnimation(0)

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      style={{
        backgroundColor: 'var(--surface)',
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      <div className="container-wide text-center">
        {/* Heading */}
        <div data-reveal className="mb-16">
          <p
            className="text-eyebrow mb-4"
            style={{ color: 'var(--accent)', letterSpacing: '0.3em' }}
          >
            WE LEFT A FEW WORDS FOR YOU
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
              fontWeight: 300,
              color: 'var(--foreground)',
            }}
          >
            A few little surprises
          </h2>
          <p
            className="mt-4 text-body"
            style={{ color: 'var(--muted-foreground)', maxWidth: '400px', margin: '1rem auto 0' }}
          >
            Tap each envelope to reveal what your students really wanted to say.
          </p>
        </div>

        {/* Envelopes grid */}
        <div
          data-reveal
          className="flex flex-wrap justify-center gap-8 md:gap-12"
        >
          {messages.map((msg, i) => (
            <Envelope key={i} message={msg} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
