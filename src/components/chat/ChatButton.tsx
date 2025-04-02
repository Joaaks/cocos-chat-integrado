
import React from 'react';
import { MessageCircle, X, Minimize2, Maximize2, LogIn } from 'lucide-react';
import { useChat } from '@/contexts/ChatContext';
import { cn } from '@/lib/utils';

interface ChatButtonProps {
  onLoginClick?: () => void;
}

export const ChatButton = ({ onLoginClick }: ChatButtonProps) => {
  const { state, toggleChat, minimizeChat, maximizeChat } = useChat();
  const { isOpen, isMinimized, messages, currentUser } = state;

  const unreadMessages = messages.filter(
    (message) => !message.isRead && message.sender === 'operator'
  ).length;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="relative flex items-center justify-center w-14 h-14 rounded-full gold-gradient text-casino-primary shadow-lg hover:brightness-105 transition-all duration-300 casino-shadow animate-fade-in"
        >
          <MessageCircle size={24} />
          {unreadMessages > 0 && (
            <span className="absolute -top-1 -right-1 bg-casino-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {unreadMessages}
            </span>
          )}
        </button>
      )}

      {isOpen && (
        <div className={cn("flex items-center space-x-2", isMinimized ? "animate-fade-in" : "")}>
          {!currentUser && (
            <button
              onClick={onLoginClick}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors"
              title="Iniciar Sesión"
            >
              <LogIn size={18} />
            </button>
          )}
          
          {isMinimized && (
            <button
              onClick={maximizeChat}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-casino-secondary text-casino-text hover:bg-casino-gold hover:text-casino-primary transition-colors"
            >
              <Maximize2 size={18} />
            </button>
          )}
          
          {!isMinimized && (
            <button
              onClick={minimizeChat}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-casino-secondary text-casino-text hover:bg-casino-gold hover:text-casino-primary transition-colors"
            >
              <Minimize2 size={18} />
            </button>
          )}
          
          <button
            onClick={toggleChat}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-casino-secondary text-casino-text hover:bg-casino-accent hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
};
