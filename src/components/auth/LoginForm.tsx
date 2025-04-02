
import React, { useState } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@/types/chat'; // Import the User type
import { RegisterForm } from './RegisterForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, UserIcon, HeadsetIcon } from 'lucide-react';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loginType, setLoginType] = useState<'client' | 'operator'>('client');
  
  const { loginUser } = useChat();
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast({
        title: "Error",
        description: "Por favor ingresa tu nombre de usuario y contraseña",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoggingIn(true);

    // Simulación de autenticación
    setTimeout(() => {
      // Use the selected login type instead of automatically determining by username
      const role: 'client' | 'operator' = loginType;
      const user: User = {
        id: uuidv4(),
        username,
        email: `${username}@example.com`,
        role,
        isLoggedIn: true,
        // Add operatorId if this is a client account
        ...(role === 'client' && {
          operatorId: null
        }) // Initially null, will be assigned when accepted by an operator
      };
      
      loginUser(user);
      
      toast({
        title: "Bienvenido",
        description: `Has iniciado sesión como ${role === 'operator' ? 'operador' : 'cliente'}`
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
        <Tabs defaultValue="client" className="w-full mb-6" onValueChange={value => setLoginType(value as 'client' | 'operator')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="client" className="flex items-center gap-2">
              <UserIcon size={16} />
              Cliente
            </TabsTrigger>
            <TabsTrigger value="operator" className="flex items-center gap-2">
              <HeadsetIcon size={16} />
              Operador
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="client">
            <p className="text-sm text-gray-400 mb-4">Accede como cliente para chatear con nuestros operadores</p>
          </TabsContent>
          
          <TabsContent value="operator">
            <p className="text-sm text-gray-400 mb-4">Accede como operador para atender solicitudes de clientes</p>
          </TabsContent>
        </Tabs>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-casino-text">
              Nombre de Usuario
            </label>
            <Input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Ingresa tu nombre de usuario" className="bg-casino-secondary text-casino-text border-casino-secondary" />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-casino-text">
              Contraseña
            </label>
            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Ingresa tu contraseña" className="bg-casino-secondary text-casino-text border-casino-secondary" />
          </div>
          <Button type="submit" className="w-full gold-gradient text-casino-primary hover:brightness-110" disabled={isLoggingIn}>
            {isLoggingIn ? <>
                <span className="animate-spin mr-2">
                  <Loader2 size={18} />
                </span>
                Iniciando sesión...
              </> : 'Iniciar Sesión'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-gray-400 flex-col gap-2">
        <Button variant="link" className="text-casino-gold" onClick={() => setShowRegister(true)}>
          ¿No tienes cuenta? Regístrate aquí
        </Button>
      </CardFooter>
    </Card>
  );
};
