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
