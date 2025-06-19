// src/routes/authRoutes.ts
import { Router } from 'express';
import { createUser } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Endpoint para sincronizar (encontrar ou criar) o usuário no nosso DB
// Protegido pelo mesmo middleware, pois precisamos de um token válido
router.post('/create', authMiddleware, createUser);

export default router;