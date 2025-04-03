
import React from 'react';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { DashboardHeader } from '@/components/common/DashboardHeader';
import { DashboardFooter } from '@/components/common/DashboardFooter';

const AdminLoginPage = () => {
  return (
    <div className="min-h-screen bg-casino-dark flex flex-col">
      <DashboardHeader title="Acceso Administrativo" />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <img src="/images/cocosbet-full-logo.png" alt="Cocosbet" className="h-20 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-casino-gold">Panel Administrativo</h1>
            <p className="text-gray-400">Ingresa tus credenciales para acceder</p>
          </div>
          <AdminLogin />
        </div>
      </div>
      
      <DashboardFooter />
    </div>
  );
};

export default AdminLoginPage;
