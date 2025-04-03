
import { Schema, model, models, Document } from 'mongoose';

export interface IMessage extends Document {
  content: string;
  sender: 'client' | 'operator';
  timestamp: Date;
  isRead: boolean;
  isImage?: boolean;
  clientId?: string; // ID of the client related to the message
  operatorId?: string; // ID of the operator related to the message
}

const MessageSchema = new Schema<IMessage>(
  {
    content: {
      type: String,
      required: [true, 'Message content is required'],
    },
    sender: {
      type: String,
      enum: ['client', 'operator'],
      required: [true, 'Sender type is required'],
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    isImage: {
      type: Boolean,
      default: false,
    },
    clientId: {
      type: String,
    },
    operatorId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Message = models.Message || model<IMessage>('Message', MessageSchema);
