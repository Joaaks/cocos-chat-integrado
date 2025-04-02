
import React, { useState } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';

export const UserRequestForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { submitUserRequest, cancelUserRequest } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!username || !email || !phoneNumber || !password || !confirmPassword) {
      alert('Por favor completa todos los campos');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulamos envío con un pequeño retraso
    setTimeout(() => {
      submitUserRequest(username, email, phoneNumber, password);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="p-5 h-full flex flex-col animate-fade-in">
      <div className="mb-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={cancelUserRequest}
          className="text-casino-text hover:text-casino-gold hover:bg-transparent"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al chat
        </Button>
      </div>
      
      <h3 className="text-xl font-medium text-casino-gold mb-4">Solicitud de Nueva Cuenta</h3>
      <p className="text-sm text-gray-400 mb-6">
        Completa el formulario para crear tu cuenta. Un operador revisará tu solicitud.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4 flex-1">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-casino-text mb-1">
            Nombre de Usuario
          </label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Elige un nombre de usuario"
            className="bg-casino-secondary text-casino-text border-casino-secondary"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-casino-text mb-1">
            Correo Electrónico
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@correo.com"
            className="bg-casino-secondary text-casino-text border-casino-secondary"
            required
          />
        </div>
        
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-casino-text mb-1">
            Número de Celular
          </label>
          <Input
            id="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="1234567890"
            className="bg-casino-secondary text-casino-text border-casino-secondary"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-casino-text mb-1">
            Contraseña
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Crea una contraseña segura"
            className="bg-casino-secondary text-casino-text border-casino-secondary"
            required
          />
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-casino-text mb-1">
            Confirmar Contraseña
          </label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repite tu contraseña"
            className="bg-casino-secondary text-casino-text border-casino-secondary"
            required
          />
        </div>

        <div className="pt-2">
          <Button 
            type="submit" 
            className="w-full gold-gradient text-casino-primary hover:brightness-110"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Enviando...
              </>
            ) : (
              'Enviar Solicitud'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
