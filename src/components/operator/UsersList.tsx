
import React from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Message } from '@/types/chat';
import { UserIcon, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UsersListProps {
  selectedUser: string;
  setSelectedUser: (userId: string) => void;
  messages: Message[];
}

export const UsersList: React.FC<UsersListProps> = ({
  selectedUser,
  setSelectedUser,
  messages
}) => {
  const { state } = useChat();
  const { clients, currentUser } = state;
  
  // Filter clients that are assigned to this operator
  const operatorClients = clients.filter(client => 
    currentUser?.role === 'operator' && client.operatorId === currentUser.id
  );

  if (!currentUser || currentUser.role !== 'operator') {
    return (
      <div className="w-72 bg-casino-dark border-r border-casino-secondary p-4">
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-400 text-center">
            Inicia sesión como operador para ver la lista de clientes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-72 bg-casino-dark border-r border-casino-secondary flex flex-col">
      <div className="p-4 border-b border-casino-secondary">
        <h2 className="text-lg font-semibold text-casino-gold">Tus Clientes</h2>
        <p className="text-sm text-gray-400">Gestiona tus conversaciones</p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start font-normal",
              selectedUser === 'all' && "bg-casino-secondary text-casino-gold"
            )}
            onClick={() => setSelectedUser('all')}
          >
            <Users className="mr-2 h-4 w-4" />
            <span>Todos los mensajes</span>
          </Button>
          
          {operatorClients.length > 0 ? (
            operatorClients.map(client => (
              <Button
                key={client.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start font-normal",
                  selectedUser === client.id && "bg-casino-secondary text-casino-gold"
                )}
                onClick={() => setSelectedUser(client.id)}
              >
                <UserIcon className="mr-2 h-4 w-4" />
                <span>{client.username}</span>
              </Button>
            ))
          ) : (
            <div className="text-center p-4 text-gray-400">
              <p>No tienes clientes asignados</p>
              <p className="text-xs mt-1">Los clientes aparecerán aquí cuando los aceptes</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
