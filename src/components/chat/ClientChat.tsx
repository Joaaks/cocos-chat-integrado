
import React from 'react';
import { useChat } from '@/contexts/ChatContext';
import { ChatButton } from './ChatButton';
import { ChatWindow } from './ChatWindow';
import { cn } from '@/lib/utils';

export const ClientChat = () => {
  const { state } = useChat();
  const { isOpen, isMinimized } = state;

  return (
    <>
      <ChatButton />
      
      {isOpen && (
        <div
          className={cn(
            "fixed bottom-20 right-5 z-40 w-[350px] h-[500px] bg-casino-dark rounded-lg overflow-hidden shadow-xl casino-shadow transition-all duration-300",
            isMinimized ? "h-0 opacity-0" : "opacity-100"
          )}
        >
          <ChatWindow />
        </div>
      )}
    </>
  );
};
