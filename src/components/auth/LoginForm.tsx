
import React, { useState } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@/types/chat'; // Import the User type
import { RegisterForm } from './RegisterForm';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { loginUser } = useChat();
  const { toast } = useToast();

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

    // Simulación de autenticación
    setTimeout(() => {
      // Explicitly set the role as a union type 'client' | 'operator'
      const role: 'client' | 'operator' = username.includes('operator') ? 'operator' : 'client';
      
      const user: User = {
        id: uuidv4(),
        username,
        email: `${username}@example.com`,
        role, // Using the properly typed role variable
        isLoggedIn: true
      };

      loginUser(user);
      
      toast({
        title: "Bienvenido",
        description: `Has iniciado sesión como ${username}`,
      });
      
      setIsLoggingIn(false);
    }, 1000);
  };

  if (showRegister) {
    return <RegisterForm onBackToLogin={() => setShowRegister(false)} />;
  }

  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-casino-gold">Iniciar Sesión</CardTitle>
        <CardDescription>Ingresa tus credenciales para acceder</CardDescription>
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                </span>
                Iniciando sesión...
              </>
            ) : (
              'Iniciar Sesión'
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-gray-400 flex-col gap-2">
        <Button 
          variant="link" 
          className="text-casino-gold"
          onClick={() => setShowRegister(true)}
        >
          ¿No tienes cuenta? Regístrate aquí
        </Button>
      </CardFooter>
    </Card>
  );
};
