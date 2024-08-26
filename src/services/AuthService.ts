import { inject, injectable } from "tsyringe";
import bcrypt from 'bcrypt';
import UserService from "./UserService";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { InvalidCredentials, NotFoundError } from "../errors/CustomErrors";
import Permission from "../entities/Permission";

interface AuthParams {
    email: string;
    password: string;
}

interface JwtResponse {
    accessToken: string;
    refreshToken: string;
    expiresIn: string; // accessToken expiration
}

interface UserJwtPayload extends JwtPayload {
    id: number;
};

@injectable()
export default class AuthService {
    private readonly expiresIn = '3600000';
    constructor(@inject(UserService) private userService: UserService) { }

    public async auth(params: AuthParams): Promise<JwtResponse> {
        try {
            const user = await this.userService.findByEmail(params.email);
            if (!user) {
                throw new NotFoundError(`User with email: ${params.email} not found`);
            }

            const isValidPassword = await bcrypt.compare(params.password, user.password);
            if (!isValidPassword) {
                throw new InvalidCredentials('Invalid credentials.');
            }

            const accessToken = jwt.sign({
                id: user.id,
                role: user.role.roleName,
                permissions: user.role.permissions.map((permission: Permission) => permission.permissionName)
            }
                , process.env.JWT_SECRET as string, { expiresIn: this.expiresIn }
            );

            const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_REFRESH as string, { expiresIn: '7d' });

            return {
                accessToken: accessToken,
                refreshToken: refreshToken,
                expiresIn: this.expiresIn
            };

        } catch (error) {
            if (error instanceof NotFoundError || error instanceof InvalidCredentials) {
                throw error;
            }

            throw new Error('Failed authorization');
        }
    }

    public async refresh(refreshToken: string): Promise<JwtResponse> {
        if (!refreshToken.trim()) {
            throw new InvalidCredentials('Missing token.');
        }

        const user = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH as string) as UserJwtPayload;
        if (!user) {
            throw new InvalidCredentials('Invalid refresh token');
        }

        const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: this.expiresIn });
        const newRefreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_REFRESH as string, { expiresIn: '7d' });

        return {
            accessToken: accessToken,
            refreshToken: newRefreshToken,
            expiresIn: this.expiresIn
        };
    }

    /**
     * @todo implement blacklist
     */
    public async revoke() {

    }
}