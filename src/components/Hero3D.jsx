import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const COLORS = {
  navy: '#121b31',
  navyLight: '#1c2943',
  purple: '#9277ff',
  blue: '#6caaff',
  cyan: '#64d5e2',
  skin: '#d5a68f',
  hair: '#17182a',
  hoodie: '#322e59',
}

function material(color, options = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: options.roughness ?? 0.48,
    metalness: options.metalness ?? 0.16,
    emissive: options.emissive ?? '#000000',
    emissiveIntensity: options.emissiveIntensity ?? 0,
    transparent: options.transparent ?? false,
    opacity: options.opacity ?? 1,
  })
}

function addBox(parent, size, position, color, options = {}) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material(color, options))
  mesh.position.set(...position)
  mesh.castShadow = true
  mesh.receiveShadow = true
  parent.add(mesh)
  return mesh
}

function addSphere(parent, radius, position, color, scale = [1, 1, 1], options = {}) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 32, 24), material(color, options))
  mesh.position.set(...position)
  mesh.scale.set(...scale)
  mesh.castShadow = true
  mesh.receiveShadow = true
  parent.add(mesh)
  return mesh
}

function addTube(parent, points, radius, color) {
  const curve = new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(...point)))
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, radius, 12, false), material(color, { roughness: 0.55 }))
  mesh.castShadow = true
  mesh.receiveShadow = true
  parent.add(mesh)
  return mesh
}

function makeCodeTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 1200
  canvas.height = 720
  const context = canvas.getContext('2d')
  context.fillStyle = '#0b1221'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = '#111c31'
  context.fillRect(0, 0, canvas.width, 74)
  context.fillStyle = '#8b79ef'
  context.fillRect(34, 29, 18, 18)
  context.fillStyle = '#dce7fa'
  context.font = '600 22px Segoe UI, sans-serif'
  context.fillText('PatientsController.php', 72, 43)
  context.fillStyle = '#8293b1'
  context.font = '18px Segoe UI, sans-serif'
  context.fillText('routes.php', 385, 43)

  context.fillStyle = '#111a2c'
  context.fillRect(0, 74, 180, 646)
  context.fillStyle = '#91a1bd'
  context.font = '600 17px Segoe UI, sans-serif'
  context.fillText('EXPLORER', 24, 112)
  context.font = '17px Consolas, monospace'
  const files = ['⌄  API', '   ⌄ Controllers', '      ◉ PatientsController.php', '      ◉ AppController.php', '   ⌄ Models', '      ◈ PatientsTable.php', '   ◇ routes.php']
  files.forEach((file, index) => {
    context.fillStyle = index === 2 ? '#d7e3f7' : '#8290aa'
    context.fillText(file, 22, 158 + index * 42)
  })

  const lines = [
    ['<?php', '#c7a4ff'],
    ['declare(strict_types: 1);', '#8ec9ec'],
    ['namespace App\\Controller\\Api;', '#c7a4ff'],
    ['', '#ccd6e7'],
    ['class PatientsController extends AppController', '#87d9be'],
    ['{', '#cbd6e8'],
    ['  public function view(string $id): Response', '#c7a4ff'],
    ['  {', '#cbd6e8'],
    ["    $patient = $this->fetchTable('Patients')", '#e6bd88'],
    ['      ->find()', '#8ec9ec'],
    ["      ->contain(['LabResults'])", '#8ec9ec'],
    ["      ->where(['Patients.id' => $id])", '#8ec9ec'],
    ['      ->firstOrFail();', '#8ec9ec'],
    ['', '#ccd6e7'],
    ['    return $this->response', '#c7a4ff'],
    ["      ->withType('application/json')", '#8ec9ec'],
    ['      ->withStringBody(json_encode([', '#8ec9ec'],
    ["        'success' => true,", '#e6bd88'],
    ["        'data' => $patient,", '#e6bd88'],
    ['      ]));', '#8ec9ec'],
    ['  }', '#cbd6e8'],
    ['}', '#cbd6e8'],
  ]
  context.font = '20px Consolas, monospace'
  lines.forEach(([line, color], index) => {
    const y = 126 + index * 26
    context.fillStyle = '#53627d'
    context.textAlign = 'right'
    context.fillText(String(index + 1).padStart(2, '0'), 222, y)
    context.textAlign = 'left'
    context.fillStyle = color
    context.fillText(line, 250, y)
  })
  context.fillStyle = '#8fb2ff'
  context.fillRect(426, 126 + 22 * 26 - 18, 3, 20)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4
  return texture
}

