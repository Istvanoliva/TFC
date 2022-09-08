import { Router } from 'express';
import userRouter from './users';
import teamsRouter from './teams';
import matchesRouter from './matches';

const router = Router();

router.use(userRouter);

router.use(teamsRouter);

router.use(matchesRouter);

export default router;
