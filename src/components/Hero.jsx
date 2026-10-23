import { motion } from 'framer-motion'
import { FiCode } from 'react-icons/fi'
import ProfilePortrait from './ProfilePortrait'

const technologies = ['PHP', 'JavaScript', 'MySQL', 'jQuery', 'REST APIs']

export default function Hero() {
  return (
    <section id="home" className="hero hero-cover-section">
      <div className="hero-ambient" aria-hidden="true" />
      <motion.div className="hero-cover" initial="hidden" animate="show">
        <motion.p className="tag hero-cover-eyebrow" variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { delay: 0.12 } } }}>
          <span className="hero-live-dot" /> PORTFOLIO / 2026
        </motion.p>
        <motion.div className="hero-code-mark" aria-hidden="true" variants={{ hidden: { opacity: 0, y: 20, scale: 0.88 }, show: { opacity: 1, y: 0, scale: 1, transition: { delay: 0.22, duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}>
          <motion.div className="hero-code-orbit hero-code-orbit-one" animate={{ rotate: 360 }} transition={{ duration: 32, ease: 'linear', repeat: Infinity }} />
          <motion.div className="hero-code-orbit hero-code-orbit-two" animate={{ rotate: -360 }} transition={{ duration: 24, ease: 'linear', repeat: Infinity }} />
          <div className="hero-code-core"><FiCode /><span>BUILD / CONNECT / IMPROVE</span></div>
          <b className="hero-orbit-label hero-orbit-label-one">PHP</b>
          <b className="hero-orbit-label hero-orbit-label-two">JS</b>
        </motion.div>
        <motion.p className="hero-cover-name" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.45 } } }}>SALONI SHARMA <span>—</span> SOFTWARE DEVELOPER</motion.p>
        <motion.h1 variants={{ hidden: { opacity: 0, y: 25 }, show: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}>
          EXPLORE MY <em className="grad">PORTFOLIO.</em>
        </motion.h1>
        <motion.p className="hero-cover-intro" variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { delay: 0.72, duration: 0.7 } } }}>
          I build thoughtful web applications for healthcare, property management and everyday business workflows.
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
