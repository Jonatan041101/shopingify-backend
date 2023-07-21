import { ProductHistory, ProductListCreate } from '../../types/types';

export const parseProductsHistory = (
  productsList: ProductListCreate[],
  historyId: string
): ProductHistory[] => {
  return productsList.map(({ count, productId }) => ({
    count,
    productId,
    historyId,
  }));
};
