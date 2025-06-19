import mongoose, { Schema, Document, Types } from 'mongoose';
import { IUser } from './User';

export interface ITrip extends Document {
    _id: Types.ObjectId;
    user: IUser['_id'];
    destination: string;
    startDate: Date;
    endDate: Date;
    budget?: number;
    travelers?: number;
    status?: 'PENDING' | 'COMPLETED' | 'FAILED';
    itinerary?: object;
}

const TripSchema: Schema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        destination: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        budget: { type: Number },
        travelers: { type: Number, default: 1 },
        status: {
            type: String,
            enum: ['PENDING', 'COMPLETED', 'FAILED'],
            default: 'PENDING',
        },
        itinerary: { type: Object },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<ITrip>('Trip', TripSchema);
