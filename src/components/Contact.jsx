import Reveal from './Reveal'

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <Reveal>
          <p className="tag">CONTACT / OPEN TO A GOOD CONVERSATION</p>
          <h2 className="contact-big">LET’S <span>TALK.</span></h2>
          <p className="sub contact-sub">From <strong>hospital workflows</strong> to <strong>property and store operations</strong>, I build software that brings every step into focus.</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="contact-actions">
            <a href="mailto:salonisharma58888@gmail.com" className="btn primary contact-button">Email me <span aria-hidden="true">↗</span></a>
            <div className="contact-socials" aria-label="Social profiles">
              <a href="https://github.com/Salonisharma2415" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
              <span className="contact-social-placeholder" aria-label="LinkedIn profile link to be added">LinkedIn <small>link to add</small></span>
            </div>
          </div>
        </Reveal>
        <p className="copy">© {new Date().getFullYear()} Saloni Sharma</p>
      </div>
    </section>
  )
}
