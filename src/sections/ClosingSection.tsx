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
        <div data-reveal className="mb-8">
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(1.1rem, 2.4vw, 1.35rem)',
              color: 'var(--muted-foreground)',
              marginBottom: '0.4rem',
            }}
          >
            With eternal gratitude,
          </p>
          <h2
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(2.5rem, 6vw, 3.8rem)',
              fontWeight: 700,
              color: 'var(--accent)',
              lineHeight: 1.2,
            }}
          >
            Your Students
          </h2>
        </div>

        {/* Institution Keepsake Plaque */}
        <div
          data-reveal
          className="relative mx-auto my-8 p-7 sm:p-9 max-w-md rounded-2xl transition-all duration-300 select-none"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.85) 0%, rgba(245,238,227,0.7) 100%)',
            border: '1px solid rgba(184, 149, 90, 0.3)',
            boxShadow: '0 20px 45px -15px rgba(111, 38, 61, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.6) inset',
            backdropFilter: 'blur(8px)',
          }}
        >
          {/* Subtle gold corner marks */}
          <div className="absolute top-3 left-3 w-3.5 h-3.5 border-t border-l border-[#B8955A] opacity-60" />
          <div className="absolute top-3 right-3 w-3.5 h-3.5 border-t border-r border-[#B8955A] opacity-60" />
          <div className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b border-l border-[#B8955A] opacity-60" />
          <div className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b border-r border-[#B8955A] opacity-60" />

          <p
            className="text-[10px] tracking-[0.25em] uppercase font-bold mb-2"
            style={{ color: 'var(--accent-secondary)' }}
          >
            TEACHERS' DAY 2026
          </p>

          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.2rem, 3vw, 1.45rem)',
              fontWeight: 500,
              color: 'var(--foreground)',
              marginBottom: '0.35rem',
            }}
          >
            {teacher.classInfo?.department || 'Department of Computer Science & IT'}
          </h3>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.85rem',
              color: 'var(--muted-foreground)',
              lineHeight: 1.5,
            }}
          >
            MGM College of Computer Science & Information Technology
          </p>
        </div>

        {/* Share Action */}
        <div data-reveal className="mt-10 mb-14">
          <p
            className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-4"
            style={{ color: 'var(--muted-foreground)' }}
          >
            SHARE THIS EXPERIENCE
          </p>
          <button
            onClick={handleShare}
            className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
            style={{
              background: copied ? 'var(--accent)' : 'var(--surface)',
              color: copied ? 'var(--background)' : 'var(--foreground)',
              border: '1px solid var(--muted)',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
            }}
          >
            {copied ? <Check size={15} /> : <Share2 size={15} className="transition-transform group-hover:rotate-12" />}
            <span>{copied ? 'LINK COPIED TO CLIPBOARD!' : 'SHARE WITH TEACHER'}</span>
          </button>
        </div>

        {/* Footer Credit */}
        <div data-reveal className="pt-8 border-t border-black/5">
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
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
