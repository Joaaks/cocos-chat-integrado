
import React, { useState } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { User, UserRequest } from '@/types/chat';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface RegisterFormProps {
  onBackToLogin: () => void;
}

export const RegisterForm = ({ onBackToLogin }: RegisterFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const { submitUserRequest } = useChat();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!username || !password || !confirmPassword || !email || !phoneNumber) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      });
      return;
    }

    // Validación simple de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Error",
        description: "Por favor ingresa un email válido",
        variant: "destructive",
      });
      return;
    }

    // Validación simple de número de teléfono
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      toast({
        title: "Error",
        description: "Por favor ingresa un número de teléfono válido (10 dígitos)",
        variant: "destructive",
      });
      return;
    }

    setIsRegistering(true);

    // Simulamos el envío del formulario
    setTimeout(() => {
      // Enviar solicitud de registro con toda la información
      submitUserRequest(username, email, phoneNumber, password);
      
      toast({
        title: "Solicitud Enviada",
        description: "Tu solicitud de registro ha sido enviada. Espera la aprobación del operador.",
      });
      
      setIsRegistering(false);
      onBackToLogin(); // Volver al formulario de inicio de sesión
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-casino-gold">Registro de Usuario</CardTitle>
        <CardDescription>Crea una nueva cuenta para acceder</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-casino-text">
              Nombre de Usuario
            </label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa un nombre de usuario"
              className="bg-casino-secondary text-casino-text border-casino-secondary"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-casino-text">
              Correo Electrónico
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@ejemplo.com"
              className="bg-casino-secondary text-casino-text border-casino-secondary"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="phoneNumber" className="text-sm font-medium text-casino-text">
              Número de Celular
            </label>
            <Input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="1234567890"
              className="bg-casino-secondary text-casino-text border-casino-secondary"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-casino-text">
              Contraseña
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Crea una contraseña segura"
              className="bg-casino-secondary text-casino-text border-casino-secondary"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-casino-text">
              Confirmar Contraseña
            </label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirma tu contraseña"
              className="bg-casino-secondary text-casino-text border-casino-secondary"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full gold-gradient text-casino-primary hover:brightness-110"
            disabled={isRegistering}
          >
            {isRegistering ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Enviando solicitud...
              </>
            ) : (
              'Registrarse'
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button 
          variant="link" 
          className="text-casino-gold"
          onClick={onBackToLogin}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Iniciar Sesión
        </Button>
      </CardFooter>
    </Card>
  );
};
