import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import type { Teacher } from '@/types/teacher'
import { useReducedMotion } from '@/animations/useReducedMotion'
import { Sparkles } from 'lucide-react'

interface HeroSectionProps {
  teacher: Teacher
  isVisible: boolean
}

// Floating petals canvas — extremely lightweight
function PetalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reduced) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = window.innerWidth < 768
    const COUNT = isMobile ? 8 : 16

    let width = canvas.offsetWidth
    let height = canvas.offsetHeight
    canvas.width = width
    canvas.height = height

    const petals = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -(Math.random() * 0.5 + 0.2),
      opacity: Math.random() * 0.4 + 0.1,
      angle: Math.random() * Math.PI * 2,
      angleSpeed: (Math.random() - 0.5) * 0.02,
    }))

    let animId: number
    let running = true

    function draw() {
      if (!running || !ctx) return
      ctx.clearRect(0, 0, width, height)
      petals.forEach((p) => {
        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = '#B8955A'
        ctx.translate(p.x, p.y)
        ctx.rotate(p.angle)
        ctx.beginPath()
        ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        p.x += p.speedX
        p.y += p.speedY
        p.angle += p.angleSpeed
        if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width }
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
      })
      animId = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => {
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width
      canvas.height = height
    }
    window.addEventListener('resize', onResize)

    return () => {
      running = false
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  )
}

