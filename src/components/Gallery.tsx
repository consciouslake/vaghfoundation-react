import type { GalleryTile } from '../content/types'
import { useReveal } from '../hooks/useReveal'

function Tile({ tile, index }: { tile: GalleryTile; index: number }) {
  const ref = useReveal<HTMLElement>(index)
  return (
    <figure ref={ref} className={`tile reveal${tile.span ? ` tile--${tile.span}` : ''}`}>
      <img src={tile.image} alt={tile.caption} />
      <figcaption className="tile__meta">
        <span className="tile__cat">{tile.category}</span>
        <span className="tile__cap">{tile.caption}</span>
      </figcaption>
    </figure>
  )
}

/** Photo mosaic — uneven spans, arch corners, category chip per frame. */
export function Gallery({ tiles }: { tiles: GalleryTile[] }) {
  return (
    <div className="gal-grid">
      {tiles.map((tile, i) => (
        <Tile key={tile.image} tile={tile} index={i} />
      ))}
    </div>
  )
}
