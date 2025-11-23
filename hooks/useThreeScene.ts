'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useStore } from '@/lib/store';
import { messages } from '@/lib/messages';
import { setupCamera, setupLighting, setupRenderer } from '@/lib/three/setup';
import { createJar } from '@/lib/three/jar';
import { createParticles, createMoon, animateParticles, Particle } from '@/lib/three/particles';
import { createPostIts, animatePostItEntrance, animatePostItFloat, PostIt } from '@/lib/three/postIts';
import { InteractionManager } from '@/lib/three/interactions';
import { animatePostItRemoval, createAndAnimateParticles } from '@/lib/three/animations';

export function useThreeScene(containerRef: React.RefObject<HTMLDivElement>) {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const jarRef = useRef<THREE.Group | null>(null);
  const postItsRef = useRef<PostIt[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const interactionManagerRef = useRef<InteractionManager | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Atualizar total de mensagens na store
    const store = useStore.getState();
    store.totalMessages = messages.length;

    // Inicializar cena
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Setup camera
    const camera = setupCamera();
    cameraRef.current = camera;

    // Setup renderer
    const renderer = setupRenderer(containerRef.current);
    rendererRef.current = renderer;

    // Setup lighting
    setupLighting(scene);

    // Criar elementos da cena
    const jar = createJar(scene);
    jarRef.current = jar;

    const postIts = createPostIts(scene);
    postItsRef.current = postIts;

    const particles = createParticles(scene);
    particlesRef.current = particles;

    createMoon(scene);

    // Animar entrada dos post-its
    animatePostItEntrance(postIts);

    // Setup interações
    const interactionManager = new InteractionManager(camera, postIts);
    interactionManagerRef.current = interactionManager;

    // Callback quando mensagem é mostrada
    interactionManager.onMessageShow = (message) => {
      const { setCurrentMessage } = useStore.getState();
      setCurrentMessage(message);
      interactionManager.setModalOpen(true);
    };

    // Callback quando post-it é removido
    interactionManager.onPostItRemove = (postIt) => {
      postIt.userData.isRead = true;
      
      const { incrementMessagesRead } = useStore.getState();
      incrementMessagesRead();

      // Criar partículas de remoção
      const color = (postIt.material as THREE.MeshPhongMaterial).color;
      createAndAnimateParticles(postIt.position.clone(), color, scene);

      // Animar remoção do post-it
      animatePostItRemoval(postIt, scene, () => {
        const index = postItsRef.current.indexOf(postIt);
        if (index > -1) {
          postItsRef.current.splice(index, 1);
        }
      });
    };

    // Event listeners
    const handleMouseDown = (e: MouseEvent) => interactionManager.handlePointerDown(e);
    const handleMouseMove = (e: MouseEvent) => interactionManager.handlePointerMove(e);
    const handleMouseUp = () => interactionManager.handlePointerUp();

    const handleTouchStart = (e: TouchEvent) => interactionManager.handlePointerDown(e);
    const handleTouchMove = (e: TouchEvent) => interactionManager.handlePointerMove(e);
    const handleTouchEnd = () => interactionManager.handlePointerUp();

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    // Listener para quando o modal fechar
    const handleModalClosed = () => {
      if (interactionManagerRef.current) {
        interactionManagerRef.current.setModalOpen(false);
      }
    };

    window.addEventListener('modalClosed', handleModalClosed);

    // Resize handler
    const handleResize = () => {
      if (!camera || !renderer) return;

      // Atualizar câmera
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

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    function animate() {
      animationFrameRef.current = requestAnimationFrame(animate);

      const { animationEnabled } = useStore.getState();
      
      if (!animationEnabled) {
        renderer.render(scene, camera);
        return;
      }

      const time = Date.now() * 0.001;

      // Rotação suave do pote
      if (jar) {
        jar.rotation.y += 0.002;
      }

      // Animar partículas (estrelas piscando)
      animateParticles(particles, time);

      // Animação de flutuação dos post-its
      const selectedPostIt = interactionManager.getSelectedPostIt();
      animatePostItFloat(postIts, selectedPostIt);

      renderer.render(scene, camera);
    }

    animate();

    // Cleanup
    return () => {
      // Cancelar animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Remover event listeners
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('modalClosed', handleModalClosed);

      // Limpar Three.js
      if (renderer) {
        renderer.dispose();
        containerRef.current?.removeChild(renderer.domElement);
      }

      if (interactionManager) {
        interactionManager.destroy();
      }

      // Limpar geometrias e materiais
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, [containerRef]); // ← SÓ containerRef como dependência!

  return null;
}