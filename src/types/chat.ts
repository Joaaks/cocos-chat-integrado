
export interface Message {
  id: string;
  content: string;
  sender: 'client' | 'operator';
  timestamp: Date;
  isRead: boolean;
  isImage?: boolean; // Para identificar si el contenido es una imagen
  clientId?: string; // ID del cliente relacionado con el mensaje
  operatorId?: string; // ID del operador relacionado con el mensaje
}

export interface UserRequest {
  id: string;
  username: string;
  email: string;
  phoneNumber: string; // Añadimos el número de celular
  password: string; // Añadimos la contraseña (en un sistema real esto debe cifrarse)
  status: 'pending' | 'approved' | 'declined';
  timestamp: Date;
}

export interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber?: string; // Agregamos número de celular opcional para usuarios existentes
  role: 'client' | 'operator';
  isLoggedIn: boolean;
  operatorId?: string | null; // ID del operador asignado al cliente (solo para clientes)
  url?: string; // URL asociada al operador o desde donde accedió el cliente
}

export interface Macro {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatState {
  messages: Message[];
  userRequest: UserRequest | null;
  isOpen: boolean;
  isMinimized: boolean;
  isRequestingUser: boolean;
  clientName: string;
  operatorName: string;
  operatorIsTyping: boolean;
  selectedUser: string;
  currentUser: User | null;
  clients: User[]; // Lista de clientes registrados
  pendingClients: User[]; // Clientes sin operador asignado
  macros: Macro[]; // Lista de macros del operador
}
