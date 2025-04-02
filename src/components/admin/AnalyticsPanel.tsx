
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Users, Clock, Calendar } from 'lucide-react';

// Sample data for charts
const registrationData = [
  { name: 'Ene', usuarios: 4 },
  { name: 'Feb', usuarios: 7 },
  { name: 'Mar', usuarios: 5 },
  { name: 'Abr', usuarios: 10 },
  { name: 'May', usuarios: 8 },
  { name: 'Jun', usuarios: 15 },
  { name: 'Jul', usuarios: 12 },
  { name: 'Ago', usuarios: 18 },
  { name: 'Sep', usuarios: 20 },
  { name: 'Oct', usuarios: 25 },
  { name: 'Nov', usuarios: 22 },
  { name: 'Dic', usuarios: 30 },
];

const timeOnSiteData = [
  { name: 'Lun', minutos: 28 },
  { name: 'Mar', minutos: 32 },
  { name: 'Mie', minutos: 45 },
  { name: 'Jue', minutos: 40 },
  { name: 'Vie', minutos: 55 },
  { name: 'Sab', minutos: 35 },
  { name: 'Dom', minutos: 30 },
];

const operatorDistributionData = [
  { name: 'Operador 1', value: 12 },
  { name: 'Operador 2', value: 8 },
  { name: 'Operador 3', value: 5 },
];

const COLORS = ['#FFD700', '#FF8C00', '#9370DB', '#20B2AA'];

// Stat cards data
const statCards = [
  {
    title: 'Total de Usuarios',
    value: '176',
    icon: Users,
    change: '+12%',
    period: 'vs mes anterior'
  },
  {
    title: 'Tiempo Promedio',
    value: '42 min',
    icon: Clock,
    change: '+5%',
    period: 'vs mes anterior'
  },
  {
    title: 'Usuarios Nuevos',
    value: '28',
    icon: Calendar,
    change: '+18%',
    period: 'este mes'
  }
];

export const AnalyticsPanel = () => {
  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="bg-casino-secondary border-none">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-400">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-white mt-1">{stat.value}</h3>
                  <p className="text-xs text-green-400 mt-2">
                    {stat.change} {stat.period}
                  </p>
                </div>
                <div className="bg-casino-gold p-3 rounded-full">
                  <stat.icon className="h-6 w-6 text-casino-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Registrations by Month */}
        <Card className="bg-casino-secondary border-none">
          <CardHeader>
            <CardTitle className="text-white">Registro de Usuarios por Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={registrationData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#333', border: 'none' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Bar dataKey="usuarios" name="Usuarios" fill="#FFD700" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Time on site */}
        <Card className="bg-casino-secondary border-none">
          <CardHeader>
            <CardTitle className="text-white">Tiempo Promedio en Sitio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={timeOnSiteData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#333', border: 'none' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="minutos" 
                    name="Minutos" 
                    stroke="#FFD700" 
                    strokeWidth={2}
                    dot={{ fill: '#FFD700', r: 4 }}
                    activeDot={{ fill: '#FFD700', r: 6, strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Operator Distribution */}
        <Card className="bg-casino-secondary border-none">
          <CardHeader>
            <CardTitle className="text-white">Distribución por Operador</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={operatorDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {operatorDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#333', border: 'none' }}
                    labelStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Summary */}
        <Card className="bg-casino-secondary border-none">
          <CardHeader>
            <CardTitle className="text-white">Resumen Estadístico</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-md bg-casino-dark">
                <h3 className="text-sm font-medium text-gray-400">Promedio de tiempo en pantalla</h3>
                <p className="text-2xl font-bold text-white mt-1">42 minutos</p>
                <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-casino-gold rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div className="p-4 rounded-md bg-casino-dark">
                <h3 className="text-sm font-medium text-gray-400">Tasa de conversión</h3>
                <p className="text-2xl font-bold text-white mt-1">68%</p>
                <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-casino-gold rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
              
              <div className="p-4 rounded-md bg-casino-dark">
                <h3 className="text-sm font-medium text-gray-400">Usuarios activos mensualmente</h3>
                <p className="text-2xl font-bold text-white mt-1">123</p>
                <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-casino-gold rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
