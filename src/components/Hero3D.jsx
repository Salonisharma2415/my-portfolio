import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Hero3D() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' })
    } catch {
      return undefined
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 20)
    camera.position.z = 5
    const group = new THREE.Group()
    scene.add(group)

    const knotGeometry = new THREE.TorusKnotGeometry(0.88, 0.018, 140, 6, 2, 3)
    const knotMaterial = new THREE.MeshBasicMaterial({ color: '#d7d7d7', wireframe: true, transparent: true, opacity: 0.58 })
    const knot = new THREE.Mesh(knotGeometry, knotMaterial)
    group.add(knot)

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.43, 1),
      new THREE.MeshBasicMaterial({ color: '#f1f1f1', wireframe: true, transparent: true, opacity: 0.72 }),
    )
    group.add(core)

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.38, 0.006, 4, 120),
      new THREE.MeshBasicMaterial({ color: '#888888', transparent: true, opacity: 0.6 }),
    )
    ring.rotation.x = Math.PI * 0.37
    group.add(ring)

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25))
    renderer.setClearColor(0x000000, 0)
    mount.replaceChildren(renderer.domElement)

    const resize = () => {
      const size = Math.max(1, Math.min(mount.clientWidth, mount.clientHeight))
      renderer.setSize(size, size, false)
      camera.aspect = 1
      camera.updateProjectionMatrix()
    }
    const observer = new ResizeObserver(resize)
    observer.observe(mount)
    resize()

    let frame = 0
    const animate = () => {
      frame = window.requestAnimationFrame(animate)
      group.rotation.y += 0.003
      group.rotation.x = Math.sin(performance.now() * 0.00025) * 0.12
      knot.rotation.z -= 0.001
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      knotGeometry.dispose()
      knotMaterial.dispose()
      core.geometry.dispose()
      core.material.dispose()
      ring.geometry.dispose()
      ring.material.dispose()
      renderer.dispose()
      mount.replaceChildren()
    }
  }, [])

  return <div ref={mountRef} className="hero-3d" aria-hidden="true" />
}
