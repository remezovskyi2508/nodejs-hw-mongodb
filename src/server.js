import express from 'express';

import cors from 'cors';

import pino from 'pino-http';

import * as contactsServices from './services/contacts.js';

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

  app.get('/contacts', async (req, res) => {
    const contacts = await contactsServices.getContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;

    const contact = await contactsServices.getContactById(contactId);

    if(!contact){
      return res.status(404).json({
        status: 404,
        message: 'Contact not found',
      });
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      contact,
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  const port = Number(process.env.PORT || 3000);

  app.listen(port, console.log(`Server is running on port ${port}`));
};
