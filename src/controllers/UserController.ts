import { inject, injectable } from "tsyringe";
import UserService from "../services/UserService";
import { Request, Response } from "express";
import PaginationRequestBody from "../interfaces/PaginationRequestBody";
import { getPagination } from "../utils/pagination";
import UserInfoResponseDTO from "../dtos/UserInfoResponseDTO";
import { StatusCodes } from "http-status-codes";

@injectable()
export class UserController {
    constructor(@inject(UserService) private userService: UserService) {}
    public async findAll(request: Request<any, any, PaginationRequestBody>, response: Response): Promise<void> {
        const users = await this.userService.findAll(getPagination(request));
        response.status(StatusCodes.OK).json(users);
    }

    public async getInfo(request: Request, response: Response): Promise<void> {
        const { id } = request.body;
        const user = await this.userService.findById(id);
        const userDto = new UserInfoResponseDTO(user);
        response.status(StatusCodes.OK).json(userDto);
    }
}