import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import space from "./Assets/space.jpeg";
import PortfolioPicture from "./Assets/PortfolioPicture.jpeg";
import moon_picture from "./Assets/moon_picture.jpeg";
import normal from "./Assets/normal.jpeg";

// Functions

function moveCamera() {
  const boundingClient = document.body.getBoundingClientRect().top;
  camera.position.z = boundingClient * -0.01;
  camera.position.x = boundingClient * -0.0002;
  camera.rotation.y = boundingClient * -0.0002;
}

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill(undefined)
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;
  moon.rotation.y += 0.01;
  portraitBox.rotation.y += 0.01;

  controls.update();
  renderer.render(scene, camera);
}

// Scene , Loader, and Camera

const scene = new THREE.Scene();
const loader = new THREE.TextureLoader();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Lighting
const pointLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0xffffff);
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg")!,
});

// Toro
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xff6346,
});
const torus = new THREE.Mesh(geometry, material);

//Portrait Box

const jamesTexture = loader.load(PortfolioPicture);
const portraitBox = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: jamesTexture })
);

// Moon
const moonTexture = loader.load(moon_picture);
const normalTexture = loader.load(normal);
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: normalTexture })
);

const controls = new OrbitControls(camera, renderer.domElement);

//Renders

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
camera.position.setZ(30);
camera.position.setX(-3);

//Scene adds

scene.add(torus);
scene.add(portraitBox);
scene.add(moon);
scene.add(ambientLight, pointLight);

//Scence background set

scene.background = loader.load(space);

//position set

pointLight.position.set(5, 5, 5);
moon.position.z = 30;
moon.position.x = -10;
portraitBox.position.z = -5;
portraitBox.position.x = 2;

//Document scroll set

document.body.onscroll = moveCamera;
moveCamera();

Array(200).fill(undefined).forEach(addStar);
animate();
