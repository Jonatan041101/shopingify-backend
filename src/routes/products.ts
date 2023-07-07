import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProducts,
} from '../controller/products';

const router = Router();

router.get('/', getProducts);
router.post('/', createProduct);
router.delete('/', deleteProduct);
export { router };
