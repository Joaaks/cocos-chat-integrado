
import React from 'react';
import { ClientChat } from '@/components/chat/ClientChat';
import { DashboardHeader } from '@/components/common/DashboardHeader';
import { DashboardFooter } from '@/components/common/DashboardFooter';

const Index = () => {
  return (
    <div className="min-h-screen bg-casino-dark flex flex-col">
      <DashboardHeader title="Chat de Soporte" />
      
      <div className="flex-1 p-6 flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <img src="/images/cocosbet-full-logo.png" alt="Cocosbet" className="h-32 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-casino-gold mb-2">Bienvenido al Chat de Soporte de Cocosbet</h1>
          <p className="text-lg text-gray-400">Estamos aquí para ayudarte con tus dudas y consultas</p>
        </div>
        
        <div className="w-full max-w-md bg-casino-primary p-6 rounded-lg casino-shadow">
          <p className="text-center text-casino-text mb-4">Haz clic en el botón de chat en la esquina inferior derecha para comenzar una conversación con nuestro equipo de soporte.</p>
          <div className="flex justify-center">
            <button 
              onClick={() => document.dispatchEvent(new CustomEvent('casino-chat-open'))}
              className="gold-gradient text-casino-primary px-6 py-2 rounded-md hover:brightness-110 transition-all font-medium"
            >
              Abrir Chat
            </button>
          </div>
        </div>
      </div>
      
      <DashboardFooter />
      
      {/* Chat Component */}
      <ClientChat />
    </div>
  );
};

export default Index;
