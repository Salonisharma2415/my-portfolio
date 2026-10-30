import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import ProjectPreview from './ProjectPreview'
import Reveal from './Reveal'

const projects = [
  {
    no: '01', name: 'Smart HMS', type: 'Hospital Management System', accent: 'mint',
    problem: 'Managing patient records, lab investigations, pharmacy billing, and inventory tracking manually across multiple hospital departments.',
    role: 'Developed end-to-end clinical workflows connecting patient registration, lab investigations, automated pharmacy billing, and stock reports.',
    stack: ['PHP', 'MySQL', 'JavaScript', 'REST APIs', 'Git'],
    outcome: 'Streamlined patient journey from consultation to dispensary, reducing manual errors and improving daily hospital workflow speed.',
    flow: ['Patient Registration', 'Investigations & Lab', 'Pharmacy & Billing', 'Inventory & Reports'],
    preview: { eyebrow: 'HOSPITAL OPERATIONS', title: 'Patient workflow', type: 'flow' },
    liveUrl: '', githubUrl: '',
  },
  {
    no: '02', name: 'PMS', type: 'Property Management System', accent: 'lavender',
    problem: 'Tracking units, occupancy, tenants, rental receipts, electricity, and maintenance charges across property associations.',
    role: 'Built unit tracking, owner-tenant mapping, rental payment status, and automated receipt generation features.',
    stack: ['PHP', 'MySQL', 'JavaScript', 'jQuery', 'Bootstrap'],
    outcome: 'Centralized unit occupancy and financial tracking, making monthly rent and utility audits effortless.',
    flow: ['Property Units', 'Owner / Tenant Status', 'CAM & Electricity Charges', 'Receipts & Reports'],
    preview: { eyebrow: 'PROPERTY MANAGEMENT', title: 'Unit occupancy', type: 'units', items: ['A-12 · Owner occupied', 'A-14 · Rented', 'B-03 · Tenant', 'B-04 · Available'] },
    liveUrl: '', githubUrl: '',
  },
  {
    no: '03', name: 'Conquerent', type: 'Purchase & Store Operations', accent: 'amber',
    problem: 'Tracking products from initial purchase orders through store stock, panel production stages, inspection, and dispatch.',
    role: 'Engineered purchase order tracking, goods received notes, store stock management, scrap/issue indents, and dispatch status.',
    stack: ['PHP', 'MySQL', 'JavaScript', 'jQuery', 'Bootstrap'],
    outcome: 'Created a fully traceable lifecycle from procurement to final dispatch, eliminating inventory discrepancies.',
    flow: ['Purchase Order', 'Goods Received', 'Store Inventory', 'Inspection & Dispatch'],
    preview: { eyebrow: 'PURCHASE & STORE', title: 'Product lifecycle', type: 'flow' },
    liveUrl: '', githubUrl: '',
  },
  {
    no: '04', name: 'Pharmacy Module', type: 'Healthcare Operations', accent: 'rose',
    problem: 'Managing high-volume pharmacy stock, sales entries, purchase tracking, and GST/Non-GST tax reporting.',
    role: 'Developed pharmacy sales/purchase workflows, stock issues, scrap management, and automated GST billing reports.',
    stack: ['PHP', 'MySQL', 'JavaScript', 'REST APIs', 'Git'],
    outcome: 'Linked medicine purchases with live stock updates and tax compliant sales reports.',
    flow: ['Medicine Purchase', 'Stock & Issue Indents', 'Sales & Billing', 'GST / Non-GST Reports'],
    preview: { eyebrow: 'PHARMACY OPERATIONS', title: 'Medicine workflow', type: 'flow' },
    liveUrl: '', githubUrl: '',
  },
  {
    no: '05', name: 'IVF module', type: 'Clinical workflow', accent: 'blue',
    problem: 'Managing complex multi-stage IVF patient cycles, clinical investigations, and secure donor data records.',
    role: 'Developed specialized clinical workflows including patient cycle tracking, treatment appointments, and secure donor profile management.',
    stack: ['PHP', 'MySQL', 'JavaScript', 'REST APIs', 'Git'],
    outcome: 'Centralized complete patient and donor journey tracking, ensuring strict confidentiality and streamlined clinical operations.',
    flow: ['Patient & cycle', 'Donor data & screening', 'Treatments & investigations', 'History & reports'],
    preview: { eyebrow: 'CLINICAL WORKFLOW', title: 'Patient & donor journey', type: 'flow' },
    liveUrl: '', githubUrl: '',
  },
]

export default function Projects() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { amount: 0.25 })
  const prefersReducedMotion = useReducedMotion()
  const project = projects[active]
  const showProject = (index) => setActive((index + projects.length) % projects.length)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!isInView || paused || prefersReducedMotion) return undefined
    const timer = window.setTimeout(() => showProject(active + 1), 6000)
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

        <Reveal delay={0.08} y={isMobile ? 0 : 70}>
          <div className="project-slider" aria-roledescription="carousel" aria-label="Selected project workflows" onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false) }}>
            <AnimatePresence mode="wait">
              <motion.article
                key={project.no}
                className={`project-slide ${project.accent}`}
                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 72, scale: 0.975 }}
                animate={isMobile ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                exit={isMobile ? { opacity: 0 } : { opacity: 0, y: -42, scale: 0.985 }}
                transition={{ duration: isMobile ? 0.2 : 0.48, ease: [0.22, 1, 0.36, 1] }}
                aria-live="off"
              >
                <ProjectPreview project={project} index={active} />
                <div className="project-slide-copy">
                  <div className="project-slide-meta"><span>SELECTED WORK / {project.no}</span><span>{project.type}</span></div>
                  <h3>{project.name}</h3>
                  <p className="project-field-label project-problem-label">THE PROBLEM</p>
                  <p className="project-slide-summary project-problem-copy">{project.problem}</p>
                  <p className="project-field-label">MY ROLE</p>
                  <p className="project-role">{project.role}</p>
                  <p className="project-field-label">TECH STACK</p>
                  <div className="workflow-tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <p className="project-field-label">KEY OUTCOME</p>
                  <p className="project-role">{project.outcome}</p>
                  <p className="project-flow-heading project-mobile-workflow">WORKFLOW</p>
                  <ol className="project-flow-steps project-mobile-workflow">{project.flow.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</li>)}</ol>
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
