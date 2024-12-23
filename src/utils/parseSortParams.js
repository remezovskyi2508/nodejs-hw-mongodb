// const sortOrderList = ['asc', 'desc'];

// export const parseSortParams = ({ sortBy, sortOrder }, sortByList) => {
//   const parsedSortOrder = sortOrderList.includes(sortOrder)
//     ? sortOrder
//     : sortOrderList[0];
//   const parsedSortBy = sortByList.includes(sortBy) ? sortBy : sortByList[0];

//   return {
//     sortby: parsedSortBy,
//     sortOrder: parsedSortOrder,
//   };
// };

import { SORT_ORDER } from '../constants/contacts.js';

const parseSortOrder = (sortOrder) => {
  const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
  if (isKnownOrder) return sortOrder;
  return SORT_ORDER.ASC;
};

const parseSortBy = (sortBy, sortByList) => {
  if (sortByList.includes(sortBy)) {
    return sortBy;
  }

  return '_id';
};

export const parseSortParams = (query, sortByList) => {
  const { sortOrder, sortBy } = query;

  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy, sortByList);

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};
