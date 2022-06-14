import dbConn from '../db';
import { Product } from '../interfaces/Product';

class ProductModel {
  create = async (params: Product): Promise<Product> => {
    try {
      const queryString = `INSERT INTO products(name, category_id, price, description)
    VALUES ( $1, $2, $3, $4 ) RETURNING *`;
      const result = await dbConn.query(queryString, [
        params.name,
        params.category_id,
        params.price,
        params.description
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(err as string);
    }
  };

  getAll = async (): Promise<Product[]> => {
    try {
      const queryString = `SELECT * FROM products ORDER BY id DESC;`;
      const result = await dbConn.query(queryString);
      return result.rows;
    } catch (err) {
      throw new Error(err as string);
    }
  };

  findTop = async (): Promise<Product[]> => {
    try {
      const queryString = `SELECT products.* FROM products 
      INNER JOIN order_details ON products.id = order_details.product_id
       GROUP BY products.id ORDER BY SUM(order_details.quantity) DESC LIMIT 5`;
      const result = await dbConn.query(queryString);
      return result.rows;
    } catch (err) {
      throw new Error(err as string);
    }
  };

  findById = async (id: number): Promise<Product> => {
    try {
      const queryString = `SELECT * FROM products WHERE id = $1`;
      const result = await dbConn.query(queryString, [id]);
      return result.rowCount ? result.rows[0] : null;
    } catch (err) {
      throw new Error(err as string);
    }
  };

  findByCategory = async (cat_id: number): Promise<Product[]> => {
    try {
      const queryString = `SELECT * FROM products WHERE category_id = $1`;
      const result = await dbConn.query(queryString, [cat_id]);
      return result.rows;
    } catch (err) {
      throw new Error(err as string);
    }
  };

  destroy = async (id: number): Promise<Boolean> => {
    try {
      const queryString = `DELETE FROM products WHERE id = $1`;
      await dbConn.query(queryString, [id]);
      return true;
    } catch (err) {
      throw new Error(err as string);
    }
  };
}

export default ProductModel;
