import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import AuthService from "../services/AuthService";

@injectable()
export default class AuthController {
    constructor(
        @inject(AuthService) private authService: AuthService
    ) {}

    public async auth(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        const token = await this.authService.auth({ email, password });

        res.status(200).json(token);
    }

    public async refresh(req: Request, res: Response): Promise<void> {
        const { refreshToken } = req.body;
        const tokens = await this.authService.refresh(refreshToken);
        res.status(200).send(tokens);
    }

    /**
     * @todo
     * @param req
     * @param res
     */
    public async revoke(req: Request, res: Response): Promise<void> {}
}