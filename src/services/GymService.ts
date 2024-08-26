import { inject, injectable } from "tsyringe";
import GymRepository from "../repositories/GymRepository";
import Gym from "../entities/Gym";
import Page from "../interfaces/Page";
import PaginationResult from "../interfaces/PaginationResult";

@injectable()
export default class GymService {
    constructor(
        @inject(GymRepository) private gymRepository: GymRepository
    ) {}

    public async findAll(page: Page): Promise<PaginationResult<Gym>> {
        try {
            const [gyms, total] = await this.gymRepository.findAndCount({
                skip: page.offset,
                take: page.limit
            });

            return {
                data: gyms,
                total
            };
        } catch (error) {
            throw Error('Failed to fetch gyms.');
        }
    }
}