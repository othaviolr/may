import * as THREE from 'three';
import { PostIt } from './postIts';
import { messages } from '../messages';
import { Message } from '../store';

export class InteractionManager {
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;
  private camera: THREE.Camera;
  private postIts: PostIt[];
  private selectedPostIt: PostIt | null = null;
  private isDragging: boolean = false;
  private isModalOpen: boolean = false; // ← NOVO
  
  // Callbacks
  public onMessageShow?: (message: Message) => void;
  public onPostItRemove?: (postIt: PostIt) => void;

  constructor(camera: THREE.Camera, postIts: PostIt[]) {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.camera = camera;
    this.postIts = postIts;
  }

  // ← NOVO: Método para controlar o estado do modal
  setModalOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  private getMouseCoordinates(event: MouseEvent | TouchEvent) {
    if (event instanceof TouchEvent) {
      if (event.touches.length > 0) {
        this.mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    } else {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
  }

  handlePointerDown = (event: MouseEvent | TouchEvent) => {
    // ← BLOQUEIA SE MODAL ESTIVER ABERTO
    if (this.isModalOpen) return;
    
    event.preventDefault();
    this.getMouseCoordinates(event);
    this.selectPostIt();
  };

  handlePointerMove = (event: MouseEvent | TouchEvent) => {
    // ← BLOQUEIA SE MODAL ESTIVER ABERTO
    if (this.isModalOpen) return;
    
    if (this.selectedPostIt && this.isDragging) {
      event.preventDefault();
      this.getMouseCoordinates(event);
      this.dragPostIt();
    }
  };

  handlePointerUp = () => {
    // ← BLOQUEIA SE MODAL ESTIVER ABERTO
    if (this.isModalOpen) return;
    
    if (this.selectedPostIt && this.isDragging) {
      this.releasePostIt();
    }
    this.isDragging = false;
  };

  private selectPostIt() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.postIts);

    if (intersects.length > 0) {
      const postIt = intersects[0].object as PostIt;
      
      if (!postIt.userData.isRead) {
        this.selectedPostIt = postIt;
        this.selectedPostIt.renderOrder = 999;
        (this.selectedPostIt.material as THREE.MeshPhongMaterial).emissive = 
          new THREE.Color(0x333333);
        this.isDragging = true;
      }
    }
  }

  private dragPostIt() {
    if (!this.selectedPostIt) return;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const direction = this.raycaster.ray.direction;

    const smoothFactor = window.innerWidth < 768 ? 0.08 : 0.1;

    this.selectedPostIt.position.x += direction.x * smoothFactor;
    this.selectedPostIt.position.y += direction.y * smoothFactor;
    this.selectedPostIt.position.z = 2;

    this.selectedPostIt.rotation.z += 0.02;
  }

  private releasePostIt() {
    if (!this.selectedPostIt) return;

    const messageIndex = this.selectedPostIt.userData.messageIndex;
    const message = messages[messageIndex];

    // ← MARCA QUE O MODAL ESTÁ ABERTO
    this.isModalOpen = true;

    if (this.onMessageShow) {
      this.onMessageShow(message);
    }

    this.createRemovalParticles(
      this.selectedPostIt.position.clone(),
      (this.selectedPostIt.material as THREE.MeshPhongMaterial).color
    );

    if (this.onPostItRemove) {
      this.onPostItRemove(this.selectedPostIt);
    }

    (this.selectedPostIt.material as THREE.MeshPhongMaterial).emissive = 
      new THREE.Color(0x000000);
    
    this.selectedPostIt = null;
  }

  private createRemovalParticles(position: THREE.Vector3, color: THREE.Color) {
    const particleCount = window.innerWidth < 768 ? 8 : 15;
    const particles: THREE.Mesh[] = [];

    for (let i = 0; i < particleCount; i++) {
      const geometry = new THREE.SphereGeometry(0.03, 6, 6);
      const material = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.8
      });
      const particle = new THREE.Mesh(geometry, material);
      particle.position.copy(position);
      
      particles.push(particle);
    }

    return particles;
  }

  getSelectedPostIt() {
    return this.selectedPostIt;
  }

  destroy() {
    this.selectedPostIt = null;
    this.postIts = [];
  }
}