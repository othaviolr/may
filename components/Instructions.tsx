'use client';

import { useStore } from '@/lib/store';

export default function Instructions() {
  const showWelcomeLetter = useStore((state) => state.showWelcomeLetter);
  
  // NÃO MOSTRA se a carta estiver aberta
  if (showWelcomeLetter) return null;
  
  return (
    <div 
      id="instructions"
      className="fixed top-[30px] left-1/2 -translate-x-1/2 text-center z-[100] px-[30px] py-[15px] rounded-[15px] pointer-events-none text-[1.3em] shadow-[2px_2px_4px_rgba(0,0,0,0.3)] backdrop-blur-[10px] max-[768px]:top-5 max-[768px]:px-5 max-[768px]:py-2.5 max-[768px]:text-base max-[768px]:max-w-[90%]"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        color: '#FFFFFF',
        animation: 'fadeIn 1s ease-in'
      }}
    >
      Toque e arraste os post-its para ler as mensagens
    </div>
  );
}