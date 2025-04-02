
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ClientChat } from '@/components/chat/ClientChat';
import { LoginForm } from '@/components/auth/LoginForm';
import { useChat } from '@/contexts/ChatContext';
import { LogOut } from 'lucide-react';

const Index = () => {
  const { state, logoutUser } = useChat();
  const { currentUser } = state;
  const [showLogin, setShowLogin] = useState(false);

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <div className="min-h-screen bg-casino-dark">
      {/* Header */}
      <header className="bg-casino-primary py-4 px-6 border-b border-casino-secondary">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-casino-gold">Casino Chat Connect</div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-casino-text hover:text-casino-gold transition-colors">Inicio</a>
            <a href="#" className="text-casino-text hover:text-casino-gold transition-colors">Juegos</a>
            <a href="#" className="text-casino-text hover:text-casino-gold transition-colors">Promociones</a>
            <a href="#" className="text-casino-text hover:text-casino-gold transition-colors">Sobre Nosotros</a>
            <Link to="/operator" className="text-casino-text hover:text-casino-gold transition-colors">Panel de Operador</Link>
          </nav>
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <span className="text-casino-text">Hola, {currentUser.username}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-casino-gold text-casino-gold hover:bg-casino-gold hover:text-casino-primary"
                  onClick={handleLogout}
                >
                  <LogOut size={16} className="mr-1" /> Salir
                </Button>
              </div>
            ) : (
              <Button 
                className="gold-gradient text-casino-primary font-medium hover:brightness-110"
                onClick={() => setShowLogin(true)}
              >
                Iniciar Sesión
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      {showLogin && !currentUser ? (
        <div className="container mx-auto py-16 px-6">
          <div className="max-w-md mx-auto">
            <LoginForm />
            <div className="mt-4 text-center">
              <Button 
                variant="link" 
                className="text-casino-gold"
                onClick={() => setShowLogin(false)}
              >
                Volver a la página principal
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <section className="py-20 px-6">
            <div className="container mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-casino-gold">Chat en tiempo real</span> <br />
                <span className="text-casino-text">para tu experiencia de casino</span>
              </h1>
              <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                Comunícate con nuestros operadores y solicita tu usuario para comenzar a jugar en nuestra plataforma de casino.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="gold-gradient text-casino-primary text-lg px-8 py-6 font-medium hover:brightness-110">
                  Comenzar Ahora
                </Button>
                <Link to="/operator">
                  <Button variant="outline" className="border-casino-gold text-casino-gold hover:bg-casino-gold hover:text-casino-primary text-lg px-8 py-6">
                    Panel de Operador
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 px-6 bg-casino-primary">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-casino-gold">Características del Chat</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-casino-dark p-6 rounded-lg border border-casino-secondary hover:border-casino-gold transition-colors">
                  <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center mb-4">
                    <MessageCircle className="text-casino-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-casino-gold">Chat en Tiempo Real</h3>
                  <p className="text-gray-400">
                    Comunícate al instante con nuestros operadores para resolver todas tus dudas.
                  </p>
                </div>
                
                <div className="bg-casino-dark p-6 rounded-lg border border-casino-secondary hover:border-casino-gold transition-colors">
                  <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center mb-4">
                    <User className="text-casino-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-casino-gold">Solicitud de Usuario</h3>
                  <p className="text-gray-400">
                    Solicita tu nombre de usuario directamente a través del chat para comenzar a jugar.
                  </p>
                </div>
                
                <div className="bg-casino-dark p-6 rounded-lg border border-casino-secondary hover:border-casino-gold transition-colors">
                  <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center mb-4">
                    <Shield className="text-casino-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-casino-gold">Soporte Seguro</h3>
                  <p className="text-gray-400">
                    Todas tus comunicaciones están encriptadas y protegidas para tu tranquilidad.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="bg-casino-primary py-8 px-6 border-t border-casino-secondary">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            &copy; 2023 Casino Chat Connect. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* Chat Component */}
      <ClientChat />
    </div>
  );
};

export default Index;

// Import only where used
import { MessageCircle, User, Shield } from 'lucide-react';
