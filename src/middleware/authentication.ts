import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.get('authorization');
    const jwtToken = header?.split(' ')[1];

    if (!jwtToken) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access denied, token missing!' });
    }

    try {
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET as string);
        (req as any).user = decoded;
        next();
    } catch (error) {
        return res.status(StatusCodes.FORBIDDEN).json({ message: 'Invalid token'});
    }
};