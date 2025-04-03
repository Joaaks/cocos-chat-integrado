
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Clock, MessageSquare, CheckCheck, Eye } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

type ChatRecord = {
  id: string;
  operatorId: string;
  operatorName: string;
  clientId: string;
  clientName: string;
  lastMessage: string;
  timestamp: Date;
  responseTime: number; // tiempo en minutos
  status: 'answered' | 'pending' | 'seen'; // respondido, pendiente, visto
  url: string;
};

// Datos de ejemplo para la tabla de chats
const mockChats: ChatRecord[] = [
  {
    id: '1',
    operatorId: 'op1',
    operatorName: 'Operador 1',
    clientId: 'client1',
    clientName: 'Usuario 1',
    lastMessage: 'Hola, tengo una consulta sobre mi cuenta',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutos atrás
    responseTime: 3,
    status: 'answered',
    url: 'https://casino1.com'
  },
  {
    id: '2',
    operatorId: 'op2',
    operatorName: 'Operador 2',
    clientId: 'client2',
    clientName: 'Usuario 2',
    lastMessage: '¿Puedo saber cuáles son los métodos de pago disponibles?',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutos atrás
    responseTime: 0,
    status: 'seen',
    url: 'https://casino2.com'
  },
  {
    id: '3',
    operatorId: 'op1',
    operatorName: 'Operador 1',
    clientId: 'client3',
    clientName: 'Usuario 3',
    lastMessage: 'Necesito ayuda con un depósito que realicé',
    timestamp: new Date(Date.now() - 1000 * 60 * 2), // 2 minutos atrás
    responseTime: 0,
    status: 'pending',
    url: 'https://casino1.com'
  },
];

type OperatorStats = {
  id: string;
  name: string;
  totalChats: number;
  answeredChats: number;
  avgResponseTime: number;
  pendingChats: number;
  seenButNotAnswered: number;
  url: string;
};

// Datos de ejemplo para las estadísticas de operadores
const mockOperatorStats: OperatorStats[] = [
  {
    id: 'op1',
    name: 'Operador 1',
    totalChats: 45,
    answeredChats: 42,
    avgResponseTime: 2.5,
    pendingChats: 2,
    seenButNotAnswered: 1,
    url: 'https://casino1.com'
  },
  {
    id: 'op2',
    name: 'Operador 2',
    totalChats: 38,
    answeredChats: 32,
    avgResponseTime: 3.8,
    pendingChats: 4,
    seenButNotAnswered: 2,
    url: 'https://casino2.com'
  },
  {
    id: 'op3',
    name: 'Operador 3',
    totalChats: 27,
    answeredChats: 25,
    avgResponseTime: 1.9,
    pendingChats: 1,
    seenButNotAnswered: 1,
    url: 'https://casino3.com'
  },
];

