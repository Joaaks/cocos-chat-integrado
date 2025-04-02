
import React from 'react';
import { ChatProvider } from '@/contexts/ChatContext';
import { OperatorPanel } from '@/components/operator/OperatorPanel';

const OperatorPage = () => {
  return (
    <ChatProvider>
      <OperatorPanel />
    </ChatProvider>
  );
};

export default OperatorPage;
