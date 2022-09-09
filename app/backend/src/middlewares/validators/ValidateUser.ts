import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

class ValidateUser {
  login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  verifyUser = (req: Request, res: Response, next: NextFunction) => {
    const { error } = this.login.validate(req.body);
    const notFilled = 'empty' || 'required';

    if (error?.message.includes(notFilled)) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  };
}

export default ValidateUser;
