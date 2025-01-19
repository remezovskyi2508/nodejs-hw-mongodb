import express from 'express';

import cors from 'cors';

import authRouter from './routers/auth.js';
import contactsRouter from './routers/contacts.js';

import dotenv from 'dotenv';

import { logger } from './middlewares/logger.js';

import { notFoundHandler } from './middlewares/notFoundHandler.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { authenticate } from './middlewares/authenticate.js';
import cookieParser from 'cookie-parser';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

dotenv.config();

export const setupServer = () => {
  const app = express();

  app.use(cors());

  app.use(express.json());

  app.use(cookieParser());

  app.use(logger);

  app.use('/auth', authRouter);

  app.use('/contacts', authenticate, contactsRouter);

  app.use('/api-docs', swaggerDocs());

  app.use(notFoundHandler);

  app.use(errorHandler);

  const port = Number(process.env.PORT || 3000);

  app.listen(port, console.log(`Server is running on port ${port}`));
};

