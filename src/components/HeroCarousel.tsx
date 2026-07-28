import { Link } from 'react-router-dom'
import type { Slide } from '../content/types'
import { Marked } from './Marked'
import { useCarousel } from '../hooks/useCarousel'

interface HeroCarouselProps {
  slides: Slide[]
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const total = slides.length
  const { current, playing, next, prev, goTo, togglePlayPause, bind } = useCarousel(total)

  return (
    <section
      className="hero-carousel"
      aria-label="Featured"
      onMouseEnter={bind.onMouseEnter}
      onMouseLeave={bind.onMouseLeave}
      onFocus={bind.onFocus}
      onBlur={bind.onBlur}
      onKeyDown={bind.onKeyDown}
      tabIndex={-1}
    >
      <div
        className="hero-carousel__track"
        role="region"
        aria-roledescription="carousel"
        aria-label="Hero slides"
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`hero-carousel__slide${i === current ? ' active' : ''}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${total}`}
            aria-hidden={i !== current}
          >
            <div
              className="hero-carousel__bg"
              style={{ backgroundImage: `url('${slide.image}')` }}
            />
            <div className="hero-carousel__content">
              <h1>
                {slide.h1Line1}
                {slide.h1Line2 ? <> {slide.h1Line2}</> : null}
              </h1>
              <p className="hero-lede">
                <Marked>{slide.lede}</Marked>
              </p>
              <div className="hero-btn-row">
                <Link to={slide.btnUrl} className="btn btn--yellow">
                  {slide.btnText}
                </Link>
                {slide.btn2Text && slide.btn2Url ? (
                  <Link to={slide.btn2Url} className="btn btn--on-dark">
                    {slide.btn2Text}
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        ))}

        {/* Curtain overlay — two green panels animate open on mount */}
        <div className="hero-carousel__curtain hero-carousel__curtain--left" aria-hidden="true" />
        <div className="hero-carousel__curtain hero-carousel__curtain--right" aria-hidden="true" />

        {/* Concave arch corners */}
        <span className="hero-arch-corner hero-arch-corner--tl" aria-hidden="true" />
        <span className="hero-arch-corner hero-arch-corner--tr" aria-hidden="true" />
        <span className="hero-arch-corner hero-arch-corner--bl" aria-hidden="true" />
        <span className="hero-arch-corner hero-arch-corner--br" aria-hidden="true" />

        {total > 1 ? (
          <div className="hero-carousel__vcontrols hero-carousel__controls">
            <div className="hero-carousel__dots hero-carousel__dots--vertical">
              {slides.map((_, d) => (
                <button
                  key={d}
                  type="button"
                  className={`hero-carousel__dot${d === current ? ' active' : ''}`}
                  aria-label={`Go to slide ${d + 1}`}
                  onClick={() => goTo(d)}
                />
              ))}
            </div>
            <button
              type="button"
              className="hero-carousel__btn hero-carousel__btn--round"
              aria-label="Previous slide"
              onClick={prev}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18 15l-6-6-6 6" />
              </svg>
            </button>
            <button
              type="button"
              className="hero-carousel__btn hero-carousel__btn--round"
              aria-label="Next slide"
              onClick={next}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              className="hero-carousel__btn hero-carousel__btn--round"
              aria-label={playing ? 'Pause carousel' : 'Play carousel'}
              onClick={togglePlayPause}
            >
              {playing ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polygon points="6,4 20,12 6,20" />
                </svg>
              )}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
