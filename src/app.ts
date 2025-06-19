// src/app.ts

import express from 'express';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin/app';
import serviceAccount from '../config/firebase-service-account.json'; 

// Importe suas rotas
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import tripRoutes from './routes/tripRoutes';

// Inicializa o Firebase (pode ficar aqui ou em um arquivo de config/firebase.ts)
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount)
});

// Cria a instância do app
const app = express();

// Middlewares
app.use(express.json()); // Middleware para o Express entender JSON

// Rotas da API
app.get('/', (req, res) => {
  res.send('API do Assistente de Viagem está no ar!');
});
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);

// Exporta o app para ser usado em outros arquivos
export default app;