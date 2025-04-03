
import React from 'react';
import { AdminLogin } from '@/components/admin/AdminLogin';

const AdminLoginPage = () => {
  return (
    <div className="min-h-screen bg-casino-dark flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <img src="/images/cocosbet-mascot.png" alt="Cocosbet Mascot" className="w-32 mx-auto mb-4" />
      </div>
      <AdminLogin />
    </div>
  );
};

export default AdminLoginPage;
