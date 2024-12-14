import ContactCollection from '../db/models/Contact.js';

export const getContacts = () => {
  return ContactCollection.find();
};

export const getContactById = (id) => ContactCollection.findById(id);

export const addContact = (payload) => ContactCollection.create(payload);

export const patchContact = (_id, payload) => {
  const result = ContactCollection.findOneAndUpdate({ _id }, payload, {
    new: true,
  });
  return result;
};

export const deleteContact = (_id) =>
  ContactCollection.findOneAndDelete({ _id });
