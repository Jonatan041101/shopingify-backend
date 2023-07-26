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
    // const deleteProductQuery = async (id: string) => {
    //   console.log({ id });
    //   let x = await prisma.product.findFirst({
    //     where: {
    //       id,
    //     },
    //   });
    //   console.log(x);
    //   const prod = await prisma.product.delete({
    //     where: {
    //       id: 'ac68bac5-3e89-4b46-8c30-65abee39eedc',
    //     },
    //   });
    //   console.log({ prod });
    //   return prod;
    // };
    // await deleteProductQuery('ac68bac5-3e89-4b46-8c30-65abee39eedc');
  } catch (error) {
    console.log({ error });
  }
}
executeServer();
export default app;
