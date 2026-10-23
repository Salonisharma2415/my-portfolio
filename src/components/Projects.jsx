import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import ProjectPreview from './ProjectPreview'
import Reveal from './Reveal'

const projects = [
  {
    no: '01', name: 'Smart HMS', type: 'Hospital management', accent: 'mint',
    problem: 'Hospital teams need patient visits, investigations, lab results, pharmacy and inventory to work as connected steps.',
    role: 'Software developer — healthcare workflow features',
    stack: ['PHP', 'MySQL', 'JavaScript', 'jQuery', 'Bootstrap'],
    outcome: 'Add a verified project result or measurable impact here.',
    flow: ['Patient visits & records', 'Investigation orders and lab results', 'Pharmacy dispensing & inventory', 'Reports across hospital workflows'],
    preview: { eyebrow: 'HOSPITAL OPERATIONS', title: 'Patient workflow', type: 'flow' },
    liveUrl: '', githubUrl: '',
  },
  {
    no: '02', name: 'PMS', type: 'Property management', accent: 'lavender',
    problem: 'Property teams need a clear view of every unit, its occupancy, owner or tenant, rental status and receipts.',
    role: 'Software developer — property workflow features',
    stack: ['PHP', 'MySQL', 'JavaScript', 'jQuery', 'Bootstrap'],
    outcome: 'Add a verified project result or measurable impact here.',
    flow: ['Property portfolio and unit inventory', 'Available, owner-occupied and rented status', 'Tenant / customer and occupancy records', 'Receipts, payment history and reports'],
    preview: { eyebrow: 'PROPERTY MANAGEMENT', title: 'Unit occupancy', type: 'units', items: ['A-12 · Owner occupied', 'A-14 · Rented', 'B-03 · Tenant', 'B-04 · Available'] },
    liveUrl: '', githubUrl: '',
  },
  {
    no: '03', name: 'Conquerent', type: 'Purchase & store operations', accent: 'amber',
    problem: 'Teams need products to stay traceable from the purchase order through receiving, store inventory and dispatch.',
    role: 'Software developer — purchasing and inventory workflow features',
    stack: ['PHP', 'MySQL', 'JavaScript', 'jQuery', 'Bootstrap'],
    outcome: 'Add a verified project result or measurable impact here.',
    flow: ['Purchase request and purchase order', 'Goods receiving and stock entry', 'Store inventory and product movement', 'Dispatch and order tracking'],
    preview: { eyebrow: 'PURCHASE & STORE', title: 'Product lifecycle', type: 'flow' },
    liveUrl: '', githubUrl: '',
  },
  {
    no: '04', name: 'Pharmacy module', type: 'Healthcare operations', accent: 'rose',
    problem: 'Pharmacy teams need medicine stock, prescriptions, dispensing and billing in one easy-to-follow flow.',
    role: 'Software developer — pharmacy workflow features',
    stack: ['PHP', 'MySQL', 'JavaScript', 'jQuery', 'Bootstrap'],
    outcome: 'Add a verified project result or measurable impact here.',
    flow: ['Medicine catalog and stock', 'Prescription review', 'Dispensing and billing', 'Usage and stock reports'],
    preview: { eyebrow: 'PHARMACY OPERATIONS', title: 'Medicine workflow', type: 'flow' },
    liveUrl: '', githubUrl: '',
  },
  {
    no: '05', name: 'IVF module', type: 'Clinical workflow', accent: 'blue',
    problem: 'Care teams need patient, treatment, investigation and follow-up records organized across an IVF journey.',
    role: 'Software developer — clinical workflow features',
    stack: ['PHP', 'MySQL', 'JavaScript', 'jQuery', 'Bootstrap'],
    outcome: 'Add a verified project result or measurable impact here.',
    flow: ['Patient and cycle records', 'Appointments and treatment steps', 'Investigation results', 'Clinical history and reports'],
    preview: { eyebrow: 'CLINICAL WORKFLOW', title: 'Patient journey', type: 'flow' },
    liveUrl: '', githubUrl: '',
  },
]

export default function Projects() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { amount: 0.25 })
  const prefersReducedMotion = useReducedMotion()
  const project = projects[active]
  const showProject = (index) => setActive((index + projects.length) % projects.length)

  useEffect(() => {
    if (!isInView || paused || prefersReducedMotion) return undefined
    const timer = window.setTimeout(() => showProject(active + 1), 3000)
    return () => window.clearTimeout(timer)
  }, [active, isInView, paused, prefersReducedMotion])

  const links = [
    project.liveUrl && { label: 'Live project', href: project.liveUrl },
    project.githubUrl && { label: 'GitHub', href: project.githubUrl },
  ].filter(Boolean)

  return (
    <section id="projects" className="work-section project-slider-section" ref={sectionRef}>
      <div className="container">
        <Reveal>
          <div className="work-heading">
            <div>
              <p className="tag">A FEW THINGS I’VE HELPED BUILD</p>
              <h2 className="section-title">Work that keeps <span>things moving.</span></h2>
            </div>
            <p className="work-intro">Real workflows, connected from the first step to the final report.</p>
          </div>
        </Reveal>

        <Reveal delay={0.08} y={70}>
          <div className="project-slider" aria-roledescription="carousel" aria-label="Selected project workflows" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false) }}>
            <AnimatePresence mode="wait">
              <motion.article
                key={project.no}
                className={`project-slide ${project.accent}`}
                initial={{ opacity: 0, y: 72, scale: 0.975 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -42, scale: 0.985 }}
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                aria-live="off"
              >
                <ProjectPreview project={project} index={active} />
                <div className="project-slide-copy">
                  <div className="project-slide-meta"><span>SELECTED WORK / {project.no}</span><span>{project.type}</span></div>
                  <h3>{project.name}</h3>
                  <p className="project-field-label">THE PROBLEM</p>
                  <p className="project-slide-summary">{project.problem}</p>
                  <p className="project-field-label">MY ROLE</p>
                  <p className="project-role">{project.role}</p>
                  <p className="project-field-label">TECH STACK</p>
                  <div className="workflow-tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <p className="project-field-label">KEY OUTCOME</p>
                  <p className="project-role">{project.outcome}</p>
                  {links.length > 0 && <div className="project-resource-links">{links.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a>)}</div>}
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </Reveal>

        <div className="project-slider-controls">
          <div className="project-pagination" aria-label="Choose a project">
            {projects.map((item, index) => (
              <button type="button" key={item.no} className={active === index ? 'selected' : ''} onClick={() => showProject(index)} aria-label={`Show ${item.name}`} aria-current={active === index ? 'step' : undefined}>
                <span>{item.no}</span><i />
              </button>
            ))}
          </div>
          <div className="project-arrows"><span>{String(active + 1).padStart(2, '0')} <i>/</i> {String(projects.length).padStart(2, '0')}</span><button type="button" onClick={() => showProject(active - 1)} aria-label="Previous project">←</button><button type="button" onClick={() => showProject(active + 1)} aria-label="Next project">→</button></div>
        </div>
      </div>
    </section>
  )
}
