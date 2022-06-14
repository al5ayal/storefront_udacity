import dbConn from '../db';
import { Order } from '../interfaces/Order';
import format from 'pg-format';
class OrderModel {
  create = async (params: Order): Promise<Order | undefined> => {
    try {
      const orderQuery = `INSERT INTO orders(user_id) VALUES ($1) RETURNING *`;
      const insertedOrder = await dbConn.query(orderQuery, [
        params.user_id //should be from auth guard current auth user
      ]);
      const order_id = insertedOrder.rows[0].id;
      let orderDetailsQuery = format(
        `INSERT INTO order_details(order_id, product_id, quantity) VALUES %L`,
        params?.order_details?.map((x) => {
          return [order_id, x.product_id, x.quantity];
        })
      );
      const insertedOrderDetails = await dbConn.query(orderDetailsQuery);
      return insertedOrder.rows[0];
    } catch (err) {
      throw new Error(err as string);
    }
  };

  update = async (params: Order): Promise<Order> => {
    try {
      const orderQuery = `UPDATE orders SET status = $1 WHERE id = $2 RETURNING *`;
      const updatedOrder = await dbConn.query(orderQuery, [params.status, params.id]);
      return updatedOrder.rows[0];
    } catch (err) {
      throw new Error(err as string);
    }
  };

  getAll = async (user_id: number): Promise<Order[]> => {
    try {
      const queryString = `SELECT * FROM orders where user_id = $1 ORDER BY id DESC`;
      const result = await dbConn.query(queryString, [user_id]);
      //get order details for each order
      const orderDetailsQuery = format(
        `SELECT * FROM order_details WHERE order_id IN ( %L )`,
        result.rows.map((x) => x.id)
      );
      const orderDetails = await dbConn.query(orderDetailsQuery);

      result.rows.map((row) => {
        row.order_details = orderDetails.rows.filter((x) => x.order_id === row.id);
        return row;
      });

      return result.rows;
    } catch (err) {
      console.error(err);
      throw new Error(err as string);
    }
  };

  getAllCompleted = async (user_id: number): Promise<Order[]> => {
    try {
      const queryString = `SELECT * FROM orders where user_id = $1 AND status = 'completed' ORDER BY id DESC`;
      const result = await dbConn.query(queryString, [user_id]);
      for (let i = 0; i < result.rows.length; i++) {
        const orderDetailsQuery = `SELECT * FROM order_details WHERE order_id = $1`;
        const orderDetails = await dbConn.query(orderDetailsQuery, [result.rows[i].id]);
        result.rows[i].order_details = orderDetails.rows;
      }
      return result.rows;
    } catch (err) {
      console.error(err);
      throw new Error(err as string);
    }
  };

  findById = async (id: number): Promise<Order> => {
    try {
      const queryString = `SELECT * FROM orders WHERE id = $1`;
      const result = await dbConn.query(queryString, [id]);
      if (result.rowCount > 0) {
        const orderDetailsQuery = `SELECT * FROM order_details WHERE order_id = $1`;
        const orderDetails = await dbConn.query(orderDetailsQuery, [id]);
        result.rows[0].order_details = orderDetails.rows;
      }
      return result.rowCount ? result.rows[0] : null;
    } catch (err) {
      throw new Error(err as string);
    }
  };

  destroy = async (id: number): Promise<Boolean> => {
    try {
      const queryString = `DELETE FROM orders WHERE id = $1`;
      await dbConn.query(queryString, [id]);
      return true;
    } catch (err) {
      throw new Error(err as string);
    }
  };
}
export default OrderModel;
