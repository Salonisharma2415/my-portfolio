import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Colors: yahan se easily badal sakti ho
const COLORS = {
  globe: '#a5b4fc',      // lavender-blue wireframe lines
  ring: '#7c6cff',       // glowing blue-violet ring
  ringSoft: '#a78bfa',   // second thin ring
  core: '#9b8cff',       // purple core
}

// latitude/longitude lines se globe banata hai (image jaisa mesh look)
function createGlobeLines(radius, lat = 9, lon = 14, segments = 64) {
  const group = new THREE.Group()
  const material = new THREE.LineBasicMaterial({
    color: COLORS.globe,
    transparent: true,
    opacity: 0.5,
  })
  const geometries = []

  // latitude circles
  for (let i = 1; i < lat; i++) {
    const phi = (i / lat) * Math.PI
    const r = Math.sin(phi) * radius
    const y = Math.cos(phi) * radius
    const points = []
    for (let s = 0; s <= segments; s++) {
      const a = (s / segments) * Math.PI * 2
      points.push(new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r))
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points)
    geometries.push(geo)
    group.add(new THREE.Line(geo, material))
  }

  // longitude circles
  for (let i = 0; i < lon; i++) {
    const theta = (i / lon) * Math.PI
    const points = []
    for (let s = 0; s <= segments; s++) {
      const a = (s / segments) * Math.PI * 2
      points.push(
        new THREE.Vector3(
          Math.cos(a) * radius * Math.cos(theta),
          Math.sin(a) * radius,
          Math.cos(a) * radius * Math.sin(theta),
        ),
      )
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points)
    geometries.push(geo)
    group.add(new THREE.Line(geo, material))
  }

  return { group, material, geometries }
}

export default function Hero3D({ simple = false }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
    } catch {
      return undefined
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 20)
    camera.position.z = 5.2

    const group = new THREE.Group()
    scene.add(group)

    // 1) Globe (lavender wireframe)
    const globe = createGlobeLines(1.0, simple ? 7 : 9, simple ? 10 : 14, simple ? 40 : 64)
    group.add(globe.group)

    // 2) Glowing core
    const coreMaterial = new THREE.MeshBasicMaterial({ color: COLORS.core })
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 24), coreMaterial)
    group.add(core)

    const coreGlowMaterial = new THREE.MeshBasicMaterial({
      color: COLORS.core,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const coreGlow = new THREE.Mesh(new THREE.SphereGeometry(0.42, 24, 24), coreGlowMaterial)
    group.add(coreGlow)

    // 3) Main glowing ring (tilted, goes in front and behind the globe)
    const ringGroup = new THREE.Group()
    ringGroup.rotation.x = Math.PI * 0.42
    ringGroup.rotation.y = Math.PI * 0.08
    group.add(ringGroup)

    const ringCoreMaterial = new THREE.MeshBasicMaterial({
      color: COLORS.ring,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const ringCore = new THREE.Mesh(new THREE.TorusGeometry(1.55, 0.022, 12, 160), ringCoreMaterial)
    ringGroup.add(ringCore)

    // glow layers (wider + fainter)
    const ringGlow1Material = new THREE.MeshBasicMaterial({
      color: COLORS.ring,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const ringGlow1 = new THREE.Mesh(new THREE.TorusGeometry(1.55, 0.07, 12, 160), ringGlow1Material)
    ringGroup.add(ringGlow1)

    const ringGlow2Material = new THREE.MeshBasicMaterial({
      color: COLORS.ring,
      transparent: true,
      opacity: 0.09,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const ringGlow2 = new THREE.Mesh(new THREE.TorusGeometry(1.55, 0.16, 12, 160), ringGlow2Material)
    ringGroup.add(ringGlow2)

    // 4) Thin secondary ring
    const ring2Material = new THREE.MeshBasicMaterial({
      color: COLORS.ringSoft,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    })
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.85, 0.006, 6, 160), ring2Material)
    ring2.rotation.x = Math.PI * 0.5
    ring2.rotation.y = Math.PI * 0.22
    group.add(ring2)

    renderer.setPixelRatio(simple ? 1 : Math.min(window.devicePixelRatio || 1, 1.5))
    renderer.setClearColor(0x000000, 0)
    mount.replaceChildren(renderer.domElement)

    const resize = () => {
      const size = Math.max(1, Math.min(mount.clientWidth, mount.clientHeight))
      renderer.setSize(size, size, false)
      camera.aspect = 1
      camera.updateProjectionMatrix()
      if (simple) renderer.render(scene, camera)
    }
    const observer = new ResizeObserver(resize)
    observer.observe(mount)
    resize()

    let frame = 0
    const animate = () => {
      frame = window.requestAnimationFrame(animate)
      const t = performance.now()

      // subtle movement
      globe.group.rotation.y += 0.0022
      ringGroup.rotation.z += 0.0035
      ring2.rotation.z -= 0.0018
      group.rotation.x = Math.sin(t * 0.00025) * 0.1
      group.rotation.y = Math.sin(t * 0.0002) * 0.12

      // core ki soft pulse
      const pulse = 1 + Math.sin(t * 0.0016) * 0.06
      coreGlow.scale.setScalar(pulse)

      renderer.render(scene, camera)
    }
    if (!simple) animate()
    else renderer.render(scene, camera)

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      globe.geometries.forEach((g) => g.dispose())
      globe.material.dispose()
      core.geometry.dispose()
      coreMaterial.dispose()
      coreGlow.geometry.dispose()
      coreGlowMaterial.dispose()
      ringCore.geometry.dispose()
      ringCoreMaterial.dispose()
      ringGlow1.geometry.dispose()
      ringGlow1Material.dispose()
      ringGlow2.geometry.dispose()
      ringGlow2Material.dispose()
      ring2.geometry.dispose()
      ring2Material.dispose()
      renderer.dispose()
      mount.replaceChildren()
    }
  }, [simple])

  return <div ref={mountRef} className="hero-3d" aria-hidden="true" />
}
