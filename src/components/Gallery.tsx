import { useCallback, useEffect, useRef, useState } from 'react'
import type { GallerySlide, GalleryTile } from '../content/types'
import { useReveal } from '../hooks/useReveal'

/* ── Lightbox Modal ──────────────────────────────────────────────── */

interface LightboxProps {
  tile: GalleryTile
  onClose: () => void
}

function Lightbox({ tile, onClose }: LightboxProps) {
  const slides: GallerySlide[] = tile.slides?.length
    ? tile.slides
    : [{ image: tile.image, caption: tile.caption }]

  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)
  const [animating, setAnimating] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  const go = useCallback(
    (next: number) => {
      if (animating) return
      setDirection(next > current ? 'right' : 'left')
      setAnimating(true)
      setTimeout(() => {
        setCurrent(next)
        setAnimating(false)
        setDirection(null)
      }, 320)
    },
    [animating, current],
  )

  const prev = () => go((current - 1 + slides.length) % slides.length)
  const next = () => go((current + 1) % slides.length)

  /* keyboard navigation */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  })

  /* lock body scroll while open */
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const slideClass = animating
    ? `lb-slide lb-slide--exit-${direction}`
    : 'lb-slide lb-slide--enter'

  return (
    <div
      className="lb-overlay"
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${tile.category} gallery`}
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      <div className="lb-box">
        {/* header */}
        <div className="lb-header">
          <span className="lb-chip">{tile.category}</span>
          <button className="lb-close" onClick={onClose} aria-label="Close lightbox">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* image stage */}
        <div className="lb-stage">
          <div className={slideClass} key={current}>
            <img
              src={slides[current].image}
              alt={slides[current].caption}
              className="lb-img"
              draggable={false}
            />
          </div>

          {/* caption bar */}
          <div className="lb-caption">
            <span className="lb-caption-counter">{current + 1} / {slides.length}</span>
            <span className="lb-caption-text">{slides[current].caption}</span>
          </div>

          {/* arrow buttons */}
          {slides.length > 1 && (
            <>
              <button className="lb-arrow lb-arrow--prev" onClick={prev} aria-label="Previous image">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="lb-arrow lb-arrow--next" onClick={next} aria-label="Next image">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </>
          )}
        </div>

        {/* dot indicators */}
        {slides.length > 1 && (
          <div className="lb-dots" role="tablist" aria-label="Slide indicators">
            {slides.map((s, i) => (
              <button
                key={s.image}
                role="tab"
                aria-selected={i === current}
                aria-label={`Go to slide ${i + 1}`}
                className={`lb-dot${i === current ? ' lb-dot--active' : ''}`}
                onClick={() => go(i)}
              />
            ))}
          </div>
        )}

        {/* thumbnail strip */}
        {slides.length > 1 && (
          <div className="lb-thumbs">
            {slides.map((s, i) => (
              <button
                key={s.image}
                className={`lb-thumb${i === current ? ' lb-thumb--active' : ''}`}
                onClick={() => go(i)}
                aria-label={s.caption}
              >
                <img src={s.image} alt={s.caption} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Tile ────────────────────────────────────────────────────────── */

function Tile({
  tile,
  index,
  onOpen,
}: {
  tile: GalleryTile
  index: number
  onOpen: () => void
}) {
  const ref = useReveal<HTMLElement>(index)
  return (
    <figure
      ref={ref}
      className={`tile reveal${tile.span ? ` tile--${tile.span}` : ''}`}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpen() }}
      aria-label={`Open ${tile.category} gallery`}
      style={{ cursor: 'pointer' }}
    >
      <img src={tile.image} alt={tile.caption} />
      {/* Printer's registration mark, in the plate's own ink */}
      <span className="tile__reg" aria-hidden="true" />
      {/* expand icon */}
      <span className="tile__expand" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 2h4v4M6 14H2v-4M14 10v4h-4M2 6V2h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
      <figcaption className="tile__meta">
        <span className="tile__cat">{tile.category}</span>
        <span className="tile__cap">{tile.caption}</span>
      </figcaption>
    </figure>
  )
}

/* ── Gallery ─────────────────────────────────────────────────────── */

/** Photo mosaic — uneven spans, arch corners, category chip per frame. */
export function Gallery({ tiles }: { tiles: GalleryTile[] }) {
  const [activeTile, setActiveTile] = useState<GalleryTile | null>(null)

  return (
    <>
      <div className="gal-grid">
        {tiles.map((tile, i) => (
          <Tile
            key={tile.image}
            tile={tile}
            index={i}
            onOpen={() => setActiveTile(tile)}
          />
        ))}
      </div>

      {activeTile && (
        <Lightbox tile={activeTile} onClose={() => setActiveTile(null)} />
      )}
    </>
  )
}
