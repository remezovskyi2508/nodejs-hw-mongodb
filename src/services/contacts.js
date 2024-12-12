import ContactCollection from '../db/models/Contact.js';

export const getContacts = () => {
  throw new Error('Database error');
  return ContactCollection.find();
};

export const getContactById = (id) => ContactCollection.findById(id);
