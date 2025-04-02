
import React from 'react';
import { ChatMessage } from '../chat/ChatMessage';
import { Message } from '@/types/chat';

interface ChatMessagesProps {
  messages: Message[];
}

export const ChatMessages = ({ messages }: ChatMessagesProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((msg, i) => (
        <ChatMessage key={msg.id} message={msg} isLast={i === messages.length - 1} />
      ))}
    </div>
  );
};
