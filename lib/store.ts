import { create } from 'zustand';
import { messages } from './messages';

export interface Message {
  text: string;
  isVale: boolean;
}

interface AppState {
  messagesRead: number;
  totalMessages: number;
  isDragging: boolean;
  animationEnabled: boolean;
  currentMessage: Message | null;
  showWelcomeLetter: boolean; // ← NOVO
  
  // Actions
  incrementMessagesRead: () => void;
  setIsDragging: (dragging: boolean) => void;
  setAnimationEnabled: (enabled: boolean) => void;
  setCurrentMessage: (message: Message | null) => void;
  setShowWelcomeLetter: (show: boolean) => void; // ← NOVO
  reset: () => void;
}

export const useStore = create<AppState>((set) => ({
  messagesRead: 0,
  totalMessages: messages.length,
  isDragging: false,
  animationEnabled: true,
  currentMessage: null,
  showWelcomeLetter: true, // ← INICIA COM TRUE
  
  incrementMessagesRead: () => 
    set((state) => ({ messagesRead: state.messagesRead + 1 })),
  
  setIsDragging: (dragging) => 
    set({ isDragging: dragging }),
  
  setAnimationEnabled: (enabled) => 
    set({ animationEnabled: enabled }),
  
  setCurrentMessage: (message) => 
    set({ currentMessage: message }),
  
  setShowWelcomeLetter: (show) => 
    set({ showWelcomeLetter: show }), // ← NOVO
  
  reset: () => 
    set({ messagesRead: 0, currentMessage: null }),
}));