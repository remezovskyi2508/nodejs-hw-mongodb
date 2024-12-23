import ContactCollection from '../db/models/Contact.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';
import { SORT_ORDER } from '../constants/contacts.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactCollection.find();
  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
  const data = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });

  const filters = {};
  if (filter.type) filters.contactType = filter.type;
  if (filter.isFavourite) filters.isFavourite = filter.isFavourite;

  const totalItems = await ContactCollection.find(filters).countDocuments();

  const paginationData = calcPaginationData({ totalItems, page, perPage });

  return {
    data,
    page,
    perPage,
    totalItems,
    ...paginationData,
  };
};

export const getContactById = (id) => ContactCollection.findById(id);

export const addContact = (payload) => ContactCollection.create(payload);

export const patchContact = (_id, payload) => {
  const result = ContactCollection.findOneAndUpdate({ _id }, payload, {});
  return result;
};

export const deleteContact = (_id) =>
  ContactCollection.findOneAndDelete({ _id });
