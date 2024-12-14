import express from 'express';

import cors from 'cors';

import contactsRouter from './routers/contacts.js';

import dotenv from 'dotenv';

import { logger } from './middlewares/logger.js';

import { notFoundHandler } from './middlewares/notFoundHandler.js';

import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

export const setupServer = () => {
  const app = express();

  app.use(cors());

  app.use(express.json());

  app.use(logger);

  app.use('/contacts', contactsRouter);

  app.use('/contacts/:contactId', contactsRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  const port = Number(process.env.PORT || 3000);

  app.listen(port, console.log(`Server is running on port ${port}`));
};
