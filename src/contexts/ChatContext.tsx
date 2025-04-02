
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Message, UserRequest, ChatState, User } from '../types/chat';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';

// Define actions
type ChatAction =
  | { type: 'SEND_MESSAGE'; payload: { content: string; sender: 'client' | 'operator'; isRead: boolean; isImage?: boolean } }
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
  | { type: 'ADD_PENDING_CLIENT'; payload: User };

// Mock operator responses
const operatorResponses = [
  "¡Hola! ¿En qué puedo ayudarte hoy?",
  "Por supuesto, puedo ayudarte con eso.",
  "¿Puedes proporcionar más detalles sobre lo que necesitas?",
  "Estoy verificando la información que solicitas.",
  "Tu solicitud de usuario ha sido recibida. Vamos a procesarla ahora.",
  "Tu nueva cuenta de usuario ha sido creada exitosamente.",
  "Necesitaré un poco más de información para completar este proceso.",
  "¿Hay algo más en lo que pueda asistirte hoy?",
  "Gracias por tu paciencia mientras atendemos tu solicitud."
];

// Initial state
const initialState: ChatState = {
  messages: [],
  userRequest: null,
  isOpen: false,
  isMinimized: false,
  isRequestingUser: false,
  clientName: '',
  operatorName: 'Casino Support',
  operatorIsTyping: false,
  selectedUser: 'all',
  currentUser: null,
  clients: [], // Inicializamos la lista de clientes
  pendingClients: [], // Inicializamos la lista de clientes pendientes
};

// Random operator messages for demo
const getRandomResponse = () => {
  return operatorResponses[Math.floor(Math.random() * operatorResponses.length)];
};

// Reducer function
const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'SEND_MESSAGE':
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            id: uuidv4(),
            content: action.payload.content,
            sender: action.payload.sender,
            timestamp: new Date(),
            isRead: action.payload.isRead,
            isImage: action.payload.isImage || false,
          },
        ],
      };
    case 'TOGGLE_CHAT':
      return {
        ...state,
        isOpen: !state.isOpen,
        isMinimized: false,
      };
    case 'MINIMIZE_CHAT':
      return {
        ...state,
        isMinimized: true,
      };
    case 'MAXIMIZE_CHAT':
      return {
        ...state,
        isMinimized: false,
      };
    case 'START_USER_REQUEST':
      return {
        ...state,
        isRequestingUser: true,
      };
    case 'CANCEL_USER_REQUEST':
      return {
        ...state,
        isRequestingUser: false,
      };
    case 'SUBMIT_USER_REQUEST':
      const newUserRequest: UserRequest = {
        id: uuidv4(),
        username: action.payload.username,
        email: action.payload.email,
        phoneNumber: action.payload.phoneNumber,
        password: action.payload.password,
        status: 'pending',
        timestamp: new Date(),
      };
      
      // Create a new pending client
      const newClient: User = {
        id: uuidv4(),
        username: action.payload.username,
        email: action.payload.email,
        phoneNumber: action.payload.phoneNumber,
        role: 'client',
        isLoggedIn: false,
        operatorId: null
      };
      
      return {
        ...state,
        userRequest: newUserRequest,
        isRequestingUser: false,
        pendingClients: [...state.pendingClients, newClient],
        messages: [
          ...state.messages,
          {
            id: uuidv4(),
            content: `Solicitud de usuario enviada para: ${action.payload.username}`,
            sender: 'client',
            timestamp: new Date(),
            isRead: false,
          },
        ],
      };
    case 'SET_CLIENT_NAME':
      return {
        ...state,
        clientName: action.payload,
      };
    case 'TOGGLE_OPERATOR_TYPING':
      return {
        ...state,
        operatorIsTyping: !state.operatorIsTyping,
      };
    case 'SET_SELECTED_USER':
      return {
        ...state,
        selectedUser: action.payload,
      };
    case 'LOGIN_USER':
      return {
        ...state,
        currentUser: action.payload,
        clientName: action.payload.username,
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        currentUser: null,
        clientName: '',
      };
    case 'ASSIGN_CLIENT_TO_OPERATOR':
      // Find the client and update their operatorId
      const updatedPendingClients = state.pendingClients.filter(
        client => client.id !== action.payload.clientId
      );
      
      const clientToAssign = state.pendingClients.find(
        client => client.id === action.payload.clientId
      );
      
      if (!clientToAssign) {
        return state;
      }
      
      const updatedClient = {
        ...clientToAssign,
        operatorId: action.payload.operatorId
      };
      
      return {
        ...state,
        pendingClients: updatedPendingClients,
        clients: [...state.clients, updatedClient],
      };
    case 'ADD_PENDING_CLIENT':
      return {
        ...state,
        pendingClients: [...state.pendingClients, action.payload],
      };
    default:
      return state;
  }
};

