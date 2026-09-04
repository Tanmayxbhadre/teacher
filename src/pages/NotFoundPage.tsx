import { Link } from 'react-router-dom'
import { Home, BookOpen } from 'lucide-react'
import { teachers } from '@/data/teachers'

export function NotFoundPage() {
  return (
    <main
      className="relative flex flex-col items-center justify-center min-h-screen px-6 py-16 text-center"
      style={{
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
      }}
    >
      {/* Background grain texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.6,
        }}
      />

      <div className="relative z-10 max-w-lg mx-auto">
        <span
          className="inline-block text-xs uppercase tracking-[0.25em] font-medium mb-6"
          style={{ color: 'var(--accent)', fontFamily: "'Inter', sans-serif" }}
        >
          404 — INVITATION NOT FOUND
        </span>

        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem',
          }}
        >
          A chapter yet <br />
          <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>unwritten.</em>
        </h1>

        <p
          className="text-base leading-relaxed mb-10"
          style={{
            color: 'var(--muted-foreground)',
            fontFamily: "'Inter', sans-serif",
            maxWidth: '380px',
            margin: '0 auto 2.5rem',
          }}
        >
          The personalized page you are looking for might have been moved, or the QR code scanned may need a different link.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-transform hover:scale-105 active:scale-95"
            style={{
              backgroundColor: 'var(--foreground)',
              color: 'var(--background)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            }}
          >
            <Home size={16} />
            <span>Return to Home</span>
          </Link>
        </div>

        {/* Quick links to sample teachers */}
        <div
          className="pt-8 border-t border-black/10"
          style={{ borderColor: 'var(--border)' }}
        >
          <p
            className="text-xs uppercase tracking-wider mb-4"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Or explore an active invitation:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {teachers.map((t) => (
              <Link
                key={t.slug}
                to={`/teacher/${t.slug}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors hover:bg-black/5"
                style={{
                  border: '1px solid var(--border)',
                  color: 'var(--foreground)',
                }}
              >
                <BookOpen size={12} style={{ color: 'var(--accent)' }} />
                <span>{t.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
