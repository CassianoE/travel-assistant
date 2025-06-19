import { ITrip } from '../models/Trip';
import User from '../models/User';
import * as tripRepository from '../../repositories/tripRepository';
import * as sqsService from './sqsService';

type CreateTripDTO = {
    destination: string;
    startDate: Date;
    endDate: Date;
    budget?: number;
    travelers?: number;
    preferences?: {
        budget?: number;
        travelers?: number;
    };
}

export const createTripForUser = async (tripData: CreateTripDTO, firebaseUid: string): Promise<ITrip> => {

    const user = await User.findOne({ firebaseUid });
    if (!user) {
        throw new Error('Usuário não encontrado');
    }

    const finalPreferences = {
        ...user.preferences,
        ...tripData.preferences
    };

    const completeTripData = {
        destination: tripData.destination,
        startDate: tripData.startDate,
        endDate: tripData.endDate,
        budget: tripData.budget,
        travelers: tripData.travelers,
        user: user._id,
    };

    const newTrip = await tripRepository.create(completeTripData);

    try {
        await sqsService.sendMessageToQueue({ 
            tripId: newTrip._id.toString(),
            destination: newTrip.destination,
            startDate: newTrip.startDate,
            endDate: newTrip.endDate,
            budget: newTrip.budget,
            travelers: newTrip.travelers,
            preferences: finalPreferences
        });
    } catch (error) {
        console.error(`A viagem ${newTrip._id} foi criada, mas falhou ao enfileirar o job de IA. Investigar manualmente.`);
    }

    return newTrip;
};