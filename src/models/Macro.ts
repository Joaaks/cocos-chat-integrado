
import { Schema, model, models, Document } from 'mongoose';

export interface IMacro extends Document {
  title: string;
  content: string;
  operatorId: string; // To associate macros with specific operators
  createdAt: Date;
  updatedAt: Date;
}

const MacroSchema = new Schema<IMacro>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    operatorId: {
      type: String,
      required: [true, 'Operator ID is required'],
    },
  },
  {
    timestamps: true,
  }
);

export const Macro = models.Macro || model<IMacro>('Macro', MacroSchema);
