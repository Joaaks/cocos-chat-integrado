
import React from 'react';

export const DashboardFooter = () => {
  return (
    <footer className="bg-casino-primary py-3 px-6 border-t border-casino-secondary">
      <div className="container mx-auto text-center">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} Cocosbet. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};
