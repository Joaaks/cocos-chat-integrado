
import { v4 as uuidv4 } from 'uuid';
import { ChatState, ChatAction } from './types';
import { UserRequest, User, Macro } from '@/types/chat';

// Reducer function
export const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'SEND_MESSAGE': {
      const { content, sender, isRead, isImage, extraData } = action.payload;
      
      // Preparar el mensaje con datos adicionales si están disponibles
      const newMessage = {
        id: uuidv4(),
        content,
        sender,
        timestamp: new Date(),
        isRead,
        isImage: isImage || false,
        // Añadir datos del cliente y operador si están disponibles
        ...(extraData?.clientId ? { clientId: extraData.clientId } : {}),
        ...(extraData?.operatorId ? { operatorId: extraData.operatorId } : {}),
        // Mantener compatibilidad con mensajes anteriores
        ...(sender === 'client' && state.currentUser ? { clientId: state.currentUser.id } : {}),
        ...(sender === 'operator' && state.currentUser ? { operatorId: state.currentUser.id } : {})
      };
      
      return {
        ...state,
        messages: [...state.messages, newMessage],
      };
    }
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
    case 'SUBMIT_USER_REQUEST': {
      const currentUrl = window.location.origin;
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
        operatorId: null,
        url: currentUrl // Almacenamos la URL desde donde se registró el cliente
      };
      
      // Check if this client should be auto-assigned to an operator based on URL
      // This logic matches what we have in ClientAssignment component
      // In a real app, this would come from a database query
      const operatorsForUrl = [
        {
          id: '1',
          url: 'https://casino-gold.com'
        },
        {
          id: '2',
          url: 'https://casino-vip.com'
        }
      ];
      
      // Try to auto-assign based on URL
      const matchingOperator = operatorsForUrl.find(operator => 
        currentUrl.includes(operator.url)
      );
      
      // Crear mensaje con el ID del cliente
      const newMessage = {
        id: uuidv4(),
        content: `Solicitud de usuario enviada para: ${action.payload.username}`,
        sender: 'client' as const,
        timestamp: new Date(),
        isRead: false,
        clientId: newClient.id
      };
      
      if (matchingOperator) {
        // If there's a matching operator, assign the client directly
        newClient.operatorId = matchingOperator.id;
        
        return {
          ...state,
          userRequest: newUserRequest,
          isRequestingUser: false,
          clients: [...state.clients, newClient], // Add directly to assigned clients
          messages: [
            ...state.messages,
            newMessage
          ],
        };
      } else {
        // If no matching operator, add to pending clients for manual assignment
        return {
          ...state,
          userRequest: newUserRequest,
          isRequestingUser: false,
          pendingClients: [...state.pendingClients, newClient],
          messages: [
            ...state.messages,
            newMessage
          ],
        };
      }
    }
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
    case 'LOGIN_USER': {
      const userWithUrl = {
        ...action.payload,
        url: action.payload.url || window.location.origin, // Asegura que la URL siempre esté presente
      };
      
      return {
        ...state,
        currentUser: userWithUrl,
        clientName: action.payload.username,
      };
    }
    case 'LOGOUT_USER':
      return {
        ...state,
        currentUser: null,
        clientName: '',
      };
    case 'ASSIGN_CLIENT_TO_OPERATOR': {
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
    }
    case 'ADD_PENDING_CLIENT':
      return {
        ...state,
        pendingClients: [...state.pendingClients, action.payload],
      };
    case 'ADD_MACRO': {
      const newMacro: Macro = {
        id: uuidv4(),
        title: action.payload.title,
        content: action.payload.content,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return {
        ...state,
        macros: [...state.macros, newMacro],
      };
    }
    case 'EDIT_MACRO':
      return {
        ...state,
        macros: state.macros.map(macro => 
          macro.id === action.payload.id 
            ? { 
                ...macro, 
                title: action.payload.title, 
                content: action.payload.content,
                updatedAt: new Date() 
              } 
            : macro
        ),
      };
    case 'DELETE_MACRO':
      return {
        ...state,
        macros: state.macros.filter(macro => macro.id !== action.payload),
      };
    default:
      return state;
  }
};
