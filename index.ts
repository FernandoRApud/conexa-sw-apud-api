import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import logger from 'morgan';
import router from './src/routes';
import { PORT } from './src/constants';

const app = express();

app.use(cors());

app.use(express.json());
app.use(logger('dev'));

app.get('/', (_req: Request, res: Response) => {
  res.send('Server is working, welcome :)');
});

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running at port number ${PORT}`);
});
