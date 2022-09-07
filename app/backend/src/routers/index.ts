import { Router } from 'express';
import userRouter from './users';
import teamsRouter from './teams';

const router = Router();

router.use(userRouter);

router.use(teamsRouter);

export default router;
