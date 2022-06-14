import { Pool } from 'pg';
import config from '../config';

const dbConn: Pool = new Pool(config.db);

export default dbConn;
