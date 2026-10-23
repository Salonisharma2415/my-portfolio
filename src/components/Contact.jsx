import { useState } from 'react'
import Reveal from './Reveal'

const formEndpoint = import.meta.env.VITE_FORM_ENDPOINT
const linkedInUrl = import.meta.env.VITE_LINKEDIN_URL
const CURRENT_YEAR = new Date().getFullYear()

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  const submitContact = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    setStatus('sending')
    setMessage('')
    if (!formEndpoint) {
      setStatus('error')
      setMessage('The contact form is not connected yet. Please email me directly.')
      return
    }
    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        body: new FormData(event.currentTarget),
        headers: { Accept: 'application/json' },
      })
      if (!response.ok) throw new Error('The form service returned an error.')
      form.reset()
      setStatus('success')
      setMessage('Thanks for reaching out. I’ll get back to you soon.')
    } catch {
      setStatus('error')
      setMessage('Your message could not be sent. Please email me directly instead.')
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <Reveal>
          <p className="tag">CONTACT / OPEN TO A GOOD CONVERSATION</p>
          <h2 className="contact-big">LET’S <span>TALK.</span></h2>
          <p className="sub contact-sub">From <strong>hospital workflows</strong> to <strong>property and store operations</strong>, I build software that brings every step into focus.</p>
        </Reveal>

        <div className="contact-content-grid">
          <Reveal>
            <form className="contact-form" onSubmit={submitContact}>
              <label htmlFor="contact-name">Name</label>
              <input id="contact-name" name="name" type="text" autoComplete="name" minLength="2" maxLength="100" required />
              <label htmlFor="contact-email">Email</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" maxLength="254" required />
              <label htmlFor="contact-message">Message</label>
              <textarea id="contact-message" name="message" rows="5" minLength="10" maxLength="5000" required />
              <button type="submit" className="btn primary contact-button" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send message'} <span aria-hidden="true">↗</span></button>
              <p className={`contact-form-status ${status}`} aria-live="polite" role="status">{message}</p>
            </form>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="contact-direct">
              <p className="tag">OR REACH ME DIRECTLY</p>
              <a href="mailto:salonisharma58888@gmail.com">salonisharma58888@gmail.com <span aria-hidden="true">↗</span></a>
              <a href="https://github.com/Salonisharma2415" target="_blank" rel="noreferrer">GitHub · Salonisharma2415 <span aria-hidden="true">↗</span></a>
              {linkedInUrl ? <a href={linkedInUrl} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a> : <span className="contact-link-placeholder">LinkedIn · profile link to add</span>}
              <a className="btn resume-button" href="/resume.pdf" download>Download Resume <span aria-hidden="true">↓</span></a>
            </div>
          </Reveal>
        </div>
        <p className="copy">© {CURRENT_YEAR} Saloni Sharma</p>
      </div>
    </section>
  )
}
