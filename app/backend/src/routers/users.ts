import { Router } from 'express';
import TokenMiddleware from '../middlewares/TokenMiddleware';
import UserController from '../controllers/UserController';
import ValidateUser from '../middlewares/validators/ValidateUser';

const userRouter = Router();

const user = new UserController();
const validate = new ValidateUser();
const verifyToken = new TokenMiddleware();

userRouter.post(
  '/login',
  validate.verifyUser,
  (req, res, next) => user.login(req, res, next),
);

userRouter.get('/login/validate', verifyToken.verify, user.userType);

export default userRouter;
