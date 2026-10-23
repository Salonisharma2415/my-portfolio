import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Reveal from './Reveal'

const skills = [
  { name: 'PHP', category: 'Backend language', detail: 'Building server-side features and business logic.' },
  { name: 'JavaScript', category: 'Programming language', detail: 'Adding useful interactions to everyday workflows.' },
  { name: 'MySQL', category: 'Database', detail: 'Working with relational data and operational records.' },
  { name: 'jQuery', category: 'Frontend library', detail: 'Creating dynamic forms and responsive UI behavior.' },
  { name: 'Bootstrap', category: 'UI framework', detail: 'Building layouts that adapt across screen sizes.' },
  { name: 'CSS3', category: 'Styling', detail: 'Crafting page layouts, visual details and motion.' },
  { name: 'REST APIs', category: 'Integration', detail: 'Connecting application screens with backend services.' },
  { name: 'Git', category: 'Version control', detail: 'Tracking changes and collaborating on code.' },
  { name: 'Docker', category: 'Development tools', detail: 'Using containers in local development workflows.' },
]

export default function Skills() {
  const [active, setActive] = useState(skills[0])
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <Reveal>
          <div className="skills-heading">
            <div><p className="tag">THE TOOLS I WORK WITH</p><h2 className="section-title">My technology <span>stack.</span></h2></div>
            <p className="skills-intro">A few of the languages and tools I use across my projects. Choose one to see where it fits.</p>
          </div>
        </Reveal>

        <div className="skills-orbit-layout">
          <div className="skills-orbit-scene" aria-label="Rotating orbit of technologies">
            <div className="skills-orbit-glow" aria-hidden="true" />
            <div className="skills-orbit-track skills-orbit-track-one" aria-hidden="true" />
            <div className="skills-orbit-track skills-orbit-track-two" aria-hidden="true" />
            <div className={`skills-orbit${prefersReducedMotion ? ' orbit-still' : ''}`}>
              {skills.map((skill, index) => {
                const angle = (index / skills.length) * Math.PI * 2 - Math.PI / 2
                const x = `${Math.cos(angle) * 32}%`
                const y = `${Math.sin(angle) * 32}%`
                const selected = active.name === skill.name
                return (
                  <button
                    type="button"
                    key={skill.name}
                    className={`skills-orbit-node${selected ? ' selected' : ''}`}
                    style={{ '--orbit-x': x, '--orbit-y': y }}
                    aria-pressed={selected}
                    onClick={() => setActive(skill)}
                  >
                    <span className={prefersReducedMotion ? 'orbit-label still' : 'orbit-label'}>{skill.name}</span>
                  </button>
                )
              })}
            </div>
            <div className="skills-orbit-core" aria-hidden="true"><span>&lt;/&gt;</span><small>TECH STACK</small></div>
            <span className="skills-orbit-caption">SELECT A TOOL · 09 IN ORBIT</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.article key={active.name} className="skill-orbit-detail" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.24 }} aria-live="polite">
              <span className="skill-detail-index">SELECTED TOOL <i>—</i> {String(skills.findIndex((skill) => skill.name === active.name) + 1).padStart(2, '0')} / 09</span>
              <h3>{active.name}</h3>
              <p className="skill-orbit-category">{active.category}</p>
              <p>{active.detail}</p>
              <span className="skill-orbit-detail-line" aria-hidden="true" />
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
