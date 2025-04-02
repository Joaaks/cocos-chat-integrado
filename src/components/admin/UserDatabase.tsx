
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Download } from 'lucide-react';

type User = {
  id: string;
  username: string;
  email: string;
  registrationDate: Date;
  lastActive: Date;
  timeOnSite: number; // in minutes
  operator: string;
};

// Mock data - in a real app this would come from a database
const mockUsers: User[] = [
  {
    id: '1',
    username: 'usuario1',
    email: 'usuario1@example.com',
    registrationDate: new Date('2023-09-10'),
    lastActive: new Date('2023-11-15'),
    timeOnSite: 45,
    operator: 'operador1'
  },
  {
    id: '2',
    username: 'usuario2',
    email: 'usuario2@example.com',
    registrationDate: new Date('2023-10-05'),
    lastActive: new Date('2023-11-14'),
    timeOnSite: 120,
    operator: 'operador2'
  },
  {
    id: '3',
    username: 'usuario3',
    email: 'usuario3@example.com',
    registrationDate: new Date('2023-07-22'),
    lastActive: new Date('2023-11-12'),
    timeOnSite: 75,
    operator: 'operador1'
  },
];

export const UserDatabase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>(mockUsers);
  
  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.operator.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Function to export user data as CSV
  const exportToCSV = () => {
    // Headers for CSV file
    const headers = ['ID', 'Usuario', 'Email', 'Fecha de Registro', 'Última Actividad', 'Tiempo en Sitio (min)', 'Operador'];
    
    // Map users to CSV rows
    const userRows = filteredUsers.map(user => [
      user.id,
      user.username,
      user.email,
      user.registrationDate.toLocaleDateString(),
      user.lastActive.toLocaleDateString(),
      user.timeOnSite.toString(),
      user.operator
    ]);
    
    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...userRows.map(row => row.join(','))
    ].join('\n');
    
    // Create a blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'usuarios_exportados.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-casino-secondary">
          <CardTitle className="text-lg text-white">Base de Datos de Usuarios</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Buscar usuarios..."
                className="pl-8 bg-casino-dark border-casino-secondary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button 
              onClick={exportToCSV}
              className="bg-casino-gold text-casino-primary hover:brightness-110"
            >
              <Download className="mr-2 h-4 w-4" />
              Exportar CSV
            </Button>
          </div>
          
          <div className="rounded-md border border-casino-secondary overflow-hidden">
            <Table>
              <TableHeader className="bg-casino-primary">
                <TableRow>
                  <TableHead className="text-casino-gold">Usuario</TableHead>
                  <TableHead className="text-casino-gold">Email</TableHead>
                  <TableHead className="text-casino-gold">Registro</TableHead>
                  <TableHead className="text-casino-gold">Última Actividad</TableHead>
                  <TableHead className="text-casino-gold">Tiempo en Sitio</TableHead>
                  <TableHead className="text-casino-gold">Operador</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-b border-casino-secondary">
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.registrationDate.toLocaleDateString()}</TableCell>
                    <TableCell>{user.lastActive.toLocaleDateString()}</TableCell>
                    <TableCell>{user.timeOnSite} min</TableCell>
                    <TableCell>{user.operator}</TableCell>
                  </TableRow>
                ))}
                {filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No se encontraron usuarios que coincidan con la búsqueda
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-4 text-right text-gray-400 text-sm">
            Total de registros: {filteredUsers.length}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
