import { useRef, useState, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { ArrowRight, Sparkles, Gift } from 'lucide-react'
import { useReducedMotion } from '@/animations/useReducedMotion'
import type { Teacher } from '@/types/teacher'
import defaultBouquetImage from '@/assets/gift-bouquet.jpg'

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
            <div className="relative inline-flex items-center justify-center">
              {/* Outer pulsing gold ambient glow */}
              <div
                className="absolute inset-0 rounded-full blur-xl opacity-75 animate-pulse pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(245, 211, 138, 0.6) 0%, rgba(212, 175, 55, 0.2) 70%, transparent 100%)',
                  transform: 'scale(1.15)',
                }}
              />

              <button
                onClick={handleOpenGift}
                className="group relative inline-flex items-center gap-3.5 px-9 py-4 rounded-full cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 select-none shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, #FFF6DD 0%, #F5D38A 35%, #D4AF37 75%, #B38622 100%)',
                  border: '1.5px solid rgba(255, 255, 255, 0.8)',
                  boxShadow: '0 0 35px rgba(245, 211, 138, 0.45), 0 12px 28px rgba(0, 0, 0, 0.45)',
                }}
              >
                <Gift size={18} className="text-[#3b2308] transition-transform duration-300 group-hover:rotate-12" />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.8rem',
                    letterSpacing: '0.22em',
                    fontWeight: 700,
                    color: '#2a1703',
                  }}
                >
                  OPEN YOUR GIFT
                </span>
                <Sparkles size={16} className="text-[#5a380e] animate-pulse" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Gift reveal — final message & keepsake */}
      <div
        ref={giftRef}
        className="relative z-10 w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14"
        style={{
          opacity: 0,
          transform: 'translateY(30px) scale(0.98)',
          position: giftOpened ? 'relative' : 'absolute',
          pointerEvents: giftOpened ? 'all' : 'none',
          marginTop: '2rem',
        }}
      >
        {/* LEFT COLUMN — Heartfelt Editorial Letter */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-5 max-w-xl">
          <p
            className="text-eyebrow"
            style={{ color: 'var(--accent-secondary)', letterSpacing: '0.3em' }}
          >
            DEAR {nameParts},
          </p>

          <div className="flex flex-col gap-3">
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
                  fontSize: 'clamp(1.2rem, 3vw, 1.75rem)',
                  fontWeight: i === 3 ? 500 : 300,
                  fontStyle: i === 3 ? 'normal' : 'italic',
                  color: i === 3 ? '#FFE8B8' : 'rgba(255,255,255,0.9)',
                  lineHeight: 1.4,
                }}
              >
                {line}
              </p>
            ))}
          </div>

          <div className="mt-2">
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.7,
              }}
            >
              You didn't just teach a subject.
              <br />
              You became part of our journey.
            </p>
          </div>

          <div
            className="my-3 py-6"
            style={{
              borderTop: '1px solid rgba(255,255,255,0.12)',
              borderBottom: '1px solid rgba(255,255,255,0.12)',
              width: '100%',
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
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

          <div className="flex flex-col items-center lg:items-start gap-1">
            <p
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.95)',
              }}
            >
              Happy Teachers' Day ❤️
            </p>
            <p
              className="text-eyebrow mt-1"
              style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.2em' }}
            >
              5 September 2026
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN — Floating Bouquet Keepsake */}
        <div className="w-full lg:w-auto flex flex-col items-center flex-shrink-0">
          <div className="relative flex flex-col items-center text-center max-w-sm sm:max-w-md w-full">
            {/* Ambient gold glow behind bouquet */}
            <div
              className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, #E6C280 0%, #C99E55 50%, transparent 70%)',
              }}
            />

            {/* Bouquet Image with natural floating drop-shadow */}
            <div className="relative z-10 w-64 sm:w-80 md:w-96 transition-transform duration-500 hover:scale-105 select-none">
              <img
                src={teacher.giftImage || defaultBouquetImage}
                alt={`Special gift bouquet for ${teacher.name}`}
                className="w-full h-auto object-contain"
                style={{
                  filter: 'drop-shadow(0 25px 45px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 25px rgba(230, 194, 128, 0.2))',
                }}
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src = defaultBouquetImage
                }}
              />
            </div>

            {/* Elegant Tribute Sub-badge */}
            <div className="relative z-10 mt-2 text-center">
              <p
                className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-semibold"
                style={{ color: 'var(--accent-secondary)' }}
              >
                A SPECIAL GIFT FOR YOU
              </p>
              <h3
                className="text-xl sm:text-2xl text-white mt-1 font-light tracking-wide"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Presented to {teacher.name}
              </h3>
              <p
                className="text-[11px] text-gray-400 mt-0.5 tracking-wider font-light"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                MGM College of Computer Science & Information Technology
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
