'use client';

import { useStore } from '@/lib/store';
import { useEffect } from 'react';

export default function MessageCard() {
  const currentMessage = useStore((state) => state.currentMessage);
  const setCurrentMessage = useStore((state) => state.setCurrentMessage);
  const setAnimationEnabled = useStore((state) => state.setAnimationEnabled);

  const isOpen = currentMessage !== null;

  useEffect(() => {
    setAnimationEnabled(!isOpen);
  }, [isOpen, setAnimationEnabled]);

  const handleClose = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentMessage(null);
    
    // ← LIBERA OS CLIQUES NOS POST-ITS NOVAMENTE
    // Isso será feito através de um evento customizado
    window.dispatchEvent(new CustomEvent('modalClosed'));
  };

  if (!currentMessage) return null;

  return (
    <>
      {/* Backdrop escuro */}
      <div 
        className={`fixed inset-0 z-[199] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(4px)'
        }}
        onClick={handleClose}
        onTouchEnd={handleClose}
      />

      {/* Card BRANCO */}
      <div 
        id="messageCard"
        className={`fixed top-1/2 left-1/2 rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.3)] w-[90%] max-w-[400px] z-[200] transition-all duration-500 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
        style={{
          backgroundColor: '#FFFFFF',
          transform: isOpen ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0)',
          transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          padding: '32px 28px'
        }}
        onClick={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        {currentMessage.isVale && (
          <span 
            className="inline-block text-white px-4 py-1.5 rounded-full text-sm font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
            }}
          >
            VALE ESPECIAL
          </span>
        )}

        <h2 
          className="mb-4 text-[1.6rem] font-bold leading-tight"
          style={{ color: '#667eea' }}
        >
          {currentMessage.isVale ? 'Presente para Você!' : 'Mensagem'}
        </h2>

        <p 
          className="text-[1.05rem] leading-[1.7] mb-6 font-normal"
          style={{ color: '#4a4a4a' }}
        >
          {currentMessage.text}
        </p>

        <button
          onClick={handleClose}
          onTouchEnd={handleClose}
          className="text-white border-none rounded-full text-[1.05rem] font-medium cursor-pointer transition-transform duration-200 w-full hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          style={{ 
            background: 'linear-gradient(135deg, #7c8aeb 0%, #8460c4 100%)',
            padding: '14px 40px',
            touchAction: 'manipulation'
          }}
        >
          Fechar
        </button>
      </div>
    </>
  );
}