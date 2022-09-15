import { Router } from 'express';
import userRouter from './users';
import teamsRouter from './teams';
import matchesRouter from './matches';
import boardsRouter from './leaderboards';

const router = Router();

router.use(userRouter);

router.use(teamsRouter);

router.use(matchesRouter);

router.use(boardsRouter);

export default router;
