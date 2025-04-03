
import { Schema, model, models, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  phoneNumber?: string;
  password: string; // In production, store hashed passwords only
  role: 'client' | 'operator';
  isLoggedIn: boolean;
  operatorId?: string | null; // Only for clients
  url?: string; // URL associated with the operator or from where the client accessed
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Please provide a username'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    phoneNumber: {
      type: String,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password should be at least 6 characters long'],
    },
    role: {
      type: String,
      enum: ['client', 'operator'],
      required: [true, 'Please specify a role'],
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
    operatorId: {
      type: String,
      default: null,
    },
    url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Check if model exists before creating a new one (for Next.js hot reloading)
export const User = models.User || model<IUser>('User', UserSchema);
