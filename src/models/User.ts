import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firebaseUid: string;
  email: string;
  name?: string;
  preferences: {
    travelStyle: string[];
    pace: 'Lento' | 'Moderado' | 'Rápido';
  };
}

const UserSchema: Schema = new Schema(
  {
    firebaseUid: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true },
    name: { type: String },
    preferences: {
      travelStyle: { type: [String], default: [] },
      pace: { type: String, enum: ['Lento', 'Moderado', 'Rápido'], default: 'Moderado' },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>('User', UserSchema);