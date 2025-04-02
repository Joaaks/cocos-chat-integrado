
import React from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserRequest, User } from '@/types/chat';
import { CheckCircle, XCircle, User as UserIcon, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface UserRequestPanelProps {
  userRequest: UserRequest | null;
}

export const UserRequestPanel: React.FC<UserRequestPanelProps> = ({ userRequest }) => {
  const { state, assignClientToOperator } = useChat();
  const { pendingClients, currentUser } = state;
  
  if (!currentUser || currentUser.role !== 'operator') {
    return (
      <div className="flex items-center justify-center h-full p-8 text-center">
        <div>
          <UserIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-casino-gold mb-2">Acceso restringido</h3>
          <p className="text-gray-400">
            Necesitas iniciar sesión como operador para acceder a esta sección.
          </p>
        </div>
      </div>
    );
  }

  const handleAcceptClient = (clientId: string) => {
    if (currentUser && currentUser.id) {
      assignClientToOperator(clientId, currentUser.id);
    }
  };

  if (pendingClients.length === 0 && !userRequest) {
    return (
      <div className="flex items-center justify-center h-full p-8 text-center">
        <div>
          <Clock className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-casino-gold mb-2">No hay solicitudes pendientes</h3>
          <p className="text-gray-400">
            Actualmente no hay solicitudes de usuarios nuevos en espera de aprobación.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      <h2 className="text-xl font-semibold text-casino-gold">Solicitudes de Usuario Pendientes</h2>
      
      {pendingClients.map((client) => (
        <Card key={client.id} className="bg-casino-primary border-casino-secondary">
          <CardHeader>
            <CardTitle className="text-casino-gold">{client.username}</CardTitle>
            <CardDescription>
              Cliente nuevo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Email:</span>
              <span className="text-casino-text">{client.email}</span>
            </div>
            {client.phoneNumber && (
              <div className="flex justify-between">
                <span className="text-gray-400">Teléfono:</span>
                <span className="text-casino-text">{client.phoneNumber}</span>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              className="border-casino-gold text-casino-gold hover:bg-casino-gold hover:text-casino-primary"
              onClick={() => handleAcceptClient(client.id)}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Aceptar
            </Button>
          </CardFooter>
        </Card>
      ))}
      
      {userRequest && (
        <Card className="bg-casino-primary border-casino-secondary">
          <CardHeader>
            <CardTitle className="text-casino-gold">{userRequest.username}</CardTitle>
            <CardDescription>
              Solicitado hace {formatDistanceToNow(new Date(userRequest.timestamp), { locale: es })}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Email:</span>
              <span className="text-casino-text">{userRequest.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Teléfono:</span>
              <span className="text-casino-text">{userRequest.phoneNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Estado:</span>
              <span className={`${
                userRequest.status === 'approved' 
                  ? 'text-green-500' 
                  : userRequest.status === 'declined' 
                  ? 'text-red-500' 
                  : 'text-yellow-500'
              }`}>
                {userRequest.status === 'approved' 
                  ? 'Aprobado' 
                  : userRequest.status === 'declined' 
                  ? 'Rechazado' 
                  : 'Pendiente'}
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
