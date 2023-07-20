import { Router } from 'express';
import { loginSesion } from '../controller/user';

const router = Router();
router.post('/login', loginSesion);
// router.post('/',createUser)
export { router };
