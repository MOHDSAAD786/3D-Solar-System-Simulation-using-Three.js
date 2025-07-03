import * as THREE from "https://cdn.skypack.dev/three@0.129.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";

let scene, camera, renderer, controls;
let planet_sun, planet_mercury, planet_venus, planet_earth, planet_mars, planet_jupiter, planet_saturn, planet_uranus, planet_neptune;
let orbitMeshes = [], labelSprites = [];

let mercury_orbit_radius = 50;
let venus_orbit_radius = 60;
let earth_orbit_radius = 70;
let mars_orbit_radius = 80;
let jupiter_orbit_radius = 100;
let saturn_orbit_radius = 120;
let uranus_orbit_radius = 140;
let neptune_orbit_radius = 160;

const mercury_speed = 4.15;
const venus_speed = 1.62;
const earth_speed = 1;
const mars_speed = 0.53;
const jupiter_speed = 0.08;
const saturn_speed = 0.03;
const uranus_speed = 0.012;
const neptune_speed = 0.006;

let speedMultiplier = 1;
let paused = false;
const clock = new THREE.Clock();

function createMaterialArray() {
  const paths = [
    "./img/skybox/space_ft.png", "./img/skybox/space_bk.png",
    "./img/skybox/space_up.png", "./img/skybox/space_dn.png",
    "./img/skybox/space_rt.png", "./img/skybox/space_lf.png",
  ];
  return paths.map(img => new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(img),
    side: THREE.BackSide
  }));
}

function setSkyBox() {
  const skybox = new THREE.Mesh(
    new THREE.BoxGeometry(1000, 1000, 1000),
    createMaterialArray()
  );
  scene.add(skybox);
}

function loadPlanet(texture, radius, name, type = "standard") {
  const geometry = new THREE.SphereGeometry(radius, 100, 100);
  const tex = new THREE.TextureLoader().load(texture);
  const material = type === "basic" ? new THREE.MeshBasicMaterial({ map: tex }) : new THREE.MeshStandardMaterial({ map: tex });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.userData.label = createGlowingLabel(name);
  scene.add(mesh.userData.label);
  labelSprites.push(mesh.userData.label);
  return mesh;
}

function createOrbitRing(radius) {
  const geometry = new THREE.RingGeometry(radius - 0.1, radius, 100);
  const material = new THREE.MeshBasicMaterial({ color: "#aaa", side: THREE.DoubleSide });
  const ring = new THREE.Mesh(geometry, material);
  ring.rotation.x = Math.PI / 2;
  scene.add(ring);
  orbitMeshes.push(ring);
}

function createGlowingLabel(name) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  ctx.font = "bold 22px Arial";
  ctx.shadowColor = "cyan";
  ctx.shadowBlur = 10;
  ctx.fillStyle = "white";
  ctx.fillText(name, 10, 40);
  const texture = new THREE.CanvasTexture(canvas);
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(20, 5, 1);
  return sprite;
}

document.getElementById("speedControl").addEventListener("input", (e) => {
  speedMultiplier = parseFloat(e.target.value);
});

document.getElementById("toggleOrbits").addEventListener("change", (e) => {
  orbitMeshes.forEach(ring => ring.visible = e.target.checked);
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") paused = !paused;
});

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 20, 150);

  setSkyBox();

  planet_sun = loadPlanet("./img/sun_hd.jpg", 20, "Sun", "basic");
  planet_mercury = loadPlanet("./img/mercury_hd.jpg", 2, "Mercury");
  planet_venus = loadPlanet("./img/venus_hd.jpg", 3, "Venus");
  planet_earth = loadPlanet("./img/earth_hd.jpg", 4, "Earth");
  planet_mars = loadPlanet("./img/mars_hd.jpg", 3.5, "Mars");
  planet_jupiter = loadPlanet("./img/jupiter_hd.jpg", 10, "Jupiter");
  planet_saturn = loadPlanet("./img/saturn_hd.jpg", 8, "Saturn");
  planet_uranus = loadPlanet("./img/uranus_hd.jpg", 6, "Uranus");
  planet_neptune = loadPlanet("./img/neptune_hd.jpg", 5, "Neptune");

  scene.add(
    planet_sun, planet_mercury, planet_venus, planet_earth, planet_mars,
    planet_jupiter, planet_saturn, planet_uranus, planet_neptune
  );

  const sunLight = new THREE.PointLight(0xffffff, 1);
  sunLight.position.copy(planet_sun.position);
  scene.add(sunLight);

  [
    mercury_orbit_radius, venus_orbit_radius, earth_orbit_radius, mars_orbit_radius,
    jupiter_orbit_radius, saturn_orbit_radius, uranus_orbit_radius, neptune_orbit_radius
  ].forEach(createOrbitRing);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("container").appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 20;
  controls.maxDistance = 300;
}

function revolvePlanet(elapsed, baseSpeed, planet, radius) {
  const angle = elapsed * baseSpeed * speedMultiplier;
  planet.position.x = planet_sun.position.x + radius * Math.cos(angle);
  planet.position.z = planet_sun.position.z + radius * Math.sin(angle);
  planet.userData.label.position.set(
    planet.position.x,
    planet.position.y + 6,
    planet.position.z
  );
}

function animate() {
  requestAnimationFrame(animate);
  if (paused) return;

  const elapsed = clock.getElapsedTime();

  [planet_sun, planet_mercury, planet_venus, planet_earth, planet_mars,
   planet_jupiter, planet_saturn, planet_uranus, planet_neptune]
    .forEach(p => p.rotation.y += 0.005);

  revolvePlanet(elapsed, mercury_speed, planet_mercury, mercury_orbit_radius);
  revolvePlanet(elapsed, venus_speed, planet_venus, venus_orbit_radius);
  revolvePlanet(elapsed, earth_speed, planet_earth, earth_orbit_radius);
  revolvePlanet(elapsed, mars_speed, planet_mars, mars_orbit_radius);
  revolvePlanet(elapsed, jupiter_speed, planet_jupiter, jupiter_orbit_radius);
  revolvePlanet(elapsed, saturn_speed, planet_saturn, saturn_orbit_radius);
  revolvePlanet(elapsed, uranus_speed, planet_uranus, uranus_orbit_radius);
  revolvePlanet(elapsed, neptune_speed, planet_neptune, neptune_orbit_radius);

  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
init();
animate();