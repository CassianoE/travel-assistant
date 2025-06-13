// src/config/database.ts

import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
      throw new Error('A variável de ambiente MONGO_URI não foi definida.');
    }
    
    await mongoose.connect(MONGO_URI);
    console.log('Conectado ao MongoDB com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    // Encerra o processo com falha se não conseguir conectar
    process.exit(1);
  }
};