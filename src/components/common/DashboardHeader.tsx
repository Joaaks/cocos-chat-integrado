
import React from 'react';
import { Link } from 'react-router-dom';

interface DashboardHeaderProps {
  title?: string;
}

export const DashboardHeader = ({ title = "Panel de Control" }: DashboardHeaderProps) => {
  return (
    <header className="bg-casino-primary py-3 px-6 border-b border-casino-secondary">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
            <img src="/images/cocosbet-full-logo.png" alt="Cocosbet" className="h-10" />
          </Link>
          <div className="ml-4 text-xl font-bold text-casino-gold">{title}</div>
        </div>
      </div>
    </header>
  );
};
