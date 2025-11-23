import * as THREE from 'three';

export function createJar(scene: THREE.Scene) {
  const jarGroup = new THREE.Group();

  // Corpo do pote (cilindro) - vidro realista
  const jarGeometry = new THREE.CylinderGeometry(1.5, 1.5, 3, 32);
  const jarMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.35,
    roughness: 0,
    metalness: 0,
    clearcoat: 1.0,
    clearcoatRoughness: 0,
    reflectivity: 1,
    envMapIntensity: 1.5,
    side: THREE.DoubleSide
  });
  const jar = new THREE.Mesh(jarGeometry, jarMaterial);
  jar.position.y = -0.5;
  jarGroup.add(jar);

  // Cilindro interno para efeito de profundidade
  const innerJarGeometry = new THREE.CylinderGeometry(1.48, 1.48, 2.95, 32);
  const innerJarMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.2,
    roughness: 0,
    metalness: 0,
    clearcoat: 1.0,
    reflectivity: 1,
    side: THREE.BackSide
  });
  const innerJar = new THREE.Mesh(innerJarGeometry, innerJarMaterial);
  innerJar.position.y = -0.5;
  jarGroup.add(innerJar);

  // Tampa - metal dourado brilhante
  const lidGeometry = new THREE.CylinderGeometry(1.6, 1.6, 0.3, 32);
  const lidMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFD700,
    metalness: 1,
    roughness: 0.15,
    emissive: 0x886600,
    emissiveIntensity: 0.2
  });
  const lid = new THREE.Mesh(lidGeometry, lidMaterial);
  lid.position.y = 1.15;
  jarGroup.add(lid);

  // Puxador da tampa
  const knobGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 16);
  const knob = new THREE.Mesh(knobGeometry, lidMaterial);
  knob.position.y = 1.35;
  jarGroup.add(knob);

  // Anel decorativo da tampa
  const ringGeometry = new THREE.TorusGeometry(1.55, 0.05, 8, 32);
  const ring = new THREE.Mesh(ringGeometry, lidMaterial);
  ring.position.y = 1.15;
  ring.rotation.x = Math.PI / 2;
  jarGroup.add(ring);

  scene.add(jarGroup);
  return jarGroup;
}