import { inject, injectable } from "tsyringe";
import UserRepository from "../repositories/UserRepository";
import Page from "../interfaces/Page";
import PaginationResult from "../interfaces/PaginationResult";
import UserResponseDTO from "../dtos/UserResponseDTO";
import User from "../entities/User";
import { NotFoundError } from "../errors/CustomErrors";

@injectable()
export default class UserService {
    constructor(
        @inject(UserRepository) private userRepository: UserRepository
    ) {}

    public async findAll(page: Page): Promise<PaginationResult<UserResponseDTO>> {
        try {
            const [users, total ] = await this.userRepository.findAndCount({
                skip: page.offset,
                take: page.limit
            });

            const usersDto = users.map(user => {
                return new UserResponseDTO(user);
            });

            return {
                data: usersDto,
                total
            };
        } catch (error) {
            throw error;
        }
    }

    public async findByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ email: email });

        if (!user) {
            throw new NotFoundError(`User with email: ${email} not found`);
        }

        return user;
    }
}