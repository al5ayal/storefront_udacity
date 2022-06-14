import express from 'express';
import productsHandler from '../handlers/productsHandler';
import { authGuard } from '../midllewares/authGuard';

const ProductsRoutes = express.Router();

ProductsRoutes.get('/top', productsHandler.top);
ProductsRoutes.get('/:id', productsHandler.show);
ProductsRoutes.delete('/:id', productsHandler.destroy);
ProductsRoutes.get('/category/:id', productsHandler.category);

ProductsRoutes.get('/', productsHandler.index);
ProductsRoutes.post('/',authGuard, productsHandler.create);

export default ProductsRoutes;
