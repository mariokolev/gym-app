import { Router } from 'express';
import userRoutes from './userRoutes';
import gymRoutes from './gymRoutes';
import authRoutes from './authRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/gyms', gymRoutes);
router.use('/auth', authRoutes);

export default router;
