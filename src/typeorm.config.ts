import { DataSource } from "typeorm";
import Gym from "./entities/Gym";
import User from "./entities/User";
import Role from "./entities/Role";
import Permission from "./entities/Permission";
import GymLocation from "./entities/GymLocation";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false, // Set to false in production
    logging: true,
    entities: [User, Role, Permission, Gym, GymLocation],
    migrations: [__dirname + '/migrations/*.ts'],
    subscribers: [],
});
