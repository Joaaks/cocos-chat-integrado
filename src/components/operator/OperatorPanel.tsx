
import React from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Users, User, MessageSquare } from 'lucide-react';
import { UsersList } from './UsersList';
import { ChatArea } from './ChatArea';
import { UserRequestPanel } from './UserRequestPanel';
import { MacrosPanel } from './MacrosPanel';

export const OperatorPanel = () => {
  const { state, userRequest } = useChat();
  const { selectedUser } = state;

  return (
    <div className="h-screen flex flex-col bg-casino-dark text-casino-text">
      <header className="bg-casino-primary p-4 border-b border-casino-secondary">
        <h1 className="text-xl font-bold text-casino-gold">Panel del Operador</h1>
      </header>
      
      <Tabs defaultValue="chats" className="flex-1 flex flex-col">
        <TabsList className="bg-casino-primary border-b border-casino-secondary rounded-none justify-start px-4">
          <TabsTrigger value="chats" className="data-[state=active]:bg-casino-dark data-[state=active]:text-casino-gold">
            <Users className="mr-2 h-4 w-4" />
            Chats Activos
          </TabsTrigger>
          <TabsTrigger value="requests" className="data-[state=active]:bg-casino-dark data-[state=active]:text-casino-gold">
            <User className="mr-2 h-4 w-4" />
            Solicitudes
            {userRequest && <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-casino-accent text-white">1</span>}
          </TabsTrigger>
          <TabsTrigger value="macros" className="data-[state=active]:bg-casino-dark data-[state=active]:text-casino-gold">
            <MessageSquare className="mr-2 h-4 w-4" />
            Mensajes Automáticos
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chats" className="flex-1 flex p-0 m-0">
          <UsersList 
            selectedUser={selectedUser} 
            setSelectedUser={(userId) => useChat().setSelectedUser(userId)} 
            messages={state.messages}
          />
          <ChatArea />
        </TabsContent>
        
        <TabsContent value="requests" className="flex-1 p-0 m-0">
          <UserRequestPanel userRequest={userRequest} />
        </TabsContent>

        <TabsContent value="macros" className="flex-1 p-0 m-0">
          <MacrosPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};
