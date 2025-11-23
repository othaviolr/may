'use client';

import dynamic from 'next/dynamic';
import Instructions from '@/components/Instructions';
import Counter from '@/components/Counter';
import MessageCard from '@/components/MessageCard';
import WelcomeLetter from '@/components/WelcomeLetter';

const JarScene = dynamic(() => import('@/components/JarScene'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden">
      <JarScene />
      <Instructions />
      <Counter />
      <MessageCard />
      <WelcomeLetter /> {/* ← NOVA CARTA */}
    </main>
  );
}