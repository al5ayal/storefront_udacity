export interface Product {
  id?: number;
  name: string;
  category_id: number;
  price: number | string;
  description: string;
}

export interface ProductQuery {
  name: string;
  category_id: number;
  price: number | string;
  description: string;
}
