
import React, { useEffect } from 'react';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { Navigate } from 'react-router-dom';
import { DashboardHeader } from '@/components/common/DashboardHeader';
import { DashboardFooter } from '@/components/common/DashboardFooter';

const AdminDashboardPage = () => {
  // Check if admin is logged in
  const isAdminLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';

  // Guardar la URL actual en el localStorage para referencia futura
  useEffect(() => {
    const currentUrl = window.location.origin;
    localStorage.setItem('currentSiteUrl', currentUrl);
  }, []);

  // If not logged in, redirect to admin login page
  if (!isAdminLoggedIn) {
    return <Navigate to="/admin-login" replace />;
  }

  return (
    <div className="min-h-screen bg-casino-dark flex flex-col">
      <DashboardHeader title="Panel Administrativo" />
      
      <div className="flex-1">
        <AdminDashboard />
      </div>
      
      <DashboardFooter />
    </div>
  );
};

export default AdminDashboardPage;
