import { useRef, useState, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { ArrowRight } from 'lucide-react'
import { useReducedMotion } from '@/animations/useReducedMotion'
import type { Teacher } from '@/types/teacher'

interface FinalSurpriseProps {
  teacher: Teacher
}

// Canvas particles for the gift reveal
function ParticlesBurst({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const isMobile = window.innerWidth < 768
    const COUNT = isMobile ? 30 : 60
    const CX = canvas.width / 2
    const CY = canvas.height / 2

    const particles = Array.from({ length: COUNT }, () => {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 5 + 2
      return {
        x: CX,
        y: CY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 5 + 2,
        opacity: 1,
        color: ['#B8955A', '#6F263D', '#F7F3EC', '#DDD2C1'][Math.floor(Math.random() * 4)],
      }
    })

    let animId: number
    let running = true

    function draw() {
      if (!running || !ctx) return
      ctx.clearRect(0, 0, canvas!.width, canvas!.height)
      let allDead = true
      particles.forEach((p) => {
        if (p.opacity <= 0) return
        allDead = false
        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.1 // gravity
        p.opacity -= 0.015
        p.size *= 0.995
      })
      if (!allDead) {
        animId = requestAnimationFrame(draw)
      }
    }

    draw()
    return () => {
      running = false
      cancelAnimationFrame(animId)
    }
  }, [active])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: active ? 1 : 0, zIndex: 2 }}
    />
  )
}

export function FinalSurprise({ teacher }: FinalSurpriseProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const giftRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [giftOpened, setGiftOpened] = useState(false)
  const [burstActive, setBurstActive] = useState(false)

  // Reveal intro text on scroll
  useEffect(() => {
    if (!sectionRef.current) return

    const items = sectionRef.current.querySelectorAll('[data-final-reveal]')
    if (reduced) {
      items.forEach((el) => gsap.set(el, { opacity: 1, y: 0 }))
      return
    }

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 70%',
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          stagger: 0.4,
          duration: 1,
          ease: 'power3.out',
        })
      },
      once: true,
    })

    return () => trigger.kill()
  }, [reduced])

  const handleOpenGift = () => {
    if (giftOpened) return
    setGiftOpened(true)
    setBurstActive(true)

    if (reduced) return

    const tl = gsap.timeline()
    tl.to(ctaRef.current, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' })
    .to(giftRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.2,
      ease: 'power3.out',
    })
  }

  const nameParts = teacher.name.replace('Prof. ', '').toUpperCase()

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundColor: '#0f0f0f',
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      <ParticlesBurst active={burstActive} />

      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(111,38,61,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Intro phase */}
      <div
        ref={introRef}
        className="relative z-10 text-center flex flex-col items-center gap-6"
      >
        <p
          data-final-reveal
          className="text-eyebrow"
          style={{
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.3em',
            opacity: 0,
            transform: 'translateY(20px)',
          }}
        >
          5 SEPTEMBER 2026
        </p>

        <p
          data-final-reveal
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.6rem, 4.5vw, 3rem)',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.9)',
            opacity: 0,
            transform: 'translateY(20px)',
          }}
        >
          ONE LAST THING...
        </p>

        <p
          data-final-reveal
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.5)',
            maxWidth: '480px',
            opacity: 0,
            transform: 'translateY(20px)',
          }}
        >
          "We could have just said thank you."
        </p>

        <p
          data-final-reveal
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.5)',
            maxWidth: '480px',
            opacity: 0,
            transform: 'translateY(20px)',
          }}
        >
          But that didn't feel like enough.
        </p>

        {/* Open Gift CTA */}
        <div
          ref={ctaRef}
          data-final-reveal
          style={{
            opacity: 0,
            transform: 'translateY(20px)',
            marginTop: '2rem',
          }}
        >
          {!giftOpened && (
            <button
              onClick={handleOpenGift}
              className="magnetic-btn group"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1.1rem 2.4rem',
                background: 'transparent',
                color: 'white',
                border: '1px solid rgba(184, 149, 90, 0.5)',
                cursor: 'pointer',
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                minHeight: '52px',
                transition: 'background 0.3s ease, border-color 0.3s ease',
                boxShadow: '0 0 40px rgba(184, 149, 90, 0.08)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(184, 149, 90, 0.1)'
                e.currentTarget.style.borderColor = 'rgba(184, 149, 90, 0.8)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.borderColor = 'rgba(184, 149, 90, 0.5)'
              }}
            >
              <span>OPEN YOUR GIFT</span>
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          )}
        </div>
      </div>

      {/* Gift reveal — final message */}
      <div
        ref={giftRef}
        className="relative z-10 text-center flex flex-col items-center gap-6 max-w-2xl mx-auto"
        style={{
          opacity: 0,
          transform: 'translateY(30px) scale(0.98)',
          position: giftOpened ? 'relative' : 'absolute',
          pointerEvents: giftOpened ? 'all' : 'none',
          marginTop: '2rem',
        }}
      >
        <p
          className="text-eyebrow"
          style={{ color: 'var(--accent-secondary)', letterSpacing: '0.3em' }}
        >
          DEAR {nameParts},
        </p>

        <div className="flex flex-col gap-4 text-center">
          {[
            'Thank you for teaching us,',
            'guiding us,',
            'challenging us,',
            'and believing in us.',
          ].map((line, i) => (
            <p
              key={i}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: i < 3
                  ? 'clamp(1.1rem, 2.8vw, 1.6rem)'
                  : 'clamp(1.1rem, 2.8vw, 1.6rem)',
                fontWeight: i === 3 ? 400 : 300,
                fontStyle: i === 3 ? 'normal' : 'italic',
                color: 'rgba(255,255,255,0.8)',
                lineHeight: 1.5,
              }}
            >
              {line}
            </p>
          ))}
        </div>

        <div className="mt-4">
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)',
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.7,
            }}
          >
            You didn't just teach a subject.
            <br />
            You became part of our journey.
          </p>
        </div>

        <div
          className="mt-8 py-8"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            width: '100%',
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
              fontWeight: 300,
              letterSpacing: '0.02em',
              color: 'white',
              lineHeight: 1.2,
            }}
          >
            YOU ARE A TEACHER
            <br />
            <span style={{ color: 'var(--accent-secondary)' }}>WE'LL REMEMBER.</span>
          </p>
        </div>

        <p
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(1.4rem, 3.5vw, 2rem)',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.9)',
          }}
        >
          Happy Teachers' Day ❤️
        </p>

        <p
          className="text-eyebrow"
          style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em' }}
        >
          5 September 2026
        </p>
      </div>
    </section>
  )
}
