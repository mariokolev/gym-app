import { Repository } from "typeorm";
import { AppDataSource } from "../typeorm.config";
import { injectable } from "tsyringe";
import Gym from "../entities/Gym";

@injectable()
export default class GymRepository extends Repository<Gym> {
    constructor() {
        super(Gym, AppDataSource.manager);
    }
}