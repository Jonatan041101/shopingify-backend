import { Status } from '@prisma/client';
export const errorName = (name: unknown) => `El nombre ${name} no es un string`;
export const errorStatus = (status: any) =>
  `El nombre ${status} no es un Status 'Pendiente'|'Completado'|'Cancelado'`;
export const validateString = (name: unknown) => {
  if (typeof name !== 'string') throw new Error(errorName(name));
  return name;
};
export const validateStatus = (stats: any) => {
  const stat = validateString(stats);
  if (!stat) throw new Error(errorName(stats));
  if (!Object.values(Status).includes(stats))
    throw new Error(errorStatus(stats));
};
