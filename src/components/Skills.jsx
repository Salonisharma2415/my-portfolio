import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FiShare2 } from 'react-icons/fi'
import { SiBootstrap, SiCss, SiGit, SiJavascript, SiJquery, SiMysql, SiPhp } from 'react-icons/si'
import Reveal from './Reveal'

const skills = [
  { name: 'PHP', Icon: SiPhp, color: '#8892bf', category: 'Backend - Server-side language', detail: 'Building server-side features and business logic.' },
  { name: 'JavaScript', Icon: SiJavascript, color: '#f0db4f', category: 'Frontend - Programming language', detail: 'Adding useful interactions to everyday workflows.' },
  { name: 'MySQL', Icon: SiMysql, color: '#46a6c7', category: 'Data - Relational database', detail: 'Working with relational data and operational records.' },
  { name: 'jQuery', Icon: SiJquery, color: '#78bdf2', category: 'Frontend - UI library', detail: 'Creating dynamic forms and responsive UI behavior.' },
  { name: 'Bootstrap', Icon: SiBootstrap, color: '#ae8bff', category: 'Frontend - UI framework', detail: 'Building layouts that adapt across screen sizes.' },
  { name: 'CSS3', Icon: SiCss, color: '#69a9ff', category: 'Frontend - Styling', detail: 'Crafting page layouts, visual details and motion.' },
  { name: 'REST APIs', Icon: FiShare2, color: '#72c8d8', category: 'Integration - APIs', detail: 'Connecting application screens with backend services.' },
  { name: 'Git', Icon: SiGit, color: '#f07861', category: 'Tools - Version control', detail: 'Tracking changes and collaborating on code.' },
]

export default function Skills() {
  const [active, setActive] = useState(skills[0])
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return undefined
    const activeIndex = skills.findIndex((skill) => skill.name === active.name)
    const timer = window.setTimeout(() => setActive(skills[(activeIndex + 1) % skills.length]), 10000)
    return () => window.clearTimeout(timer)
  }, [active, prefersReducedMotion])

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <Reveal>
          <div className="skills-heading">
            <div><p className="tag">THE TOOLS I WORK WITH</p><h2 className="section-title">My <span className="technology-accent">technology</span> <span>stack.</span></h2></div>
            <p className="skills-intro">A few of the languages and tools I use across my projects. Choose one to see where it fits.</p>
          </div>
        </Reveal>

        <div className="skills-mini-slider" aria-label="Browse technologies">
          {skills.map((skill) => (
            <button key={skill.name} type="button" className={active.name === skill.name ? 'active' : ''} aria-pressed={active.name === skill.name} onClick={() => setActive(skill)}>
              {skill.name}
            </button>
          ))}
        </div>

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
                const Icon = skill.Icon
                return (
                  <button
                    type="button"
                    key={skill.name}
                    className={`skills-orbit-node${selected ? ' selected' : ''}`}
                    style={{ '--orbit-x': x, '--orbit-y': y, '--icon-color': skill.color }}
                    aria-pressed={selected}
                    aria-label={`Select ${skill.name}, ${skill.category}`}
                    title={skill.name}
                    onClick={() => setActive(skill)}
                  >
                    <span className={`skills-orbit-node-face${prefersReducedMotion ? ' still' : ''}`}>
                      <Icon aria-hidden="true" />
                      <span className="skills-orbit-node-name">{skill.name}</span>
                    </span>
                  </button>
                )
              })}
            </div>
            <div className="skills-orbit-core" aria-hidden="true"><span>&lt;/&gt;</span><small>TECH STACK</small></div>
            <span className="skills-orbit-caption">SELECT AN ICON | {String(skills.length).padStart(2, '0')} IN ORBIT</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.article key={active.name} className="skill-orbit-detail" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.24 }} aria-live="polite">
              <span className="skill-detail-index">SELECTED TOOL | {String(skills.findIndex((skill) => skill.name === active.name) + 1).padStart(2, '0')} / {String(skills.length).padStart(2, '0')}</span>
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
