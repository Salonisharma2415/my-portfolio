import { lazy, Suspense, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FiCode } from 'react-icons/fi'

const Hero3D = lazy(() => import('./Hero3D'))
const technologies = ['PHP', 'JavaScript', 'MySQL', 'jQuery', 'REST APIs']

function HeroCodeMark({ reduced }) {
  return (
    <div className="hero-code-mark" aria-hidden="true">
      <motion.div
        className="hero-code-orbit hero-code-orbit-one"
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 48, ease: 'linear', repeat: Infinity }}
      />
      <motion.div
        className="hero-code-orbit hero-code-orbit-two"
        animate={reduced ? undefined : { rotate: -360 }}
        transition={{ duration: 36, ease: 'linear', repeat: Infinity }}
      />
      <div className="hero-code-core"><FiCode /><span>BUILD / CONNECT / IMPROVE</span></div>
      <b className="hero-orbit-label hero-orbit-label-one">PHP</b>
      <b className="hero-orbit-label hero-orbit-label-two">JS</b>
    </div>
  )
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const [desktop, setDesktop] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)')
    const update = () => setDesktop(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  const show3D = desktop && !prefersReducedMotion

  return (
    <section id="home" className="hero hero-cover-section">
      <div className="hero-ambient" aria-hidden="true" />
      <motion.div className="hero-cover" initial="hidden" animate="show">
        <motion.p className="tag hero-cover-eyebrow" variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { delay: 0.12 } } }}>
          <span className="hero-live-dot" /> PORTFOLIO / 2026
        </motion.p>

        <motion.div className="hero-visual" variants={{ hidden: { opacity: 0, y: 20, scale: 0.94 }, show: { opacity: 1, y: 0, scale: 1, transition: { delay: 0.22, duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}>
          {/* subtle floating movement */}
          <motion.div
            className="hero-visual-float"
            animate={prefersReducedMotion ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}
          >
            {show3D ? <Suspense fallback={null}><Hero3D /></Suspense> : <HeroCodeMark reduced={prefersReducedMotion} />}
          </motion.div>
        </motion.div>

        <motion.p className="hero-cover-name" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.45 } } }}>SALONI SHARMA <span>—</span> SOFTWARE DEVELOPER</motion.p>
        <motion.h1>
          <motion.span className="hero-title-line" initial={{ opacity: 0, x: -70 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.42, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>I BUILD</motion.span>
          <motion.span className="hero-title-line hero-title-line-second" initial={{ opacity: 0, x: 70 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.55, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}><em className="grad">SOFTWARE.</em></motion.span>
        </motion.h1>
        <motion.p className="hero-cover-intro" variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { delay: 0.72, duration: 0.7 } } }}>
          I build software that solves real problems across healthcare, property management and everyday business workflows.
        </motion.p>
        <motion.div className="hero-cover-actions" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.9 } } }}>
          <a href="#projects" className="btn primary">Explore my work <span aria-hidden="true">↓</span></a>
          <a href="#about" className="hero-text-link">Get to know me <span aria-hidden="true">↗</span></a>
        </motion.div>
        <motion.div className="hero-cover-tech" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 1.02 } } }}>
          {technologies.map((technology) => <span key={technology}>{technology}</span>)}
        </motion.div>
      </motion.div>
      <a href="#about" className="hero-scroll-note"><span /> SCROLL TO EXPLORE</a>
    </section>
  )
}