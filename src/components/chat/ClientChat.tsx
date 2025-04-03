
import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { ChatButton } from './ChatButton';
import { ChatWindow } from './ChatWindow';
import { LoginForm } from '../auth/LoginForm';
import { cn } from '@/lib/utils';

export const ClientChat = () => {
  const { state, toggleChat, maximizeChat } = useChat();
  const { isOpen, isMinimized, currentUser, messages } = state;
  const prevMessagesLengthRef = useRef(messages.length);

  // Reset login state when user is logged in
  useEffect(() => {
    if (currentUser) {
      setIsLoginOpen(false);
    }
  }, [currentUser]);

  // Listen for new messages from operator and open chat if closed
  useEffect(() => {
    if (messages.length > prevMessagesLengthRef.current) {
      const lastMessage = messages[messages.length - 1];
      
      // Only auto-open chat when operator sends a message and chat is closed
      if (lastMessage && lastMessage.sender === 'operator' && !isOpen) {
        toggleChat();
      }
    }
    prevMessagesLengthRef.current = messages.length;
  }, [messages, isOpen, toggleChat]);

  // Listen for external control events
  useEffect(() => {
    const handleOpenChat = () => {
      if (!isOpen) {
        toggleChat();
      }
    };

    const handleCloseChat = () => {
      if (isOpen) {
        toggleChat();
      }
    };

    // Add event listeners
    document.addEventListener('casino-chat-open', handleOpenChat);
    document.addEventListener('casino-chat-close', handleCloseChat);

    // Clean up
    return () => {
      document.removeEventListener('casino-chat-open', handleOpenChat);
      document.removeEventListener('casino-chat-close', handleCloseChat);
    };
  }, [isOpen, toggleChat]);

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
              <div className="flex justify-center mb-6">
                <img src="/images/cocosbet-mascot.png" alt="Cocosbet" className="h-20" />
              </div>
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
