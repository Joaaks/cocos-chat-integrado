
import React from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { Message } from '@/types/chat';

interface ChatAreaProps {
  selectedUser: string;
  messages: Message[];
  sendMessage: (content: string, sender: 'client' | 'operator', isImage?: boolean) => void;
  uploadImage: (file: File) => Promise<string>;
}

export const ChatArea = ({ selectedUser, messages, sendMessage, uploadImage }: ChatAreaProps) => {
  // Mock users for the header
  const mockUsers = [
    { id: 'user1', name: 'Juan Pérez', status: 'online' },
    { id: 'user2', name: 'María García', status: 'offline' },
    { id: 'user3', name: 'Carlos Rodríguez', status: 'online' },
  ];

  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader selectedUser={selectedUser} mockUsers={mockUsers} />
      <ChatMessages messages={messages} />
      <ChatInput sendMessage={sendMessage} uploadImage={uploadImage} />
    </div>
  );
};
