import { NextFunction, Request, RequestHandler, Response } from "express";

const asyncRequestHandler = (requestHandler: RequestHandler): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(requestHandler(req, res, next)).catch(next);
    };
};

export default asyncRequestHandler;