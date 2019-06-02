import 'reflect-metadata';
import { ApiServer } from './server';
import { DatabaseProvider } from './database';

DatabaseProvider.configure({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'customer',
    ssl: false,
});

const server = new ApiServer();
const port = process.env.PORT ? +process.env.PORT : 8080; 
server.start(port);