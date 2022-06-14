import supertest from 'supertest';
import { app } from '../../app';
import { ProductCategory } from '../../interfaces/ProductCategory';
import { Product } from '../../interfaces/Product';
import ProductCategoryModel from '../../models/ProductCategory.model';
import ProductModel from '../../models/Product.model';

const request = supertest(app);

// const product = new ProductModel();
const product = new ProductModel();
const productCategory = new ProductCategoryModel();

// const productData: Product = {
//   first_name: 'firstname',
//   last_name: 'lastname',
//   productname: 'productname',
//   email: 'productname@test.test',
//   password: '123456'
// };
const categoryData: ProductCategory = {
  name: 'name',
  description: 'description'
};
const productData: Product = {
  name: 'p name',
  description: 'p description',
  category_id: 0,
  price: '202.50'
};

describe('Product Model', () => {
  it(`It should have create method`, async () => {
    expect(product.create).toBeDefined();
  });

  it(`create should return a product object`, async () => {
    const category = await productCategory.create(categoryData);
    productData.category_id = category.id as number;
    const result = await product.create(productData);
    productData.id = result.id;
    expect(result).toEqual(productData);
  });

  it(`It should have getAll method`, async () => {
    expect(product.getAll).toBeDefined();
  });

  it(`getAll should return a list of products`, async () => {
    const result = await product.getAll();
    expect(result).toEqual([productData]);
  });

  it(`It should have findById method`, async () => {
    expect(product.findById).toBeDefined();
  });

  it(`findById should return a product`, async () => {
    const result = await product.findById(productData.id as number);
    expect(result).toEqual(Object(productData));
  });

  it(`It should have destroy method`, async () => {
    expect(product.destroy).toBeDefined();
  });

  it(`destroy should return a product`, async () => {
    const result = await product.destroy(productData.id as number);
    expect(result).toEqual(true);
  });
});
