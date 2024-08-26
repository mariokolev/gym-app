import { Repository } from "typeorm";
import { AppDataSource } from "../typeorm.config";
import User from "../entities/User";
import { injectable } from "tsyringe";

@injectable()
export default class UserRepository extends Repository<User> {
    constructor() {
        super(User, AppDataSource.manager);
    }
}
