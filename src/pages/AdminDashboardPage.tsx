
import React, { useEffect } from 'react';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { Navigate } from 'react-router-dom';

const AdminDashboardPage = () => {
  // Check if admin is logged in
  const isAdminLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';

  // Guardar la URL actual en el localStorage para referencia futura
  useEffect(() => {
    const currentUrl = window.location.origin;
    localStorage.setItem('currentSiteUrl', currentUrl);
    
    // Set favicon to mascot image
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (link) {
      link.href = '/images/cocosbet-mascot.png';
    } else {
      const newLink = document.createElement('link');
      newLink.rel = 'icon';
      newLink.href = '/images/cocosbet-mascot.png';
      document.head.appendChild(newLink);
    }
  }, []);

  // If not logged in, redirect to admin login page
  if (!isAdminLoggedIn) {
    return <Navigate to="/admin-login" replace />;
  }

  return <AdminDashboard />;
};

export default AdminDashboardPage;
