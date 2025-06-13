import { Request, Response } from 'express';
import User from '../models/User';

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const firebaseUid = req.user?.uid;
    if (!firebaseUid) {
      res.status(400).send({ error: 'UID do usuário não encontrado no token.' });
      return;
    }
    const user = await User.findOne({ firebaseUid: firebaseUid });
    if (!user) {
      res.status(404).send({ error: 'Usuário não encontrado no banco de dados.' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    res.status(500).send({ error: 'Erro ao buscar dados do usuário.' });
  }
};