import express, { Application, json } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import Routes from './routes';

export const app: Application = express();


app.use(json(), cors(), morgan('dev'), helmet());

app.use('/', Routes);


