
export interface Message {
  id: string;
  content: string;
  sender: 'client' | 'operator';
  timestamp: Date;
  isRead: boolean;
}

export interface UserRequest {
  id: string;
  username: string;
  email: string;
  status: 'pending' | 'approved' | 'declined';
  timestamp: Date;
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
}
