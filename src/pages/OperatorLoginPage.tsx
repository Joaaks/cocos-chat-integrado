
import React from 'react';
import { Navigate } from 'react-router-dom';
import { OperatorLogin } from '@/components/auth/OperatorLogin';
import { useChat } from '@/contexts/ChatContext';
import { DashboardHeader } from '@/components/common/DashboardHeader';
import { DashboardFooter } from '@/components/common/DashboardFooter';

const OperatorLoginPage = () => {
  const { state } = useChat();
  const { currentUser } = state;

  // Si ya está logueado como operador, redirigir al panel
  if (currentUser && currentUser.role === 'operator') {
    return <Navigate to="/operator" replace />;
  }

  return (
    <div className="min-h-screen bg-casino-dark flex flex-col">
      <DashboardHeader title="Acceso de Operadores" />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <OperatorLogin />
      </div>

      <DashboardFooter />
    </div>
  );
};

export default OperatorLoginPage;