export function HeroSection({ teacher, isVisible }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const line1Ref = useRef<HTMLHeadingElement>(null)
  const line2Ref = useRef<HTMLHeadingElement>(null)
  const nameRef = useRef<HTMLParagraphElement>(null)
  const dateRef = useRef<HTMLParagraphElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLQuoteElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!isVisible) return

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(
          [eyebrowRef.current, line1Ref.current, line2Ref.current, nameRef.current,
            dateRef.current, imageRef.current, quoteRef.current, scrollHintRef.current],
          { opacity: 1, y: 0, scale: 1 }
        )
        return
      }

      const tl = gsap.timeline({ delay: 0.2 })

      tl.fromTo(eyebrowRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
      .fromTo(line1Ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(line2Ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.7'
      )
      .fromTo(nameRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(dateRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.7 },
        '-=0.4'
      )
      .fromTo(imageRef.current,
        { opacity: 0, scale: 0.94, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out' },
        0.5
      )
      .fromTo(quoteRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(scrollHintRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        '-=0.2'
      )
    }, sectionRef)

    // Subtle parallax on portrait
    let parallaxTrigger: ReturnType<typeof ScrollTrigger.create> | null = null
    if (!reduced && imageRef.current) {
      parallaxTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (imageRef.current) {
            gsap.set(imageRef.current, { y: self.progress * 60 })
          }
        },
      })
    }

    return () => {
      ctx.revert()
      parallaxTrigger?.kill()
    }
  }, [isVisible, reduced])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <PetalCanvas />

      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 px-6 py-20 lg:py-0 max-w-6xl mx-auto w-full">

        {/* LEFT — Text */}
        <div className="flex-1 text-center lg:text-left max-w-xl">
          <p
            ref={eyebrowRef}
            className="text-eyebrow mb-6"
            style={{
              color: 'var(--accent)',
              opacity: 0,
              letterSpacing: '0.3em',
            }}
          >
            WITH GRATITUDE
          </p>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              lineHeight: 1.0,
              marginBottom: '0.5rem',
            }}
          >
            <span
              ref={line1Ref}
              className="block"
              style={{
                fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
                opacity: 0,
                letterSpacing: '-0.02em',
                color: 'var(--foreground)',
              }}
            >
              HAPPY
            </span>
            <span
              ref={line2Ref}
              className="block"
              style={{
                fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
                opacity: 0,
                letterSpacing: '-0.02em',
                color: 'var(--accent)',
              }}
            >
              TEACHERS'
              <br />
              DAY
            </span>
          </h1>

          <p
            ref={nameRef}
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)',
              fontWeight: 600,
              color: 'var(--accent-secondary)',
              opacity: 0,
              marginTop: '1.5rem',
              marginBottom: '0.5rem',
            }}
          >
            Dear {teacher.name}
          </p>

          <p
            ref={dateRef}
            className="text-eyebrow"
            style={{
              color: 'var(--muted-foreground)',
              letterSpacing: '0.2em',
              opacity: 0,
            }}
          >
            5 September 2026
          </p>
        </div>

        {/* RIGHT — Portrait or Wish Plaque */}
        <div className="flex-shrink-0 flex flex-col items-center gap-8">
          <div
            ref={imageRef}
            className="relative"
            style={{ opacity: 0 }}
          >
            {/* Decorative ring */}
            <div
              className="absolute"
              style={{
                inset: '-12px',
                borderRadius: teacher.photo ? '50%' : '2rem',
                border: '1px solid var(--accent)',
                opacity: 0.2,
              }}
            />
            <div
              className="absolute"
              style={{
                inset: '-24px',
                borderRadius: teacher.photo ? '50%' : '2.5rem',
                border: '1px solid var(--accent-secondary)',
                opacity: 0.1,
              }}
            />

            {teacher.photo ? (
              /* Portrait */
              <div
                style={{
                  width: 'clamp(200px, 35vw, 320px)',
                  height: 'clamp(250px, 42vw, 400px)',
                  borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                  overflow: 'hidden',
                  border: '2px solid var(--muted)',
                  boxShadow: '0 24px 80px rgba(111, 38, 61, 0.12)',
                }}
              >
                <img
                  src={teacher.photo}
                  alt={teacher.name}
                  loading="eager"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                  }}
                />
              </div>
            ) : (
              /* Wish Card / Seal when photo is not provided */
              <div
                className="flex flex-col items-center justify-center p-8 text-center"
                style={{
                  width: 'clamp(240px, 35vw, 340px)',
                  minHeight: 'clamp(260px, 40vw, 380px)',
                  borderRadius: '2rem',
                  background: 'linear-gradient(145deg, var(--surface), var(--background))',
                  border: '2px solid var(--muted)',
                  boxShadow: '0 24px 80px rgba(0, 0, 0, 0.08)',
                }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{
                    background: 'var(--background)',
                    border: '1px solid var(--border)',
                    color: 'var(--accent)',
                  }}
                >
                  <Sparkles size={28} />
                </div>

                <p
                  className="text-eyebrow mb-2"
                  style={{ color: 'var(--accent)', letterSpacing: '0.25em' }}
                >
                  HAPPY TEACHERS' DAY
                </p>

                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                    fontWeight: 400,
                    lineHeight: 1.2,
                    color: 'var(--foreground)',
                    marginBottom: '0.75rem',
                  }}
                >
                  {teacher.name}
                </h3>

                  <p
                    className="text-xs max-w-[200px] leading-relaxed"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: 'var(--muted-foreground)',
                    }}
                  >
                    MGM College of Computer Science & Information Technology
                  </p>
              </div>
            )}

            {/* Name/Designation badge */}
            <div
              className="absolute -bottom-4 left-1/2"
              style={{
                transform: 'translateX(-50%)',
                background: 'var(--background)',
                border: '1px solid var(--muted)',
                padding: '0.5rem 1.2rem',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 20px rgba(23,23,23,0.08)',
                borderRadius: '9999px',
              }}
            >
              <p
                className="text-eyebrow"
                style={{ color: 'var(--accent)', letterSpacing: '0.15em' }}
              >
                {teacher.designation}
              </p>
            </div>
          </div>

          {/* Quote */}
          <blockquote
            ref={quoteRef}
            style={{
              maxWidth: '340px',
              textAlign: 'center',
              opacity: 0,
              marginTop: '2rem',
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
                fontWeight: 400,
                color: 'var(--muted-foreground)',
                lineHeight: 1.6,
              }}
            >
              "{teacher.quote}"
            </p>
          </blockquote>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollHintRef}
        className="relative z-10 flex flex-col items-center pb-8 gap-3"
        style={{ opacity: 0 }}
      >
        <p
          className="text-eyebrow"
          style={{ color: 'var(--muted-foreground)', letterSpacing: '0.25em', fontSize: '0.6rem' }}
        >
          SCROLL TO BEGIN
        </p>
        <div
          style={{
            width: '1px',
            height: '48px',
            background: `linear-gradient(to bottom, var(--accent), transparent)`,
            animation: 'lineDown 2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  )
}
