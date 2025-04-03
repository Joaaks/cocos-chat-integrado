
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { OperatorsManagement } from './OperatorsManagement';
import { AnalyticsPanel } from './AnalyticsPanel';
import { UserDatabase } from './UserDatabase';
import { ChatsMonitor } from './ChatsMonitor';
import { Settings, Users, BarChart3, Database, MessageSquare, LogOut } from 'lucide-react';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn');
    navigate('/admin-login');
  };

  return (
    <div className="h-screen flex flex-col bg-casino-dark text-casino-text">
      <header className="bg-casino-primary p-4 border-b border-casino-secondary flex justify-between items-center">
        <h1 className="text-xl font-bold text-casino-gold">Panel de Administración</h1>
        <Button 
          variant="ghost" 
          className="text-white hover:bg-casino-secondary flex items-center gap-2"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Cerrar Sesión
        </Button>
      </header>
      
      <Tabs defaultValue="operators" className="flex-1 flex flex-col">
        <TabsList className="bg-casino-primary border-b border-casino-secondary rounded-none justify-start px-4">
          <TabsTrigger value="operators" className="data-[state=active]:bg-casino-dark data-[state=active]:text-casino-gold">
            <Users className="mr-2 h-4 w-4" />
            Operadores
          </TabsTrigger>
          <TabsTrigger value="database" className="data-[state=active]:bg-casino-dark data-[state=active]:text-casino-gold">
            <Database className="mr-2 h-4 w-4" />
            Base de Datos
          </TabsTrigger>
          <TabsTrigger value="chats" className="data-[state=active]:bg-casino-dark data-[state=active]:text-casino-gold">
            <MessageSquare className="mr-2 h-4 w-4" />
            Chats
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-casino-dark data-[state=active]:text-casino-gold">
            <BarChart3 className="mr-2 h-4 w-4" />
            Estadísticas
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="operators" className="flex-1 p-6 overflow-auto">
          <OperatorsManagement />
        </TabsContent>
        
        <TabsContent value="database" className="flex-1 p-6 overflow-auto">
          <UserDatabase />
        </TabsContent>
        
        <TabsContent value="chats" className="flex-1 p-6 overflow-auto">
          <ChatsMonitor />
        </TabsContent>
        
        <TabsContent value="analytics" className="flex-1 p-6 overflow-auto">
          <AnalyticsPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};
