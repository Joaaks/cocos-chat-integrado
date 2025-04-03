
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Message, User, Macro } from '@/types/chat';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { ChatState, ChatAction, ChatContextProps } from './types';
import { chatReducer } from './reducer';
import { initialState, getRandomResponse } from './data';

// Create context
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
            extraData: {
              clientId: lastMessage.clientId,
              operatorId: state.currentUser?.id
            }
          },
        });
      }, 2000);
      
      return () => clearTimeout(typingTimeout);
    }
  }, [state.messages, state.currentUser]);

  // Notification for user request status change
  useEffect(() => {
    if (state.userRequest && state.userRequest.status === 'pending') {
      const approvalTimeout = setTimeout(() => {
        const newUserRequest = { ...state.userRequest, status: 'approved' };
        
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

  const sendMessage = (content: string, sender: 'client' | 'operator', isImage: boolean = false, extraData?: any) => {
    dispatch({
      type: 'SEND_MESSAGE',
      payload: { 
        content, 
        sender, 
        isRead: false, 
        isImage,
        extraData
      },
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

  // Nuevas funciones para manejar macros
  const addMacro = (title: string, content: string) => {
    dispatch({ type: 'ADD_MACRO', payload: { title, content } });
    
    toast({
      title: "Macro Creado",
      description: `El macro "${title}" ha sido creado correctamente.`,
    });
  };

  const editMacro = (id: string, title: string, content: string) => {
    dispatch({ type: 'EDIT_MACRO', payload: { id, title, content } });
    
    toast({
      title: "Macro Actualizado",
      description: `El macro "${title}" ha sido actualizado correctamente.`,
    });
  };

  const deleteMacro = (id: string) => {
    // Encontrar el título antes de eliminarlo para el mensaje
    const macroToDelete = state.macros.find(macro => macro.id === id);
    
    dispatch({ type: 'DELETE_MACRO', payload: id });
    
    if (macroToDelete) {
      toast({
        title: "Macro Eliminado",
        description: `El macro "${macroToDelete.title}" ha sido eliminado.`,
      });
    }
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
        addMacro,
        editMacro,
        deleteMacro,
        userRequest: state.userRequest, // Expose userRequest from the state
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
