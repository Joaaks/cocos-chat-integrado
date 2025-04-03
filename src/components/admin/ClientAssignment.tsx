
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useChat } from '@/contexts/ChatContext';
import { User } from '@/types/chat';
import { Operator } from './operators/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, Users } from 'lucide-react';

export const ClientAssignment = () => {
  const { state, assignClientToOperator } = useChat();
  const { pendingClients } = state;
  const { toast } = useToast();
  
  // This would come from a database in a real application
  const [operators, setOperators] = useState<Operator[]>([
    {
      id: '1',
      username: 'operador1',
      email: 'operador1@example.com',
      createdAt: new Date('2023-08-15'),
      clientCount: 5,
      url: 'https://casino-gold.com'
    },
    {
      id: '2',
      username: 'operador2',
      email: 'operador2@example.com',
      createdAt: new Date('2023-10-22'),
      clientCount: 3,
      url: 'https://casino-vip.com'
    }
  ]);
  
  const [selectedOperator, setSelectedOperator] = useState<string>('');

  // Filter clients that don't match any operator's URL
  // These are the clients that need manual assignment by admin
  const clientsToAssign = pendingClients.filter(client => {
    // If client has no URL, include them for manual assignment
    if (!client.url) return true;
    
    // Check if client URL doesn't match any operator URL
    return !operators.some(operator => 
      client.url && operator.url && client.url.includes(operator.url)
    );
  });

  const handleAssignClient = (client: User) => {
    if (!selectedOperator) {
      toast({
        title: "Error",
        description: "Selecciona un operador primero",
        variant: "destructive"
      });
      return;
    }
    
    // Update the operator's client count
    setOperators(prevOperators => 
      prevOperators.map(op => 
        op.id === selectedOperator 
          ? { ...op, clientCount: op.clientCount + 1 } 
          : op
      )
    );
    
    // Assign client to operator
    assignClientToOperator(client.id, selectedOperator);
    
    toast({
      title: "Cliente Asignado",
      description: `El cliente ${client.username} ha sido asignado correctamente`,
    });
  };

  if (clientsToAssign.length === 0) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="bg-casino-secondary">
            <CardTitle className="text-lg text-white">Asignación de Clientes</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Users className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-casino-gold mb-2">No hay clientes pendientes</h3>
              <p className="text-gray-400 max-w-md">
                Actualmente no hay clientes pendientes de asignación. Los nuevos clientes que no coincidan con las URLs de los operadores aparecerán aquí.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-casino-secondary">
          <CardTitle className="text-lg text-white">Asignación de Clientes</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Seleccionar Operador
            </label>
            <Select value={selectedOperator} onValueChange={setSelectedOperator}>
              <SelectTrigger className="w-full max-w-xs bg-casino-dark border-casino-secondary">
                <SelectValue placeholder="Seleccionar operador" />
              </SelectTrigger>
              <SelectContent className="bg-casino-secondary border-casino-gold">
                {operators.map(operator => (
                  <SelectItem key={operator.id} value={operator.id}>
                    {operator.username} ({operator.url})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="rounded-md border border-casino-secondary overflow-hidden">
            <Table>
              <TableHeader className="bg-casino-primary">
                <TableRow>
                  <TableHead className="text-casino-gold">Usuario</TableHead>
                  <TableHead className="text-casino-gold">Email</TableHead>
                  <TableHead className="text-casino-gold">Teléfono</TableHead>
                  <TableHead className="text-casino-gold">URL</TableHead>
                  <TableHead className="text-casino-gold text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientsToAssign.map((client) => (
                  <TableRow key={client.id} className="border-b border-casino-secondary">
                    <TableCell>{client.username}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.phoneNumber || 'N/A'}</TableCell>
                    <TableCell>
                      <span className="max-w-[200px] truncate block">{client.url || 'N/A'}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        onClick={() => handleAssignClient(client)} 
                        className="bg-casino-gold text-casino-primary hover:brightness-110"
                        disabled={!selectedOperator}
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Asignar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
