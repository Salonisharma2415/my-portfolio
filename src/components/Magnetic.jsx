import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function Magnetic({ children }) {
  const [hoverAvailable, setHoverAvailable] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setHoverAvailable(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  if (!hoverAvailable || prefersReducedMotion) return children
  const move = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setPosition({ x: (event.clientX - (rect.left + rect.width / 2)) * 0.18, y: (event.clientY - (rect.top + rect.height / 2)) * 0.18 })
  }

  return <motion.div onMouseMove={move} onMouseLeave={() => setPosition({ x: 0, y: 0 })} animate={position} transition={{ type: 'spring', stiffness: 220, damping: 18 }} style={{ display: 'inline-block' }}>{children}</motion.div>
}