export const ChatsMonitor = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filtrado de chats basado en la búsqueda
  const filteredChats = mockChats.filter(chat => 
    chat.operatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.url.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Filtrado de estadísticas basado en la búsqueda
  const filteredStats = mockOperatorStats.filter(stat => 
    stat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stat.url.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Renderización de insignia de estado
  const renderStatusBadge = (status: 'answered' | 'pending' | 'seen') => {
    switch (status) {
      case 'answered':
        return <Badge className="bg-green-500">Respondido</Badge>;
      case 'pending':
        return <Badge className="bg-red-500">Pendiente</Badge>;
      case 'seen':
        return <Badge className="bg-yellow-500">Visto</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="chats" className="space-y-6">
        <TabsList className="w-full bg-casino-primary justify-start">
          <TabsTrigger value="chats" className="flex items-center data-[state=active]:bg-casino-dark data-[state=active]:text-casino-gold">
            <MessageSquare className="mr-2 h-4 w-4" />
            Chats Activos
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center data-[state=active]:bg-casino-dark data-[state=active]:text-casino-gold">
            <Clock className="mr-2 h-4 w-4" />
            Rendimiento de Operadores
          </TabsTrigger>
        </TabsList>
        
        <div className="relative max-w-sm mb-6">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Buscar..."
            className="pl-8 bg-casino-dark border-casino-secondary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <TabsContent value="chats" className="m-0">
          <Card>
            <CardHeader className="bg-casino-secondary">
              <CardTitle className="text-lg text-white">Monitoreo de Chats</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="rounded-md border border-casino-secondary overflow-hidden">
                <Table>
                  <TableHeader className="bg-casino-primary">
                    <TableRow>
                      <TableHead className="text-casino-gold">Cliente</TableHead>
                      <TableHead className="text-casino-gold">Operador</TableHead>
                      <TableHead className="text-casino-gold">Último Mensaje</TableHead>
                      <TableHead className="text-casino-gold">Hora</TableHead>
                      <TableHead className="text-casino-gold">T. Respuesta</TableHead>
                      <TableHead className="text-casino-gold">Estado</TableHead>
                      <TableHead className="text-casino-gold">URL</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredChats.map((chat) => (
                      <TableRow key={chat.id} className="border-b border-casino-secondary">
                        <TableCell>{chat.clientName}</TableCell>
                        <TableCell>{chat.operatorName}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{chat.lastMessage}</TableCell>
                        <TableCell>{chat.timestamp.toLocaleTimeString()}</TableCell>
                        <TableCell>
                          {chat.responseTime > 0 ? `${chat.responseTime} min` : '—'}
                        </TableCell>
                        <TableCell>
                          {renderStatusBadge(chat.status)}
                        </TableCell>
                        <TableCell>{chat.url}</TableCell>
                      </TableRow>
                    ))}
                    {filteredChats.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">
                          No se encontraron chats que coincidan con la búsqueda
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stats" className="m-0">
          <Card>
            <CardHeader className="bg-casino-secondary">
              <CardTitle className="text-lg text-white">Rendimiento de Operadores</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="rounded-md border border-casino-secondary overflow-hidden">
                <Table>
                  <TableHeader className="bg-casino-primary">
                    <TableRow>
                      <TableHead className="text-casino-gold">Operador</TableHead>
                      <TableHead className="text-casino-gold">Total Chats</TableHead>
                      <TableHead className="text-casino-gold">Respondidos</TableHead>
                      <TableHead className="text-casino-gold">Tiempo Prom.</TableHead>
                      <TableHead className="text-casino-gold">Pendientes</TableHead>
                      <TableHead className="text-casino-gold">Vistos (No Resp.)</TableHead>
                      <TableHead className="text-casino-gold">URL</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStats.map((stat) => (
                      <TableRow key={stat.id} className="border-b border-casino-secondary">
                        <TableCell>{stat.name}</TableCell>
                        <TableCell>{stat.totalChats}</TableCell>
                        <TableCell>{stat.answeredChats} ({Math.round(stat.answeredChats/stat.totalChats*100)}%)</TableCell>
                        <TableCell>{stat.avgResponseTime} min</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs ${stat.pendingChats > 3 ? 'bg-red-500' : 'bg-yellow-500'}`}>
                            {stat.pendingChats}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs ${stat.seenButNotAnswered > 2 ? 'bg-red-500' : 'bg-yellow-500'}`}>
                            {stat.seenButNotAnswered}
                          </span>
                        </TableCell>
                        <TableCell>{stat.url}</TableCell>
                      </TableRow>
                    ))}
                    {filteredStats.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">
                          No se encontraron operadores que coincidan con la búsqueda
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-casino-secondary">
                  <CardContent className="p-4 flex items-center">
                    <div className="mr-4 p-3 bg-casino-gold rounded-full">
                      <Clock className="h-5 w-5 text-casino-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Tiempo Promedio</p>
                      <p className="text-xl font-bold text-white">2.7 min</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-casino-secondary">
                  <CardContent className="p-4 flex items-center">
                    <div className="mr-4 p-3 bg-casino-gold rounded-full">
                      <CheckCheck className="h-5 w-5 text-casino-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Tasa de Respuesta</p>
                      <p className="text-xl font-bold text-white">91%</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-casino-secondary">
                  <CardContent className="p-4 flex items-center">
                    <div className="mr-4 p-3 bg-casino-gold rounded-full">
                      <Eye className="h-5 w-5 text-casino-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Vistos sin Responder</p>
                      <p className="text-xl font-bold text-white">4 chats</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
