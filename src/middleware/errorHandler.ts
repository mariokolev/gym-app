import { NextFunction, Request, Response } from "express";
import { InvalidCredentials, NotFoundError } from "../errors/CustomErrors";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof NotFoundError) {
        res.status(404).json({ message: err.message });
        return;
    }

    if (err instanceof InvalidCredentials) {
        res.status(401).json({ message: err.message });
        return;
    }

    console.log("show server error: ", err);
    return res.status(500).json({ message: 'Internal Server Error'});
}
