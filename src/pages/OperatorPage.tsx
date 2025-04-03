
import React from 'react';
import { OperatorPanel } from '@/components/operator/OperatorPanel';
import { Navigate } from 'react-router-dom';
import { useChat } from '@/contexts/ChatContext';
import { DashboardHeader } from '@/components/common/DashboardHeader';
import { DashboardFooter } from '@/components/common/DashboardFooter';

const OperatorPage = () => {
  const { state } = useChat();
  const { currentUser } = state;

  // Si no está logueado o no es operador, redirigir a la página de login de operador
  if (!currentUser || currentUser.role !== 'operator') {
    return <Navigate to="/operator-login" replace />;
  }

  return (
    <div className="min-h-screen bg-casino-dark flex flex-col">
      <DashboardHeader title="Panel de Operador" />
      <div className="flex-1">
        <OperatorPanel />
      </div>
      <DashboardFooter />
    </div>
  );
};

export default OperatorPage;
