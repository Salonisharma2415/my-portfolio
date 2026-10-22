import { motion } from 'framer-motion'
import ProfilePortrait from './ProfilePortrait'
import Reveal from './Reveal'

export default function About() {
  return (
    <section id="about" className="about-section">
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
            <p className="about-bio-lead">I’m a developer, a curious problem-solver and someone who loves learning by building.</p>
            <p className="about-bio-copy">Over the last year and a half, I’ve worked on healthcare, property management and store operations software. Each project has taught me something new about how real people use technology to keep complex work moving.</p>
            <div className="about-credentials">
              <div className="credential-card"><span className="credential-icon">01</span><div><small>EDUCATION</small><b>BCA · MPGC Government College, Amb</b><p>Currently pursuing MCA</p></div></div>
              <div className="credential-card"><span className="credential-icon">02</span><div><small>EXPERIENCE</small><b>1.5 years in software development</b><p>Learning through real product workflows</p></div></div>
            </div>
            <a href="#projects" className="about-link">See what I’ve been building <span aria-hidden="true">↘</span></a>
          </div>
        </motion.article>
      </div>
    </section>
  )
}
