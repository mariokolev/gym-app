import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import GymService from "../services/GymService";
import PaginationRequestBody from "../interfaces/PaginationRequestBody";
import { getPagination } from "../utils/pagination";

@injectable()
export default class GymController {
    constructor(
        @inject(GymService) private gymService: GymService
    ) {}

    public async findAll(request: Request<any, any, PaginationRequestBody>, response: Response): Promise<void> {
        const gyms = await this.gymService.findAll(getPagination(request));
        response.status(200).json(gyms);
    }
}