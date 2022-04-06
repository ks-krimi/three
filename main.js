import {
  Scene,
  PerspectiveCamera,
  WebGL1Renderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh
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
document.getElementById('app').appendChild(renderer.domElement)

const geomatry = new BoxGeometry()
const material = new MeshBasicMaterial({ color: 0xffaa45 })
const cube = new Mesh(geomatry, material)

scen.add(cube)
scen.add(controls)
camera.position.z = 5

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
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
