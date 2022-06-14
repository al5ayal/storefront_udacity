import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import config from '../config';
import UserModel from '../models/User.model';
import { User } from '../interfaces/User';

const index = async (req: Request, res: Response) => {
  const userModel = new UserModel();
  userModel
    .findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const show = async (req: Request, res: Response) => {
  const userModel = new UserModel();
  try {
    const user = await userModel.findById(Number(req.params.id));
    if (user) {
      delete user.password;
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
    
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send(err.message);
    }
  }
};

const create = (req: Request, res: Response) => {
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

const destroy = (req: Request, res: Response) => {
  const userModel = new UserModel();
  userModel
    .destroy(Number(req.params.id))
    .then((user) => {
      res.json({ message: 'User deleted' });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};
export default { index, show, create, destroy };
