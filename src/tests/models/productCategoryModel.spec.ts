import { ProductCategory } from '../../interfaces/ProductCategory';
import ProductCategoryModel from '../../models/ProductCategory.model';

const productCategory = new ProductCategoryModel();

const categoryData: ProductCategory = {
  name: 'name',
  description: 'description'
};
const categoryData2: ProductCategory = {
  id: 1,
  name: 'cat name',
  description: 'cat description'
};

describe('Product category Model', () => {
  it(`It should have create method`, async () => {
    expect(productCategory.create).toBeDefined();
  });

  it(`create should return a product object`, async () => {
    const result = await productCategory.create(categoryData);
    categoryData.id = result.id;
    expect(result).toEqual(categoryData);
  });

  it(`It should have findAll method`, async () => {
    expect(productCategory.findAll).toBeDefined();
  });

  it(`findAll should return a list of products`, async () => {
    const result = await productCategory.findAll();
    expect(result).toEqual([categoryData2, categoryData]);
  });

  it(`It should have findById method`, async () => {
    expect(productCategory.findById).toBeDefined();
  });

  it(`findById should return a category object`, async () => {
    const result = await productCategory.findById(categoryData.id as number);
    expect(result).toEqual(Object(categoryData));
  });

  it(`It should have destroy method`, async () => {
    expect(productCategory.destroy).toBeDefined();
  });

  it(`destroy should return true`, async () => {
    const result = await productCategory.destroy(categoryData.id as number);
    expect(result).toEqual(true);
  });
});
