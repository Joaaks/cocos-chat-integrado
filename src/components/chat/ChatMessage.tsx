
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Message } from '@/types/chat';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface ChatMessageProps {
  message: Message;
  isLast: boolean;
}

export const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ message, isLast }, ref) => {
    const formattedTime = format(new Date(message.timestamp), 'HH:mm', { locale: es });
    const isClient = message.sender === 'client';

    return (
      <div
        ref={isLast ? ref : null}
        className={cn(
          'flex mb-3 animate-slide-in',
          isClient ? 'justify-end' : 'justify-start'
        )}
      >
        <div className="flex flex-col max-w-[70%]">
          {message.isImage ? (
            <div className={cn(
              'rounded-lg overflow-hidden border',
              isClient 
                ? 'border-casino-gold bg-casino-secondary/30' 
                : 'border-casino-secondary bg-casino-primary/50'
            )}>
              <img
                src={message.content}
                alt="Imagen compartida"
                className="max-w-full rounded-lg"
              />
            </div>
          ) : (
            <div className={cn(
              isClient ? 'message-bubble-client' : 'message-bubble-operator'
            )}>
              {message.content}
            </div>
          )}
          <span className={cn(
            'text-xs mt-1 text-gray-400',
            isClient ? 'text-right' : 'text-left'
          )}>
            {formattedTime}
          </span>
        </div>
      </div>
    );
  }
);

ChatMessage.displayName = 'ChatMessage';
