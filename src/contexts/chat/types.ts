
import { Message, UserRequest, User, Macro } from '@/types/chat';

// Define actions
export type ChatAction =
  | { type: 'SEND_MESSAGE'; payload: { content: string; sender: 'client' | 'operator'; isRead: boolean; isImage?: boolean; extraData?: any } }
  | { type: 'TOGGLE_CHAT' }
  | { type: 'MINIMIZE_CHAT' }
  | { type: 'MAXIMIZE_CHAT' }
  | { type: 'START_USER_REQUEST' }
  | { type: 'CANCEL_USER_REQUEST' }
  | { type: 'SUBMIT_USER_REQUEST'; payload: { username: string, email: string, phoneNumber: string, password: string } }
  | { type: 'SET_CLIENT_NAME'; payload: string }
  | { type: 'TOGGLE_OPERATOR_TYPING' }
  | { type: 'SET_SELECTED_USER'; payload: string }
  | { type: 'LOGIN_USER'; payload: User }
  | { type: 'LOGOUT_USER' }
  | { type: 'ASSIGN_CLIENT_TO_OPERATOR'; payload: { clientId: string, operatorId: string } }
  | { type: 'ADD_PENDING_CLIENT'; payload: User }
  | { type: 'ADD_MACRO'; payload: Omit<Macro, 'id' | 'createdAt' | 'updatedAt'> }
  | { type: 'EDIT_MACRO'; payload: { id: string, title: string, content: string } }
  | { type: 'DELETE_MACRO'; payload: string };

// Context interface
export interface ChatContextProps {
  state: ChatState;
  sendMessage: (content: string, sender: 'client' | 'operator', isImage?: boolean, extraData?: any) => void;
  toggleChat: () => void;
  minimizeChat: () => void;
  maximizeChat: () => void;
  startUserRequest: () => void;
  cancelUserRequest: () => void;
  submitUserRequest: (username: string, email: string, phoneNumber: string, password: string) => void;
  setClientName: (name: string) => void;
  setSelectedUser: (userId: string) => void;
  loginUser: (user: User) => void;
  logoutUser: () => void;
  uploadImage: (file: File) => Promise<string>;
  assignClientToOperator: (clientId: string, operatorId: string) => void;
  addMacro: (title: string, content: string) => void;
  editMacro: (id: string, title: string, content: string) => void;
  deleteMacro: (id: string) => void;
  userRequest: UserRequest | null; // Add userRequest property to the context
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
