# Assistente de Viagens com IA

![Node.js](https://img.shields.io/badge/Node.js-18.x-blue?logo=nodedotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Express.js](https://img.shields.io/badge/Express.js-4.x-orange)
![AWS Lambda](https://img.shields.io/badge/AWS-Lambda-orange?logo=amazonaws)
![AWS SQS](https://img.shields.io/badge/AWS-SQS-orange?logo=amazonaws)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--3.5-blue?logo=openai)
![MongoDB](https://img.shields.io/badge/MongoDB-green?logo=mongodb)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

---

## 📖 Sobre o Projeto

O **Assistente de Viagens com IA** é um sistema de backend robusto projetado para gerar roteiros de viagem personalizados utilizando a API da OpenAI. A aplicação adota uma arquitetura moderna, orientada a eventos e serverless, para garantir uma experiência de usuário fluida e uma infraestrutura escalável.

Quando um usuário cria uma nova viagem através da API, a tarefa de gerar o roteiro é delegada a um sistema de processamento assíncrono. Uma mensagem é enviada para uma fila na AWS SQS, que por sua vez aciona uma função AWS Lambda. A função Lambda, então, processa os detalhes da viagem, constrói um prompt personalizado e chama a API da OpenAI para criar um itinerário detalhado, que é salvo de volta no banco de dados.

Este projeto foi desenvolvido como um case completo, demonstrando proficiência em tecnologias de backend, arquitetura de nuvem, e integração com serviços de IA.

---

## 🏗️ Arquitetura do Sistema

O fluxo de dados segue uma arquitetura desacoplada para garantir performance e resiliência.

```
[ Cliente (Ex: Postman) ]
        |
(1) Requisição HTTP (POST /api/trips)
        |
        v
[ API Backend (Node.js/Express) ] ------------> [ MongoDB Atlas ]
        |                                      (3. Salva a viagem com status 'PENDING')
(2) Mensagem com dados da viagem
        |
        v
[ Fila (AWS SQS) ]
        |
(4) Gatilho (Trigger)
        |
        v
[ Worker (AWS Lambda) ] ----------------------> [ OpenAI API ]
        |                                      (6. Gera o roteiro)
(5. Conecta e busca dados)
        |
        v
[ MongoDB Atlas ] <----------------------------- (7. Atualiza a viagem com o roteiro e status 'COMPLETED')
```

1.  O cliente envia uma requisição `POST` para a API com os detalhes da viagem.
2.  A API salva a viagem no MongoDB com status `PENDING` e envia uma mensagem com os detalhes para uma fila na AWS SQS. A API responde imediatamente ao cliente com sucesso (`201 Created`).
3.  A mensagem na fila SQS aciona automaticamente a função AWS Lambda.
4.  A Lambda processa a mensagem, constrói um prompt detalhado e o envia para a API da OpenAI.
5.  A OpenAI retorna um roteiro de viagem personalizado.
6.  A Lambda recebe o roteiro e atualiza o documento da viagem no MongoDB, alterando o status para `COMPLETED`.

---

## 🛠️ Tecnologias Utilizadas

### Backend
* **Node.js**: Ambiente de execução JavaScript.
* **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
* **Express.js**: Framework para construção da API RESTful.
* **SOLID**: Os princípios foram aplicados para criar uma arquitetura limpa e desacoplada (Controller-Service-Repository).

### Banco de Dados
* **MongoDB**: Banco de dados NoSQL para armazenar os dados de usuários e viagens.
* **Mongoose**: ODM para modelagem e interação com o MongoDB.
* **MongoDB Atlas**: Serviço de hospedagem do MongoDB na nuvem.

### Autenticação
* **Firebase Authentication**: Para gerenciamento de usuários.
* **JWT**: Tokens para proteger as rotas da API.

### Cloud & DevOps
* **AWS Lambda**: Para execução do código do worker de forma serverless.
* **AWS SQS (Simple Queue Service)**: Para o sistema de filas e comunicação assíncrona.
* **AWS IAM**: Para gerenciamento de permissões.
* **AWS CloudWatch**: Para monitoramento e logs da função Lambda.

### Inteligência Artificial
* **OpenAI API**: Para geração dos roteiros de viagem (`gpt-3.5-turbo`).

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
* [Node.js](https://nodejs.org/en/) (versão 18.x ou superior)
* [npm](https://www.npmjs.com/)
* [Git](https://git-scm.com/)
* Uma conta na [AWS](https://aws.amazon.com/), [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), [Firebase](https://firebase.google.com/) e [OpenAI](https://platform.openai.com/).

### Instalação da API Local
1.  Clone o repositório:
    ```bash
    git clone [https://github.com/SEU_USUARIO/travel-assistant.git](https://github.com/SEU_USUARIO/travel-assistant.git)
    ```
2.  Navegue até a pasta do projeto:
    ```bash
    cd travel-assistant
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```
4.  Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente. Use o `.env.example` como modelo:
    ```env
    # Porta da API
    PORT=3000

    # MongoDB
    MONGO_URI=sua_string_de_conexao_do_mongodb_atlas

    # AWS
    AWS_ACCESS_KEY_ID=sua_chave_de_acesso_iam
    AWS_SECRET_ACCESS_KEY=sua_chave_secreta_iam
    AWS_REGION=sua_regiao_aws # ex: eu-north-1
    SQS_QUEUE_URL=a_url_da_sua_fila_sqs
    ```
5.  Adicione o seu arquivo de credenciais do Firebase (`firebase-service-account.json`) na pasta `config/`.

6.  Execute o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

### Setup da Lambda
O código da função Lambda está na pasta `lambda-worker`. Para fazer o deploy:
1.  Navegue até a pasta `lambda-worker`.
2.  Instale as dependências: `npm install mongoose openai`.
3.  Compacte a pasta `node_modules` e o arquivo `index.js` em um arquivo `.zip`.
4.  Faça o upload deste `.zip` na sua função Lambda no console da AWS.
5.  Configure as variáveis de ambiente `MONGO_URI` e `OPENAI_API_KEY` na sua função Lambda.

---

## Endpoints da API

| Método | Endpoint           | Protegido | Descrição                                        |
| :----- | :----------------- | :-------: | :------------------------------------------------- |
| `POST` | `/api/auth/sync`   |    Sim    | Sincroniza o usuário do Firebase com o banco local. |
| `GET`  | `/api/users/me`    |    Sim    | Retorna os dados do usuário logado.                |
| `POST` | `/api/trips`       |    Sim    | Cria uma nova viagem e inicia a geração do roteiro. |

---

Feito com ❤️ por Cassiano.