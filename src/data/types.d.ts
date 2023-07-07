export interface Category{
 name:string
}
export interface Product{
 name:string
note:string
image:string
categoryId:string
}
export type ProductCreate = Omit<Product, 'categoryId'> & {
 categoryName:string
}