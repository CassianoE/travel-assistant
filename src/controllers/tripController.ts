// src/controllers/tripController.ts
import { Request, Response } from 'express';
import { createTripForUser } from '../services/tripService'; 

export const createTrip = async (req: Request, res: Response): Promise<void> => {
  try {
    const firebaseUid = req.user!.uid;
    
    const newTrip = await createTripForUser(req.body, firebaseUid);

    res.status(201).json(newTrip);
    return;
  } catch (error: any) {
    console.error("Erro no controller ao criar viagem:", error);
    if (error.message === 'Usuário não encontrado') {
        res.status(404).send({ error: error.message });
        return;
    }
    res.status(500).send({ error: 'Erro interno ao criar a viagem.' });
  }
};