import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Memory } from '@/types/teacher'
import { useRevealAnimation } from '@/animations/useRevealAnimation'
import { stopScroll, startScroll } from '@/animations/useSmoothScroll'

interface MemoryLightboxProps {
  memories: Memory[]
  initialIndex: number
  onClose: () => void
}

function MemoryLightbox({ memories, initialIndex, onClose }: MemoryLightboxProps) {
  const [current, setCurrent] = useState(initialIndex)

  const prev = useCallback(() => {
    setCurrent((c) => (c > 0 ? c - 1 : memories.length - 1))
  }, [memories.length])

  const next = useCallback(() => {
    setCurrent((c) => (c < memories.length - 1 ? c + 1 : 0))
  }, [memories.length])

  // Keyboard navigation
  const handleKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
    if (e.key === 'Escape') onClose()
  }, [prev, next, onClose])

  const mem = memories[current]

  return (
    <motion.div
      className="lightbox-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      onKeyDown={handleKey}
      tabIndex={0}
      role="dialog"
      aria-modal="true"
      aria-label="Memory gallery"
      style={{ outline: 'none' }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 flex items-center justify-center"
        style={{
          width: '44px',
          height: '44px',
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: 'white',
          cursor: 'pointer',
          borderRadius: '50%',
        }}
        aria-label="Close"
      >
        <X size={18} />
      </button>

      {/* Prev */}
      {memories.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev() }}
          className="absolute left-4 md:left-8 z-10"
          style={{
            width: '48px',
            height: '48px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'white',
            cursor: 'pointer',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Previous image"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col items-center gap-4 px-16 md:px-24"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={mem.image}
            alt={mem.caption}
            style={{
              maxWidth: '85vw',
              maxHeight: '70vh',
              objectFit: 'contain',
              boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
            }}
          />
          <div className="text-center">
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.8)',
                fontSize: '1.05rem',
              }}
            >
              {mem.caption}
            </p>
            {mem.date && (
              <p
                className="text-eyebrow mt-1"
                style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}
              >
                {mem.date}
              </p>
            )}
          </div>
          {/* Counter */}
          <p
            className="text-eyebrow"
            style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em' }}
          >
            {current + 1} / {memories.length}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Next */}
      {memories.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next() }}
          className="absolute right-4 md:right-8 z-10"
          style={{
            width: '48px',
            height: '48px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'white',
            cursor: 'pointer',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Next image"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </motion.div>
  )
}

// ============================================================
// MEMORY GALLERY
// ============================================================
const ROTATIONS = [-2, 1.5, -1, 2.5, -1.5, 1]
const SIZES = [
  { gridColumn: 'span 1', gridRow: 'span 2' },
  { gridColumn: 'span 1', gridRow: 'span 1' },
  { gridColumn: 'span 1', gridRow: 'span 1' },
  { gridColumn: 'span 2', gridRow: 'span 1' },
]

interface MemoryGalleryProps {
  memories: Memory[]
}

export function MemoryGallery({ memories }: MemoryGalleryProps) {
  const sectionRef = useRevealAnimation(0, { stagger: 0.08 })
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (i: number) => {
    setLightboxIndex(i)
    stopScroll()
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
    startScroll()
  }

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      style={{
        backgroundColor: 'var(--surface)',
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      <div className="container-wide">
        {/* Heading */}
        <div data-reveal className="text-center mb-16">
          <p
            className="text-eyebrow mb-4"
            style={{ color: 'var(--accent)', letterSpacing: '0.3em' }}
          >
            THE MOMENTS WE'LL REMEMBER
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 300,
              color: 'var(--foreground)',
            }}
          >
            Classroom Memories
          </h2>
        </div>

        {/* Gallery — masonry-like grid on desktop, stack on mobile */}
        <div
          data-reveal
          className="hidden md:grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridAutoRows: '220px',
          }}
        >
          {memories.map((memory, i) => {
            const rot = ROTATIONS[i % ROTATIONS.length]
            const sizeStyle = SIZES[i % SIZES.length]
            return (
              <div
                key={i}
                className="gallery-item relative cursor-pointer"
                style={{
                  ...sizeStyle,
                  transform: `rotate(${rot}deg)`,
                  transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(23,23,23,0.1)',
                }}
                onClick={() => openLightbox(i)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = `rotate(0deg) scale(1.02)`
                  e.currentTarget.style.boxShadow = '0 16px 48px rgba(23,23,23,0.2)'
                  e.currentTarget.style.zIndex = '10'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = `rotate(${rot}deg)`
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(23,23,23,0.1)'
                  e.currentTarget.style.zIndex = 'auto'
                }}
                role="button"
                tabIndex={0}
                aria-label={memory.caption}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(i)}
              >
                <img
                  src={memory.image}
                  alt={memory.caption}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                {/* Caption overlay */}
                <div
                  className="absolute inset-0 flex flex-col justify-end p-4"
                  style={{
                    background: 'linear-gradient(to top, rgba(23,23,23,0.7) 0%, transparent 60%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '0' }}
                >
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: 'italic',
                      color: 'white',
                      fontSize: '0.9rem',
                    }}
                  >
                    {memory.caption}
                  </p>
                  {memory.date && (
                    <p
                      className="text-eyebrow mt-1"
                      style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.6rem' }}
                    >
                      {memory.date}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Mobile: vertical stack */}
        <div className="md:hidden flex flex-col gap-6">
          {memories.map((memory, i) => (
            <div
              key={i}
              className="gallery-item relative cursor-pointer"
              style={{
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(23,23,23,0.1)',
              }}
              onClick={() => openLightbox(i)}
              role="button"
              tabIndex={0}
              aria-label={memory.caption}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(i)}
            >
              <img
                src={memory.image}
                alt={memory.caption}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '240px',
                  objectFit: 'cover',
                }}
              />
              <div
                className="p-4"
                style={{ background: 'var(--background)' }}
              >
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontStyle: 'italic',
                    color: 'var(--muted-foreground)',
                    fontSize: '0.95rem',
                  }}
                >
                  {memory.caption}
                </p>
                {memory.date && (
                  <p
                    className="text-eyebrow mt-1"
                    style={{ color: 'var(--muted)', fontSize: '0.6rem', letterSpacing: '0.15em' }}
                  >
                    {memory.date}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <MemoryLightbox
            memories={memories}
            initialIndex={lightboxIndex}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
