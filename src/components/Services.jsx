import { FiActivity, FiHome, FiPackage, FiBarChart2 } from 'react-icons/fi'
import Reveal from './Reveal'

const services = [
  { no: '01', icon: <FiActivity />, title: 'Healthcare workflows', description: 'Patient journeys, investigations, lab results, pharmacy and inventory brought together in clear hospital modules.', tags: ['HMS', 'Pharmacy', 'IVF'] },
  { no: '02', icon: <FiHome />, title: 'Property management', description: 'Property and unit records with owner or tenant occupancy, rental status, customer details and receipts.', tags: ['Units', 'Occupancy', 'Receipts'] },
  { no: '03', icon: <FiPackage />, title: 'Purchase to dispatch', description: 'A connected product path from purchase orders and receiving through store inventory and dispatch.', tags: ['Purchasing', 'Store', 'Dispatch'] },
  { no: '04', icon: <FiBarChart2 />, title: 'Interfaces & reporting', description: 'Responsive screens, useful data views and reports that help teams understand the work in progress.', tags: ['Responsive UI', 'Reports', 'APIs'] },
]

export default function Services() {
  return (
    <section id="services" className="services-section">
      <div className="container">
        <Reveal>
          <div className="services-heading">
            <div><p className="tag">WHERE I CAN CONTRIBUTE</p><h2 className="section-title">From idea to <span>everyday tool.</span></h2></div>
            <p>Experience shaped by the workflows behind healthcare, property and business operations.</p>
          </div>
        </Reveal>
        <div className="services-grid">
          {services.map((service, index) => (
            <Reveal key={service.no} delay={index * 0.07} y={38}>
              <article className="service-card">
                <div className="service-top"><span>{service.no}</span><i>{service.icon}</i></div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
