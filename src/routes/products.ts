import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from '../controller/products';

const router = Router();

router.get('/', getProducts);
router.post('/', createProduct);
router.delete('/', deleteProduct);
router.put('/', updateProduct);
export { router };
