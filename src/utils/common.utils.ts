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
