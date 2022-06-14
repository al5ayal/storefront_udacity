import dbConn from '../db';
import { User } from '../interfaces/User';

class UserModel {
  create = async (userData: User): Promise<User> => {
    try {
      const queryString = `INSERT INTO users(first_name, last_name, username, email, password)
    VALUES ( $1, $2, $3, $4, $5) RETURNING *`;
      console.log(queryString);
      const result = await dbConn.query(queryString, [
        userData.first_name,
        userData.last_name,
        userData.username,
        userData.email,
        userData.password
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(err as string);
    }
  };

  findAll = async (): Promise<User[]> => {
    try {
      const queryString = `SELECT id, first_name, last_name, username, email FROM users`;
      const result = await dbConn.query(queryString);
      return result.rows;
    } catch (err) {
      throw new Error(err as string);
    }
  };

  findById = async (id: number): Promise<User> => {
    try {
      const queryString = `SELECT * FROM users WHERE id = $1`;
      const result = await dbConn.query(queryString, [id]);
      delete result.rows[0].password;
      return result.rowCount ? result.rows[0] : null;
    } catch (err) {
      throw new Error(err as string);
    }
  };

  findByEmailOrUsername = async (login: string): Promise<User> => {
    try {
      const queryString = `SELECT * FROM users WHERE email = $1 OR username = $1`;
      const result = await dbConn.query(queryString, [login]);
      return result.rowCount ? result.rows[0] : null;
    } catch (err) {
      throw new Error(err as string);
    }
  };

  findByEmail = async (email: string): Promise<User> => {
    try {
      const queryString = `SELECT * FROM users WHERE email = $1`;
      const result = await dbConn.query(queryString, [email]);
      delete result.rows[0].password;
      return result.rowCount ? result.rows[0] : null;
    } catch (err) {
      throw new Error(err as string);
    }
  };

  findByUsername = async (username: string): Promise<User> => {
    try {
      const queryString = `SELECT * FROM users WHERE username = $1`;
      const result = await dbConn.query(queryString, [username]);
      delete result.rows[0].password;
      return result.rowCount ? result.rows[0] : null;
    } catch (err) {
      throw new Error(err as string);
    }
  };

  destroy = async (id: number): Promise<Boolean> => {
    try {
      const queryString = `DELETE FROM users WHERE id = $1`;
      await dbConn.query(queryString, [id]);
      return true;
    } catch (err) {
      throw new Error(err as string);
    }
  };
}
export default UserModel;
