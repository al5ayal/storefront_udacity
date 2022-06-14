import express from 'express';
import usersHandler from '../handlers/usersHandler';
import { createUserValidator } from '../midllewares/userValidations';

const UsersRoutes = express.Router();

UsersRoutes.get('/:id', usersHandler.show);
UsersRoutes.delete('/:id', usersHandler.destroy);
UsersRoutes.get('/', usersHandler.index);
UsersRoutes.post('/', createUserValidator, usersHandler.create);

export default UsersRoutes;
