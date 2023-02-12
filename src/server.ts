import { createServer } from 'http';
import {sequelizeConnection} from './db/config';

import dotenv from 'dotenv';
dotenv.config();

import app from './app';

//DB models
import './db/repository/Rol';
import './db/repository/Creator';
import './db/repository/Video';
import './db/repository/LikeVideo';

const isDevEnv = process.env.NODE_ENV === 'development';

const PORT = process.env.PORT || 3000;

const server = createServer(app);

async function startServer(): Promise<void> {
    try {
        // await sequelizeConnection.sync({alter: isDevEnv});
        console.log('Connection has been established successfully.');
        server.listen(PORT, () => {
            console.log('Project int in port ', PORT);
        })
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

startServer();

