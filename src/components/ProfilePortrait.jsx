import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function ProfilePortrait() {
  const [imageLoaded, setImageLoaded] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const visible = { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
  const hidden = { opacity: 0, y: 30, scale: 0.84, filter: 'blur(12px)' }

  return (
    <figure className="profile-portrait">
      <picture>
        <source srcSet="/portfolio.webp" type="image/webp" />
        <motion.img className="profile-image" src="/portfolio.jpeg" alt="Saloni Sharma, software developer" width="1600" height="1200" loading="lazy" decoding="async" initial={prefersReducedMotion ? false : hidden} animate={prefersReducedMotion || imageLoaded ? visible : hidden} transition={{ duration: 1, ease: [0.2, 0.75, 0.25, 1] }} onLoad={() => setImageLoaded(true)} />
      </picture>
      <div className="portrait-photo-shade" aria-hidden="true" />
      <div className="portrait-grain" aria-hidden="true" />
      <span className="portrait-side-note" aria-hidden="true">A LITTLE CURIOSITY GOES A LONG WAY</span>
      <span className="portrait-photo-note" aria-hidden="true">PORTRAIT</span>
    </figure>
  )
}
