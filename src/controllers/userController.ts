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

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      // Verifica se o usuário está autenticado e tem um UID
      if (!req.user || !req.user.uid) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      const { uid: firebaseUid, email, name } = req.user;
      
      // Verifica se já existe um usuário com este UID
      const existingUser = await User.findOne({ firebaseUid });
      
      if (existingUser) {
        console.log('Usuário já existe:', existingUser.email);
        res.status(200).json(existingUser);
        return;
      }

      // Cria um novo usuário
      const newUser = new User({ 
        firebaseUid, 
        email: email || '', 
        name: name || '' 
      });
      
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ 
        error: 'Erro ao criar usuário',
      });
    }
};