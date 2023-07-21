import { prisma } from '../db/prisma';
import { errorFunction } from '../util/errors';
export const includeHistoryWithProductComplete = {
  include: {
    product: {
      include: {
        product: {
          include: {
            category: true,
            stock: {
              select: {
                count: true,
                id: true,
              },
            },
          },
        },
      },
    },
  },
};
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
export const getAllHistorys = async () => {
  try {
    const historysWithProducts = await prisma.history.findMany({
      ...includeHistoryWithProductComplete,
    });
    return historysWithProducts;
  } catch (error) {
    errorFunction(error);
  }
};
