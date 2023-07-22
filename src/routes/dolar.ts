import { Router } from 'express';
import { getDolar } from '../controller/dolar';

const router = Router();

router.get('/', getDolar);

export { router };
