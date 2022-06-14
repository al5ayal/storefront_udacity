import { Request, Response, NextFunction } from 'express';
import OrderModel from '../models/User.model';

const NullOrEmptyArray = (val: Array<Record<string, unknown>> | string | number) =>
  !val || val === null || val === undefined || val == '' || !Array.isArray(val) || val.length === 0;

const NullOrEmpty = (val: string | number) =>
  !val || val === null || val === undefined || val == '';

const createOrderValidator = async (req: Request, res: Response, next: NextFunction) => {
  //extract data from request
  const { order_details } = req.body;

  const errors = [];

  if (NullOrEmptyArray(order_details)) errors.push('Order Details Required');
  if (!NullOrEmptyArray(order_details)) {
    order_details.map((order: Record<string, string | number>, index: number) => {
      if (NullOrEmpty(order.product_id)) errors.push(`Item ${index + 1} Product Id Required`);
      if (NullOrEmpty(order.quantity)) errors.push(`Item ${index + 1} Quantity Required`);
    });
  }
  // email already exists
  if (errors.length > 0) {
    res.status(400).json(errors);
    return;
  }

  next();
};

export { createOrderValidator };
