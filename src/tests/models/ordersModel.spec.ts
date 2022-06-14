import { ProductCategory } from '../../interfaces/ProductCategory';
import { Product } from '../../interfaces/Product';
import ProductCategoryModel from '../../models/ProductCategory.model';
import ProductModel from '../../models/Product.model';
import { User } from '../../interfaces/User';
import { Order } from '../../interfaces/Order';
import OrderModel from '../../models/Order.model';
import UserModel from '../../models/User.model';
const order = new OrderModel();
const product = new ProductModel();
const productCategory = new ProductCategoryModel();
const user = new UserModel();

const UserData: User = {
  first_name: 'firstname',
  last_name: 'lastname',
  username: 'username',
  email: 'username@test.test',
  password: '123456'
};
const categoryData: ProductCategory = {
  name: 'cat name',
  description: 'cat description'
};
const productData: Product = {
  name: 'name',
  description: 'description',
  category_id: 0,
  price: '202.50'
};

const orderData: Order = {
  user_id: 0,
  status: 'active',
  created_at: '2022-06-05 12:00:00'
};

describe('Orders Model', () => {
  it(`It should have create method`, async () => {
    expect(order.create).toBeDefined();
  });

  it(`create should return a product object`, async () => {
    const category = await productCategory.create(categoryData);
    productData.category_id = category.id as number;
    const newproduct = await product.create(productData);
    productData.id = newproduct.id;
    const newUser = await user.create(UserData);
    UserData.id = newUser.id;
    orderData.user_id = newUser.id as number;
    const newOrder = {
      user_id: newUser.id as number,
      order_details: [
        {
          id: 1,
          order_id: 0,
          product_id: newproduct.id as number,
          quantity: 1
        }
      ]
    };

    const result = await order.create(newOrder as Order);
    orderData.id = result?.id;
    orderData.created_at = result?.created_at as Date;
    orderData.user_id = result?.user_id as number;
    expect(result).toEqual(orderData);
    newOrder.order_details[0].order_id = result?.id as number;
    orderData.order_details = newOrder.order_details;
  });

  it(`It should have getAll method`, async () => {
    expect(order.getAll).toBeDefined();
  });

  it(`getAll should return a list of products`, async () => {
    const result = await order.getAll(UserData.id as number);
    expect(result).toEqual([orderData]);
  });

  it(`It should have findById method`, async () => {
    expect(order.findById).toBeDefined();
  });

  it(`findById should return a product`, async () => {
    const result = await order.findById(orderData.id as number);
    expect(result).toEqual(Object(orderData));
  });

  it(`It should have destroy method`, async () => {
    expect(order.destroy).toBeDefined();
  });

  it(`destroy should return a product`, async () => {
    await user.destroy(UserData.id as number);
    await product.destroy(productData.id as number);
    await productCategory.destroy(categoryData.id as number);
    const result = await order.destroy(orderData.id as number);
    expect(result).toEqual(true);
  });
});
