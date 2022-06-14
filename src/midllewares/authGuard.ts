import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/User.model';
import config from '../config';
import { Jwt } from '../interfaces/Jwt';

const authGuard = async (req: Request, res: Response, next: NextFunction) => {
  // extract bearer token from Request
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).send('No token provided');
  }
  try {
    const payload = jwt.verify(token, config.app.jwtSecret) as Jwt;
    if (payload) {
      const userModel = new UserModel();
      const user = await userModel.findByEmail(payload.email);
      if (user) {
        res.locals.user = user;
        next();
      } else {
        res.status(401).send('Unauthorized');
        return;
      }
    } else {
      return res.status(401).send('Invalid token');
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).send('Unauthenticated ' + err.message);
    }
  }
};
export { authGuard };
