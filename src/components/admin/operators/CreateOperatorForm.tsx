
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogTrigger
} from '@/components/ui/dialog';

interface CreateOperatorFormProps {
  newUsername: string;
  setNewUsername: (username: string) => void;
  newEmail: string;
  setNewEmail: (email: string) => void;
  newPassword: string;
  setNewPassword: (password: string) => void;
  newUrl: string;
  setNewUrl: (url: string) => void;
  onCreateOperator: () => void;
}

export const CreateOperatorForm: React.FC<CreateOperatorFormProps> = ({
  newUsername,
  setNewUsername,
  newEmail,
  setNewEmail,
  newPassword,
  setNewPassword,
  newUrl,
  setNewUrl,
  onCreateOperator
}) => {
  return (
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
          <Button onClick={onCreateOperator} className="bg-casino-gold text-casino-primary hover:brightness-110">
            Crear Operador
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
