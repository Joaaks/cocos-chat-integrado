
import React from 'react';
import { User } from 'lucide-react';
import { Users } from 'lucide-react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface UsersListProps {
  selectedUser: string;
  setSelectedUser: (userId: string) => void;
  messages: any[];
}

export const UsersList = ({ selectedUser, setSelectedUser, messages }: UsersListProps) => {
  // Mock users for demonstration
  const mockUsers = [
    { id: 'user1', name: 'Juan Pérez', status: 'online' },
    { id: 'user2', name: 'María García', status: 'offline' },
    { id: 'user3', name: 'Carlos Rodríguez', status: 'online' },
  ];

  return (
    <div className="w-1/3 border-r border-casino-secondary bg-casino-primary overflow-auto">
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar chats"
            className="w-full pl-9 bg-casino-secondary border-casino-secondary text-casino-text"
          />
        </div>
      </div>
      
      <div className="space-y-1 p-1">
        <button
          onClick={() => setSelectedUser('all')}
          className={`w-full text-left p-3 hover:bg-casino-secondary rounded-md transition-colors ${
            selectedUser === 'all' ? 'bg-casino-secondary' : ''
          }`}
        >
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center mr-3">
              <Users size={16} className="text-casino-primary" />
            </div>
            <div>
              <div className="font-medium">Todos los mensajes</div>
              <div className="text-xs text-gray-400">{messages.length} mensajes</div>
            </div>
          </div>
        </button>
        
        {mockUsers.map((user) => (
          <button
            key={user.id}
            onClick={() => setSelectedUser(user.id)}
            className={`w-full text-left p-3 hover:bg-casino-secondary rounded-md transition-colors ${
              selectedUser === user.id ? 'bg-casino-secondary' : ''
            }`}
          >
            <div className="flex items-center">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-casino-secondary flex items-center justify-center mr-3">
                  <User size={16} />
                </div>
                <span className={`absolute bottom-0 right-3 w-3 h-3 rounded-full ${
                  user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                }`}></span>
              </div>
              <div>
                <div className="font-medium">{user.name}</div>
                <div className="text-xs text-gray-400">
                  {user.status === 'online' ? 'En línea' : 'Desconectado'}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
