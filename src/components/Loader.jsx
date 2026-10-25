import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const phases = ['Waking up the workspace', 'Preparing the experience', 'Connecting the pieces', 'Almost ready', 'Welcome']
const loadingSteps = ['Preparing the interface', 'Building the experience', 'Finishing the portfolio']

export default function Loader({ onDone }) {
  const mountRef = useRef(null)
  const progress = useRef(0)
  const exitAt = useRef(0)
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
    progress.current = count
    if (count === 100) {
      const started = setTimeout(() => { exitAt.current = performance.now() }, 250)
      const finished = setTimeout(onDone, 1050)
      return () => { clearTimeout(started); clearTimeout(finished) }
    }
  }, [count, onDone])

  useEffect(() => {
    const el = mountRef.current
    if (!el) return undefined

    let disposed = false
    let cleanupScene = () => {}
    import('three').then((THREE) => {
    if (disposed) return
    let width = el.clientWidth
    let height = el.clientHeight
    const isMobile = window.matchMedia('(max-width: 600px)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const particleCount = isMobile ? 1600 : 3600
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100)
    camera.position.z = 8

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true, powerPreference: 'low-power' })
    } catch {
      return undefined
    }
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.5))
    el.appendChild(renderer.domElement)

    const start = new Float32Array(particleCount * 3)
    const target = new Float32Array(particleCount * 3)
    const position = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const violet = new THREE.Color('#9c78ff')
    const cyan = new THREE.Color('#63d7d3')
    const mixed = new THREE.Color()

    for (let i = 0; i < particleCount; i++) {
      const k = i * 3
      const radius = 6 + Math.random() * 10
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      start[k] = radius * Math.sin(phi) * Math.cos(theta)
      start[k + 1] = radius * Math.sin(phi) * Math.sin(theta)
      start[k + 2] = radius * Math.cos(phi)

      const u = (i / particleCount) * Math.PI * 2
      const knotRadius = Math.cos(3 * u) + 2
      target[k] = (knotRadius * Math.cos(2 * u) + (Math.random() - 0.5) * 0.7) * 1.1
      target[k + 1] = (knotRadius * Math.sin(2 * u) + (Math.random() - 0.5) * 0.7) * 1.1
      target[k + 2] = (-Math.sin(3 * u) + (Math.random() - 0.5) * 0.7) * 1.1
      mixed.lerpColors(violet, cyan, i / particleCount)
      colors[k] = mixed.r
      colors[k + 1] = mixed.g
      colors[k + 2] = mixed.b
    }
    position.set(start)

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(position, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const material = new THREE.PointsMaterial({ size: isMobile ? 0.065 : 0.05, vertexColors: true, transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending })
    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    const clock = new THREE.Clock()
    let smooth = 0
    let frame
    const tick = () => {
      if (reducedMotion) {
        position.set(target)
        geometry.attributes.position.needsUpdate = true
        renderer.render(scene, camera)
        return
      }
      const time = clock.getElapsedTime()
      smooth += (progress.current / 100 - smooth) * 0.065
      const eased = 1 - Math.pow(1 - smooth, 3)
      for (let i = 0; i < particleCount; i++) {
        const k = i * 3
        const shimmer = Math.sin(time * 1.5 + i * 0.7) * 0.025
        position[k] = start[k] + (target[k] - start[k]) * eased + shimmer
        position[k + 1] = start[k + 1] + (target[k + 1] - start[k + 1]) * eased + shimmer
        position[k + 2] = start[k + 2] + (target[k + 2] - start[k + 2]) * eased
      }
      geometry.attributes.position.needsUpdate = true
      particles.rotation.y = time * 0.28
      particles.rotation.x = Math.sin(time * 0.35) * 0.22
      if (exitAt.current && !isMobile) camera.position.z = 8 - Math.min(1, (performance.now() - exitAt.current) / 700) * 2.2
      renderer.render(scene, camera)
      frame = requestAnimationFrame(tick)
    }
    tick()

    const resize = () => {
      width = el.clientWidth
      height = el.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', resize)
    cleanupScene = () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement)
    }
    }).catch(() => {})
    return () => {
      disposed = true
      cleanupScene()
    }
  }, [isMobile])

  const phase = isMobile ? 'Welcome' : phases[Math.min(Math.floor(count / 25), phases.length - 1)]

  return (
    <motion.div className="l3" exit={isMobile ? { opacity: 0 } : { opacity: 0, scale: 1.025, filter: 'blur(8px)' }} transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}>
      <div ref={mountRef} className="l3-canvas" />
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