// Create context
interface ChatContextProps {
  state: ChatState;
  sendMessage: (content: string, sender: 'client' | 'operator', isImage?: boolean) => void;
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
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

// Provider component
export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const { toast } = useToast();

  // Simulate operator responses for demo purposes
  useEffect(() => {
    const lastMessage = state.messages[state.messages.length - 1];
    
    if (lastMessage && lastMessage.sender === 'client') {
      // Simulate typing indicator
      dispatch({ type: 'TOGGLE_OPERATOR_TYPING' });
      
      // Simulate response delay
      const typingTimeout = setTimeout(() => {
        dispatch({ type: 'TOGGLE_OPERATOR_TYPING' });
        dispatch({
          type: 'SEND_MESSAGE',
          payload: {
            content: getRandomResponse(),
            sender: 'operator',
            isRead: false,
          },
        });
      }, 2000);
      
      return () => clearTimeout(typingTimeout);
    }
  }, [state.messages]);

  // Notification for user request status change
  useEffect(() => {
    if (state.userRequest && state.userRequest.status === 'pending') {
      const approvalTimeout = setTimeout(() => {
        const newUserRequest = { ...state.userRequest, status: 'approved' } as UserRequest;
        
        dispatch({
          type: 'SEND_MESSAGE',
          payload: {
            content: `Tu solicitud para el usuario "${newUserRequest.username}" ha sido aprobada. Ya puedes acceder a tu cuenta.`,
            sender: 'operator',
            isRead: false,
          },
        });
        
        toast({
          title: "Usuario Aprobado",
          description: `Tu solicitud para "${newUserRequest.username}" ha sido aprobada.`,
        });
      }, 5000);
      
      return () => clearTimeout(approvalTimeout);
    }
  }, [state.userRequest]);

  const sendMessage = (content: string, sender: 'client' | 'operator', isImage: boolean = false) => {
    dispatch({
      type: 'SEND_MESSAGE',
      payload: { content, sender, isRead: false, isImage },
    });
  };

  const toggleChat = () => dispatch({ type: 'TOGGLE_CHAT' });
  const minimizeChat = () => dispatch({ type: 'MINIMIZE_CHAT' });
  const maximizeChat = () => dispatch({ type: 'MAXIMIZE_CHAT' });
  const startUserRequest = () => dispatch({ type: 'START_USER_REQUEST' });
  const cancelUserRequest = () => dispatch({ type: 'CANCEL_USER_REQUEST' });
  const submitUserRequest = (username: string, email: string, phoneNumber: string, password: string) => {
    dispatch({ type: 'SUBMIT_USER_REQUEST', payload: { username, email, phoneNumber, password } });
  };
  const setClientName = (name: string) => dispatch({ type: 'SET_CLIENT_NAME', payload: name });
  const setSelectedUser = (userId: string) => dispatch({ type: 'SET_SELECTED_USER', payload: userId });
  const loginUser = (user: User) => dispatch({ type: 'LOGIN_USER', payload: user });
  const logoutUser = () => dispatch({ type: 'LOGOUT_USER' });
  const assignClientToOperator = (clientId: string, operatorId: string) => {
    dispatch({ type: 'ASSIGN_CLIENT_TO_OPERATOR', payload: { clientId, operatorId } });
    
    toast({
      title: "Cliente Asignado",
      description: "El cliente ha sido asignado a tu cuenta correctamente.",
    });
  };

  // Función para simular carga de imágenes
  const uploadImage = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Simulamos un retraso para que parezca que está cargando
        setTimeout(() => {
          if (typeof reader.result === 'string') {
            resolve(reader.result);
          }
        }, 1000);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <ChatContext.Provider
      value={{
        state,
        sendMessage,
        toggleChat,
        minimizeChat,
        maximizeChat,
        startUserRequest,
        cancelUserRequest,
        submitUserRequest,
        setClientName,
        setSelectedUser,
        loginUser,
        logoutUser,
        uploadImage,
        assignClientToOperator,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook for using the chat context
export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
