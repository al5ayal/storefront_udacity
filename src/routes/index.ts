import express, { Request, Response } from 'express';
import authHandler from '../handlers/authHandler';
import { authGuard } from '../midllewares/authGuard';
import { createUserValidator, userLoginValidator } from '../midllewares/userValidations';
import OrdersRoutes from './orders.routes';
import ProductsRoutes from './products.routes';
import ProductsCategoryRoutes from './productsCategory.routes';
import UsersRoutes from './users.routes';
const Routes = express.Router();



Routes.use('/api/login', userLoginValidator, authHandler.login);
Routes.post('/api/register', createUserValidator, authHandler.register);
Routes.use('/api/users', authGuard, UsersRoutes);
Routes.use('/api/orders', authGuard, OrdersRoutes);
Routes.use('/api/products', ProductsRoutes);
Routes.use('/api/category', ProductsCategoryRoutes);

Routes.get('/api', (req: Request, res: Response) => {
  res.send('Welcome to storefront API');
});

Routes.get('/', (req: Request, res: Response) => {
  res.send('Welcome to storefront');
});
export default Routes;
