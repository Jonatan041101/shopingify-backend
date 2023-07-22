'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.getHistorysCategorysProduct =
  exports.addProduct =
  exports.updateHistory =
  exports.getHistoryPending =
  exports.createHistory =
  exports.getHistorys =
    void 0;
const historyQuery_1 = require('../query/historyQuery');
const history_1 = require('../util/validates/history');
const productListQuery_1 = require('../query/productListQuery');
const errors_1 = require('../util/errors');
const parseProductListToHistory_1 = require('../util/parse/parseProductListToHistory');
const productList_1 = require('../util/validates/productList');
const getHistorys = (_req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const historys = yield (0, historyQuery_1.getAllHistorys)();
      if (!historys) throw new Error('Error en el servidor');
      const productsByMonth = historys.reduce((result, history) => {
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
      const sortedProductsByMonth = Object.entries(productsByMonth)
        .sort(([keyA], [keyB]) => {
          const [monthA, yearA] = keyA.split(' ');
          const [monthB, yearB] = keyB.split(' ');
          if (yearA !== yearB) {
            return Number(yearA) - Number(yearB);
          }
          const months = [
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
        .reduce((result, [key, products]) => {
          result[key] = products;
          return result;
        }, {});
      return res.json({ history: sortedProductsByMonth });
    } catch (error) {
      console.log({ error });
      (0, errors_1.errorQuery)(res, error);
    }
  });
exports.getHistorys = getHistorys;
const createHistory = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { nameList, productsList, status } = req.body;
    try {
      (0, history_1.validateString)(nameList);
      const history = yield (0, historyQuery_1.createHistoryQuery)(nameList);
      if (!history) throw new Error('Error en la creacion de la lista.');
      const products = (0, parseProductListToHistory_1.parseProductsHistory)(
        productsList,
        history.id
      );
      const createdExit = yield (0,
      productListQuery_1.createManyProductListQuery)(products);
      if (!createdExit) {
        throw new Error(
          `Error en la creacion de los productos de la lista ${nameList}`
        );
      }
      const getHistoryCreated = yield (0,
      historyQuery_1.getProductsHistoryCreated)(history.id);
      return res.json({ history: getHistoryCreated });
    } catch (error) {
      console.log({ error });
      (0, errors_1.errorQuery)(res, error);
    }
  });
exports.createHistory = createHistory;
const getHistoryPending = (_req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const historyPending = yield (0, historyQuery_1.searchHistoryPending)();
      if (!historyPending) throw new Error('No hay una lista pendiente');
      res.json({ history: historyPending });
    } catch (error) {
      console.log({ error });
      (0, errors_1.errorQuery)(res, error);
    }
  });
exports.getHistoryPending = getHistoryPending;
const updateHistory = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { historyId, status } = req.body;
    try {
      (0, history_1.validateString)(historyId);
      (0, history_1.validateStatus)(status);
      const history = yield (0, historyQuery_1.updateHistoryQuery)(
        historyId,
        status
      );
      res.json({ history });
    } catch (error) {
      console.log({ error });
      (0, errors_1.errorQuery)(res, error);
    }
  });
exports.updateHistory = updateHistory;
const addProduct = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { historyId, productId } = req.body;
    try {
      (0, history_1.validateString)(historyId);
      (0, history_1.validateString)(productId);
      const searchProduct = yield (0,
      productListQuery_1.searchProductListQuery)(historyId, productId);
      if (!searchProduct) {
        const productList = yield (0,
        productListQuery_1.createdProductListQuery)(historyId, productId);
        if (!productList)
          throw new Error((0, productList_1.errorModelsId)(productId));
        return res.json({
          message: `Producto con id ${productId} agregado a la lista con id ${historyId}`,
          id: productList.id,
        });
      }
      const productList = yield (0,
      productListQuery_1.updateProductListCountQuery)(searchProduct.id, 1);
      if (!productList)
        throw new Error((0, productList_1.errorModelsId)(productId));
      return res.json({
        message: `El producto con id ${productId} a sido actualizado en la lista.`,
        id: productList.id,
      });
    } catch (error) {
      console.log({ error });
      (0, errors_1.errorQuery)(res, error);
    }
  });
exports.addProduct = addProduct;
const getHistorysCategorysProduct = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const historys = yield (0, historyQuery_1.getAllCompleteHistory)();
      if (!historys) throw new Error('Error del servidor.');
      const productsStats = [];
      const categoryStats = [];
      historys.forEach((product) => {
        product.product.forEach((productName) => {
          const existProduct = productsStats.find(
            (prod) => prod.name === productName.product.name
          );
          const existCategory = categoryStats.find(
            (category) => category.name === productName.product.category.name
          );
          if (!existCategory) {
            const newCategory = {
              count: 1,
              id: productName.product.category.id,
              name: productName.product.category.name,
            };
            categoryStats.push(newCategory);
          } else {
            existCategory.count += 1;
          }
          if (!existProduct) {
            const newProduct = {
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
      let ProductStats100 = 0;
      let CategoryStats100 = 0;
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
      (0, errors_1.errorQuery)(res, error);
    }
  });
exports.getHistorysCategorysProduct = getHistorysCategorysProduct;
