
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Hardcoded admin credentials as specified
const ADMIN_USERNAME = 'coquito';
const ADMIN_PASSWORD = 'racata123';

export const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
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

    // Check against hardcoded admin credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Set admin session
      sessionStorage.setItem('adminLoggedIn', 'true');
      
      toast({
        title: "Bienvenido Administrador",
        description: "Has iniciado sesión correctamente",
      });
      
      navigate('/admin');
    } else {
      toast({
        title: "Error de autenticación",
        description: "Credenciales inválidas. Intenta nuevamente.",
        variant: "destructive",
      });
    }
    
    setIsLoggingIn(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-casino-gold">Panel de Administrador</CardTitle>
        <CardDescription>Acceso exclusivo para administradores del sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-center justify-center">
          <div className="bg-casino-gold p-3 rounded-full">
            <Shield className="w-8 h-8 text-casino-primary" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="admin-username" className="text-sm font-medium text-casino-text">
              Nombre de Usuario
            </label>
            <Input
              id="admin-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nombre de usuario de administrador"
              className="bg-casino-secondary text-casino-text border-casino-secondary"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="admin-password" className="text-sm font-medium text-casino-text">
              Contraseña
            </label>
            <Input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña de administrador"
              className="bg-casino-secondary text-casino-text border-casino-secondary"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full gold-gradient text-casino-primary hover:brightness-110"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-gray-400">
        <p>Panel de control principal del sistema</p>
      </CardFooter>
    </Card>
  );
};
