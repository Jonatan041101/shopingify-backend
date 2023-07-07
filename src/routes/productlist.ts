import { Router } from 'express';
import {
  deleteProductList,
  updateProductList,
} from '../controller/productlist';

const router = Router();
router.put('/', updateProductList);
router.delete('/', deleteProductList);

export { router };
