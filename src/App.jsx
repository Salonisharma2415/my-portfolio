import { useState, useEffect } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Services from './components/Services'
import Contact from './components/Contact'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : 'auto'
  }, [loading])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {loading && <Loader onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Cursor />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Services />
            <Contact />
          </main>
        </>
      )}
    </MotionConfig>
  )
}
