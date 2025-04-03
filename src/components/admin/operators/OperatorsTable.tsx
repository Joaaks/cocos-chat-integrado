
import React from 'react';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2, RefreshCcw } from 'lucide-react';
import { Operator } from './types';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface OperatorsTableProps {
  operators: Operator[];
  onDeleteOperator: (id: string) => void;
  resetPasswordId: string | null;
  setResetPasswordId: (id: string | null) => void;
  newPasswordReset: string;
  setNewPasswordReset: (password: string) => void;
  handleResetPassword: () => void;
}

export const OperatorsTable: React.FC<OperatorsTableProps> = ({
  operators,
  onDeleteOperator,
  resetPasswordId,
  setResetPasswordId,
  newPasswordReset,
  setNewPasswordReset,
  handleResetPassword
}) => {
  return (
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
                    onClick={() => onDeleteOperator(operator.id)}
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
  );
};
