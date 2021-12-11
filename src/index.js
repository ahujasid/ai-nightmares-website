import "./styles.css";

import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Figure } from "./js/Figure";
import { LightSource } from "./js/LightSource";
import {
  EffectComposer,
  EffectPass,
  GodRaysEffect,
  RenderPass
} from "postprocessing";

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(1, 0, 10);

let renderer = new THREE.WebGLRenderer({
  powerPreference: "high-performance",
  antialias: false,
  stencil: false,
  depth: false
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
window.addEventListener("resize", onResize, false);

// new OrbitControls(camera, renderer.domElement);

let light = new LightSource();
light.position.set(2, 0, -10);
scene.add(light);

let figure = new Figure();
// figure.rotateY(1);
scene.add(figure);

let composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
let gre = new GodRaysEffect(camera, light, {
  height: 480,
  kernelSize: 2,
  density: 1,
  decay: 0.9,
  weight: 0.5,
  exposure: 0.3,
  samples: 20,
  clampMax: 0.95
});
composer.addPass(new EffectPass(camera, gre));

camera.rotateZ(1.5);


let clock = new THREE.Clock();

renderer.setAnimationLoop(() => {
  //renderer.render(scene, camera);
  let t = clock.getElapsedTime();
  light.userData.time.value = t;
  light.position.x = Math.cos(t) * 4;
  light.position.y = Math.sin(t * 0.6) * 4;

  composer.render();
});

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
