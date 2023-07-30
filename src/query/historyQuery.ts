import { Status } from '@prisma/client';
import { prisma } from '../db/prisma';
import { errorFunction } from '../util/errors';
import { includeHistoryWithProductComplete } from '../util/joinsQuerys/history';

export const createHistoryQuery = async (name: string) => {
  try {
    const history = await prisma.history.create({
      data: {
        name,
        status: 'Pendiente',
      },
    });
    return history;
  } catch (error) {
    errorFunction(error);
  }
};
export const getProductsHistoryCreated = async (historyId: string) => {
  try {
    const getHistoryCreated = await prisma.history.findFirst({
      where: {
        id: historyId,
      },
      ...includeHistoryWithProductComplete,
    });
    return getHistoryCreated;
  } catch (error) {
    errorFunction(error);
  }
};
export const getAllHistorys = async (complete?: boolean) => {
  const onlyHistoryComplete = complete
    ? {
        status: Status.Completado,
      }
    : {};
  try {
    const historysWithProducts = await prisma.history.findMany({
      ...includeHistoryWithProductComplete,
      where: {
        ...onlyHistoryComplete,
      },
    });
    return historysWithProducts;
  } catch (error) {
    errorFunction(error);
  }
};
export const searchHistoryPending = async () => {
  try {
    const historyPending = await prisma.history.findFirst({
      where: {
        status: 'Pendiente',
      },
      ...includeHistoryWithProductComplete,
    });
    return historyPending;
  } catch (error) {
    errorFunction(error);
  }
};
export const searchHistoryWithID = async (id: string) => {
  try {
    const historyProducts = await prisma.history.findUnique({
      where: {
        id,
      },
      include: {
        product: {
          select: {
            productId: true,
            count: true,
          },
        },
      },
    });
    return historyProducts;
  } catch (error) {
    errorFunction(error);
  }
};
export const updateHistoryQuery = async (historyId: string, status: Status) => {
  try {
    const history = await prisma.history.update({
      where: {
        id: historyId,
      },
      data: {
        status,
      },
    });

    return history;
  } catch (error) {
    errorFunction(error);
  }
};
export const getAllCompleteHistory = async () => {
  try {
    const history = await prisma.history.findMany({
      where: {
        status: 'Completado',
      },
      ...includeHistoryWithProductComplete,
    });
    return history;
  } catch (error) {
    errorFunction(error);
  }
};
