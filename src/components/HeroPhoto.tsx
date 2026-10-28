import { site } from '../data'

/**
 * The photo beside the name: a cut-out headshot standing on the page, no
 * frame, fading into the table at the waist. Both views render this one
 * component.
 */
export function HeroPhoto() {
  const { src, avif, width, height, alt } = site.photo
  return (
    <figure className="hero__photo">
      <picture>
        <source srcSet={avif} type="image/avif" />
        <img src={src} width={width} height={height} alt={alt} decoding="async" />
      </picture>
    </figure>
  )
}
