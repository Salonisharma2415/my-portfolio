import Reveal from './Reveal'

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <Reveal>
          <p className="tag">LET'S BUILD SOMETHING USEFUL</p>
          <h2 className="contact-big">Have a workflow to <span>improve?</span></h2>
          <p className="sub contact-sub">From <strong>hospital workflows</strong> to <strong>property and store operations</strong>, I build software that brings every step into focus.</p>
        </Reveal>
        <Reveal delay={0.2}>
          <a href="#projects" className="btn primary">Explore my work <span aria-hidden="true">↗</span></a>
        </Reveal>
        <p className="copy">© {new Date().getFullYear()} Saloni Sharma</p>
      </div>
    </section>
  )
}
