'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';

export default function WelcomeLetter() {
  const showWelcomeLetter = useStore((state) => state.showWelcomeLetter);
  const setShowWelcomeLetter = useStore((state) => state.setShowWelcomeLetter);
  
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    setTimeout(() => {
      setShowLetter(true);
    }, 600);
  };

  const handleClose = () => {
    setShowLetter(false);
    setTimeout(() => {
      setShowWelcomeLetter(false);
    }, 300);
  };

  if (!showWelcomeLetter) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(10px)',
          zIndex: 300
        }}
      />

      {/* Container */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 301,
          width: '100%',
          maxWidth: '350px',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Envelope */}
        {!showLetter && (
          <div 
            onClick={handleOpenEnvelope}
            onTouchEnd={(e) => {
              e.preventDefault();
              handleOpenEnvelope();
            }}
            style={{
              width: '100%',
              height: '240px',
              perspective: '1000px',
              cursor: 'pointer',
              transition: 'all 0.7s',
              transform: isEnvelopeOpen ? 'scale(1.1)' : 'scale(1)',
              opacity: isEnvelopeOpen ? 0 : 1
            }}
          >
            {/* Envelope Body */}
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #f5f5f0 0%, #e8e8e0 100%)',
                border: '3px solid rgba(139, 69, 19, 0.2)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* Envelope Lines */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '8px',
                  background: `
                    linear-gradient(135deg, transparent 49%, rgba(139, 69, 19, 0.08) 49%, rgba(139, 69, 19, 0.08) 51%, transparent 51%),
                    linear-gradient(45deg, transparent 49%, rgba(139, 69, 19, 0.08) 49%, rgba(139, 69, 19, 0.08) 51%, transparent 51%)
                  `
                }}
              />
              
              {/* Heart Seal */}
              <div 
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: 'pulse 2s ease-in-out infinite'
                }}
              >
                <svg width="60" height="60" viewBox="0 0 24 24" fill="#dc2626">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>

              {/* Tap to Open Text */}
              <div 
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  textAlign: 'center',
                  width: '100%',
                  animation: 'fadeIn 2s ease-in-out infinite'
                }}
              >
                <p style={{ 
                  fontSize: '16px', 
                  fontWeight: 'bold', 
                  color: '#8b4513',
                  margin: 0
                }}>
                  Toque para abrir
                </p>
              </div>
            </div>

            {/* Envelope Flap */}
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '120px',
                background: 'linear-gradient(180deg, #e8e8e0 0%, #d0d0c8 100%)',
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                transform: isEnvelopeOpen ? 'rotateX(-180deg)' : 'rotateX(0deg)',
                transformStyle: 'preserve-3d',
                transformOrigin: 'top',
                transition: 'transform 0.7s',
                border: '3px solid rgba(139, 69, 19, 0.2)',
                borderBottom: 'none',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
              }}
            />
          </div>
        )}

        {/* Letter Content */}
        {showLetter && (
          <div 
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #fffef9 0%, #f5f5f0 100%)',
              padding: '30px 20px',
              borderRadius: '12px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
              border: '2px solid rgba(139, 69, 19, 0.2)',
              maxHeight: '80vh',
              overflowY: 'auto',
              transition: 'all 0.7s',
              transform: showLetter ? 'scale(1)' : 'scale(0.5)',
              opacity: showLetter ? 1 : 0
            }}
          >
            {/* Decorative Header */}
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="#dc2626" style={{ margin: '0 auto 8px' }}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <h2 style={{ 
                fontSize: '20px', 
                fontWeight: 'bold', 
                marginBottom: '8px',
                color: '#667eea' 
              }}>
                내 사랑을 위해
              </h2>
              <div style={{ 
                width: '64px', 
                height: '4px', 
                background: 'linear-gradient(to right, transparent, #f87171, transparent)', 
                margin: '0 auto',
                borderRadius: '2px'
              }} />
            </div>

            {/* Letter Text */}
            <div style={{ 
              color: '#4a4a4a', 
              lineHeight: '1.7',
              fontSize: '14px'
            }}>
              <p style={{ fontWeight: '600', fontSize: '16px', marginBottom: '12px' }}>Meu amor,</p>
              
              <p style={{ marginBottom: '12px' }}>
                Hoje é um dia especial e eu queria te dar um abraço bem forte e demorar pra soltar
                eu espero que esse novo ano te trate com a mesma delicadeza que você coloca nas coisas que faz
                que você receba tudo que merece paz, carinho, alegria. E eu quero estar do seu lado em cada pedaço disso.
              </p>

              <p style={{ marginBottom: '12px' }}>
                Gosto quando tenho um dia dificil e você ta ali comigo, me sinto mais capacitado pra levar as coisas,
                quero que você se lembre que você é uma mulher linda, forte e capaz de conquistar suas vontades
                e eu acredito muito em você, de um jeito que nem sei explicar direito às vezes kkkkk

              </p>

              <p style={{ marginBottom: '12px' }}>
                Tentei criar algo que eu gostaria muito de entregar pra você pessoalmente
                não sei se vai gostar, queria fazer algo legal que eu saiba fazer e fiz isso, 
                só clicar nos post it que vai ter umas mensagens minhas, Te amo amor ❤️
              </p>

              <p style={{ 
                textAlign: 'right', 
                fontWeight: 'bold', 
                marginTop: '16px',
                fontSize: '14px'
              }}>
                Com amor,<br />
                <span style={{ color: '#667eea' }}>Seu Tavinho 💌</span>
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleClose();
              }}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #7c8aeb 0%, #8460c4 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                padding: '14px 30px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                marginTop: '20px',
                touchAction: 'manipulation',
                boxShadow: '0 4px 12px rgba(124, 138, 235, 0.4)'
              }}
            >
              Abrir o Potinho ✨
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }
        @keyframes fadeIn {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </>
  );
}