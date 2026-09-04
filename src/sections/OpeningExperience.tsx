import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { ArrowRight } from 'lucide-react'
import { useReducedMotion } from '@/animations/useReducedMotion'

interface OpeningExperienceProps {
  teacherName: string
  onOpen: () => void
}

export function OpeningExperience({ teacherName, onOpen }: OpeningExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const dateRef = useRef<HTMLParagraphElement>(null)
  const tagline1Ref = useRef<HTMLParagraphElement>(null)
  const tagline2Ref = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const reduced = useReducedMotion()
  const [exiting, setExiting] = useState(false)

  // Magnetic button state
  const magneticX = useRef(0)
  const magneticY = useRef(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([dateRef.current, tagline1Ref.current, tagline2Ref.current, ctaRef.current], {
          opacity: 1, y: 0,
        })
        return
      }

      const tl = gsap.timeline({ delay: 0.3 })

      tl.fromTo(dateRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      )
      .fromTo(tagline1Ref.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(tagline2Ref.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
        '-=0.3'
      )
    }, containerRef)

    return () => ctx.revert()
  }, [reduced])

  // Magnetic hover effect for desktop
  useEffect(() => {
    const btn = btnRef.current
    if (!btn) return

    const onMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      magneticX.current = x * 0.35
      magneticY.current = y * 0.35
      gsap.to(btn, {
        x: magneticX.current,
        y: magneticY.current,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    const onMouseLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' })
    }

    btn.addEventListener('mousemove', onMouseMove)
    btn.addEventListener('mouseleave', onMouseLeave)
    return () => {
      btn.removeEventListener('mousemove', onMouseMove)
      btn.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  const handleOpen = () => {
    if (exiting) return
    setExiting(true)

    if (reduced) {
      onOpen()
      return
    }

    const tl = gsap.timeline({
      onComplete: onOpen,
    })

    tl.to(btnRef.current, {
      scale: 0.96,
      duration: 0.15,
      ease: 'power2.in',
    })
    .to(containerRef.current, {
      backgroundColor: 'rgba(23, 23, 23, 0.04)',
      duration: 0.4,
    })
    .to([dateRef.current, tagline1Ref.current, tagline2Ref.current, ctaRef.current], {
      opacity: 0,
      y: -20,
      stagger: 0.06,
      duration: 0.5,
      ease: 'power3.in',
    }, '-=0.2')
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power3.inOut',
    }, '-=0.1')
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Paper grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
          opacity: 0.8,
          mixBlendMode: 'multiply',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg mx-auto">
        {/* Date */}
        <p
          ref={dateRef}
          className="text-eyebrow mb-10"
          style={{ color: 'var(--accent-secondary)', opacity: 0 }}
        >
          5 September 2026
        </p>

        {/* Tagline */}
        <p
          ref={tagline1Ref}
          className="text-headline mb-2"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
            color: 'var(--foreground)',
            opacity: 0,
          }}
        >
          A little something,
        </p>
        <p
          ref={tagline2Ref}
          className="text-headline mb-14"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
            color: 'var(--foreground)',
            opacity: 0,
          }}
        >
          made especially for{' '}
          <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>you.</em>
        </p>

        {/* CTA */}
        <div ref={ctaRef} style={{ opacity: 0 }}>
          <p
            className="text-eyebrow mb-6"
            style={{ color: 'var(--muted-foreground)', letterSpacing: '0.3em' }}
          >
            YOUR SURPRISE AWAITS
          </p>
          <button
            ref={btnRef}
            onClick={handleOpen}
            disabled={exiting}
            className="magnetic-btn group relative"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 2rem',
              background: 'var(--accent)',
              color: 'var(--background)',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif",
              minHeight: '52px',
              minWidth: '200px',
              userSelect: 'none',
            }}
          >
            <span>OPEN YOUR SURPRISE</span>
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* Subtle bottom hint */}
        <p
          className="absolute bottom-8 text-eyebrow"
          style={{
            color: 'var(--muted)',
            letterSpacing: '0.15em',
            fontSize: '0.6rem',
          }}
        >
          {teacherName}
        </p>
      </div>
    </div>
  )
}
