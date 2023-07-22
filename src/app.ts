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
async function executeServer() {
  try {
    // await prisma.productList.deleteMany()
    // await prisma.history.deleteMany()
    // await prisma.product.deleteMany()
    // await prisma.category.createMany({
    //   data: categorys,
    // });
    // const category = await prisma.category.create({
    //   data: {
    //     name: 'Juguetes',
    //   },
    // });
    // console.log({ category });
  } catch (error) {
    console.log({ error });
  }
}
executeServer();
export default app;
