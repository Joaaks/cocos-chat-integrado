
import React, { useState, useRef } from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { Message } from '@/types/chat';
import { useChat } from '@/contexts/ChatContext';

interface ChatAreaProps {
  selectedUser: string;
  messages: Message[];
  sendMessage: (content: string, sender: 'client' | 'operator', isImage?: boolean) => void;
  uploadImage: (file: File) => Promise<string>;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  selectedUser,
  messages,
  sendMessage,
  uploadImage
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { state } = useChat();
  const { currentUser, clients } = state;
  
  // Filter messages based on the selected user and if the current user is an operator
  const filteredMessages = messages.filter(msg => {
    if (selectedUser === 'all') return true;
    
    // Find messages for clients assigned to this operator
    if (currentUser?.role === 'operator') {
      const selectedClient = clients.find(client => client.id === selectedUser);
      if (selectedClient && selectedClient.operatorId === currentUser.id) {
        // Return messages for this specific client
        return true;
      }
    }
    
    return false;
  });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const imageUrl = await uploadImage(file);
        sendMessage(imageUrl, 'operator', true);
      } catch (error) {
        console.error('Failed to upload image:', error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  if (!currentUser || currentUser.role !== 'operator') {
    return (
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-center h-full p-8 text-center">
          <p className="text-gray-400">
            Inicia sesión como operador para ver los mensajes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col border-l border-casino-secondary">
      <ChatHeader selectedUser={selectedUser} />
      
      <ChatMessages 
        messages={filteredMessages} 
        selectedUser={selectedUser} 
      />
      
      <ChatInput 
        sendMessage={sendMessage} 
        isUploading={isUploading} 
        fileInputRef={fileInputRef}
        handleFileChange={handleFileChange}
      />
    </div>
  );
};
