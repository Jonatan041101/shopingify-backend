export const validateString = (name: unknown) => {
  if (typeof name !== 'string')
    throw new Error(`El nombre ${name} no es un string`);
  return name;
};
