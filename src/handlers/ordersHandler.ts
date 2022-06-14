import { Request, Response } from 'express';
import OrderModel from '../models/Order.model';
import { Order } from '../interfaces/Order';

const index = async (req: Request, res: Response) => {
  const orderModel = new OrderModel();
  orderModel
    .getAll(res.locals.user.id)
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const completedOrders = async (req: Request, res: Response) => {
  const orderModel = new OrderModel();
  orderModel
    .getAllCompleted(res.locals.user.id)
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const show = async (req: Request, res: Response) => {
  const orderModel = new OrderModel();
  try {
    const order = await orderModel.findById(Number(req.params.id));
    if (order && order.user_id == res.locals.user.id) {
      res.json(order);
    } else {
      res.status(404).send('Order not found');
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send(err.message);
    }
  }
};

const create = (req: Request, res: Response) => {
  const orderParams: Order = req.body;
  orderParams.user_id = res.locals.user.id;
  const orderModel = new OrderModel();
  orderModel
    .create(orderParams)
    .then((order) => {
      res.json(order);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const update = async (req: Request, res: Response) => {
  try {
    const orderParams: Order = req.body;
    orderParams.id = Number(req.params.id);
    orderParams.user_id = res.locals.user.id;
    const orderModel = new OrderModel();
    const order = await orderModel.findById(Number(req.params.id));
    if (order && order.user_id == res.locals.user.id) {
      orderModel
        .update(orderParams)
        .then((order) => {
          res.json(order);
        })
        .catch((err) => {
          res.status(500).send(err.message);
        });
    } else {
      res.status(500).send('Order not found Or You are not the owner');
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send(err.message);
    }
  }
};

const destroy = (req: Request, res: Response) => {
  const orderModel = new OrderModel();
  orderModel
    .destroy(Number(req.params.id))
    .then((order) => {
      res.json({ message: 'Order deleted' });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};
export default { index, completedOrders, show, create, update, destroy };
