
import React from 'react';
import { useChat } from '@/contexts/ChatContext';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';

export const ChatArea: React.FC = () => {
  const { state, sendMessage, uploadImage } = useChat();
  const { selectedUser, clients, currentUser } = state;

  // Filtrar los mensajes según el usuario seleccionado
  const filteredMessages = state.messages.filter(msg => {
    // Si no hay un usuario seleccionado, no mostrar mensajes
    if (selectedUser === 'all') return false;
    
    // Si el mensaje es del operador actual, verificar si está dirigido al usuario seleccionado
    if (msg.sender === 'operator' && currentUser?.id === msg.operatorId) {
      return msg.clientId === selectedUser;
    }
    
    // Si el mensaje es de un cliente, verificar si es del usuario seleccionado
    if (msg.sender === 'client') {
      return msg.clientId === selectedUser;
    }
    
    // Para mantener compatibilidad con mensajes antiguos que no tienen clientId
    return false;
  });

  // Encontrar el cliente seleccionado
  const selectedClient = clients.find(client => client.id === selectedUser);

  const handleSendMessage = (content: string) => {
    if (selectedUser && selectedUser !== 'all') {
      // Añadir información de destinatario al mensaje del operador
      const messageWithRecipient = {
        content,
        clientId: selectedUser,
        operatorId: currentUser?.id
      };
      sendMessage(content, 'operator', false, messageWithRecipient);
    }
  };

  const handleUploadImage = async (file: File): Promise<string> => {
    return await uploadImage(file);
  };

  return (
    <div className="flex flex-col h-full bg-casino-dark">
      <ChatHeader clientName={selectedClient?.username || ''} />
      
      <div className="flex-1 overflow-y-auto">
        {selectedUser === 'all' ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">Selecciona un cliente para ver la conversación</p>
          </div>
        ) : (
          <ChatMessages messages={filteredMessages} />
        )}
      </div>
      
      {selectedUser !== 'all' && (
        <ChatInput 
          sendMessage={handleSendMessage} 
          uploadImage={handleUploadImage}
        />
      )}
    </div>
  );
};
