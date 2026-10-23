import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <Reveal>
          <div className="skills-heading">
            <div><p className="tag">THE TOOLS I WORK WITH</p><h2 className="section-title">My technology <span>stack.</span></h2></div>
            <p className="skills-intro">The languages and tools I use across my projects. Select one to see how it fits into my work.</p>
          </div>
        </Reveal>

        <div className="skills-readable-layout">
          <div className="skills-readable-grid" aria-label="Technologies and tools">
            {skills.map((skill, index) => (
              <motion.button
                type="button"
                key={skill.name}
                className={`skill-readable-item ${active.name === skill.name ? 'selected' : ''}`}
                aria-pressed={active.name === skill.name}
                onClick={() => setActive(skill)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.18 }}
              >
                <span className="skill-readable-index">{String(index + 1).padStart(2, '0')}</span>
                <strong>{skill.name}</strong>
                <span className="skill-readable-category">{skill.category}</span>
                <span className="skill-readable-arrow" aria-hidden="true">↗</span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.article key={active.name} className="skill-readable-detail" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} aria-live="polite">
              <span className="skill-detail-index">SELECTED TOOL <i>—</i> {String(skills.findIndex((skill) => skill.name === active.name) + 1).padStart(2, '0')}</span>
              <h3>{active.name}</h3>
              <p>{active.detail}</p>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
