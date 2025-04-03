
import React from 'react';
import { ClientChat } from '@/components/chat/ClientChat';

const Index = () => {
  return (
    <div className="min-h-screen bg-casino-dark flex flex-col items-center justify-center">
      {/* Logo and Welcome Message */}
      <div className="mb-12 text-center">
        <img src="/images/cocosbet-mascot.png" alt="Cocosbet Mascot" className="w-40 mb-4 mx-auto" />
        <h1 className="text-3xl font-bold text-casino-gold mb-2">¡Bienvenido a Cocosbet!</h1>
        <p className="text-casino-text text-lg">Estamos aquí para ayudarte</p>
      </div>
      
      {/* Chat Component */}
      <ClientChat />
    </div>
  );
};

export default Index;
