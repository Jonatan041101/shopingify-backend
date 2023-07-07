import { Router } from 'express';
import {
  addProduct,
  createHistory,
  getHistoryPending,
  getHistorys,
  getHistorysCategorysProduct,
  updateHistory,
} from '../controller/history';

const router = Router();

router.get('/', getHistorys);
router.get('/pending', getHistoryPending);
router.get('/stats', getHistorysCategorysProduct);
router.post('/', createHistory);
router.put('/', updateHistory);
router.put('/product', addProduct);
export { router };
