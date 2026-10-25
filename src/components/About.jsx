import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import ProfilePortrait from './ProfilePortrait'
import Reveal from './Reveal'

const journey = [
  { number: '01', kind: 'EDUCATION · COMPLETED', title: 'Bachelor of Computer Applications', short: 'BCA', description: 'Completed my BCA at MPGC Government College, Amb, building a foundation in computer applications and software development.', marker: 'BCA' },
  { number: '02', kind: 'EDUCATION · IN PROGRESS', title: 'Master of Computer Applications', short: 'MCA', description: 'Currently pursuing my MCA and continuing to grow my understanding of software, systems and the way technology solves real problems.', marker: 'MCA' },
  { number: '03', kind: 'PROFESSIONAL EXPERIENCE', title: '1.5 years of building software', short: '1.5 YEARS', description: 'Hands-on experience across healthcare, property management and business operations, turning day-to-day processes into useful application workflows.', marker: 'WORK' },
]

export default function About() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { amount: 0.25 })
  const prefersReducedMotion = useReducedMotion()
  const changeSlide = (direction) => setActive((current) => (current + direction + journey.length) % journey.length)
  const handleDragEnd = (_, info) => {
    if (info.offset.x < -55) changeSlide(1)
    if (info.offset.x > 55) changeSlide(-1)
  }
  const slide = journey[active]

  useEffect(() => {
    if (!isInView || paused || prefersReducedMotion) return undefined
    const timer = window.setTimeout(() => changeSlide(1), 6000)
    return () => window.clearTimeout(timer)
  }, [active, isInView, paused, prefersReducedMotion])

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="container">
        <div className="about-wordstage" aria-label="Always learning, always building">
          <motion.p className="about-word about-word-one" initial={{ opacity: 0, x: -90 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>ALWAYS</motion.p>
          <motion.p className="about-word about-word-two" initial={{ opacity: 0, x: 90 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}>LEARNING<span>.</span></motion.p>
          <span className="about-word-index">A LITTLE ABOUT ME <i>—</i> 01 / 03</span>
        </div>

        <motion.article
          className="about-profile-panel"
          initial={{ opacity: 0, y: 105, scale: 0.97, clipPath: 'inset(18% 0 0 0 round 22px)' }}
          whileInView={{ opacity: 1, y: 0, scale: 1, clipPath: 'inset(0% 0 0 0 round 22px)' }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="about-portrait-column">
            <ProfilePortrait />
            <span className="portrait-caption">SALONI SHARMA · SOFTWARE DEVELOPER</span>
          </div>
          <div className="about-bio">
            <p className="tag">THE PERSON BEHIND THE PROJECTS</p>
            <h2>Hi, I’m <span>Saloni Sharma.</span></h2>
            <p className="about-bio-lead">I’m a software developer who enjoys learning by building.</p>
            <p className="about-bio-copy">I’ve worked on healthcare, property management and store operations software, helping make everyday workflows easier to follow.</p>
            <a href="#projects" className="about-link">See what I’ve been building <span aria-hidden="true">↘</span></a>
          </div>
        </motion.article>

        <Reveal>
          <section className="journey-section" aria-label="Education and experience">
            <div className="journey-heading">
              <div><p className="tag">EDUCATION & EXPERIENCE</p><h3>My journey <span>so far.</span></h3></div>
              <p>Swipe through the milestones that shaped my path.</p>
            </div>
            <div className="journey-slider" onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false) }} onTouchStart={() => setPaused(true)} onTouchEnd={() => setPaused(false)}>
              <div className="journey-rail" aria-hidden="true"><span style={{ transform: `translateX(${active * 100}%)` }} /></div>
              <div className="journey-card-window">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.article
                    key={slide.number}
                    className="journey-card"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.16}
                    onDragEnd={handleDragEnd}
                    initial={{ opacity: 0, x: 48 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -48 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                  >
                    <div className="journey-card-marker" aria-hidden="true">{slide.marker}</div>
                    <div className="journey-card-content">
                      <p className="journey-card-kind"><span>{slide.number}</span> {slide.kind}</p>
                      <h4>{slide.title}</h4>
                      <p className="journey-card-description">{slide.description}</p>
                    </div>
                    <span className="journey-card-number" aria-hidden="true">{slide.number}</span>
                  </motion.article>
                </AnimatePresence>
              </div>
              <div className="journey-controls">
                <div className="journey-dots" aria-label="Choose a journey milestone">
                  {journey.map((item, index) => <button key={item.number} type="button" className={index === active ? 'active' : ''} aria-label={`Show ${item.title}`} aria-current={index === active ? 'step' : undefined} onClick={() => setActive(index)} />)}
                </div>
                <span className="journey-count">{String(active + 1).padStart(2, '0')} <i>/</i> {String(journey.length).padStart(2, '0')}</span>
                <div className="journey-arrows">
                  <button type="button" aria-label="Previous milestone" onClick={() => changeSlide(-1)}>←</button>
                  <button type="button" aria-label="Next milestone" onClick={() => changeSlide(1)}>→</button>
                </div>
              </div>
            </div>
          </section>
        </Reveal>
      </div>
    </section>
  )
}
