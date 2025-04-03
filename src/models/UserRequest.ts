
import { Schema, model, models, Document } from 'mongoose';

export interface IUserRequest extends Document {
  username: string;
  email: string;
  phoneNumber: string;
  password: string; // In production, store hashed passwords only
  status: 'pending' | 'approved' | 'declined';
  timestamp: Date;
}

const UserRequestSchema = new Schema<IUserRequest>(
  {
    username: {
      type: String,
      required: [true, 'Please provide a username'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please provide a phone number'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password should be at least 6 characters long'],
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'declined'],
      default: 'pending',
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const UserRequest = models.UserRequest || model<IUserRequest>('UserRequest', UserRequestSchema);
