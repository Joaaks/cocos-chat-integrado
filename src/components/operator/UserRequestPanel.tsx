
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserRequest } from '@/types/chat';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Mail, Phone, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserRequestPanelProps {
  userRequest: UserRequest | null;
}

export const UserRequestPanel = ({ userRequest }: UserRequestPanelProps) => {
  const { toast } = useToast();

  const handleApproveUser = () => {
    toast({
      title: "Usuario Aprobado",
      description: `La solicitud de ${userRequest?.username} ha sido aprobada.`,
    });
  };

  const handleRejectUser = () => {
    toast({
      title: "Usuario Rechazado",
      description: `La solicitud de ${userRequest?.username} ha sido rechazada.`,
    });
  };

  return (
    <div className="flex-1 p-6">
      <h2 className="text-lg font-medium mb-4">Solicitudes de Usuario</h2>
      
      {userRequest ? (
        <div className="bg-casino-secondary rounded-lg p-4 animate-fade-in">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-medium text-casino-gold">{userRequest.username}</h3>
              <div className="flex items-center text-sm text-gray-400 mt-1">
                <Mail className="h-4 w-4 mr-1" /> {userRequest.email}
              </div>
              <div className="flex items-center text-sm text-gray-400 mt-1">
                <Phone className="h-4 w-4 mr-1" /> {userRequest.phoneNumber}
              </div>
              <div className="flex items-center text-sm text-gray-400 mt-1">
                <Lock className="h-4 w-4 mr-1" /> Contraseña establecida
              </div>
            </div>
            <Badge className={`${
              userRequest.status === 'approved' 
                ? 'bg-green-500' 
                : userRequest.status === 'declined'
                ? 'bg-casino-accent'
                : 'bg-yellow-500'
            }`}>
              {userRequest.status === 'approved' 
                ? 'Aprobado' 
                : userRequest.status === 'declined'
                ? 'Rechazado'
                : 'Pendiente'
              }
            </Badge>
          </div>
          
          <div className="text-xs text-gray-400 mb-4">
            Solicitado el {format(new Date(userRequest.timestamp), 'dd MMM yyyy, HH:mm', { locale: es })}
          </div>
          
          <div className="flex space-x-2">
            <Button
              className="bg-green-500 hover:bg-green-600 text-white"
              disabled={userRequest.status !== 'pending'}
              onClick={handleApproveUser}
            >
              Aprobar
            </Button>
            <Button
              variant="outline"
              className="border-casino-accent text-casino-accent hover:bg-casino-accent hover:text-white"
              disabled={userRequest.status !== 'pending'}
              onClick={handleRejectUser}
            >
              Rechazar
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-10 text-gray-400">
          No hay solicitudes pendientes
        </div>
      )}
    </div>
  );
};
