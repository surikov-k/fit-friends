type UnknownObject = Record<string, unknown>;
type UnknownArrayOrObject = unknown[] | UnknownObject;

export const dirtyValues = (
  dirtyFields: UnknownArrayOrObject | boolean | unknown,
  allValues: UnknownArrayOrObject | unknown
): UnknownArrayOrObject | unknown => {
  if (dirtyFields === true || Array.isArray(dirtyFields)) {
    return allValues;
  }

  const dirtyFieldsObject = dirtyFields as UnknownObject;
  const allValuesObject = allValues as UnknownObject;

  return Object.fromEntries(
    Object.keys(dirtyFieldsObject).map((key) => [
      key,
      dirtyValues(dirtyFieldsObject[key], allValuesObject[key]),
    ])
  );
};
