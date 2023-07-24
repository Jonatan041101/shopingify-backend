import { Product, ProductList, Stock, User } from '@prisma/client';

export interface Login extends Pick<User, 'user' | 'password'> {}
export interface CreatedProduct extends Omit<Product, 'id'> {
  stock: Pick<Stock, 'count'>;
}
export interface CategoryName {
  category: string;
}
export interface ProductHistory extends Omit<ProductList, 'id'> {}
export interface ProductListCreate {
  productId: string;
  count: number;
}
export interface ID {
  id: string;
}
export interface ResponseStock {
  productId: string;
  count: number;
}

export interface StockUpdate {
  id: string;
  count: number;
}

export interface UpdateProduct {
  id: string;
  category: string;
  price: number;
  stock: StockModelCountStringOrNumber;
  name: string;
  note: string;
  image: string;
  stock: StockUpdate;
}
