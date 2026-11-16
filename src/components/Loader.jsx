import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const phases = ['Waking up the workspace', 'Preparing the experience', 'Connecting the pieces', 'Almost ready', 'Welcome']
const loadingSteps = ['Preparing the interface', 'Building the experience', 'Finishing the portfolio']

export default function Loader({ onDone }) {
  const [count, setCount] = useState(0)
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 600px)').matches)

  useEffect(() => {
    const query = window.matchMedia('(max-width: 600px)')
    const update = () => setIsMobile(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const step = reducedMotion ? 4 : 2
    const id = setInterval(() => setCount((value) => Math.min(100, value + step)), 24)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (count === 100) {
      const finished = setTimeout(onDone, 1050)
      return () => clearTimeout(finished)
    }
  }, [count, onDone])



  const phase = isMobile ? 'Welcome' : phases[Math.min(Math.floor(count / 25), phases.length - 1)]

  return (
    <motion.div className="l3" exit={isMobile ? { opacity: 0 } : { opacity: 0, scale: 1.025, filter: 'blur(8px)' }} transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}>
      <div className="l3-canvas" aria-hidden="true" />
      <motion.div className="l3-top" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }}>
        <span className="l3-name">Saloni Sharma<span>.</span></span>
        <span className="l3-kicker">SOFTWARE DEVELOPER · PORTFOLIO</span>
      </motion.div>
      <div className="l3-center-wrap">
        <motion.div className="l3-center-mark" initial={{ opacity: 0, scale: 0.75, rotate: -25 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 0.25, duration: 1, ease: [0.22, 1, 0.36, 1] }}>
          <span>S</span><i /><i />
        </motion.div>
      </div>
      <div className="l3-bottom">
        <div className="l3-status"><span className="loader-pulse" />{phase}</div>
        <div className="l3-process" aria-label="Portfolio loading progress">
          {loadingSteps.map((step, index) => {
            const complete = count >= (index + 1) * 34
            const current = !complete && count >= index * 34
            return (
              <div className={`l3-process-row ${complete ? 'complete' : ''} ${current ? 'current' : ''}`} key={step}>
                <span className="l3-step-indicator">{complete ? '✓' : <i />}</span>
                <span>{step}</span>
                <span className="l3-step-state">{complete ? 'DONE' : current ? 'IN PROGRESS' : 'WAITING'}</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="l3-track"><motion.div className="l3-line" animate={{ width: `${count}%` }} transition={{ ease: 'linear', duration: 0.12 }} /></div>
    </motion.div>
  )
}
