import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { prisma } from './db/prisma';
import { router } from './routes';
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(router);
app.get('/', (req, res) => res.send('HOLA MUNDO'));
async function executeServer() {
  try {
    // await prisma.productList.deleteMany();
    // await prisma.history.deleteMany();
    // await prisma.stock.deleteMany();
    // await prisma.product.deleteMany();
    // await prisma.historyProduct.deleteMany();
    // await prisma.category.deleteMany();
  } catch (error) {
    console.log({ error });
  }
}
executeServer();
export default app;
