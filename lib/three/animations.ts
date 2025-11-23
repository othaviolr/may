import * as THREE from 'three';
import { PostIt } from './postIts';

export function animatePostItRemoval(
  postIt: PostIt,
  scene: THREE.Scene,
  onComplete?: () => void
) {
  const targetPosition = new THREE.Vector3(
    (Math.random() - 0.5) * 10,
    5,
    (Math.random() - 0.5) * 10
  );

  let progress = 0;
  const duration = 1000;
  const startTime = Date.now();

  function animate() {
    const currentTime = Date.now();
    progress = (currentTime - startTime) / duration;

    if (progress < 1) {
      postIt.position.lerp(targetPosition, 0.1);
      postIt.rotation.x += 0.1;
      postIt.rotation.y += 0.1;
      postIt.scale.multiplyScalar(0.95);
      requestAnimationFrame(animate);
    } else {
      scene.remove(postIt);
      if (onComplete) onComplete();
    }
  }

  animate();
}

export function createAndAnimateParticles(
  position: THREE.Vector3,
  color: THREE.Color,
  scene: THREE.Scene
) {
  const particleCount = window.innerWidth < 768 ? 8 : 15;

  for (let i = 0; i < particleCount; i++) {
    const geometry = new THREE.SphereGeometry(0.03, 6, 6);
    const material = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.8
    });
    const particle = new THREE.Mesh(geometry, material);
    particle.position.copy(position);

    scene.add(particle);
    animateParticle(particle, i, scene);
  }
}

function animateParticle(
  particle: THREE.Mesh,
  index: number,
  scene: THREE.Scene
) {
  const angle = (index / 15) * Math.PI * 2;
  const speed = 0.02 + Math.random() * 0.03;
  const velocity = {
    x: Math.cos(angle) * speed,
    y: Math.sin(angle) * speed,
    z: (Math.random() - 0.5) * speed
  };

  let progress = 0;
  const duration = 800;
  const startTime = Date.now();

  function update() {
    const currentTime = Date.now();
    progress = (currentTime - startTime) / duration;

    if (progress < 1) {
      particle.position.x += velocity.x;
      particle.position.y += velocity.y;
      particle.position.z += velocity.z;
      
      const material = particle.material as THREE.MeshBasicMaterial;
      material.opacity = 0.8 * (1 - progress);
      particle.scale.multiplyScalar(0.97);
      
      requestAnimationFrame(update);
    } else {
      scene.remove(particle);
      particle.geometry.dispose();
      (particle.material as THREE.Material).dispose();
    }
  }

  update();
}