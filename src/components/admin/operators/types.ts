
import { User } from "@/types/chat";

export type Operator = {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  clientCount: number;
  url: string;
};