function makeBadgeTexture(label) {
  const canvas = document.createElement('canvas')
  canvas.width = 384
  canvas.height = 144
  const context = canvas.getContext('2d')
  context.fillStyle = 'rgba(21, 31, 54, .96)'
  context.beginPath()
  context.roundRect(5, 5, 374, 134, 32)
  context.fill()
  context.strokeStyle = 'rgba(143, 178, 255, .72)'
  context.lineWidth = 5
  context.stroke()
  context.fillStyle = '#dce7fa'
  context.font = '600 49px Segoe UI, sans-serif'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText(label, 192, 74)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function addBadge(scene, label, position, accent, index) {
  const group = new THREE.Group()
  group.position.set(...position)
  group.userData.floatPhase = index * 1.7
  group.userData.baseY = position[1]
  scene.add(group)

  const plate = new THREE.Mesh(
    new THREE.BoxGeometry(0.86, 0.34, 0.055),
    material('#1b2744', { metalness: 0.35, roughness: 0.3, transparent: true, opacity: 0.84, emissive: accent, emissiveIntensity: 0.12 }),
  )
  plate.castShadow = true
  group.add(plate)
  const labelPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(0.82, 0.31),
    new THREE.MeshBasicMaterial({ map: makeBadgeTexture(label), transparent: true, depthWrite: false }),
  )
  labelPlane.position.z = 0.032
  group.add(labelPlane)
  return group
}

function addSphereWorld(scene) {
  const group = new THREE.Group()
  group.position.set(1.55, 3.12, -1.05)
  scene.add(group)

  const shell = new THREE.Mesh(
    new THREE.SphereGeometry(0.77, 48, 36),
    new THREE.MeshPhysicalMaterial({ color: '#5d78d9', metalness: 0.2, roughness: 0.12, transparent: true, opacity: 0.17, transmission: 0.35, thickness: 0.5 }),
  )
  group.add(shell)
  const wire = new THREE.Mesh(
    new THREE.SphereGeometry(0.79, 18, 14),
    new THREE.MeshBasicMaterial({ color: '#8fa8ff', wireframe: true, transparent: true, opacity: 0.22 }),
  )
  group.add(wire)
  const core = addSphere(group, 0.25, [0, 0, 0], '#835fff', [1, 1, 1], { emissive: '#795aff', emissiveIntensity: 2.1, roughness: 0.22 })
  const inner = addSphere(group, 0.12, [0.1, 0.08, 0.13], '#9dc7ff', [1, 1, 1], { emissive: '#86baff', emissiveIntensity: 2.8, roughness: 0.14 })
  const ringOne = new THREE.Mesh(new THREE.TorusGeometry(1.06, 0.018, 8, 96), material('#a493ff', { emissive: '#765aff', emissiveIntensity: 1.1, metalness: 0.55, roughness: 0.22 }))
  ringOne.rotation.set(0.8, 0.2, -0.35)
  group.add(ringOne)
  const ringTwo = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.009, 8, 96), material('#64d5e2', { emissive: '#39a9d4', emissiveIntensity: 0.8, metalness: 0.55, roughness: 0.25 }))
  ringTwo.rotation.set(1.1, -0.5, 0.25)
  group.add(ringTwo)
  return { group, core, inner, ringOne, ringTwo }
}

