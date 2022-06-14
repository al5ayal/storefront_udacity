import { Request, Response } from 'express';
import ProductCategoryModel from '../models/ProductCategory.model';
import { Product } from '../interfaces/Product';

const index = async (req: Request, res: Response) => {
  const productCategory = new ProductCategoryModel();
  productCategory
    .findAll()
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const show = async (req: Request, res: Response) => {
  const productCategory = new ProductCategoryModel();
  try {
    const category = await productCategory.findById(Number(req.params.id));
    if (category) {
      res.json(category);
    } else {
      res.status(404).send('Category not found');
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send(err.message);
    }
  }
};

const create = (req: Request, res: Response) => {
  const productCategoryParams: Product = req.body;
  const ProductCategory = new ProductCategoryModel();
  ProductCategory.create(productCategoryParams)
    .then((category) => {
      res.send('Category created successfully');
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const destroy = (req: Request, res: Response) => {
  const ProductCategory = new ProductCategoryModel();
  ProductCategory.destroy(Number(req.params.id))
    .then((category) => {
      res.json({ message: 'Category deleted' });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};
export default { index, show, create, destroy };
