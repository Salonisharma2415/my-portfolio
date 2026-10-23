import { useState } from 'react'

export default function ProfilePortrait() {
  const [imageLoaded, setImageLoaded] = useState(false)
  return (
    <figure className={`profile-portrait${imageLoaded ? ' image-loaded' : ''}`}>
      <picture>
        <source srcSet="/portfolio.webp" type="image/webp" />
        <img className="profile-image" src="/portfolio.jpeg" alt="Saloni Sharma, software developer" width="1600" height="1200" loading="lazy" decoding="async" onLoad={() => setImageLoaded(true)} />
      </picture>
      <div className="portrait-photo-shade" aria-hidden="true" />
      <div className="portrait-grain" aria-hidden="true" />
      <span className="portrait-side-note" aria-hidden="true">A LITTLE CURIOSITY GOES A LONG WAY</span>
      <span className="portrait-photo-note" aria-hidden="true">PORTRAIT</span>
    </figure>
  )
}