function addDesk(scene) {
  const desk = new THREE.Group()
  desk.position.set(0, 0, 0)
  scene.add(desk)
  addBox(desk, [4.25, 0.15, 1.85], [-0.05, 1.16, 0.18], '#1b2237', { metalness: 0.42, roughness: 0.32 })
  addBox(desk, [4.05, 0.035, 1.68], [-0.05, 1.255, 0.18], '#2b3452', { metalness: 0.4, roughness: 0.29, emissive: '#131a36', emissiveIntensity: 0.15 })
  for (const x of [-1.78, 1.72]) {
    for (const z of [-0.53, 0.83]) addBox(desk, [0.11, 1.05, 0.11], [x, 0.59, z], '#202a43', { metalness: 0.5, roughness: 0.36 })
  }

  // Monitor housing, screen texture, stand and weighted foot.
  const monitor = new THREE.Group()
  monitor.position.set(0.42, 2.15, -0.46)
  scene.add(monitor)
  addBox(monitor, [2.35, 1.48, 0.11], [0, 0, 0], '#141b2c', { metalness: 0.45, roughness: 0.26 })
  const screenTexture = makeCodeTexture()
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(2.19, 1.32), new THREE.MeshBasicMaterial({ map: screenTexture }))
  screen.position.set(0, 0.015, 0.058)
  monitor.add(screen)
  addBox(monitor, [0.13, 0.3, 0.09], [0, -0.87, -0.02], '#303b59', { metalness: 0.55, roughness: 0.28 })
  addBox(monitor, [0.72, 0.07, 0.42], [0, -1.04, 0.03], '#293654', { metalness: 0.55, roughness: 0.28 })
  const cursor = addBox(monitor, [0.012, 0.11, 0.012], [-0.58, -0.63, 0.064], '#a8c3ff', { emissive: '#779cff', emissiveIntensity: 1.2, roughness: 0.2 })

  // Keyboard and mouse give the work surface a grounded scale.
  addBox(desk, [1.28, 0.055, 0.38], [-0.48, 1.31, 0.78], '#242e48', { metalness: 0.38, roughness: 0.38 })
  for (let row = 0; row < 4; row += 1) {
    for (let col = 0; col < 13; col += 1) {
      addBox(desk, [0.064, 0.012, 0.045], [-1.06 + col * 0.096, 1.345, 0.65 + row * 0.075], '#53617c', { roughness: 0.62 })
    }
  }
  const mouse = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 12), material('#303b58', { roughness: 0.35, metalness: 0.22 }))
  mouse.scale.set(0.78, 0.42, 1.45)
  mouse.position.set(0.45, 1.34, 0.77)
  desk.add(mouse)
  return { cursor }
}

function addChair(scene) {
  const chair = new THREE.Group()
  chair.position.set(-1.48, 0, -0.25)
  chair.rotation.y = -0.1
  scene.add(chair)
  addBox(chair, [0.86, 0.88, 0.22], [0, 1.47, -0.42], '#252844', { roughness: 0.72 })
  addBox(chair, [0.76, 0.18, 0.72], [0, 0.99, 0.03], '#323654', { roughness: 0.65 })
  addBox(chair, [0.12, 0.12, 0.12], [0, 0.83, -0.1], '#4b5875', { metalness: 0.55 })
  addBox(chair, [0.09, 0.63, 0.09], [0, 0.47, -0.1], '#323d59', { metalness: 0.5 })
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.08, 20), material('#303a56', { metalness: 0.55, roughness: 0.32 }))
  hub.position.set(0, 0.15, -0.1)
  chair.add(hub)
  for (let i = 0; i < 5; i += 1) {
    const angle = (i / 5) * Math.PI * 2
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.055, 0.075), material('#303a56', { metalness: 0.58, roughness: 0.3 }))
    leg.position.set(Math.cos(angle) * 0.26, 0.11, -0.1 + Math.sin(angle) * 0.26)
    leg.rotation.y = angle
    chair.add(leg)
    const wheel = new THREE.Mesh(new THREE.SphereGeometry(0.075, 12, 10), material('#141a2a', { roughness: 0.48 }))
    wheel.scale.set(1.3, 0.72, 1)
    wheel.position.set(Math.cos(angle) * 0.48, 0.08, -0.1 + Math.sin(angle) * 0.48)
    chair.add(wheel)
  }
}

