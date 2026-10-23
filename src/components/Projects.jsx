import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import ProjectPreview from './ProjectPreview'
import Reveal from './Reveal'

const projects = [
  {
    no: '01', name: 'Smart HMS', type: 'Hospital management', accent: 'mint',
    summary: 'A connected hospital journey—from patient visits and investigations to lab results, pharmacy, inventory and reports.',
    flow: ['Patient visits & records', 'Investigation orders and lab results', 'Pharmacy dispensing & inventory', 'Reports across hospital workflows'],
    tags: ['OPD / IPD', 'Laboratory', 'Pharmacy', 'Inventory', 'Reports'],
  },
  {
    no: '02', name: 'PMS', type: 'Property management', accent: 'lavender',
    summary: 'A clear view of each property and unit: who owns or occupies it, what is rented, and the receipts tied to it.',
    flow: ['Property portfolio and unit inventory', 'Available, owner-occupied and rented status', 'Tenant / customer and occupancy records', 'Receipts, payment history and reports'],
    tags: ['Units', 'Occupancy', 'Owner', 'Tenants', 'Receipts'],
  },
  {
    no: '03', name: 'Conquerent', type: 'Purchase & store operations', accent: 'amber',
    summary: 'Follow products across the full store lifecycle, from purchase order and goods receiving to stock and dispatch.',
    flow: ['Purchase request and purchase order', 'Goods receiving and stock entry', 'Store inventory and product movement', 'Dispatch and order tracking'],
    tags: ['Purchase orders', 'Receiving', 'Store', 'Products', 'Dispatch'],
  },
  {
    no: '04', name: 'Pharmacy module', type: 'Healthcare operations', accent: 'rose',
    summary: 'Support the medicine journey with connected catalog, prescription, dispensing, billing and stock records.',
    flow: ['Medicine catalog and stock', 'Prescription review', 'Dispensing and billing', 'Usage and stock reports'],
    tags: ['Medicine stock', 'Prescriptions', 'Dispensing', 'Billing'],
  },
  {
    no: '05', name: 'IVF module', type: 'Clinical workflow', accent: 'blue',
    summary: 'Keep IVF patient journeys and the clinical records used throughout treatment organized in one workflow.',
    flow: ['Patient and cycle records', 'Appointments and treatment steps', 'Investigation results', 'Clinical history and reports'],
    tags: ['Patient journey', 'Treatment cycles', 'Investigations', 'Reports'],
  },
]

export default function Projects() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { amount: 0.25 })
  const project = projects[active]
  const showProject = (index) => setActive((index + projects.length) % projects.length)

  useEffect(() => {
    if (!isInView || paused) return undefined
    const timer = window.setTimeout(() => showProject(active + 1), 3000)
    return () => window.clearTimeout(timer)
  }, [active, isInView, paused])

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
                aria-live="polite"
              >
                <ProjectPreview name={project.name} index={active} />
                <div className="project-slide-copy">
                  <div className="project-slide-meta"><span>SELECTED WORK / {project.no}</span><span>{project.type}</span></div>
                  <h3>{project.name}</h3>
                  <p className="project-slide-summary">{project.summary}</p>
                  <p className="project-flow-heading">How the workflow moves</p>
                  <ol className="project-flow-steps">{project.flow.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</li>)}</ol>
                  <div className="workflow-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
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
