import express from 'express';

import cors from 'cors';

import pino from 'pino-http';

import contactsRouter from './routers/contacts.js';

import dotenv from 'dotenv';

dotenv.config();

export const setupServer = () => {
  const app = express();

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(cors());

  app.use(logger);

  app.use('/contacts', contactsRouter);

  app.use('/contacts/:contactId', contactsRouter);

  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  const port = Number(process.env.PORT || 3000);

  app.listen(port, console.log(`Server is running on port ${port}`));
};
