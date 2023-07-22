import { Request, Response } from 'express';
import { ProductList, Status } from '@prisma/client';
import {
  createHistoryQuery,
  getAllCompleteHistory,
  getAllHistorys,
  getProductsHistoryCreated,
  searchHistoryPending,
  updateHistoryQuery,
} from '../query/historyQuery';
import { validateStatus, validateString } from '../util/validates/history';
import { ProductHistory, ProductListCreate } from '../types/types';
import {
  createManyProductListQuery,
  createdProductListQuery,
  searchProductListQuery,
  updateProductListCountQuery,
} from '../query/productListQuery';
import { errorQuery } from '../util/errors';
import { parseProductsHistory } from '../util/parse/parseProductListToHistory';
import { errorModelsId } from '../util/validates/productList';
interface HistoryStatsProduct {
  id: string;
  count: number;
  name: string;
}

interface CreateHistory {
  nameList: string;
  status: Status;
  productsList: ProductListCreate[];
}
interface History {
  id: string;
  name: string;
  date: Date;
  product: ProductList[];
}
interface ChangeStatus {
  historyId: string;
  status: Status;
}
interface HistoryAddProduct {
  historyId: string;
  productId: string;
}
export const getHistorys = async (_req: Request, res: Response) => {
  try {
    const historys = await getAllHistorys();
    if (!historys) throw new Error('Error en el servidor');
    interface Order {
      [key: string]: History[];
    }

    const productsByMonth: Order = historys.reduce((result: Order, history) => {
      const dateCreate = new Date(history.date);
      const month = dateCreate.toLocaleString('es-AR', { month: 'long' });
      const year = dateCreate.getFullYear();
      const key = `${month} ${year}`;

      if (!result[key]) {
        result[key] = [];
      }

      result[key].push(history);

      return result;
    }, {});

    const sortedProductsByMonth: Order = Object.entries(productsByMonth)
      .sort(([keyA], [keyB]) => {
        const [monthA, yearA] = keyA.split(' ');
        const [monthB, yearB] = keyB.split(' ');

        if (yearA !== yearB) {
          return Number(yearA) - Number(yearB);
        }

        const months: string[] = [
          'febrero',
          'marzo',
          'abril',
          'mayo',
          'junio',
          'julio',
          'agosto',
          'septiembre',
          'octubre',
          'noviembre',
          'diciembre',
        ];
        const indexMonthA = months.indexOf(monthA);
        const indexMonthB = months.indexOf(monthB);

        return indexMonthA - indexMonthB;
      })
      .reduce((result: Order, [key, products]) => {
        result[key] = products;
        return result;
      }, {});

    return res.json({ history: sortedProductsByMonth });
  } catch (error) {
    console.log({ error });
    errorQuery(res, error);
  }
};

export const createHistory = async (req: Request, res: Response) => {
  const { nameList, productsList, status } = req.body as CreateHistory;
  try {
    validateString(nameList);
    const history = await createHistoryQuery(nameList);
    if (!history) throw new Error('Error en la creacion de la lista.');
    const products: ProductHistory[] = parseProductsHistory(
      productsList,
      history.id
    );
    const createdExit = await createManyProductListQuery(products);
    if (!createdExit) {
      throw new Error(
        `Error en la creacion de los productos de la lista ${nameList}`
      );
    }
    const getHistoryCreated = await getProductsHistoryCreated(history.id);
    return res.json({ history: getHistoryCreated });
  } catch (error) {
    console.log({ error });
    errorQuery(res, error);
  }
};

export const getHistoryPending = async (_req: Request, res: Response) => {
  try {
    const historyPending = await searchHistoryPending();
    if (!historyPending) throw new Error('No hay una lista pendiente');
    res.json({ history: historyPending });
  } catch (error) {
    console.log({ error });
    errorQuery(res, error);
  }
};

export const updateHistory = async (req: Request, res: Response) => {
  const { historyId, status } = req.body as ChangeStatus;
  try {
    validateString(historyId);
    validateStatus(status);
    const history = await updateHistoryQuery(historyId, status);
    res.json({ history });
  } catch (error) {
    console.log({ error });
    errorQuery(res, error);
  }
};

export const addProduct = async (req: Request, res: Response) => {
  const { historyId, productId } = req.body as HistoryAddProduct;
  try {
    validateString(historyId);
    validateString(productId);
    const searchProduct = await searchProductListQuery(historyId, productId);
    if (!searchProduct) {
      const productList = await createdProductListQuery(historyId, productId);
      if (!productList) throw new Error(errorModelsId(productId));
      return res.json({
        message: `Producto con id ${productId} agregado a la lista con id ${historyId}`,
        id: productList.id,
      });
    }
    const productList = await updateProductListCountQuery(searchProduct.id, 1);
    if (!productList) throw new Error(errorModelsId(productId));
    return res.json({
      message: `El producto con id ${productId} a sido actualizado en la lista.`,
      id: productList.id,
    });
  } catch (error) {
    console.log({ error });
    errorQuery(res, error);
  }
};

export const getHistorysCategorysProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const historys = await getAllCompleteHistory();
    if (!historys) throw new Error('Error del servidor.');
    const productsStats: HistoryStatsProduct[] = [];
    const categoryStats: HistoryStatsProduct[] = [];
    historys.forEach((product) => {
      product.product.forEach((productName) => {
        const existProduct = productsStats.find(
          (prod) => prod.name === productName.product.name
        );
        const existCategory = categoryStats.find(
          (category) => category.name === productName.product.category.name
        );
        if (!existCategory) {
          const newCategory: HistoryStatsProduct = {
            count: 1,
            id: productName.product.category.id,
            name: productName.product.category.name,
          };

          categoryStats.push(newCategory);
        } else {
          existCategory.count += 1;
        }
        if (!existProduct) {
          const newProduct: HistoryStatsProduct = {
            count: productName.count,
            id: productName.product.id,
            name: productName.product.name,
          };
          productsStats.push(newProduct);
        } else {
          existProduct.count = existProduct.count + productName.count;
        }
      });
    });
    let ProductStats100: number = 0;
    let CategoryStats100: number = 0;
    productsStats.sort((a, b) => b.count - a.count);
    categoryStats.sort((a, b) => b.count - a.count);
    productsStats.forEach(({ count }) => (ProductStats100 += count));
    categoryStats.forEach(({ count }) => (CategoryStats100 += count));
    return res.json({
      productsStats,
      categoryStats,
      categoryStat100: CategoryStats100,
      productsStat100: ProductStats100,
    });
  } catch (error) {
    console.log({ error });
    errorQuery(res, error);
  }
};
