import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, Sparkles, GraduationCap } from 'lucide-react'
import { getTeachers } from '@/lib/db'
import type { Teacher } from '@/types/teacher'

export function HomePage() {
  const [teachers, setTeachers] = useState<Teacher[]>([])

  useEffect(() => {
    async function load() {
      const data = await getTeachers()
      setTeachers(data)
    }
    load()
  }, [])
  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--background)',
        overflowX: 'hidden',
      }}
    >
      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center text-center"
        style={{
          minHeight: '100vh',
          padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
        }}
      >
        {/* Background grain */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
            opacity: 0.5,
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <p
            className="text-eyebrow mb-8"
            style={{ color: 'var(--accent)', letterSpacing: '0.3em' }}
          >
            5 SEPTEMBER 2026
          </p>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--foreground)',
              marginBottom: '1.5rem',
            }}
          >
            To the teachers
            <br />
            <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>who shaped us.</em>
          </h1>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
              color: 'var(--muted-foreground)',
              lineHeight: 1.75,
              maxWidth: '520px',
              margin: '0 auto 3rem',
            }}
          >
            A collection of little surprises made with a lot of gratitude.
            Each teacher receives their own personalized QR code to a message
            built especially for them.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/teacher/anita-sharma"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '1rem 2rem',
                background: 'var(--accent)',
                color: 'var(--background)',
                textDecoration: 'none',
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                minHeight: '52px',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
            >
              <span>SEE A DEMO</span>
              <ArrowRight size={13} />
            </Link>

            <Link
              to="/admin"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '1rem 2rem',
                background: 'transparent',
                color: 'var(--foreground)',
                textDecoration: 'none',
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                border: '1px solid var(--muted)',
                minHeight: '52px',
                transition: 'border-color 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--muted)' }}
            >
              <Users size={13} />
              <span>ADMIN</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Teachers list */}
      <section
        style={{
          backgroundColor: 'var(--surface)',
          padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
          borderTop: '1px solid var(--muted)',
        }}
      >
        <div className="container-wide">
          <p
            className="text-eyebrow mb-12 text-center"
            style={{ color: 'var(--accent)', letterSpacing: '0.3em' }}
          >
            PERSONALIZED EXPERIENCES
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map((teacher) => (
              <Link
                key={teacher.id}
                to={`/teacher/${teacher.slug}`}
                style={{
                  display: 'block',
                  padding: '2rem',
                  background: 'var(--background)',
                  border: '1px solid var(--muted)',
                  textDecoration: 'none',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(23,23,23,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '1px solid var(--muted)',
                      background: 'var(--surface)',
                      color: 'var(--accent)',
                    }}
                  >
                    {teacher.photo ? (
                      <img
                        src={teacher.photo}
                        alt={teacher.name}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <GraduationCap size={24} />
                    )}
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        color: 'var(--foreground)',
                      }}
                    >
                      {teacher.name}
                    </p>
                    <p
                      className="text-eyebrow"
                      style={{
                        color: 'var(--accent)',
                        fontSize: '0.6rem',
                        letterSpacing: '0.15em',
                      }}
                    >
                      {teacher.subject}
                    </p>
                    {teacher.classInfo?.college && (
                      <p
                        className="text-xs truncate max-w-[200px] mt-0.5"
                        style={{
                          color: 'var(--muted-foreground)',
                          fontSize: '0.7rem',
                        }}
                      >
                        {teacher.classInfo.college}
                      </p>
                    )}
                  </div>
                </div>

                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: 'italic',
                    fontSize: '0.9rem',
                    color: 'var(--muted-foreground)',
                    lineHeight: 1.6,
                  }}
                >
                  "{teacher.quote.slice(0, 90)}..."
                </p>

                <div
                  className="flex items-center gap-2 mt-4"
                  style={{ color: 'var(--accent)', fontSize: '0.7rem', letterSpacing: '0.15em' }}
                >
                  <span>OPEN MESSAGE</span>
                  <ArrowRight size={10} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: 'var(--background)',
          borderTop: '1px solid var(--muted)',
          padding: '2rem clamp(1.5rem, 5vw, 4rem)',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '0.9rem',
            color: 'var(--muted-foreground)',
          }}
        >
          Made with gratitude — Teachers' Day 2026
        </p>
      </footer>
    </main>
  )
}
