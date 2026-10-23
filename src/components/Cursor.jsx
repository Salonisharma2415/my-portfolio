import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

export default function Cursor() {
  const [desktopPointer, setDesktopPointer] = useState(false)
  const reducedMotion = useReducedMotion()
  const x = useMotionValue(-300)
  const y = useMotionValue(-300)
  const sx = useSpring(x, { stiffness: 100, damping: 20 })
  const sy = useSpring(y, { stiffness: 100, damping: 20 })

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setDesktopPointer(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!desktopPointer || reducedMotion) return undefined
    const move = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y, desktopPointer, reducedMotion])

  if (!desktopPointer || reducedMotion) return null
  return <motion.div className="glow" style={{ x: sx, y: sy }} aria-hidden="true" />
}
