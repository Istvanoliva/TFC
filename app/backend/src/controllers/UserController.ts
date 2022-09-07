import { Request, Response, NextFunction } from 'express';
import { ILogin, IUser } from '../typescript/interfaces/userInterface';
import UserService from '../services/UserService';
import { RequestUser } from '../typescript/interfaces/tokenInterface';

class UserController {
  private user: UserService;

  constructor() {
    this.user = new UserService();
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user: ILogin = req.body;
      const token = await this.user.createToken(user);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  userType = async (req: RequestUser, res: Response, next: NextFunction) => {
    try {
      const { role } = req.user as IUser;
      res.status(200).json({ role });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
