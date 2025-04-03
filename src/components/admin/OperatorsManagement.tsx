
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { Operator } from './operators/types';
import { OperatorsTable } from './operators/OperatorsTable';
import { CreateOperatorForm } from './operators/CreateOperatorForm';

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
          <CreateOperatorForm 
            newUsername={newUsername}
            setNewUsername={setNewUsername}
            newEmail={newEmail}
            setNewEmail={setNewEmail}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            newUrl={newUrl}
            setNewUrl={setNewUrl}
            onCreateOperator={handleCreateOperator}
          />
          
          <OperatorsTable 
            operators={operators}
            onDeleteOperator={handleDeleteOperator}
            resetPasswordId={resetPasswordId}
            setResetPasswordId={setResetPasswordId}
            newPasswordReset={newPasswordReset}
            setNewPasswordReset={setNewPasswordReset}
            handleResetPassword={handleResetPassword}
          />
        </CardContent>
      </Card>
    </div>
  );
};
