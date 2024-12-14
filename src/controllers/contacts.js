import * as contactsServices from '../services/contacts.js';

import createError from 'http-errors';

export const getContactsController = async (req, res) => {
  const contacts = await contactsServices.getContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdControllers = async (req, res) => {
  const { contactId } = req.params;

  const data = await contactsServices.getContactById(contactId);

  if (!data) {
    throw createError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data,
  });
};

export const addContactControllers = async (req, res) => {
  const data = await contactsServices.addContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const patchContactControllers = async (req, res) => {
  const { contactId } = req.params;

  const data = await contactsServices.patchContact(contactId, req.body);

  if (!data) {
    throw createError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data,
  });
};

export const deleteContactControllers = async (req, res) => {
  const { contactId } = req.params;
  const data = await contactsServices.deleteContact(contactId);

  if (!data) {
    throw createError(404, 'Contact not found');
  }

  res.status(204).send();
};
