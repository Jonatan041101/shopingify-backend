import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { prisma } from './db/prisma';
import { categorys } from './data/category';
import { productMeat, products, productsDrinks } from './data/product';
import { router } from './routes';
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(router);
async function executeServer() {
  try {
    // await prisma.productList.deleteMany()
    // await prisma.history.deleteMany()
    // await prisma.product.deleteMany()
    // await prisma.category.createMany({
    //       data:categorys
    //      })
    //  await prisma.product.createMany({
    //   data:[...products,...productMeat,...productsDrinks]
    //  })
  } catch (error) {
    console.log({ error });
  }
}
executeServer();
export default app;
