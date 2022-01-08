import './style.css'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  PointLight,
  AmbientLight,
  sRGBEncoding,
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const container = document.querySelector<HTMLDivElement>('.three-container')
if (!container) {
  throw new Error('Three JS container not found')
}

const scene = new Scene()

const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.01,
  10
)
camera.position.z = 0.1
const renderer = new WebGLRenderer({ antialias: true, alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.outputEncoding = sRGBEncoding // default is LinearEncoding
container.appendChild(renderer.domElement)

const addLights = (scene: Scene) => {
  const lightKey = new PointLight(0xffffff, 1.5, 100)
  lightKey.position.set(-10, 3, 5)

  const lightFill = new PointLight(0xffffff, 0.1, 100)
  lightFill.position.set(10, 3, 5)

  const lightRim = new PointLight(0xffffff, 2, 100)
  lightRim.position.set(0, 1, -5)

  const lightAmbient = new AmbientLight(0xbfe3dd, 0.5)

  scene.add(lightKey, lightFill, lightRim, lightAmbient)
}
addLights(scene)

const controls = new OrbitControls(camera, renderer.domElement)
controls.update()
controls.enableDamping = true

const animate = () => {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)

  // This is required if controls.enableDamping = true
  controls.update()
}

animate()

const loader = new GLTFLoader()
loader.load(
  '/src/donut.glb',
  // This gets called after the model is loaded
  (gltf) => scene.add(gltf.scene),
  // Optional onProgress callback
  undefined,
  // Optional onError callback
  (error) => console.error(error)
)

window.addEventListener('resize', () => {
  camera.aspect = container.offsetWidth / container.offsetHeight
  camera.updateProjectionMatrix()
  renderer.setSize(container.offsetWidth, container.offsetHeight)
  renderer.render(scene, camera)
})
