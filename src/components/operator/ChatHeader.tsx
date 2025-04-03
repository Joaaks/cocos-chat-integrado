
import React from 'react';
import { User, Users } from 'lucide-react';

interface ChatHeaderProps {
  clientName: string;
}

export const ChatHeader = ({ clientName }: ChatHeaderProps) => {
  return (
    <div className="p-4 border-b border-casino-secondary bg-casino-primary">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-casino-secondary rounded-full flex items-center justify-center mr-3">
          {clientName ? (
            <User size={16} />
          ) : (
            <Users size={16} />
          )}
        </div>
        <div>
          <h3 className="font-medium">
            {clientName || 'Selecciona un cliente para ver la conversación'}
          </h3>
          <p className="text-xs text-gray-400">
            {clientName ? 'En línea' : 'No hay cliente seleccionado'}
          </p>
        </div>
      </div>
    </div>
  );
};
