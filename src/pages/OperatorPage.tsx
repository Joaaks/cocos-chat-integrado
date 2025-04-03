
import React from 'react';
import { OperatorPanel } from '@/components/operator/OperatorPanel';
import { Navigate } from 'react-router-dom';
import { useChat } from '@/contexts/ChatContext';

const OperatorPage = () => {
  const { state } = useChat();
  const { currentUser } = state;

  // Si no está logueado o no es operador, redirigir a la página de login de operador
  if (!currentUser || currentUser.role !== 'operator') {
    return <Navigate to="/operator-login" replace />;
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-casino-primary p-3 flex items-center justify-between border-b border-casino-secondary">
        <h1 className="text-casino-gold font-bold text-xl">Panel de Operador</h1>
        <img src="/images/cocosbet-mascot.png" alt="Cocosbet Mascot" className="h-10" />
      </div>
      <OperatorPanel />
    </div>
  );
};

export default OperatorPage;
