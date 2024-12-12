import * as contactsServices from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  const contacts = await contactsServices.getContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactsByIdControllers = async (req, res) => {
  const { contactId } = req.params;

  const contact = await contactsServices.getContactById(contactId);

  if (!contact) {
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
};
