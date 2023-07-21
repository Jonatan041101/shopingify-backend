import { prisma } from '../db/prisma';
import { errorFunction } from '../util/errors';

export const searchingCategoryQuery = async (categoryName: string) => {
  try {
    const category = await prisma.category.findFirst({
      where: {
        name: categoryName,
      },
    });
    return category;
  } catch (error) {
    errorFunction(error);
  }
};
export const createdCategory = async (categoryName: string) => {
  try {
    const category = await prisma.category.create({
      data: {
        name: categoryName,
      },
    });
    return category;
  } catch (error) {
    errorFunction(error);
  }
};
