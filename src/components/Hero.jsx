import DeveloperWorkspace from './DeveloperWorkspace'

const technologies = ['PHP', 'JavaScript', 'MySQL', 'jQuery', 'REST APIs']

export default function Hero() {
  return (
    <section id="home" className="hero hero-cover-section">
      <div className="container hero-container">
        <div className="hero-cover">
          <div className="hero-copy">
            <p className="hero-cover-eyebrow">Saloni Sharma <span>—</span> Software developer</p>
            <h1>
              <span className="hero-title-line">I BUILD</span>
              <span className="hero-title-line hero-title-line-second"><em className="grad">SOFTWARE.</em></span>
            </h1>
            <p className="hero-cover-intro">
              I build PHP and JavaScript systems for healthcare, property management and store operations.
            </p>
            <div className="hero-cover-actions">
              <a href="#projects" className="btn primary">Explore my work <span aria-hidden="true">↓</span></a>
            </div>
            <div className="hero-cover-tech" aria-label="Technologies">
              {technologies.map((technology) => <span key={technology}>{technology}</span>)}
            </div>
          </div>
          <DeveloperWorkspace />
        </div>
      </div>
    </section>
  )
}
