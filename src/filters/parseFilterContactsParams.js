const parseType = (type, contactTypeList) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isType = contactTypeList.includes(type);

  if (isType) return type;
};

const parseIsFavourite = (isFavourite) => {
  const isString = typeof isFavourite === 'string';
  if (!isString) return;
  if (isFavourite) return isFavourite;
  ;
};

export const parseFilterParams = (query, contactTypeList) => {
  const { type, isFavourite } = query;

  const parsedType = parseType(type, contactTypeList);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
