export const excludeKeysFromObject = (
  obj: Record<string, any>,
  ...keys: Array<string>
) => {
  let newPayload = {} as any;
  for (const [key, value] of Object.entries(obj)) {
    if (keys.includes(key)) {
      continue;
    }
    if (!(key in newPayload)) {
      newPayload[key] = value;
    }
  }
  return newPayload;
};

export const includeKeyIntoObjects = (
  obj: Record<string, any>,
  ...keys: Array<string>
) => {
  let newPayload = {} as any;
  for (const [key, value] of Object.entries(obj)) {
    if (keys.includes(key)) {
      newPayload[key] = value;
    } else {
      continue;
    }
  }
  return newPayload;
};

export const logEmptyAttribute = (key: string) => {
  return `The ${key} is Missing on the Field for Inserting the Data in the MongoDB`;
};
