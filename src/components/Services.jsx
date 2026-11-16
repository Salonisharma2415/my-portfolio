import { FiActivity, FiHome, FiPackage, FiLayers, FiShuffle } from 'react-icons/fi'
import Reveal from './Reveal'

const services = [
  {
    no: '01',
    title: 'Database Architecture',
    description: 'Structuring relational data and operational records for applications and business workflows in MySQL and PostgreSQL.',
    icon: <FiActivity />,
    tags: ['MySQL', 'Schemas', 'Queries']
  },
  {
    no: '02',
    title: 'Full-Stack Development',
    description: 'Building application features across PHP backends, relational data, and responsive interfaces with JavaScript, React, jQuery, and Bootstrap.',
    icon: <FiHome />,
    tags: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap']
  },
  {
    no: '03',
    title: 'Backend Development',
    description: 'Writing server-side logic in PHP with CakePHP 5 or Laravel, and developing REST APIs for application workflows.',
    icon: <FiPackage />,
    tags: ['PHP', 'CakePHP 5', 'Laravel']
  },
  {
    no: '04',
    title: 'REST API Development',
    description: 'Building API endpoints and connecting application interfaces with server-side operations.',
    icon: <FiShuffle />,
    tags: ['REST APIs', 'PHP', 'Integration']
  },
  {
    no: '05',
    title: 'Business Workflow Automation',
    description: 'Turning repeatable operational steps into connected digital workflows for healthcare, inventory, and business operations.',
    icon: <FiActivity />,
    tags: ['Healthcare', 'Inventory', 'Operations']
  },
  {
    no: '06',
    title: 'System Integration',
    description: 'Connecting application modules and data flows so information can move between related parts of a system.',
    icon: <FiLayers />,
    tags: ['APIs', 'Application modules', 'Data flows']
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