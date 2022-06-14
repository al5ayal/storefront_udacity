export interface ProductCategory {
  id?: number;
  name: string;
  description: string;
}

export interface ProductCategoryQuery {
  name: string;
  description: string;
}
