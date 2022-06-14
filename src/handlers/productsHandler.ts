import { Request, Response } from 'express';
import ProductModel from '../models/Product.model';
import { Product } from '../interfaces/Product';

const index = async (req: Request, res: Response) => {
  const productModel = new ProductModel();
  productModel
    .getAll()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const top = async (req: Request, res: Response) => {
  const productModel = new ProductModel();
  productModel
    .findTop()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const category = async (req: Request, res: Response) => {
  const productModel = new ProductModel();
  productModel
    .findByCategory(Number(req.params.id))
    .then((products) => {
      if(!products.length) return res.status(404).send('Category has No Products');
      res.json(products);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const show = async (req: Request, res: Response) => {
  const orderModel = new ProductModel();
  try {
    const order = await orderModel.findById(Number(req.params.id));
    if (order) {
      res.json(order);
    } else {
      res.status(404).send('Product not found');
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send(err.message);
    }
  }
};

const create = (req: Request, res: Response) => {
  const productParams: Product = req.body;
  const productModel = new ProductModel();
  productModel
    .create(productParams)
    .then((order) => {
      res.send('order created successfully');
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const destroy = (req: Request, res: Response) => {
  const productModel = new ProductModel();
  productModel.destroy(Number(req.params.id))
    .then((product) => {
      res.json({ message: 'Product deleted' });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};
export default { index, top, category, show, create,destroy };
