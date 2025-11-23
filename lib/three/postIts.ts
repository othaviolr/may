import * as THREE from 'three';
import gsap from 'gsap';
import { messages } from '../messages';

export interface PostIt extends THREE.Mesh {
  userData: {
    messageIndex: number;
    originalPosition: THREE.Vector3;
    originalRotation: THREE.Euler;
    isRead: boolean;
  };
}

// Geometria e materiais reutilizáveis
let postItGeometry: THREE.BoxGeometry;
let postItMaterials: THREE.MeshPhongMaterial[];

export function createReusableAssets() {
  postItGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.05);
  
  const colors = [0xffeb3b, 0xff9800, 0xffb3e6, 0xb3e5fc, 0xc8e6c9, 0xffe0b2];
  postItMaterials = colors.map(color => 
    new THREE.MeshPhongMaterial({
      color: color,
      shininess: 30
    })
  );
}

export function createPostIts(scene: THREE.Scene): PostIt[] {
  createReusableAssets();
  const postIts: PostIt[] = [];

  for (let i = 0; i < messages.length; i++) {
    const material = postItMaterials[i % postItMaterials.length];
    const postIt = new THREE.Mesh(postItGeometry, material) as PostIt;
    
    // Posição aleatória dentro do pote
    const angle = (i / messages.length) * Math.PI * 2;
    const radius = Math.random() * 0.8 + 0.3;
    postIt.position.x = Math.cos(angle) * radius;
    postIt.position.y = (Math.random() - 0.5) * 2 - 0.5;
    postIt.position.z = Math.sin(angle) * radius;
    
    // Rotação aleatória
    postIt.rotation.x = Math.random() * Math.PI;
    postIt.rotation.y = Math.random() * Math.PI;
    postIt.rotation.z = Math.random() * Math.PI;
    
    postIt.userData = {
      messageIndex: i,
      originalPosition: postIt.position.clone(),
      originalRotation: postIt.rotation.clone(),
      isRead: false
    };
    
    // Inicialmente escondidos para animação de entrada
    postIt.visible = false;
    postIt.scale.set(0, 0, 0);
    
    scene.add(postIt);
    postIts.push(postIt);
  }

  return postIts;
}

export function animatePostItEntrance(postIts: PostIt[]) {
  postIts.forEach((postIt, index) => {
    setTimeout(() => {
      postIt.visible = true;
      gsap.to(postIt.scale, {
        duration: 0.8,
        x: 1,
        y: 1,
        z: 1,
        ease: "elastic.out(1, 0.5)",
        delay: index * 0.1
      });
    }, 500 + index * 100);
  });
}

export function animatePostItFloat(postIts: PostIt[], selectedPostIt: PostIt | null) {
  postIts.forEach((postIt, index) => {
    if (!postIt.userData.isRead && postIt !== selectedPostIt) {
      postIt.position.y += Math.sin(Date.now() * 0.001 + index) * 0.0005;
    }
  });
}