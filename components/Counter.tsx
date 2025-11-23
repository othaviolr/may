'use client';

import { useStore } from '@/lib/store';

export default function Counter() {
  const messagesRead = useStore((state) => state.messagesRead);
  const totalMessages = useStore((state) => state.totalMessages);
  const showWelcomeLetter = useStore((state) => state.showWelcomeLetter);
  
  // NÃO MOSTRA se a carta estiver aberta
  if (showWelcomeLetter) return null;
  
  const remaining = totalMessages - messagesRead;
  const progress = (messagesRead / totalMessages) * 100;

  return (
    <>
      {/* Barra de Progresso */}
      <div 
        id="progressBar"
        className="fixed bottom-[80px] left-1/2 -translate-x-1/2 w-[200px] h-[6px] rounded-[3px] overflow-hidden z-[100] max-[768px]:bottom-[70px] max-[768px]:w-[150px]"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)'
        }}
      >
        <div 
          id="progressFill"
          className="h-full rounded-[3px] transition-[width_0.5s_ease]"
          style={{ 
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #667eea, #764ba2)'
          }}
        />
      </div>

      {/* Counter */}
      <div 
        id="counter"
        className="fixed bottom-[30px] left-1/2 -translate-x-1/2 text-[1.3em] px-[25px] py-[10px] rounded-[25px] backdrop-blur-[10px] z-[100] text-center max-[768px]:bottom-5 max-[768px]:text-base max-[768px]:px-5 max-[768px]:py-2"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          color: '#FFFFFF'
        }}
      >
        <span id="counterText">
          {remaining > 0 ? `Post-its restantes: ${remaining}` : 'Te amo 🤍'}
        </span>
      </div>
    </>
  );
}