function addDeveloper(scene) {
  const avatar = new THREE.Group()
  avatar.position.set(-0.23, 0, 0.02)
  avatar.rotation.y = -0.16
  scene.add(avatar)

  // Relaxed seated posture, facing the viewer with a slight turn toward the screen.
  addSphere(avatar, 0.34, [-1.2, 0.98, 0.02], '#20263e', [1.02, 0.68, 0.88])
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.32, 0.58, 8, 20), material('#292747', { roughness: 0.78 }))
  torso.position.set(-1.17, 1.61, 0.06)
  torso.rotation.x = 0.12
  torso.rotation.z = -0.04
  torso.scale.set(1.02, 1, 0.82)
  torso.castShadow = true
  avatar.add(torso)
  // Narrow neck and soft shoulder line blend the head into the jacket.
  addSphere(avatar, 0.115, [-1.03, 2.03, 0.08], '#b98979', [0.78, 1.05, 0.78])
  addSphere(avatar, 0.31, [-1.17, 1.91, 0.02], '#302c50', [1.23, 0.52, 0.88])

  // Front-facing face framed by swept-back hair and balanced headset details.
  addSphere(avatar, 0.255, [-0.94, 2.39, 0.14], '#c99887', [0.88, 1.08, 0.9])
  addSphere(avatar, 0.277, [-0.98, 2.49, 0.035], '#171827', [1, 1, 0.98], { roughness: 0.42 })
  addSphere(avatar, 0.225, [-1.075, 2.25, -0.08], '#191927', [0.94, 1.42, 0.82], { roughness: 0.48 })
  addSphere(avatar, 0.16, [-0.87, 2.65, -0.055], '#211e35', [1.18, 0.72, 0.92], { roughness: 0.46 })
  const headphoneBand = new THREE.Mesh(new THREE.TorusGeometry(0.285, 0.026, 10, 40, Math.PI), material('#28334d', { metalness: 0.44, roughness: 0.34 }))
  headphoneBand.position.set(-0.96, 2.5, 0.12)
  headphoneBand.rotation.z = Math.PI
  avatar.add(headphoneBand)
  for (const [x, z] of [[-1.22, 0.12], [-0.69, 0.17]]) {
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.095, 0.075, 24), material('#232c49', { metalness: 0.35, roughness: 0.38 }))
    cup.rotation.z = Math.PI / 2
    cup.position.set(x, 2.42, z)
    avatar.add(cup)
    const accent = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.008, 8, 32), material('#66c9ee', { emissive: '#258bbf', emissiveIntensity: 0.42, metalness: 0.35, roughness: 0.34 }))
    accent.position.set(x + (x < -1 ? -0.045 : 0.045), 2.42, z)
    accent.rotation.y = Math.PI / 2
    avatar.add(accent)
  }

  // Tapered sleeves and forearms settle at the keyboard without sharp elbows.
  addTube(avatar, [[-1.45, 1.86, 0.06], [-1.25, 1.66, 0.32], [-0.98, 1.47, 0.57], [-0.54, 1.375, 0.78]], 0.093, '#37345d')
  addTube(avatar, [[-0.91, 1.86, 0.08], [-0.78, 1.66, 0.36], [-0.52, 1.46, 0.62], [-0.12, 1.375, 0.79]], 0.09, '#37345d')
  const hands = []
  for (const position of [[-0.54, 1.375, 0.78], [-0.12, 1.375, 0.79]]) {
    const hand = addSphere(avatar, 0.078, position, '#c99887', [1.18, 0.5, 0.78], { roughness: 0.66 })
    hand.userData.restY = position[1]
    hands.push(hand)
  }

  // Bent legs rest forward beneath the desk; lower legs remain softly foreshortened.
  addTube(avatar, [[-1.37, 0.95, 0.04], [-1.18, 0.75, 0.25], [-0.96, 0.51, 0.48], [-0.76, 0.39, 0.59]], 0.145, '#20253e')
  addTube(avatar, [[-0.98, 0.94, 0.03], [-0.78, 0.73, 0.31], [-0.59, 0.5, 0.53], [-0.38, 0.38, 0.61]], 0.14, '#222640')
  addSphere(avatar, 0.145, [-0.75, 0.31, 0.68], '#1b2137', [1.28, 0.52, 1.72])
  addSphere(avatar, 0.14, [-0.36, 0.3, 0.7], '#1b2137', [1.28, 0.52, 1.72])
  addChair(scene)
  return { avatar, hands }
}

