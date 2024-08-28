import { NextFunction, Request, Response } from "express";
import { InvalidCredentials, NotFoundError } from "../errors/CustomErrors";
import { ErrorMessages } from "../errors/ErrorMessages";
import { StatusCodes } from "http-status-codes";
import logger from "../utils/logger";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof NotFoundError) {
        res.status(StatusCodes.NOT_FOUND).json({ message: err.message });
        return;
    }

    if (err instanceof InvalidCredentials) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message });
        return;
    }
    logger.error(ErrorMessages.unexpectedError(err.message), err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: ErrorMessages.SERVER_ERROR});
}
