import Trip, { ITrip } from '../src/models/Trip';
import { IUser } from '../src/models/User';

export const create = async (tripData:  Partial<ITrip>): Promise<ITrip> => {
  const newTrip = new Trip(tripData);
  await newTrip.save();
  return newTrip;
}