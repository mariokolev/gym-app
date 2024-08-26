import { Request, Response, Router } from "express";
import { container } from "tsyringe";
import GymController from "../controllers/GymController";
import asyncRequestHandler from "../middleware/asyncHandler";
import { authorize } from "../middleware/authorization";

const router = Router();
const gymController = container.resolve(GymController);

router.get('/', authorize(['VIEW_GYM']), asyncRequestHandler(async (req: Request, res: Response) => {
    gymController.findAll(req, res);
}));

export default router;