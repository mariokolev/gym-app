import { Request, Response, Router } from 'express';
import { container } from 'tsyringe';
import { UserController } from '../controllers/UserController';
import asyncRequestHandler from '../middleware/asyncHandler';

const router = Router();
const userController = container.resolve(UserController);

router.post('/', asyncRequestHandler(async (request: Request, response: Response) => {
    await userController.findAll(request, response);
}));

export default router;