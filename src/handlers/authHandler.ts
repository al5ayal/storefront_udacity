import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config';
import UserModel from '../models/User.model';
import { User } from '../interfaces/User';

const login = async (req: Request, res: Response) => {
  //login and generate token for user
  const { login, password } = req.body;
  const userModel = new UserModel();
  const user = await userModel.findByEmailOrUsername(login);
  if (user) {
    // bcrypt compare paasowrds
    const validPassword = await bcrypt.compare(
      password + config.app.bcryptPepper,
      user.password as string
    );

    if (validPassword) {
      const token = jwt.sign({ email: user.email }, config.app.jwtSecret);
      res.json({ token });
    } else {
      res.status(401).send('Invalid password');
    }
  } else {
    res.status(401).send('User not found');
  }
};
const register = (req: Request, res: Response) => {
  const userParams: User = req.body;
  const userModel = new UserModel();
  const hash = bcrypt.hashSync(
    (userParams?.password as string) + config.app.bcryptPepper,
    config.app.bcryptRound
  );
  userParams.password = hash;
  userModel
    .create(userParams)
    .then((user) => {
      delete user.password;
      res.json(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export default { login, register };
