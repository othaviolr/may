import * as THREE from 'three';

export interface Particle extends THREE.Mesh {
  userData: {
    pulseSpeed?: number;
    pulseOffset?: number;
    isStar?: boolean;
    baseOpacity?: number;
  };
}

export function createParticles(scene: THREE.Scene): Particle[] {
  const particles: Particle[] = [];
  
  // Criar estrelas no fundo
  const starCount = window.innerWidth < 768 ? 150 : 300;
  
  for (let i = 0; i < starCount; i++) {
    const size = 0.015 + Math.random() * 0.05;
    const geometry = new THREE.SphereGeometry(size, 6, 6);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.4 + Math.random() * 0.6
    });
    const star = new THREE.Mesh(geometry, material) as Particle;
    
    // Espalhar estrelas por todo o fundo
    star.position.x = (Math.random() - 0.5) * 60;
    star.position.y = (Math.random() - 0.5) * 40;
    star.position.z = -10 - Math.random() * 30;
    
    star.userData = {
      pulseSpeed: 0.2 + Math.random() * 0.8,
      pulseOffset: Math.random() * Math.PI * 2,
      isStar: true,
      baseOpacity: 0.4 + Math.random() * 0.4
    };
    
    scene.add(star);
    particles.push(star);
  }
  
  return particles;
}

export function createMoon(scene: THREE.Scene) {
  const moonGroup = new THREE.Group();
  
  // Criar forma de lua crescente
  const moonShape = new THREE.Shape();
  
  // Desenhar arco externo (lado direito da lua)
  moonShape.absarc(0, 0, 1.2, -Math.PI/2, Math.PI/2, false);
  
  // Desenhar arco interno (cria o corte crescente)
  moonShape.absarc(0.3, 0, 1.1, Math.PI/2, -Math.PI/2, true);
  
  const moonGeometry = new THREE.ShapeGeometry(moonShape);
  const moonMaterial = new THREE.MeshBasicMaterial({
    color: 0xfff4e6,
    side: THREE.DoubleSide
  });
  const moon = new THREE.Mesh(moonGeometry, moonMaterial);
  moonGroup.add(moon);
  
  moonGroup.position.set(6, 4, -8);
  moonGroup.rotation.z = Math.PI / 8;
  scene.add(moonGroup);
  
  return moonGroup;
}

export function animateParticles(particles: Particle[], time: number) {
  particles.forEach(particle => {
    if (particle.userData.isStar && particle.userData.baseOpacity) {
      // Efeito de cintilação suave
      const pulse = Math.sin(
        time * particle.userData.pulseSpeed! + particle.userData.pulseOffset!
      );
      particle.material.opacity = particle.userData.baseOpacity + pulse * 0.3;
    }
  });
}