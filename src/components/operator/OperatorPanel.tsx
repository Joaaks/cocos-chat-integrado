
import React, { useState, useRef } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ChatMessage } from '../chat/ChatMessage';
import { SendIcon, User, Users, Search, Image, Loader2, Phone, Mail, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const OperatorPanel = () => {
  const { state, sendMessage, setSelectedUser, uploadImage } = useChat();
  const [operatorMessage, setOperatorMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const { messages, userRequest, selectedUser } = state;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (operatorMessage.trim()) {
      sendMessage(operatorMessage, 'operator');
      setOperatorMessage('');
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Error",
          description: "Por favor sube sólo archivos de imagen.",
          variant: "destructive",
        });
        return;
      }

      setIsUploading(true);
      try {
        const imageUrl = await uploadImage(file);
        sendMessage(imageUrl, 'operator', true);
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo cargar la imagen. Inténtalo de nuevo.",
          variant: "destructive",
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Mock users for demonstration
  const mockUsers = [
    { id: 'user1', name: 'Juan Pérez', status: 'online' },
    { id: 'user2', name: 'María García', status: 'offline' },
    { id: 'user3', name: 'Carlos Rodríguez', status: 'online' },
  ];

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
            {userRequest && <Badge className="ml-2 bg-casino-accent">1</Badge>}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chats" className="flex-1 flex p-0 m-0">
          {/* Sidebar with users */}
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
          
          {/* Chat area */}
          <div className="flex-1 flex flex-col">
            {/* Chat header */}
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
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((msg, i) => (
                <ChatMessage key={msg.id} message={msg} isLast={i === messages.length - 1} />
              ))}
            </div>
            
            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-casino-secondary bg-casino-primary">
              <div className="flex flex-col space-y-2">
                <Textarea
                  value={operatorMessage}
                  onChange={(e) => setOperatorMessage(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 bg-casino-secondary text-casino-text border-casino-secondary resize-none min-h-[60px]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      if (operatorMessage.trim()) {
                        handleSendMessage(e);
                      }
                    }
                  }}
                />
                
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={triggerFileInput}
                    className="bg-casino-secondary border-casino-secondary text-casino-text hover:bg-casino-gold hover:text-casino-primary hover:border-casino-gold"
                    title="Enviar Imagen"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Image size={18} />
                    )}
                  </Button>
                  
                  <div className="flex-1"></div>
                  
                  <Button
                    type="submit"
                    disabled={!operatorMessage.trim() || isUploading}
                    className="gold-gradient text-casino-primary hover:brightness-110"
                  >
                    <SendIcon size={18} className="mr-2" />
                    Enviar
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </TabsContent>
        
        <TabsContent value="requests" className="flex-1 p-6">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};
