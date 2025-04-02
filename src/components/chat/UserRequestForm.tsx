
import React, { useState } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

export const UserRequestForm = () => {
  const { cancelUserRequest, submitUserRequest } = useChat();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

    // Simple validation
    if (!username.trim()) {
      setUsernameError('El nombre de usuario es requerido');
      isValid = false;
    } else if (username.length < 3) {
      setUsernameError('El nombre de usuario debe tener al menos 3 caracteres');
      isValid = false;
    } else {
      setUsernameError('');
    }

    if (!email.trim()) {
      setEmailError('El email es requerido');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Por favor ingresa un email válido');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (isValid) {
      submitUserRequest(username, email);
    }
  };

  return (
    <div className="p-4 animate-slide-in">
      <div className="flex items-center mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={cancelUserRequest}
          className="mr-2 text-casino-text hover:text-casino-gold"
        >
          <ArrowLeft size={18} />
        </Button>
        <h3 className="text-lg font-bold text-casino-gold">Solicitar Usuario</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username" className="text-sm text-casino-text">
            Nombre de Usuario
          </Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingresa tu nombre de usuario deseado"
            className="bg-casino-secondary text-casino-text border-casino-secondary focus:border-casino-gold"
          />
          {usernameError && <p className="text-xs text-casino-accent">{usernameError}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm text-casino-text">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu email"
            className="bg-casino-secondary text-casino-text border-casino-secondary focus:border-casino-gold"
          />
          {emailError && <p className="text-xs text-casino-accent">{emailError}</p>}
        </div>
        
        <div className="pt-2">
          <Button 
            type="submit"
            className="w-full gold-gradient text-casino-primary font-medium hover:brightness-110"
          >
            Enviar Solicitud
          </Button>
        </div>
      </form>
    </div>
  );
};
