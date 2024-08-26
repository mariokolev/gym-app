import { container } from "tsyringe";
import AuthController from "../controllers/AuthController";
import { Request, Response, Router } from "express";
import asyncRequestHandler from "../middleware/asyncHandler";

const router = Router();

const authController = container.resolve(AuthController);
router.post('/get-token', asyncRequestHandler(async (req: Request, res: Response) => {
    await authController.auth(req, res);
}));

router.post('/refresh-token', asyncRequestHandler(async (req: Request, res: Response) => {
    await authController.refresh(req, res);
}));

router.post('/revoke-token', asyncRequestHandler(async (req: Request, res: Response) => {
    await authController.revoke(req, res);
}));

export default router;