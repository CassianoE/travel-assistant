import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

declare global {
  namespace Express {
    export interface Request {
      user?: admin.auth.DecodedIdToken;
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    res.status(401).send({ error: 'Nenhum token fornecido.' });
    return;
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Erro ao verificar o token:', error);
    res.status(403).send({ error: 'Token inválido.' });
    return;
  }
};