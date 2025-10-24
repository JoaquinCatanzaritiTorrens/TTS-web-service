import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Router from 'express-promise-router';
import { AppDataSource } from './config/data-source';
import { connectRedis } from './config/redis';
import cookieParser from 'cookie-parser';
import userRoutes from './users/infrastructure/user-routes';
import contactRoutes from './contact/infrastructure/contact-routes';

dotenv.config();
const apiRouter = Router();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.options('*', cors());

AppDataSource.initialize()
    .then(() => {
        const DB_PORT = process.env.DB_PORT || 5432;
        console.log(`DB connection established on localhost:${DB_PORT}`);

        connectRedis();

        apiRouter.use('/users', userRoutes);
        apiRouter.use('/contact', contactRoutes);
        app.use('/api', apiRouter);

        app.get('/', (req: Request, res: Response) => {
            res.json({ message: 'Backend running 🚀' });
        });

        const PORT = process.env.BACKEND_PORT || 5000;
        app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
    })
    .catch((error) => console.error('DB connection error', error));
