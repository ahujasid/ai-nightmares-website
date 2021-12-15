

import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Figure } from "./js/Figure";
import { LightSource } from "./js/LightSource";
import {
  EffectComposer,
  EffectPass,
  GodRaysEffect,
  RenderPass,
  NoiseEffect
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
  antialias: true,
  // alpha: false
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x121212,1);
document.body.appendChild(renderer.domElement);
window.addEventListener("resize", onResize, false);
window.addEventListener("mousemove", onMouseMove);

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

let noise = new NoiseEffect({
  premultiply: true,
});

composer.addPass(new EffectPass(camera, gre));
composer.addPass(new EffectPass(camera,noise));
console.log(renderer);

camera.rotateZ(1.5);

function mapRange(number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

let clock = new THREE.Clock();

renderer.setAnimationLoop(() => {
  //renderer.render(scene, camera);
  let t = clock.getElapsedTime();
  light.userData.time.value = t;
  // camera.position.x += Math.cos(t) * 0.01;
  // camera.position.y += Math.sin(t * 0.6) * 0.01;

  composer.render();
});

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
  light.position.y = mapRange(event.clientX,0,window.innerWidth,10,-10);
  light.position.x = mapRange(event.clientY,0,window.innerHeight,10,-10);
  camera.position.y = mapRange(event.clientX,0,window.innerWidth,-0.5,0.5);
  camera.position.x = mapRange(event.clientY,0,window.innerHeight,0.5,1.5);
}
