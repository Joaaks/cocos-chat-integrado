import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { ChatMessage } from './ChatMessage';
import { UserRequestForm } from './UserRequestForm';
import { ImageUpload } from './ImageUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SendIcon, User, Loader2, Image, PaperclipIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const notificationSound = new Audio('/sounds/notification.mp3');

export const ChatWindow = () => {
  const {
    state,
    sendMessage,
    startUserRequest,
    uploadImage
  } = useChat();
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const prevMessagesLengthRef = useRef(0);
  const {
    toast
  } = useToast();
  const {
    messages,
    isRequestingUser,
    operatorName,
    operatorIsTyping,
    currentUser
  } = state;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });

    if (messages.length > prevMessagesLengthRef.current) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.sender === 'operator') {
        notificationSound.play().catch(error => {
          console.error('Error al reproducir el sonido:', error);
        });

        toast({
          title: "Nuevo mensaje",
          description: `${operatorName}: ${lastMessage.content.length > 30 ? lastMessage.content.substring(0, 30) + '...' : lastMessage.content}`,
          variant: "default",
          className: "notification-toast animate-pulse border-casino-accent bg-casino-primary",
        });
      }
    }
    prevMessagesLengthRef.current = messages.length;
  }, [messages, operatorIsTyping, operatorName, toast]);

  useEffect(() => {
    if (!isRequestingUser && !showImageUpload) {
      inputRef.current?.focus();
    }
  }, [isRequestingUser, showImageUpload]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message, currentUser?.role === 'operator' ? 'operator' : 'client');
      setMessage('');
    }
  };
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Error",
          description: "Por favor sube sólo archivos de imagen.",
          variant: "destructive"
        });
        return;
      }
      setIsUploading(true);
      try {
        const imageUrl = await uploadImage(file);
        sendMessage(imageUrl, currentUser?.role === 'operator' ? 'operator' : 'client', true);
        setShowImageUpload(false);
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo cargar la imagen. Inténtalo de nuevo.",
          variant: "destructive"
        });
      } finally {
        setIsUploading(false);
      }
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  if (isRequestingUser) {
    return <UserRequestForm />;
  }
  
  if (showImageUpload) {
    return <ImageUpload onClose={() => setShowImageUpload(false)} />;
  }
  
  return <div className="flex flex-col h-full animate-fade-in">
      <div className="p-3 border-b border-casino-secondary text-casino-text bg-casino-primary">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-casino-accent rounded-full flex items-center justify-center text-white mr-3">
              <User size={18} />
            </div>
            <div>
              <h3 className="font-medium text-casino-accent">{operatorName}</h3>
              <p className="text-xs text-gray-400">En línea</p>
            </div>
          </div>
          <div>
            <img src="/images/cocosbet-mascot.png" alt="Cocosbet" className="h-8" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-casino-dark">
        {messages.length === 0 ? <div className="flex flex-col items-center justify-center h-full text-center">
            <img src="/images/cocosbet-mascot.png" alt="Cocosbet" className="h-24 mb-4" />
            <h3 className="text-lg font-medium text-casino-accent mb-2">¡Bienvenido al Chat de Soporte!</h3>
            <p className="text-sm text-gray-400 mb-4 max-w-xs">
              Nuestros operadores están listos para atenderte. ¿En qué podemos ayudarte hoy?
            </p>
            
          </div> : <>
            {messages.map((msg, i) => <ChatMessage key={msg.id} message={msg} isLast={i === messages.length - 1} />)}
            {operatorIsTyping && <div className="flex items-center text-gray-400 animate-pulse">
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                <span className="text-sm">El operador está escribiendo...</span>
              </div>}
            <div ref={messagesEndRef} />
          </>}
      </div>

      <form onSubmit={handleSendMessage} className="border-t border-casino-secondary p-3 bg-casino-primary">
        <div className="flex flex-col space-y-2">
          <Textarea ref={inputRef} value={message} onChange={e => setMessage(e.target.value)} placeholder="Escribe un mensaje..." className="flex-1 bg-casino-secondary text-casino-text border-casino-secondary focus-visible:ring-casino-accent resize-none min-h-[60px]" onKeyDown={e => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (message.trim()) {
              handleSendMessage(e);
            }
          }
        }} />
          
          <div className="flex items-center space-x-2">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            
            <Button type="button" variant="outline" size="icon" onClick={triggerFileInput} className="bg-casino-secondary border-casino-secondary text-casino-text hover:bg-casino-accent hover:text-white hover:border-casino-accent" title="Enviar Imagen" disabled={isUploading}>
              {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Image size={18} />}
            </Button>
            
            <div className="flex-1"></div>
            
            <Button type="submit" size="icon" disabled={!message.trim() || isUploading} className={cn("bg-casino-accent text-white hover:bg-casino-accent/90", (!message.trim() || isUploading) && "opacity-50 cursor-not-allowed")}>
              <SendIcon size={18} />
            </Button>
          </div>
        </div>
      </form>
    </div>;
};

import { MessageCircle } from 'lucide-react';
