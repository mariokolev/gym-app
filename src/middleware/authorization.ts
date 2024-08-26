import { NextFunction, Request, Response } from "express"

export const authorize = (permissions: string[] = []) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const {user} = req as any;

        if (!user.permissions) {
            res.status(401).json({ message: 'Unathorized' });
        }

        const hasPermission = permissions.some(permission => user.permissions.includes(permission));
        if (!hasPermission) {
            res.status(403).json({ message: 'Forbidden' });
        }

        next();
    };
};