import express, { Express } from 'express';

import { api } from './routes/api';

const app: Express = express();

app.use(express.json());

app.use('/v1', api);

export default app;