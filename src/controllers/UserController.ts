import { inject, injectable } from "tsyringe";
import UserService from "../services/UserService";
import { Request, Response } from "express";
import PaginationRequestBody from "../interfaces/PaginationRequestBody";
import { getPagination } from "../utils/pagination";

@injectable()
export class UserController {
    constructor(@inject(UserService) private userService: UserService) {}
    public async findAll(request: Request<any, any, PaginationRequestBody>, response: Response): Promise<void> {
        const users = await this.userService.findAll(getPagination(request));
        response.status(200).json(users);
    }
}