import express from 'express';
import productsCategoryHandler from '../handlers/productsCategoryHandler';
import { authGuard } from '../midllewares/authGuard';

const ProductsCategoryRoutes = express.Router();

ProductsCategoryRoutes.get('/:id', productsCategoryHandler.show);
ProductsCategoryRoutes.delete('/:id', productsCategoryHandler.destroy);
ProductsCategoryRoutes.get('/', productsCategoryHandler.index);
ProductsCategoryRoutes.post('/', authGuard, productsCategoryHandler.create);

export default ProductsCategoryRoutes;
