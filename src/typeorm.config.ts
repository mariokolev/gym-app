import { DataSource } from "typeorm";
import path from "path";

// require for migrations
require('dotenv').config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false, // Set to false in production
    logging: false,
    entities: [path.join(__dirname, './entities/*.js')],
    migrations: [path.join(__dirname, './migrations/*.ts')],
    migrationsTableName: 'migrations_history',
    subscribers: [],
});
