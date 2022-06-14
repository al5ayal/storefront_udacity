import express from 'express';
import ordersHandler from '../handlers/ordersHandler';
import { createOrderValidator } from '../midllewares/orderValidations';

const OrdersRoutes = express.Router();

// token investigate user through guard
OrdersRoutes.get('/completed', ordersHandler.completedOrders);
OrdersRoutes.get('/:id', ordersHandler.show);
OrdersRoutes.delete('/:id', ordersHandler.destroy);
OrdersRoutes.put('/:id', ordersHandler.update);
OrdersRoutes.get('/', ordersHandler.index);
OrdersRoutes.post('/', createOrderValidator, ordersHandler.create);

export default OrdersRoutes;
