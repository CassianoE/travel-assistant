// src/services/sqsService.ts

import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

// Cria um cliente SQS, configurado para a região que definimos no .env
const sqsClient = new SQSClient({ 
  region: process.env.AWS_REGION 
});

/**
 * Envia uma mensagem para a fila SQS configurada.
 * @param messageBody O corpo da mensagem, que pode ser um objeto qualquer.
 */
export const sendMessageToQueue = async (messageBody: object) => {
  const queueUrl = process.env.SQS_QUEUE_URL;

  if (!queueUrl) {
    console.error("URL da fila SQS não configurada no .env");
    return;
  }

  // O corpo da mensagem precisa ser uma string.
  const command = new SendMessageCommand({
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify(messageBody),
  });

  try {
    const data = await sqsClient.send(command);
    console.log("Mensagem enviada com sucesso para a fila SQS. MessageID:", data.MessageId);
    return data;
  } catch (error) {
    console.error("Erro ao enviar mensagem para a fila SQS:", error);
    throw error;
  }
};