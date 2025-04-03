
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogTrigger
} from '@/components/ui/dialog';
import { Plus, Edit, RefreshCcw, Trash2 } from 'lucide-react';
import { useChat } from '@/contexts/ChatContext';
import { v4 as uuidv4 } from 'uuid';
import { Label } from '@/components/ui/label';

type Operator = {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  clientCount: number;
  url: string; // Nueva propiedad para la URL asociada
};

// This would come from a database in a real application
const initialOperators: Operator[] = [
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
];

export const OperatorsManagement = () => {
  const [operators, setOperators] = useState<Operator[]>(initialOperators);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [resetPasswordId, setResetPasswordId] = useState<string | null>(null);
  const [newPasswordReset, setNewPasswordReset] = useState('');
  const { toast } = useToast();

  const handleCreateOperator = () => {
    if (!newUsername || !newEmail || !newPassword || !newUrl) {
      toast({
        title: "Error",
        description: "Todos los campos son requeridos",
        variant: "destructive"
      });
      return;
    }
    
    // Create new operator
    const newOperator: Operator = {
      id: uuidv4(),
      username: newUsername,
      email: newEmail,
      createdAt: new Date(),
      clientCount: 0,
      url: newUrl
    };
    
    setOperators([...operators, newOperator]);
    
    toast({
      title: "Operador creado",
      description: `El operador ${newUsername} ha sido creado exitosamente`,
    });
    
    // Reset form
    setNewUsername('');
    setNewEmail('');
    setNewPassword('');
    setNewUrl('');
  };
  
  const handleResetPassword = () => {
    if (!resetPasswordId || !newPasswordReset) {
      toast({
        title: "Error",
        description: "Debes proporcionar una nueva contraseña",
        variant: "destructive"
      });
      return;
    }
    
    const operator = operators.find(op => op.id === resetPasswordId);
    
    if (operator) {
      toast({
        title: "Contraseña restablecida",
        description: `La contraseña de ${operator.username} ha sido actualizada`,
      });
      
      setResetPasswordId(null);
      setNewPasswordReset('');
    }
  };
  
  const handleDeleteOperator = (id: string) => {
    const updatedOperators = operators.filter(op => op.id !== id);
    setOperators(updatedOperators);
    
    toast({
      title: "Operador eliminado",
      description: "El operador ha sido eliminado exitosamente",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-casino-secondary">
          <CardTitle className="text-lg text-white">Gestión de Operadores</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mb-6 bg-casino-gold text-casino-primary hover:brightness-110">
                <Plus className="mr-2 h-4 w-4" />
                Crear Nuevo Operador
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-casino-secondary text-white">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Operador</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Nombre de Usuario</Label>
                  <Input
                    id="username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="Nombre de usuario"
                    className="bg-casino-dark border-casino-gold"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="correo@ejemplo.com"
                    className="bg-casino-dark border-casino-gold"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Contraseña"
                    className="bg-casino-dark border-casino-gold"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="url">URL Asociada</Label>
                  <Input
                    id="url"
                    type="url"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://ejemplo.com"
                    className="bg-casino-dark border-casino-gold"
                  />
                  <p className="text-xs text-gray-300 mt-1">
                    URL a la que este operador estará asociado
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateOperator} className="bg-casino-gold text-casino-primary hover:brightness-110">
                  Crear Operador
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="rounded-md border border-casino-secondary overflow-hidden">
            <Table>
              <TableHeader className="bg-casino-primary">
                <TableRow>
                  <TableHead className="text-casino-gold">Usuario</TableHead>
                  <TableHead className="text-casino-gold">Email</TableHead>
                  <TableHead className="text-casino-gold">URL Asociada</TableHead>
                  <TableHead className="text-casino-gold">Fecha de Creación</TableHead>
                  <TableHead className="text-casino-gold">Clientes</TableHead>
                  <TableHead className="text-casino-gold text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {operators.map((operator) => (
                  <TableRow key={operator.id} className="border-b border-casino-secondary">
                    <TableCell>{operator.username}</TableCell>
                    <TableCell>{operator.email}</TableCell>
                    <TableCell>
                      <span className="max-w-[200px] truncate block">{operator.url}</span>
                    </TableCell>
                    <TableCell>{operator.createdAt.toLocaleDateString()}</TableCell>
                    <TableCell>{operator.clientCount}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => setResetPasswordId(operator.id)}
                              className="border-casino-gold text-casino-gold hover:bg-casino-gold hover:text-casino-primary"
                            >
                              <RefreshCcw size={16} />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-casino-secondary text-white">
                            <DialogHeader>
                              <DialogTitle>Restablecer Contraseña</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <p>Ingresa la nueva contraseña para {operator.username}</p>
                              <Input
                                type="password"
                                value={newPasswordReset}
                                onChange={(e) => setNewPasswordReset(e.target.value)}
                                placeholder="Nueva contraseña"
                                className="bg-casino-dark border-casino-gold"
                              />
                            </div>
                            <DialogFooter>
                              <Button onClick={handleResetPassword} className="bg-casino-gold text-casino-primary hover:brightness-110">
                                Guardar Contraseña
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => handleDeleteOperator(operator.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
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
