import dbConn from '../db';
import { ProductCategory } from '../interfaces/ProductCategory';

class OrderCategoryModel {
  create = async (params: ProductCategory): Promise<ProductCategory> => {
    try {
      const queryString = `INSERT INTO product_categories(name, description)
    VALUES ( $1, $2 ) RETURNING *`;
      const result = await dbConn.query(queryString, [params.name, params.description]);
      return result.rows[0];
    } catch (err) {
      throw new Error(err as string);
    }
  };

  findAll = async (): Promise<ProductCategory[]> => {
    try {
      const queryString = `SELECT * FROM product_categories`;
      const result = await dbConn.query(queryString);
      return result.rows;
    } catch (err) {
      throw new Error(err as string);
    }
  };

  findById = async (id: number): Promise<ProductCategory> => {
    try {
      const queryString = `SELECT * FROM product_categories WHERE id = $1`;
      const result = await dbConn.query(queryString, [id]);
      return result.rowCount ? result.rows[0] : null;
    } catch (err) {
      throw new Error(err as string);
    }
  };

  destroy = async (id: number): Promise<Boolean> => {
    try {
      const queryString = `DELETE FROM product_categories WHERE id = $1`;
      await dbConn.query(queryString, [id]);
      return true;
    } catch (err) {
      throw new Error(err as string);
    }
  };
}
export default OrderCategoryModel;
