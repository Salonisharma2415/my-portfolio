import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const links = ['home', 'about', 'skills', 'projects', 'services', 'contact']

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const closeOnEscape = (event) => { if (event.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    links.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <header className={`sn ${scrolled ? 'scrolled' : ''}`}>
      <div className="container sn-inner">
        <a href="#home" className="sn-logo">
          <span className="sn-mark">S</span>
          <span className="sn-wordmark">Saloni<span>.</span></span>
        </a>

        <nav id="site-navigation" className={`sn-links ${open ? 'open' : ''}`}>
          {links.map((l) => (
            <a
              key={l}
              href={`#${l}`}
              className={active === l ? 'on' : ''}
              aria-current={active === l ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {active === l && <motion.span className="sn-active-pill" layoutId="nav-active-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              {l}
            </a>
          ))}
        </nav>

        <a href="#contact" className="sn-contact-link">Let’s talk <span aria-hidden="true">↗</span></a>
        <button className={`sn-toggle ${open ? 'is-open' : ''}`} type="button" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
      </div>
    </header>
  )
}
