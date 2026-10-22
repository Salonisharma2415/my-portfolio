import { FaPhp, FaJs, FaBootstrap, FaCss3Alt, FaDocker, FaGitAlt } from 'react-icons/fa'
import { SiJquery, SiMysql } from 'react-icons/si'
import Reveal from './Reveal'

const technologies = [
  { icon: <FaPhp />, name: 'PHP', group: 'Backend' },
  { icon: <FaJs />, name: 'JavaScript', group: 'Frontend' },
  { icon: <SiMysql />, name: 'MySQL', group: 'Database' },
  { icon: <SiJquery />, name: 'jQuery', group: 'Frontend' },
  { icon: <FaBootstrap />, name: 'Bootstrap', group: 'UI' },
  { icon: <FaCss3Alt />, name: 'CSS3', group: 'UI' },
  { icon: <FaDocker />, name: 'Docker', group: 'Tools' },
  { icon: <FaGitAlt />, name: 'Git', group: 'Tools' },
]

export default function Skills() {
  return (
    <section id="skills" className="tech-section">
      <div className="container">
        <Reveal>
          <div className="tech-heading">
            <div><p className="tag">MY TOOLKIT</p><h2 className="section-title">The tools behind <span>the work.</span></h2></div>
            <p className="tech-intro">A practical stack I’ve used to build responsive interfaces, business logic and data driven applications.</p>
          </div>
        </Reveal>
        <div className="tech-showcase">
          <div className="tech-list-panel">
            <div className="tech-list-caption"><span>TECHNOLOGIES I USE</span><span>{String(technologies.length).padStart(2, '0')}</span></div>
            <div className="tech-list">
              {technologies.map((tech, index) => (
                <Reveal key={tech.name} delay={index * 0.035} y={15}>
                  <div className="tech-row"><span className="tech-row-no">0{index + 1}</span><span className="tech-row-icon">{tech.icon}</span><strong>{tech.name}</strong><small>{tech.group}</small><span className="tech-row-mark" aria-hidden="true">↗</span></div>
                </Reveal>
              ))}
            </div>
            <div className="tech-note"><span>+</span> REST APIs · GitHub · Responsive UI</div>
          </div>
        </div>
      </div>
    </section>
  )
}
