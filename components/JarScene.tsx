'use client';

import { useRef } from 'react';
import { useThreeScene } from '@/hooks/useThreeScene';

export default function JarScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useThreeScene(containerRef);

  return <div ref={containerRef} id="three-container" />;
}