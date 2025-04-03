
import { User } from "@/types/chat";

export type Operator = {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  clientCount: number;
  url: string;
  stats?: {
    avgResponseTime: number; // tiempo promedio de respuesta en minutos
    totalChats: number; // total de chats atendidos
    pendingChats: number; // chats pendientes
    seenButNotAnswered: number; // chats vistos pero no respondidos
    responseRate: number; // tasa de respuesta (porcentaje)
  };
};
