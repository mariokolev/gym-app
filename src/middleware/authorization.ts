import { NextFunction, Request, Response } from "express"
import { ErrorMessages } from "../errors/ErrorMessages";
import { StatusCodes } from "http-status-codes";

export const authorize = (permissions: string[] = []) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const {user} = req as any;

        if (!user.permissions) {
            res.status(StatusCodes.FORBIDDEN).json({ message: ErrorMessages.UNAUTHORIZED });
            return;
        }

        const hasPermission = permissions.some(permission => user.permissions.includes(permission));
        if (!hasPermission) {
            res.status(StatusCodes.FORBIDDEN).json({ message: ErrorMessages.UNAUTHORIZED });
            return;
        }

        next();
    };
};