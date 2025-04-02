
import React from 'react';
import { User, Users } from 'lucide-react';

interface ChatHeaderProps {
  selectedUser: string;
  mockUsers: {
    id: string;
    name: string;
    status: string;
  }[];
}

export const ChatHeader = ({ selectedUser, mockUsers }: ChatHeaderProps) => {
  return (
    <div className="p-4 border-b border-casino-secondary bg-casino-primary">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-casino-secondary rounded-full flex items-center justify-center mr-3">
          {selectedUser === 'all' ? (
            <Users size={16} />
          ) : (
            <User size={16} />
          )}
        </div>
        <div>
          <h3 className="font-medium">
            {selectedUser === 'all' 
              ? 'Todos los mensajes' 
              : mockUsers.find(u => u.id === selectedUser)?.name || 'Chat'}
          </h3>
          <p className="text-xs text-gray-400">
            {selectedUser === 'all'
              ? `${mockUsers.filter(u => u.status === 'online').length} usuarios en línea`
              : mockUsers.find(u => u.id === selectedUser)?.status === 'online'
                ? 'En línea'
                : 'Desconectado'
            }
          </p>
        </div>
      </div>
    </div>
  );
};
