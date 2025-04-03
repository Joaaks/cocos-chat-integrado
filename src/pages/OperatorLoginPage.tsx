
import React from 'react';
import { Navigate } from 'react-router-dom';
import { OperatorLogin } from '@/components/auth/OperatorLogin';
import { useChat } from '@/contexts/ChatContext';

const OperatorLoginPage = () => {
  const { state } = useChat();
  const { currentUser } = state;

  // Si ya está logueado como operador, redirigir al panel
  if (currentUser && currentUser.role === 'operator') {
    return <Navigate to="/operator" replace />;
  }

  return (
    <div className="min-h-screen bg-casino-dark flex flex-col">
      {/* Header simple */}
      <header className="bg-casino-primary py-4 px-6 border-b border-casino-secondary">
        <div className="container mx-auto">
          <div className="text-2xl font-bold text-casino-gold">Casino Chat Connect</div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <OperatorLogin />
      </div>

      {/* Footer simple */}
      <footer className="bg-casino-primary py-4 px-6 border-t border-casino-secondary">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            &copy; 2023 Casino Chat Connect. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default OperatorLoginPage;
