
import React, { useState, useEffect } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { ChatButton } from './ChatButton';
import { ChatWindow } from './ChatWindow';
import { LoginForm } from '../auth/LoginForm';
import { cn } from '@/lib/utils';

export const ClientChat = () => {
  const { state } = useChat();
  const { isOpen, isMinimized, currentUser } = state;

  // Reset login state when user is logged in
  useEffect(() => {
    if (currentUser) {
      setIsLoginOpen(false);
    }
  }, [currentUser]);

  // Si no está logueado y se abre el chat, mostramos el formulario de login
  const showLoginForm = !currentUser && isOpen;
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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
          {showLoginForm ? (
            <div className="h-full p-4 overflow-y-auto">
              <LoginForm />
            </div>
          ) : (
            <ChatWindow />
          )}
        </div>
      )}
    </>
  );
};
