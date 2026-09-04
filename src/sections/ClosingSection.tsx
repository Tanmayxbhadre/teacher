import { useRevealAnimation } from '@/animations/useRevealAnimation'
import type { Teacher } from '@/types/teacher'
import { Share2, Check } from 'lucide-react'
import { useState } from 'react'

interface ClosingSectionProps {
  teacher: Teacher
}

export function ClosingSection({ teacher }: ClosingSectionProps) {
  const sectionRef = useRevealAnimation(0)
  const [copied, setCopied] = useState(false)

  const shareUrl = window.location.href

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Happy Teachers' Day, ${teacher.name}!`,
          text: 'A special message made with gratitude.',
          url: shareUrl,
        })
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      style={{
        backgroundColor: 'var(--background)',
        padding: 'clamp(5rem, 10vw, 10rem) clamp(1.5rem, 5vw, 4rem)',
        borderTop: '1px solid var(--muted)',
      }}
    >
      <div className="container-narrow text-center">
        {/* Signature */}
        <div data-reveal>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
              color: 'var(--muted-foreground)',
              marginBottom: '0.5rem',
            }}
          >
            With gratitude,
          </p>
          <p
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              color: 'var(--accent)',
              marginBottom: '1rem',
            }}
          >
            Your Students
          </p>
        </div>

        {/* Class info */}
        {teacher.classInfo && (
          <div
            data-reveal
            className="mt-6"
            style={{
              padding: '1.5rem 2rem',
              border: '1px solid var(--muted)',
              display: 'inline-block',
            }}
          >
            <p
              className="text-eyebrow mb-1"
              style={{ color: 'var(--accent-secondary)', letterSpacing: '0.2em' }}
            >
              <a
                href="https://www.createwithtanmay.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline inline-flex items-center gap-1 font-semibold"
                style={{ color: 'var(--accent)' }}
              >
                {teacher.classInfo.class === 'Final Year Batch' ? 'MADE WITH ❤️ TANMAY' : teacher.classInfo.class}
              </a>
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.05rem',
                color: 'var(--foreground)',
                marginBottom: '0.25rem',
              }}
            >
              {teacher.classInfo.department}
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                color: 'var(--muted-foreground)',
              }}
            >
              MGM College of Computer Science & Information Technology
            </p>
          </div>
        )}

        {/* Divider */}
        <div
          data-reveal
          className="my-12 mx-auto"
          style={{
            width: '80px',
            height: '1px',
            background: 'var(--muted)',
          }}
        />

        {/* Share */}
        <div data-reveal>
          <p
            className="text-eyebrow mb-4"
            style={{ color: 'var(--muted-foreground)', letterSpacing: '0.2em' }}
          >
            SHARE THIS PAGE
          </p>
          <button
            onClick={handleShare}
            className="group flex items-center gap-2 mx-auto"
            style={{
              padding: '0.75rem 1.5rem',
              background: 'transparent',
              border: '1px solid var(--muted)',
              color: 'var(--foreground)',
              cursor: 'pointer',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              transition: 'border-color 0.3s ease, background 0.3s ease',
              minHeight: '44px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.background = 'var(--surface)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--muted)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            {copied ? <Check size={14} /> : <Share2 size={14} />}
            <span>{copied ? 'LINK COPIED!' : 'SHARE'}</span>
          </button>
        </div>

        {/* Final flourish */}
        <div
          data-reveal
          className="mt-16"
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
              color: 'var(--muted-foreground)',
            }}
          >
            Made with ❤️ by{' '}
            <a
              href="https://www.createwithtanmay.in/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--accent)',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                fontWeight: 600,
              }}
              className="hover:opacity-80 transition-opacity not-italic"
            >
              Tanmay
            </a>{' '}
            • 5 September 2026
          </p>
        </div>
      </div>
    </section>
  )
}
