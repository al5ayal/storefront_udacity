import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/User.model';

const NullOrEmpty = (val: string | number) =>
  !val || val === null || val === undefined || val == '';

const EmailIsValid = (val: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(val);
};

const createUserValidator = async (req: Request, res: Response, next: NextFunction) => {
  //extract data from request
  const { first_name, last_name, username, email, password } = req.body;

  const errors = [];

  if (NullOrEmpty(first_name)) errors.push('First name is required');
  if (NullOrEmpty(last_name)) errors.push('Last name is required');
  if (NullOrEmpty(username)) errors.push('Username is required');
  if (NullOrEmpty(email)) errors.push('Email is required');
  if (NullOrEmpty(password)) errors.push('Password is required');
  if (!EmailIsValid(email)) errors.push('Please insert a vaild email');
  // email already exists
  const userModel = new UserModel();
  const EmailExist = await userModel.findByEmail(email);
  if (EmailExist) errors.push('Email already exists');
  const usernameExist = await userModel.findByUsername(username);
  if (usernameExist) errors.push('Username already exists');

  if (errors.length > 0) {
    res.status(400).json(errors);
    return;
  }

  next();
};

const userLoginValidator = async (req: Request, res: Response, next: NextFunction) => {
  //extract data from request
  const { login, password } = req.body;

  const errors = [];

  if (NullOrEmpty(login)) errors.push('First name is required');
  if (NullOrEmpty(password)) errors.push('Last name is required');
  // email already exists
  if (errors.length > 0) {
    res.status(400).json(errors);
    return;
  }

  next();
};

export { createUserValidator, userLoginValidator };
