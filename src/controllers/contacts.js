import * as contactsServices from '../services/contacts.js';

import createError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { sortByList } from '../db/models/Contact.js';
import { parseFilterParams } from '../filters/parseFilterContactsParams.js';
import { contactTypeList } from '../constants/contacts.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
  const filter = parseFilterParams(req.query, contactTypeList);
  filter.userId = req.user._id;

  const contacts = await contactsServices.getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdControllers = async (req, res) => {
  const {_id: userId} = req.user;
  const { contactId: _id } = req.params;

  const data = await contactsServices.getContact({_id, userId});

  if (!data) {
    throw createError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${_id}!`,
    data,
  });
};

export const addContactControllers = async (req, res) => {
  const {_id: userId} = req.user;
  const data = await contactsServices.addContact({...req.body, userId});
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const patchContactControllers = async (req, res) => {
  const {_id: userId} = req.user;
  const { contactId: _id } = req.params;

  const data = await contactsServices.patchContact({_id, userId}, req.body);
  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data,
  });
};

export const deleteContactControllers = async (req, res) => {
  const {_id: userId} = req.user;
  const { contactId: _id } = req.params;
  const data = await contactsServices.deleteContact({_id, userId});

  if (!data) {
    throw createError(404, 'Contact not found');
  }

  res.status(204).send();
};
