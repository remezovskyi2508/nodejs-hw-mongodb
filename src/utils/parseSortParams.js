const sortOrderList = ['asc', 'desc'];

export const parseSortParams = ({ sortBy, sortOrder }, sortByList) => {
  const parsedSortOrder = sortOrderList.includes(sortOrder)
    ? sortOrder
    : sortOrderList[0];
  const parsedSortBy = sortByList.includes(sortBy) ? sortBy : sortByList[0];

  return {
    sortby: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};
