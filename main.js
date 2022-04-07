import {
  Scene,
  PerspectiveCamera,
  WebGL1Renderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PlaneGeometry,
  DoubleSide
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import WEBGL from 'three/examples/jsm/capabilities/WebGL'
import './style.css'

const scen = new Scene()
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
const renderer = new WebGL1Renderer()
const controls = new OrbitControls(camera, renderer.domElement)

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(devicePixelRatio)
document.getElementById('app').appendChild(renderer.domElement)

const boxGeomatry = new BoxGeometry(2, 1, 2)
const planeGeometry = new PlaneGeometry(5, 5, 10, 10)
const material = new MeshBasicMaterial({ color: 0x0ff0f5 })
const material2 = new MeshBasicMaterial({ color: 0xffff00, side: DoubleSide })
const cube = new Mesh(boxGeomatry, material)
const plane = new Mesh(planeGeometry, material2)

scen.add(cube)
scen.add(plane)
scen.add(controls)
camera.position.z = 10

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(devicePixelRatio)
}

function animate() {
  requestAnimationFrame(animate)

  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  onWindowResize()

  renderer.render(scen, camera)
}

if (WEBGL.isWebGLAvailable()) {
  animate()
} else {
  const warning = WEBGL.getWebGLErrorMessage()
  document.getElementById('app').appendChild(warning)
}
