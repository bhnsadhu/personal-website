import { site } from '../data'

/**
 * The photo beside the name: a print on the same cream stock as the cards,
 * captioned in its bottom margin. Both views render this one component.
 */
export function HeroPhoto() {
  const { src, width, height, alt, caption } = site.photo
  return (
    <figure className="hero__photo">
      <img src={src} width={width} height={height} alt={alt} decoding="async" />
      <figcaption>{caption}</figcaption>
    </figure>
  )
}
