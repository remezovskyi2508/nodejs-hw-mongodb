import { Router } from 'express';

import {
  getContactsController,
  getContactByIdControllers,
  addContactControllers,
  patchContactControllers,
  deleteContactControllers,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get('/:contactId', ctrlWrapper(getContactByIdControllers));

contactsRouter.post('/', ctrlWrapper(addContactControllers));

contactsRouter.patch('/:contactId', ctrlWrapper(patchContactControllers));

contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactControllers));

export default contactsRouter;
