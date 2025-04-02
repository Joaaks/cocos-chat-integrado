
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

  return <OperatorPanel />;
};

export default OperatorPage;
