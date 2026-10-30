import { FiActivity, FiHome, FiPackage, FiBarChart2 } from 'react-icons/fi'
import Reveal from './Reveal'

const services = [
  {
    no: '01',
    title: 'Database Architecture',
    description: 'Designing structured relational database schemas in MySQL, managing operational records, and optimizing queries for fast data retrieval.',
    icon: <FiActivity />,
    tags: ['MySQL', 'Schemas', 'Queries']
  },
  {
    no: '02',
    title: 'Frontend & UI Development',
    description: 'Building responsive, user-friendly interfaces and dynamic forms using JavaScript, jQuery, and Bootstrap for smooth user workflows.',
    icon: <FiHome />,
    tags: ['JavaScript', 'jQuery', 'Bootstrap']
  },
  {
    no: '03',
    title: 'Backend Business Logic',
    description: 'Writing secure server-side logic in PHP and developing REST APIs to connect frontend screens seamlessly with backend operations.',
    icon: <FiPackage />,
    tags: ['PHP', 'REST APIs', 'Server-side']
  },
  {
    no: '04',
    title: 'Version Control & Git',
    description: 'Tracking code changes, managing repository branches, and safely merging features using Git for clean and organized collaboration.',
    icon: <FiBarChart2 />,
    tags: ['Git', 'Branching', 'Merging']
  }
];

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