function addParticles(scene) {
  const group = new THREE.Group()
  scene.add(group)
  for (let i = 0; i < 28; i += 1) {
    const angle = i * 2.399
    const radius = 1.3 + ((i * 7) % 9) * 0.14
    const x = 1.45 + Math.cos(angle) * radius
    const y = 2.65 + Math.sin(angle) * radius * 0.72
    const z = -0.8 + ((i % 5) - 2) * 0.14
    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(i % 4 === 0 ? 0.026 : 0.014, 8, 8),
      new THREE.MeshBasicMaterial({ color: i % 3 === 0 ? '#a793ff' : '#75c7ef', transparent: true, opacity: 0.55 }),
    )
    dot.position.set(x, y, z)
    group.add(dot)
  }
  return group
}

export default function Hero3D() {
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

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    renderer.setClearColor(0x0b0f17, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    mount.replaceChildren(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 30)
    camera.position.set(0.05, 2.9, 9.8)
    camera.lookAt(0.05, 1.95, 0)

    scene.add(new THREE.HemisphereLight('#bdcaff', '#101529', 2.1))
    const keyLight = new THREE.DirectionalLight('#d9e5ff', 3.1)
    keyLight.position.set(-3.5, 6, 5)
    keyLight.castShadow = true
    keyLight.shadow.mapSize.set(1024, 1024)
    scene.add(keyLight)
    const violetLight = new THREE.PointLight('#775cff', 16, 8)
    violetLight.position.set(2.6, 3.6, 1)
    scene.add(violetLight)
    const cyanLight = new THREE.PointLight('#3db8dc', 8, 7)
    cyanLight.position.set(-3.1, 2.4, 1.8)
    scene.add(cyanLight)

    const deskParts = addDesk(scene)
    const avatarParts = addDeveloper(scene)
    const sphereWorld = addSphereWorld(scene)
    addParticles(scene)

    const badges = [
      addBadge(scene, 'PHP', [0.55, 4.14, -0.34], '#997cff', 0),
      addBadge(scene, 'jQuery', [1.7, 4.04, -0.25], '#9277ff', 1),
      addBadge(scene, 'JavaScript', [2.69, 3.4, -0.22], '#e2c969', 2),
      addBadge(scene, 'MySQL', [2.72, 2.62, -0.22], '#67c8e4', 3),
      addBadge(scene, 'REST API', [0.75, 2.91, -0.52], '#8baaff', 4),
    ]

    const resize = () => {
      const width = Math.max(1, mount.clientWidth)
      const height = Math.max(1, mount.clientHeight)
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.render(scene, camera)
    }
    const observer = new ResizeObserver(resize)
    observer.observe(mount)
    resize()

    let frame = 0
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const animate = () => {
      frame = window.requestAnimationFrame(animate)
      const time = performance.now() * 0.001
      sphereWorld.group.rotation.y = Math.sin(time * 0.18) * 0.14
      sphereWorld.ringOne.rotation.z += 0.0017
      sphereWorld.ringTwo.rotation.z -= 0.0011
      sphereWorld.core.scale.setScalar(1 + Math.sin(time * 1.6) * 0.035)
      sphereWorld.inner.position.x = 0.1 + Math.sin(time * 0.6) * 0.08
      avatarParts.avatar.position.y = Math.sin(time * 1.2) * 0.012
      avatarParts.hands.forEach((hand, index) => {
        hand.position.y = hand.userData.restY + Math.max(0, Math.sin(time * 8 + index * Math.PI)) * 0.025
      })
      deskParts.cursor.visible = Math.floor(time * 2) % 2 === 0
      badges.forEach((badge) => {
        badge.position.y = badge.userData.baseY + Math.sin(time * 0.75 + badge.userData.floatPhase) * 0.035
        badge.rotation.y = Math.sin(time * 0.35 + badge.userData.floatPhase) * 0.045
      })
      renderer.render(scene, camera)
    }
    if (!reducedMotionQuery.matches) animate()

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      scene.traverse((object) => {
        if (!object.isMesh) return
        object.geometry.dispose()
        const materials = Array.isArray(object.material) ? object.material : [object.material]
        materials.forEach((item) => {
          item.map?.dispose()
          item.dispose()
        })
      })
      renderer.dispose()
      mount.replaceChildren()
    }
  }, [])

  return <div className="hero-3d-scene" ref={mountRef} role="img" aria-label="Animated 3D illustration of a seated developer working at a code editor, surrounded by PHP, jQuery, JavaScript, MySQL, and REST API elements" />
}
