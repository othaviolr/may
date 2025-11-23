import * as THREE from 'three';

export function setupCamera(): THREE.PerspectiveCamera {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  if (window.innerWidth < 480) {
    camera.position.set(0, 0, 8);
    camera.fov = 60;
  } else if (window.innerWidth < 768) {
    camera.position.set(0, 0, 7);
    camera.fov = 65;
  } else {
    camera.position.set(0, 0, 5);
    camera.fov = 75;
  }
  
  camera.updateProjectionMatrix();
  return camera;
}

export function setupLighting(scene: THREE.Scene) {
  // Luz ambiente MAIS FORTE
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2); // era 0.5, agora 1.2
  scene.add(ambientLight);

  // Point lights MAIS FORTES
  const pointLight = new THREE.PointLight(0xffffff, 2.0); // era 1.2, agora 2.0
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  const pointLight2 = new THREE.PointLight(0xffffff, 1.5); // era 0.8, agora 1.5
  pointLight2.position.set(-5, 3, -3);
  scene.add(pointLight2);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2); // era 0.6, agora 1.2
  dirLight.position.set(2, 5, 2);
  scene.add(dirLight);
}

export function setupRenderer(container: HTMLElement): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
  });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  container.appendChild(renderer.domElement);
  
  return renderer;
}