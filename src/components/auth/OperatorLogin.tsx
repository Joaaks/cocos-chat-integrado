
import React, { useState } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@/types/chat';
import { Loader2, HeadsetIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const OperatorLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { loginUser } = useChat();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "Error",
        description: "Por favor ingresa tu nombre de usuario y contraseña",
        variant: "destructive",
      });
      return;
    }

    setIsLoggingIn(true);

    // Simulación de autenticación de operador
    setTimeout(() => {
      const user: User = {
        id: uuidv4(),
        username,
        email: `${username}@example.com`,
        role: 'operator',
        isLoggedIn: true
      };

      loginUser(user);
      
      toast({
        title: "Bienvenido",
        description: `Has iniciado sesión como operador`,
      });
      
      setIsLoggingIn(false);
      navigate('/operator');
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <img src="/images/cocosbet-full-logo.png" alt="Cocosbet" className="h-16" />
        </div>
        <CardTitle className="text-2xl text-casino-gold">Panel de Operador</CardTitle>
        <CardDescription>Ingresa tus credenciales para acceder</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-center justify-center">
          <div className="bg-casino-gold p-3 rounded-full">
            <HeadsetIcon className="w-8 h-8 text-casino-primary" />
          </div>
        </div>

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
              placeholder="Ingresa tu nombre de usuario"
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
              placeholder="Ingresa tu contraseña"
              className="bg-casino-secondary text-casino-text border-casino-secondary"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full gold-gradient text-casino-primary hover:brightness-110"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <span className="animate-spin mr-2">
                  <Loader2 size={18} />
                </span>
                Iniciando sesión...
              </>
            ) : (
              'Iniciar Sesión'
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-gray-400">
        <p>Acceso exclusivo para operadores</p>
      </CardFooter>
    </Card>
  );
};
